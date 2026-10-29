import PreloadedProductGalleries from '@/components/shop/PreloadedProductGalleries'

const paths = [
  '/services/signage/banners/vinyl-banner',
  '/services/signage/banners/fabric-banner',
  '/services/signage/banners/mesh-banner',
]

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <PreloadedProductGalleries paths={paths}>{children}</PreloadedProductGalleries>
}
