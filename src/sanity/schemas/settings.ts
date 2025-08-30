// src/sanity/schemas/settings.ts
import {defineField, defineType} from 'sanity'
import { Cog } from 'lucide-react'

const navLink = defineType({
    name: 'navLink',
    title: 'Navigation Link',
    type: 'object',
    fields: [
        defineField({ name: 'text', type: 'string', title: 'Link Text', validation: Rule => Rule.required() }),
        defineField({ name: 'link', type: 'string', title: 'Link URL', validation: Rule => Rule.required() })
    ]
})

const navItem = defineType({
    name: 'navItem',
    title: 'Navigation Item',
    type: 'object',
    fields: [
        defineField({ name: 'text', type: 'string', title: 'Link Text', validation: Rule => Rule.required() }),
        defineField({ 
            name: 'link', 
            type: 'string', 
            title: 'Link URL',
            description: 'Leave blank if this is a dropdown menu for sub-items.'
        }),
        defineField({
            name: 'children',
            title: 'Sub-menu Items',
            type: 'array',
            of: [{ type: 'navLink' }],
            hidden: ({parent}) => !!parent.link,
            description: 'Add items here to create a dropdown menu.'
        })
    ],
    preview: {
        select: {
            title: 'text',
            children: 'children'
        },
        prepare({title, children}) {
            const hasChildren = children && children.length > 0;
            return {
                title: title,
                subtitle: hasChildren ? `${children.length} sub-item(s)` : 'Simple Link'
            }
        }
    }
})

export default defineType({
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  icon: Cog,
  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'header', title: 'Header' },
    { name: 'footer', title: 'Footer' },
    { name: 'blog', title: 'Blog Page' },
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
      description: 'Upload the logo to be used on light backgrounds.'
    }),
    defineField({
      name: 'logoDark',
      title: 'Logo (Dark Mode)',
      type: 'image',
      group: 'general',
      description: 'Upload the logo to be used on dark backgrounds.'
    }),
    defineField({
      name: 'mainNavigation',
      title: 'Main Navigation',
      type: 'array',
      group: 'header',
      of: [{ type: 'navItem' }],
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
      of: [{ type: 'navLink' }],
    }),
    defineField({
      name: 'footerCompanyLinks',
      title: 'Footer Company Links',
      type: 'array',
      group: 'footer',
      of: [{ type: 'navLink' }],
    }),
    defineField({
      name: 'footerLegalLinks',
      title: 'Footer Legal Links',
      type: 'array',
      group: 'footer',
      of: [{ type: 'navLink' }],
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
      initialValue: 'Latest Articles'
    }),
    defineField({
      name: 'blogPageSubheading',
      title: 'Blog Page Subheading',
      type: 'text',
      group: 'blog',
      initialValue: 'Explore our latest articles, insights, and stories. We cover a range of topics from technology to social impact.'
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
