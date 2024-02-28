import { writeToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'


export async function updatePostBooks() {
  const client = getClient({ token: writeToken })
  try {
    // Fetch all posts from Sanity
    const posts = await client.fetch('*[_type == "post"]');

    // Iterate over each post
    for (const post of posts) {
      // Implement your logic to update the associated book reference for each post
      // For example, select a new book randomly
      const newBookRef = await selectRandomBook();

      // Update the post in Sanity with the new book reference
      await client.patch(post._id)
        .set({ book: newBookRef }) // Update the book reference
        .commit();
    }

    console.log('Posts updated successfully');
  } catch (error) {
    console.error('Error updating posts:', error);
    throw error; // Throw the error to handle it in the calling function
  }
}

// Function to select a random book reference
async function selectRandomBook() {
  // Implement logic to select a random book reference
  // For example:
  const client = getClient({ token: writeToken })
  const books = await client.fetch('*[_type == "book"]');
  const randomBookIndex = Math.floor(Math.random() * books.length);
  console.log({randomBookIndex})
  return { _type: 'reference', _ref: books[randomBookIndex]._id };
}