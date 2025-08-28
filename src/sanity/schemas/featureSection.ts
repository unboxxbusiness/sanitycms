import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'featureSection',
  title: 'Feature Section',
  type: 'document',
  fields: [
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{type: 'reference', to: {type: 'feature'}}],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Feature Section',
      }
    }
  }
})
