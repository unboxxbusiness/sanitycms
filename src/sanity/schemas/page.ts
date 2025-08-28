// src/sanity/schemas/page.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
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
        { type: 'reference', to: [{type: 'about'}] },
        { type: 'reference', to: [{type: 'cta'}] },
        { 
          title: 'Features',
          type: 'reference', 
          to: [{type: 'featureSection'}] 
        },
        { 
          title: 'Impact',
          type: 'reference', 
          to: [{type: 'impactSection'}] 
        },
        { 
          title: 'Partners',
          type: 'reference', 
          to: [{type: 'partnerSection'}] 
        },
        { 
          title: 'Testimonials',
          type: 'reference', 
          to: [{type: 'testimonialSection'}] 
        },
        { type: 'richTextBlock' },
        { type: 'contactForm' },
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
