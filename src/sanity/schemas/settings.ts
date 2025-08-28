// src/sanity/schemas/settings.ts
import {defineField, defineType} from 'sanity'
import { Cog } from 'lucide-react'

export default defineType({
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  icon: Cog,
  groups: [
    { name: 'header', title: 'Header', default: true },
    { name: 'footer', title: 'Footer' },
  ],
  fields: [
    defineField({
      name: 'logo',
      title: 'Brand Logo',
      type: 'image',
      group: 'header',
    }),
    defineField({
      name: 'mainNavigation',
      title: 'Main Navigation',
      type: 'array',
      group: 'header',
      of: [{ 
        type: 'object',
        fields: [
          { name: 'text', type: 'string', title: 'Link Text' },
          { name: 'link', type: 'string', title: 'Link URL' }
        ]
      }],
    }),
    defineField({
      name: 'headerCta',
      title: 'Header CTA Button',
      type: 'object',
      group: 'header',
      fields: [
        { name: 'text', type: 'string', title: 'Button Text' },
        { name: 'link', type: 'string', title: 'Button Link' }
      ]
    }),
    defineField({
        name: 'footerDescription',
        title: 'Footer Description',
        type: 'text',
        group: 'footer',
    }),
    defineField({
      name: 'showMembershipCta',
      title: 'Show Membership CTA',
      type: 'boolean',
      initialValue: true,
      group: 'footer',
      description: 'If enabled, shows the membership popup button in the newsletter section.'
    }),
    defineField({
        name: 'membershipCtaText',
        title: 'Membership CTA Text',
        type: 'string',
        initialValue: 'Join for Free',
        group: 'footer',
        hidden: ({parent}) => !parent?.showMembershipCta,
    }),
    defineField({
        name: 'membershipDialogTitle',
        title: 'Membership Dialog Title',
        type: 'string',
        initialValue: 'Join Our Community',
        group: 'footer',
        hidden: ({parent}) => !parent?.showMembershipCta,
    }),
    defineField({
        name: 'membershipDialogDescription',
        title: 'Membership Dialog Description',
        type: 'text',
        initialValue: 'Become a member for free to get the latest updates, resources, and opportunities from AmulyaX India.',
        group: 'footer',
        hidden: ({parent}) => !parent?.showMembershipCta,
    }),
    defineField({
        name: 'newsletterHeadline',
        title: 'Newsletter Headline',
        type: 'string',
        group: 'footer',
    }),
    defineField({
        name: 'newsletterSupportingText',
        title: 'Newsletter Supporting Text',
        type: 'text',
        group: 'footer',
    }),
    defineField({
      name: 'footerProductLinks',
      title: 'Footer Product Links',
      type: 'array',
      group: 'footer',
      of: [{ 
        type: 'object',
        fields: [
          { name: 'text', type: 'string', title: 'Link Text' },
          { name: 'link', type: 'string', title: 'Link URL' }
        ]
      }],
    }),
    defineField({
      name: 'footerCompanyLinks',
      title: 'Footer Company Links',
      type: 'array',
      group: 'footer',
      of: [{ 
        type: 'object',
        fields: [
          { name: 'text', type: 'string', title: 'Link Text' },
          { name: 'link', type: 'string', title: 'Link URL' }
        ]
      }],
    }),
    defineField({
      name: 'footerLegalLinks',
      title: 'Footer Legal Links',
      type: 'array',
      group: 'footer',
      of: [{ 
        type: 'object',
        fields: [
          { name: 'text', type: 'string', title: 'Link Text' },
          { name: 'link', type: 'string', title: 'Link URL' }
        ]
      }],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      group: 'footer',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'platform',
            title: 'Platform',
            type: 'string',
            options: {
              list: [
                {title: 'GitHub', value: 'github'},
                {title: 'Twitter', value: 'twitter'},
                {title: 'LinkedIn', value: 'linkedin'},
              ]
            }
          }),
          defineField({
            name: 'url',
            title: 'URL',
            type: 'url'
          })
        ]
      }]
    }),
    defineField({
        name: 'copyrightText',
        title: 'Copyright Text',
        type: 'string',
        group: 'footer',
        initialValue: 'AmulyaX India. All rights reserved.'
    })
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings'
      }
    }
  }
})
