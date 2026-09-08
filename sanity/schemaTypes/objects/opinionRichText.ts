import {BlockContentIcon} from '@sanity/icons/BlockContent'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'opinionRichText',
  title: 'Κείμενο',
  type: 'array',
  icon: BlockContentIcon,
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Κανονικό', value: 'normal'},
        {title: 'Ενότητα', value: 'h2'},
        {title: 'Υποενότητα', value: 'h3'},
        {title: 'Παράθεμα', value: 'blockquote'},
      ],
      lists: [
        {title: 'Κουκκίδες', value: 'bullet'},
        {title: 'Αρίθμηση', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Έντονα', value: 'strong'},
          {title: 'Πλάγια', value: 'em'},
        ],
        annotations: [
          defineField({
            name: 'link',
            title: 'Σύνδεσμος',
            type: 'object',
            fields: [
              defineField({
                name: 'href',
                title: 'Διεύθυνση',
                type: 'url',
                validation: (rule) =>
                  rule.required().uri({scheme: ['http', 'https', 'mailto']}),
              }),
            ],
          }),
        ],
      },
    }),
    defineArrayMember({type: 'editorialImage'}),
  ],
})
