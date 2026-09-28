'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ProductImageGalleryProps {
  background?: 'white' | 'muted'
  images: { src: string; alt: string; fit?: 'cover' | 'contain'; padding?: number }[]
}

export default function ProductImageGallery({ images, background = 'muted' }: ProductImageGalleryProps) {
  const [active, setActive] = useState(0)

  if (!images || images.length === 0) return null

  return (
    <div className="mb-8">
      {/* Main image */}
      <div className={`relative w-full aspect-square rounded-card overflow-hidden ${background === 'white' ? 'bg-white' : 'bg-gray-50'} border border-gray-100 mb-3`}>
        <Image
          src={images[active].src}
          alt={images[active].alt}
          fill
          className={`${images[active].fit === 'contain' ? 'object-contain' : 'object-cover'} transition-opacity duration-200`}
          style={{ padding: images[active].fit === 'contain' ? (images[active].padding ?? 16) : 0 }}
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Thumbnails — left-aligned */}
      {images.length > 1 && (
        <div className="flex items-center gap-2 flex-wrap">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={`relative w-16 h-16 rounded-md overflow-hidden border-2 flex-shrink-0 transition-all duration-150 ${background === 'white' ? 'bg-white' : ''} ${
                i === active
                  ? 'border-lp-green ring-1 ring-lp-green'
                  : 'border-gray-200 hover:border-gray-400'
              }`}
              aria-label={`View ${img.alt}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className={img.fit === 'contain' ? 'object-contain' : 'object-cover'}
                style={{ padding: img.fit === 'contain' ? 4 : 0 }}
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
