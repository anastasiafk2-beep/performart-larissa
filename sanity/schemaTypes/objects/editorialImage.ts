import {ImageIcon} from '@sanity/icons/Image'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'editorialImage',
  title: 'Εικόνα',
  type: 'image',
  icon: ImageIcon,
  options: {hotspot: true},
  fields: [
    defineField({
      name: 'alt',
      title: 'Εναλλακτικό κείμενο',
      type: 'string',
      description: 'Περιγράψτε σύντομα τι δείχνει η εικόνα.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Λεζάντα',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'caption',
      subtitle: 'alt',
      media: 'asset',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || subtitle || 'Εικόνα',
        subtitle: title ? subtitle : undefined,
        media,
      }
    },
  },
})
