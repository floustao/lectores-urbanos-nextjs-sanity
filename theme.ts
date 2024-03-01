import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    primary: {
      500: '#6c5dd3',
    },
  },
  fonts: {
    heading: 'var(--font-rubik)',
    body: 'var(--font-rubik)',
  },
  components: {
    Link: {
      baseStyle: {
        fontWeight: 'semibold',
        color: 'primary.500',
      },
    },
  },
})
