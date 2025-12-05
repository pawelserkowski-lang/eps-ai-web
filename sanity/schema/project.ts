import { defineField, defineType } from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Projekty (Artifacts)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nazwa Projektu',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Podtytuł',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Opis',
      type: 'text',
    }),
    defineField({
      name: 'repoLink',
      title: 'Link do GitHuba',
      type: 'url',
    }),
    defineField({
      name: 'tags',
      title: 'Tagi',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'color',
      title: 'Kolor Gradientu',
      type: 'string',
    }),
  ],
})