// src/sanity/schemas/blocks/heroBlock.ts
import {defineField, defineType} from 'sanity'
import { Image, Megaphone } from 'lucide-react'

export default defineType({
  name: 'heroBlock',
  title: 'Hero Block',
  type: 'object',
  icon: Image,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'announcement', title: 'Announcement Banner', icon: Megaphone },
  ],
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'text',
      group: 'content',
    }),
    defineField({
      name: 'image',
      title: 'Background Image',
      type: 'image',
      group: 'content',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'imageAlt',
      title: 'Image Alt Text',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'buttons',
      title: 'Buttons',
      type: 'array',
      group: 'content',
      of: [{ 
        type: 'object',
        fields: [
          { name: 'text', type: 'string', title: 'Button Text' },
          { name: 'link', type: 'string', title: 'Button Link' }
        ]
      }],
    }),
    defineField({
        name: 'showAnnouncementBanner',
        title: 'Show Announcement Banner',
        type: 'boolean',
        initialValue: false,
        group: 'announcement',
    }),
    defineField({
        name: 'announcementText',
        title: 'Announcement Text',
        type: 'string',
        group: 'announcement',
        hidden: ({parent}) => !parent?.showAnnouncementBanner,
    }),
    defineField({
        name: 'announcementLink',
        title: 'Announcement Link',
        type: 'string',
        group: 'announcement',
        hidden: ({parent}) => !parent?.showAnnouncementBanner,
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
