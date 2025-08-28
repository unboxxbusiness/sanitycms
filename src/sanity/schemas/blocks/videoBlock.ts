// src/sanity/schemas/blocks/videoBlock.ts
import {defineField, defineType} from 'sanity'
import { Youtube } from 'lucide-react'

export default defineType({
  name: 'videoBlock',
  title: 'Video Block',
  type: 'object',
  icon: Youtube,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube Video URL',
      type: 'url',
      description: 'Paste the full URL of the YouTube video (e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ)',
      validation: (Rule) => Rule.required().uri({
        scheme: ['http', 'https']
      }),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'youtubeUrl',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Video Block',
        subtitle: subtitle || 'No URL provided',
      }
    },
  },
})
