// src/sanity/schemas/documents/program.ts
import {defineField, defineType} from 'sanity'
import { GraduationCap } from 'lucide-react'

export default defineType({
  name: 'program',
  title: 'Program',
  type: 'document',
  icon: GraduationCap,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
            {title: 'Map Pin', value: 'MapPin'},
            {title: 'Languages', value: 'Languages'},
            {title: 'Indian Rupee', value: 'IndianRupee'},
            {title: 'Heart Handshake', value: 'HeartHandshake'},
            {title: 'Users', value: 'Users'},
            {title: 'Leaf', value: 'Leaf'},
            {title: 'Goal', value: 'Goal'},
        ]
      }
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      initialValue: 'Learn More'
    }),
    defineField({
        name: 'buttonLink',
        title: 'Button Link',
        type: 'string',
        description: 'The URL this card should link to (e.g., /programs/digital-mira)'
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
})
