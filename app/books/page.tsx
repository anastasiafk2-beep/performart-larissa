"use client";

import Image from "next/image";
import Link from "next/link";
import useBooks from "@/hooks/useBooks";
import { Alegreya, Spectral } from "next/font/google";

const alegreya = Alegreya({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["300", "400"],
});

export default function BooksPage() {
  const { books } = useBooks();

  const book = books[0];

  return (
    <main
      className="
        books-page
        min-h-screen
        overflow-x-hidden
        bg-white
        text-[#171717]
      "
    >

      {/* Overlay */}

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
          max-w-[1300px]

          px-5
          pt-[180px]
          pb-20

          lg:px-8
          lg:py-20
          lg:translate-x-[370px]
          lg:translate-y-[110px]
        "
      >

        {/* =================================================
            TITLE
            ================================================= */}

        <div className="books-title">

          <div
            className={`
              ${alegreya.className}
              mb-3
              text-[9px]
              uppercase
              tracking-[0.35em]
              text-red-700

              lg:text-[13px]
              lg:tracking-[0.45em]
            `}
          >
            BOOK
          </div>


          <h1
            className={`
              ${spectral.className}

              m-0
              w-full

              text-[34px]
              leading-none
              uppercase
              tracking-[0.08em]
              text-black

              lg:text-[58px]
              lg:tracking-[0.22em]
            `}
          >
            ΒΙΒΛΙΟ
          </h1>


          <div
            className="
              mx-auto
              mt-5
              h-px
              w-12
              bg-white

              lg:mt-6
              lg:w-16
            "
          />

        </div>


        {/* =================================================
            ΒΙΒΛΙΟ ΤΗΣ ΕΒΔΟΜΑΔΑΣ
            ================================================= */}

        <section
          className="
            books-week-section
            mt-12
            w-full

            lg:mt-20
          "
        >

          {/* =================================================
              ΚΕΝΤΡΙΚΟ ΠΛΑΙΣΙΟ
              ================================================= */}

          <div
            className="
              books-week-card
              mx-auto
              w-full
              max-w-[1050px]

              border
              border-black/20

              bg-white/5
              backdrop-blur-[2px]
            "
          >

            {/* =================================================
                MOBILE / DESKTOP GRID
                ================================================= */}

            <div
              className="
                books-week-grid

                grid
                min-h-0
                grid-cols-1

                lg:min-h-[430px]
                lg:grid-cols-2
              "
            >

              {/* =================================================
                  ΕΞΩΦΥΛΛΟ
                  ================================================= */}

              <div
                className="
                  books-cover-column

                  flex
                  items-center
                  justify-center

                  border-b
                  border-black/15

                  p-8

                  lg:border-b-0
                  lg:border-r
                  lg:p-12
                "
              >

               <div
  className="
    relative
    flex
    h-[260px]
    w-[180px]
    items-center
    justify-center

    overflow-hidden
    border
    border-black/20
    bg-white/5

    lg:h-[330px]
    lg:w-[230px]
  "
>
  {book?.cover ? (
    <Image
      src={book.cover}
      alt={book.title}
      fill
      className="object-cover"
      sizes="230px"
    />
  ) : (
    <span
      className={`
        ${alegreya.className}
        text-center
        text-[9px]
        uppercase
        tracking-[0.25em]
        text-black
        lg:text-xs
        lg:tracking-[0.3em]
      `}
    >
      ΕΞΩΦΥΛΛΟ
      <br />
      ΒΙΒΛΙΟΥ
    </span>
  )}
</div>
                 

              </div>


              {/* =================================================
                  ΠΛΗΡΟΦΟΡΙΕΣ ΒΙΒΛΙΟΥ
                  ================================================= */}

              <div
                className="
                  books-info-column

                  flex
                  flex-col
                  justify-center

                  px-6
                  py-8

                  lg:px-14
                  lg:py-12
                "
              >

                {/* LABEL */}

                <div
                  className={`
                    ${alegreya.className}

                    text-[9px]
                    uppercase
                    tracking-[0.28em]
                    text-red-700

                    lg:text-[12px]
                    lg:tracking-[0.4em]
                  `}
                >
                  ΒΙΒΛΙΟ ΤΗΣ ΕΒΔΟΜΑΔΑΣ
                </div>


                {/* BOOK TITLE */}

                <h2
                  className={`
                    ${spectral.className}

                    mt-4

                    text-[28px]
                    leading-[1.08]
                    text-black

                    lg:mt-5
                    lg:text-[42px]
                    lg:leading-tight
                  `}
                >
                  {book?.title || "Τίτλος βιβλίου"}
                </h2>


                {/* AUTHOR */}

                <p
                  className={`
                    ${alegreya.className}

                    mt-4

                    text-[15px]
                    text-black

                    lg:mt-5
                    lg:text-[20px]
                  `}
                >
                  {book?.author || "Συγγραφέας"}
                </p>


                {/* DESCRIPTION */}

                <p
                  className={`
                    ${alegreya.className}

                    mt-5
                    w-full
                    max-w-[500px]

                    text-[14px]
                    leading-[1.6]
                    text-black/65

                    lg:mt-8
                    lg:text-[17px]
                    lg:leading-[1.9]
                  `}
                >
                 {book?.description ||
  "Εδώ θα μπει αργότερα μια σύντομη παρουσίαση του βιβλίου της εβδομάδας."}
                </p>


                {/* BUTTON */}

               <div className="mt-7 lg:mt-10">

  {book && (
    <Link
      href={`/books/${book.id}`}
      className={`
        ${alegreya.className}

        inline-block

        border
        border-red-700

        px-5
        py-2.5

        text-[9px]
        uppercase
        tracking-[0.25em]
        text-black

        transition-colors
        duration-300

        hover:bg-red-800
        hover:text-white

        lg:px-8
        lg:py-3
        lg:text-[12px]
        lg:tracking-[0.35em]
      `}
    >
      ΠΕΡΙΣΣΟΤΕΡΑ →
    </Link>
  )}

</div>

              </div>

            </div>

          </div>

        </section>


        {/* =================================================
            ΚΑΤΩ ΜΗΝΥΜΑ
            ================================================= */}

        <section
          className="
            books-bottom-section

            mt-16
            w-full
            text-center

            lg:mt-24
          "
        >

          <div className="mx-auto h-px w-12 bg-white" />


          <p
            className={`
              ${alegreya.className}

              mt-6

              text-[18px]
              italic
              leading-[1.5]
              text-black

              lg:mt-8
              lg:text-[25px]
              lg:leading-[1.6]
            `}
          >
            Οι σελίδες γράφονται ακόμη.
          </p>


          <div className="mt-7 lg:mt-10">

            <span
              className={`
                ${alegreya.className}

                inline-block

                border
                border-red-800

                px-5
                py-2.5

                text-[9px]
                uppercase
                tracking-[0.25em]
                text-red-800

                lg:px-8
                lg:py-3
                lg:text-[12px]
                lg:tracking-[0.4em]
              `}
            >
              ΣΥΝΤΟΜΑ ΠΕΡΙΣΣΟΤΕΡΑ
            </span>

          </div>

        </section>

      </div>


      {/* =====================================================
          MOBILE — ΙΔΙΑ ΛΟΓΙΚΗ ΜΕ EVENTS / INTERVIEWS
          ===================================================== */}

      <style>{`

        @media (max-width: 767px) {

          /* ===============================================
             GENERAL
             =============================================== */

          .books-page {
            width: 100% !important;
            max-width: 100% !important;
            overflow-x: hidden !important;
          }


          /* ===============================================
             MAIN CONTAINER
             =============================================== */

          .books-page > div.relative.z-10 {

            width: 100% !important;
            max-width: 100% !important;

            margin: 0 !important;

            padding-left: 24px !important;
            padding-right: 24px !important;

            padding-top: 175px !important;
            padding-bottom: 70px !important;

            transform: none !important;

            box-sizing: border-box !important;
          }


          /* ===============================================
             TITLE
             =============================================== */

          .books-page .books-title {

            width: 100% !important;

            margin: 0 !important;
            padding: 0 !important;

            text-align: center !important;

            box-sizing: border-box !important;
          }


          .books-page .books-title h1 {

            width: 100% !important;
            max-width: 100% !important;

            margin: 0 !important;
            padding: 0 !important;

            font-size: 34px !important;

            line-height: 1 !important;

            letter-spacing: 0.08em !important;

            text-align: center !important;

            box-sizing: border-box !important;
          }


          /* ===============================================
             WEEK BOOK SECTION
             =============================================== */

          .books-page .books-week-section {

            width: 100% !important;
            max-width: 100% !important;

            margin-top: 45px !important;

            padding: 0 !important;

            box-sizing: border-box !important;
          }


          /* ===============================================
             CARD
             =============================================== */

          .books-page .books-week-card {

            width: 100% !important;
            max-width: 100% !important;

            margin: 0 auto !important;

            box-sizing: border-box !important;
          }


          /* ===============================================
             GRID
             =============================================== */

          .books-page .books-week-grid {

            display: flex !important;

            flex-direction: column !important;

            width: 100% !important;
            min-height: 0 !important;

            box-sizing: border-box !important;
          }


          /* ===============================================
             COVER
             =============================================== */

          .books-page .books-cover-column {

            width: 100% !important;

            min-height: 320px !important;

            padding: 30px !important;

            border-right: 0 !important;

            border-bottom: 1px solid rgba(0,0,0,0.15) !important;

            box-sizing: border-box !important;
          }


          .books-page .books-cover-column > div {

            width: 180px !important;
            height: 260px !important;

            flex-shrink: 0 !important;
          }


          /* ===============================================
             BOOK INFO
             =============================================== */

          .books-page .books-info-column {

            width: 100% !important;

            padding: 28px 24px 30px 24px !important;

            box-sizing: border-box !important;
          }


          .books-page .books-info-column h2 {

            width: 100% !important;
            max-width: 100% !important;

            font-size: 28px !important;

            line-height: 1.08 !important;

            margin-top: 14px !important;

            box-sizing: border-box !important;
          }


          .books-page .books-info-column p {

            width: 100% !important;
            max-width: 100% !important;

            box-sizing: border-box !important;
          }


          /* ===============================================
             DESCRIPTION
             =============================================== */

          .books-page .books-info-column p:last-of-type {

            margin-top: 20px !important;

            font-size: 14px !important;

            line-height: 1.6 !important;
          }


          /* ===============================================
             BUTTON
             =============================================== */

          .books-page .books-info-column button {

            display: inline-flex !important;

            align-items: center !important;
            justify-content: center !important;

            margin: 0 !important;

            padding: 10px 16px !important;

            font-size: 9px !important;

            line-height: 1.2 !important;

            letter-spacing: 0.2em !important;

            white-space: nowrap !important;
          }


          /* ===============================================
             BOTTOM MESSAGE
             =============================================== */

          .books-page .books-bottom-section {

            width: 100% !important;

            margin-top: 55px !important;

            text-align: center !important;

            box-sizing: border-box !important;
          }


          .books-page .books-bottom-section p {

            width: 100% !important;

            margin-top: 24px !important;

            font-size: 18px !important;

            line-height: 1.5 !important;

            text-align: center !important;
          }


          .books-page .books-bottom-section span {

            font-size: 9px !important;

            letter-spacing: 0.22em !important;

            padding: 10px 16px !important;
          }


          /* ===============================================
             REMOVE MANUAL BR SPACING
             =============================================== */

          .books-page br {
            display: none !important;
          }

        }


        /* =================================================
           VERY SMALL PHONES
           ================================================= */

        @media (max-width: 480px) {

          .books-page > div.relative.z-10 {

            padding-left: 24px !important;
            padding-right: 24px !important;

            padding-top: 175px !important;
          }


          .books-page .books-title h1 {

            font-size: 31px !important;

            letter-spacing: 0.06em !important;
          }


          .books-page .books-cover-column {

            min-height: 300px !important;

            padding: 25px !important;
          }


          .books-page .books-cover-column > div {

            width: 165px !important;
            height: 240px !important;
          }


          .books-page .books-info-column {

            padding-left: 20px !important;
            padding-right: 20px !important;
          }


          .books-page .books-info-column h2 {

            font-size: 25px !important;
          }

        }

      `}</style>

    </main>
  );
}