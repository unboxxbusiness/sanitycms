// src/sanity/schemas/documents/partner.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'partner',
  title: 'Partner',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'website',
        title: 'Website URL',
        type: 'url',
    })
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo',
    },
  },
})
