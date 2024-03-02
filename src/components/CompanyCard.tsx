import { Link } from '@chakra-ui/next-js'
import { Heading, HStack, Image, Stack, Text } from '@chakra-ui/react'
import React from 'react'

import { Card } from '~/imports/chakra/components/Card'
import { ImageFallback } from '~/imports/chakra/components/ImageFallback'
import { BookIcon } from '~/imports/chakra/icons'
import { getClient } from '~/lib/sanity.client'
import { urlForImage } from '~/lib/sanity.image'
import { type Company, getBook } from '~/lib/sanity.queries'

export default function CompanyCard({ company }: { company: Company }) {
  const [book, setBook] = React.useState(null)

  React.useEffect(() => {
    const client = getClient()
    const fetchBook = async () => {
      try {
        const book = await getBook(client, company.book._ref)
        setBook(book)
      } catch (error) {
        console.error('Error fetching book data:', error)
      }
    }

    fetchBook()
  }, [company.book._ref])

  return (
    <Card display="flex" p="4" flexDirection={['column', 'row']}>
      {company.mainImage ? (
        <Image
          loading="lazy"
          src={urlForImage(company.mainImage).url()}
          height="auto"
          width={['full', '180px']}
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
        <Heading size="md" noOfLines={2}>
          <Link href={`/company/${company.slug.current}`}>{company.title}</Link>
        </Heading>
        {book ? (
          <HStack>
            <BookIcon boxSize={5} />
            <Text fontStyle="italic">{book.title}</Text>
          </HStack>
        ) : (
          <Text>No hay libro asignado</Text>
        )}
      </Stack>
    </Card>
  )
}
