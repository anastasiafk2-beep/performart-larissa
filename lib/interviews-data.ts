import "server-only";

import { defineQuery } from "next-sanity";

import {
  interviews as localInterviews,
  type Interview,
  type InterviewFormat,
  type InterviewQuestion,
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

  // Παλιά μορφή
  type?: "video" | "article";

  // Νέα μορφή
  formats?: InterviewFormat[];

  excerpt?: string;
  description?: string;

  youtubeId?: string;

  articleUrl?: string;
  url?: string;

  introduction?: string;

  questions?: InterviewQuestion[];

  quote?: string;

  gallery?: string[];

  slug?: {
    current?: string;
  };

  image?: string;
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

    type,
    formats,

    excerpt,
    description,

    youtubeId,

    articleUrl,
    url,

    introduction,

    questions[] {
      question,
      answer
    },

    quote,

    "gallery": gallery[].asset->url,

    slug,

    "image": image.asset->url
  }
`);

function getFormats(
  interview: SanityInterview
): InterviewFormat[] {
  if (
    Array.isArray(interview.formats) &&
    interview.formats.length > 0
  ) {
    return interview.formats;
  }

  // Συμβατότητα με παλιές Sanity συνεντεύξεις
  if (interview.type === "video") {
    return ["youtube"];
  }

  if (interview.type === "article") {
    return ["article"];
  }

  // Τελευταίο fallback
  const formats: InterviewFormat[] = [];

  if (interview.youtubeId) {
    formats.push("youtube");
  }

  if (interview.articleUrl || interview.url) {
    formats.push("article");
  }

  if (
    Array.isArray(interview.questions) &&
    interview.questions.length > 0
  ) {
    formats.push("qa");
  }

  return formats;
}

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

  const formats = getFormats(interview);

  return {
    id: interview.slug?.current || interview.id,

    formats,

    // Το κρατάμε για τις παλιές σελίδες / fallback
    type:
      interview.type ||
      (formats.includes("youtube")
        ? "video"
        : formats.includes("article")
          ? "article"
          : undefined),

    guest:
      interview.person?.trim() || undefined,

    title:
      interview.title.trim(),

    date:
      interview.date,

    description:
      interview.excerpt?.trim() ||
      interview.description?.trim() ||
      (interview.role
        ? `${interview.person || ""} — ${interview.role}`.trim()
        : interview.person?.trim() ||
          interview.title.trim()),

    youtubeId:
      interview.youtubeId?.trim() || undefined,

    image:
      interview.image || undefined,

    url:
      interview.articleUrl?.trim() ||
      interview.url?.trim() ||
      undefined,

    introduction:
      interview.introduction?.trim() || undefined,

    questions:
      Array.isArray(interview.questions)
        ? interview.questions.filter(
            (item) =>
              item?.question?.trim() &&
              item?.answer?.trim()
          )
        : undefined,

    quote:
      interview.quote?.trim() || undefined,

    gallery:
      Array.isArray(interview.gallery)
        ? interview.gallery.filter(Boolean)
        : undefined,
  };
}

export async function getInterviews(): Promise<
  Interview[]
> {
  try {
    const sanityInterviews =
      await sanityClient.fetch<
        SanityInterview[]
      >(
        INTERVIEWS_QUERY,
        {},
        {
          next: {
            revalidate: 60,
          },
        }
      );

    const mergedInterviews =
      new Map<string, Interview>(
        localInterviews.map(
          (interview) => [
            interview.id,
            interview,
          ]
        )
      );

    sanityInterviews
      .filter(
        (interview) =>
          interview.published !== false
      )
      .map(normalizeInterview)
      .filter(
        (
          interview
        ): interview is Interview =>
          interview !== null
      )
      .forEach((interview) => {
        mergedInterviews.set(
          interview.id,
          interview
        );
      });

    return Array.from(
      mergedInterviews.values()
    ).sort(
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