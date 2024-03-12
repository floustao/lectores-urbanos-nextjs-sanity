import { Geopoint } from '@sanity/google-maps-input'
import type { File, ImageAsset, Slug } from '@sanity/types'
import groq from 'groq'
import { type SanityClient } from 'next-sanity'

export const companiesQuery = groq`*[_type == "company" && !(_id in path("drafts.**")) && !(_originalId in path("drafts.**")) && defined(slug.current)] | order(_createdAt desc)`

export async function getCompanies(client: SanityClient): Promise<Company[]> {
  return await client.fetch(companiesQuery)
}

export const companyBySlugQuery = groq`*[_type == "company" && slug.current == $slug][0]`
export const bookBySlugQuery = groq`*[_type == "book" && slug.current == $slug][0]`

export async function getCompanyBySlug(
  client: SanityClient,
  slug: string,
): Promise<Company> {
  return await client.fetch(companyBySlugQuery, {
    slug,
  })
}

export const companySlugsQuery = groq`
*[_type == "company" && defined(slug.current)][].slug.current
`
export const bookSlugsQuery = groq`
*[_type == "book" && defined(slug.current)][].slug.current
`

export async function getBookById(
  client: SanityClient,
  _id: string,
): Promise<Book> {
  return await client.fetch(groq`*[_type == "book" && _id == $_id][0]`, {
    _id,
  })
}

export async function getBookBySlug(
  client: SanityClient,
  slug: string,
): Promise<Book> {
  return await client.fetch(bookBySlugQuery, {
    slug,
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
  file: File
  slug: Slug
}

export type Company = {
  _type: 'company'
  _id: string
  _createdAt: string
  title: string
  slug: Slug
  book: Reference<Book>
  mainImage?: ImageAsset
  location: Geopoint
  url: string
}
