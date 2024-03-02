import { Center, CenterProps } from '@chakra-ui/react'
import * as React from 'react'

import { ImageFallbackIcon } from './components/ImageFallbackIcon'

interface ImageFallbackProps extends CenterProps {
  aspectRatio?: string
}

export const ImageFallback: React.FC<ImageFallbackProps> = ({
  aspectRatio,
  ...props
}) => {
  return (
    <Center bg="gray.100" sx={{ aspectRatio }} {...props}>
      <ImageFallbackIcon color="gray.400" boxSize={6} />
    </Center>
  )
}
