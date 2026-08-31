"use client";

import { useEffect, useState } from "react";

import CinemaReviewArchiveCard from "@/components/cinema/CinemaReviewArchiveCard";
import type { CinemaReview } from "@/lib/cinema-reviews-data";

const reviews = [
  {
    id: "the-devil-wears-prada",
    movie: "THE DEVIL WEARS PRADA",
    excerpt:
      "Η επιστροφή ενός iconic τίτλου που άφησε εποχή. Το sequel του The Devil Wears Prada φέρνει ξανά στη σκηνή τον λαμπερό αλλά σκληρό κόσμο της μόδας.",
    rating: "8/10",
    image: "/images/cinema/reviews/review-devil-wears-prada.png",
  },
];

export default function CinemaReviewsPage() {
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
    ...sanityReviews.map((review) => ({
      id: review.id,
      movie: review.movieTitle,
      excerpt: review.excerpt,
      rating: review.rating,
      image: review.image || "",
    })),
  ];

  return (
    <main
      className="cinema-reviews-page relative min-h-screen overflow-hidden bg-white text-black"
      style={{
        backgroundImage: "url('/backgrounds/cinema-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-white pointer-events-none" />

      <div className="relative z-10">

        {/* HEADER / HERO */}
        <section
          className="cinema-reviews-hero mx-auto w-full max-w-[1200px] px-6 pt-20 md:px-10 md:pt-28"
          style={{
            position: "relative",
            left: "260px",
            top: "60px",
          }}
        >
          <div className="cinema-reviews-hero-inner">

            <p className="cinema-reviews-kicker text-[13px] uppercase tracking-[0.35em] text-red-700">
              CINEMA
            </p>

            <div
              className="cinema-reviews-back-wrap"
              style={{
                width: "25%",
                marginLeft: "50%",
                position: "relative",
                top: "120px",
                marginBottom: "0px",
              }}
            >
              <a
                href="/cinema"
                className="cinema-reviews-back"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#252321",
                  textDecoration: "none",
                  fontSize: "15px",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                }}
              >
                ← ΠΙΣΩ ΣΤΟ CINEMA
              </a>
            </div>

            <h1 className="cinema-reviews-title mt-3 font-serif text-4xl tracking-[0.08em] md:text-5xl">
              ΟΛΕΣ ΟΙ ΚΡΙΤΙΚΕΣ
            </h1>

            <p className="cinema-reviews-subtitle mt-4 text-[12px] uppercase tracking-[0.22em] text-black/50">
              ΑΝΑΚΑΛΥΨΤΕ ΤΙΣ ΚΙΝΗΜΑΤΟΓΡΑΦΙΚΕΣ ΜΑΣ ΚΡΙΤΙΚΕΣ
            </p>

          </div>
        </section>

        {/* ΚΡΙΤΙΚΕΣ */}
        <section
          className="cinema-reviews-list w-full max-w-[1200px] px-6 pb-24 md:px-10"
          style={{
            position: "relative",
            left: "260px",
            top: "100px",
          }}
        >
          <div className="cinema-reviews-list-heading mb-8 flex items-end justify-between border-b border-black/10 pb-4">
            <div>
              <h2 className="mt-2 font-serif text-2xl text-black/80">
                ΚΡΙΤΙΚΕΣ
              </h2>
            </div>

            <p className="hidden text-[12px] uppercase tracking-[0.2em] text-black/40 md:block">
              ΟΛΕΣ ΟΙ ΚΡΙΤΙΚΕΣ
            </p>
          </div>

          {/* GRID */}
          <div className="cinema-reviews-grid grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allReviews.map((review) => (
              <CinemaReviewArchiveCard
                key={review.id}
                {...review}
              />
            ))}
          </div>
        </section>
      </div>

      {/* MOBILE ONLY
          Όλες οι παρακάτω εντολές ενεργοποιούνται ΜΟΝΟ μέχρι 767px.
          Το desktop παραμένει με τις αρχικές τιμές παραπάνω.
      */}
      <style>{`
        @media (max-width: 767px) {

          /* Κρατάμε ολόκληρη τη σελίδα μέσα στο πλάτος του κινητού */
          .cinema-reviews-page {
            width: 100% !important;
            max-width: 100vw !important;
            overflow-x: hidden !important;
          }

          /* HERO:
             ακυρώνουμε το desktop left:260px και top:60px */
          .cinema-reviews-page .cinema-reviews-hero {
            position: relative !important;
            left: 0 !important;
            right: auto !important;
            top: 0 !important;

            width: 100% !important;
            max-width: 100% !important;
            margin-left: 0 !important;
            margin-right: 0 !important;

            box-sizing: border-box !important;
            padding-left: 20px !important;
            padding-right: 20px !important;

            /*
              Χώρος κάτω από το global logo/header.
              Το desktop δεν επηρεάζεται.
            */
            padding-top: 145px !important;
          }

          .cinema-reviews-page .cinema-reviews-hero-inner {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 auto !important;
            box-sizing: border-box !important;
            text-align: center !important;
          }

          /* CINEMA */
          .cinema-reviews-page .cinema-reviews-kicker {
            width: 100% !important;
            margin: 0 auto !important;
            font-size: 11px !important;
            line-height: 1.4 !important;
            letter-spacing: 0.28em !important;
            text-align: center !important;
          }

          /* BACK BUTTON:
             στο mobile μπαίνει κανονικά κάτω από το logo/header,
             χωρίς το desktop positioning */
          .cinema-reviews-page .cinema-reviews-back-wrap {
            width: 100% !important;
            margin: 18px 0 0 0 !important;
            position: static !important;
            top: auto !important;
            left: auto !important;
            right: auto !important;

            display: flex !important;
            justify-content: flex-start !important;
            align-items: center !important;
          }

          .cinema-reviews-page .cinema-reviews-back {
            position: static !important;
            display: inline-flex !important;
            width: auto !important;
            max-width: 100% !important;

            font-size: 11px !important;
            line-height: 1.4 !important;
            letter-spacing: 0.13em !important;

            white-space: nowrap !important;
            box-sizing: border-box !important;
          }

          /* ΤΙΤΛΟΣ:
             μικρότερος και κεντραρισμένος */
          .cinema-reviews-page .cinema-reviews-title {
            width: 100% !important;
            max-width: 100% !important;
            margin: 26px auto 0 !important;

            font-size: clamp(32px, 9.5vw, 44px) !important;
            line-height: 1.05 !important;
            letter-spacing: 0.035em !important;

            text-align: center !important;
            white-space: normal !important;
            overflow-wrap: normal !important;
            word-break: normal !important;
            box-sizing: border-box !important;
          }

          .cinema-reviews-page .cinema-reviews-subtitle {
            width: 100% !important;
            max-width: 100% !important;
            margin: 22px auto 0 !important;

            font-size: 9px !important;
            line-height: 1.65 !important;
            letter-spacing: 0.15em !important;
            text-align: center !important;
          }

          /* LIST:
             ακυρώνουμε το desktop left:260px / top:100px */
          .cinema-reviews-page .cinema-reviews-list {
            position: relative !important;
            left: 0 !important;
            right: auto !important;
            top: 0 !important;

            width: 100% !important;
            max-width: 100% !important;
            margin: 0 auto !important;

            padding: 70px 20px 60px !important;
            box-sizing: border-box !important;
          }

          .cinema-reviews-page .cinema-reviews-list-heading {
            width: 100% !important;
            margin: 0 0 28px !important;
            padding-bottom: 12px !important;

            display: block !important;
            text-align: center !important;
          }

          .cinema-reviews-page .cinema-reviews-list-heading h2 {
            margin: 0 !important;
            font-size: 25px !important;
            line-height: 1.1 !important;
            letter-spacing: 0.04em !important;
          }

          /* Μία κάρτα ανά σειρά και πάντα μέσα στην οθόνη */
          .cinema-reviews-page .cinema-reviews-grid {
            width: 100% !important;
            max-width: 100% !important;

            display: grid !important;
            grid-template-columns: minmax(0, 1fr) !important;
            gap: 34px !important;

            box-sizing: border-box !important;
          }

          .cinema-reviews-page .cinema-reviews-grid > * {
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
            box-sizing: border-box !important;
          }

          /* Αποτρέπει τυχόν fixed/min-width που μπορεί να έχει η κάρτα */
          .cinema-reviews-page .cinema-reviews-grid img {
            max-width: 100% !important;
            height: auto !important;
          }
        }
      `}</style>
    </main>
  );
}
