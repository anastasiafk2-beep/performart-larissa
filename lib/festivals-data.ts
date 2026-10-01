import "server-only";

import { defineQuery } from "next-sanity";

import {
  festivals as localFestivals,
  type Festival,
} from "@/content/festivals";

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
          title: item.title?.trim() || "",
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

   const normalizedSanityFestivals = sanityFestivals
  .map(normalizeFestival)
  .filter(
    (festival): festival is Festival =>
      festival !== null
  );

const mergedFestivals = new Map<string, Festival>();

localFestivals.forEach((localFestival) => {
  const sanityFestival = normalizedSanityFestivals.find(
    (item) => item.id === localFestival.id
  );

  if (!sanityFestival) {
    mergedFestivals.set(localFestival.id, localFestival);
    return;
  }

  mergedFestivals.set(localFestival.id, {
    ...localFestival,
    ...sanityFestival,

    title:
      sanityFestival.title || localFestival.title,

    year:
      sanityFestival.year || localFestival.year,

    dates:
      sanityFestival.dates || localFestival.dates,

    startDate:
      sanityFestival.startDate || localFestival.startDate,

    endDate:
      sanityFestival.endDate || localFestival.endDate,

    location:
      sanityFestival.location || localFestival.location,

    description:
      sanityFestival.description || localFestival.description,

    quote:
      sanityFestival.quote || localFestival.quote,

    intro:
      sanityFestival.intro || localFestival.intro,

    lineup:
      sanityFestival.lineup?.length
        ? sanityFestival.lineup
        : localFestival.lineup,

    activities:
      sanityFestival.activities?.length
        ? sanityFestival.activities
        : localFestival.activities,

    facilities:
      sanityFestival.facilities?.length
        ? sanityFestival.facilities
        : localFestival.facilities,

    ticketInfo:
      sanityFestival.ticketInfo || localFestival.ticketInfo,

    image:
      sanityFestival.image || localFestival.image,

    images:
      sanityFestival.images?.length
        ? sanityFestival.images
        : localFestival.images,

    upcoming:
      sanityFestival.upcoming ?? localFestival.upcoming,
  });
});

normalizedSanityFestivals.forEach((sanityFestival) => {
  if (!mergedFestivals.has(sanityFestival.id)) {
    mergedFestivals.set(
      sanityFestival.id,
      sanityFestival
    );
  }
});

return Array.from(mergedFestivals.values());

  } catch (error) {
    console.error(
      "Unable to load Sanity festivals:",
      error
    );
    

    return localFestivals;

    
  }
}