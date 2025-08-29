import {defineConfig} from 'sanity'
import {structureTool, type StructureResolver} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './src/sanity/schemas'
import { Book, User, Tag, Layers, Settings, Home, FileText } from 'lucide-react'
import { studioTheme } from './src/sanity/studio-theme'
import { StudioLogo } from './src/sanity/studio-logo'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

const singletonActions = new Set(["publish", "discardChanges", "restore"])
const singletonTypes = new Set(["homePage", "settings"])

const hiddenDocTypes = ['partner', 'testimonial', 'program', 'impactMetric', 'donationTier', 'post', 'author', 'category', 'reusableBlock']

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

       S.documentTypeListItem('reusableBlock').title('Reusable Content').icon(Layers),

      S.divider(),

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
     templates: (templates) =>
        templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
  
  studio: {
    theme: studioTheme,
    components: {
        logo: StudioLogo
    }
  }
})
