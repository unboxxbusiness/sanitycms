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
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
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
