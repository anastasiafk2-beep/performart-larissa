import { defineField, defineType } from "sanity";

export const newsletter = defineType({
  name: "newsletter",
  title: "Newsletter",
  type: "document",

  fields: [
    defineField({name:'dryRun',title:'Ασφαλής δοκιμή — χωρίς αποστολή',type:'boolean',initialValue:true,description:'Ενεργό: μόνο πρόχειρο στο Kit. Ανενεργό: πραγματική αποστολή σε όλους τους συνδρομητές όταν δημοσιευτεί αλλαγή σε Έτοιμο.'}),
    defineField({name:'kitBroadcastId',title:'Kit Broadcast ID',type:'string',readOnly:true}),
    defineField({name:'sendError',title:'Σφάλμα αποστολής',type:'text',readOnly:true}),
    defineField({name:'testBroadcastId',title:'Kit δοκιμαστικό Broadcast ID',type:'string',readOnly:true}),
    defineField({name:'testedAt',title:'Τελευταία ασφαλής δοκιμή',type:'datetime',readOnly:true}),

    defineField({
      name: "internalTitle",
      title: "Εσωτερικός τίτλος",
      type: "string",
      description:
        "Χρησιμοποιείται μόνο μέσα στο Sanity για να αναγνωρίζεις το newsletter.",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "subject",
      title: "Θέμα email",
      type: "string",
      description:
        "Αυτό θα βλέπει ο συνδρομητής ως θέμα του email.",
      validation: (Rule) => Rule.required().max(120),
    }),

    defineField({
      name: "preheader",
      title: "Preview text",
      type: "string",
      description:
        "Το σύντομο κείμενο που εμφανίζεται δίπλα ή κάτω από το θέμα στο inbox.",
      validation: (Rule) => Rule.max(160),
    }),

    defineField({
      name: "body",
      title: "Περιεχόμενο newsletter",
      type: "array",
      of: [
        {
          type: "block",
        },
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "status",
      title: "Κατάσταση αποστολής",
      type: "string",
      initialValue: "draft",
      options: {
        list: [
          {
            title: "Πρόχειρο — να μην σταλεί",
            value: "draft",
          },
          {
            title: "Έτοιμο για αποστολή",
            value: "ready",
          },
          {
            title: "Απεστάλη",
            value: "sent",
          },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "sentAt",
      title: "Ημερομηνία αποστολής",
      type: "datetime",
      readOnly: true,
      hidden: ({ document }) => !document?.sentAt,
    }),
  ],

  preview: {
    select: {
      title: "internalTitle",
      subtitle: "subject",
      status: "status",
    },

    prepare({ title, subtitle, status }) {
      const statusLabels: Record<string, string> = {
        draft: "Πρόχειρο",
        ready: "Έτοιμο για αποστολή",
        sent: "Απεστάλη",
      };

      return {
        title,
        subtitle: `${statusLabels[status] || status} · ${subtitle || ""}`,
      };
    },
  },
});