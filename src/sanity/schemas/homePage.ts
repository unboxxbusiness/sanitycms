import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {name: 'headline', type: 'string', title: 'Headline'},
        {name: 'description', type: 'text', title: 'Description'},
        {name: 'callToAction', type: 'string', title: 'Call to Action'},
        {name: 'image', type: 'image', title: 'Image'},
        {name: 'imageAlt', type: 'string', title: 'Image Alt Text'},
      ],
    }),
    defineField({
      name: 'features',
      title: 'Features Section',
      type: 'array',
      of: [{type: 'reference', to: {type: 'feature'}}],
    }),
    defineField({
        name: 'testimonials',
        title: 'Testimonials Section',
        type: 'array',
        of: [{type: 'reference', to: {type: 'testimonial'}}],
      }),
  ],
  preview: {
    select: {
      title: 'hero.headline',
    },
  },
})
