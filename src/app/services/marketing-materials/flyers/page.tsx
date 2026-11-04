import type { Metadata } from 'next'
import MarketingCategoryPage from '@/components/marketing/MarketingCategoryPage'
import { FLYERS, POSTERS } from '../category-products'

export const metadata: Metadata = {
  title: 'Flyer & Poster Printing',
  description: 'Flyers and posters in standard sizes and premium finishes, printed in Brooklyn by Lettuce Print.',
}

export default function FlyersAndPostersPage() {
  return <MarketingCategoryPage
    title="Flyers & Posters that move fast."
    introduction="From half-sheet handouts to large-format posters — full-color printing with quick turnaround."
    allLabel="All Flyers & Posters"
    groups={[
      { id: 'flyers', label: 'Flyers', description: 'Half page, full page, and tabloid flyers for handouts, menus, and promotions.', products: FLYERS },
      { id: 'posters', label: 'Posters', description: 'From concert bills to fine-art prints — full-color posters in standard sizes and premium finishes.', products: POSTERS },
    ]}
    ctaHeading="Need a custom size or big quantity?"
    ctaText="We handle large runs efficiently. Tell us the size, quantity, and deadline and we'll make it happen."
  />
}
