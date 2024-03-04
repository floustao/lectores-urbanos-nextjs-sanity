import { writeToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'

// Closure mechanism that ensures step is incremented each time we trigger updateCompanyBooks
const startingIndex = (() => {
  let step = 0;
  return () => step++;
})();


export async function updateCompanyBooks() {
  const client = getClient({ token: writeToken })
  try {
    const allNonDraftsCompanies = await client.fetch('*[_type == "company" && !(_id in path("drafts.**")) && !(_originalId in path("drafts.**"))]');
    const allNonDraftBooks = await client.fetch('*[_type == "book" && !(_id in path("drafts.**")) && !(_originalId in path("drafts.**"))]')
    const step = startingIndex();

    for (let index = 0; index < allNonDraftsCompanies.length; index++) {
      // Getting next book in the list of books
      const bookIndex = (index + step) % allNonDraftBooks.length;
      const book = {_type: 'reference', _ref: allNonDraftBooks[bookIndex]._id};

      // Associating company to next book in the list
      await client.patch(allNonDraftsCompanies[index]._id)
        .set({ book })
        .commit();
    }
  } catch (error) {
    console.error('Error updating companies:', error);
    throw error;
  }
}