// src/sanity/schemas/blocks/testimonialsBlock.ts
import {defineField, defineType} from 'sanity'
import { MessageSquare } from 'lucide-react'

export default defineType({
  name: 'testimonialsBlock',
  title: 'Testimonials Block',
  type: 'object',
  icon: MessageSquare,
  fields: [
    defineField({
        name: 'heading',
        title: 'Heading',
        type: 'string',
        initialValue: 'Loved by Teams Across India'
    }),
    defineField({
        name: 'subheading',
        title: 'Subheading',
        type: 'text',
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'testimonial'}]}],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      testimonials: 'testimonials'
    },
    prepare({title, testimonials}) {
        const testimonialCount = testimonials?.length || 0;
      return {
        title: title || 'Testimonials Block',
        subtitle: `${testimonialCount} testimonial(s)`,
      }
    },
  },
})
