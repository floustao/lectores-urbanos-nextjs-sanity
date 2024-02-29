import { updateCompanyBooks } from './sanityService';

export async function updateCompanies() {
  // Fetch and update company data in Sanity
  await updateCompanyBooks();
}