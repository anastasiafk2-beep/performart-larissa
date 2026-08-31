import Link from "next/link";

type CinemaReviewArchiveCardProps = {
  id: string;
  movie: string;
  excerpt: string;
  rating: string;
  image: string;
};

export default function CinemaReviewArchiveCard({
  id,
  movie,
  excerpt,
  rating,
  image,
}: CinemaReviewArchiveCardProps) {
  return (
    <article
      className="
        cinema-review-archive-card

        group

        w-full

        overflow-hidden

        border
        border-black/10

        bg-white/30
      "
    >

      {/* IMAGE */}

      <div
        className="
          relative

          aspect-[16/9]

          w-full

          overflow-hidden
        "
      >

        <img
          src={image}
          alt={movie}
          className="
            h-full
            w-full

            object-cover

            transition-transform
            duration-700

            group-hover:scale-105
          "
        />

      </div>


      {/* TEXT */}

      <div
        className="
          cinema-review-archive-content

          px-5
          py-5
        "
      >

        <p
          className="
            text-[8px]
            uppercase
            tracking-[0.25em]

            text-[#C2272D]
          "
        >
          ΚΡΙΤΙΚΗ
        </p>


        <h2
          className="
            mt-2

            font-serif

            text-xl
            leading-tight

            text-black
          "
        >
          {movie}
        </h2>


        <p
          className="
            mt-3

            line-clamp-3

            text-[11px]
            leading-5

            text-black/60
          "
        >
          {excerpt}
        </p>


        {/* BOTTOM */}

        <div
          className="
            mt-5

            flex

            items-center
            justify-between

            border-t
            border-black/10

            pt-4
          "
        >

          <span
            className="
              text-sm

              text-[#C2272D]
            "
          >
            {rating}
          </span>


          <Link
            href={`/cinema/reviews/${id}`}
            className="
              border
              border-[#C2272D]

              px-4
              py-2

              text-[9px]
              uppercase
              tracking-[0.15em]

              text-[#C2272D]

              transition-colors

              hover:bg-[#C2272D]
              hover:text-white
            "
          >
            ΔΙΑΒΑΣΤΕ ΠΕΡΙΣΣΟΤΕΡΑ →
          </Link>

        </div>

      </div>


      {/* =====================================================
          MOBILE
          ===================================================== */}

      <style>{`

        @media (max-width: 767px) {

          .cinema-review-archive-card {

            width: 100% !important;

            max-width: 100% !important;

            box-sizing: border-box !important;
          }


          .cinema-review-archive-content {

            padding: 18px !important;
          }


          .cinema-review-archive-content > p:first-child {

            font-size: 7px !important;

            letter-spacing: 0.20em !important;
          }


          .cinema-review-archive-content h2 {

            margin-top: 8px !important;

            font-size: 18px !important;

            line-height: 1.15 !important;
          }


          .cinema-review-archive-content > p:nth-child(3) {

            margin-top: 10px !important;

            font-size: 10px !important;

            line-height: 1.55 !important;
          }


          .cinema-review-archive-content > div:last-child {

            margin-top: 16px !important;

            padding-top: 12px !important;

            gap: 10px !important;
          }


          .cinema-review-archive-content > div:last-child span {

            font-size: 12px !important;
          }


          .cinema-review-archive-content > div:last-child a {

            padding: 7px 9px !important;

            font-size: 7px !important;

            letter-spacing: 0.10em !important;

            white-space: nowrap !important;
          }

        }


        @media (max-width: 480px) {

          .cinema-review-archive-content {

            padding: 16px !important;
          }


          .cinema-review-archive-content h2 {

            font-size: 17px !important;
          }


          .cinema-review-archive-content > div:last-child a {

            font-size: 6.5px !important;

            padding: 7px 8px !important;
          }

        }

      `}</style>

    </article>
  );
}