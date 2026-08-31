import Image from "next/image";
import Link from "next/link";
import { Alegreya, Spectral } from "next/font/google";

import { getArtists } from "@/lib/artists-data";

const alegreya = Alegreya({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["300", "400"],
});

export default async function ArtistsPage() {
  const artists = await getArtists();

  return (
    <main
      className="
        min-h-screen
        overflow-x-hidden
        bg-white
        text-[#171717]
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1300px]

          px-6
          pt-[170px]
          pb-24

          lg:px-12
          lg:pt-[180px]
        "
      >
        {/* BACK */}

        <Link
          href="/music"
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

            hover:bg-red-800
            hover:text-white

            lg:px-7
            lg:py-3
            lg:text-[11px]
          `}
        >
          ← ΠΙΣΩ ΣΤΗ ΜΟΥΣΙΚΗ
        </Link>


        {/* TITLE */}

        <header className="mt-14">

          <p
            className={`
              ${alegreya.className}

              text-[10px]
              uppercase
              tracking-[0.35em]
              text-red-700

              lg:text-[12px]
            `}
          >
            MUSIC
          </p>

          <h1
            className={`
              ${spectral.className}

              mt-3

              text-[38px]
              leading-none
              text-black

              lg:text-[58px]
            `}
          >
            ΚΑΛΛΙΤΕΧΝΕΣ
          </h1>

          <div
            className="
              mt-6
              h-px
              w-16
              bg-red-700
            "
          />

        </header>


        {/* ARTISTS GRID */}

        <section
          className="
            mt-16

            grid
            grid-cols-1

            gap-x-10
            gap-y-14

            sm:grid-cols-2

            lg:mt-20
            lg:grid-cols-3
            lg:gap-x-12
            lg:gap-y-16
          "
        >
          {artists.map((artist) => (
            <article
              key={artist.id}
              className="text-center"
            >

              {/* IMAGE */}

              <Link
                href={`/music/artists/${artist.id}`}
                className="
                  relative

                  mx-auto
                  block

                  h-[180px]
                  w-[180px]

                  overflow-hidden
                  rounded-full

                  border
                  border-black/10

                  bg-black/5

                  lg:h-[220px]
                  lg:w-[220px]
                "
              >
                {artist.image ? (
                  <Image
                    src={artist.image}
                    alt={artist.name}
                    fill
                    className="
                      object-cover
                      transition-transform
                      duration-500
                      hover:scale-[1.04]
                    "
                    sizes="220px"
                  />
                ) : (
                  <div
                    className={`
                      ${alegreya.className}

                      flex
                      h-full
                      w-full
                      items-center
                      justify-center

                      text-[10px]
                      uppercase
                      tracking-[0.25em]
                      text-black/40
                    `}
                  >
                    ΧΩΡΙΣ ΦΩΤΟΓΡΑΦΙΑ
                  </div>
                )}
              </Link>


              {/* NAME */}

              <Link href={`/music/artists/${artist.id}`}>

                <h2
                  className={`
                    ${spectral.className}

                    mt-6

                    text-[26px]
                    leading-tight
                    text-black

                    transition-colors

                    hover:text-red-800

                    lg:text-[30px]
                  `}
                >
                  {artist.name}
                </h2>

              </Link>


              {/* GENRE */}

              {artist.genre && (
                <p
                  className={`
                    ${alegreya.className}

                    mt-2

                    text-[9px]
                    uppercase
                    tracking-[0.25em]
                    text-red-700

                    lg:text-[11px]
                  `}
                >
                  {artist.genre}
                </p>
              )}


              {/* DESCRIPTION */}

              {artist.description && (
                <p
                  className={`
                    ${alegreya.className}

                    mx-auto
                    mt-4
                    max-w-[320px]

                    text-[14px]
                    leading-[1.65]
                    text-black/60

                    lg:text-[16px]
                  `}
                >
                  {artist.description}
                </p>
              )}


              {/* MORE */}

              <Link
                href={`/music/artists/${artist.id}`}
                className={`
                  ${alegreya.className}

                  mt-6
                  inline-block

                  border-b
                  border-red-700

                  pb-1

                  text-[9px]
                  uppercase
                  tracking-[0.22em]
                  text-black

                  transition-colors

                  hover:text-red-800
                `}
              >
                ΠΕΡΙΣΣΟΤΕΡΑ →
              </Link>

            </article>
          ))}
        </section>


        {artists.length === 0 && (
          <p
            className={`
              ${alegreya.className}

              mt-20
              text-center
              text-[18px]
              italic
              text-black/60
            `}
          >
            Δεν υπάρχουν ακόμη δημοσιευμένοι καλλιτέχνες.
          </p>
        )}

      </div>
    </main>
  );
}