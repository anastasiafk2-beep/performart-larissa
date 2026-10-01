import {
  PortableText,
  type PortableTextComponents,
} from '@portabletext/react'

import EditorialImage from '@/components/opinions/EditorialImage'
import type {
  OpinionPortableContent,
  PortableEditorialImage,
} from '@/lib/opinions-data'

import styles from '@/app/opinions/opinions.module.css'

const components: PortableTextComponents = {
  block: {
    normal: ({children}) => <p>{children}</p>,
    h2: ({children}) => <h2>{children}</h2>,
    h3: ({children}) => <h3>{children}</h3>,
    blockquote: ({children}) => <blockquote>{children}</blockquote>,
  },
  list: {
    bullet: ({children}) => <ul>{children}</ul>,
    number: ({children}) => <ol>{children}</ol>,
  },
  marks: {
    link: ({children, value}) => {
      const href = typeof value?.href === 'string' ? value.href : '#'
      const external = href.startsWith('http')

      return (
        <a
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noreferrer noopener' : undefined}
        >
          {children}
        </a>
      )
    },
  },
  types: {
    editorialImage: ({value}) => {
      const image = value as PortableEditorialImage

      if (!image.url) return null

      return (
        <figure className={styles.inlineFigure}>
          <EditorialImage image={image} sizes='(max-width: 900px) 100vw, 760px' />
          {image.caption && <figcaption>{image.caption}</figcaption>}
        </figure>
      )
    },
  },
}

type PortableContentProps = {
  value?: OpinionPortableContent
  compact?: boolean
}

export default function PortableContent({
  value,
  compact = false,
}: PortableContentProps) {
  if (!value?.length) return null

  return (
    <div className={compact ? styles.portableCompact : styles.portableContent}>
      <PortableText value={value} components={components} />
    </div>
  )
}
