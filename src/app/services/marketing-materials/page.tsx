import type { Metadata } from 'next'
import MarketingMaterialsCatalog from './MarketingMaterialsCatalog'

export const metadata: Metadata = {
  title: 'Marketing Materials Printing',
  description: 'Business cards, postcards, brochures, flyers, posters, and booklets printed by Lettuce Print in Brooklyn.',
  alternates: { canonical: 'https://lettuceprint.com/services/marketing-materials' },
}

export default function MarketingMaterialsPage() {
  return <MarketingMaterialsCatalog />
}
