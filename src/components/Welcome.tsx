import { Link } from '@chakra-ui/next-js'
import { Heading, ListItem, Stack, Text, UnorderedList } from '@chakra-ui/react'

export default function Welcome() {
  return (
    <Stack mt="20">
      <Heading as="h1" size="md">
        Bienvenido en la biblioteca de lectores urbanos
      </Heading>
      <Text size="sm" fontWeight="bold">
        Proximas etapas:
      </Text>

      <UnorderedList>
        <ListItem>
          Agregar companias o libros en el{' '}
          <Link href="/studio">Sanity Studio</Link>.
        </ListItem>
        <ListItem>
          Explorar la documentacion de{' '}
          <Link href="https://www.sanity.io/docs" isExternal>
            Sanity
          </Link>{' '}
          que te permite mantener la applicacion sin codigo.
        </ListItem>
        <ListItem>
          Conocer y comunicar con{' '}
          <Link href="https://www.sanity.io/exchange/community" isExternal>
            la comunidad de Sanity
          </Link>
          .
        </ListItem>
      </UnorderedList>
    </Stack>
  )
}
