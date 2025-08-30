// /sanity.config.ts
import {defineConfig} from 'sanity'
import {structureTool, type StructureResolver} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './src/sanity/schemas'
import { Book, User, Tag, Layers, Settings, Home, FileText, Handshake, MessageSquare, GraduationCap, BarChart, Award } from 'lucide-react'
import { studioTheme } from './src/sanity/studio-theme'
import { StudioLogo } from './src/sanity/studio-logo'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

const singletonActions = new Set(["publish", "discardChanges", "restore"])
const singletonTypes = new Set(["siteSettings", "homePage"])

// This is the most robust way to define the structure for Sanity Studio
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Singleton document for Site Settings
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .icon(Settings)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      // Singleton document for Home Page
      S.listItem()
        .title('Home Page')
        .icon(Home)
        .id('homePage')
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage')
        ),

      S.divider(),
      
      // Standard document types
      S.documentTypeListItem('page').title('Pages').icon(FileText),
      S.documentTypeListItem('post').title('Blog Posts').icon(Book),
      S.documentTypeListItem('author').title('Authors').icon(User),
      S.documentTypeListItem('category').title('Categories').icon(Tag),
      
      S.divider(),

      // Other data types
      S.documentTypeListItem('partner').title('Partners').icon(Handshake),
      S.documentTypeListItem('testimonial').title('Testimonials').icon(MessageSquare),
      S.documentTypeListItem('program').title('Programs').icon(GraduationCap),
      S.documentTypeListItem('impactMetric').title('Impact Metrics').icon(BarChart),
      S.documentTypeListItem('donationTier').title('Donation Tiers').icon(Award),
      S.documentTypeListItem('reusableBlock').title('Reusable Blocks').icon(Layers),
    ])


export default defineConfig({
  basePath: '/studio',
  name: 'amulyax_india_content_studio',
  title: 'AmulyaX India Content Studio',
  projectId,
  dataset,

  plugins: [structureTool({
    structure
  }), visionTool()],

  schema: {
    types: schemaTypes,
     // Filter out singleton types from the global “New document” menu options
     templates: (templates) =>
        templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    // For singleton types, filter out actions that are not explicitly included
    // in the `singletonActions` list defined above
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
    
    // This part is important for creating new singleton documents
    newDocumentOptions: (prev, { creationContext }) => {
        if (creationContext.type === 'global') {
          return prev.filter(
            (templateItem) => !singletonTypes.has(templateItem.templateId)
          )
        }
        return prev
      },
  },
  
  studio: {
    theme: studioTheme,
    components: {
        logo: StudioLogo
    }
  }
})
