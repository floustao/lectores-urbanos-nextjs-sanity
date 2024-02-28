import { updatePostBooks } from './sanityService';

export async function updatePosts() {
  // Fetch and update post data in Sanity
  await updatePostBooks();
}