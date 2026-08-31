import Image from "next/image";
import Link from "next/link";
import { Alegreya, Spectral } from "next/font/google";

import { getMusic } from "@/lib/music-data";

const alegreya = Alegreya({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["300", "400"],
});

export default async function MusicReleasesPage() {
  const music = await getMusic();

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
            ΝΕΕΣ ΚΥΚΛΟΦΟΡΙΕΣ
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


        {/* RELEASES GRID */}

        <section
          className="
            mt-16

            grid
            grid-cols-1

            gap-x-8
            gap-y-14

            sm:grid-cols-2

            lg:mt-20
            lg:grid-cols-3
            lg:gap-x-10
            lg:gap-y-16
          "
        >
          {music.map((release) => (
            <article
              key={release.id}
              className="group"
            >

              {/* IMAGE */}

              <Link
                href={`/music/${release.id}`}
                className="
                  relative
                  block
                  aspect-square
                  w-full
                  overflow-hidden
                  border
                  border-black/10
                  bg-black/5
                "
              >
                {release.image ? (
                  <Image
                    src={release.image}
                    alt={release.title}
                    fill
                    className="
                      object-cover
                      transition-transform
                      duration-500
                      group-hover:scale-[1.03]
                    "
                    sizes="
                      (max-width: 640px) 100vw,
                      (max-width: 1024px) 50vw,
                      33vw
                    "
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
                    ΧΩΡΙΣ ΕΙΚΟΝΑ
                  </div>
                )}
              </Link>


              {/* CATEGORY */}

              {release.category && (
                <p
                  className={`
                    ${alegreya.className}

                    mt-5

                    text-[9px]
                    uppercase
                    tracking-[0.25em]
                    text-red-700

                    lg:text-[10px]
                  `}
                >
                  {release.category}
                </p>
              )}


              {/* TITLE */}

              <Link href={`/music/${release.id}`}>

                <h2
                  className={`
                    ${spectral.className}

                    mt-2

                    text-[25px]
                    leading-[1.15]
                    text-black

                    transition-colors

                    hover:text-red-800

                    lg:text-[30px]
                  `}
                >
                  {release.title}
                </h2>

              </Link>


              {/* ARTIST */}

              {release.artist && (
                <p
                  className={`
                    ${alegreya.className}

                    mt-2

                    text-[14px]
                    text-black/65

                    lg:text-[16px]
                  `}
                >
                  {release.artist}
                </p>
              )}


              {/* DATE */}

              <p
                className={`
                  ${alegreya.className}

                  mt-3

                  text-[9px]
                  uppercase
                  tracking-[0.2em]
                  text-red-700
                `}
              >
                {new Date(release.date).toLocaleDateString(
                  "el-GR"
                )}
              </p>


              {/* DESCRIPTION */}

              {release.description && (
                <p
                  className={`
                    ${alegreya.className}

                    mt-4

                    text-[14px]
                    leading-[1.65]
                    text-black/65

                    lg:text-[16px]
                  `}
                >
                  {release.description}
                </p>
              )}


              {/* MORE */}

              <Link
                href={`/music/${release.id}`}
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


        {/* EMPTY */}

        {music.length === 0 && (
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
            Δεν υπάρχουν ακόμη δημοσιευμένες κυκλοφορίες.
          </p>
        )}

      </div>
    </main>
  );
}