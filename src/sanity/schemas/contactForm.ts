// src/sanity/schemas/contactForm.ts
import {defineField, defineType} from 'sanity'
import { MessagesSquare } from 'lucide-react'

export default defineType({
  name: 'contactForm',
  title: 'Contact Form',
  type: 'object',
  icon: MessagesSquare,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Contact Us',
      readOnly: true, // This is just a placeholder to identify the slice
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Contact Form',
      }
    }
  }
})
