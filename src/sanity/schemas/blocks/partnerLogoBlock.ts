// src/sanity/schemas/blocks/partnerLogoBlock.ts
import {defineField, defineType} from 'sanity'
import { Handshake } from 'lucide-react'

export default defineType({
  name: 'partnerLogoBlock',
  title: 'Partner Logo Block',
  type: 'object',
  icon: Handshake,
  fields: [
    defineField({
        name: 'heading',
        title: 'Heading',
        type: 'string',
        initialValue: 'Our Partners & Supporters'
    }),
    defineField({
      name: 'partners',
      title: 'Partners',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'partner'}]}],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      partners: 'partners'
    },
    prepare({title, partners}) {
        const partnerCount = partners?.length || 0;
      return {
        title: title || 'Partner Logo Block',
        subtitle: `${partnerCount} partner(s)`,
      }
    },
  },
})
