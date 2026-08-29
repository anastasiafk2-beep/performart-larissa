import Link from "next/link";
import { Alegreya, Spectral } from "next/font/google";
import ProtectedImage from "@/components/ProtectedImage";

const alegreya = Alegreya({
  subsets: ["latin", "greek"],
  weight: ["400", "500"],
});

const spectral = Spectral({
  subsets: ["latin", "greek"],
  weight: ["300", "400"],
});

type FestivalSectionProps = {
  id: string;
  year: string;
  title: string;
  description: string;
  images: string[];
};

export default function FestivalSection({
  id,
  year,
  title,
  description,
  images,
}: FestivalSectionProps) {
  const coverImage = images[0];

  return (
    <article className="group w-full max-w-[520px] overflow-hidden border border-white/10 bg-[#FBF7F2]/40 mx-auto">

      {/* ΦΩΤΟΓΡΑΦΙΑ */}
      <div className="relative h-[220px] w-full overflow-hidden">
        {coverImage && (
          <ProtectedImage
            src={coverImage}
            alt={title}
            width={1000}
            height={625}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        )}
      </div>

      {/* ΚΕΙΜΕΝΟ */}
      <div className="px-6 py-7">

        <p
          className={`${alegreya.className} text-[13px] tracking-[0.35em] text-[#C13B3A]`}
        >
          {year}
        </p>

        <h3
          className={`${spectral.className} mt-3 text-2xl uppercase tracking-[0.08em] text-black/90`}
        >
          {title}
        </h3>

        {description && description !== "..." && (
          <p
            className={`${alegreya.className} mt-4 text-base leading-7 text-black/70`}
          >
            {description}
          </p>
        )}

        <div className="mt-6">
          <Link
            href={`/festivals/${id}`}
            className={`${alegreya.className} inline-block border border-[#C13B3A] px-5 py-2 text-xs tracking-[0.25em] text-[#C13B3A] transition hover:bg-[#C13B3A] hover:text-white`}
           style={{ color: "#000000" }}
          >
            ΔΕΙΤΕ ΤΟ ΦΕΣΤΙΒΑΛ →
          </Link>
        </div>

      </div>
    </article>
  );
}