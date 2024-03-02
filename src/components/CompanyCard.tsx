import { Link } from '@chakra-ui/next-js'
import {
  Heading,
  HStack,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
} from '@chakra-ui/react'
import NextImage from 'next/image'
import React from 'react'

import { CustomCard } from '~/imports/chakra/components/CustomCard'
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
    <LinkBox
      as={CustomCard}
      display="flex"
      p="4"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      _hover={{
        bg: 'gray.50',
        cursor: 'pointer',
        transition: 'background-color 0.5s ease-in-out',
      }}
    >
      <NextImage
        src={urlForImage(company.mainImage).url()}
        alt={company.title}
        width={180}
        height={180}
        quality={80}
      />

      <Stack m="4" spacing="1">
        <Heading size="md" noOfLines={2}>
          <LinkOverlay as={Link} href={`/company/${company.slug.current}`}>
            {company.title}
          </LinkOverlay>
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
    </LinkBox>
  )
}
