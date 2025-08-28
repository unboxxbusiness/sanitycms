// src/sanity/schemas/blocks/donationBlock.ts
import {defineField, defineType} from 'sanity'
import { HandCoins } from 'lucide-react'

export default defineType({
  name: 'donationBlock',
  title: 'Donation Block',
  type: 'object',
  icon: HandCoins,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
    }),
    defineField({
      name: 'minAmount',
      title: 'Minimum Donation Amount (in ₹)',
      type: 'number',
      initialValue: 1000,
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'maxAmount',
      title: 'Maximum Donation Amount (in ₹)',
      type: 'number',
      initialValue: 1000000,
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'donationTiers',
      title: 'Donation Tiers',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'donationTier'}]}],
      description: 'Tiers should be ordered from the lowest max amount to the highest.',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'primaryCtaText',
      title: 'Primary CTA Text',
      type: 'string',
      initialValue: 'Donate Now',
    }),
    defineField({
      name: 'primaryCtaLink',
      title: 'Primary CTA Link',
      type: 'string',
      description: 'The link for the donation page. The selected amount will be added as a query parameter (e.g., /donate?amount=50000).'
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      tiers: 'donationTiers',
    },
    prepare({title, tiers}) {
      const tierCount = tiers?.length || 0
      return {
        title: title || 'Donation Block',
        subtitle: `${tierCount} tier(s)`,
      }
    },
  },
})
