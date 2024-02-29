'use client'

import { Heading, Image, Link } from '@chakra-ui/react'
import NextLink from 'next/link'

import { urlForImage } from '~/lib/sanity.image'
import { type Company } from '~/lib/sanity.queries'
import { formatDate } from '~/utils'

export default function CompanyCard({ company }: { company: Company }) {
  return (
    <div className="card">
      {company.mainImage ? (
        <Image
          src={urlForImage(company.mainImage).url()}
          height="auto"
          width="200px"
          alt={company.title}
        />
      ) : (
        <div className="card__cover--none" />
      )}
      <div className="card__container">
        <Heading as="h2">
          <Link href={`/company/${company.slug.current}`} as={NextLink}>
            {company.title}
          </Link>
        </Heading>
        <p className="card__date">{formatDate(company._createdAt)}</p>
      </div>
    </div>
  )
}
