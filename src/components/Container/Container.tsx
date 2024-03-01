'use client'

import {
  Box,
  Container as ChakraContainer,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react'
import NextImage from 'next/image'
import NextLink from 'next/link'
import { PropsWithChildren } from 'react'

import booksImage from './books.png'

export const Container: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ChakraContainer maxW="xl">
      <Stack
        m="0 auto"
        spacing="4"
        p="4"
        display="grid"
        gridTemplateAreas={`
      "header"
      "body"
      "footer"
      `}
        gridTemplateRows="auto 1fr auto"
        height="100vh"
      >
        <Box as="header" gridArea="header">
          <Link className="header__title" href="/" as={NextLink}>
            <NextImage
              src="https://lectoresurbanos.com/assets/images/logo.png"
              alt="go to homepage"
              width="150"
              height="150"
            />
          </Link>
        </Box>
        <Box as="main" gridArea="body">
          {children}
        </Box>
        <Box as="footer" gridArea="footer">
          <Stack spacing="8" justify="center" align="center">
            <Stack spacing="0" justify="center" align="center">
              <NextImage src={booksImage} alt="books" width="400" />
              <Text>Juntos convertiremos a Mexico</Text>
              <Text fontWeight="semibold">
                en el Primer Pais Biblioteco del Mundo
              </Text>
            </Stack>
            <Text
              fontSize="xs"
              display="flex"
              align="center"
              gap="1"
              lineHeight="1"
            >
              Hecho con{' '}
              <svg
                datasanity-icon="heart-filled"
                width="1em"
                height="1em"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 16C15.8 17.3235 12.5 20.5 12.5 20.5C12.5 20.5 9.2 17.3235 8 16C5.2 12.9118 4.5 11.7059 4.5 9.5C4.5 7.29412 6.1 5.5 8.5 5.5C10.5 5.5 11.7 6.82353 12.5 8.14706C13.3 6.82353 14.5 5.5 16.5 5.5C18.9 5.5 20.5 7.29412 20.5 9.5C20.5 11.7059 19.8 12.9118 17 16Z"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1.2"
                ></path>
              </svg>{' '}
              por Flo
            </Text>
          </Stack>
        </Box>
      </Stack>
    </ChakraContainer>
  )
}
