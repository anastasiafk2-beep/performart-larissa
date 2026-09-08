import type {SlugIsUniqueValidator} from 'sanity'

const opinionDocumentTypes = ['opinionArticle', 'dialogue']

export const isUniqueOpinionSlug: SlugIsUniqueValidator = async (
  slug,
  context,
) => {
  const documentId = context.document?._id.replace(/^drafts\./, '')

  if (!slug || !documentId) {
    return true
  }

  const client = context.getClient({apiVersion: '2026-08-31'})
  const existingCount = await client.fetch<number>(
    `count(*[
      _type in $types &&
      slug.current == $slug &&
      !(_id in [$publishedId, $draftId])
    ])`,
    {
      types: opinionDocumentTypes,
      slug,
      publishedId: documentId,
      draftId: `drafts.${documentId}`,
    },
  )

  return existingCount === 0
}
