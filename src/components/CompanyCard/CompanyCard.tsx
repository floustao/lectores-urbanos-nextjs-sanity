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
import { urlForImage } from '~/lib/sanity.image'
import { Book, type Company } from '~/lib/sanity.queries'

export function CompanyCard({
  company,
  books,
}: {
  company: Company
  books: Record<string, Book>
}) {
  const book = books[company.book._ref]

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
          <LinkOverlay as={Link} href={`/companias/${company.slug.current}`}>
            {company.title}
          </LinkOverlay>
        </Heading>
        <HStack>
          <BookIcon boxSize={5} />
          {book && <Text fontStyle="italic">{book?.title}</Text>}
        </HStack>
      </Stack>
    </LinkBox>
  )
}
