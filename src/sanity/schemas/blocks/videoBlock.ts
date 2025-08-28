// src/sanity/schemas/blocks/videoBlock.ts
import {defineField, defineType} from 'sanity'
import { Youtube } from 'lucide-react'

export default defineType({
  name: 'videoBlock',
  title: 'Video Block',
  type: 'object',
  icon: Youtube,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'cta', title: 'Call to Action' },
  ],
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      group: 'content',
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube Video URL',
      type: 'url',
      group: 'content',
      description: 'Paste the full URL of the YouTube video (e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ)',
      validation: (Rule) => Rule.required().uri({
        scheme: ['http', 'https']
      }),
    }),
    defineField({
        name: 'showCtaButton',
        title: 'Show CTA Button',
        type: 'boolean',
        initialValue: false,
        group: 'cta',
    }),
    defineField({
        name: 'ctaText',
        title: 'CTA Button Text',
        type: 'string',
        group: 'cta',
        hidden: ({parent}) => !parent?.showCtaButton,
    }),
    defineField({
        name: 'ctaLink',
        title: 'CTA Button Link',
        type: 'string',
        group: 'cta',
        hidden: ({parent}) => !parent?.showCtaButton,
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
