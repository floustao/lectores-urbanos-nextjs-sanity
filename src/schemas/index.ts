import { SchemaTypeDefinition } from 'sanity'

import blockContent from './blockContent'
import book from './book'
import post from './post'

export const schemaTypes = [post, book, blockContent]
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, book, blockContent],
}
