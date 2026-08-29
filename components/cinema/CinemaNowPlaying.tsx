"use client";

import CinemaNowPlayingCard from "./CinemaNowPlayingCard";
import { movies } from "@/content/cinema/movies";

export default function CinemaNowPlaying() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);

  const upcomingMovies = movies
    .map((movie) => {
      const upcomingScreenings = movie.screenings.filter((screening) => {
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
    <section className="w-full">

      <div className="mb-4">
        <h2 className="font-serif text-[17px] tracking-[6.2] text-[#B32025]">
          ΤΙ ΠΑΙΖΕΙ
        </h2>
      </div>

      <div>
        {upcomingMovies.map((movie) => (
          <CinemaNowPlayingCard
            key={movie.id}
            title={movie.title}
            poster={movie.poster}
            genre={movie.genre}
            dates={movie.screenings
              .map((screening) =>
                new Date(`${screening.date}T00:00:00`).toLocaleDateString(
                  "el-GR",
                  {
                    day: "numeric",
                    month: "long",
                  }
                )
              )
              .join(" • ")}
            venue={movie.location}
            targetId={movie.id}
          />
        ))}
      </div>

      <div
        className="mt-10 flex justify-center"
        style={{ marginTop: "270px" }}
      >
        <a
          href="/cinema/screenings"
          style={{
            padding: "6px 60px",
            minWidth: "0",
            textAlign: "center",
            color: "#252321",
          }}
          className="
            inline-block
            border
            border-[#B32025]
            text-[13px]
            uppercase
            tracking-[0.14em]
            text-[#B32025]
            transition
            hover:bg-[#B32025]
            hover:!text-white
          "
        >
          ΔΕΙΤΕ ΟΛΕΣ ΤΙΣ ΠΡΟΒΟΛΕΣ
        </a>
      </div>

      <br></br>
<br></br>

    </section>
  );
}