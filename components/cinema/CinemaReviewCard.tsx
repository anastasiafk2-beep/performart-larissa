import Link from "next/link";

type CinemaReviewCardProps = {
  id: string;
  title: string;
  movie: string;
  excerpt: string;
  rating: string;
  image: string;
};

export default function CinemaReviewCard({
  id,
  title,
  movie,
  excerpt,
  rating,
  image,
}: CinemaReviewCardProps) {
return (
  <article className="group flex h-[360px] w-[620px] overflow-hidden border border-white/20 bg-white/20 text-black">

    {/* ΑΡΙΣΤΕΡΑ — ΕΙΚΟΝΑ */}
    <div className="relative h-[370px] w-[250px] shrink-0 overflow-hidden">
      <img
        src={image}
        alt={movie}
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

    {/* ΔΕΞΙΑ — ΠΕΡΙΕΧΟΜΕΝΟ */}
    <div className="flex flex-1 flex-col items-center justify-center px-8 py-6 text-center">

      {/* ΚΡΙΤΙΚΗ */}
      <p className="text-xs uppercase tracking-[0.25em] text-[#C2272D]">
        ΚΡΙΤΙΚΗ
      </p>
<br></br>
      {/* ΤΙΤΛΟΣ */}
      <h3 className="mt-3 font-serif text-2xl text-black">
        {title}
      </h3>
<br></br>
      {/* ΜΙΚΡΗ ΚΟΚΚΙΝΗ ΓΡΑΜΜΗ */}
      <div className="mt-4 h-[1px] w-10 bg-[#C2272D]" />
<br></br>
      {/* EXCERPT */}
      <p className="mt-5 max-w-[330px] line-clamp-3 text-sm leading-7 text-black">
  {excerpt}
</p>
<br></br>
      {/* ΒΑΘΜΟΛΟΓΙΑ */}
      <div className="mt-6 flex w-full max-w-[420px] items-center justify-center gap-8 border-t border-black/20 pt-4">

        <span className="text-xs uppercase tracking-[0.25em] text-black/80">
          ΒΑΘΜΟΛΟΓΙΑ
        </span>

     <span className="text-lg text-[#C2272D]">
          {rating}
        </span>

      </div>
<br></br>
<br></br>
      {/* ΔΙΑΒΑΣΤΕ ΠΕΡΙΣΣΟΤΕΡΑ */}
      <div className="mt-5">
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

  </article>
);
}