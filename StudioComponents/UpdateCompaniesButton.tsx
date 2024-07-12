import { Button, useToast } from '@chakra-ui/react'
import React from 'react'

export default function UpdateCompaniesButton() {
  const [isLoading, setIsLoading] = React.useState(false)
  const toast = useToast()

  const handleupdateCompanies = async () => {
    try {
      setIsLoading(true)
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
    <Button
      isLoading={isLoading}
      size="sm"
      onClick={() => {
        if (
          window.confirm(
            'Are you sure you want to shuffle the connections between all companies and books?',
          )
        ) {
          handleupdateCompanies()
        }
      }}
    >
      Shuffle all books within companies
    </Button>
  )
}
