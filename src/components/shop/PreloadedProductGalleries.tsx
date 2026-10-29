import { freshClient } from '@/sanity/client'
import { ProductGalleryProvider, type CmsProductGallery } from './ProductGalleryProvider'

// One published-content read supplies every product surface on the initial render.
export default async function PreloadedProductGalleries({ children }: { children: React.ReactNode }) {
  let galleries: Record<string, CmsProductGallery> = {}
  try {
    const rows = await freshClient.fetch<(CmsProductGallery & { productPath: string })[]>(
      '*[_type == "productGallery" && enabled != false] | order(_updatedAt desc) { productPath, galleryBackground, images[]{image, alt, fit, padding} }',
      {}, { cache: 'no-store' },
    )
    for (const row of rows) if (row.productPath && !galleries[row.productPath]) galleries[row.productPath] = row
  } catch {
    // No bundled fallback: client refresh may recover after a CMS outage.
    galleries = {}
  }
  return <ProductGalleryProvider galleries={galleries}>{children}</ProductGalleryProvider>
}
