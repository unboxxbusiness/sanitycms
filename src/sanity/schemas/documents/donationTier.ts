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
      name: 'maxAmount',
      title: 'Maximum Donation Amount in this Tier (in ₹)',
      type: 'number',
      description: 'The upper limit for this donation tier. Tiers must be ordered from lowest to highest max amount. For example, Tier 1 could be 50,000, Tier 2 could be 250,000, and so on.',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'impactPerUnit',
      title: 'Students Impacted per Unit',
      type: 'number',
      description: 'The number of students impacted for the cost defined below. Example: If every ₹10,000 impacts 1 student, enter "1". If it impacts 5 students, enter "5".',
      initialValue: 1,
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
        name: 'impactUnitAmount',
        title: 'Impact Unit Amount (in ₹)',
        type: 'number',
        description: 'The cost in rupees for one unit of impact. Example: If every ₹10,000 impacts students, enter "10000". This is the denominator in the calculation.',
        initialValue: 10000,
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
