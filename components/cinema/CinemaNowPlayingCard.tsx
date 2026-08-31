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
    <article
      className="
        cinema-now-playing-card
        flex
        items-center
        gap-6
        border-b
        border-[#DCCFC5]
        py-3
      "
    >
      {/* POSTER */}
      <img
        src={poster}
        alt={title}
        className="
          cinema-now-playing-poster
          h-20
          w-14
          shrink-0
          object-cover
        "
      />

      {/* INFO */}
      <div
        className="
          cinema-now-playing-info
          min-w-0
          flex-1
        "
      >
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

      {/* BUTTON */}
      <Link
        href={`/cinema/${targetId}`}
        className="
          cinema-now-playing-button
          shrink-0
          bg-[#8F2025]
          px-[22px]
          py-[6px]
          min-w-[120px]
          text-center
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

      <style>{`
        /* =========================================================
           MOBILE CARD
           ========================================================= */
        @media (max-width: 767px) {

          .cinema-now-playing-card {
            display: grid !important;
            grid-template-columns: 48px minmax(0, 1fr) auto !important;
            align-items: center !important;
            column-gap: 12px !important;

            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;

            padding: 14px 0 !important;
            margin: 0 !important;

            box-sizing: border-box !important;
          }

          .cinema-now-playing-poster {
            width: 48px !important;
            height: 68px !important;
            min-width: 48px !important;
            max-width: 48px !important;

            object-fit: cover !important;
          }

          .cinema-now-playing-info {
            width: auto !important;
            min-width: 0 !important;
            max-width: 100% !important;

            overflow: hidden !important;
          }

          .cinema-now-playing-info h3 {
            width: 100% !important;
            margin: 0 !important;

            font-size: 14px !important;
            line-height: 1.2 !important;

            overflow-wrap: anywhere !important;
            word-break: normal !important;
          }

          .cinema-now-playing-info p:nth-child(2) {
            margin-top: 4px !important;

            font-size: 7px !important;
            line-height: 1.25 !important;
            letter-spacing: 0.08em !important;
          }

          .cinema-now-playing-info p:nth-child(3) {
            margin-top: 7px !important;

            font-size: 10px !important;
            line-height: 1.25 !important;

            overflow-wrap: anywhere !important;
          }

          .cinema-now-playing-info p:nth-child(4) {
            margin-top: 2px !important;

            font-size: 9px !important;
            line-height: 1.25 !important;

            overflow-wrap: anywhere !important;
          }

          .cinema-now-playing-button {
            width: auto !important;
            min-width: 0 !important;
            max-width: 72px !important;

            margin: 0 !important;
            padding: 7px 8px !important;

            font-size: 7px !important;
            line-height: 1.1 !important;
            letter-spacing: 0.06em !important;

            white-space: nowrap !important;
            box-sizing: border-box !important;
          }
        }

        /* =========================================================
           VERY SMALL MOBILE
           ========================================================= */
        @media (max-width: 480px) {

          .cinema-now-playing-card {
            grid-template-columns: 44px minmax(0, 1fr) auto !important;
            column-gap: 9px !important;
            padding-top: 12px !important;
            padding-bottom: 12px !important;
          }

          .cinema-now-playing-poster {
            width: 44px !important;
            height: 63px !important;
            min-width: 44px !important;
            max-width: 44px !important;
          }

          .cinema-now-playing-info h3 {
            font-size: 13px !important;
          }

          .cinema-now-playing-info p:nth-child(2) {
            font-size: 6.5px !important;
          }

          .cinema-now-playing-info p:nth-child(3) {
            font-size: 9px !important;
          }

          .cinema-now-playing-info p:nth-child(4) {
            font-size: 8px !important;
          }

          .cinema-now-playing-button {
            max-width: 66px !important;
            padding: 6px 7px !important;
            font-size: 6.5px !important;
          }
        }
      `}</style>
    </article>
  );
}
