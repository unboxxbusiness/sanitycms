import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'impact',
  title: 'Impact',
  type: 'document',
  fields: [
    defineField({
      name: 'stat',
      title: 'Statistic',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
            {title: 'Heart Handshake', value: 'HeartHandshake'},
            {title: 'Users', value: 'Users'},
            {title: 'Leaf', value: 'Leaf'},
            {title: 'Goal', value: 'Goal'},
        ]
      }
    }),
  ],
  preview: {
    select: {
      title: 'stat',
      subtitle: 'description',
    },
  },
})
