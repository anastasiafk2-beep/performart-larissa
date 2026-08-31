import "server-only";

import { defineQuery } from "next-sanity";

import {
  movies as localMovies,
  type Movie,
  type Screening,
} from "@/content/cinema/movies";
import { sanityClient } from "@/lib/sanity";

type SanityCinemaMovie = {
  id: string;
  title?: string;
  poster?: string;
  location?: string;
  genre?: string;
  description?: unknown;
  duration?: string;
  rating?: string;
  ticket?: string;
  screenings?: Array<{
    date?: string;
    time?: string;
    venue?: string;
  }>;
};

const CINEMA_MOVIES_QUERY = defineQuery(`
  *[_type == "cinemaMovie"] | order(title asc) {
    "id": _id,
    title,
    "poster": poster.asset->url,
    location,
    genre,
    description,
    duration,
    rating,
    ticket,
    screenings[] {
      date,
      time,
      venue
    }
  }
`);

function normalizeScreenings(
  screenings: SanityCinemaMovie["screenings"]
): Screening[] {
  if (!Array.isArray(screenings)) {
    return [];
  }

  return screenings
    .filter(
      (screening): screening is {
        date: string;
        time: string;
        venue?: string;
      } =>
        typeof screening.date === "string" &&
        typeof screening.time === "string"
    )
    .map((screening) => ({
      date: screening.date,
      time: screening.time,
      venue: screening.venue,
    }));
}

function normalizeDescription(description: unknown): string[] {
  if (typeof description === "string") {
    return [description];
  }

  if (!Array.isArray(description)) {
    return [];
  }

  return description.filter(
    (paragraph): paragraph is string => typeof paragraph === "string"
  );
}

function normalizeMovie(movie: SanityCinemaMovie): Movie | null {
  if (!movie.id || typeof movie.title !== "string") {
    return null;
  }

  const screenings = normalizeScreenings(movie.screenings);
  const screeningYear = Number(screenings[0]?.date.slice(0, 4));

  return {
    id: movie.id,
    year: Number.isFinite(screeningYear)
      ? screeningYear
      : new Date().getFullYear(),
    title: movie.title.trim(),
    location:
      movie.location?.trim() || screenings[0]?.venue?.trim() || "Λάρισα",
    poster: movie.poster || "/backgrounds/cinema-bg.png",
    description: normalizeDescription(movie.description),
    screenings,
    duration: movie.duration?.trim() || "—",
    genre: movie.genre?.trim() || "Cinema",
    rating: movie.rating?.trim() || "—",
    ticket: movie.ticket?.trim() || "—",
  };
}

export async function getCinemaMovies(): Promise<Movie[]> {
  try {
    const sanityMovies = await sanityClient.fetch<SanityCinemaMovie[]>(
      CINEMA_MOVIES_QUERY,
      {},
      { next: { revalidate: 60 } }
    );

    const mergedMovies = new Map(
      localMovies.map((movie) => [movie.id, movie] as const)
    );

    sanityMovies
      .map(normalizeMovie)
      .filter((movie): movie is Movie => movie !== null)
      .forEach((movie) => mergedMovies.set(movie.id, movie));

    return Array.from(mergedMovies.values());
  } catch (error) {
    console.error("Unable to load Sanity cinema movies:", error);
    return localMovies;
  }
}
