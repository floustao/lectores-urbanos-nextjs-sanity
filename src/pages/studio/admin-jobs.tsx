'use client'

import { Center, Heading, Stack, Text } from '@chakra-ui/react'
import React from 'react'

import UpdatePostsButton from '~/components/UpdatePostsButton'

export default function AdminJobs() {
  return (
    <Center p="4">
      <Stack>
        <Heading as="h1" textAlign="center">
          Admin jobs
        </Heading>

        <hr />

        <Text>
          1. Update the connections between companies and books (randomly)
        </Text>

        <UpdatePostsButton />
      </Stack>
    </Center>
  )
}
