import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'about',
  title: 'About Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
    }),
    defineField({
        name: 'imageAlt',
        title: 'Image Alt Text',
        type: 'string',
    })
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
})
