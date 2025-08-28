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
      description: 'The name for this donation level (e.g., "Bronze Supporter", "Scholar", "Champion"). This is shown on the donation slider.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'amount',
      title: 'Donation Amount (in ₹)',
      type: 'number',
      description: 'The specific donation amount for this tier. Tiers must be created in order from lowest to highest amount.',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'impact',
      title: 'Students Impacted',
      type: 'number',
      description: 'The number of students directly impacted by the donation amount above.',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
        name: 'impactUnitLabel',
        title: 'Impact Unit Label',
        type: 'string',
        description: 'The descriptive text that appears after the calculated number (e.g., "students educated", "students provided with textbooks").',
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
      amount: 'amount',
      impact: 'impact',
    },
    prepare({title, amount, impact}) {
        return {
            title,
            subtitle: `₹${(amount || 0).toLocaleString()} impacts ${impact || 0} student(s)`
        }
    }
  },
})
