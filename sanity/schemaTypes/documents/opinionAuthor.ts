import {UserIcon} from '@sanity/icons/User'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'opinionAuthor',
  title: 'Αρθρογράφος',
  type: 'document',
  icon: UserIcon,
  groups: [
    {name: 'profile', title: 'Προφίλ', default: true},
    {name: 'links', title: 'Σύνδεσμοι'},
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Ονοματεπώνυμο',
      type: 'string',
      group: 'profile',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Ιδιότητα',
      type: 'string',
      group: 'profile',
      description: 'Π.χ. συγγραφέας, ιστορικός τέχνης, δημοσιογράφος.',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'photo',
      title: 'Φωτογραφία',
      type: 'editorialImage',
      group: 'profile',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Σύντομο bio',
      type: 'text',
      rows: 5,
      group: 'profile',
      validation: (rule) => [
        rule.required(),
        rule.max(500).warning('Το bio εμφανίζεται δίπλα στο άρθρο.'),
      ],
    }),
    defineField({
      name: 'website',
      title: 'Ιστοσελίδα',
      type: 'url',
      group: 'links',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'socialUrl',
      title: 'Κύριο κοινωνικό προφίλ',
      type: 'url',
      group: 'links',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
  ],
  orderings: [
    {
      title: 'Όνομα Α–Ω',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'photo',
    },
  },
})
