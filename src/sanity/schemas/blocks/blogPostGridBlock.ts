// src/sanity/schemas/blocks/blogPostGridBlock.ts
import {defineField, defineType} from 'sanity'
import { LayoutGrid } from 'lucide-react'

export default defineType({
  name: 'blogPostGridBlock',
  title: 'Blog Post Grid',
  type: 'object',
  icon: LayoutGrid,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
    }),
    defineField({
      name: 'posts',
      title: 'Posts',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'post'}]}],
      validation: (Rule) => Rule.required().min(1),
      description: 'Select the blog posts you want to display in the grid.',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      posts: 'posts',
    },
    prepare({title, posts}) {
      const postCount = posts?.length || 0
      return {
        title: title || 'Blog Post Grid',
        subtitle: `${postCount} post(s) selected`,
      }
    },
  },
})
