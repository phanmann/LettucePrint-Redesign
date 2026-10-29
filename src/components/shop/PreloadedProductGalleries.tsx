import { freshClient } from '@/sanity/client'
import { productGalleryByPathQuery } from '@/sanity/queries'
import { ProductGalleryProvider, type CmsProductGallery } from './ProductGalleryProvider'

// Read on each server render, so Studio edits do not require a site rebuild.
export default async function PreloadedProductGalleries({ paths, children }: {
  paths: string[]
  children: React.ReactNode
}) {
  const entries = await Promise.all(paths.map(async productPath => {
    try {
      const gallery = await freshClient.fetch<CmsProductGallery | null>(
        productGalleryByPathQuery, { productPath }, { cache: 'no-store' },
      )
      return [productPath, gallery] as const
    } catch {
      // Preserve the bundled fallback during a CMS outage; the client can retry.
      return [productPath, null] as const
    }
  }))
  return (
    <ProductGalleryProvider galleries={Object.fromEntries(entries)}>
      {children}
    </ProductGalleryProvider>
  )
}
