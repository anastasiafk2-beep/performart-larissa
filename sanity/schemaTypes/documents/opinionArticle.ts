import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {defineField, defineType} from 'sanity'

import {isUniqueOpinionSlug} from '../shared/isUniqueOpinionSlug'

export default defineType({
  name: 'opinionArticle',
  title: 'Άρθρο / Άποψη',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    {name: 'content', title: 'Περιεχόμενο', default: true},
    {name: 'media', title: 'Εικόνα'},
    {name: 'publishing', title: 'Δημοσίευση'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Τίτλος',
      type: 'string',
      group: 'content',
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
      name: 'author',
      title: 'Αρθρογράφος',
      type: 'reference',
      to: [{type: 'opinionAuthor'}],
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'topic',
      title: 'Θέμα',
      type: 'string',
      group: 'content',
      description: 'Σύντομη θεματική ένδειξη, π.χ. «Πόλη», «Θέατρο», «Κοινωνία».',
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: 'excerpt',
      title: 'Σύντομη εισαγωγή',
      type: 'text',
      rows: 4,
      group: 'content',
      validation: (rule) => rule.required().max(280),
    }),
    defineField({
      name: 'body',
      title: 'Κείμενο άρθρου',
      type: 'opinionRichText',
      group: 'content',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'heroImage',
      title: 'Κεντρική εικόνα',
      type: 'editorialImage',
      group: 'media',
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
      author: 'author.name',
      topic: 'topic',
      media: 'heroImage',
    },
    prepare({title, author, topic, media}) {
      return {
        title,
        subtitle: [topic, author].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})
