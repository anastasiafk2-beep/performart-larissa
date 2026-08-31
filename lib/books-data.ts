import "server-only";

import { defineQuery } from "next-sanity";

import { sanityClient } from "@/lib/sanity";

export type Book = {
  id: string;

  title: string;
  author?: string;
  category?: string;
  date: string;

  description?: string;
  excerpt?: string;

  cover?: string;

  review?: string;
  quote?: string;

  published?: boolean;
};

type SanityBook = {
  id: string;

  title?: string;
  author?: string;
  category?: string;
  date?: string;

  description?: string;
  excerpt?: string;

  cover?: string;

  review?: string;
  quote?: string;

  published?: boolean;
};

const BOOKS_QUERY = defineQuery(`
  *[_type == "book"] | order(date desc) {
    "id": _id,
    title,
    author,
    category,
    date,
    description,
    excerpt,
    "cover": cover.asset->url,
    review,
    quote,
    published
  }
`);

function normalizeBook(
  book: SanityBook
): Book | null {
  if (
    !book.id ||
    typeof book.title !== "string" ||
    typeof book.date !== "string"
  ) {
    return null;
  }

  return {
    id: book.id,

    title: book.title.trim(),

    author: book.author?.trim() || undefined,

    category: book.category?.trim() || undefined,

    date: book.date,

    description:
      book.description?.trim() || undefined,

    excerpt:
      book.excerpt?.trim() || undefined,

    cover: book.cover || undefined,

    review:
      book.review?.trim() || undefined,

    quote:
      book.quote?.trim() || undefined,

    published: book.published,
  };
}

export async function getBooks(): Promise<Book[]> {
  try {
    const sanityBooks =
      await sanityClient.fetch<SanityBook[]>(
        BOOKS_QUERY,
        {},
        { next: { revalidate: 60 } }
      );

    return sanityBooks
      .filter((book) => book.published !== false)
      .map(normalizeBook)
      .filter(
        (book): book is Book =>
          book !== null
      )
      .sort(
        (a, b) =>
          new Date(b.date).getTime() -
          new Date(a.date).getTime()
      );

  } catch (error) {
    console.error(
      "Unable to load Sanity books:",
      error
    );

    return [];
  }
}