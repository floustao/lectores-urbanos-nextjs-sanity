import { Heading, Image, Link } from '@chakra-ui/react'
import NextLink from 'next/link'

import { urlForImage } from '~/lib/sanity.image'
import { type Post } from '~/lib/sanity.queries'
import { formatDate } from '~/utils'

export default function Card({ post }: { post: Post }) {
  return (
    <div className="card">
      {post.mainImage ? (
        <Image
          src={urlForImage(post.mainImage).url()}
          height="auto"
          width="300px"
          alt={post.title}
        />
      ) : (
        <div className="card__cover--none" />
      )}
      <div className="card__container">
        <Heading as="h2">
          <Link href={`/post/${post.slug.current}`} as={NextLink}>
            {post.title}
          </Link>
        </Heading>
        <p className="card__date">{formatDate(post._createdAt)}</p>
      </div>
    </div>
  )
}
