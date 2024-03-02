import { Flex, Link, Stack, Text } from '@chakra-ui/react'
import NextImage from 'next/image'
import NextLink from 'next/link'

import { Layout } from '~/components/Layout'

import PaperMix from './paper-mix.jpg'

export default function Custom404() {
  return (
    <Layout>
      <Flex
        align="center"
        justify="center"
        position="relative"
        height="full"
        overflow="hidden"
      >
        <NextImage src={PaperMix} alt="books" className="fourofour" />
        <Stack justify="center" align="center">
          <Text fontSize="5xl" fontWeight="bold" textAlign="center">
            404 <br /> Te hemos perdido!
          </Text>
          <Link href="/" as={NextLink} zIndex="2" fontSize="xl">
            Regresame al inicio
          </Link>
        </Stack>
      </Flex>
    </Layout>
  )
}
