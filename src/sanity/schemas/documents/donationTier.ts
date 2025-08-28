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
      name: 'maxAmount',
      title: 'Maximum Donation Amount in this Tier (in ₹)',
      type: 'number',
      description: 'The upper limit for this donation tier. The next tier will start from this amount.',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'impactPerUnit',
      title: 'Students Impacted per Unit',
      type: 'number',
      description: 'How many students are impacted per unit of currency (defined below).',
      initialValue: 1,
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
        name: 'impactUnitAmount',
        title: 'Impact Unit Amount (in ₹)',
        type: 'number',
        description: 'The amount in rupees that equals one unit of impact (e.g., 10000).',
        initialValue: 10000,
        validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
        name: 'impactUnitLabel',
        title: 'Impact Unit Label',
        type: 'string',
        description: 'The label for the impact calculation (e.g., "students educated").',
        initialValue: 'students educated',
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
      subtitle: 'maxAmount',
    },
    prepare({title, subtitle}) {
        return {
            title,
            subtitle: `Up to ₹${(subtitle || 0).toLocaleString()}`
        }
    }
  },
})
