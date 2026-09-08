import {CommentIcon} from '@sanity/icons/Comment'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {UserIcon} from '@sanity/icons/User'
import {UsersIcon} from '@sanity/icons/Users'
import type {StructureResolver} from 'sanity/structure'

export const studioStructure: StructureResolver = (S) =>
  S.list()
    .title('The PerformART')
    .items([
      S.documentTypeListItem('newsletter')
        .title('Newsletter')
        .icon(DocumentTextIcon),

      S.divider(),

      S.listItem()
        .title('Απόψεις')
        .icon(DocumentTextIcon)
        .child(
          S.list()
            .title('Απόψεις')
            .items([
              S.documentTypeListItem('opinionArticle')
                .title('Άρθρα / Απόψεις')
                .icon(DocumentTextIcon),

              S.documentTypeListItem('dialogue')
                .title('Διάλογοι')
                .icon(CommentIcon),

              S.divider(),

              S.documentTypeListItem('opinionAuthor')
                .title('Αρθρογράφοι')
                .icon(UserIcon),

              S.documentTypeListItem('dialoguePersona')
                .title('Εικονικές περσόνες')
                .icon(UsersIcon),
            ])
        ),
    ])