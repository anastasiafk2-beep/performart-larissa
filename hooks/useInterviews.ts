"use client";

import { useEffect, useState } from "react";

import {
  interviews as localInterviews,
  type Interview,
} from "@/components/content/interviews";

export default function useInterviews() {
  const [interviews, setInterviews] =
    useState<Interview[]>(localInterviews);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function loadInterviews() {
      try {
        const response = await fetch("/api/interviews", {
          signal: controller.signal,
        });

        if (!response.ok) {
          return;
        }

        const data: unknown = await response.json();

        if (Array.isArray(data)) {
          setInterviews(data as Interview[]);
        }
      } catch (error) {
        if (
          !(error instanceof DOMException && error.name === "AbortError")
        ) {
          console.error("Unable to refresh interviews:", error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadInterviews();

    return () => controller.abort();
  }, []);

  return { interviews, isLoading };
}