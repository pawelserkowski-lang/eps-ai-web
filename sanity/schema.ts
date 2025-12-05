import { type SchemaTypeDefinition } from 'sanity'

const project = {
  name: 'project',
  title: 'Projekty (Artifacts)',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Nazwa Projektu',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'Podtytuł',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Opis',
      type: 'text',
    },
    {
      name: 'repoLink',
      title: 'Link do GitHuba',
      type: 'url',
    },
    {
      name: 'tags',
      title: 'Tagi',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'color',
      title: 'Kolor Gradientu (np. from-emerald-500 to-black)',
      type: 'string',
    }
  ],
}

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project],
}
