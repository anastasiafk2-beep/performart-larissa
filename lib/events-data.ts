import "server-only";

import { defineQuery } from "next-sanity";

import { events as localEvents, type Event } from "@/content/events";
import { sanityClient } from "@/lib/sanity";

type SanityEvent = {
  id: string;
  title?: string;
  category?: string;
  date?: string;
  time?: string;
  venue?: string;
  location?: string;
  description?: string;
  image?: string;
  upcoming?: boolean;
};

const EVENT_CATEGORIES: Event["category"][] = [
  "theatre",
  "music",
  "dance",
  "venue",
  "kids",
  "other",
];

const EVENTS_QUERY = defineQuery(`
  *[_type == "event"] | order(date asc, time asc) {
    "id": _id,
    title,
    category,
    date,
    time,
    venue,
    location,
    description,
    "image": image.asset->url,
    upcoming
  }
`);

function isEventCategory(category: string): category is Event["category"] {
  return EVENT_CATEGORIES.includes(category as Event["category"]);
}

function normalizeEvent(event: SanityEvent): Event | null {
  if (
    !event.id ||
    typeof event.title !== "string" ||
    typeof event.date !== "string" ||
    typeof event.venue !== "string" ||
    typeof event.description !== "string"
  ) {
    return null;
  }

  const category =
    typeof event.category === "string" && isEventCategory(event.category)
      ? event.category
      : "other";

  return {
    id: event.id,
    title: event.title.trim(),
    category,
    date: event.date,
    time: event.time?.trim() || undefined,
    venue: event.venue.trim(),
    location: event.location?.trim() || undefined,
    description: event.description.trim(),
    image: event.image || "/images/menu/events.jpg",
    upcoming: event.upcoming ?? event.date >= new Date().toISOString().slice(0, 10),
  };
}

export async function getEvents(): Promise<Event[]> {
  try {
    const sanityEvents = await sanityClient.fetch<SanityEvent[]>(
      EVENTS_QUERY,
      {},
      { next: { revalidate: 60 } }
    );

    const mergedEvents = new Map(
      localEvents.map((event) => [event.id, event] as const)
    );

    sanityEvents
      .map(normalizeEvent)
      .filter((event): event is Event => event !== null)
      .forEach((event) => mergedEvents.set(event.id, event));

    return Array.from(mergedEvents.values()).sort((a, b) =>
      `${a.date} ${a.time || ""}`.localeCompare(`${b.date} ${b.time || ""}`)
    );
  } catch (error) {
    console.error("Unable to load Sanity events:", error);
    return localEvents;
  }
}
