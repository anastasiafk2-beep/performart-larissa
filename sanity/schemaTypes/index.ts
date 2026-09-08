import dialogue from './documents/dialogue'
import dialoguePersona from './documents/dialoguePersona'
import opinionArticle from './documents/opinionArticle'
import opinionAuthor from './documents/opinionAuthor'
import {newsletter} from './documents/newsletter'

import dialogueTurn from './objects/dialogueTurn'
import editorialImage from './objects/editorialImage'
import opinionRichText from './objects/opinionRichText'
import seo from './objects/seo'

export const schemaTypes = [
  opinionArticle,
  dialogue,
  opinionAuthor,
  dialoguePersona,
  newsletter,

  dialogueTurn,
  editorialImage,
  opinionRichText,
  seo,
]