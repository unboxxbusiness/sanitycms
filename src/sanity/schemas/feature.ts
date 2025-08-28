import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'feature',
  title: 'Feature',
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
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
            {title: 'Map Pin', value: 'MapPin'},
            {title: 'Languages', value: 'Languages'},
            {title: 'Indian Rupee', value: 'IndianRupee'},
        ]
      }
    }),
    defineField({
      name: 'dataAiHint',
      title: 'AI Hint',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'icon',
    },
  },
})
