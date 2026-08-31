import "server-only";

import { defineQuery } from "next-sanity";

import { sanityClient } from "@/lib/sanity";

export type CinemaReview = {
  id: string;
  movieTitle: string;
  title: string;
  excerpt: string;
  rating: string;
  image?: string;
};

type SanityCinemaReview = {
  id: string;
  movieTitle?: string;
  title?: string;
  excerpt?: string;
  rating?: string;
  image?: string;
};

const CINEMA_REVIEWS_QUERY = defineQuery(`
  *[_type == "cinemaReview"] {
    "id": _id,
    movieTitle,
    title,
    excerpt,
    rating,
    "image": image.asset->url
  }
`);

function normalizeCinemaReview(
  review: SanityCinemaReview
): CinemaReview | null {
  if (
    !review.id ||
    typeof review.movieTitle !== "string" ||
    typeof review.title !== "string" ||
    typeof review.excerpt !== "string" ||
    typeof review.rating !== "string"
  ) {
    return null;
  }

  return {
    id: review.id,
    movieTitle: review.movieTitle.trim(),
    title: review.title.trim(),
    excerpt: review.excerpt.trim(),
    rating: review.rating.trim(),
    image: review.image || undefined,
  };
}

export async function getCinemaReviews(): Promise<CinemaReview[]> {
  try {
    const sanityReviews =
      await sanityClient.fetch<SanityCinemaReview[]>(
        CINEMA_REVIEWS_QUERY,
        {},
        { next: { revalidate: 60 } }
      );

    return sanityReviews
      .map(normalizeCinemaReview)
      .filter(
        (review): review is CinemaReview =>
          review !== null
      );
  } catch (error) {
    console.error(
      "Unable to load Sanity cinema reviews:",
      error
    );

    return [];
  }
}