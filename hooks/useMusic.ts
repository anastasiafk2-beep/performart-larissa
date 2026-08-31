"use client";

import { useEffect, useState } from "react";

import type { Music } from "@/lib/music-data";

export default function useMusic() {
  const [music, setMusic] = useState<Music[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function loadMusic() {
      try {
        const response = await fetch("/api/music", {
          signal: controller.signal,
        });

        if (!response.ok) {
          return;
        }

        const data: unknown = await response.json();

        if (Array.isArray(data)) {
          setMusic(data as Music[]);
        }
      } catch (error) {
        if (
          !(error instanceof DOMException && error.name === "AbortError")
        ) {
          console.error("Unable to load music:", error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadMusic();

    return () => controller.abort();
  }, []);

  return { music, isLoading };
}