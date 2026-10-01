import Image from 'next/image'

import type {EditorialImage as EditorialImageValue} from '@/lib/opinions-data'

type EditorialImageProps = {
  image: EditorialImageValue
  className?: string
  priority?: boolean
  sizes?: string
}

export default function EditorialImage({
  image,
  className,
  priority = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
}: EditorialImageProps) {
  const width = image.dimensions?.width || 1400
  const height = image.dimensions?.height || 900

  return (
    <Image
      src={image.url}
      alt={image.alt || ''}
      width={width}
      height={height}
      className={className}
      priority={priority}
      sizes={sizes}
      placeholder={image.lqip ? 'blur' : 'empty'}
      blurDataURL={image.lqip}
    />
  )
}
