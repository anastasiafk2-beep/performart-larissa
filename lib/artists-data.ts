import "server-only";

import { defineQuery } from "next-sanity";

import { sanityClient } from "@/lib/sanity";

export type Artist = {
  id: string;

  name: string;
  genre?: string;

  image?: string;

  description?: string;
  bio?: string;

  instagram?: string;
  spotify?: string;
  youtube?: string;

  published?: boolean;
};

type SanityArtist = {
  id: string;

  name?: string;
  genre?: string;

  image?: string;

  description?: string;
  bio?: string;

  instagram?: string;
  spotify?: string;
  youtube?: string;

  published?: boolean;
};

const ARTISTS_QUERY = defineQuery(`
  *[_type == "artist"] | order(name asc) {
    "id": _id,
    name,
    genre,
    "image": image.asset->url,
    description,
    bio,
    instagram,
    spotify,
    youtube,
    published
  }
`);

function normalizeArtist(
  artist: SanityArtist
): Artist | null {
  if (
    !artist.id ||
    typeof artist.name !== "string"
  ) {
    return null;
  }

  return {
    id: artist.id,

    name: artist.name.trim(),

    genre:
      artist.genre?.trim() || undefined,

    image:
      artist.image || undefined,

    description:
      artist.description?.trim() || undefined,

    bio:
      artist.bio?.trim() || undefined,

    instagram:
      artist.instagram?.trim() || undefined,

    spotify:
      artist.spotify?.trim() || undefined,

    youtube:
      artist.youtube?.trim() || undefined,

    published: artist.published,
  };
}

export async function getArtists(): Promise<Artist[]> {
  try {
    const sanityArtists =
      await sanityClient.fetch<SanityArtist[]>(
        ARTISTS_QUERY,
        {},
        { next: { revalidate: 60 } }
      );

    return sanityArtists
      .filter(
        (artist) => artist.published !== false
      )
      .map(normalizeArtist)
      .filter(
        (artist): artist is Artist =>
          artist !== null
      )
      .sort(
        (a, b) =>
          a.name.localeCompare(b.name, "el")
      );

  } catch (error) {
    console.error(
      "Unable to load Sanity artists:",
      error
    );

    return [];
  }
}