// src/sanity/schemas/index.ts
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
]
