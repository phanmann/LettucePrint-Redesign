import type { Metadata } from 'next'
import MarketingCategoryPage, { type MarketingCategoryGroup } from '@/components/marketing/MarketingCategoryPage'

export const metadata: Metadata = {
  title: 'Poster Printing',
  description: 'Standard and premium posters printed in Brooklyn by Lettuce Print.',
}

const GROUPS: MarketingCategoryGroup[] = [
  {
    id: 'standard',
    label: 'Standard Posters',
    description: 'Full-color posters in the most common sizes — concerts, retail, events, and everything in between.',
    products: [
      {
        id: 'poster-11x17', href: '/services/marketing-materials/posters/small',
        name: 'Small Poster', subtitle: '11" × 17"',
        description: 'The classic concert bill size. Works everywhere — bulletin boards, windows, retail counters, and bar walls.',
        features: ['80 lb. gloss or matte text', 'Full-color printing', 'Crisp edge-to-edge coverage', 'Bulk pricing available'],
        turnaround: '1–2 business days', color: '#E8F5F1',
      },
      {
        id: 'poster-18x24', href: '/services/marketing-materials/posters/medium',
        name: 'Medium Poster', subtitle: '18" × 24"',
        description: 'Standard poster size for retail displays, in-store promotions, event signage, and gallery prints.',
        features: ['80 lb. gloss or matte text', 'Full-color printing', 'Vivid, accurate color reproduction', 'Optional lamination'],
        turnaround: '2–3 business days', color: '#F5F0E8',
      },
      {
        id: 'poster-24x36', href: '/services/marketing-materials/posters/large',
        name: 'Large Poster', subtitle: '24" × 36"',
        description: 'Movie-poster size. Maximum impact for storefronts, events, trade shows, and gallery spaces.',
        features: ['80 lb. or 100 lb. stock', 'Full-color printing', 'Matte or gloss finish', 'Optional tube rolling'],
        turnaround: '2–3 business days', color: '#E8F0F5',
      },
    ],
  },
  {
    id: 'premium',
    label: 'Premium Posters',
    description: 'Elevated paper stocks and finishes for art prints, limited editions, and high-end brand collateral.',
    products: [
      {
        id: 'poster-art-print', href: '/services/marketing-materials/posters/art-print',
        name: 'Art Print Poster', subtitle: 'Custom sizes available',
        description: 'Heavy-weight uncoated stock for a fine-art feel — rich ink absorption, matte surface, and museum-quality output.',
        features: ['100 lb. uncoated cover', 'Fine-art quality output', 'Accurate color profiling', 'Custom sizes available'],
        turnaround: '3–5 business days', color: '#F0E8F5',
      },
      {
        id: 'poster-soft-touch', href: '/services/marketing-materials/posters/soft-touch',
        name: 'Soft Touch Poster', subtitle: 'Custom sizes available',
        description: 'Velvety soft-touch laminate over a heavy stock base — tactile luxury for limited edition prints, brand activations, and retail.',
        features: ['100 lb. cover stock', 'Soft-touch matte laminate', 'Full-color printing', 'Spot UV available'],
        turnaround: '3–5 business days', color: '#E8F5EF',
      },
    ],
  },
]

export default function PostersPage() {
  return <MarketingCategoryPage
    title="Posters that command the room."
    introduction="From concert bills to fine-art prints — full-color posters in standard sizes and premium finishes, printed in Brooklyn."
    allLabel="All Posters"
    groups={GROUPS}
    ctaHeading="Need a custom size or big quantity?"
    ctaText="We handle large runs efficiently. Tell us the size, quantity, and deadline and we'll make it happen."
  />
}
