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
const singletonTypes = new Set(["settings", "homePage"])

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .id('settings')
        .icon(Settings)
        .child(
          S.document()
            .schemaType('settings')
            .documentId('settings')
        ),
      
      S.divider(),

      S.listItem()
        .title('Home Page')
        .icon(Home)
        .id('homePage')
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage')
        ),
      
      S.documentTypeListItem('page').title('Other Pages').icon(FileText),
      
      S.divider(),

      S.listItem()
        .title('Blog Content')
        .icon(Book)
        .child(
          S.list()
            .title('Blog Content')
            .items([
              S.documentTypeListItem('post').title('All Posts'),
              S.documentTypeListItem('author').title('Authors').icon(User),
              S.documentTypeListItem('category').title('Categories').icon(Tag),
            ])
        ),
      
      S.divider(),

      S.listItem()
        .title('Reusable Content')
        .icon(Layers)
        .child(
          S.documentTypeList('reusableBlock').title('Reusable Content')
        ),

      S.divider(),

      S.listItem()
        .title('Organization Data')
        .icon(Handshake)
        .child(
          S.list()
            .title('Organization Data')
            .items([
                S.documentTypeListItem('partner').title('Partners').icon(Handshake),
                S.documentTypeListItem('testimonial').title('Testimonials').icon(MessageSquare),
                S.documentTypeListItem('program').title('Programs').icon(GraduationCap),
                S.documentTypeListItem('impactMetric').title('Impact Metrics').icon(BarChart),
                S.documentTypeListItem('donationTier').title('Donation Tiers').icon(Award),
            ])
        ),
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
