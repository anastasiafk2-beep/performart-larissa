"use client";

import { useEffect, useState } from "react";

import {
  movies as localMovies,
  type Movie,
} from "@/content/cinema/movies";

export default function useCinemaMovies() {
  const [movies, setMovies] = useState<Movie[]>(localMovies);

  useEffect(() => {
    const controller = new AbortController();

    async function loadMovies() {
      try {
        const response = await fetch("/api/cinema/movies", {
          signal: controller.signal,
        });

        if (!response.ok) {
          return;
        }

        const data: unknown = await response.json();

        if (Array.isArray(data)) {
          setMovies(data as Movie[]);
        }
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          console.error("Unable to refresh cinema movies:", error);
        }
      }
    }

    void loadMovies();

    return () => controller.abort();
  }, []);

  return movies;
}
