import { Link } from '@chakra-ui/next-js'
import {
  Heading,
  HStack,
  Image,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
} from '@chakra-ui/react'
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
      justifyContent="space-between"
      alignItems="center"
      _hover={{
        bg: 'gray.50',
        cursor: 'pointer',
        transition: 'background-color 0.5s ease-in-out',
      }}
    >
      <CustomCard shadow="xs">
        <Image
          src={urlForImage(company.mainImage).url()}
          alt={company.title}
          width={180}
          height={180}
          objectFit="contain"
        />
      </CustomCard>

      <Stack m="4" spacing="1" h="full">
        <Heading size="md" noOfLines={2}>
          <LinkOverlay as={Link} href={`/company/${company.slug.current}`}>
            {company.title}
          </LinkOverlay>
        </Heading>
        <HStack>
          <BookIcon boxSize={5} />
          {book ? (
            <Text fontStyle="italic">{book?.title}</Text>
          ) : (
            <Text>...</Text>
          )}
        </HStack>
      </Stack>
    </LinkBox>
  )
}
