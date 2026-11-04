import type { Metadata } from 'next'
import MarketingCategoryPage, { type MarketingCategoryGroup } from '@/components/marketing/MarketingCategoryPage'

export const metadata: Metadata = {
  title: 'Flyer Printing',
  description: 'Half page, full page, and tabloid flyers printed in Brooklyn by Lettuce Print.',
}

const GROUPS: MarketingCategoryGroup[] = [
  {
    id: 'half-page',
    label: 'Half Page Flyer',
    description: 'Compact and cost-effective — perfect for handouts, rack cards, and high-volume distribution.',
    products: [{
      id: 'flyer-half', href: '/services/marketing-materials/flyers/half-page',
      name: 'Half Page Flyer', subtitle: '5.5" × 8.5"',
      description: 'The workhorse handout. Fits in bags, pockets, and racks. Great for menus, event promos, and retail inserts.',
      color: '#E8F5F1',
      options: [
        { label: 'Size', values: ['5.5" × 8.5"'] },
        { label: 'Stock', values: ['80 lb. Gloss', '80 lb. Matte', '100 lb. Cover'] },
        { label: 'Sides', values: ['Single-sided', 'Double-sided'] },
      ],
      features: ['80–100 lb. stock options', 'Full-color CMYK printing', 'Gloss or matte finish', 'Single or double-sided', 'Bulk pricing available'],
      turnaround: '1–2 business days',
    }],
  },
  {
    id: 'full-page',
    label: 'Full Page Flyer',
    description: 'Standard 8.5" × 11" flyers for maximum visual impact — the format people expect.',
    products: [{
      id: 'flyer-full', href: '/services/marketing-materials/flyers/full-page',
      name: 'Full Page Flyer', subtitle: '8.5" × 11"',
      description: 'Full letter-size flyers in gloss, matte, or heavy cover stock. High-volume or premium — your call.',
      color: '#E8F0F5',
      options: [
        { label: 'Size', values: ['8.5" × 11"'] },
        { label: 'Finish', values: ['Gloss', 'Matte', 'Heavy Stock'] },
        { label: 'Sides', values: ['Single-sided', 'Double-sided'] },
      ],
      features: ['80 lb. gloss or matte text', '100 lb. cover option', 'Full-color CMYK printing', 'Single or double-sided', 'Bulk pricing available'],
      turnaround: '1–2 business days',
    }],
  },
  {
    id: 'tabloid',
    label: 'Tabloid Flyer',
    description: 'Tabloid-sized flyers for maximum presence — menus, posters, event sheets, and retail displays.',
    products: [{
      id: 'flyer-tabloid', href: '/services/marketing-materials/flyers/tabloid',
      name: 'Tabloid Flyer', subtitle: '11" × 17"',
      description: 'Twice the real estate of a letter flyer. Perfect for menus, in-store promotions, concert bills, and display boards.',
      color: '#E8F5EF',
      options: [
        { label: 'Size', values: ['11" × 17"'] },
        { label: 'Finish', values: ['Gloss', 'Matte'] },
        { label: 'Sides', values: ['Single-sided', 'Double-sided'] },
      ],
      features: ['80 lb. gloss or matte text', 'Full-color CMYK printing', 'Single or double-sided', 'Folding available', 'Bulk pricing available'],
      turnaround: '2–3 business days',
    }],
  },
]

export default function FlyersPage() {
  return <MarketingCategoryPage
    title="Flyers that move fast."
    introduction="From half-sheet handouts to tabloid sheets — full-color printing with quick turnaround."
    allLabel="All Flyers"
    groups={GROUPS}
    ctaHeading="Need a custom size or big quantity?"
    ctaText="We handle large runs efficiently. Tell us the size, quantity, and deadline and we'll make it happen."
  />
}
