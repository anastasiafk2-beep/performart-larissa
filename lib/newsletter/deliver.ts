import {createHash} from 'node:crypto';
import {createClient} from 'next-sanity';

type Client = ReturnType<typeof createClient>;
type Payload = {_id?: string; _rev?: string; status?: string; previousStatus?: string | null};
type Newsletter = {
  _id: string; _rev: string; _type: string; status?: string; subject?: string;
  internalTitle?: string; preheader?: string; body?: unknown[]; intro?: unknown[];
  dryRun?: boolean; sentAt?: string; kitBroadcastId?: string;
  heroImage?: {alt?: string; url?: string};
  contentBlocks?: Array<{_type: string; title?: string; body?: unknown[]; target?: {_id: string; _type: string; title?: string; excerpt?: string; slug?: {current?: string}}}>;
};
type Receipt = {_id: string; _rev: string; state: string; revision: string; broadcastId?: string; acceptedAt?: string};
const json = (body: object, status = 200) => Response.json(body, {status});
const skip = (reason: string) => json({ok: true, skipped: true, reason});
const esc = (s: string) => s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');

export async function deliverNewsletter(
  payload: Payload, client: Client, apiKey: string,
  render: (blocks: unknown[]) => string,
  sendEnabled: boolean,
  kitFetch: typeof fetch = fetch,
) {
  if (!payload || typeof payload !== 'object' || typeof payload._id !== 'string' || typeof payload._rev !== 'string')
    return json({error: 'Invalid newsletter event: _id and _rev are required'}, 400);
  if (payload._id.startsWith('drafts.') || payload._id.startsWith('versions.')) return skip('Unpublished document');
  if (payload.status !== 'ready' || !Object.hasOwn(payload, 'previousStatus') || payload.previousStatus === 'ready') return skip('Not a transition to ready');
  const doc = await client.fetch<Newsletter | null>(
    '*[_id == $id][0]{...,heroImage{...,"url":asset->url},contentBlocks[]{...,"target":@->{_id,_type,title,excerpt,slug}}}', {id: payload._id});
  if (!doc || doc._type !== 'newsletter') return skip('Document unavailable');
  const dryRun = doc.dryRun !== false;
  const receiptId = 'newsletterDelivery.' + createHash('sha256').update(doc._id + (dryRun ? ':test:' + payload._rev : ':live')).digest('hex');
  const existing = await client.getDocument<Receipt>(receiptId);
  const finish = async (receipt: Receipt) => {
    await client.patch(doc._id).set({status: 'sent', sentAt: receipt.acceptedAt, kitBroadcastId: receipt.broadcastId})
      .unset(['sendError', 'newsletterSending']).commit();
    return json({ok: true, broadcastId: receipt.broadcastId});
  };
  // A durable receipt survives Studio draft publishes and document revisions.
  if (!dryRun && existing?.state === 'accepted') return finish(existing);
  if (existing && existing.state !== 'pending' && !(existing.state === 'rejected' && existing.revision !== payload._rev)) return skip('Delivery already claimed; check stored result');
  if (doc.status !== 'ready' || doc._rev !== payload._rev) return skip('Stale event');
  if (doc.sentAt || doc.kitBroadcastId) return skip('Already marked sent');
  if (!dryRun && !sendEnabled) return json({error: 'Live sending is disabled on this server'}, 503);
  let html: string;
  try {
    if (!doc.subject?.trim()) throw new Error('Missing subject');
    html = render(doc.intro || []) + render(doc.body || []);
    if (doc.heroImage?.url) {
      const url = new URL(doc.heroImage.url);
      if (url.protocol !== 'https:' || url.hostname !== 'cdn.sanity.io') throw new Error('Invalid image');
      html = `<p><img src="${esc(url.href)}" alt="${esc(doc.heroImage.alt || '')}" style="max-width:100%;height:auto"></p>` + html;
    }
    const routes: Record<string,string> = {event:'events',book:'books',music:'music',interview:'interviews',cinemaReview:'cinema/reviews',opinionArticle:'opinions'};
    for (const block of doc.contentBlocks || []) {
      if (block._type === 'textSection') html += (block.title ? `<h2>${esc(block.title)}</h2>` : '') + render(block.body || []);
      else if (block._type === 'reference' && block.target && routes[block.target._type]) {
        const t = block.target;
        const id = t._type === 'opinionArticle' ? t.slug?.current : t._id;
        if (!id) throw new Error('Missing article link');
        html += `<h2><a href="https://performart-larissa.vercel.app/${routes[t._type]}/${encodeURIComponent(id)}">${esc(t.title || 'Διαβάστε περισσότερα')}</a></h2>` + (t.excerpt ? `<p>${esc(t.excerpt)}</p>` : '');
      } else throw new Error('Missing or unsupported content section');
    }
    if (!html.trim()) throw new Error('Empty newsletter');
  } catch {
    await client.patch(doc._id).ifRevisionId(doc._rev).set({sendError:'Ελέγξτε το θέμα, το περιεχόμενο και τους συνδέσμους του newsletter.'}).commit();
    return json({error:'Invalid newsletter content; see Sanity'},400);
  }
  let receipt = existing || await client.createIfNotExists({_id:receiptId,_type:'newsletterDelivery',state:'pending',revision:payload._rev,newsletterId:doc._id,dryRun});
  if (receipt.state !== 'pending' && !(receipt.state === 'rejected' && receipt.revision !== payload._rev)) return skip('Delivery already claimed');
  try {
    receipt = await client.patch(receiptId).ifRevisionId(receipt._rev).set({state:'processing',revision:payload._rev,startedAt:new Date().toISOString()}).commit();
  } catch (e) {
    if ((e as {statusCode?:number}).statusCode === 409) return skip('Concurrent delivery');
    throw e;
  }
  // Never automatically retry an ambiguous POST: Kit may already have accepted it.
  let response: Response;
  try {
    response = await kitFetch('https://api.kit.com/v4/broadcasts',{
      method:'POST',headers:{'Content-Type':'application/json','X-Kit-Api-Key':apiKey},
      body:JSON.stringify({subject:doc.subject,preview_text:doc.preheader || '',description:doc.internalTitle || doc._id,
        content:html,public:false,published_at:null,send_at:dryRun ? null : new Date().toISOString()}),
      signal:AbortSignal.timeout(15000),cache:'no-store',
    });
  } catch {
    await client.patch(doc._id).set({sendError:'Άγνωστο αποτέλεσμα Kit. Ελέγξτε τα Broadcasts πριν από νέα αποστολή. Η αυτόματη επανάληψη έχει αποκλειστεί.'}).commit();
    return json({error:'Kit result unknown; manual review required'},502);
  }
  if (!response.ok) {
    const definite = [400,401,403,404,422,429].includes(response.status);
    await client.patch(receiptId).set({state:definite ? 'rejected' : 'uncertain',httpStatus:response.status}).commit();
    await client.patch(doc._id).set({sendError:`Kit HTTP ${response.status}. ${definite ? 'Διορθώστε το πρόβλημα και αλλάξτε Πρόχειρο → Έτοιμο.' : 'Ελέγξτε τα Broadcasts. Η επανάληψη αποκλείστηκε.'}`}).commit();
    return json({error:`Kit HTTP ${response.status}`},502);
  }
  let broadcast: {id?: number | string; send_at?: string | null};
  try { broadcast = (await response.json()).broadcast; } catch { broadcast = {}; }
  if (!broadcast?.id || (!dryRun && !broadcast.send_at)) {
    await client.patch(doc._id).set({sendError:'Μη αναμενόμενη απάντηση Kit. Ελέγξτε τα Broadcasts· δεν θα γίνει αυτόματη επανάληψη.'}).commit();
    return json({error:'Unconfirmed Kit result; manual review required'},502);
  }
  const broadcastId = String(broadcast.id);
  const acceptedAt = new Date().toISOString();
  await client.patch(receiptId).set({state:dryRun ? 'tested' : 'accepted',broadcastId,acceptedAt}).commit();
  if (dryRun) {
    // Do not overwrite later edits. A successful test is never marked sent.
    await client.patch(doc._id).ifRevisionId(doc._rev).set({status:'draft',testBroadcastId:broadcastId,testedAt:acceptedAt})
      .unset(['sendError']).commit();
    return json({ok:true,dryRun:true,broadcastId});
  }
  return finish({...receipt,state:'accepted',broadcastId,acceptedAt} as Receipt);
}
