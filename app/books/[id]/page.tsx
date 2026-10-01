import ContentView from "@/components/analytics/ContentView";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { getBooks } from "@/lib/books-data";
import {
  createArticleJsonLd,
  createBreadcrumbJsonLd,
  createPageMetadata,
} from "@/lib/seo";
import { Alegreya, Spectral } from "next/font/google";

const alegreya = Alegreya({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["300", "400"],
});

type BookPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({
  params,
}: BookPageProps): Promise<Metadata> {
  const { id } = await params;
  const book = (await getBooks()).find((item) => item.id === id);
  const path = `/books/${encodeURIComponent(id)}`;

  if (!book) {
    return createPageMetadata({
      title: "Το βιβλίο δεν βρέθηκε",
      description: "Η σελίδα βιβλίου που ζητήσατε δεν είναι διαθέσιμη.",
      path,
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: book.title,
    description:
      book.excerpt ||
      book.description ||
      `Παρουσίαση του βιβλίου «${book.title}»${book.author ? ` του/της ${book.author}` : ""}.`,
    path,
    image: book.cover,
    imageAlt: `Εξώφυλλο του βιβλίου ${book.title}`,
    type: "article",
    publishedTime: book.date,
  });
}

export default async function BookPage({
  params,
}: BookPageProps) {
  const { id } = await params;

  const books = await getBooks();

  const book = books.find(
    (item) => item.id === id
  );

  if (!book) {
    return (
      <main className="min-h-screen bg-white px-6 py-40">
        <h1
          className={`${spectral.className} text-4xl text-black`}
        >
          Το βιβλίο δεν βρέθηκε
        </h1>

        <Link
          href="/books"
          className={`${alegreya.className} mt-8 inline-block border border-red-700 px-7 py-3 text-xs uppercase tracking-[0.25em] text-black`}
        >
          ← ΠΙΣΩ ΣΤΟ ΒΙΒΛΙΟ
        </Link>
      </main>
    );
  }

  return (
    <main
      className="
        book-detail-page
        min-h-screen
        overflow-x-hidden
        bg-white
        text-[#171717]
      "
    >
      <ContentView event="article_view" contentId={book.id} params={{ content_title: book.title, content_type: "book" }} />
      <JsonLd
        data={[
          createArticleJsonLd({
            headline: book.title,
            description: book.excerpt || book.description,
            path: `/books/${encodeURIComponent(book.id)}`,
            image: book.cover,
            datePublished: book.date,
            section: "Βιβλίο",
          }),
          createBreadcrumbJsonLd([
            { name: "Αρχική", path: "/" },
            { name: "Βιβλίο", path: "/books" },
            { name: book.title, path: `/books/${encodeURIComponent(book.id)}` },
          ]),
        ]}
      />

      {/* OVERLAY */}

      <div className="pointer-events-none absolute inset-0 bg-white" />


      {/* =====================================================
          MAIN
          ===================================================== */}

      <div
        className="
          book-detail-shell
          relative
          z-10
          mx-auto
          w-full
          max-w-[1200px]

          px-5
          pt-[180px]
          pb-20

          lg:px-12
          lg:pt-[180px]
          lg:pb-28
        "
      >

        {/* BACK */}

        <div className="book-detail-back mb-12">

          <Link
            href="/books"
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

              transition

              hover:bg-red-800
              hover:text-white

              lg:px-8
              lg:py-3
              lg:text-xs
              lg:tracking-[0.3em]
            `}
          >
            ← ΠΙΣΩ ΣΤΟ ΒΙΒΛΙΟ
          </Link>

        </div>


        {/* =====================================================
            HEADER
            ===================================================== */}

        <header
          className="
            book-detail-header
            grid
            grid-cols-1
            gap-10

            lg:grid-cols-[330px_1fr]
            lg:gap-16
          "
        >

          {/* COVER */}

          <div
            className="
              relative

              mx-auto

              h-[420px]
              w-[280px]

              overflow-hidden

              border
              border-black/15

              bg-white

              lg:mx-0
              lg:h-[480px]
              lg:w-[320px]
            "
          >

            {book.cover ? (
              <Image
                src={book.cover}
                alt={book.title}
                fill
                priority
                className="object-cover"
                sizes="320px"
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

                  text-center
                  text-[10px]
                  uppercase
                  tracking-[0.3em]
                  text-black
                `}
              >
                ΕΞΩΦΥΛΛΟ
                <br />
                ΒΙΒΛΙΟΥ
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

            {book.category && (
              <p
                className={`
                  ${alegreya.className}

                  text-[9px]
                  uppercase
                  tracking-[0.35em]
                  text-red-700

                  lg:text-[12px]
                `}
              >
                {book.category}
              </p>
            )}


            <h1
              className={`
                ${spectral.className}

                mt-4

                text-[34px]
                leading-[1.05]
                text-black

                lg:text-[52px]
                lg:leading-[1.08]
              `}
            >
              {book.title}
            </h1>


            {book.author && (
              <p
                className={`
                  ${alegreya.className}

                  mt-5

                  text-[16px]
                  text-black

                  lg:text-[21px]
                `}
              >
                {book.author}
              </p>
            )}


            <p
              className={`
                ${alegreya.className}

                mt-5

                text-[10px]
                uppercase
                tracking-[0.25em]
                text-red-700

                lg:text-[12px]
              `}
            >
              {new Date(book.date).toLocaleDateString(
                "el-GR"
              )}
            </p>


            {book.description && (
              <p
                className={`
                  ${alegreya.className}

                  mt-8
                  max-w-[650px]

                  text-[15px]
                  leading-[1.7]
                  text-black/65

                  lg:text-[18px]
                  lg:leading-[1.8]
                `}
              >
                {book.description}
              </p>
            )}

          </div>

        </header>


        {/* =====================================================
            CONTENT
            ===================================================== */}

        <div
          className="
            book-detail-content
            mx-auto
            mt-16
            w-full
            max-w-[850px]

            lg:mt-24
          "
        >

          {/* DESCRIPTION */}

          {book.excerpt && (
            <section className="mb-16">

              <p
                className={`
                  ${alegreya.className}

                  text-[16px]
                  leading-[1.8]
                  text-black/80

                  lg:text-[19px]
                  lg:leading-[1.9]
                `}
              >
                {book.excerpt}
              </p>

            </section>
          )}


          {/* REVIEW */}

          {book.review && (
            <section className="mt-16">

              <p
                className={`
                  ${alegreya.className}

                  mb-5

                  text-[9px]
                  uppercase
                  tracking-[0.35em]
                  text-red-700

                  lg:text-[11px]
                `}
              >
                ΚΡΙΤΙΚΗ / ΠΑΡΟΥΣΙΑΣΗ
              </p>


              <div className="h-px w-full bg-black/15" />


              <p
                className={`
                  ${alegreya.className}

                  mt-8

                  whitespace-pre-line

                  text-[16px]
                  leading-[1.8]
                  text-black/80

                  lg:text-[19px]
                  lg:leading-[1.9]
                `}
              >
                {book.review}
              </p>

            </section>
          )}


          {/* QUOTE */}

          {book.quote && (
            <section
              className="
                my-20
                border-y
                border-red-800/40
                px-4
                py-12
                text-center

                lg:px-10
                lg:py-16
              "
            >

              <p
                className={`
                  ${spectral.className}

                  text-[23px]
                  italic
                  leading-[1.5]
                  text-black

                  lg:text-[31px]
                  lg:leading-[1.6]
                `}
              >
                “{book.quote}”
              </p>

            </section>
          )}

        </div>

      </div>


      {/* =====================================================
          MOBILE
          ===================================================== */}

      <style>{`

        @media (max-width: 767px) {

          .book-detail-page > div.relative.z-10 {

            width: 100% !important;
            max-width: 100% !important;

            margin: 0 !important;

            padding-left: 24px !important;
            padding-right: 24px !important;

            padding-top: 150px !important;
            padding-bottom: 70px !important;

            transform: none !important;

            box-sizing: border-box !important;
          }


          .book-detail-page header {

            display: flex !important;

            flex-direction: column !important;

            gap: 35px !important;
          }


          .book-detail-page header > div:first-child {

            width: 220px !important;
            height: 330px !important;

            margin-left: auto !important;
            margin-right: auto !important;
          }


          .book-detail-page h1 {

            font-size: 32px !important;

            line-height: 1.08 !important;
          }


          .book-detail-page p {

            max-width: 100% !important;
          }


          .book-detail-page section {

            width: 100% !important;

            box-sizing: border-box !important;
          }

        }


        @media (max-width: 480px) {

          .book-detail-page > div.relative.z-10 {

            padding-left: 24px !important;
            padding-right: 24px !important;
          }


          .book-detail-page header > div:first-child {

            width: 200px !important;
            height: 300px !important;
          }


          .book-detail-page h1 {

            font-size: 29px !important;
          }

        }

      `}</style>

    </main>
  );
}
