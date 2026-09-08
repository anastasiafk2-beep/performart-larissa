"use client";

import Link from "next/link";
import {useState, type FormEvent} from "react";

export default function NewsletterSignup() {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    setPending(true);
    setMessage("");
    setSuccess(false);
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email: data.get("email"), consent: data.get("consent") === "on", website: data.get("website")}),
        signal: AbortSignal.timeout(25000),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Η εγγραφή δεν ολοκληρώθηκε. Δοκίμασε ξανά.");
      setSuccess(true);
      setMessage(
  "Ευχαριστούμε! Έλεγξε το email σου και πάτησε τον σύνδεσμο επιβεβαίωσης για να ολοκληρώσεις την εγγραφή σου."
);
      form.reset();
    } catch (error) {
      setMessage(error instanceof Error && error.name !== "TimeoutError" ? error.message : "Δεν ήταν δυνατή η σύνδεση. Δοκίμασε ξανά σε λίγο.");
    } finally {setPending(false);}
  }

  return (
    <section aria-labelledby="newsletter-heading" className="mx-auto max-w-2xl border-b border-white/20 px-2 py-10 text-white">
      <p className="mb-3 text-xs uppercase tracking-[0.3em]">THE PERFORMART LETTER</p>
      <h2 id="newsletter-heading" className="text-2xl font-semibold sm:text-3xl">Ο πολιτισμός, στο email σου.</h2>
      <p className="mt-3 text-sm leading-relaxed text-white/80">Εκδηλώσεις, συνεντεύξεις και οι επιλογές του PerformART.</p>
      <form onSubmit={subscribe} className="mt-6" aria-busy={pending}>
        <label htmlFor="newsletter-email" className="mb-2 block text-sm">Το email σου</label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input id="newsletter-email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" className="min-w-0 flex-1 rounded-md border border-white/40 bg-white px-4 py-3 text-black placeholder:text-zinc-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" />
          <button type="submit" disabled={pending} className="rounded-md bg-white px-6 py-3 font-semibold text-black transition hover:bg-zinc-200 disabled:opacity-60">{pending ? "Εγγραφή…" : "Εγγραφή"}</button>
        </div>
        <div hidden aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
        <label className="mt-4 flex items-start gap-3 text-sm leading-relaxed text-white/80">
  <input
    name="consent"
    type="checkbox"
    required
    className="mt-1 h-4 w-4 shrink-0"
  />

  <span>
    Συμφωνώ να λαμβάνω μέσω email το newsletter του The performART - Larissa
    με πολιτιστικές προτάσεις, άρθρα, συνεντεύξεις και ενημερώσεις. Μπορώ να
    ανακαλέσω τη συγκατάθεσή μου οποτεδήποτε μέσω του συνδέσμου διαγραφής που
    περιλαμβάνεται σε κάθε email. Έχω διαβάσει την{" "}
    <Link
      href="/privacy"
      className="underline underline-offset-4 hover:text-white"
    >
      Πολιτική Απορρήτου
    </Link>
    .
  </span>
</label>
        <p role="status" aria-live="polite" className={`mt-3 min-h-6 text-sm ${success ? "text-white" : "text-amber-200"}`}>{message}</p>
      </form>
    </section>
  );
}