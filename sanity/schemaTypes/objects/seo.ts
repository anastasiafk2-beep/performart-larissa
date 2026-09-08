import {SearchIcon} from '@sanity/icons/Search'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'opinionSeo',
  title: 'SEO & κοινοποίηση',
  type: 'object',
  icon: SearchIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Τίτλος SEO',
      type: 'string',
      description: 'Αφήστε κενό για να χρησιμοποιηθεί ο βασικός τίτλος.',
      validation: (rule) => rule.max(60).warning('Ιδανικά έως 60 χαρακτήρες.'),
    }),
    defineField({
      name: 'description',
      title: 'Περιγραφή SEO',
      type: 'text',
      rows: 3,
      description: 'Αφήστε κενό για να χρησιμοποιηθεί η σύντομη εισαγωγή.',
      validation: (rule) => rule.max(160).warning('Ιδανικά έως 160 χαρακτήρες.'),
    }),
    defineField({
      name: 'shareImage',
      title: 'Εικόνα κοινοποίησης',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Εναλλακτικό κείμενο',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
  ],
})
