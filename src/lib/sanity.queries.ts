import type { ImageAsset, Slug } from '@sanity/types'
import groq from 'groq'
import { type SanityClient } from 'next-sanity'

export const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`

export async function getPosts(client: SanityClient): Promise<Post[]> {
  return await client.fetch(postsQuery)
}

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]`

export async function getPost(
  client: SanityClient,
  slug: string,
): Promise<Post> {
  return await client.fetch(postBySlugQuery, {
    slug,
  })
}

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`

export async function getBook(
  client: SanityClient,
  _id: string,
): Promise<Book> {
  return await client.fetch(groq`*[_type == "book" && _id == $_id][0]`, {
    _id,
  })
}

export type Reference<T> = {
  _ref: string
  _type: 'reference'
}

export type Book = {
  _type: 'book'
  _id: string
  title: string
  author: string
  url: string
}

export type Post = {
  _type: 'post'
  _id: string
  _createdAt: string
  title: string
  slug: Slug
  book: Reference<Book>
  mainImage?: ImageAsset
}
