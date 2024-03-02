import { readToken, writeToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'


export async function updateCompanyBooks() {
  const client = getClient({ token: writeToken })
  try {
    const nonDraftsCompanies = await client.fetch('*[_type == "company" && !(_id in path("drafts.**")) && !(_originalId in path("drafts.**"))]');
    console.log({nonDraftsCompanies})

    for (const company of nonDraftsCompanies) {
      const newBookRef = await selectRandomBook();

      // Update the company in Sanity with the new book reference
      await client.patch(company._id)
        .set({ book: newBookRef })
        .commit();
    }

    console.log('Companies updated successfully');
  } catch (error) {
    console.error('Error updating companies:', error);
    throw error;
  }
}

async function selectRandomBook() {
  const client = getClient({ token: readToken })
  const books = await client.fetch('*[_type == "book"]');
  const randomBookIndex = Math.floor(Math.random() * books.length);

  return { _type: 'reference', _ref: books[randomBookIndex]._id };
}