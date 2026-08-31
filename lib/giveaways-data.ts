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

    image: giveaway.image || "",

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
        (giveaway) => [giveaway.id, giveaway] as const
      )
    );

    sanityGiveaways
      .map(normalizeGiveaway)
      .filter(
        (giveaway): giveaway is Giveaway =>
          giveaway !== null
      )
      .forEach((giveaway) =>
        mergedGiveaways.set(giveaway.id, giveaway)
      );

    return Array.from(mergedGiveaways.values());
  } catch (error) {
    console.error(
      "Unable to load Sanity giveaways:",
      error
    );

    return localGiveaways;
  }
}