import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'partnerSection',
  title: 'Partner Section',
  type: 'document',
  fields: [
    defineField({
      name: 'partners',
      title: 'Partners',
      type: 'array',
      of: [{type: 'reference', to: {type: 'partner'}}],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Partner Section',
      }
    }
  }
})
