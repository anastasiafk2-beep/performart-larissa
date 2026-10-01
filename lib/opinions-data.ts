import 'server-only'

import type {PortableTextBlock} from '@portabletext/react'
import {defineQuery} from 'next-sanity'
import {cache} from 'react'

import {sanityClient} from '@/lib/sanity'

export type EditorialImage = {
  url: string
  alt: string
  caption?: string
  lqip?: string
  dimensions?: {
    width: number
    height: number
    aspectRatio: number
  }
}

export type PortableEditorialImage = EditorialImage & {
  _key: string
  _type: 'editorialImage'
}

export type OpinionPortableContent = Array<
  PortableTextBlock | PortableEditorialImage
>

export type OpinionAuthor = {
  name: string
  role: string
  bio: string
  photo?: EditorialImage
  website?: string
  socialUrl?: string
}

export type DialoguePersona = {
  _id: string
  name: string
  tagline: string
  bio: string
  portrait?: EditorialImage
}

type FeedBase = {
  _id: string
  title: string
  slug: string
  topic: string
  excerpt: string
  publishedAt: string
  prominence: 'standard' | 'featured'
  image?: EditorialImage
}

export type OpinionArticleFeedItem = FeedBase & {
  _type: 'opinionArticle'
  author?: OpinionAuthor
}

export type DialogueFeedItem = FeedBase & {
  _type: 'dialogue'
  personas: DialoguePersona[]
  turnCount: number
}

export type OpinionFeedItem = OpinionArticleFeedItem | DialogueFeedItem

export type OpinionArticleDetail = OpinionArticleFeedItem & {
  body: OpinionPortableContent
  seo?: {
    title?: string
    description?: string
    shareImage?: EditorialImage
  }
}

export type DialogueTurn = {
  _key: string
  speaker: 'first' | 'second'
  content: PortableTextBlock[]
  aside?: string
}

export type DialogueDetail = DialogueFeedItem & {
  firstPersona: DialoguePersona
  secondPersona: DialoguePersona
  introduction?: OpinionPortableContent
  turns: DialogueTurn[]
  seo?: {
    title?: string
    description?: string
    shareImage?: EditorialImage
  }
}

export type OpinionDetail = OpinionArticleDetail | DialogueDetail

const imageProjection = `{
  "url": asset->url,
  alt,
  caption,
  "lqip": asset->metadata.lqip,
  "dimensions": asset->metadata.dimensions
}`

const personaProjection = `{
  _id,
  name,
  tagline,
  bio,
  "portrait": portrait ${imageProjection}
}`

const authorProjection = `{
  name,
  role,
  bio,
  website,
  socialUrl,
  "photo": photo ${imageProjection}
}`

const portableContentProjection = `[]{
  ...,
  _type == "editorialImage" => {
    _key,
    _type,
    "url": asset->url,
    alt,
    caption,
    "lqip": asset->metadata.lqip,
    "dimensions": asset->metadata.dimensions
  }
}`

const OPINIONS_FEED_QUERY = defineQuery(`
  *[
    _type in ["opinionArticle", "dialogue"] &&
    defined(slug.current) &&
    defined(publishedAt) &&
    publishedAt <= now()
  ] | order(publishedAt desc) {
    _id,
    _type,
    title,
    "slug": slug.current,
    topic,
    excerpt,
    publishedAt,
    "prominence": coalesce(prominence, "standard"),
    _type == "opinionArticle" => {
      "image": heroImage ${imageProjection},
      "author": author->${authorProjection}
    },
    _type == "dialogue" => {
      "image": coverImage ${imageProjection},
      "personas": [firstPersona->${personaProjection}, secondPersona->${personaProjection}],
      "turnCount": count(turns)
    }
  }
`)

const OPINION_DETAIL_QUERY = defineQuery(`
  *[
    _type in ["opinionArticle", "dialogue"] &&
    slug.current == $slug &&
    defined(publishedAt) &&
    publishedAt <= now()
  ][0] {
    _id,
    _type,
    title,
    "slug": slug.current,
    topic,
    excerpt,
    publishedAt,
    "prominence": coalesce(prominence, "standard"),
    "seo": seo {
      title,
      description,
      "shareImage": shareImage ${imageProjection}
    },
    _type == "opinionArticle" => {
      "image": heroImage ${imageProjection},
      "author": author->${authorProjection},
      "body": body ${portableContentProjection}
    },
    _type == "dialogue" => {
      "image": coverImage ${imageProjection},
      "firstPersona": firstPersona->${personaProjection},
      "secondPersona": secondPersona->${personaProjection},
      "personas": [firstPersona->${personaProjection}, secondPersona->${personaProjection}],
      "introduction": introduction ${portableContentProjection},
      "turnCount": count(turns),
      turns[]{
        _key,
        speaker,
        aside,
        content[]{...}
      }
    }
  }
`)

export async function getOpinionFeed(): Promise<OpinionFeedItem[]> {
  try {
    const items = await sanityClient.fetch<OpinionFeedItem[]>(
      OPINIONS_FEED_QUERY,
      {},
      {next: {revalidate: 60}},
    )

    if (!Array.isArray(items)) return []

    return items.sort((first, second) => {
      const firstRank = first.prominence === 'featured' ? 0 : 1
      const secondRank = second.prominence === 'featured' ? 0 : 1

      return firstRank - secondRank
    })
  } catch (error) {
    console.error('Unable to load Sanity opinions:', error)
    return []
  }
}

export const getOpinionBySlug = cache(
  async (slug: string): Promise<OpinionDetail | null> => {
    try {
      return await sanityClient.fetch<OpinionDetail | null>(
        OPINION_DETAIL_QUERY,
        {slug},
        {next: {revalidate: 60}},
      )
    } catch (error) {
      console.error(`Unable to load opinion “${slug}”:`, error)
      return null
    }
  },
)
