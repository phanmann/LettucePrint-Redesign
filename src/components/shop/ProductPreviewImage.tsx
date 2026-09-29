'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/image'

interface CmsProductPreview {
  galleryBackground?: 'white' | 'muted'
  images?: {
    image?: unknown
    alt?: string
    fit?: 'cover' | 'contain'
    padding?: number
  }[]
}

interface ProductPreviewImageProps {
  productPath: string
  fallbackSrc: string
  alt: string
  fallbackFit?: 'cover' | 'contain'
  className?: string
  sizes: string
  priority?: boolean
}

export default function ProductPreviewImage({
  productPath,
  fallbackSrc,
  alt,
  fallbackFit = 'cover',
  className = '',
  sizes,
  priority = false,
}: ProductPreviewImageProps) {
  const [cmsPreview, setCmsPreview] = useState<CmsProductPreview | null>(null)

  useEffect(() => {
    let cancelled = false

    if (!productPath.startsWith('/services/') && !productPath.startsWith('/shop/')) return
    fetch(`/api/product-gallery?productPath=${encodeURIComponent(productPath)}`, {
      cache: 'no-store',
    })
      .then(response => {
        if (!response.ok) throw new Error(`Product preview request failed: ${response.status}`)
        return response.json() as Promise<CmsProductPreview | null>
      })
      .then(preview => {
        if (!cancelled) setCmsPreview(preview)
      })
      .catch(() => {
        if (!cancelled) setCmsPreview(null)
      })

    return () => {
      cancelled = true
    }
  }, [productPath])

  const resolved = useMemo(() => {
    const first = cmsPreview?.images?.[0]
    if (!first?.image) {
      return {
        src: fallbackSrc,
        alt,
        fit: fallbackFit,
        padding: fallbackFit === 'contain' ? 8 : 0,
        background: 'muted' as const,
        source: 'fallback' as const,
      }
    }

    const fit: 'cover' | 'contain' = first.fit === 'contain' ? 'contain' : 'cover'
    const builder = fit === 'cover'
      ? urlFor(first.image).width(1200).height(800).fit('crop')
      : urlFor(first.image).width(1200).fit('max')

    return {
      src: builder.auto('format').quality(90).url(),
      alt: first.alt || alt,
      fit,
      padding: fit === 'contain' ? (first.padding ?? 16) : 0,
      background: cmsPreview?.galleryBackground === 'white' ? 'white' as const : 'muted' as const,
      source: 'sanity' as const,
    }
  }, [alt, cmsPreview, fallbackFit, fallbackSrc])

  return (
    <Image
      src={resolved.src}
      alt={resolved.alt}
      fill
      className={`${resolved.fit === 'contain' ? 'object-contain' : 'object-cover'} ${
        resolved.background === 'white' ? 'bg-white' : 'bg-gray-50'
      } ${className}`}
      style={{ padding: resolved.padding }}
      sizes={sizes}
      priority={priority}
      data-product-preview={productPath}
      data-preview-source={resolved.source}
    />
  )
}
