import imageUrlBuilder from '@sanity/image-url'

import { getClient } from '~/lib/sanity.client'

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('es-MX', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

const client = getClient()
const builder = imageUrlBuilder(client)
export function urlFor(source) {
  return builder.image(source)
}
