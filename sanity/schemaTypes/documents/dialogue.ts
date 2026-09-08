import {CommentIcon} from '@sanity/icons/Comment'
import {defineArrayMember, defineField, defineType} from 'sanity'

import {isUniqueOpinionSlug} from '../shared/isUniqueOpinionSlug'

export default defineType({
  name: 'dialogue',
  title: 'Διάλογος',
  type: 'document',
  icon: CommentIcon,
  groups: [
    {name: 'setup', title: 'Θέμα & πρόσωπα', default: true},
    {name: 'conversation', title: 'Συνομιλία'},
    {name: 'media', title: 'Εικόνα'},
    {name: 'publishing', title: 'Δημοσίευση'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Τίτλος',
      type: 'string',
      group: 'setup',
      validation: (rule) => rule.required().max(140),
    }),
    defineField({
      name: 'slug',
      title: 'URL',
      type: 'slug',
      group: 'publishing',
      options: {source: 'title', maxLength: 96, isUnique: isUniqueOpinionSlug},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'topic',
      title: 'Θέμα συζήτησης',
      type: 'string',
      group: 'setup',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'excerpt',
      title: 'Σύντομη εισαγωγή',
      type: 'text',
      rows: 4,
      group: 'setup',
      validation: (rule) => rule.required().max(280),
    }),
    defineField({
      name: 'firstPersona',
      title: 'Πρώτη περσόνα',
      type: 'reference',
      to: [{type: 'dialoguePersona'}],
      group: 'setup',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'secondPersona',
      title: 'Δεύτερη περσόνα',
      type: 'reference',
      to: [{type: 'dialoguePersona'}],
      group: 'setup',
      validation: (rule) =>
        rule.required().custom((secondPersona, context) => {
          const firstPersona = context.document?.firstPersona as
            | {_ref?: string}
            | undefined

          if (firstPersona?._ref && firstPersona._ref === secondPersona?._ref) {
            return 'Επιλέξτε δύο διαφορετικές περσόνες.'
          }

          return true
        }),
    }),
    defineField({
      name: 'introduction',
      title: 'Εισαγωγή πριν από τον διάλογο',
      type: 'opinionRichText',
      group: 'conversation',
    }),
    defineField({
      name: 'turns',
      title: 'Ατάκες',
      type: 'array',
      group: 'conversation',
      of: [defineArrayMember({type: 'dialogueTurn'})],
      validation: (rule) => rule.required().min(2),
    }),
    defineField({
      name: 'coverImage',
      title: 'Κεντρική εικόνα',
      type: 'editorialImage',
      group: 'media',
      description: 'Προαιρετική εικόνα θέματος — τα πορτρέτα έρχονται από τις περσόνες.',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Ημερομηνία δημοσίευσης',
      type: 'datetime',
      group: 'publishing',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'prominence',
      title: 'Προβολή στην κεντρική σελίδα',
      type: 'string',
      group: 'publishing',
      initialValue: 'standard',
      options: {
        list: [
          {title: 'Κανονική', value: 'standard'},
          {title: 'Κεντρική επιλογή', value: 'featured'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO & κοινοποίηση',
      type: 'opinionSeo',
      group: 'seo',
    }),
  ],
  orderings: [
    {
      title: 'Νεότερα πρώτα',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      first: 'firstPersona.name',
      second: 'secondPersona.name',
      topic: 'topic',
      media: 'coverImage',
    },
    prepare({title, first, second, topic, media}) {
      const people = [first, second].filter(Boolean).join(' ↔ ')

      return {
        title,
        subtitle: [topic, people].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})
