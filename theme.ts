import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    primary: {
      50: 'blue.50',
      100: 'blue.100',
      200: 'blue.200',
      300: 'blue.300',
      400: 'blue.400',
      500: 'blue.500',
      600: 'blue.600',
      700: 'blue.700',
      800: 'blue.800',
      900: 'blue.900',
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
        color: '#6c5dd3',
      },
    },
  },
})
