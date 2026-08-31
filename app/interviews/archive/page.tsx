"use client";

import Image from "next/image";
import Link from "next/link";
import useInterviews from "@/hooks/useInterviews";
import { Spectral, Alegreya } from "next/font/google";

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["300", "400"],
});

const alegreya = Alegreya({
  subsets: ["latin"],
  weight: ["400"],
});

export default function InterviewsArchivePage() {
  const { interviews } = useInterviews();
  const sortedInterviews = [...interviews].sort(
    (a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <main
      className="min-h-screen overflow-x-hidden bg-white text-[#111111]"
      style={{
        backgroundImage: "url('/backgrounds/cinema-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundAttachment: "fixed",
      }}
    >

      {/* OVERLAY */}

      <div className="pointer-events-none absolute inset-0 bg-white" />


      {/* =========================================================
          DESKTOP CONTENT
          ========================================================= */}

      <div className="relative z-10 mx-auto hidden w-full max-w-[1950px] flex-col items-center bg-white px-6 pb-28 pt-40 md:flex md:px-10 lg:px-12">

        <br />
        <br />

        {/* ΕΠΙΣΤΡΟΦΗ */}

        <div
          className="relative mt-8 flex -left-137 justify-start px-6 text-lg"
          style={{
            padding: "25px 17px",
          }}
        >
          <Link
            href="/interviews"
            className={`${alegreya.className} border border-[#C13B3A] px-8 py-3 text-xs uppercase tracking-[0.25em] text-black transition hover:bg-red-800 hover:text-white`}
            style={{
              fontSize: "14px",
              padding: "10px 17px",
            }}
          >
            ← ΠΙΣΩ ΣΤΙΣ ΣΥΝΕΝΤΕΥΞΕΙΣ
          </Link>
        </div>


        {/* ΤΙΤΛΟΣ */}

        <header className="mb-20">

          <p
            className={`${alegreya.className} mb-4 text-[15px] uppercase tracking-[0.45em] text-red-600`}
          >
            INTERVIEWS
          </p>

          <br />

          <h1
            className={`${spectral.className} text-5xl uppercase tracking-[0.16em] text-black md:text-6xl lg:text-5xl`}
          >
            ΟΛΕΣ ΟΙ ΣΥΝΕΝΤΕΥΞΕΙΣ
          </h1>

          <br />
          <div />
          <br />
          <br />

        </header>


        {/* GRID */}

        <section
          className="mx-auto grid w-full max-w-[1050px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          style={{ maxWidth: "1200px" }}
        >

          {sortedInterviews.map((interview) => (

            <Link
              key={interview.id}
              href={`/interviews/${interview.id}`}
              className="group block"
            >

              <article
                className="overflow-hidden border border-[#BBAEBD] bg-white"
                style={{ maxWidth: "290px" }}
              >

                {/* ΦΩΤΟΓΡΑΦΙΑ */}

                <div className="relative overflow-hidden bg-white">

                  {interview.image ? (
                    <Image
                      src={interview.image}
                      alt={interview.title}
                      width={800}
                      height={500}
                      className="block h-auto w-full object-cover"
                    />
                  ) : (
                    <div className="flex aspect-[2/3] w-full items-center justify-center bg-white">
                      <span className="text-[10px] tracking-[0.3em] text-white">
                        INTERVIEW STORIES
                      </span>
                    </div>
                  )}

                  {/* HOVER */}

                  <div className="absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/15" />

                </div>


                {/* ΚΕΙΜΕΝΟ */}

                <div className="px-5 py-5">

                  <p
                    className={`${alegreya.className} text-[14px] uppercase tracking-[0.3em] text-red-800`}
                    style={{
                      paddingLeft: "14px",
                      paddingRight: "24px",
                    }}
                  >
                    {new Date(interview.date).toLocaleDateString("el-GR")}
                  </p>


                  <h2
                    className={`${spectral.className} mt-3 text-[17px] leading-tight text-black`}
                    style={{
                      paddingLeft: "12px",
                      paddingRight: "24px",
                    }}
                  >
                    {interview.title}
                  </h2>


                  <br />


                  <div
                    className={`${alegreya.className} mt-6 inline-block border-b border-[#C13B3A] pb-1 text-[13px] uppercase tracking-[0.25em] text-red-700 transition group-hover:text-[#C13B3A]`}
                    style={{
                      paddingLeft: "14px",
                      paddingRight: "24px",
                    }}
                  >
                    ΔΙΑΒΑΣΤΕ ΤΟ ΑΡΘΡΟ →
                  </div>

                </div>

              </article>

            </Link>

          ))}

        </section>

      </div>


      {/* =========================================================
          MOBILE CONTENT
          ========================================================= */}

      <div className="interviews-archive-mobile">

        {/* MOBILE BACK */}

        <div className="interviews-archive-mobile-back">

  <Link href="/interviews">
    ← ΠΙΣΩ ΣΤΙΣ ΣΥΝΕΝΤΕΥΞΕΙΣ
  </Link>

</div>


        {/* MOBILE TITLE */}

        <header className="interviews-archive-mobile-header">

          <p className={alegreya.className}>
            INTERVIEWS
          </p>

          <h1 className={spectral.className}>
            ΟΛΕΣ ΟΙ
            <br />
            ΣΥΝΕΝΤΕΥΞΕΙΣ
          </h1>

        </header>


        {/* MOBILE CARDS */}

        <section className="interviews-archive-mobile-grid">

          {sortedInterviews.map((interview) => (

            <Link
              key={interview.id}
              href={`/interviews/${interview.id}`}
              className="interviews-archive-mobile-link"
            >

              <article className="interviews-archive-mobile-card">

                {/* IMAGE */}

                <div className="interviews-archive-mobile-image">

                  {interview.image ? (
                    <Image
                      src={interview.image}
                      alt={interview.title}
                      width={800}
                      height={500}
                      className="interviews-archive-mobile-img"
                    />
                  ) : (
                    <div className="interviews-archive-mobile-empty">
                      INTERVIEW STORIES
                    </div>
                  )}

                </div>


                {/* TEXT */}

                <div className="interviews-archive-mobile-content">

                  <p className={alegreya.className}>
                    {new Date(interview.date).toLocaleDateString("el-GR")}
                  </p>

                  <h2 className={spectral.className}>
                    {interview.title}
                  </h2>

                  <span className={alegreya.className}>
                    ΔΙΑΒΑΣΤΕ ΤΟ ΑΡΘΡΟ →
                  </span>

                </div>

              </article>

            </Link>

          ))}

        </section>

      </div>


      {/* =========================================================
          MOBILE CSS
          ========================================================= */}

      <style jsx>{`

        /* =====================================================
           MOBILE ARCHIVE
           ===================================================== */

       .interviews-archive-mobile {
  display: block;

  position: relative;
  z-index: 20;

  width: 100%;
  min-height: 100vh;

  margin: 0;

  /* Αφήνουμε χώρο κάτω από το fixed Header/logo */
  padding: 125px 20px 100px 20px;

  background: #ffffff;

  box-sizing: border-box;
}


  .interviews-archive-mobile-back {
  display: flex;

  width: 100%;

  margin: 0 0 55px 0;
  padding: 0;

  justify-content: flex-start;

  box-sizing: border-box;
}


       .interviews-archive-mobile-back a {
  display: inline-flex;

  align-items: center;
  justify-content: center;

  min-height: 38px;

  margin: 0;
  padding: 8px 12px;

  border: 1px solid #C13B3A;

  background: #ffffff;

  color: #000000;

  font-size: 8px;
  line-height: 1.2;

  letter-spacing: 0.16em;

  text-transform: uppercase;
  text-decoration: none;

  box-sizing: border-box;
}


        /* =====================================================
           TITLE
           ===================================================== */

        .interviews-archive-mobile-header {
          display: block;

          width: 100%;

          margin: 0 0 48px 0;
          padding: 0;

          text-align: center;

          box-sizing: border-box;
        }


        .interviews-archive-mobile-header p {
          display: block;

          width: 100%;

          margin: 0 0 13px 0;
          padding: 0;

          color: #dc2626;

          font-size: 8px;

          line-height: 1.2;

          letter-spacing: 0.28em;

          text-align: center;

          text-transform: uppercase;
        }


        .interviews-archive-mobile-header h1 {
          display: block;

          width: 100%;

          margin: 0;
          padding: 0;

          color: #000000;

          font-size: 28px;

          line-height: 1.05;

          font-weight: 400;

          letter-spacing: 0.04em;

          text-align: center;

          text-transform: uppercase;

          box-sizing: border-box;
        }


        /* =====================================================
           CARDS GRID
           ===================================================== */

        .interviews-archive-mobile-grid {
          display: flex;

          flex-direction: column;

          align-items: center;

          width: 100%;

          max-width: 390px;

          margin: 0 auto;
          padding: 0;

          gap: 30px;

          box-sizing: border-box;
        }


        .interviews-archive-mobile-link {
          display: block;

          width: 100%;

          max-width: 390px;

          margin: 0;
          padding: 0;

          text-decoration: none;

          box-sizing: border-box;
        }


        /* =====================================================
           CARD
           ===================================================== */

        .interviews-archive-mobile-card {
          display: block;

          width: 100%;

          max-width: 390px;

          margin: 0;
          padding: 0;

          overflow: hidden;

          border: 1px solid #BBAEBD;

          background: #ffffff;

          box-sizing: border-box;
        }


        /* =====================================================
           IMAGE
           ===================================================== */

        .interviews-archive-mobile-image {
          display: block;

          width: 100%;

          margin: 0;
          padding: 0;

          overflow: hidden;

          background: #ffffff;

          box-sizing: border-box;
        }


        .interviews-archive-mobile-img {
          display: block;

          width: 100%;
          height: auto;

          max-width: 100%;

          margin: 0;
          padding: 0;

          object-fit: cover;

          box-sizing: border-box;
        }


        .interviews-archive-mobile-empty {
          display: flex;

          width: 100%;
          min-height: 220px;

          align-items: center;
          justify-content: center;

          color: #000000;

          font-size: 9px;

          letter-spacing: 0.2em;
        }


        /* =====================================================
           CARD TEXT
           ===================================================== */

        .interviews-archive-mobile-content {
          display: block;

          width: 100%;

          margin: 0;
          padding: 17px 18px 20px 18px;

          box-sizing: border-box;
        }


        .interviews-archive-mobile-content p {
          display: block;

          width: 100%;

          margin: 0;
          padding: 0;

          color: #991b1b;

          font-size: 9px;

          line-height: 1.2;

          letter-spacing: 0.2em;

          text-transform: uppercase;

          box-sizing: border-box;
        }


        .interviews-archive-mobile-content h2 {
          display: block;

          width: 100%;

          margin: 10px 0 0 0;
          padding: 0;

          color: #000000;

          font-size: 18px;

          line-height: 1.12;

          font-weight: 400;

          letter-spacing: 0;

          box-sizing: border-box;
        }


        .interviews-archive-mobile-content span {
          display: inline-block;

          margin: 17px 0 0 0;
          padding: 0 0 2px 0;

          border-bottom: 1px solid #C13B3A;

          color: #991b1b;

          font-size: 8px;

          line-height: 1.2;

          letter-spacing: 0.18em;

          text-transform: uppercase;

          box-sizing: border-box;
        }


        /* =====================================================
           SMALL PHONES
           ===================================================== */

        @media (max-width: 380px) {

          .interviews-archive-mobile {
            padding-left: 16px;
            padding-right: 16px;
          }

          .interviews-archive-mobile-header h1 {
            font-size: 26px;
          }

          .interviews-archive-mobile-grid {
            max-width: 100%;
          }

          .interviews-archive-mobile-link,
          .interviews-archive-mobile-card {
            max-width: 100%;
          }

          .interviews-archive-mobile-content h2 {
            font-size: 17px;
          }
        }


        /* =====================================================
           DESKTOP — HIDE MOBILE VERSION
           ===================================================== */

        @media (min-width: 768px) {
          .interviews-archive-mobile {
            display: none !important;
          }
        }


        /* =====================================================
           MOBILE — SHOW MOBILE VERSION
           ===================================================== */

        @media (max-width: 767px) {
          .interviews-archive-mobile {
            display: block !important;
          }
        }

      `}</style>

    </main>
  );
}