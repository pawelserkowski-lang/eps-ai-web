import { type SchemaTypeDefinition } from 'sanity'
import { projectType } from './schema/project'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projectType],
}
