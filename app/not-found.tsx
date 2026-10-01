import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-white px-6 text-black">
      <div className="max-w-xl text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.25em] text-black/50">
          404
        </p>

        <h1 className="font-serif text-4xl leading-tight md:text-5xl">
          Η σελίδα δεν βρέθηκε
        </h1>

        <p className="mx-auto mt-6 max-w-md text-base leading-7 text-black/65">
          Η σελίδα που αναζητάτε μπορεί να έχει μετακινηθεί, διαγραφεί ή να μην
          υπάρχει.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex border border-black px-6 py-3 text-sm uppercase tracking-[0.18em] transition hover:bg-black hover:text-white"
        >
          Επιστροφή στην αρχική
        </Link>
      </div>
    </main>
  );
}