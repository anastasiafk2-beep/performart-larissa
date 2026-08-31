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

type ArtistPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ArtistPage({
  params,
}: ArtistPageProps) {
  const { id } = await params;

  const artists = await getArtists();

  const artist = artists.find(
    (item) => item.id === id
  );

  if (!artist) {
    return (
      <main
        className="
          min-h-screen
          bg-white
          px-6
          pt-[180px]
          text-center
          text-black
        "
      >
        <p
          className={`
            ${alegreya.className}
            text-[18px]
          `}
        >
          Ο καλλιτέχνης δεν βρέθηκε.
        </p>

        <Link
          href="/music/artists"
          className={`
            ${alegreya.className}

            mt-8
            inline-block

            border-b
            border-red-700

            pb-1

            text-[10px]
            uppercase
            tracking-[0.2em]
          `}
        >
          ← ΠΙΣΩ ΣΤΟΥΣ ΚΑΛΛΙΤΕΧΝΕΣ
        </Link>
      </main>
    );
  }

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
          max-w-[1200px]

          px-6
          pt-[170px]
          pb-24

          lg:px-12
          lg:pt-[180px]
        "
      >

        {/* BACK */}

        <Link
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

            hover:bg-red-800
            hover:text-white

            lg:px-7
            lg:py-3
            lg:text-[11px]
          `}
        >
          ← ΠΙΣΩ ΣΤΟΥΣ ΚΑΛΛΙΤΕΧΝΕΣ
        </Link>


        {/* CONTENT */}

        <section
          className="
            mt-14

            grid
            grid-cols-1

            gap-12

            lg:mt-20
            lg:grid-cols-[360px_1fr]
            lg:gap-20
          "
        >

          {/* IMAGE */}

          <div>
            <div
              className="
                relative

                mx-auto

                aspect-square
                w-full
                max-w-[320px]

                overflow-hidden
                rounded-full

                border
                border-black/10

                bg-black/5

                lg:max-w-[360px]
              "
            >
              {artist.image ? (
                <Image
                  src={artist.image}
                  alt={artist.name}
                  fill
                  className="object-cover"
                  sizes="360px"
                  priority
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
            </div>
          </div>


          {/* TEXT */}

          <div>

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
              MUSIC / ARTIST
            </p>


            <h1
              className={`
                ${spectral.className}

                mt-4

                text-[40px]
                leading-[1.05]
                text-black

                lg:text-[62px]
              `}
            >
              {artist.name}
            </h1>


            {artist.genre && (
              <p
                className={`
                  ${alegreya.className}

                  mt-5

                  text-[11px]
                  uppercase
                  tracking-[0.25em]
                  text-red-700

                  lg:text-[13px]
                `}
              >
                {artist.genre}
              </p>
            )}


            <div
              className="
                mt-7
                h-px
                w-16
                bg-red-700
              "
            />


            {artist.description && (
              <p
                className={`
                  ${alegreya.className}

                  mt-8

                  text-[18px]
                  leading-[1.7]
                  text-black/75

                  lg:text-[21px]
                `}
              >
                {artist.description}
              </p>
            )}


            {artist.bio && (
              <div
                className={`
                  ${alegreya.className}

                  mt-8

                  whitespace-pre-line

                  text-[15px]
                  leading-[1.85]
                  text-black/65

                  lg:text-[17px]
                `}
              >
                {artist.bio}
              </div>
            )}


            {/* SOCIAL LINKS */}

            {(artist.instagram ||
              artist.spotify ||
              artist.youtube) && (
              <div
                className="
                  mt-10

                  flex
                  flex-wrap

                  gap-3
                "
              >

                {artist.instagram && (
                  <a
                    href={artist.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      ${alegreya.className}

                      border
                      border-black/20

                      px-4
                      py-2.5

                      text-[9px]
                      uppercase
                      tracking-[0.2em]

                      transition-colors

                      hover:border-red-700
                      hover:text-red-800
                    `}
                  >
                    INSTAGRAM
                  </a>
                )}


                {artist.spotify && (
                  <a
                    href={artist.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      ${alegreya.className}

                      border
                      border-black/20

                      px-4
                      py-2.5

                      text-[9px]
                      uppercase
                      tracking-[0.2em]

                      transition-colors

                      hover:border-red-700
                      hover:text-red-800
                    `}
                  >
                    SPOTIFY
                  </a>
                )}


                {artist.youtube && (
                  <a
                    href={artist.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      ${alegreya.className}

                      border
                      border-black/20

                      px-4
                      py-2.5

                      text-[9px]
                      uppercase
                      tracking-[0.2em]

                      transition-colors

                      hover:border-red-700
                      hover:text-red-800
                    `}
                  >
                    YOUTUBE
                  </a>
                )}

              </div>
            )}

          </div>

        </section>

      </div>
    </main>
  );
}