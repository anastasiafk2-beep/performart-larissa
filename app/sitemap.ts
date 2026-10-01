import type { MetadataRoute } from "next";

import { getArtists } from "@/lib/artists-data";
import { getBooks } from "@/lib/books-data";
import { getCinemaMovies } from "@/lib/cinema-data";
import { getCinemaReviews } from "@/lib/cinema-reviews-data";
import { getEvents } from "@/lib/events-data";
import { getFestivals } from "@/lib/festivals-data";
import { getGiveaways } from "@/lib/giveaways-data";
import { getInterviews } from "@/lib/interviews-data";
import { getMusic } from "@/lib/music-data";
import { getOpinionFeed } from "@/lib/opinions-data";
import { absoluteUrl } from "@/lib/seo";

export const revalidate = 3600;

const staticRoutes: Array<{
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
}> = [
  { path: "/", changeFrequency: "daily", priority: 1 },
  { path: "/events", changeFrequency: "daily", priority: 0.9 },
  { path: "/events/agenda", changeFrequency: "daily", priority: 0.8 },
  { path: "/cinema", changeFrequency: "daily", priority: 0.9 },
  { path: "/cinema/screenings", changeFrequency: "daily", priority: 0.8 },
  { path: "/cinema/reviews", changeFrequency: "weekly", priority: 0.8 },
  { path: "/music", changeFrequency: "weekly", priority: 0.9 },
  { path: "/music/releases", changeFrequency: "weekly", priority: 0.8 },
  { path: "/music/artists", changeFrequency: "weekly", priority: 0.8 },
  { path: "/interviews", changeFrequency: "weekly", priority: 0.9 },
  { path: "/interviews/archive", changeFrequency: "weekly", priority: 0.7 },
  { path: "/festivals", changeFrequency: "weekly", priority: 0.9 },
  { path: "/festivals/archive", changeFrequency: "monthly", priority: 0.7 },
  { path: "/books", changeFrequency: "weekly", priority: 0.8 },
  { path: "/giveaways", changeFrequency: "weekly", priority: 0.8 },
  { path: "/opinions", changeFrequency: "weekly", priority: 0.8 },
  { path: "/about", changeFrequency: "monthly", priority: 0.6 },
];

function detailPath(parent: string, id: string) {
  return `${parent}/${encodeURIComponent(id)}`;
}

function images(image?: string) {
  if (!image) return undefined;

  const url = new URL(absoluteUrl(image));
  url.pathname = url.pathname
    .split("/")
    .map((segment) => encodeURIComponent(decodeURIComponent(segment)))
    .join("/");

  return [url.toString()];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [
    events,
    movies,
    reviews,
    festivals,
    giveaways,
    interviews,
    books,
    music,
    artists,
    opinions,
  ] = await Promise.all([
    getEvents(),
    getCinemaMovies(),
    getCinemaReviews(),
    getFestivals(),
    getGiveaways(),
    getInterviews(),
    getBooks(),
    getMusic(),
    getArtists(),
    getOpinionFeed(),
  ]);

  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  events.forEach((event) =>
    entries.push({
      url: absoluteUrl(detailPath("/events", event.id)),
      changeFrequency: "weekly",
      priority: 0.8,
      images: images(event.image),
    }),
  );

  movies.forEach((movie) =>
    entries.push({
      url: absoluteUrl(detailPath("/cinema", movie.id)),
      changeFrequency: "weekly",
      priority: 0.7,
      images: images(movie.poster),
    }),
  );

  const reviewEntries = new Map(
    reviews.map((review) => [review.id, review.image] as const),
  );
  reviewEntries.set(
    "the-devil-wears-prada",
    "/images/cinema/reviews/review-devil-wears-prada.png",
  );
  reviewEntries.forEach((image, id) =>
    entries.push({
      url: absoluteUrl(detailPath("/cinema/reviews", id)),
      changeFrequency: "monthly",
      priority: 0.7,
      images: images(image),
    }),
  );

  festivals.forEach((festival) =>
    entries.push({
      url: absoluteUrl(detailPath("/festivals", festival.id)),
      changeFrequency: "weekly",
      priority: 0.8,
      images: images(festival.image),
    }),
  );

  giveaways.forEach((giveaway) =>
    entries.push({
      url: absoluteUrl(detailPath("/giveaways", giveaway.id)),
      changeFrequency: "weekly",
      priority: 0.7,
      images: images(giveaway.image),
    }),
  );

  interviews.forEach((interview) =>
    entries.push({
      url: absoluteUrl(detailPath("/interviews", interview.id)),
      changeFrequency: "monthly",
      priority: 0.8,
      images: images(interview.image),
    }),
  );

  books.forEach((book) =>
    entries.push({
      url: absoluteUrl(detailPath("/books", book.id)),
      changeFrequency: "monthly",
      priority: 0.7,
      images: images(book.cover),
    }),
  );

  music.forEach((item) =>
    entries.push({
      url: absoluteUrl(detailPath("/music", item.id)),
      changeFrequency: "monthly",
      priority: 0.7,
      images: images(item.image),
    }),
  );

  artists.forEach((artist) =>
    entries.push({
      url: absoluteUrl(detailPath("/music/artists", artist.id)),
      changeFrequency: "monthly",
      priority: 0.7,
      images: images(artist.image),
    }),
  );

  opinions.forEach((opinion) =>
    entries.push({
      url: absoluteUrl(detailPath("/opinions", opinion.slug)),
      changeFrequency: "monthly",
      priority: 0.8,
      images: images(opinion.image?.url),
    }),
  );

  return Array.from(
    new Map(entries.map((entry) => [entry.url, entry] as const)).values(),
  );
}
