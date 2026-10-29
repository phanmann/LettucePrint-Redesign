'use client'

import ProductPreviewImage from '@/components/shop/ProductPreviewImage'
import { useEffect, useState } from 'react'

const slides = [
  { path: '/shop/roll-labels', alt: 'Lettuce Print roll labels' },
  { path: '/shop/stickers', alt: 'Lettuce Print custom stickers' },
  { path: '/shop/spot-uv', alt: 'Lettuce Print Spot UV stickers' },
]

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length)
        setFading(false)
      }, 400) // crossfade duration
    }, 3000) // 3 seconds per slide

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative rounded-card overflow-hidden h-[280px] lg:h-[340px] bg-gray-900">
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={slide.path}
          className="absolute inset-0 transition-opacity duration-400"
          style={{
            opacity: i === current ? (fading ? 0 : 1) : 0,
            transition: 'opacity 400ms ease-in-out',
          }}
        >
          <ProductPreviewImage
            productPath={slide.path}
            alt={slide.alt}
            className="object-cover"
            priority={i === 0}
            sizes="(max-width: 1024px) 100vw, 420px"
          />
        </div>
      ))}

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => { setFading(false); setCurrent(i) }}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === current ? '20px' : '6px',
              height: '6px',
              backgroundColor: i === current ? '#ffffff' : 'rgba(255,255,255,0.45)',
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

    </div>
  )
}
