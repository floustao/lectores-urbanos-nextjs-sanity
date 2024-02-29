'use client'

import { Button, useToast } from '@chakra-ui/react'
import React from 'react'

export default function UpdateCompaniesButton() {
  const [isLoading, setIsLoading] = React.useState(false)
  const toast = useToast()

  const handleupdateCompanies = async () => {
    try {
      setIsLoading(true)
      // Send a request to your backend API route or function to trigger the update process
      const response = await fetch('/api/update-companies', { method: 'POST' })
      if (response.ok) {
        toast({
          status: 'success',
          description: `Successfully updated connections between books & companies`,
        })
      } else {
        toast({
          status: 'error',
          description: `Failed to initiate companies update: ${response.statusText}`,
        })
      }
    } catch (error) {
      toast({
        status: 'error',
        description: `Error initiating companies update:, ${error}`,
      })
      console.error('Error initiating companies update:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handleupdateCompanies} isLoading={isLoading}>
      Update Companies
    </Button>
  )
}
