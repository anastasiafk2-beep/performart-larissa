import { Alegreya, Spectral } from "next/font/google";

const alegreya = Alegreya({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["300", "400"],
});

export default function CinemaHero() {
  return (
    <section
      className="
        relative
        overflow-hidden
      "
    >
      {/* Background */}

      {/* Overlay */}
      <div className="absolute inset-0 -z-10 " />

      <div
        className="
          mx-auto
          flex
          min-h-[40vh]
          max-w-[1900px]
          events-page
          px-20
          pt-60
          pb-44
        "
      >
        <div className="grid w-full max-w-[200px] grid-cols-[1fr_380px] gap-24">

          {/* ΤΙΤΛΟΣ FESTIVAL */}
          <div className="festival-hero-title max-w-[900px]">
            <br />
            <br />
            <br />

            <div
              className={`${alegreya.className} mb-4 text-[15px] uppercase tracking-[0.35em] text-[#B32025]`}
            >
              FESTIVAL
            </div>

            <br />

            <h1
              className={`${spectral.className} text-5xl uppercase tracking-[0.25em] text-black md:text-6xl lg:text-[57px]`}
            >
              ΦΕΣΤΙΒΑΛ
            </h1>

            <br />

            <p
              className={`${alegreya.className}
                mt-6
                text-[14px]
                uppercase
                tracking-[0.28em]
                text-black
              `}
            >
              ΜΟΥΣΙΚΗ&nbsp;&nbsp;•&nbsp;&nbsp;ΤΕΧΝΗ&nbsp;&nbsp;•&nbsp;&nbsp;ΘΕΑΤΡΟ
            </p>
          </div>

        </div>
      </div>

      {/* =========================================================
          MOBILE ONLY
          Το desktop παραμένει ακριβώς όπως είναι.
         ========================================================= */}
      <style>{`
        @media (max-width: 767px) {

          /* Το hero καταλαμβάνει ακριβώς το πλάτος της οθόνης */
          section {
            width: 100% !important;
            max-width: 100vw !important;
            min-width: 0 !important;
            overflow: hidden !important;
            box-sizing: border-box !important;
          }

          /* Ακυρώνουμε τα μεγάλα desktop margins/paddings */
          .events-page {
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;

            margin: 0 !important;
            padding: 125px 20px 55px !important;

            display: block !important;
            box-sizing: border-box !important;
          }

          /* Ακυρώνουμε το desktop grid/max-width που περιορίζει
             και μετακινεί τον τίτλο */
          .events-page > div {
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;

            margin: 0 !important;
            padding: 0 !important;

            display: block !important;
            box-sizing: border-box !important;
          }

          .festival-hero-title {
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;

            margin: 0 !important;
            padding: 0 !important;

            text-align: center !important;
            box-sizing: border-box !important;
          }

          /* Τα desktop <br> δεν χρειάζονται στο κινητό */
          .festival-hero-title > br {
            display: none !important;
          }

          /* FESTIVAL */
          .festival-hero-title > div {
            width: 100% !important;
            max-width: 100% !important;

            margin: 0 0 12px !important;
            padding: 0 !important;

            font-size: 11px !important;
            line-height: 1.3 !important;
            letter-spacing: 0.28em !important;

            box-sizing: border-box !important;
          }

          /* ΚΥΡΙΟΣ ΤΙΤΛΟΣ */
          .festival-hero-title h1 {
            width: 100% !important;
            max-width: 100% !important;

            margin: 0 !important;
            padding: 0 !important;

            font-size: 39px !important;
            line-height: 1.05 !important;
            letter-spacing: 0.14em !important;
            font-weight: 400 !important;

            text-align: center !important;
            white-space: nowrap !important;

            box-sizing: border-box !important;
          }

          /* ΥΠΟΤΙΤΛΟΣ */
          .festival-hero-title p {
            width: 100% !important;
            max-width: 100% !important;

            margin: 16px 0 0 !important;
            padding: 0 !important;

            font-size: 10px !important;
            line-height: 1.5 !important;
            letter-spacing: 0.18em !important;

            text-align: center !important;
            white-space: nowrap !important;

            box-sizing: border-box !important;
          }
        }
      `}</style>
    </section>
  );
}
