export const metadata = {
  title: "Πολιτική Cookies | The performART - Larissa",
  description:
    "Πολιτική Cookies της ιστοσελίδας The performART - Larissa.",
};

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-white px-6 pb-24 pt-32 text-black">
      <article className="mx-auto max-w-4xl">
        <p className="mb-4 text-sm uppercase tracking-[0.2em] text-black/50">
          The performART - Larissa
        </p>

        <h1 className="font-serif text-4xl md:text-5xl">
          Πολιτική Cookies
        </h1>

        <p className="mt-4 text-sm text-black/50">
          Τελευταία ενημέρωση: 8 Σεπτεμβρίου 2026
        </p>

        <div className="mt-12 space-y-10 text-[17px] leading-8 text-black/80">
          <p>
            Η ιστοσελίδα <strong>The performART - Larissa</strong> χρησιμοποιεί
            cookies και παρόμοιες τεχνολογίες για τη σωστή λειτουργία της και,
            όπου απαιτείται και με τη συγκατάθεση του χρήστη, για στατιστική
            ανάλυση της επισκεψιμότητας.
          </p>

          <section>
            <h2 className="mb-4 font-serif text-2xl">
              1. Τι είναι τα cookies
            </h2>

            <p>
              Τα cookies είναι μικρά αρχεία που αποθηκεύονται στη συσκευή του
              χρήστη κατά την επίσκεψη σε μία ιστοσελίδα και μπορούν να
              χρησιμοποιούνται για τεχνική λειτουργία, αποθήκευση επιλογών και
              στατιστική ανάλυση.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-serif text-2xl">
              2. Απαραίτητα cookies
            </h2>

            <p>
              Μπορεί να χρησιμοποιούνται cookies ή αντίστοιχες τεχνολογίες που
              είναι απαραίτητες για τη σωστή, ασφαλή και αξιόπιστη λειτουργία
              της ιστοσελίδας.
            </p>

            <p className="mt-4">
              Τα cookies αυτά δεν χρησιμοποιούνται για διαφημιστικούς σκοπούς.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-serif text-2xl">
              3. Cookies στατιστικών / Google Analytics
            </h2>

            <p>
              Με τη συγκατάθεση του χρήστη, η ιστοσελίδα μπορεί να χρησιμοποιεί
              Google Analytics 4 για τη συλλογή στατιστικών πληροφοριών σχετικά
              με τη χρήση και την απόδοση του site.
            </p>

            <p className="mt-4">
              Ενδεικτικά μπορεί να καταγράφονται οι σελίδες που επισκέπτεται
              κάποιος, η διάρκεια επίσκεψης, ο τύπος συσκευής, το πρόγραμμα
              περιήγησης και πληροφορίες αλληλεπίδρασης με το περιεχόμενο.
            </p>

            <p className="mt-4">
              Τα μη απαραίτητα analytics cookies ενεργοποιούνται μόνο σύμφωνα
              με τις επιλογές συγκατάθεσης του χρήστη, όπου αυτό απαιτείται.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-serif text-2xl">
              4. Διαχείριση επιλογών
            </h2>

            <p>
              Κατά την πρώτη επίσκεψη, ο χρήστης μπορεί να αποδεχτεί ή να
              απορρίψει τα μη απαραίτητα cookies μέσω του μηχανισμού διαχείρισης
              συγκατάθεσης της ιστοσελίδας.
            </p>

            <p className="mt-4">
              Η απόρριψη των analytics cookies δεν εμποδίζει την κανονική
              πρόσβαση στο περιεχόμενο του site.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-serif text-2xl">
              5. Αλλαγές στην Πολιτική Cookies
            </h2>

            <p>
              Η παρούσα Πολιτική μπορεί να ενημερώνεται όταν αλλάζουν οι
              τεχνολογίες, οι υπηρεσίες ή οι νομικές απαιτήσεις που σχετίζονται
              με τη χρήση cookies.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}