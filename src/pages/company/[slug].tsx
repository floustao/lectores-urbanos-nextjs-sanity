'use client'

import { Button, Heading, Image, Link, Text } from '@chakra-ui/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import NextLink from 'next/link'
import { useLiveQuery } from 'next-sanity/preview'

import Container from '~/components/Container'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { urlForImage } from '~/lib/sanity.image'
import {
  type Book,
  type Company,
  companySlugsQuery,
  getBook,
  getPost,
  postBySlugQuery,
} from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'
import { formatDate } from '~/utils'

interface Query {
  [key: string]: string
}

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    company: Company
    book: Book
  },
  Query
> = async ({ draftMode = false, params = {} }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const company = await getPost(client, params.slug)

  if (!company) {
    return {
      notFound: true,
    }
  }
  const book = await getBook(client, company.book._ref)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      company,
      book,
    },
  }
}

export default function ProjectSlugRoute(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [company] = useLiveQuery(props.company, postBySlugQuery, {
    slug: props.company.slug.current,
  })

  return (
    <Container>
      <section className="company">
        {company.mainImage ? (
          <Image
            src={urlForImage(company.mainImage).url()}
            height="auto"
            width="300px"
            alt={company.title}
          />
        ) : (
          <div className="post__cover--none" />
        )}
        <div className="post__container">
          <Heading as="h1">{company.title}</Heading>

          <Text>{formatDate(company._createdAt)}</Text>

          {props.book && (
            <Link href={props.book.url} isExternal as={NextLink}>
              {props.book.title} by {props.book.author}
            </Link>
          )}
        </div>
      </section>
    </Container>
  )
}

export const getStaticPaths = async () => {
  const client = getClient()
  const slugs = await client.fetch(companySlugsQuery)

  return {
    paths: slugs?.map(({ slug }) => `/company/${slug}`) || [],
    fallback: 'blocking',
  }
}
