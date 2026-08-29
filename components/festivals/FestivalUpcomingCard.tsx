import Link from "next/link";

import { Alegreya, Spectral } from "next/font/google";

const alegreya = Alegreya({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["300", "400"],
});

type FestivalUpcomingCardProps = {
  title: string;
  year: string;
  dates: string;
  location: string;
  description: string;
  id: string;
  image: string;
};

export default function FestivalUpcomingCard({
  title,
  year,
  dates,
  location,
  description,
  id,
  image,
}: FestivalUpcomingCardProps) {
  return (
    <article className="border border-white/10 bg-white/10 p-4">

      <div className="flex gap-5">

        {/* ΕΞΩΦΥΛΛΟ */}
    {image?.trim() !== "" && (
  <div className="h-[125px] w-[95px] shrink-0 overflow-hidden">
    <img
      src={image}
      alt={title}
      className="h-full w-full object-cover"
    />
  </div>
)}

        {/* ΠΛΗΡΟΦΟΡΙΕΣ */}
        <div className="flex min-w-0 flex-1 flex-col">

          <p
            className={`${alegreya.className} text-[12px] tracking-[0.3em] text-[#C13B3A]`}
          >
            {year}
          </p>

          <h3
            className={`${spectral.className} mt-1 text-2xl uppercase tracking-[0.06em] text-black/90`}
          >
            {title}
          </h3>

          <p
            className={`${alegreya.className} mt-1 text-sm text-black/80`}
          >
            {dates}
          </p>

          <p
            className={`${alegreya.className} mt-1 text-sm text-black/60`}
          >
            {location}
          </p>

          <div className="mt-auto pt-3">
            <Link
              href={`/festivals/${id}`}
              className={`${alegreya.className} inline-block border border-[#C13B3A] px-3 py-1 text-xs tracking-[0.15em] text-black transition hover:bg-[#C13B3A] hover:text-white`}
              style={{ color: "#000000" }}
            >
              ΜΑΘΕΤΕ ΠΕΡΙΣΣΟΤΕΡΑ →
            </Link>
          </div>

        </div>

      </div>

    </article>
  );
}