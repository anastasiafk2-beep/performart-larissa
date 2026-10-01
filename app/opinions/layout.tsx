import type {Metadata} from 'next'

import {createPageMetadata} from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Απόψεις — Διάλογοι και αρθρογραφία',
  description:
    'Διάλογοι, προσωπικές φωνές και διαφορετικές οπτικές από το The PerformArt Larissa.',
  path: '/opinions',
})

export default function OpinionsLayout({children}: {children: React.ReactNode}) {
  return children
}
