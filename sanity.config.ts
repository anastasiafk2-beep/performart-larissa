import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

import {schemaTypes} from './sanity/schemaTypes'
import {studioStructure} from './sanity/structure'

export default defineConfig({
  name: 'performart-studio',
  title: 'The PerformART — Studio',

  projectId: 'lkrlrpq7',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: studioStructure,
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})