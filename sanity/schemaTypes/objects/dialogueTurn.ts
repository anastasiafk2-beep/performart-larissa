import {CommentIcon} from '@sanity/icons/Comment'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'dialogueTurn',
  title: 'Ατάκα διαλόγου',
  type: 'object',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'speaker',
      title: 'Ποιος μιλάει;',
      type: 'string',
      options: {
        list: [
          {title: 'Πρώτη περσόνα', value: 'first'},
          {title: 'Δεύτερη περσόνα', value: 'second'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Ατάκα',
      type: 'array',
      of: [{type: 'block'}],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'aside',
      title: 'Σκηνική σημείωση',
      type: 'string',
      description: 'Προαιρετικό — π.χ. «χαμογελά» ή «μετά από παύση».',
    }),
  ],
  preview: {
    select: {
      speaker: 'speaker',
      content: 'content',
    },
    prepare({speaker, content}) {
      const firstBlock = Array.isArray(content) ? content[0] : undefined
      const text = firstBlock?.children
        ?.map((child: {text?: string}) => child.text || '')
        .join('')

      return {
        title: text || 'Κενή ατάκα',
        subtitle:
          speaker === 'second' ? 'Δεύτερη περσόνα' : 'Πρώτη περσόνα',
      }
    },
  },
})
