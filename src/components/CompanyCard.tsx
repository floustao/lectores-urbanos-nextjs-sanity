'use client'

import { Heading, Image, Link, Stack, Text } from '@chakra-ui/react'
import NextLink from 'next/link'

import { Card } from '~/imports/chakra/components/Card'
import { ImageFallback } from '~/imports/chakra/components/ImageFallback'
import { urlForImage } from '~/lib/sanity.image'
import { type Company } from '~/lib/sanity.queries'
import { formatDate } from '~/utils'

export default function CompanyCard({ company }: { company: Company }) {
  return (
    <Card display="flex" p="4" flexDirection={['column', 'row']}>
      {company.mainImage ? (
        <Image
          src={urlForImage(company.mainImage).url()}
          height="auto"
          width={['full', '200px']}
          objectFit="contain"
          alt={company.title}
          fallback={
            <ImageFallback w={['full', '200px']} h={['auto', '150px']} />
          }
        />
      ) : (
        <div className="card__cover--none" />
      )}
      <Stack m="4" spacing="1">
        <Heading as="h2" size="lg" noOfLines={2}>
          <Link href={`/company/${company.slug.current}`} as={NextLink}>
            {company.title}
          </Link>
        </Heading>
        <Text>Desde {formatDate(company._createdAt)}</Text>
      </Stack>
    </Card>
  )
}
