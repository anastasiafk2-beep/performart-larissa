import CinemaCalendar from "@/components/cinema/CinemaCalendar";
import CinemaNowPlaying from "@/components/cinema/CinemaNowPlaying";
import CinemaHero from "@/components/cinema/CinemaHero";
import Footer from "@/components/layout/Footer";
import CinemaReviews from "@/components/cinema/CinemaReviews";

export default function CinemaPage() {
  return (
    <main
      className="
        cinema-page
        overflow-x-hidden
        bg-white
      "
    >

      {/* =====================================================
          LIGHT OVERLAY
          ===================================================== */}

      <div className="absolute inset-0 bg-white pointer-events-none" />


      {/* =====================================================
          MAIN CONTENT
          ===================================================== */}

      <div className="relative z-10">

        {/* =================================================
            HERO
            ================================================= */}

        <div className="cinema-hero">
          <CinemaHero />
        </div>


        {/* =================================================
            CALENDAR + NOW PLAYING
            ================================================= */}

        <section
          className="
            cinema-main-section

            mx-auto
            flex
            justify-center

            px-5
            py-10

            lg:px-8
            lg:py-12
          "
        >

          <div
            className="
              cinema-main-grid

              grid
              w-full
              max-w-[1300px]

              grid-cols-1
              gap-10

              lg:grid-cols-[700px_1fr]
              lg:gap-20
              lg:items-center
            "
          >

            {/* =================================================
                ΗΜΕΡΟΛΟΓΙΟ
                ================================================= */}

            <div
              className="
                cinema-calendar-section

                flex
                w-full
                flex-col
              "
            >

              <h2
                className="
                  font-serif

                  text-[18px]
                  leading-tight

                  tracking-[0.18em]

                  text-black

                  lg:text-[20px]
                  lg:tracking-[6.2px]
                "
              >
                ΗΜΕΡΟΛΟΓΙΟ ΠΡΟΒΟΛΩΝ
              </h2>


              <div
                className="
                  mt-6

                  w-full
                "
              >
                <CinemaCalendar />
              </div>

            </div>


            {/* =================================================
                ΤΙ ΠΑΙΖΕΙ
                ================================================= */}

            <div
              className="
                cinema-now-playing-section

                w-full

                lg:mt-[100px]
              "
            >
              <CinemaNowPlaying />
            </div>

          </div>

        </section>


        {/* =================================================
            REVIEWS
            ================================================= */}

        <section
          className="
            cinema-reviews-section

            w-full

            mt-8

            lg:mt-0
          "
        >
          <CinemaReviews />
        </section>


        {/* =================================================
            FOOTER
            ================================================= */}

        

      </div>


      {/* =====================================================
          MOBILE
          ===================================================== */}

      <style>{`

        @media (max-width: 767px) {

          /* ===============================================
             GENERAL
             =============================================== */

          .cinema-page {

            width: 100% !important;
            max-width: 100% !important;

            overflow-x: hidden !important;

            box-sizing: border-box !important;
          }


          /* ===============================================
             HERO
             Ίδια λογική με τη σελίδα FESTIVAL:
             το desktop component μένει ανέγγιχτο και
             προσαρμόζεται μόνο μέσα από το page.
             =============================================== */

          .cinema-page .cinema-hero {
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;

            overflow: hidden !important;

            box-sizing: border-box !important;
          }

          .cinema-page .cinema-hero > * {
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;

            box-sizing: border-box !important;
          }

          /* Ακυρώνουμε στο mobile το desktop padding/
             positioning του CinemaHero container. */
          .cinema-page .cinema-hero .cinema-hero-container {
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;

            margin: 0 !important;

            padding: 125px 20px 55px !important;

            display: block !important;

            box-sizing: border-box !important;
          }

          /* Ακυρώνουμε το desktop grid που μετακινεί
             τον τίτλο και το κάνουμε μία mobile στήλη. */
          .cinema-page .cinema-hero .cinema-hero-grid {
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;

            margin: 0 !important;
            padding: 0 !important;

            display: block !important;

            box-sizing: border-box !important;
          }

          .cinema-page .cinema-hero .cinema-hero-title {
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;

            margin: 0 !important;
            padding: 0 !important;

            text-align: center !important;

            box-sizing: border-box !important;
          }

          /* Τα desktop κενά του hero δεν χρειάζονται */
          .cinema-page .cinema-hero .cinema-hero-title > br {
            display: none !important;
          }

          .cinema-page .cinema-hero .cinema-hero-title > div {
            width: 100% !important;
            max-width: 100% !important;

            margin: 0 0 12px !important;
            padding: 0 !important;

            font-size: 11px !important;
            line-height: 1.3 !important;
            letter-spacing: 0.28em !important;

            text-align: center !important;
          }

          .cinema-page .cinema-hero .cinema-hero-title h1 {
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

          .cinema-page .cinema-hero .cinema-hero-title p {
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

          /* ===============================================
             MAIN SECTION
             =============================================== */

          .cinema-page .cinema-main-section {

            width: 100% !important;
            max-width: 100% !important;

            margin: 0 !important;

            padding-left: 24px !important;
            padding-right: 24px !important;

            padding-top: 35px !important;
            padding-bottom: 45px !important;

            box-sizing: border-box !important;
          }


          /* ===============================================
             MAIN GRID
             =============================================== */

          .cinema-page .cinema-main-grid {

            display: flex !important;

            flex-direction: column !important;

            width: 100% !important;
            max-width: 100% !important;

            gap: 0 !important;

            margin: 0 !important;

            padding: 0 !important;

            box-sizing: border-box !important;
          }


          /* ===============================================
             CALENDAR
             =============================================== */

          .cinema-page .cinema-calendar-section {

            display: flex !important;

            flex-direction: column !important;

            width: 100% !important;
            max-width: 100% !important;

            margin: 0 !important;
            padding: 0 !important;

            box-sizing: border-box !important;
          }


          .cinema-page .cinema-calendar-section h2 {

            width: 100% !important;

            margin: 0 !important;
            padding: 0 !important;

            font-size: 17px !important;

            line-height: 1.2 !important;

            letter-spacing: 0.16em !important;

            text-align: left !important;

            box-sizing: border-box !important;
          }


          .cinema-page .cinema-calendar-section > div {

            width: 100% !important;
            max-width: 100% !important;

            margin: 22px 0 0 0 !important;

            padding: 0 !important;

            box-sizing: border-box !important;
          }


          /* ===============================================
             NOW PLAYING
             =============================================== */

          .cinema-page .cinema-now-playing-section {

            width: 100% !important;
            max-width: 100% !important;

            margin: 45px 0 0 0 !important;

            padding: 0 !important;

            box-sizing: border-box !important;
          }


          /* ΑΚΥΡΩΝΟΥΜΕ ΤΟ DESKTOP marginTop: 100px */

          .cinema-page .cinema-now-playing-section {

            transform: none !important;
          }


          /* ===============================================
             REVIEWS
             =============================================== */

          .cinema-page .cinema-reviews-section {

            width: 100% !important;
            max-width: 100% !important;

            margin: 0 !important;

            padding-left: 24px !important;
            padding-right: 24px !important;

            box-sizing: border-box !important;
          }


          /* ===============================================
             REMOVE MANUAL BR SPACING
             =============================================== */

          .cinema-page br {

            display: none !important;
          }

        }


        /* =================================================
           VERY SMALL PHONES
           ================================================= */

        @media (max-width: 480px) {

          .cinema-page .cinema-main-section {

            padding-left: 24px !important;
            padding-right: 24px !important;

            padding-top: 30px !important;
          }


          .cinema-page .cinema-calendar-section h2 {

            font-size: 16px !important;

            letter-spacing: 0.14em !important;
          }


          .cinema-page .cinema-now-playing-section {

            margin-top: 40px !important;
          }

        }

      `}</style>

    </main>
  );
}