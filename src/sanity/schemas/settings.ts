// src/sanity/schemas/settings.ts
import {defineField, defineType} from 'sanity'
import { Cog } from 'lucide-react'

export default defineType({
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  icon: Cog,
  fields: [
    defineField({
      name: 'mainNavigation',
      title: 'Main Navigation',
      type: 'array',
      of: [{ 
        type: 'object',
        fields: [
          { name: 'text', type: 'string', title: 'Link Text' },
          { name: 'link', type: 'string', title: 'Link URL' }
        ]
      }],
    }),
    defineField({
      name: 'footerProductLinks',
      title: 'Footer Product Links',
      type: 'array',
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
