import { updateCompanies } from '../../backend/companyUpdater'

export default async function handler(req, res) {
  try {
    await updateCompanies() // Update companies in Sanity
    res.status(200).json({ message: 'Companies updated successfully' })
  } catch (error) {
    console.error('Error updating companies:', error)
    res.status(500).json({ error: 'Failed to update companies' })
  }
}
