// src/sanity/schemas/documents/post.ts
import {defineField, defineType} from 'sanity'
import { Book } from 'lucide-react'

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  icon: Book,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineFiel({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      group: 'content',
      rows: 3,
      description: 'A short summary of the post to be used in previews.',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      group: 'content',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      group: 'content',
      to: {type: 'author'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      group: 'content',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
        name: 'tags',
        title: 'Tags',
        type: 'array',
        group: 'content',
        of: [{type: 'string'}],
        options: {
          layout: 'tags'
        }
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time (minutes)',
      type: 'number',
      group: 'content',
      description: 'The estimated time it takes to read the article.',
    }),
    defineField({
      name: 'views',
      title: 'Views',
      type: 'number',
      group: 'content',
      description: 'An optional field to display view count.',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'}
          ],
          lists: [{title: 'Bullet', value: 'bullet'}, {title: 'Numbered', value: 'number'}],
          marks: {
            decorators: [{title: 'Strong', value: 'strong'}, {title: 'Emphasis', value: 'em'}, {title: 'Code', value: 'code'}],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'URL',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url'
                  }
                ]
              }
            ]
          }
        },
        {
          type: 'image',
          options: {hotspot: true}
        },
        {
          type: 'reference',
          to: [{type: 'reusableBlock'}],
          title: 'Reusable Block'
        }
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      group: 'seo',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Title for search engines and browser tabs. If empty, the post title will be used.',
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          description: 'Description for search engines. If empty, the excerpt will be used.',
        }),
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'coverImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
