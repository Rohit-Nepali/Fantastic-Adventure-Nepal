import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'default',
  title: 'Fantastic Adventure Nepal Sanity Project',

  projectId: 'alx1snmd',
  dataset: 'production',
  plugins: [structureTool()],
  basePath: "/studio",

  schema: {
    types: schemaTypes,
  },
})
