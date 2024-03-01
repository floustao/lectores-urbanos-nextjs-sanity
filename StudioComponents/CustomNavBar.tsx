import { Card, Flex, Inline, Stack, Text } from '@sanity/ui'
import { NavbarProps, useWorkspace } from 'sanity'

import UpdateCompaniesButton from './UpdateCompaniesButton'

export function CustomNavBar(props: NavbarProps) {
  const { dataset } = useWorkspace()

  return (
    <Card>
      <Stack>
        <Flex justify="space-between" align="center">
          <Card padding={4}>
            <Text size={1}>
              Using the <b>{dataset}</b> dataset
            </Text>
          </Card>

          <UpdateCompaniesButton />
        </Flex>
        {props.renderDefault(props)} {/* Render the default navbar */}
      </Stack>
    </Card>
  )
}
