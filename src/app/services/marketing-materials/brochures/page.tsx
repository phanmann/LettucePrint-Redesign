import type { Metadata } from 'next'
import MarketingCategoryPage from '@/components/marketing/MarketingCategoryPage'
import { BOOKLETS, BROCHURES } from '../category-products'

export const metadata: Metadata = {
  title: 'Brochure & Booklet Printing',
  alternates: { canonical: 'https://lettuceprint.com/services/marketing-materials/brochures' },
  description: 'Bi-fold and tri-fold brochures, saddle-stitched and perfect-bound booklets, printed in Brooklyn by Lettuce Print.',
}

export default function BrochuresAndBookletsPage() {
  return <MarketingCategoryPage
    title="Brochures & Booklets that do the selling."
    introduction="Tri-fold and bi-fold brochures, saddle-stitched and perfect-bound booklets — full-color printing that holds up."
    allLabel="All Brochures & Booklets"
    groups={[
      { id: 'brochures', label: 'Brochures', description: 'Tri-fold, bi-fold, premium laminated — full-color brochures that make your pitch in the hands of the right person.', products: BROCHURES },
      { id: 'booklets', label: 'Booklets', description: 'Saddle-stitched or perfect-bound — product catalogs, lookbooks, event programs, and brand books that hold up.', products: BOOKLETS },
    ]}
    ctaHeading="Need a custom fold, binding, or size?"
    ctaText="Tell us the format, quantity, and deadline and we'll put together a quote."
  />
}
