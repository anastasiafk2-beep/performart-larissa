import "server-only";

import { defineQuery } from "next-sanity";

import { sanityClient } from "@/lib/sanity";

export type Music = {
  id: string;

  title: string;
  artist?: string;
  category?: string;
  date: string;

  description?: string;
  excerpt?: string;

  image?: string;

  published?: boolean;
};

type SanityMusic = {
  id: string;

  title?: string;
  artist?: string;
  category?: string;
  date?: string;

  description?: string;
  excerpt?: string;

  image?: string;

  published?: boolean;
};

const MUSIC_QUERY = defineQuery(`
  *[_type == "music"] | order(date desc) {
    "id": _id,
    title,
    artist,
    category,
    date,
    description,
    excerpt,
    "image": image.asset->url,
    published
  }
`);

function normalizeMusic(
  music: SanityMusic
): Music | null {
  if (
    !music.id ||
    typeof music.title !== "string" ||
    typeof music.date !== "string"
  ) {
    return null;
  }

  return {
    id: music.id,

    title: music.title.trim(),

    artist: music.artist?.trim() || undefined,

    category: music.category?.trim() || undefined,

    date: music.date,

    description:
      music.description?.trim() || undefined,

    excerpt:
      music.excerpt?.trim() || undefined,

    image: music.image || undefined,

    published: music.published,
  };
}

export async function getMusic(): Promise<Music[]> {
  try {
    const sanityMusic =
      await sanityClient.fetch<SanityMusic[]>(
        MUSIC_QUERY,
        {},
        { next: { revalidate: 60 } }
      );

    return sanityMusic
      .filter((music) => music.published !== false)
      .map(normalizeMusic)
      .filter(
        (music): music is Music =>
          music !== null
      )
      .sort(
        (a, b) =>
          new Date(b.date).getTime() -
          new Date(a.date).getTime()
      );

  } catch (error) {
    console.error(
      "Unable to load Sanity music:",
      error
    );

    return [];
  }
}