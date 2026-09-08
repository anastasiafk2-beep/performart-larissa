import Link from "next/link";

export default function NewsletterConfirmedPage() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6 py-32 text-black">
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#C2272D]">
          THE PERFORMART LETTER
        </p>

        <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
          Η εγγραφή σου ολοκληρώθηκε!
        </h1>

        <div className="mx-auto mt-6 h-px w-16 bg-[#C2272D]" />

        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-black/70 sm:text-lg">
          Καλώς ήρθες στο newsletter του The performART – Larissa.
          Από εδώ και πέρα θα λαμβάνεις στο inbox σου πολιτιστικές προτάσεις,
          νέα, εκδηλώσεις, συνεντεύξεις και όσα αξίζει να γνωρίζεις.
        </p>

        <Link
          href="/"
          className="mt-9 inline-block border border-black px-7 py-3 text-sm uppercase tracking-[0.18em] transition hover:bg-red-900 hover:text-white"
        >
          Επιστροφή στην αρχική
        </Link>
      </div>
    </main>
  );
}