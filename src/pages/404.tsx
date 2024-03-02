import { Link } from '@chakra-ui/next-js'
import { Flex, Stack, Text } from '@chakra-ui/react'
import NextImage from 'next/image'

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
        <NextImage
          src={PaperMix}
          alt="books"
          loading="lazy"
          style={{
            opacity: 0.1,
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
        />
        <Stack justify="center" align="center">
          <Text fontSize="5xl" fontWeight="bold" textAlign="center">
            404 <br /> Te hemos perdido!
          </Text>
          <Link href="/" zIndex="2" fontSize="xl">
            Regresa al inicio
          </Link>
        </Stack>
      </Flex>
    </Layout>
  )
}
