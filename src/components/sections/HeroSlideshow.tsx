'use client'

import Image from 'next/image'
import { urlFor } from '@/sanity/image'
import { useInitialProductGalleries, type CmsProductGallery } from '@/components/shop/ProductGalleryProvider'
import { useEffect, useMemo, useState } from 'react'

const sources = [
  { path: '/shop/roll-labels', alt: 'Lettuce Print roll labels', all: true },
  { path: '/shop/stickers', alt: 'Lettuce Print custom stickers', all: true },
  { path: '/shop/spot-uv', alt: 'Lettuce Print Spot UV stickers' },
  { path: '/services/packaging/mylar-bags/standard', alt: 'Lettuce Print custom Mylar bags' },
  { path: '/services/signage/banners/retractable-standard', alt: 'Lettuce Print retractable banners' },
  { path: '/services/signage/backdrops/seg-10x8', alt: 'Lettuce Print SEG backdrops' },
  { path: '/services/stickers/rolllabels', alt: 'Lettuce Print roll labels', all: true },
  { path: '/services/signage/backdrops', alt: 'Lettuce Print large format', all: true },
  { path: '/services/apparel/screenprint', alt: 'Lettuce Print screen printing', all: true },
  { path: '/services/signage', alt: 'Lettuce Print signage', all: true },
  { path: '/services/packaging', alt: 'Lettuce Print packaging', all: true },
]

export default function HeroSlideshow() {
  const initial = useInitialProductGalleries()
  const [galleries, setGalleries] = useState(initial)
  useEffect(() => {
    let cancelled = false
    Promise.all(sources.map(async source => {
      try {
        const response = await fetch('/api/product-gallery?productPath=' + encodeURIComponent(source.path), { cache: 'no-store' })
        if (!response.ok) throw new Error('Gallery unavailable')
        return [source.path, await response.json() as CmsProductGallery | null] as const
      } catch {
        return [source.path, initial[source.path] ?? null] as const
      }
    })).then(entries => { if (!cancelled) setGalleries(Object.fromEntries(entries)) })
    return () => { cancelled = true }
  }, [initial])
  const slides = useMemo(() => {
    const seen = new Set<string>()
    return sources.flatMap(source => {
      const gallery = galleries[source.path]
      const images = source.all ? gallery?.images : gallery?.images?.slice(0, 1)
      return (images ?? []).flatMap((item) => {
        if (!item.image) return []
        const image = item.image as { asset?: { _ref?: string; _id?: string } }
        const identity = image.asset?._ref ?? image.asset?._id ?? urlFor(item.image).url()
        if (seen.has(identity)) return []
        seen.add(identity)
        const contain = item.fit === 'contain'
        const builder = contain ? urlFor(item.image).width(1200).fit('max') : urlFor(item.image).width(1200).height(800).fit('crop')
        return [{ key: identity, path: source.path, src: builder.auto('format').quality(90).url(), alt: item.alt || source.alt, contain, padding: contain ? (item.padding ?? 16) : 0 }]
      })
    })
  }, [galleries])
  const [current, setCurrent] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    if (slides.length < 2) return
    let fadeTimeout: ReturnType<typeof setTimeout> | undefined
    const interval = setInterval(() => {
      setFading(true)
      fadeTimeout = setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length)
        setFading(false)
      }, 400) // crossfade duration
    }, 3000) // 3 seconds per slide

    return () => { clearInterval(interval); clearTimeout(fadeTimeout) }
  }, [slides.length])

  return (
    <div className="relative rounded-card overflow-hidden h-[280px] lg:h-[340px] bg-gray-900">
      {slides.length === 0 && <div className="absolute inset-0 flex items-center justify-center bg-gray-50 text-gray-500">Image coming soon</div>}
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={slide.key}
          className="absolute inset-0 transition-opacity duration-400"
          style={{
            opacity: i === current % Math.max(slides.length, 1) ? (fading ? 0 : 1) : 0,
            transition: 'opacity 400ms ease-in-out',
          }}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className={slide.contain ? 'object-contain bg-white' : 'object-cover'}
            style={{ padding: slide.padding }}
            priority={i === 0}
            sizes="(max-width: 1024px) 100vw, 420px"
            data-product-preview={slide.path}
            data-preview-source="sanity"
          />
        </div>
      ))}

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-1.5 z-10 max-w-[90%]">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => { setFading(false); setCurrent(i) }}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === current % Math.max(slides.length, 1) ? '20px' : '6px',
              height: '6px',
              backgroundColor: i === current % Math.max(slides.length, 1) ? '#ffffff' : 'rgba(255,255,255,0.45)',
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

    </div>
  )
}
