"use client";

import type { Screening } from "@/content/cinema/movies";
import useCinemaMovies from "@/hooks/useCinemaMovies";
import CinemaNowPlayingCard from "./CinemaNowPlayingCard";

export default function CinemaNowPlaying() {
  const movies = useCinemaMovies();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);

  const upcomingMovies = movies
    .map((movie) => {
      const upcomingScreenings = movie.screenings.filter((screening: Screening) => {
        const screeningDate = new Date(`${screening.date}T00:00:00`);

        return screeningDate >= today && screeningDate < nextWeek;
      });

      return {
        ...movie,
        screenings: upcomingScreenings,
      };
    })
    .filter((movie) => movie.screenings.length > 0);

  return (
    <section className="cinema-now-playing w-full">
      {/* TITLE */}
      <div className="cinema-now-playing-title mb-4">
        <h2 className="font-serif text-[17px] tracking-[6.2px] text-black">
          ΤΙ ΠΑΙΖΕΙ
        </h2>
      </div>

      {/* MOVIES */}
      <div className="cinema-now-playing-list w-full">
        {upcomingMovies.map((movie) => (
          <CinemaNowPlayingCard
            key={movie.id}
            title={movie.title}
            poster={movie.poster}
            genre={movie.genre}
            dates={movie.screenings
              .map((screening: Screening) =>
                new Date(
                  `${screening.date}T00:00:00`
                ).toLocaleDateString("el-GR", {
                  day: "numeric",
                  month: "long",
                })
              )
              .join(" • ")}
            venue={movie.screenings[0]?.venue || movie.location}
            targetId={movie.id}
          />
        ))}
      </div>

      {/* ALL SCREENINGS BUTTON */}
      <div className="cinema-all-screenings mt-10 flex justify-center lg:mt-[270px]">
        <a
          href="/cinema/screenings"
          className="
            inline-block
            border
            border-[#B32025]
            px-[60px]
            py-[6px]
            text-center
            text-[13px]
            uppercase
            tracking-[0.14em]
            !text-black
            transition
            hover:bg-[#B32025]
            hover:!text-black
          "
        >
          ΔΕΙΤΕ ΟΛΕΣ ΤΙΣ ΠΡΟΒΟΛΕΣ
        </a>
      </div>

      <style>{`
        /* =========================================================
           MOBILE
           ========================================================= */
        @media (max-width: 767px) {

          .cinema-now-playing {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 24px !important;
            box-sizing: border-box !important;
            overflow: hidden !important;
          }

          .cinema-now-playing-title {
            width: 100% !important;
            margin: 0 0 22px !important;
            padding: 0 !important;
            text-align: center !important;
          }

          .cinema-now-playing-title h2 {
            margin: 0 !important;
            font-size: 15px !important;
            line-height: 1 !important;
            letter-spacing: 0.28em !important;
            text-align: center !important;
          }

          .cinema-now-playing-list {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            box-sizing: border-box !important;
          }

          .cinema-all-screenings {
            width: 100% !important;
            margin: 32px 0 0 !important;
            padding: 0 !important;
            justify-content: center !important;
            box-sizing: border-box !important;
          }

          .cinema-all-screenings a {
            max-width: 100% !important;
            padding: 9px 18px !important;
            font-size: 8px !important;
            line-height: 1.2 !important;
            letter-spacing: 0.14em !important;
            white-space: nowrap !important;
            box-sizing: border-box !important;
          }
        }

        /* =========================================================
           SMALL MOBILE
           ========================================================= */
        @media (max-width: 480px) {

          .cinema-now-playing {
            padding-left: 20px !important;
            padding-right: 20px !important;
          }

          .cinema-now-playing-title {
            margin-bottom: 20px !important;
          }

          .cinema-now-playing-title h2 {
            font-size: 14px !important;
            letter-spacing: 0.25em !important;
          }

          .cinema-all-screenings {
            margin-top: 28px !important;
          }

          .cinema-all-screenings a {
            padding: 8px 15px !important;
            font-size: 7.5px !important;
          }
        }
      `}</style>
    </section>
  );
}
