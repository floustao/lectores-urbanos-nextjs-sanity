'use client'

import { Button, useToast } from '@chakra-ui/react'
import React from 'react'

export default function UpdatePostsButton() {
  const [isLoading, setIsLoading] = React.useState(false)
  const toast = useToast()

  const handleUpdatePosts = async () => {
    try {
      setIsLoading(true)
      // Send a request to your backend API route or function to trigger the update process
      const response = await fetch('/api/update-posts', { method: 'POST' })
      if (response.ok) {
        toast({
          status: 'success',
          description: `Successfully updated connections between books & companies`,
        })
      } else {
        toast({
          status: 'error',
          description: `Failed to initiate posts update: ${response.statusText}`,
        })
      }
    } catch (error) {
      toast({
        status: 'error',
        description: `Error initiating posts update:, ${error}`,
      })
      console.error('Error initiating posts update:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handleUpdatePosts} isLoading={isLoading}>
      Update Posts
    </Button>
  )
}
