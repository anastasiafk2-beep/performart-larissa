import {NextRequest, NextResponse} from "next/server";

export const runtime = "nodejs";
const fail = (error: string, status: number) => NextResponse.json({error}, {status});

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin && origin !== request.nextUrl.origin) return fail("Μη έγκυρο αίτημα.", 403);
  if (!request.headers.get("content-type")?.includes("application/json")) return fail("Μη έγκυρο αίτημα.", 415);
  let body;
  try {
    const raw = await request.text();
    if (raw.length > 2048) return fail("Το αίτημα είναι πολύ μεγάλο.", 413);
    body = JSON.parse(raw);
  } catch {return fail("Μη έγκυρο αίτημα.", 400);}
  if (!body || typeof body !== "object") return fail("Μη έγκυρο αίτημα.", 400);
  if (body.website) return NextResponse.json({ok: true});
  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail("Συμπλήρωσε έγκυρη διεύθυνση email.", 400);
  if (body.consent !== true) return fail("Χρειάζεται η συγκατάθεσή σου για την εγγραφή.", 400);
  const apiKey = process.env.KIT_API_KEY;
  const formId = process.env.KIT_FORM_ID;
  if (!apiKey || !formId || !/^\d+$/.test(formId)) return fail("Οι εγγραφές θα είναι σύντομα διαθέσιμες. Δοκίμασε ξανά αργότερα.", 503);
  const headers = {"Content-Type": "application/json", "X-Kit-Api-Key": apiKey};
  try {
    // Kit V4 requires the subscriber to exist before adding them to a form.
    const created = await fetch("https://api.kit.com/v4/subscribers", {
      method: "POST", headers, body: JSON.stringify({email_address: email, state: "inactive"}),
      signal: AbortSignal.timeout(10000), cache: "no-store",
    });
    if (!created.ok) return fail("Η εγγραφή δεν ολοκληρώθηκε. Δοκίμασε ξανά σε λίγο.", 502);
    const added = await fetch(`https://api.kit.com/v4/forms/${formId}/subscribers`, {
      method: "POST", headers, body: JSON.stringify({email_address: email}),
      signal: AbortSignal.timeout(10000), cache: "no-store",
    });
    if (!added.ok) return fail("Η εγγραφή δεν ολοκληρώθηκε. Δοκίμασε ξανά σε λίγο.", 502);
    return NextResponse.json({ok: true});
  } catch {return fail("Η υπηρεσία εγγραφής δεν είναι προσωρινά διαθέσιμη. Δοκίμασε ξανά σε λίγο.", 502);}
}