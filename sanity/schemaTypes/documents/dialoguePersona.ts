import {UsersIcon} from '@sanity/icons/Users'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'dialoguePersona',
  title: 'Εικονική περσόνα',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Όνομα περσόνας',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Σύντομος χαρακτηρισμός',
      type: 'string',
      description: 'Π.χ. «η αισιόδοξη πραγματίστρια».',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'portrait',
      title: 'Πορτρέτο / avatar',
      type: 'editorialImage',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Σύντομο bio',
      type: 'text',
      rows: 4,
      description: 'Το κείμενο που θα βλέπει ο αναγνώστης.',
      validation: (rule) => rule.required().max(400),
    }),
    defineField({
      name: 'standpoint',
      title: 'Οπτική / τρόπος σκέψης',
      type: 'text',
      rows: 5,
      description:
        'Εσωτερική οδηγία για τη συνέπεια της φωνής της περσόνας. Δεν εμφανίζεται στο site.',
      validation: (rule) => rule.required().max(800),
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
      subtitle: 'tagline',
      media: 'portrait',
    },
  },
})
