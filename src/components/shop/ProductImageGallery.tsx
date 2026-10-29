'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { urlFor } from '@/sanity/image'
import { useInitialProductGallery, type CmsProductGallery } from './ProductGalleryProvider'

interface ProductImageGalleryProps {
  background?: 'white' | 'muted'
}

export default function ProductImageGallery(props: ProductImageGalleryProps) {
  const pathname = usePathname()
  return <ProductImageGalleryForPath key={pathname} pathname={pathname} {...props} />
}

function ProductImageGalleryForPath({ background = 'muted', pathname }: ProductImageGalleryProps & { pathname: string }) {
  const [active, setActive] = useState(0)
  const [cmsGallery, setCmsGallery] = useState<CmsProductGallery | null>(useInitialProductGallery(pathname))

  useEffect(() => {
    let cancelled = false

    fetch(`/api/product-gallery?productPath=${encodeURIComponent(pathname)}`, {
      cache: 'no-store',
    })
      .then(response => {
        if (!response.ok) throw new Error(`Gallery request failed: ${response.status}`)
        return response.json() as Promise<CmsProductGallery | null>
      })
      .then(gallery => {
        if (!cancelled) setCmsGallery(gallery)
      })
      .catch(() => {
        // Keep the server-resolved gallery on a transient refresh failure.
      })

    return () => {
      cancelled = true
    }
  }, [pathname])

  const cmsImages = useMemo(() => {
    if (!cmsGallery?.images?.length) return []

    return cmsGallery.images.flatMap(item => {
      if (!item.image) return []

      const fit: 'cover' | 'contain' = item.fit === 'cover' ? 'cover' : 'contain'
      const builder = fit === 'cover'
        ? urlFor(item.image).width(1600).height(1600).fit('crop')
        : urlFor(item.image).width(1600).fit('max')

      return [{
        src: builder.auto('format').quality(90).url(),
        alt: item.alt || 'Product image',
        fit,
        padding: fit === 'contain' ? (item.padding ?? 16) : 0,
      }]
    })
  }, [cmsGallery])

  const resolvedImages = cmsImages
  const resolvedBackground = cmsImages.length > 0
    ? (cmsGallery?.galleryBackground ?? background)
    : background

  if (resolvedImages.length === 0) return <div data-product-gallery={pathname} data-gallery-source="empty" role="img" aria-label="Product image unavailable" className="mb-8 aspect-square rounded-card bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500">Image coming soon</div>
  const activeIndex = Math.min(active, resolvedImages.length - 1)

  return (
    <div className="mb-8" data-product-gallery={pathname} data-gallery-source={cmsImages.length > 0 ? 'sanity' : 'empty'}>
      {/* Main image */}
      <div className={`relative w-full aspect-square rounded-card overflow-hidden ${resolvedBackground === 'white' ? 'bg-white' : 'bg-gray-50'} border border-gray-100 mb-3`}>
        <Image
          src={resolvedImages[activeIndex].src}
          alt={resolvedImages[activeIndex].alt}
          fill
          className={`${resolvedImages[activeIndex].fit === 'contain' ? 'object-contain' : 'object-cover'} transition-opacity duration-200`}
          style={{ padding: resolvedImages[activeIndex].fit === 'contain' ? (resolvedImages[activeIndex].padding ?? 16) : 0 }}
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Thumbnails — left-aligned */}
      {resolvedImages.length > 1 && (
        <div className="flex items-center gap-2 flex-wrap">
          {resolvedImages.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={`relative w-16 h-16 rounded-md overflow-hidden border-2 flex-shrink-0 transition-all duration-150 ${resolvedBackground === 'white' ? 'bg-white' : ''} ${
                i === activeIndex
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
