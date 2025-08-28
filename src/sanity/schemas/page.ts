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
        { name: 'about', title: 'About Section', type: 'reference', to: [{type: 'about'}] },
        { name: 'cta', title: 'CTA Section', type: 'reference', to: [{type: 'cta'}] },
        { name: 'featureSection', title: 'Features Section', type: 'reference', to: [{type: 'featureSection'}] },
        { name: 'impactSection', title: 'Impact Section', type: 'reference', to: [{type: 'impactSection'}] },
        { name: 'partnerSection', title: 'Partners Section', type: 'reference', to: [{type: 'partnerSection'}] },
        { name: 'testimonialSection', title: 'Testimonials Section', type: 'reference', to: [{type: 'testimonialSection'}] },
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
