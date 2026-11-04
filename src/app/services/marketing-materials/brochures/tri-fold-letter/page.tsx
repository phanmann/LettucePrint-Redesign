import PrintSheetOrderPage from '@/components/marketing/PrintSheetOrderPage'
import { TRI_FOLD_PRODUCT } from '@/lib/print-pricing'

export default function Page() {
  return <PrintSheetOrderPage
    product={TRI_FOLD_PRODUCT}
    breadcrumbLabel="Brochures"
    fold="Tri-fold, scored and folded"
    tagline="The most universally recognized brochure format. Perfect for service menus, product overviews, and event guides."
    relatedProducts={[
      { href: '/services/marketing-materials/brochures/bi-fold-letter', name: 'Bi-Fold Brochure', description: 'Four panels, same sizes.' },
      { href: '/services/marketing-materials/brochures', name: 'All Brochures & Booklets', description: 'Full lineup.', dark: true },
    ]}
  />
}
