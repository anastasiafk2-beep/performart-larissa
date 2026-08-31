import Image from "next/image";
import Link from "next/link";
import { getInterviews } from "@/lib/interviews-data";
import { Spectral, Alegreya } from "next/font/google";

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["300", "400"],
});

const alegreya = Alegreya({
  subsets: ["latin"],
  weight: ["400"],
});

type InterviewPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function InterviewPage({
  params,
}: InterviewPageProps) {
  const { id } = await params;
const interviews = await getInterviews();
  const interview = interviews.find(
    (item) => item.id === id
  );

  if (!interview) {
    return (
      <main className="flex min-h-screen bg-white">
        <div className="w-full px-6 py-24">
          <h1
            className={`${spectral.className} text-4xl text-black`}
          >
            Η συνέντευξη δεν βρέθηκε
          </h1>

          <Link
            href="/interviews"
            className={`${alegreya.className} mt-8 inline-block border border-[#C13B3A] px-8 py-3 text-xs uppercase tracking-[0.25em] text-black`}
          >
            ← ΠΙΣΩ ΣΤΙΣ ΣΥΝΕΝΤΕΥΞΕΙΣ
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main
      className="
        min-h-screen
        interview-page
        bg-white
        text-[#2B2B2B]
        overflow-x-hidden
      "
      style={{
        backgroundImage:
          "url('/backgrounds/cinema-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundAttachment: "fixed",
      }}
    >

      {/* OVERLAY */}

      <div className="pointer-events-none absolute inset-0 bg-white" />


      {/* =====================================================
          MAIN INTERVIEW
          ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-[1200px]

          px-5
          pt-[250px]
          pb-16

          lg:px-12
          lg:py-24
          lg:left-[460px]
          lg:top-[120px]
        "
      >

        {/* =================================================
            BACK
            ================================================= */}

        <div
          className="
            mb-8
            w-full

            lg:mb-12
          "
        >

          <Link
            href="/interviews"
            className={`
              ${alegreya.className}

              inline-block

              border-0
              px-0
              py-0

              text-[10px]
              uppercase
              tracking-[0.18em]
              text-black

              lg:relative
              lg:left-[-250px]
              lg:top-[-15px]
              lg:border
              lg:border-[#C13B3A]
              lg:px-8
              lg:py-3
              lg:text-xs
              lg:tracking-[0.25em]

              transition
              hover:bg-red-700
              hover:text-white
            `}
          >
            ← ΠΙΣΩ ΣΤΙΣ ΣΥΝΕΝΤΕΥΞΕΙΣ
          </Link>

        </div>


        {/* =================================================
            DATE
            ================================================= */}

        <p
          className={`
            ${alegreya.className}

            text-[10px]
            uppercase
            tracking-[0.25em]
            text-red-600

            lg:text-xs
            lg:tracking-[0.35em]
          `}
        >
          {new Date(interview.date).toLocaleDateString(
            "el-GR"
          )}
        </p>


        {/* =================================================
            TITLE
            ================================================= */}

        <h1
          className={`
            ${spectral.className}

            mt-3

            w-full
            max-w-full

            text-[28px]
            leading-[1.12]
            text-black

            break-words

            lg:mt-6
            lg:max-w-4xl
            lg:text-4xl
            lg:leading-tight
          `}
        >
          {interview.title}
        </h1>


        {/* =================================================
            IMAGE
            ================================================= */}

        {interview.image && (
          <div
            className="
              relative

              mx-auto
              mt-8

              w-full
              max-w-[700px]

              overflow-hidden

              lg:mt-12
              lg:max-w-[800px]
            "
          >

            <Image
              src={interview.image}
              alt={interview.title}
              width={1200}
              height={800}
              className="
                block
                h-auto
                w-full
                object-contain
              "
              priority
            />

          </div>
        )}


        {/* =================================================
            INTERVIEW CONTENT
            ================================================= */}

        <div
          className="
            mx-auto
            mt-8

            w-full
            max-w-[700px]

            lg:mt-14
            lg:max-w-[850px]
          "
        >

          {/* =================================================
              DESCRIPTION
              ================================================= */}

          <p
            className={`
              ${alegreya.className}

              w-full

              text-[16px]
              leading-[1.5]
              text-black/75

              lg:text-xl
              lg:leading-relaxed
            `}
          >
            {interview.description}
          </p>


          {/* =================================================
              VIDEO
              ================================================= */}

          {interview.type === "video" &&
            interview.youtubeId && (
              <div
                className="
                  mt-8

                  aspect-video
                  w-full

                  overflow-hidden

                  lg:mt-12
                "
              >

                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${interview.youtubeId}`}
                  title={interview.title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />

              </div>
            )}


          {/* =================================================
              ARTICLE
              ================================================= */}

          {interview.type === "article" &&
            interview.url && (
              <div
                className="
                  mt-8
                  w-full

                  lg:mt-12
                "
              >

                <a
                  href={interview.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    ${alegreya.className}

                    inline-flex
                    items-center
                    justify-center

                    border-0
                    px-0
                    py-0

                    text-[10px]
                    uppercase
                    tracking-[0.18em]
                    text-black

                    lg:relative
                    lg:left-[760px]
                    lg:top-[10px]
                    lg:border
                    lg:border-[#C13B3A]
                    lg:px-8
                    lg:py-4
                    lg:text-sm
                    lg:tracking-[0.25em]

                    transition
                    hover:bg-red-700
                    hover:text-white
                  `}
                >
                  ΔΙΑΒΑΣΤΕ ΤΟ ΑΡΘΡΟ →
                </a>

              </div>
            )}

        </div>

      </div>


      {/* =====================================================
          MOBILE CSS
          ΙΔΙΑ ΛΟΓΙΚΗ ΜΕ ΤΟ EVENTS PAGE
          ===================================================== */}

      <style>{`

        @media (max-width: 767px) {

          /* ===============================================
             MOBILE — INTERVIEW PAGE
             =============================================== */


          /* -----------------------------------------------
             ΚΡΥΒΟΥΜΕ ΟΛΑ ΤΑ ΧΕΙΡΟΚΙΝΗΤΑ BR
             ----------------------------------------------- */

          .interview-page br {
            display: none !important;
          }


          /* -----------------------------------------------
             ΓΕΝΙΚΑ ΠΕΡΙΘΩΡΙΑ
             ----------------------------------------------- */

          .interview-page > div.relative.z-10 {
            width: 100% !important;
            max-width: 100% !important;

            padding-left: 24px !important;
            padding-right: 24px !important;

            box-sizing: border-box !important;
          }


          /* -----------------------------------------------
             MAIN INTERVIEW
             ----------------------------------------------- */

          .interview-page > div.relative.z-10 {

            padding-top: 175px !important;
            padding-bottom: 70px !important;

            margin: 0 !important;

            left: auto !important;
            right: auto !important;
            top: auto !important;

            transform: none !important;
          }


          /* -----------------------------------------------
             BACK BUTTON
             ----------------------------------------------- */

          .interview-page > div.relative.z-10 > div:first-child {

            position: relative !important;

            width: 100% !important;

            margin: 0 0 28px 0 !important;
            padding: 0 !important;

            left: auto !important;
            right: auto !important;
            top: auto !important;
          }


          .interview-page > div.relative.z-10 > div:first-child a {

            position: static !important;

            display: inline-flex !important;

            width: auto !important;

            margin: 0 !important;
            padding: 0 !important;

            border: none !important;

            font-size: 8px !important;

            line-height: 1.2 !important;

            letter-spacing: 0.15em !important;

            white-space: nowrap !important;
          }


          /* -----------------------------------------------
             DATE
             ----------------------------------------------- */

          .interview-page > div.relative.z-10 > p {

            width: 100% !important;

            margin: 0 !important;
            padding: 0 !important;

            font-size: 8px !important;

            line-height: 1.2 !important;

            letter-spacing: 0.2em !important;
          }


          /* -----------------------------------------------
             TITLE
             ----------------------------------------------- */

          .interview-page > div.relative.z-10 > h1 {

            display: block !important;

            position: static !important;

            width: 100% !important;
            max-width: 100% !important;

            margin: 10px 0 0 0 !important;
            padding: 0 !important;

            font-size: 27px !important;

            line-height: 1.05 !important;

            letter-spacing: 0 !important;

            text-align: left !important;

            white-space: normal !important;

            overflow-wrap: break-word !important;

            word-break: normal !important;
          }


          /* -----------------------------------------------
             IMAGE
             ----------------------------------------------- */

          .interview-page > div.relative.z-10 > div:nth-of-type(2) {

            position: relative !important;

            width: 100% !important;
            max-width: 100% !important;

            margin: 28px auto 0 auto !important;

            padding: 0 !important;

            left: auto !important;
            right: auto !important;

            box-sizing: border-box !important;
          }


          .interview-page > div.relative.z-10 > div:nth-of-type(2) img {

            display: block !important;

            width: 100% !important;
            max-width: 100% !important;

            height: auto !important;

            margin: 0 auto !important;
            padding: 0 !important;

            object-fit: contain !important;
          }


          /* -----------------------------------------------
             CONTENT
             ----------------------------------------------- */

          .interview-page > div.relative.z-10 > div:last-child {

            width: 100% !important;
            max-width: 100% !important;

            margin: 28px auto 0 auto !important;

            padding: 0 !important;

            box-sizing: border-box !important;
          }


          /* -----------------------------------------------
             DESCRIPTION
             ----------------------------------------------- */

          .interview-page > div.relative.z-10 > div:last-child > p {

            width: 100% !important;
            max-width: 100% !important;

            margin: 0 !important;
            padding: 0 !important;

            font-size: 14px !important;

            line-height: 1.5 !important;
          }


          /* -----------------------------------------------
             VIDEO
             ----------------------------------------------- */

          .interview-page iframe {

            display: block !important;

            width: 100% !important;
            max-width: 100% !important;

            height: auto !important;

            aspect-ratio: 16 / 9 !important;

            margin-top: 24px !important;
          }


          /* -----------------------------------------------
             ARTICLE BUTTON
             ----------------------------------------------- */

          .interview-page > div.relative.z-10 > div:last-child > div a {

            position: static !important;

            left: auto !important;
            right: auto !important;
            top: auto !important;

            display: inline-flex !important;

            margin: 25px 0 0 0 !important;

            padding: 0 !important;

            border: none !important;

            font-size: 8px !important;

            line-height: 1.2 !important;

            letter-spacing: 0.16em !important;
          }

        }


        /* =====================================================
           VERY SMALL MOBILE
           ===================================================== */

        @media (max-width: 480px) {

          .interview-page > div.relative.z-10 {

            padding-left: 24px !important;
            padding-right: 24px !important;

            padding-top: 175px !important;
          }


          .interview-page > div.relative.z-10 > h1 {

            font-size: 25px !important;

            line-height: 1.06 !important;
          }


          .interview-page > div.relative.z-10 > div:last-child > p {

            font-size: 14px !important;

            line-height: 1.5 !important;
          }

        }

      `}</style>

    </main>
  );
}