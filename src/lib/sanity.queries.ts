import type { ImageAsset, Slug } from '@sanity/types'
import groq from 'groq'
import { type SanityClient } from 'next-sanity'

export const companiesQuery = groq`*[_type == "company" && defined(slug.current)] | order(_createdAt desc)`

export async function getCompanies(client: SanityClient): Promise<Company[]> {
  return await client.fetch(companiesQuery)
}

export const postBySlugQuery = groq`*[_type == "company" && slug.current == $slug][0]`

export async function getPost(
  client: SanityClient,
  slug: string,
): Promise<Company> {
  return await client.fetch(postBySlugQuery, {
    slug,
  })
}

export const companySlugsQuery = groq`
*[_type == "company" && defined(slug.current)][].slug.current
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

export type Company = {
  _type: 'company'
  _id: string
  _createdAt: string
  title: string
  slug: Slug
  book: Reference<Book>
  mainImage?: ImageAsset
}
