// src/sanity/schemas/settings.ts
import {defineField, defineType} from 'sanity'
import { Cog } from 'lucide-react'

export default defineType({
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  icon: Cog,
  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'header', title: 'Header' },
    { name: 'footer', title: 'Footer' },
    { name: 'blog', title: 'Blog' },
    { name: 'seo', title: 'Default SEO' },
  ],
  fields: [
    defineField({
        name: 'siteTitle',
        title: 'Site Title',
        type: 'string',
        group: 'general',
        description: 'The overall title of the website, used in browser tabs and search results.'
    }),
    defineField({
      name: 'logoLight',
      title: 'Logo (Light Mode)',
      type: 'image',
      group: 'general',
      description: 'Upload the logo to be displayed on light backgrounds.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'logoDark',
      title: 'Logo (Dark Mode)',
      type: 'image',
      group: 'general',
      description: 'Upload the logo to be displayed on dark backgrounds. If not provided, the light mode logo will be used.',
      options: {
        hotspot: true,
      },
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
    }),
    defineField({
        name: 'blogPageHeading',
        title: 'Blog Page Heading',
        type: 'string',
        group: 'blog',
        initialValue: 'Our Blog'
    }),
    defineField({
        name: 'blogPageSubheading',
        title: 'Blog Page Subheading',
        type: 'text',
        group: 'blog',
        initialValue: 'Latest news, insights, and stories from our mission to empower students across India.'
    }),
    defineField({
      name: 'defaultMetaTitle',
      title: 'Default Meta Title',
      type: 'string',
      group: 'seo',
      description: 'The default title for pages that do not have a specific meta title.'
    }),
    defineField({
      name: 'defaultMetaDescription',
      title: 'Default Meta Description',
      type: 'text',
      group: 'seo',
      description: 'The default description for pages that do not have a specific meta description.'
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings'
      }
    }
  }
})
