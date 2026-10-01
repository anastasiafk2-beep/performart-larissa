const {createRequire}=require('module'); const req=createRequire(require('node:path').join(__dirname, '../package.json'));
const ts=req('typescript'),fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const compiled=ts.transpileModule(fs.readFileSync(require('node:path').join(__dirname, '../lib/newsletter/deliver.ts'),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
const mod={exports:{}};vm.runInNewContext(compiled,{module:mod,exports:mod.exports,require:req,Response,fetch,AbortSignal,URL,console});
const deliver=mod.exports.deliverNewsletter;
function fixture(dryRun=false){
 const docs={n:{_id:'n',_rev:'r1',_type:'newsletter',status:'ready',subject:'Test',body:[],dryRun}};let seq=1,calls=0,failFinal=false;
 const client={fetch:async()=>structuredClone(docs.n),getDocument:async id=>structuredClone(docs[id]),createIfNotExists:async d=>{docs[d._id] ||= {...d,_rev:'r'+(++seq)};return structuredClone(docs[d._id]);},patch(id){let rev,set={},unset=[];return {ifRevisionId(r){rev=r;return this},set(s){set=s;return this},unset(u){unset=u;return this},async commit(){if(rev&&docs[id]._rev!==rev)throw {statusCode:409};if(failFinal&&set.status==='sent')throw Error('write failure');Object.assign(docs[id],set,{_rev:'r'+(++seq)});for(const k of unset)delete docs[id][k];return structuredClone(docs[id]);}}}};
 const event={_id:'n',_rev:'r1',status:'ready',previousStatus:'draft'};
 const kit=async(url,o)=>{calls++;const b=JSON.parse(o.body);assert.equal(b.public,false);assert.equal(b.send_at===null,dryRun);return Response.json({broadcast:{id:42,send_at:b.send_at}})};
 return {docs,client,event,kit,calls:()=>calls,failFinal:v=>failFinal=v,run:(e=event,f=kit,enabled=true)=>deliver(e,client,'test',()=>'<p>Test</p>',enabled,f)};
}
(async()=>{
 let f=fixture();await Promise.all([f.run(),f.run(),f.run()]);assert.equal(f.calls(),1);assert.equal(f.docs.n.status,'sent');await f.run();assert.equal(f.calls(),1);
 f=fixture(true);const result=await f.run();assert.equal((await result.json()).dryRun,true);assert.equal(f.docs.n.status,'draft');assert.equal(f.docs.n.sentAt,undefined);await f.run();assert.equal(f.calls(),1);
 f=fixture();await f.run({...f.event,previousStatus:'ready'});await f.run({...f.event,_rev:'old'});await f.run({...f.event,_id:'drafts.n'});await f.run({...f.event,previousStatus:undefined,status:'draft'});assert.equal(f.calls(),0);
 f=fixture();assert.equal((await f.run(f.event,f.kit,false)).status,503);assert.equal(f.calls(),0);
 f=fixture();let attempts=0;await f.run(f.event,async()=>{attempts++;throw Error('timeout')});await f.run();assert.equal(attempts,1);assert.equal(f.calls(),0);assert.equal(f.docs.n.status,'ready');assert.ok(f.docs.n.sendError);
 f=fixture();await f.run(f.event,async()=>Response.json({}, {status:422}));assert.notEqual(f.docs.n.status,'sent');await f.run();assert.equal(f.calls(),0);f.docs.n._rev='r99';await f.run({...f.event,_rev:'r99'});assert.equal(f.calls(),1);
 f=fixture();f.failFinal(true);await assert.rejects(()=>f.run());f.failFinal(false);await f.run();assert.equal(f.calls(),1);assert.equal(f.docs.n.status,'sent');
 f=fixture();await f.run(f.event,async()=>Response.json({}));await f.run();assert.equal(f.calls(),0);assert.notEqual(f.docs.n.status,'sent');
 console.log('PASS: concurrent delivery, replay, safe draft, transition, stale revision, draft exclusion, global safety gate, ambiguous timeout, rejected request recovery, finalization recovery, malformed Kit response.');
})().catch(e=>{console.error(e);process.exitCode=1});
