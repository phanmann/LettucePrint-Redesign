import PrintSheetOrderPage from '@/components/marketing/PrintSheetOrderPage'
import { FLYERS_PRODUCT } from '@/lib/print-pricing'

export default function Page() {
  return <PrintSheetOrderPage
    product={FLYERS_PRODUCT}
    breadcrumbLabel="Flyers"
    fold="Flat"
    tagline="Full-color flyers for handouts, menus, launches, and promotions. Letter, tabloid, or 12 × 18 in., on standard or premium stock."
    relatedProducts={[
      { href: '/services/marketing-materials/flyers', name: 'All Flyers & Posters', description: 'Flyers and posters.' },
      { href: '/services/marketing-materials/brochures', name: 'Brochures & Booklets', description: 'Bi-fold, tri-fold, and booklets.', dark: true },
    ]}
  />
}
