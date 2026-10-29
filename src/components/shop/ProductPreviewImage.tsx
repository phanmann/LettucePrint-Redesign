'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/image'
import { useInitialProductGallery, type CmsProductGallery } from './ProductGalleryProvider'

interface ProductPreviewImageProps {
  productPath: string
  alt: string
  className?: string
  sizes: string
  priority?: boolean
}

export default function ProductPreviewImage(props: ProductPreviewImageProps) {
  return <ProductPreviewImageForPath key={props.productPath} {...props} />
}

function ProductPreviewImageForPath({
  productPath,
  alt,
  className = '',
  sizes,
  priority = false,
}: ProductPreviewImageProps) {
  const [cmsPreview, setCmsPreview] = useState<CmsProductGallery | null>(useInitialProductGallery(productPath))

  useEffect(() => {
    let cancelled = false

    if (!productPath.startsWith('/services/') && !productPath.startsWith('/shop/')) return
    fetch(`/api/product-gallery?productPath=${encodeURIComponent(productPath)}`, {
      cache: 'no-store',
    })
      .then(response => {
        if (!response.ok) throw new Error(`Product preview request failed: ${response.status}`)
        return response.json() as Promise<CmsProductGallery | null>
      })
      .then(preview => {
        if (!cancelled) setCmsPreview(preview)
      })
      .catch(() => {
        // Keep the server-resolved image on a transient refresh failure.
      })

    return () => {
      cancelled = true
    }
  }, [productPath])

  const resolved = useMemo(() => {
    const first = cmsPreview?.images?.[0]
    if (!first?.image) {
      return null
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
  }, [alt, cmsPreview])

  if (!resolved) return <div role="img" aria-label={`${alt}: image unavailable`} data-product-preview={productPath} data-preview-source="empty" className="absolute inset-0 flex items-center justify-center bg-gray-50 text-sm text-gray-500">Image coming soon</div>

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
