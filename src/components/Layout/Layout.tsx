'use client'
import { Link } from '@chakra-ui/next-js'
import { Box, Center, Container, HStack, Stack, Text } from '@chakra-ui/react'
import NextImage from 'next/image'
import { PropsWithChildren } from 'react'

import { HamburgerNavigationMenu } from '~/imports/chakra/components/HamburgerNavigationMenu'
import { FacebookIcon, InstagramIcon, LoveIcon } from '~/imports/chakra/icons'

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Container maxW="container.xl">
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
        p="8"
      >
        <HStack justify="space-between" as="header" gridArea="header">
          <Link className="header__title" href="/">
            <NextImage
              src="https://lectoresurbanos.com/assets/images/logo.png"
              alt="go to homepage"
              width={150}
              height={150}
              priority
            />
          </Link>

          <HamburgerNavigationMenu>
            <Link href="/" w="full" textAlign="center">
              Inicio
            </Link>
            <Link href="/studio/structure" w="full" textAlign="center">
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
              <Text>Juntos convertiremos a Mexico</Text>
              <Text fontWeight="semibold">
                en el Primer Pais Biblioteco del Mundo
              </Text>
            </Stack>

            <Center>
              <Stack direction="row" spacing="5">
                <Link
                  isExternal
                  href="https://www.facebook.com/lectoresurbanos"
                >
                  <FacebookIcon
                    boxSize="10"
                    color="primary.500"
                    aria-label="facebook"
                  />
                </Link>

                <Link
                  isExternal
                  href="https://www.instagram.com/lectores.urbanos/"
                >
                  <InstagramIcon
                    boxSize="10"
                    color="primary.500"
                    aria-label="instagram"
                  />
                </Link>
              </Stack>
            </Center>

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
