'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/image'
import { useInitialProductGalleries, type CmsProductGallery } from './ProductGalleryProvider'

interface CollectionGalleryProps {
  // CMS gallery paths in priority order; images are combined and de-duplicated by asset.
  sources: string[]
  label: string
}

export default function CollectionGallery({ sources, label }: CollectionGalleryProps) {
  const initial = useInitialProductGalleries()
  const [galleries, setGalleries] = useState(initial)
  const [active, setActive] = useState(0)
  const sourceKey = sources.join('|')

  useEffect(() => {
    let cancelled = false
    Promise.all(sourceKey.split('|').map(async path => {
      try {
        const response = await fetch('/api/product-gallery?productPath=' + encodeURIComponent(path), { cache: 'no-store' })
        if (!response.ok) throw new Error('Gallery unavailable')
        return [path, await response.json() as CmsProductGallery | null] as const
      } catch {
        return [path, initial[path] ?? null] as const
      }
    })).then(entries => { if (!cancelled) setGalleries(previous => ({ ...previous, ...Object.fromEntries(entries) })) })
    return () => { cancelled = true }
  }, [sourceKey, initial])

  const images = useMemo(() => {
    const seen = new Set<string>()
    return sources.flatMap(path => (galleries[path]?.images ?? []).flatMap(item => {
      if (!item.image) return []
      const image = item.image as { asset?: { _ref?: string; _id?: string } }
      const identity = image.asset?._ref ?? image.asset?._id ?? urlFor(item.image).url()
      if (seen.has(identity)) return []
      seen.add(identity)
      const contain = item.fit === 'contain'
      const builder = contain ? urlFor(item.image).width(1400).fit('max') : urlFor(item.image).width(1400).height(1050).fit('crop')
      return [{
        key: identity,
        src: builder.auto('format').quality(90).url(),
        thumb: urlFor(item.image).width(160).height(160).fit('crop').auto('format').url(),
        alt: item.alt || label,
        contain,
        padding: contain ? (item.padding ?? 16) : 0,
      }]
    }))
  }, [galleries, sources, label])

  if (images.length === 0) return null
  const current = images[Math.min(active, images.length - 1)]

  return (
    <div className="mt-10 max-w-xl" role="group" aria-label={`${label} gallery`} data-collection-gallery={sources[0]}>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card border border-gray-100 bg-gray-50">
        <Image
          src={current.src}
          alt={current.alt}
          fill
          className={current.contain ? 'object-contain' : 'object-cover'}
          style={{ padding: current.padding }}
          sizes="(max-width: 1024px) 100vw, 40vw"
        />
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {images.map((image, i) => (
            <button
              key={image.key}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1} of ${images.length}: ${image.alt}`}
              aria-pressed={image.key === current.key}
              className={`relative h-16 w-16 overflow-hidden rounded-md border-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-lp-green ${image.key === current.key ? 'border-lp-green' : 'border-gray-200 hover:border-gray-400'}`}
            >
              <Image src={image.thumb} alt="" fill className="object-cover" sizes="64px" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
