'use client'

import {
  Box,
  chakra,
  Heading,
  Image,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useLiveQuery } from 'next-sanity/preview'

import { Layout } from '~/components/Layout'
import { NextMonth } from '~/components/NextMonth'
import { Card } from '~/imports/chakra/components/Card'
import { ImageFallback } from '~/imports/chakra/components/ImageFallback'
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
    <Layout>
      <Stack spacing="4">
        <Heading as="h1" size="lg" textAlign="center">
          Disfruta tu libro!
        </Heading>

        <Box as="section">
          <Stack justify="center" align="center" spacing="8">
            {company.mainImage && (
              <Image
                loading="lazy"
                src={urlForImage(company.mainImage).url()}
                height="auto"
                width="400px"
                alt={company.title}
                fallback={<ImageFallback w="200px" h="150px" />}
                shadow="base"
              />
            )}

            <Text textAlign="center">
              <chakra.span fontWeight="bold">
                {company.title[0].toUpperCase() + company.title.slice(1)}
              </chakra.span>{' '}
              y Lectores Urbanos te regalan un libro distinto cada mes. <br />{' '}
              Proxima actualizacion el primero de <NextMonth />
            </Text>

            <Card bg="primary.500">
              <Link isExternal href={props.book.url} color="white">
                {props.book.title} de {props.book.author}
              </Link>
            </Card>
          </Stack>
        </Box>
      </Stack>
    </Layout>
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
