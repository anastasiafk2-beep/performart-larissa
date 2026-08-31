import {sanityClient} from './sanity'

export async function testSanity() {
  const result = await sanityClient.fetch(
    `*[_type == "event"][0]{
      _id,
      title,
      date
    }`
  )

  console.log('SANITY TEST:', result)

  return result
}