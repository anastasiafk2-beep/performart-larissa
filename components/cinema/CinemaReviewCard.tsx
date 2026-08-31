import Link from "next/link";

type CinemaReviewCardProps = {
  id: string;
  title: string;
  movie?: string;
  movieTitle?: string;
  excerpt: string;
  rating: string;
  image?: string;
};

export default function CinemaReviewCard({
  id,
  title,
  movie,
  movieTitle,
  excerpt,
  rating,
  image,
}: CinemaReviewCardProps) {
  return (
    <article
      className="
        cinema-review-card
        group

        flex

        h-[360px]
        w-[620px]

        overflow-hidden

        border
        border-white/20

        bg-white/20

        text-black
      "
    >

      {/* IMAGE */}

      <div
        className="
          cinema-review-image

          relative

          h-[370px]
          w-[250px]

          shrink-0

          overflow-hidden
        "
      >

        <img
  src={image || ""}
  alt={movieTitle || movie || title}
          className="
            h-full
            w-full

            object-cover

            transition
            duration-700

            group-hover:scale-105
          "
        />

      </div>


      {/* CONTENT */}

      <div
        className="
          cinema-review-content

          flex
          flex-1
          flex-col

          items-center
          justify-center

          px-8
          py-6

          text-center
        "
      >

        {/* LABEL */}

        <p
          className="
            text-xs
            uppercase
            tracking-[0.25em]

            text-[#C2272D]
          "
        >
          ΚΡΙΤΙΚΗ
        </p>


        {/* TITLE */}

        <h3
          className="
            mt-4

            font-serif

            text-2xl

            leading-tight

            text-black
          "
        >
          {title}
        </h3>


        {/* LINE */}

        <div
          className="
            mt-4

            h-[1px]
            w-10

            bg-[#C2272D]
          "
        />


        {/* EXCERPT */}

        <p
          className="
            mt-5

            max-w-[330px]

            line-clamp-3

            text-sm
            leading-7

            text-black
          "
        >
          {excerpt}
        </p>


        {/* RATING */}

        <div
          className="
            mt-6

            flex
            w-full
            max-w-[420px]

            items-center
            justify-center

            gap-8

            border-t
            border-black/20

            pt-4
          "
        >

          <span
            className="
              text-xs
              uppercase
              tracking-[0.25em]

              text-black/80
            "
          >
            ΒΑΘΜΟΛΟΓΙΑ
          </span>

          <span
            className="
              text-lg

              text-[#C2272D]
            "
          >
            {rating}
          </span>

        </div>


        {/* BUTTON */}

        <div
          className="
            mt-5
          "
        >

          <Link
            href={`/cinema/reviews/${id}`}
            className="
              flex

              h-[30px]
              w-[230px]

              items-center
              justify-center

              border
              border-[#C2272D]

              text-xs
              uppercase
              tracking-[0.2em]

              text-[#C2272D]

              transition

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

          .cinema-review-card {

            display: flex !important;

            flex-direction: column !important;

            width: 100% !important;
            max-width: 100% !important;

            height: auto !important;

            min-height: 0 !important;

            box-sizing: border-box !important;
          }


          .cinema-review-image {

            width: 100% !important;

            height: auto !important;

            aspect-ratio: 16 / 9 !important;

            flex-shrink: 0 !important;
          }


          .cinema-review-content {

            width: 100% !important;

            box-sizing: border-box !important;

            padding: 24px 20px 26px 20px !important;
          }


          .cinema-review-content > p:first-child {

            font-size: 9px !important;

            letter-spacing: 0.20em !important;
          }


          .cinema-review-content h3 {

            width: 100% !important;

            margin-top: 10px !important;

            font-size: 21px !important;

            line-height: 1.15 !important;
          }


          .cinema-review-content > div:nth-of-type(1) {

            margin-top: 13px !important;
          }


          .cinema-review-content > p:nth-of-type(2) {

            margin-top: 15px !important;

            max-width: 100% !important;

            font-size: 12px !important;

            line-height: 1.6 !important;
          }


          .cinema-review-content > div:nth-of-type(2) {

            margin-top: 20px !important;

            gap: 15px !important;

            padding-top: 12px !important;
          }


          .cinema-review-content > div:nth-of-type(2) span:first-child {

            font-size: 8px !important;

            letter-spacing: 0.18em !important;
          }


          .cinema-review-content > div:nth-of-type(2) span:last-child {

            font-size: 16px !important;
          }


          .cinema-review-content > div:last-child {

            width: 100% !important;

            margin-top: 20px !important;
          }


          .cinema-review-content > div:last-child a {

            width: 100% !important;

            max-width: 240px !important;

            height: 30px !important;

            margin: 0 auto !important;

            font-size: 8px !important;

            letter-spacing: 0.14em !important;
          }

        }


        @media (max-width: 480px) {

          .cinema-review-content {

            padding-left: 18px !important;
            padding-right: 18px !important;
          }


          .cinema-review-content h3 {

            font-size: 19px !important;
          }


          .cinema-review-content > p:nth-of-type(2) {

            font-size: 11px !important;

            line-height: 1.55 !important;
          }

        }

      `}</style>

    </article>
  );
}