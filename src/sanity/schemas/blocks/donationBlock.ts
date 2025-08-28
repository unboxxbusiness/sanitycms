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
      name: 'fundingGoal',
      title: 'Funding Goal (in ₹)',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'currentAmountRaised',
      title: 'Current Amount Raised (in ₹)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'donationTiers',
      title: 'Donation Tiers',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'donationTier'}]}],
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
    }),
    defineField({
      name: 'secondaryCtaText',
      title: 'Secondary CTA Text',
      type: 'string',
      initialValue: 'Sponsor a Student',
    }),
    defineField({
      name: 'secondaryCtaLink',
      title: 'Secondary CTA Link',
      type: 'string',
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
