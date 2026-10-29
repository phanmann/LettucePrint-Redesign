import PreloadedProductGalleries from '@/components/shop/PreloadedProductGalleries'

const paths = [
  '/services/signage/backdrops/step-repeat-8x8',
  '/services/signage/backdrops/step-repeat-10x8',
]

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <PreloadedProductGalleries paths={paths}>{children}</PreloadedProductGalleries>
}
