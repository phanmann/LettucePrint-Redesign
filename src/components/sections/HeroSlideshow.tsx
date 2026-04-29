'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { MapPin } from 'lucide-react'

const slides = [
  { src: '/images/hero/hero-1.png',  alt: 'Lettuce Print studio work' },
  { src: '/images/hero/hero-2.png',  alt: 'Lettuce Print print production' },
  { src: '/images/hero/hero-3.jpeg', alt: 'Lettuce Print custom stickers' },
  { src: '/images/hero/hero-4.jpeg', alt: 'Lettuce Print holo stickers' },
  { src: '/images/hero/hero-5.jpeg', alt: 'Lettuce Print roll labels' },
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
          key={slide.src}
          className="absolute inset-0 transition-opacity duration-400"
          style={{
            opacity: i === current ? (fading ? 0 : 1) : 0,
            transition: 'opacity 400ms ease-in-out',
          }}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="(max-width: 1024px) 100vw, 420px"
          />
        </div>
      ))}

      {/* Dot indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
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

      {/* Location badge */}
      <div className="absolute bottom-4 left-4 bg-lp-yellow text-gray-900 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full flex items-center gap-1.5 z-10">
        <MapPin size={11} strokeWidth={2.5} />
        361 Stagg St, Brooklyn
      </div>
    </div>
  )
}
