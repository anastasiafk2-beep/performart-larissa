import "server-only";

import { defineQuery } from "next-sanity";

import {
  interviews as localInterviews,
  type Interview,
} from "@/components/content/interviews";

import { sanityClient } from "@/lib/sanity";

type SanityInterview = {
  id: string;

  title?: string;
  person?: string;
  role?: string;
  date?: string;
  category?: string;
  published?: boolean;

  description?: string;
  youtubeId?: string;
  image?: string;
  url?: string;
};

const INTERVIEWS_QUERY = defineQuery(`
  *[_type == "interview"] | order(date desc) {
    "id": _id,
    title,
    person,
    role,
    date,
    category,
    published,
    description,
    youtubeId,
    "image": image.asset->url,
    url
  }
`);

function normalizeInterview(
  interview: SanityInterview
): Interview | null {
  if (
    !interview.id ||
    typeof interview.title !== "string" ||
    typeof interview.date !== "string"
  ) {
    return null;
  }

  return {
    id: interview.id,

    type: interview.youtubeId ? "video" : "article",

    guest: interview.person?.trim() || undefined,

    title: interview.title.trim(),

    date: interview.date,

    description:
      interview.description?.trim() ||
      (interview.role
        ? `${interview.person || ""} — ${interview.role}`.trim()
        : interview.person?.trim() || interview.title.trim()),

    youtubeId: interview.youtubeId?.trim() || undefined,

    image: interview.image || undefined,

    url: interview.url?.trim() || undefined,
  };
}

export async function getInterviews(): Promise<Interview[]> {
  try {
    const sanityInterviews =
      await sanityClient.fetch<SanityInterview[]>(
        INTERVIEWS_QUERY,
        {},
        { next: { revalidate: 60 } }
      );

    const mergedInterviews = new Map(
      localInterviews.map(
        (interview) => [interview.id, interview] as const
      )
    );

    sanityInterviews
      .filter((interview) => interview.published !== false)
      .map(normalizeInterview)
      .filter(
        (interview): interview is Interview =>
          interview !== null
      )
      .forEach((interview) =>
        mergedInterviews.set(interview.id, interview)
      );

    return Array.from(mergedInterviews.values()).sort(
      (a, b) =>
        new Date(b.date).getTime() -
        new Date(a.date).getTime()
    );
  } catch (error) {
    console.error(
      "Unable to load Sanity interviews:",
      error
    );

    return localInterviews;
  }
}