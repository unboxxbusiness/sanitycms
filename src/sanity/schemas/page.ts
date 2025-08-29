// src/sanity/schemas/page.ts
import {defineField, defineType} from 'sanity'
import { FileText } from 'lucide-react'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: FileText,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page Builder',
      type: 'array',
      of: [
        {type: 'heroBlock'},
        {type: 'programCardsBlock'},
        {type: 'impactMetricsBlock'},
        {type: 'testimonialsBlock'},
        {type: 'partnerLogoBlock'},
        {type: 'ctaBlock'},
        {type: 'textBlock'},
        {type: 'videoBlock'},
        {type: 'donationBlock'},
        {type: 'blogPostGridBlock'},
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Title for search engines and browser tabs.',
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          description: 'Description for search engines.',
        }),
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
    },
  },
})
