// src/sanity/schemas/settings.ts
import {defineField, defineType} from 'sanity'
import { Cog } from 'lucide-react'

export default defineType({
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  icon: Cog,
  // This will prevent users from creating new settings documents or deleting the existing one
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'header', title: 'Header' },
    { name: 'footer', title: 'Footer' },
    { name: 'blog', title: 'Blog Page' },
    { name: 'seo', title: 'Default SEO' },
  ],
  fields: [
    // General Settings
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
      description: 'Upload the logo to be displayed on light backgrounds. Recommended size: 400x100px.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'logoDark',
      title: 'Logo (Dark Mode)',
      type: 'image',
      group: 'general',
      description: 'Upload the logo for dark backgrounds. If empty, the light logo is used.',
      options: { hotspot: true },
    }),

    // Header Settings
    defineField({
      name: 'mainNavigation',
      title: 'Main Navigation',
      type: 'array',
      group: 'header',
      description: 'The primary navigation links that appear in the website header.',
      of: [{ type: 'navItem' }],
    }),
    defineField({
      name: 'headerCta',
      title: 'Header CTA Button',
      type: 'object',
      group: 'header',
      description: 'The main call-to-action button in the header.',
      fields: [
        { name: 'text', type: 'string', title: 'Button Text', initialValue: 'Get Started' },
        { name: 'link', type: 'string', title: 'Button Link' }
      ]
    }),

    // Footer Settings
    defineField({
        name: 'footerDescription',
        title: 'Footer Description',
        type: 'text',
        group: 'footer',
        description: 'A short description of your organization for the footer.',
        rows: 3
    }),
    defineField({
        name: 'copyrightText',
        title: 'Copyright Text',
        type: 'string',
        group: 'footer',
        description: 'The copyright notice. The current year is automatically added.',
        initialValue: 'AmulyaX India. All rights reserved.'
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      group: 'footer',
      description: 'Links to your social media profiles.',
      of: [{
        type: 'object',
        name: 'socialLink',
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
          defineField({ name: 'url', title: 'URL', type: 'url' })
        ]
      }]
    }),
    defineField({
      name: 'footerProductLinks',
      title: 'Footer "Product" Links',
      type: 'array',
      group: 'footer',
      of: [{ type: 'navLink' }],
    }),
    defineField({
      name: 'footerCompanyLinks',
      title: 'Footer "Company" Links',
      type: 'array',
      group: 'footer',
      of: [{ type: 'navLink' }],
    }),
    defineField({
      name: 'footerLegalLinks',
      title: 'Footer "Legal" Links',
      type: 'array',
      group: 'footer',
      of: [{ type: 'navLink' }],
    }),
     defineField({
        name: 'newsletterHeadline',
        title: 'Newsletter Headline',
        type: 'string',
        group: 'footer',
        initialValue: 'Stay Updated',
    }),
    defineField({
        name: 'newsletterSupportingText',
        title: 'Newsletter Supporting Text',
        type: 'text',
        group: 'footer',
        initialValue: 'Subscribe to our newsletter to get the latest updates.',
    }),
    defineField({
      name: 'showMembershipCta',
      title: 'Show Membership CTA in Footer',
      type: 'boolean',
      initialValue: true,
      group: 'footer',
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
    
    // Blog Settings
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

    // SEO Settings
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
