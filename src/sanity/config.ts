// /sanity.config.ts
import {defineConfig} from 'sanity'
import {structureTool, type StructureResolver} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

const singletonActions = new Set(["publish", "discardChanges", "restore"])
const singletonTypes = new Set(["homePage"])

// The document types that should not be included in the main navigation list
const hiddenDocTypes = ['partner', 'testimonial', 'program', 'impactMetric']

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Singleton for the Home Page
      S.listItem()
        .title('Home Page')
        .id('homePage')
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage')
        ),
      
      // Document list for all other pages
      S.documentTypeListItem('page').title('Pages'),

      S.divider(),

      // Filter out the singleton and hidden document types from the main list
      ...S.documentTypeListItems().filter(
        (listItem) => {
            const id = listItem.getId()
            if (!id) return false
            return !singletonTypes.has(id) && !hiddenDocTypes.includes(id) && id !== 'page'
        }
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
  },
})
