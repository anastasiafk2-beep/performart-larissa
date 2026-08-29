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
        group
        w-full
        overflow-hidden
        border
        border-black/10
        bg-white/30
      "
    >

      {/* ΕΙΚΟΝΑ */}
      <div className="relative aspect-[16/9] w-full overflow-hidden">

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


      {/* ΚΕΙΜΕΝΟ */}
      <div className="px-5 py-5">

        {/* ΚΡΙΤΙΚΗ */}
        <p className="text-[8px] uppercase tracking-[0.25em] text-[#C2272D]">
          ΚΡΙΤΙΚΗ
        </p>


        {/* ΤΙΤΛΟΣ */}
        <h2 className="mt-2 font-serif text-xl leading-tight text-black">
          {movie}
        </h2>


        {/* EXCERPT */}
        <p className="mt-3 line-clamp-3 text-[11px] leading-5 text-black/60">
          {excerpt}
        </p>


        {/* ΚΑΤΩ ΜΕΡΟΣ */}
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

          {/* ΒΑΘΜΟΛΟΓΙΑ */}
          <span className="text-sm text-[#C2272D]">
            {rating}
          </span>


          {/* ΔΙΑΒΑΣΤΕ ΠΕΡΙΣΣΟΤΕΡΑ */}
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

    </article>
  );
}