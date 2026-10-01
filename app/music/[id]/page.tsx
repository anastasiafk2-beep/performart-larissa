import ContentView from "@/components/analytics/ContentView";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Alegreya, Spectral } from "next/font/google";

import JsonLd from "@/components/seo/JsonLd";
import { getMusic } from "@/lib/music-data";
import {
  createArticleJsonLd,
  createBreadcrumbJsonLd,
  createPageMetadata,
} from "@/lib/seo";

const alegreya = Alegreya({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["300", "400"],
});

type MusicPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({
  params,
}: MusicPageProps): Promise<Metadata> {
  const { id } = await params;
  const item = (await getMusic()).find((entry) => entry.id === id);
  const path = `/music/${encodeURIComponent(id)}`;

  if (!item) {
    return createPageMetadata({
      title: "Η μουσική κυκλοφορία δεν βρέθηκε",
      description: "Η μουσική κυκλοφορία που ζητήσατε δεν είναι διαθέσιμη.",
      path,
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: item.title,
    description:
      item.excerpt ||
      item.description ||
      `${item.title}${item.artist ? ` — ${item.artist}` : ""}.`,
    path,
    image: item.image,
    imageAlt: item.title,
    type: "article",
    publishedTime: item.date,
  });
}

export default async function MusicItemPage({
  params,
}: MusicPageProps) {
  const { id } = await params;

  const music = await getMusic();

  const item = music.find(
    (entry) => entry.id === id
  );

  if (!item) {
    return (
      <main className="min-h-screen bg-white px-6 py-40">
        <h1
          className={`${spectral.className} text-4xl text-black`}
        >
          Η κυκλοφορία δεν βρέθηκε
        </h1>

        <Link
          href="/music"
          className={`${alegreya.className} mt-8 inline-block border border-red-700 px-7 py-3 text-xs uppercase tracking-[0.25em] text-black`}
        >
          ← ΠΙΣΩ ΣΤΗ ΜΟΥΣΙΚΗ
        </Link>
      </main>
    );
  }

  return (
    <main
      className="
        music-detail-page
        min-h-screen
        overflow-x-hidden
        bg-white
        text-[#171717]
      "
    >
      <ContentView event="article_view" contentId={item.id} params={{ content_title: item.title, content_type: "music" }} />
      <JsonLd
        data={[
          createArticleJsonLd({
            headline: item.title,
            description: item.excerpt || item.description,
            path: `/music/${encodeURIComponent(item.id)}`,
            image: item.image,
            datePublished: item.date,
            section: "Μουσική",
          }),
          createBreadcrumbJsonLd([
            { name: "Αρχική", path: "/" },
            { name: "Μουσική", path: "/music" },
            {
              name: item.title,
              path: `/music/${encodeURIComponent(item.id)}`,
            },
          ]),
        ]}
      />
      <div
        className="
          music-detail-shell
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
          href="/music/releases"
          className={`
            ${alegreya.className}
            editorial-back-button

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
          ← ΠΙΣΩ ΣΤΙΣ ΚΥΚΛΟΦΟΡΙΕΣ
        </Link>


        {/* MAIN INFO */}

        <section
          className="
            music-detail-hero
            mt-14

            grid
            grid-cols-1
            gap-10

            lg:grid-cols-[430px_1fr]
            lg:gap-16
          "
        >
          {/* IMAGE */}

          <div
            className="
              relative

              aspect-square
              w-full
              max-w-[430px]

              overflow-hidden

              border
              border-black/10

              bg-black/5
            "
          >
            {item.image ? (
              <Image
                src={item.image}
                alt={item.title}
                fill
                priority
                className="object-cover"
                sizes="430px"
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
          </div>


          {/* INFO */}

          <div
            className="
              flex
              flex-col
              justify-center
            "
          >
            {item.category && (
              <p
                className={`
                  ${alegreya.className}

                  text-[9px]
                  uppercase
                  tracking-[0.3em]
                  text-red-700

                  lg:text-[11px]
                `}
              >
                {item.category}
              </p>
            )}

            <h1
              className={`
                ${spectral.className}

                mt-4

                text-[36px]
                leading-[1.08]
                text-black

                lg:text-[58px]
              `}
            >
              {item.title}
            </h1>

            {item.artist && (
              <p
                className={`
                  ${alegreya.className}

                  mt-5

                  text-[18px]
                  text-black/70

                  lg:text-[22px]
                `}
              >
                {item.artist}
              </p>
            )}

            <p
              className={`
                ${alegreya.className}

                mt-4

                text-[9px]
                uppercase
                tracking-[0.22em]
                text-red-700

                lg:text-[11px]
              `}
            >
              {new Date(item.date).toLocaleDateString("el-GR")}
            </p>

            {item.description && (
              <p
                className={`
                  ${alegreya.className}

                  mt-8

                  max-w-[650px]

                  text-[15px]
                  leading-[1.75]
                  text-black/65

                  lg:text-[18px]
                `}
              >
                {item.description}
              </p>
            )}
          </div>
        </section>


        {/* EXCERPT */}

        {item.excerpt && (
          <section
            className="
              mx-auto
              mt-20
              max-w-[850px]

              border-t
              border-red-800/30

              pt-10
            "
          >
            <p
              className={`
                ${alegreya.className}

                text-[16px]
                leading-[1.85]
                text-black/80

                lg:text-[19px]
              `}
            >
              {item.excerpt}
            </p>
          </section>
        )}
      </div>


      <style>{`

        @media (max-width: 767px) {

          .music-detail-page > div {

            width: 100% !important;
            max-width: 100% !important;

            padding-left: 24px !important;
            padding-right: 24px !important;

            padding-top: 155px !important;
            padding-bottom: 70px !important;

            box-sizing: border-box !important;
          }

          .music-detail-page section {

            width: 100% !important;
            max-width: 100% !important;
          }

          .music-detail-page h1 {

            font-size: 34px !important;
            line-height: 1.08 !important;
          }

        }

        @media (max-width: 480px) {

          .music-detail-page > div {

            padding-left: 24px !important;
            padding-right: 24px !important;
          }

          .music-detail-page h1 {

            font-size: 30px !important;
          }

        }

      `}</style>
    </main>
  );
}
