// src/sanity/schemas/richTextBlock.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'richTextBlock',
  title: 'Rich Text Block',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title (Optional)',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'}
          ],
          marks: {
            decorators: [{title: 'Strong', value: 'strong'}, {title: 'Emphasis', value: 'em'}],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'URL',
                fields: [{name: 'href', type: 'url', title: 'URL'}]
              }
            ]
          }
        }
      ]
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: title || 'Rich Text Block',
      }
    }
  }
})
