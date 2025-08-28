// src/sanity/schemas/homePage.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Home Page',
      readOnly: true,
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
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
