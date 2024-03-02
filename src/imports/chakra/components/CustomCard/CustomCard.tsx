import { Box, BoxProps } from '@chakra-ui/react'
import React from 'react'

export const CustomCard = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ children, ...props }, ref) => {
    return (
      <Box
        p="4"
        borderRadius="lg"
        backgroundColor="white"
        shadow="base"
        {...props}
        ref={ref}
      >
        {children}
      </Box>
    )
  },
)

CustomCard.displayName = 'CustomCard'
