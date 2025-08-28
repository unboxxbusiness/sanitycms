// /sanity.config.ts
import {defineConfig} from 'sanity'
import {structureTool, type StructureResolver} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Home Page')
        .id('homePage')
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage')
        ),

      S.documentTypeListItem('page').title('Pages'),

      S.divider(),

      // List out the rest of the document types, but filter out the singleton types
      ...S.documentTypeListItems().filter(
        (listItem) => !['homePage', 'page'].includes(listItem.getId() as string)
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
  },
})
