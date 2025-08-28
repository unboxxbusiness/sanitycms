// src/sanity/schemas/blocks/heroBlock.ts
import {defineField, defineType} from 'sanity'
import { Image } from 'lucide-react'

export default defineType({
  name: 'heroBlock',
  title: 'Hero Block',
  type: 'object',
  icon: Image,
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'imageAlt',
      title: 'Image Alt Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      media: 'image',
    },
    prepare({title, media}) {
      return {
        title: title || 'Hero Block',
        subtitle: 'Hero/Banner Block',
        media: media,
      }
    },
  },
})
