import PrintSheetOrderPage from '@/components/marketing/PrintSheetOrderPage'
import { BI_FOLD_PRODUCT } from '@/lib/print-pricing'

export default function Page() {
  return <PrintSheetOrderPage
    product={BI_FOLD_PRODUCT}
    breadcrumbLabel="Brochures"
    fold="Bi-fold (half fold), scored and folded"
    tagline="Simple, elegant two-fold. A natural fit for lookbooks, service guides, and menus."
    relatedProducts={[
      { href: '/shop/marketing-materials/brochures/tri-fold-letter', name: 'Tri-Fold Brochure', description: 'Six panels, same sizes.' },
      { href: '/shop/marketing-materials/brochures', name: 'All Brochures & Booklets', description: 'Full lineup.', dark: true },
    ]}
  />
}
