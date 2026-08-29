"use client";
import Link from "next/link";

type CinemaNowPlayingCardProps = {
  title: string;
  poster: string;
  genre: string;
  dates: string;
  venue: string;
  targetId: string;
};

export default function CinemaNowPlayingCard({
  title,
  poster,
  genre,
  dates,
  venue,
  targetId,
}: CinemaNowPlayingCardProps) {
  

  return (
    <article className="flex items-center gap-6 border-b border-[#DCCFC5] py-3">
      <img
        src={poster}
        alt={title}
        className="h-20 w-14 shrink-0 object-cover"
      />

      <div className="flex-1">
        <h3 className="font-serif text-lg text-[#252321]">
          {title}
        </h3>

       <p className="mt-1 text-[9px] uppercase tracking-[0.12em] text-[#857B73]">
          {genre}
        </p>

        <p className="mt-3 text-sm text-[#4E4945]">
          {dates}
        </p>

        <p className="mt-0.5 text-[11px] text-[#4E4945]">
          {venue}
        </p>
      </div>

      <Link
  href={`/cinema/${targetId}`}
  style={{
    padding: "6px 22px",
    minWidth: "120px",
    marginLeft: "150px",
  }}
  className="
    shrink-0
    bg-[#8F2025]
    text-[12px]
    uppercase
    tracking-[0.12em]
    text-white
    transition
    hover:bg-transparent
  hover:!text-[#8F2025]
  " 
>
  ΠΕΡΙΣΣΟΤΕΡΑ 
</Link>
    </article>
  );
}