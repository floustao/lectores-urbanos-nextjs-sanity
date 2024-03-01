'use client'

import { Box, Container, HStack, Link, Stack, Text } from '@chakra-ui/react'
import NextImage from 'next/image'
import NextLink from 'next/link'
import { PropsWithChildren } from 'react'

import { HamburgerNavigationMenu } from '~/imports/chakra/components/HamburgerNavigationMenu'

import { BookStack, LoveIcon } from './assets'

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Container maxW="container.xl" p="8">
      <Stack
        m="0 auto"
        spacing="4"
        display="grid"
        gridTemplateAreas={`
        "header"
        "body"
        "footer"
        `}
        gridTemplateRows="auto 1fr auto"
        height="100vh"
      >
        <HStack justify="space-between" as="header" gridArea="header">
          <Link className="header__title" href="/" as={NextLink}>
            <NextImage
              src="https://lectoresurbanos.com/assets/images/logo.png"
              alt="go to homepage"
              width="150"
              height="150"
            />
          </Link>

          <HamburgerNavigationMenu>
            <Link href="/" as={NextLink} w="full" textAlign="center">
              Home
            </Link>
            <Link
              href="/studio/structure"
              as={NextLink}
              w="full"
              textAlign="center"
            >
              Studio
            </Link>
          </HamburgerNavigationMenu>
        </HStack>
        <Box as="main" gridArea="body">
          {children}
        </Box>
        <Box as="footer" gridArea="footer">
          <Stack spacing="8" justify="center" align="center">
            <Stack spacing="0" justify="center" align="center">
              <NextImage src={BookStack} alt="books" width="400" />
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
              Hecho con
              <LoveIcon boxSize="3" m="0" p="0" color="red.500" />
              por Flo
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Container>
  )
}
