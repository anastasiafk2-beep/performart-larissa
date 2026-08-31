import "server-only";

import { defineQuery } from "next-sanity";

import {
  festivals as localFestivals,
  type Festival,
} from "@/content/festivals/festivals";

import { sanityClient } from "@/lib/sanity";

type SanityFestival = {
  id: string;

  title?: string;
  year?: string;

  dates?: string;

  startDate?: string;
  endDate?: string;

  location?: string;
  description?: string;

  quote?: string;
  intro?: string;

  lineup?: {
    day?: string;
    title?: string;
    artists?: string[];
  }[];

  activities?: string[];
  facilities?: string[];

  ticketInfo?: string;

  image?: string;
  images?: string[];

  upcoming?: boolean;
};

const FESTIVALS_QUERY = defineQuery(`
  *[_type == "festival"] {
    "id": _id,
    title,
    year,
    dates,
    startDate,
    endDate,
    location,
    description,
    quote,
    intro,
    lineup[]{
      day,
      title,
      artists
    },
    activities,
    facilities,
    ticketInfo,
    "image": image.asset->url,
    "images": images[].asset->url,
    upcoming
  }
`);

function normalizeFestival(
  festival: SanityFestival
): Festival | null {
  if (
    !festival.id ||
    typeof festival.title !== "string" ||
    typeof festival.year !== "string"
  ) {
    return null;
  }

return {
  id: festival.id,

  title: festival.title.trim(),
  year: festival.year.trim(),

  dates: festival.dates?.trim() || "",

  startDate: festival.startDate || undefined,
  endDate: festival.endDate || undefined,

  location: festival.location?.trim() || "",
  description: festival.description?.trim() || "",

  quote: festival.quote?.trim() || undefined,

  intro: festival.intro?.trim() || undefined,

  lineup: Array.isArray(festival.lineup)
    ? festival.lineup
        .filter(
          (item) =>
            typeof item.day === "string"
        )
        .map((item) => ({
          day: item.day!.trim(),
          title: item.title?.trim() || undefined,
          artists: Array.isArray(item.artists)
            ? item.artists.filter(
                (artist): artist is string =>
                  typeof artist === "string"
              )
            : [],
        }))
    : undefined,

  activities: Array.isArray(festival.activities)
    ? festival.activities.filter(
        (item): item is string =>
          typeof item === "string"
      )
    : undefined,

  facilities: Array.isArray(festival.facilities)
    ? festival.facilities.filter(
        (item): item is string =>
          typeof item === "string"
      )
    : undefined,

  ticketInfo:
    festival.ticketInfo?.trim() || undefined,

  image: festival.image || "",

  images: Array.isArray(festival.images)
    ? festival.images
    : [],

  upcoming: festival.upcoming === true,
};
}

export async function getFestivals(): Promise<Festival[]> {
  try {
    const sanityFestivals =
      await sanityClient.fetch<SanityFestival[]>(
        FESTIVALS_QUERY,
        {},
        { next: { revalidate: 60 } }
      );

    const mergedFestivals = new Map(
      localFestivals.map(
        (festival) => [festival.id, festival] as const
      )
    );

    sanityFestivals
      .map(normalizeFestival)
      .filter(
        (festival): festival is Festival =>
          festival !== null
      )
      .forEach((festival) =>
        mergedFestivals.set(festival.id, festival)
      );

    return Array.from(mergedFestivals.values());
  } catch (error) {
    console.error(
      "Unable to load Sanity festivals:",
      error
    );
    

    return localFestivals;

    
  }
}