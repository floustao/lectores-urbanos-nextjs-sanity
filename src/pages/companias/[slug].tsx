import { Link } from '@chakra-ui/next-js'
import { Box, chakra, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useLiveQuery } from 'next-sanity/preview'

import { CompanyName } from '~/components/CompanyName'
import GoogleMaps from '~/components/GoogleMaps'
import { Layout } from '~/components/Layout'
import { NextMonth } from '~/components/NextMonth'
import { BookIcon } from '~/imports/chakra/icons'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import {
  type Book,
  type Company,
  companyBySlugQuery,
  companySlugsQuery,
  getBookById,
  getCompanyBySlug,
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
  const company = await getCompanyBySlug(client, params.slug)

  if (!company) {
    return {
      notFound: true,
    }
  }
  const book = await getBookById(client, company.book._ref)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      company,
      book,
    },
    revalidate: 10,
  }
}

export default function ProjectSlugRoute(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [company] = useLiveQuery(props.company, companyBySlugQuery, {
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
            <Text textAlign="center">
              <chakra.span fontWeight="bold">
                {company.title[0].toUpperCase() + company.title.slice(1)}
              </chakra.span>{' '}
              y Lectores Urbanos te regalan un libro distinto cada mes. <br />{' '}
              Proxima actualizacion el primero de <NextMonth />
            </Text>

            <Stack>
              <Text fontSize="md">Descubra tu libro:</Text>

              <HStack>
                <BookIcon boxSize={6} color="primary.500" />
                <Link href={`/libros/${props.book.slug.current}`}>
                  {props.book.title} de {props.book.author}
                </Link>
              </HStack>
            </Stack>

            {company?.location ? (
              <Stack>
                <Text>
                  Si quieres apoyar a <CompanyName company={company} />, visita
                  aqui:
                </Text>

                <GoogleMaps location={company.location} />
              </Stack>
            ) : company?.url ? (
              <Text>
                Visita <CompanyName company={company} />.
              </Text>
            ) : null}
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
    paths: slugs?.map(({ slug }) => `/companias/${slug}`) || [],
    fallback: 'blocking',
  }
}
