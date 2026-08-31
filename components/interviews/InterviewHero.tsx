import { Alegreya, Spectral } from "next/font/google";

const alegreya = Alegreya({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["300", "400"],
});

export default function InterviewHero() {
  return (
    <section className=" z-10 text-white">

      <div className="mx-auto flex min-h-[70vh] max-w-[1100px] px-6 pt-32 pb-16 md:px-10">

        <div className="max-w-[900px] ">

          <p
            className={`${alegreya.className} mb-5 text-xs uppercase tracking-[0.35em] text-red-600 lg:text-[15px]`}
          >
            INTERVIEWS
          </p>
<br></br>
          <h1
            className={`${spectral.className} text-5xl uppercase tracking-[0.15em] text-black md:text-6xl lg:text-[55px]`}
          >
            ΣΥΝΕΝΤΕΥΞΕΙΣ
          </h1>

          <div/>
<br></br>
          <p
            className={`${alegreya.className} mx-auto mt-8 max-w-2xl text-lg italic leading-[1.9] text-black/90 md:text-xl`}
          >
            Κάθε συνέντευξη είναι μια συνάντηση ανθρώπων,
            <br />
            ιδεών και ιστοριών που φωτίζουν τον κόσμο.
           
          </p>

        </div>

      </div>

          <style jsx>{`
  @media (max-width: 767px) {

    /* =========================
       MOBILE — INTERVIEW HERO
       ========================= */

    section {
      width: 100% !important;
      max-width: 100% !important;

      overflow: hidden !important;

      padding: 0 !important;

      margin: 0 !important;
    }


    /* Κεντρικό hero container */
    section > div {
      width: 100% !important;
      max-width: 100% !important;

      min-height: 0 !important;

      padding: 115px 20px 45px !important;

      margin: 0 auto !important;

      display: flex !important;
      justify-content: center !important;

      text-align: center !important;

      transform: none !important;
    }


    /* Εσωτερικό περιεχόμενο */
    section > div > div {
  width: calc(100% + 20px) !important;
  max-width: none !important;

  margin-left: -20px !important;
  margin-right: 0 !important;

  padding: 0 !important;

  text-align: center !important;

  position: relative !important;
  left: 0 !important;
  transform: none !important;
}


    /* =========================
       INTERVIEWS
       ========================= */

    section p:first-child {
      display: block !important;

      width: 100% !important;

      margin: 0 0 14px !important;

      font-size: 9px !important;

      line-height: 1.2 !important;

      letter-spacing: 0.28em !important;

      text-align: center !important;
    }


    /* =========================
       ΣΥΝΕΝΤΕΥΞΕΙΣ
       ========================= */

   section h1 {
  display: block !important;

  width: 100% !important;
  max-width: 100% !important;

  margin: 0 !important;
  padding: 0 !important;

  font-size: 28px !important;
  line-height: 1.08 !important;
  letter-spacing: 0 !important;

  text-align: center !important;

  white-space: nowrap !important;
  overflow: visible !important;

  position: relative !important;

  transform: translateX(-25px) !important;
}


    /* =========================
       ΠΕΡΙΓΡΑΦΗ
       ========================= */

    section h1 + p {
      display: block !important;

      width: 100% !important;
      max-width: 330px !important;

      margin: 25px auto 0 !important;

      padding: 0 !important;

      font-size: 12px !important;

      line-height: 1.55 !important;

      text-align: center !important;
    }


    /* Τα χειροκίνητα br δεν
       δημιουργούν επιπλέον κενά */
    section br {
      display: none !important;
    }

  }
`}</style>
       

    </section>
  );
}
  