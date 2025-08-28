// src/sanity/schemas/documents/donationTier.ts
import {defineField, defineType} from 'sanity'
import { Award } from 'lucide-react'

export default defineType({
  name: 'donationTier',
  title: 'Donation Tier',
  type: 'document',
  icon: Award,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The name of the donation tier (e.g., "Scholar", "Champion").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'amount',
      title: 'Donation Amount (in ₹)',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'description',
      title: 'Impact Description',
      type: 'text',
      description: 'Describe what this donation will accomplish (e.g., "Funds one year of a student\'s education").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
            {title: 'Heart Handshake', value: 'HeartHandshake'},
            {title: 'Users', value: 'Users'},
            {title: 'Leaf', value: 'Leaf'},
            {title: 'Goal', value: 'Goal'},
            {title: 'Award', value: 'Award'},
            {title: 'Book Open', value: 'BookOpenCheck'},
            {title: 'Graduation Cap', value: 'GraduationCap'},
        ]
      },
      initialValue: 'Award'
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
})
