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
    <section className=" text-white">

      <div className="mx-auto grid w-full max-w-[1800px] grid-cols-1 md:grid-cols-13 pt-20 pb-20 md:pt-40 md:pb-40">

        {/* Άρθρο */}

        <div className="col-span-1 w-full max-w-[900px] px-6 md:col-start-5 md:col-span-6 md:px-0">

          <p
            className={`${alegreya.className} italic text-[23px] text-[#D62828]`}
          >
            Ένα σημείωμα από τον
          </p>

          <br></br>

          <h1
  className={`${spectral.className}
  mt-8
  text-[30px] md:text-[40px]
  uppercase
  tracking-[0.18em] md:tracking-[0.34em]
  leading-tight md:leading-none
  text-black`}
>
  ΕΥΡΙΠΙΔΗ ΚΟΥΤΣΙΝΑ
</h1>

<br></br>
<br></br>

          <div className="mt-12 h-[2px] w-28 bg-[#D62828]" />
<br></br>
<br></br>

          <div
  className={`${alegreya.className}
  mt-12 md:mt-20
  space-y-10 md:space-y-14
  text-[18px] leading-[1.8] md:text-[20px] md:leading-[2]
  text-black philosophy-body`}
>
            <p>
              Πάντα πίστευα πως πίσω από κάθε παράσταση, κάθε τραγούδι και κάθε έργο
              τέχνης υπάρχει μια ιστορία που αξίζει να ακουστεί. Αυτή η σκέψη ήταν η
              αφορμή για να δημιουργήσω το The performART, έναν χώρο αφιερωμένο στον
              πολιτισμό και στους ανθρώπους που τον υπηρετούν.
            </p>
<br></br>
            <p>
              Μέσα από συνεντεύξεις, παρουσιάσεις, αφιερώματα και συνεργασίες με
              καλλιτέχνες, παραγωγές και φεστιβάλ, στόχος μου είναι να αναδεικνύω όχι
              μόνο το έργο τους αλλά και την ανθρώπινη πλευρά τους. Πιστεύω ότι οι πιο
              όμορφες συζητήσεις είναι εκείνες που ξεφεύγουν από τα τυπικά και αφήνουν
              χώρο στην αλήθεια, στη συγκίνηση και στην έμπνευση.
            </p>
<br></br>
            <p>
              Το The performART δημιουργήθηκε από αγάπη για την τέχνη και συνεχίζει να
              εξελίσσεται με την ίδια φιλοσοφία: να αποτελεί μια γέφυρα ανάμεσα στους
              δημιουργούς και στο κοινό, προβάλλοντας πολιτιστικές δράσεις με
              σεβασμό, συνέπεια και ουσία.
            </p>
<br></br>
            <p>
              Ευχαριστώ θερμά όλους τους καλλιτέχνες, συνεργάτες και αναγνώστες που
              στηρίζουν αυτό το ταξίδι με την παρουσία και την εμπιστοσύνη τους.
            </p>
<br></br>
            <p>
              Σας ευχαριστώ που είστε μέρος αυτής της διαδρομής.
            </p>

            <br></br>
          </div>

        </div>

        {/* Υπογραφή */}

        <div className="col-span-1 mt-16 px-6 md:col-start-8 md:col-span-5 md:mt-32 md:px-0">

  <div className="ml-auto w-[420px]">
<br></br>
            <p
              className={`${alegreya.className}
              text-right
              italic
              text-[28px]
              text-black/80`}
            >
              Ευριπίδης Κουτσίνας
            </p>

            <p
              className={`${alegreya.className}
              mt-4
              text-right
              text-[19px]
              text-black/80`}
            >
              Ιδρυτής του The performART – Larissa
            </p>

            <br></br>
            <br></br>
            <br></br>

          </div>

        </div>

      </div>
<style jsx>{`
  /* =========================
     MOBILE PHILOSOPHY PAGE
     ========================= */

  @media (max-width: 767px) {

    /* Το grid της desktop έκδοσης
       γίνεται κανονικό μονόστηλο */
    section > div {
      display: block !important;
      width: 100% !important;
      max-width: 100% !important;
      padding-top: 120px !important;
      padding-bottom: 80px !important;
      padding-left: 32px !important;
      padding-right: 32px !important;
    }

    /* Κύριο άρθρο */
    section > div > div:first-child {
      display: block !important;
      width: 100% !important;
      max-width: none !important;
      margin: 0 !important;
    }

    /* "Ένα σημείωμα από τον" */
    section > div > div:first-child > p {
      font-size: 19px !important;
      line-height: 1.4 !important;
      margin: 0 0 20px 0 !important;
    }

    /* Όνομα */
    section > div > div:first-child h1 {
      font-size: 32px !important;
      line-height: 1.15 !important;
      letter-spacing: 0.18em !important;
      margin-top: 20px !important;
      margin-bottom: -10px !important;
      white-space: normal !important;
    }

    /* Κόκκινη γραμμή */
   section > div > div:first-child > div.mt-12.h-\[2px\] {
    margin-top: 25px !important;
    width: 110px !important;
  }

  /* Κείμενο άρθρου */
section > div > div:first-child > .philosophy-body {
  margin-top: 45px !important;
  width: 100% !important;
  max-width: none !important;
  padding: 0 !important;
  font-size: 18px !important;
  line-height: 1.8 !important;
}

    /* Κάθε παράγραφος */
     section > div > div:first-child > .philosophy-body p {
    margin: 0 !important;
    }

    /* Υπογραφή */
    section > div > div:last-child {
      display: block !important;
      width: 100% !important;
      margin: 60px 0 0 0 !important;
    }

    section > div > div:last-child > div {
      width: 100% !important;
      margin: 0 !important;
    }

    section > div > div:last-child p {
      font-size: 18px !important;
      line-height: 1.5 !important;
    }

    /* Μικρότερα κενά γύρω από το όνομα */
section > div > div:first-child h1 {
  margin-top: 5px !important;
  margin-bottom: -30px !important;
}

section > div > div:first-child > div.mt-12.h-\[2px\] {
  margin-top: 10px !important;
}

  }


  /* =========================
     VERY SMALL PHONES
     ========================= */

  @media (max-width: 480px) {

    section > div {
      padding-left: 28px !important;
      padding-right: 28px !important;
      padding-top: 105px !important;
    }

    section > div > div:first-child > p {
      font-size: 18px !important;
    }

    section > div > div:first-child h1 {
      font-size: 29px !important;
      letter-spacing: 0.15em !important;
    }

  section > div > div:first-child > .philosophy-body {
  width: 100% !important;
  max-width: none !important;
  padding: 0 !important;
  font-size: 18px !important;
  line-height: 1.8 !important;
}

  }
`}</style>
    </section>
  );
}