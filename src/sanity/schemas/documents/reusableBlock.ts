// src/sanity/schemas/documents/reusableBlock.ts
import {defineField, defineType} from 'sanity'
import { Layers } from 'lucide-react'

export default defineType({
  name: 'reusableBlock',
  title: 'Reusable Block',
  type: 'document',
  icon: Layers,
  fields: [
    defineField({
        name: 'name',
        title: 'Block Name',
        type: 'string',
        description: 'A descriptive name for internal use to identify this block.',
        validation: (Rule) => Rule.required(),
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
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'}
          ],
          lists: [{title: 'Bullet', value: 'bullet'}, {title: 'Numbered', value: 'number'}],
          marks: {
            decorators: [{title: 'Strong', value: 'strong'}, {title: 'Emphasis', value: 'em'}, {title: 'Code', value: 'code'}],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'URL',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url'
                  }
                ]
              }
            ]
          }
        },
        {
          type: 'image',
          options: {hotspot: true}
        },
        {
          type: 'ctaBlock'
        }
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
    prepare({title}) {
        return {
            title: title,
            subtitle: 'Reusable Content Block'
        }
    }
  },
})
