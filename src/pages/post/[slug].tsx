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
  getBook,
  getPost,
  type Post,
  postBySlugQuery,
  postSlugsQuery,
} from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'
import { formatDate } from '~/utils'

interface Query {
  [key: string]: string
}

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    post: Post
    book: Book
  },
  Query
> = async ({ draftMode = false, params = {} }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const post = await getPost(client, params.slug)

  if (!post) {
    return {
      notFound: true,
    }
  }
  const book = await getBook(client, post.book._ref)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      post,
      book,
    },
  }
}

export default function ProjectSlugRoute(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [post] = useLiveQuery(props.post, postBySlugQuery, {
    slug: props.post.slug.current,
  })

  return (
    <Container>
      <section className="post">
        {post.mainImage ? (
          <Image
            src={urlForImage(post.mainImage).url()}
            height="auto"
            width="300px"
            alt={post.title}
          />
        ) : (
          <div className="post__cover--none" />
        )}
        <div className="post__container">
          <Heading as="h1">{post.title}</Heading>

          <Text>{formatDate(post._createdAt)}</Text>

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
  const slugs = await client.fetch(postSlugsQuery)

  return {
    paths: slugs?.map(({ slug }) => `/post/${slug}`) || [],
    fallback: 'blocking',
  }
}
