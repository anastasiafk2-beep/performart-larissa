"use client";

import { useEffect, useState } from "react";

import { events as localEvents, type Event } from "@/content/events";

export default function useEvents() {
  const [events, setEvents] = useState<Event[]>(localEvents);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function loadEvents() {
      try {
        const response = await fetch("/api/events", {
          signal: controller.signal,
        });

        if (!response.ok) {
          return;
        }

        const data: unknown = await response.json();

        if (Array.isArray(data)) {
          setEvents(data as Event[]);
        }
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          console.error("Unable to refresh events:", error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadEvents();

    return () => controller.abort();
  }, []);

  return { events, isLoading };
}
