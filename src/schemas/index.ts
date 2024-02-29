import { SchemaTypeDefinition } from 'sanity'

import blockContent from './blockContent'
import book from './book'
import company from './company'

export const schemaTypes = [company, book, blockContent]
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [company, book, blockContent],
}
