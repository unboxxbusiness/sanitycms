import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'impactSection',
  title: 'Impact Section',
  type: 'document',
  fields: [
    defineField({
      name: 'impact',
      title: 'Impact',
      type: 'array',
      of: [{type: 'reference', to: {type: 'impact'}}],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Impact Section',
      }
    }
  }
})
