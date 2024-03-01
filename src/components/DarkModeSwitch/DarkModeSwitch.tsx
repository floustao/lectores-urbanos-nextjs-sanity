import { Switch, useColorMode } from '@chakra-ui/react'
import * as React from 'react'

export const DarkModeSwitch: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  return (
    <Switch
      aria-label="toggle color mode"
      isChecked={isDark}
      onChange={toggleColorMode}
    />
  )
}
