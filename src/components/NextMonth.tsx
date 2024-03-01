import { Text } from '@chakra-ui/react'
import * as React from 'react'

export const NextMonth: React.FC = () => {
  const currentDate = new Date()

  // Get the month index (0-indexed)
  const currentMonthIndex = currentDate.getMonth()

  // Define an array of month names
  const monthNames = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ]

  // Get the name of the next month
  const nextMonthIndex = (currentMonthIndex + 1) % 12 // Wrap around to January if December
  const nextMonthName = monthNames[nextMonthIndex]

  return <>{nextMonthName}</>
}
