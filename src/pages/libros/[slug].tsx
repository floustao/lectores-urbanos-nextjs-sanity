import { DownloadIcon } from '@chakra-ui/icons'
import { Button, Flex, Heading, Stack } from '@chakra-ui/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import dynamic from 'next/dynamic'
import { useLiveQuery } from 'next-sanity/preview'
import React from 'react'

import { Layout } from '~/components/Layout'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import {
  type Book,
  bookBySlugQuery,
  bookSlugsQuery,
  getBookBySlug,
} from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'

const DynamicPDFViewer = dynamic(() => import('~/components/PDFViewer'), {
  ssr: false,
})

interface Query {
  [key: string]: string
}

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    book: Book
  },
  Query
> = async ({ draftMode = false, params = {} }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const book = await getBookBySlug(client, params.slug)

  if (!book) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      book,
    },
    revalidate: 10,
  }
}

export default function ProjectSlugRoute(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [pdfData, setPdfData] = React.useState(null)
  const [pdfUrl, setPdfUrl] = React.useState(null)

  const [book] = useLiveQuery(props.book, bookBySlugQuery, {
    slug: props.book.slug.current,
  })

  React.useEffect(() => {
    async function fetchPdfUrl() {
      // Fetch the file object from Sanity
      const client = getClient()
      const file = await client.fetch(`*[_id == "${book.file.asset._ref}"][0]`)

      // Extract the URL from the file object
      if (file?.url) {
        setPdfUrl(file.url)
        const response = await fetch(file.url)
        const data = await response.arrayBuffer()
        setPdfData(data)
      }
    }

    if (book && book.file.asset._ref) {
      fetchPdfUrl()
    }
  }, [book])

  return (
    <Layout>
      <Stack spacing="4">
        <Heading as="h1" size="lg" textAlign="center">
          Disfruta tu libro!
        </Heading>

        <a
          href={pdfUrl}
          download="document.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button leftIcon={<DownloadIcon />} variant="solid">
            Descargar PDF
          </Button>
        </a>

        <Flex as="section" justify="center" align="center" shadow="base">
          <DynamicPDFViewer file={pdfData} />
        </Flex>
      </Stack>
    </Layout>
  )
}

export const getStaticPaths = async () => {
  const client = getClient()
  const slugs = await client.fetch(bookSlugsQuery)

  return {
    paths: slugs?.map(({ slug }) => `/libros/${slug}`) || [],
    fallback: 'blocking',
  }
}