import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import {
  Box,
  Container,
  Flex,
  HStack,
  IconButton,
  Stack,
} from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'

export const HamburgerNavigationMenu: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <Box>
      <HStack display={['none', 'none', 'flex', 'flex']} spacing="8">
        {children}
      </HStack>

      <IconButton
        aria-label="Open Menu"
        display={['flex', 'flex', 'none', 'none']}
        size="lg"
        icon={<HamburgerIcon />}
        onClick={() => setIsOpen(true)}
      />

      {isOpen && (
        <Flex
          w="100vw"
          h="100vh"
          position="fixed"
          top="0"
          left="0"
          zIndex="modal"
          bg="gray.50"
          flexDirection="column"
          overflowY="auto"
        >
          <Container maxW="5xl" p="8">
            <Flex justify="flex-end">
              <IconButton
                icon={<CloseIcon />}
                size="md"
                aria-label="Close menu"
                mr="4"
                mt="4"
                onClick={() => setIsOpen(false)}
              />
            </Flex>
            <Stack spacing="10" align="center">
              {children}
            </Stack>
          </Container>
        </Flex>
      )}
    </Box>
  )
}
