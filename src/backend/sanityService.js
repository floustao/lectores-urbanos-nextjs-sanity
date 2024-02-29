import { readToken, writeToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'


export async function updatePostBooks() {
  const client = getClient({ token: writeToken })
  try {
    const posts = await client.fetch('*[_type == "post"]');

    for (const post of posts) {
      const newBookRef = await selectRandomBook();

      // Update the post in Sanity with the new book reference
      await client.patch(post._id)
        .set({ book: newBookRef })
        .commit();
    }

    console.log('Posts updated successfully');
  } catch (error) {
    console.error('Error updating posts:', error);
    throw error;
  }
}

async function selectRandomBook() {
  const client = getClient({ token: readToken })
  const books = await client.fetch('*[_type == "book"]');
  const randomBookIndex = Math.floor(Math.random() * books.length);
  console.log({randomBookIndex})
  return { _type: 'reference', _ref: books[randomBookIndex]._id };
}