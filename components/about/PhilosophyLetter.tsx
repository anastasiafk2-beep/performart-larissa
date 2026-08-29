import { Alegreya, Spectral } from "next/font/google";

const alegreya = Alegreya({
  subsets: ["latin", "greek"],
  weight: ["400", "500"],
});

const spectral = Spectral({
  subsets: ["latin", "greek"],
  weight: ["300", "400"],
});

export default function PhilosophyLetter() {
  return (
    <section className=" text-white">

      <div className="mx-auto grid w-full max-w-[1800px] grid-cols-13 pt-40 pb-40">

        {/* Άρθρο */}

        <div className="col-start-5 col-span-6 max-w-[900px]">

          <p
            className={`${alegreya.className} italic text-[23px] text-[#D62828]`}
          >
            Ένα σημείωμα από τον
          </p>

          <br></br>

          <h1
            className={`${spectral.className}
            mt-8
            text-[40px]
            uppercase
            tracking-[0.34em]
            leading-none
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
            mt-20
            space-y-14
            text-[20px]
            leading-[2]
            text-black`}
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

        <div className="col-start-8 col-span-5 mt-32">

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

    </section>
  );
}