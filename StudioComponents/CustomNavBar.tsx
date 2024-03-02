import { Link } from '@chakra-ui/react'
import { Card, Flex, Stack, Text } from '@sanity/ui'
import NextLink from 'next/link'
import { NavbarProps, useWorkspace } from 'sanity'

import UpdateCompaniesButton from './UpdateCompaniesButton'

export function CustomNavBar(props: NavbarProps) {
  const { dataset } = useWorkspace()

  return (
    <Card padding={2}>
      <Stack>
        <Card tone="critical" padding={4}>
          <Flex justify="space-between" align="center">
            <Text size={2}>
              Using the <b>{dataset}</b> dataset
            </Text>

            <Link as={NextLink} href="/" color="white">
              Go back to website
            </Link>

            <UpdateCompaniesButton />
          </Flex>
        </Card>
        {props.renderDefault(props)} {/* Render the default navbar */}
      </Stack>
    </Card>
  )
}
