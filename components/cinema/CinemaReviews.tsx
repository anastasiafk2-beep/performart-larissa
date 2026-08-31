"use client";

import { useEffect, useState } from "react";
import CinemaReviewCard from "./CinemaReviewCard";
import type { CinemaReview } from "@/lib/cinema-reviews-data";

const reviews = [
  {
    id: "the-devil-wears-prada",
    title: "THE DEVIL WEARS PRADA",
    movie: "",
    excerpt:
      "Η επιστροφή ενός iconic τίτλου που άφησε εποχή. Το sequel του The Devil Wears Prada φέρνει ξανά στη σκηνή τον λαμπερό αλλά σκληρό κόσμο της μόδας, με γνώριμο ρυθμό και έντονο déjà vu. Η Meryl Streep αποδεικνύει για άλλη μια φορά γιατί είναι απολαυστική ως Μιράντα Πρίστλι, όμως η ταινία μένει σε μια επιφανειακή σάτιρα που δεν τολμά να πάει πιο βαθιά. Στιλάτο, γρήγορο, ευχάριστο — αλλά τελικά πιο κοντά στη νοσταλγία παρά σε κάτι πραγματικά νέο. Μπορείς να την απολαύσεις στα Victoria Cinemas.",
    rating: "8/10",
    image: "/images/cinema/reviews/review-devil-wears-prada.png",
  },
];

export default function CinemaReviews() {
  const [sanityReviews, setSanityReviews] = useState<CinemaReview[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadReviews() {
      try {
        const response = await fetch("/api/cinema/reviews", {
          signal: controller.signal,
        });

        if (!response.ok) {
          return;
        }

        const data: unknown = await response.json();

        if (Array.isArray(data)) {
          setSanityReviews(data as CinemaReview[]);
        }
      } catch (error) {
        if (
          !(error instanceof DOMException && error.name === "AbortError")
        ) {
          console.error("Unable to load cinema reviews:", error);
        }
      }
    }

    void loadReviews();

    return () => controller.abort();
  }, []);

  const allReviews = [
    ...reviews,
    ...sanityReviews,
  ];

  return (
    <section
      className="
        cinema-reviews

        relative

        mt-24

        overflow-hidden

        bg-white

        px-8
        pt-20
        pb-28

        text-white
      "
    >

      <div className="absolute inset-0" />


      <div
        className="
          cinema-reviews-container

          relative
          z-10

          mx-auto

          max-w-[1800px]

          translate-x-10
        "
      >

        {/* HEADER */}

        <div
          className="
            cinema-reviews-header

            mb-16

            flex
            items-end
            justify-between
          "
        >

          <div>

            <p
              className="
                text-xs
                uppercase
                tracking-[0.25em]

                text-[#C2272D]
              "
            >
              Cinema
            </p>


            <h2
              className="
                mt-3

                font-serif

                text-5xl

                text-black
              "
            >
              ΚΡΙΤΙΚΕΣ
            </h2>

          </div>


          <a
            href="/cinema/reviews"
            className="
              cinema-reviews-all-button
              border
              border-[#C2272D]
              px-6
              py-3
              text-xs
              uppercase
              tracking-[0.3em]
              !text-black
              transition
              hover:bg-[#C2272D]
              hover:text-white
              lg:translate-x-[-110px]
            "
          >
            ΔΕΙΤΕ ΟΛΕΣ ΤΙΣ ΚΡΙΤΙΚΕΣ →
          </a>

        </div>


        {/* REVIEWS GRID */}

        <div
          className="
            cinema-reviews-grid

            grid

            grid-cols-1
            gap-6

            md:grid-cols-2
            xl:grid-cols-3

            mt-10
            mb-[60px]
          "
        >

          {allReviews.map((review) => (

            <CinemaReviewCard
              key={review.id}
              {...review}
            />

          ))}

        </div>

      </div>


      {/* =====================================================
          MOBILE
          ===================================================== */}

      <style>{`

        @media (max-width: 767px) {

          /* ===============================================
             SECTION
             =============================================== */

          .cinema-reviews {

            width: 100% !important;

            margin-top: 45px !important;

            padding-left: 24px !important;
            padding-right: 24px !important;

            padding-top: 45px !important;
            padding-bottom: 60px !important;

            box-sizing: border-box !important;

            overflow: hidden !important;
          }


          /* ===============================================
             CONTAINER
             =============================================== */

          .cinema-reviews .cinema-reviews-container {

            width: 100% !important;
            max-width: 100% !important;

            margin: 0 !important;

            padding: 0 !important;

            transform: none !important;

            box-sizing: border-box !important;
          }


          /* ===============================================
             HEADER
             =============================================== */

          .cinema-reviews .cinema-reviews-header {

            width: 100% !important;

            margin: 0 0 32px 0 !important;

            display: flex !important;

            flex-direction: column !important;

            align-items: center !important;

            gap: 22px !important;

            text-align: center !important;
          }


          .cinema-reviews .cinema-reviews-header > div {

            width: 100% !important;

            text-align: center !important;
          }


          .cinema-reviews .cinema-reviews-header p {

            margin: 0 !important;

            font-size: 9px !important;

            letter-spacing: 0.22em !important;

            text-align: center !important;
          }


          .cinema-reviews .cinema-reviews-header h2 {

            margin: 9px 0 0 0 !important;

            font-size: 32px !important;

            line-height: 1 !important;

            letter-spacing: 0.03em !important;

            text-align: center !important;
          }


          /* ===============================================
             ALL REVIEWS BUTTON
             =============================================== */

          .cinema-reviews .cinema-reviews-all-button {

            display: inline-flex !important;

            align-items: center !important;
            justify-content: center !important;

            width: auto !important;

            margin: 0 !important;

            padding: 9px 15px !important;

            transform: none !important;

            font-size: 8px !important;

            line-height: 1.2 !important;

            letter-spacing: 0.16em !important;

            white-space: nowrap !important;
          }


          /* ===============================================
             GRID
             =============================================== */

          .cinema-reviews .cinema-reviews-grid {

            display: flex !important;

            flex-direction: column !important;

            align-items: center !important;

            width: 100% !important;

            max-width: 100% !important;

            gap: 24px !important;

            margin-top: 0 !important;

            margin-bottom: 0 !important;
          }


          .cinema-reviews .cinema-reviews-grid > * {

            width: 100% !important;

            max-width: 100% !important;

            margin: 0 !important;
          }

        }


        @media (max-width: 480px) {

          .cinema-reviews {

            padding-left: 24px !important;
            padding-right: 24px !important;
          }


          .cinema-reviews .cinema-reviews-header h2 {

            font-size: 29px !important;
          }


          .cinema-reviews .cinema-reviews-all-button {

            font-size: 7.5px !important;

            padding: 8px 13px !important;
          }

        }

      `}</style>

    </section>
  );
}