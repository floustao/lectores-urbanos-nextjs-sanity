import { updatePosts } from '../../backend/postUpdater'

export default async function handler(req, res) {
  try {
    await updatePosts() // Update posts in Sanity
    res.status(200).json({ message: 'Posts updated successfully' })
  } catch (error) {
    console.error('Error updating posts:', error)
    res.status(500).json({ error: 'Failed to update posts' })
  }
}
