'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ProductImageGalleryProps {
  images: { src: string; alt: string }[]
}

export default function ProductImageGallery({ images }: ProductImageGalleryProps) {
  const [active, setActive] = useState(0)

  if (!images || images.length === 0) return null

  return (
    <div className="mb-8">
      {/* Main image */}
      <div className="relative w-full aspect-square rounded-card overflow-hidden bg-gray-50 border border-gray-100 mb-3">
        <Image
          src={images[active].src}
          alt={images[active].alt}
          fill
          className="object-cover transition-opacity duration-200"
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
              className={`relative w-16 h-16 rounded-md overflow-hidden border-2 flex-shrink-0 transition-all duration-150 ${
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
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
