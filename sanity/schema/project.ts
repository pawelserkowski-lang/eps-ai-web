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
      validation: (Rule) => Rule.required(),
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
      title: 'Kolor Gradientu (np. from-emerald-500 to-black)',
      type: 'string',
    }),
    defineField({
      name: 'iconType',
      title: 'Ikona',
      type: 'string',
      options: {
        list: [
          { title: 'Błyskawica', value: 'zap' },
          { title: 'Baza danych', value: 'database' },
          { title: 'Mózg', value: 'brain' },
          { title: 'Terminal', value: 'terminal' }
        ],
      },
      initialValue: 'brain'
    }),
    defineField({
      name: 'image',
      title: 'Obraz Projektu',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Tekst alternatywny',
        })
      ]
    }),
  ],
})
