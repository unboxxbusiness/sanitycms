// src/sanity/schemas/blocks/impactMetricsBlock.ts
import {defineField, defineType} from 'sanity'
import { TrendingUp } from 'lucide-react'

export default defineType({
  name: 'impactMetricsBlock',
  title: 'Impact Metrics Block',
  type: 'object',
  icon: TrendingUp,
  fields: [
    defineField({
        name: 'heading',
        title: 'Heading',
        type: 'string',
    }),
    defineField({
      name: 'metrics',
      title: 'Metrics',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'impactMetric'}]}],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      metrics: 'metrics'
    },
    prepare({title, metrics}) {
      const metricsCount = metrics?.length || 0;
      return {
        title: title || 'Impact Metrics Block',
        subtitle: `${metricsCount} metric(s)`,
      }
    },
  },
})
