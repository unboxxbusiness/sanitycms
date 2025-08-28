// src/sanity/schemas/blocks/ctaBlock.ts
import {defineField, defineType} from 'sanity'
import { Presentation } from 'lucide-react'

export default defineType({
  name: 'ctaBlock',
  title: 'CTA Block',
  type: 'object',
  icon: Presentation,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'supportingText',
      title: 'Supporting Text',
      type: 'text',
    }),
    defineField({
      name: 'buttons',
      title: 'Buttons',
      type: 'array',
      of: [{ 
        type: 'object',
        fields: [
          { name: 'text', type: 'string', title: 'Button Text' },
          { name: 'link', type: 'string', title: 'Button Link' }
        ]
      }],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({title}) {
      return {
        title: title || 'CTA Block',
        subtitle: 'Call to Action Block',
      }
    },
  },
})
