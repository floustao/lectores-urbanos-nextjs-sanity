import { Box, BoxProps } from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'

export interface CardProps extends PropsWithChildren {}

export const Card: React.FC<CardProps & BoxProps> = ({
  children,
  ...props
}) => {
  return (
    <Box
      p="4"
      borderRadius="lg"
      backgroundColor="white"
      shadow="base"
      {...props}
    >
      {children}
    </Box>
  )
}
