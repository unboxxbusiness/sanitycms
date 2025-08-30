// src/sanity/schemas/index.ts
import {defineField, defineType} from 'sanity'
import page from './page'
import homePage from './homePage'
import settings from './settings'

// Block Schemas
import ctaBlock from './blocks/ctaBlock'
import heroBlock from './blocks/heroBlock'
import impactMetricsBlock from './blocks/impactMetricsBlock'
import partnerLogoBlock from './blocks/partnerLogoBlock'
import programCardsBlock from './blocks/programCardsBlock'
import testimonialsBlock from './blocks/testimonialsBlock'
import textBlock from './blocks/textBlock'
import videoBlock from './blocks/videoBlock'
import donationBlock from './blocks/donationBlock'
import blogPostGridBlock from './blocks/blogPostGridBlock'

// Document types used by blocks
import partner from './documents/partner'
import testimonial from './documents/testimonial'
import program from './documents/program'
import impactMetric from './documents/impactMetric'
import donationTier from './documents/donationTier'

// Blog schema types
import post from './documents/post'
import author from './documents/author'
import category from './documents/category'
import reusableBlock from './documents/reusableBlock'

// Define navLink and navItem here to be used in settings
const navLink = defineType({
    name: 'navLink',
    title: 'Navigation Link',
    type: 'object',
    fields: [
        defineField({ name: 'text', type: 'string', title: 'Link Text', validation: Rule => Rule.required() }),
        defineField({ name: 'link', type: 'string', title: 'Link URL', validation: Rule => Rule.required() })
    ]
});

const navItem = defineType({
    name: 'navItem',
    title: 'Navigation Item',
    type: 'object',
    fields: [
        defineField({ name: 'text', type: 'string', title: 'Link Text', validation: Rule => Rule.required() }),
        defineField({ 
            name: 'link', 
            type: 'string', 
            title: 'Link URL',
            description: 'Leave blank if this is a dropdown menu for sub-items.'
        }),
        defineField({
            name: 'children',
            title: 'Sub-menu Items',
            type: 'array',
            of: [{ type: 'navLink' }],
            hidden: ({parent}) => !!parent.link,
            description: 'Add items here to create a dropdown menu.'
        })
    ],
    preview: {
        select: {
            title: 'text',
            children: 'children'
        },
        prepare({title, children}: {title: string, children: any[]}) {
            const hasChildren = children && children.length > 0;
            return {
                title: title,
                subtitle: hasChildren ? `${children.length} sub-item(s)` : 'Simple Link'
            }
        }
    }
});

export const schemaTypes = [
    // Document types
    page,
    homePage,
    partner,
    testimonial,
    program,
    impactMetric,
    settings,
    donationTier,
    post,
    author,
    category,
    reusableBlock,

    // Reusable object types
    navLink,
    navItem,

    // Block Schemas
    ctaBlock,
    heroBlock,
    impactMetricsBlock,
    partnerLogoBlock,
    programCardsBlock,
    testimonialsBlock,
    textBlock,
    videoBlock,
    donationBlock,
    blogPostGridBlock,
]
