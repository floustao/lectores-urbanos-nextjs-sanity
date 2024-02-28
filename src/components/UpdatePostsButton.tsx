export default function UpdatePostsButton() {
  const handleUpdatePosts = async () => {
    try {
      // Send a request to your backend API route or function to trigger the update process
      const response = await fetch('/api/update-posts', { method: 'POST' })
      if (response.ok) {
        console.log('Posts update initiated successfully')
      } else {
        console.error('Failed to initiate posts update:', response.statusText)
      }
    } catch (error) {
      console.error('Error initiating posts update:', error)
    }
  }

  return <button onClick={handleUpdatePosts}>Update Posts</button>
}
