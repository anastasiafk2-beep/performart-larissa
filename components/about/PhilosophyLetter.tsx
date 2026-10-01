"use client";

import { Alegreya, Spectral } from "next/font/google";

const alegreya = Alegreya({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["300", "400"],
});

export default function PhilosophyLetter() {
  return (
    <section className="philosophy-page text-white">
      <div className="philosophy-shell">
        <article className="philosophy-article">
          <p className={`${alegreya.className} philosophy-kicker`}>
            Ένα σημείωμα από τον
          </p>

          <h1 className={`${spectral.className} philosophy-title`}>
            ΕΥΡΙΠΙΔΗ ΚΟΥΤΣΙΝΑ
          </h1>

          <div className="philosophy-rule" />

          <div className={`${alegreya.className} philosophy-body`}>
            <p>
              «Πάντα πίστευα πως πίσω από κάθε παράσταση, κάθε τραγούδι και κάθε έργο
              τέχνης υπάρχει μια ιστορία που αξίζει να ακουστεί. Αυτή η σκέψη ήταν η
              αφορμή για να δημιουργήσω το The performART, έναν χώρο αφιερωμένο στον
              πολιτισμό και στους ανθρώπους που τον υπηρετούν.
            </p>

            <p>
              Μέσα από συνεντεύξεις, παρουσιάσεις, αφιερώματα και συνεργασίες με
              καλλιτέχνες, παραγωγές και φεστιβάλ, στόχος μου είναι να αναδεικνύω όχι
              μόνο το έργο τους αλλά και την ανθρώπινη πλευρά τους. Πιστεύω ότι οι πιο
              όμορφες συζητήσεις είναι εκείνες που ξεφεύγουν από τα τυπικά και αφήνουν
              χώρο στην αλήθεια, στη συγκίνηση και στην έμπνευση.
            </p>

            <p>
              Το The performART δημιουργήθηκε από αγάπη για την τέχνη και συνεχίζει να
              εξελίσσεται με την ίδια φιλοσοφία: να αποτελεί μια γέφυρα ανάμεσα στους
              δημιουργούς και στο κοινό, προβάλλοντας πολιτιστικές δράσεις με
              σεβασμό, συνέπεια και ουσία.
            </p>

            <p>
              Ευχαριστώ θερμά όλους τους καλλιτέχνες, συνεργάτες και αναγνώστες που
              στηρίζουν αυτό το ταξίδι με την παρουσία και την εμπιστοσύνη τους.
            </p>

            <p>Σας ευχαριστώ που είστε μέρος αυτής της διαδρομής.»</p>
          </div>

          <div className={`${alegreya.className} philosophy-signature`}>
            <p>Ευριπίδης Κουτσίνας</p>
            <p>Ιδρυτής του The performART – Larissa</p>
          </div>
        </article>
      </div>

      <style jsx>{`
        .philosophy-shell {
          width: min(60vw, 980px);
          margin: 60 auto;
          padding: clamp(30px, 20vmin, 105px) 0 clamp(64px, 8vmin, 92px);
        }

        .philosophy-article {
          width: 100%;
        }

        .philosophy-kicker {
          margin: 0 0 22px;
          color: #e52020;
          font-size: clamp(20px, 2vmin, 12px);
          font-style: serif;
          line-height: 2.3;
        }

        .philosophy-title {
          margin: 0;
          color: #ffffff;
          font-size: clamp(34px, 4.1vmin, 46px);
          font-weight: 300;
          line-height: 1.08;
          letter-spacing: clamp(0.12em, 0.8vw, 0.24em);
          text-transform: uppercase;
        }

        

        .philosophy-body {
          display: flex;
          flex-direction: column;
          gap: clamp(30px, 2.6vmin, 70px);
          width: 100%;
          margin-top: clamp(58px, 3.5vmin, 40px);
          color: rgba(255, 255, 255, 0.98);
          font-size: clamp(10px, 2.75vmin, 20px);
          line-height: 1.72;
        }

        .philosophy-body p {
          margin: 0;
        }

        .philosophy-signature {
          margin-top: clamp(32px, 5vmin, 46px);
          text-align: right;
          color:  rgba(255, 255, 255, 0.98);
        }

        .philosophy-signature p:first-child {
          margin: 0;
          font-size: clamp(21px, 2.5vmin, 27px);
          font-style: serif;
          line-height: 1.3;
        }

        .philosophy-signature p:last-child {
          margin: 6px 0 0;
          font-size: clamp(15px, 1.7vmin, 18px);
          line-height: 1.4;
        }

        @media (max-width: 767px) {
          .philosophy-shell {
            width: calc(100% - 40px);
            padding: 96px 0 58px;
          }

          .philosophy-kicker {
            margin-bottom: 9px;
            font-size: 17px;
          }

          .philosophy-title {
            font-size: clamp(26px, 7.2vw, 30px);
            line-height: 1.12;
            letter-spacing: 0.12em;
          }

          .philosophy-rule {
            width: 84px;
            margin-top: 18px;
          }

          .philosophy-body {
            gap: 20px;
            margin-top: 26px;
            font-size: 16px;
            line-height: 1.7;
          }

          .philosophy-signature {
            margin-top: 30px;
          }

          .philosophy-signature p:first-child {
            font-size: 20px;
          }

          .philosophy-signature p:last-child {
            font-size: 14px;
          }
        }
      `}</style>
    </section>
  );
}
