"use client";

import Image from "next/image";
import useMusic from "@/hooks/useMusic";
import useArtists from "@/hooks/useArtists";
import { Alegreya, Spectral } from "next/font/google";

const alegreya = Alegreya({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["300", "400"],
});

export default function MusicPage() {
   const { music } = useMusic();
  const { artists } = useArtists();

  const releases = music.slice(0, 3);
  const featuredArtists = artists.slice(0, 3);

  return (
    <main
      className="
        music-page
        min-h-screen
        overflow-x-hidden
        bg-white
        text-red-700
      "
      style={{
        backgroundImage: "url('/images/music/music-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundAttachment: "fixed",
      }}
    >

      {/* OVERLAY */}

      <div className="pointer-events-none absolute inset-0 bg-white" />


      {/* =====================================================
          MAIN CONTENT
          ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          min-h-screen
          w-full
          max-w-[1400px]

          px-5
          pt-[175px]
          pb-20

          lg:px-8
          lg:py-20
          lg:translate-x-[280px]
          lg:translate-y-[120px]
        "
      >

        {/* =================================================
            TITLE
            ================================================= */}

        <div className="music-title w-full">

          <div
            className={`
              ${alegreya.className}

              mb-3

              text-center
              text-[9px]
              uppercase
              tracking-[0.35em]
              text-red-700

              lg:text-left
              lg:text-[13px]
              lg:tracking-[0.45em]
            `}
          >
            MUSIC
          </div>


          <h1
            className={`
              ${spectral.className}

              m-0
              w-full

              text-center
              text-[34px]
              leading-none
              uppercase
              tracking-[0.08em]
              text-black

              lg:text-left
              lg:text-6xl
              lg:text-[55px]
              lg:tracking-[0.15em]
            `}
          >
            ΜΟΥΣΙΚΗ
          </h1>


          <div
            className="
              mx-auto
              mt-5
              h-px
              w-12
              bg-white

              lg:ml-0
              lg:mt-6
              lg:w-16
            "
          />

        </div>


        {/* =================================================
            ΝΕΕΣ ΚΥΚΛΟΦΟΡΙΕΣ + ΚΑΛΛΙΤΕΧΝΕΣ
            ================================================= */}

        <section
          className="
            music-sections

            mt-12

            grid
            grid-cols-1
            gap-8

            lg:mt-20
            lg:grid-cols-2
          "
        >

          {/* =================================================
              ΝΕΕΣ ΚΥΚΛΟΦΟΡΙΕΣ
              ================================================= */}

          <div
            className="
              music-releases

              w-full

              border
              border-[#E8C5C2]/90

              bg-white/70

              px-5
              py-7

              lg:px-8
              lg:py-8
            "
          >

            <h2
              className={`
                ${alegreya.className}

                mb-8

                text-center

                text-[11px]
                uppercase
                tracking-[0.25em]
                text-red-800

                lg:mb-10
                lg:text-[15px]
                lg:tracking-[0.35em]
              `}
            >
              ΝΕΕΣ ΚΥΚΛΟΦΟΡΙΕΣ
            </h2>


            {/* RELEASES */}

           <div
  className="
    music-release-grid

    grid
    grid-cols-1
    gap-8

    sm:grid-cols-3

    lg:grid-cols-3
    lg:gap-6
  "
>
  {releases.map((release) => (
    <div
      key={release.id}
      className="text-center"
    >
      <div
        className="
          relative
          mx-auto
          aspect-square
          w-full
          max-w-[180px]

          overflow-hidden

          border
          border-white/10
          bg-white/5
        "
      >
        {release.image && (
          <Image
            src={release.image}
            alt={release.title}
            fill
            className="object-cover"
            sizes="180px"
          />
        )}
      </div>

      <p
        className={`
          ${alegreya.className}

          mt-3

          text-[13px]
          leading-tight
          text-black
        `}
      >
        {release.title}
      </p>

      <p
        className={`
          ${alegreya.className}

          mt-1

          text-[10px]
          text-black/70
        `}
      >
        {release.artist || "Καλλιτέχνης"}
      </p>

      <p
        className={`
          ${alegreya.className}

          mt-1

          text-[11px]
          text-red-700
        `}
      >
        {new Date(release.date).getFullYear()}
      </p>
    </div>
  ))}
</div>


            {/* RELEASE BUTTON */}

            <div className="mt-8 text-center">

              <a
              href="/music/releases"
                className={`
                  ${alegreya.className}

                  inline-block

                  border
                  border-red-800

                  px-5
                  py-2.5

                  text-[9px]
                  uppercase
                  tracking-[0.22em]
                  text-black

                  transition-colors

                  hover:bg-white
                  hover:text-black

                  lg:px-7
                  lg:py-3
                  lg:text-[12px]
                  lg:tracking-[0.35em]
                `}
              >
                ΔΕΙΤΕ ΠΕΡΙΣΣΟΤΕΡΑ →
              </a>

            </div>

          </div>


          {/* =================================================
              ΚΑΛΛΙΤΕΧΝΕΣ
              ================================================= */}

          <div
            className="
              music-artists

              w-full

              border
              border-red-200

              bg-white/70

              px-5
              py-7

              lg:px-8
              lg:py-8
            "
          >

            <h2
              className={`
                ${alegreya.className}

                mb-8

                text-center

                text-[11px]
                uppercase
                tracking-[0.25em]
                text-red-800

                lg:mb-10
                lg:text-[15px]
                lg:tracking-[0.35em]
              `}
            >
              ΚΑΛΛΙΤΕΧΝΕΣ
            </h2>


            {/* ARTISTS */}

           {/* ARTISTS */}

<div
  className="
    music-artists-grid

    grid
    grid-cols-1
    gap-9

    sm:grid-cols-3

    lg:grid-cols-3
    lg:gap-6
  "
>
  {featuredArtists.map((artist) => (
    <div
      key={artist.id}
      className="text-center"
    >

      {/* PHOTO */}

      <div
        className="
          relative
          mx-auto

          h-20
          w-20

          overflow-hidden
          rounded-full

          border
          border-white/20

          bg-white/5

          lg:h-24
          lg:w-24
        "
      >
        {artist.image && (
          <Image
            src={artist.image}
            alt={artist.name}
            fill
            className="object-cover"
            sizes="96px"
          />
        )}
      </div>


      {/* NAME */}

      <p
        className={`
          ${alegreya.className}

          mt-4

          text-[13px]
          text-black

          lg:text-[15px]
        `}
      >
        {artist.name}
      </p>


      {/* GENRE */}

      {artist.genre && (
        <p
          className={`
            ${alegreya.className}

            mt-1

            text-[9px]
            uppercase
            tracking-[0.18em]
            text-red-700

            lg:mt-2
            lg:text-[11px]
            lg:tracking-[0.2em]
          `}
        >
          {artist.genre}
        </p>
      )}

    </div>
  ))}
</div>

            {/* ARTISTS BUTTON */}

            <div className="mt-8 text-center">

              <a
                href="/music/artists"
                className={`
                  ${alegreya.className}

                  inline-block

                  border
                  border-red-700

                  px-5
                  py-2.5

                  text-[9px]
                  uppercase
                  tracking-[0.22em]
                  text-black

                  transition-colors

                  hover:bg-white
                  hover:text-white

                  lg:px-7
                  lg:py-3
                  lg:text-[12px]
                  lg:tracking-[0.35em]
                `}
              >
                ΔΕΙΤΕ ΠΕΡΙΣΣΟΤΕΡΑ →
              </a>

            </div>

          </div>

        </section>


        {/* =================================================
            ΚΑΤΩ ΜΗΝΥΜΑ
            ================================================= */}

        <section
          className="
            mt-16
            pb-16
            text-center

            lg:mt-20
          "
        >

          <p
            className={`
              ${alegreya.className}

              text-[19px]
              italic
              leading-[1.5]
              text-black/70

              lg:text-[27px]
              lg:leading-[1.6]
            `}
          >
            Η μουσική γράφεται ακόμη.
          </p>


          <div className="mt-7 lg:mt-8">

            <span
              className={`
                ${alegreya.className}

                inline-block

                border
                border-black/30

                px-5
                py-2.5

                text-[9px]
                uppercase
                tracking-[0.22em]
                text-black/50

                lg:px-7
                lg:py-3
                lg:text-[16px]
                lg:tracking-[0.35em]
              `}
            >
              ΣΥΝΤΟΜΑ ΠΕΡΙΣΣΟΤΕΡΑ
            </span>

          </div>

        </section>

      </div>


      {/* =====================================================
          MOBILE
          ===================================================== */}

      <style>{`

        @media (max-width: 767px) {

          /* ===============================================
             GENERAL
             =============================================== */

          .music-page {
            width: 100% !important;
            max-width: 100% !important;
            overflow-x: hidden !important;
          }


          /* ===============================================
             MAIN CONTAINER
             =============================================== */

          .music-page > div.relative.z-10 {

            width: 100% !important;
            max-width: 100% !important;

            margin: 0 !important;

            padding-left: 24px !important;
            padding-right: 24px !important;

            padding-top: 175px !important;
            padding-bottom: 60px !important;

            transform: none !important;

            box-sizing: border-box !important;
          }


          /* ===============================================
             TITLE
             =============================================== */

          .music-page .music-title {

            width: 100% !important;

            margin: 0 !important;
            padding: 0 !important;

            text-align: center !important;
          }


          .music-page .music-title h1 {

            width: 100% !important;
            max-width: 100% !important;

            margin: 0 !important;

            font-size: 34px !important;

            line-height: 1 !important;

            letter-spacing: 0.08em !important;

            text-align: center !important;
          }


          /* ===============================================
             TWO MAIN SECTIONS
             =============================================== */

          .music-page .music-sections {

            display: flex !important;

            flex-direction: column !important;

            width: 100% !important;
            max-width: 100% !important;

            gap: 28px !important;

            margin-top: 45px !important;
          }


          /* ===============================================
             CARDS
             =============================================== */

          .music-page .music-releases,
          .music-page .music-artists {

            width: 100% !important;
            max-width: 100% !important;

            box-sizing: border-box !important;
          }


          /* ===============================================
             RELEASE GRID
             =============================================== */

          .music-page .music-release-grid {

            display: flex !important;

            flex-direction: column !important;

            align-items: center !important;

            width: 100% !important;

            gap: 30px !important;
          }


          .music-page .music-release-grid > div {

            width: 100% !important;
            max-width: 190px !important;

            margin: 0 auto !important;
          }


          /* ===============================================
             ARTIST GRID
             =============================================== */

          .music-page .music-artists-grid {

            display: flex !important;

            flex-direction: column !important;

            align-items: center !important;

            width: 100% !important;

            gap: 32px !important;
          }


          .music-page .music-artists-grid > div {

            width: 100% !important;
            max-width: 190px !important;

            margin: 0 auto !important;
          }


          /* ===============================================
             REMOVE MANUAL BR SPACING
             =============================================== */

          .music-page br {
            display: none !important;
          }


          /* ===============================================
             SECTION TITLES
             =============================================== */

          .music-page .music-releases h2,
          .music-page .music-artists h2 {

            margin-top: 0 !important;

            margin-bottom: 30px !important;

            font-size: 11px !important;

            line-height: 1.2 !important;

            letter-spacing: 0.25em !important;
          }


          /* ===============================================
             RELEASE TEXT
             =============================================== */

          .music-page .music-release-grid p {

            width: 100% !important;

            margin-left: auto !important;
            margin-right: auto !important;
          }


          /* ===============================================
             BUTTONS
             =============================================== */

          .music-page .music-releases > div:last-child,
          .music-page .music-artists > div:last-child {

            margin-top: 30px !important;

            text-align: center !important;
          }


          .music-page .music-releases a,
          .music-page .music-artists a {

            font-size: 9px !important;

            padding: 10px 16px !important;

            letter-spacing: 0.2em !important;
          }


          /* ===============================================
             BOTTOM MESSAGE
             =============================================== */

          .music-page section:last-child {

            width: 100% !important;

            margin-top: 55px !important;

            text-align: center !important;
          }


          .music-page section:last-child p {

            width: 100% !important;

            font-size: 18px !important;

            line-height: 1.5 !important;

            text-align: center !important;
          }


          .music-page section:last-child span {

            font-size: 9px !important;

            padding: 10px 16px !important;

            letter-spacing: 0.2em !important;
          }

        }


        /* =================================================
           VERY SMALL PHONES
           ================================================= */

        @media (max-width: 480px) {

          .music-page > div.relative.z-10 {

            padding-left: 24px !important;
            padding-right: 24px !important;

            padding-top: 175px !important;
          }


          .music-page .music-title h1 {

            font-size: 31px !important;

            letter-spacing: 0.06em !important;
          }


          .music-page .music-releases,
          .music-page .music-artists {

            padding-left: 20px !important;
            padding-right: 20px !important;
          }


          .music-page .music-release-grid > div,
          .music-page .music-artists-grid > div {

            max-width: 175px !important;
          }

        }

      `}</style>

    </main>
  );
}