// src/sanity/schemas/documents/impactMetric.ts
import {defineField, defineType} from 'sanity'
import { BarChart } from 'lucide-react'

export default defineType({
  name: 'impactMetric',
  title: 'Impact Metric',
  type: 'document',
  icon: BarChart,
  fields: [
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      description: 'The number or statistic (e.g., "10,000+").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'The description for the metric (e.g., "Students Impacted").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
            {title: 'Heart Handshake', value: 'HeartHandshake'},
            {title: 'Users', value: 'Users'},
            {title: 'Leaf', value: 'Leaf'},
            {title: 'Goal', value: 'Goal'},
        ]
      }
    }),
  ],
  preview: {
    select: {
      title: 'value',
      subtitle: 'label',
    },
  },
})
