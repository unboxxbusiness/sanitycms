// src/sanity/schemas/blocks/programCardsBlock.ts
import {defineField, defineType} from 'sanity'
import { BookOpenCheck } from 'lucide-react'

export default defineType({
  name: 'programCardsBlock',
  title: 'Program Cards Block',
  type: 'object',
  icon: BookOpenCheck,
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
      name: 'programs',
      title: 'Programs',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'program'}]}],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      programs: 'programs'
    },
    prepare({title, programs}) {
        const programCount = programs?.length || 0;
      return {
        title: title || 'Program Cards Block',
        subtitle: `${programCount} program(s)`,
      }
    },
  },
})
