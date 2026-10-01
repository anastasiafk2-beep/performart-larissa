import "server-only";

import { defineQuery } from "next-sanity";

import {
  giveaways as localGiveaways,
  type Giveaway,
} from "@/content/giveaways";

import { sanityClient } from "@/lib/sanity";

type SanityGiveaway = {
  id: string;

  title?: string;
  subtitle?: string;

  date?: string;

  venue?: string;
  eventDate?: string;
  time?: string;
  endDate?: string;

  description?: string;

  image?: string;

  participation?: string[];

  winners?: string;

  instagramUrl?: string;

  active?: boolean;
};

const GIVEAWAYS_QUERY = defineQuery(`
  *[_type == "giveaway"] {
    "id": _id,
    title,
    subtitle,
    date,
    venue,
    eventDate,
    time,
    endDate,
    description,
    "image": image.asset->url,
    participation,
    winners,
    instagramUrl,
    active
  }
`);

function normalizeGiveaway(
  giveaway: SanityGiveaway
): Giveaway | null {
  if (
    !giveaway.id ||
    typeof giveaway.title !== "string" ||
    typeof giveaway.date !== "string" ||
    typeof giveaway.description !== "string"
  ) {
    return null;
  }

  return {
    id: giveaway.id,

    title: giveaway.title.trim(),

    subtitle:
      giveaway.subtitle?.trim() || undefined,

    date: giveaway.date.trim(),

    venue:
      giveaway.venue?.trim() || undefined,

    eventDate:
      giveaway.eventDate?.trim() || undefined,

    time:
      giveaway.time?.trim() || undefined,

    endDate:
      giveaway.endDate?.trim() || undefined,

    description:
      giveaway.description.trim(),

    image:
      giveaway.image || "/images/placeholder.png",

    participation: Array.isArray(
      giveaway.participation
    )
      ? giveaway.participation.filter(
          (item): item is string =>
            typeof item === "string"
        )
      : [],

    winners:
      giveaway.winners?.trim() || undefined,

    instagramUrl:
      giveaway.instagramUrl?.trim() || undefined,

    active: giveaway.active === true,
  };
}

/* =========================================================
   DATE SORTING
   Υποστηρίζει:
   - 2026-09-30
   - 30/09/2026
   - 30 ΣΕΠΤΕΜΒΡΙΟΥ 2026
   - 30 Σεπτεμβρίου 2026
   ========================================================= */

const greekMonths: Record<string, number> = {
  ΙΑΝΟΥΑΡΙΟΥ: 0,
  ΦΕΒΡΟΥΑΡΙΟΥ: 1,
  ΜΑΡΤΙΟΥ: 2,
  ΑΠΡΙΛΙΟΥ: 3,
  ΜΑΙΟΥ: 4,
  ΙΟΥΝΙΟΥ: 5,
  ΙΟΥΛΙΟΥ: 6,
  ΑΥΓΟΥΣΤΟΥ: 7,
  ΣΕΠΤΕΜΒΡΙΟΥ: 8,
  ΟΚΤΩΒΡΙΟΥ: 9,
  ΝΟΕΜΒΡΙΟΥ: 10,
  ΔΕΚΕΜΒΡΙΟΥ: 11,
};

function getGiveawayDateTimestamp(date: string): number {
  if (!date) return 0;

  const trimmed = date.trim();

  // ISO: 2026-09-30
  const isoMatch = trimmed.match(
    /^(\d{4})-(\d{1,2})-(\d{1,2})/
  );

  if (isoMatch) {
    const [, year, month, day] = isoMatch;

    return Date.UTC(
      Number(year),
      Number(month) - 1,
      Number(day)
    );
  }

  // 30/09/2026
  const numericMatch = trimmed.match(
    /^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/
  );

  if (numericMatch) {
    const [, day, month, year] = numericMatch;

    return Date.UTC(
      Number(year),
      Number(month) - 1,
      Number(day)
    );
  }

  // Αφαίρεση τόνων και μετατροπή σε κεφαλαία
  const normalized = trimmed
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();

  // 30 ΣΕΠΤΕΜΒΡΙΟΥ 2026
  const greekMatch = normalized.match(
    /^(\d{1,2})\s+([Α-Ω]+)\s+(\d{4})$/
  );

  if (greekMatch) {
    const [, day, monthName, year] = greekMatch;

    const month = greekMonths[monthName];

    if (month !== undefined) {
      return Date.UTC(
        Number(year),
        month,
        Number(day)
      );
    }
  }

  return 0;
}

function sortGiveawaysByDate(
  giveaways: Giveaway[]
): Giveaway[] {
  return [...giveaways].sort(
    (a, b) =>
      getGiveawayDateTimestamp(b.date) -
      getGiveawayDateTimestamp(a.date)
  );
}

export async function getGiveaways(): Promise<
  Giveaway[]
> {
  try {
    const sanityGiveaways =
      await sanityClient.fetch<SanityGiveaway[]>(
        GIVEAWAYS_QUERY,
        {},
        { next: { revalidate: 60 } }
      );

    const mergedGiveaways = new Map(
      localGiveaways.map(
        (giveaway) =>
          [giveaway.id, giveaway] as const
      )
    );

    sanityGiveaways
      .map(normalizeGiveaway)
      .filter(
        (giveaway): giveaway is Giveaway =>
          giveaway !== null
      )
      .forEach((giveaway) =>
        mergedGiveaways.set(
          giveaway.id,
          giveaway
        )
      );

    return sortGiveawaysByDate(
      Array.from(mergedGiveaways.values())
    );
  } catch (error) {
    console.error(
      "Unable to load Sanity giveaways:",
      error
    );

    return sortGiveawaysByDate(
      localGiveaways
    );
  }
}