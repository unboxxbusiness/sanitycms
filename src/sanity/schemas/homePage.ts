// src/sanity/schemas/homePage.ts
import {defineField, defineType} from 'sanity'
import { Home } from 'lucide-react'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: Home,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Home Page',
      group: 'content',
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page Builder',
      type: 'array',
      group: 'content',
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
        group: 'seo',
        fields: [
          defineField({
            name: 'metaTitle',
            title: 'Meta Title',
            type: 'string',
            description: 'Title for search engines and browser tabs. Overrides the site title.',
          }),
          defineField({
            name: 'metaDescription',
            title: 'Meta Description',
            type: 'text',
            description: 'Description for search engines. Overrides the default site description.',
          }),
        ]
      })
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})

    