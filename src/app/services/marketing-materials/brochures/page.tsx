import type { Metadata } from 'next'
import MarketingCategoryPage, { type MarketingCategoryGroup } from '@/components/marketing/MarketingCategoryPage'

export const metadata: Metadata = {
  title: 'Brochure Printing',
  description: 'Bi-fold, tri-fold, and premium brochures printed in Brooklyn by Lettuce Print.',
}

const GROUPS: MarketingCategoryGroup[] = [
  {
    id: 'bi-fold',
    label: 'Bi-Fold Brochures',
    description: 'Four-panel bi-fold brochures — clean, minimal, and easy to design for.',
    products: [
      {
        id: 'brochure-bifold-letter', href: '/services/marketing-materials/brochures/bi-fold-letter',
        name: 'Bi-Fold Brochure', subtitle: '8.5" × 11" folded to 5.5" × 8.5"',
        description: 'Simple, elegant two-fold. A natural fit for lookbooks, service guides, annual reports, and menus.',
        features: ['100 lb. gloss or matte text', 'Full-color both sides', 'Scored & folded', 'Optional lamination'],
        turnaround: '3–5 business days', color: '#E8F0F5',
      },
      {
        id: 'brochure-bifold-tabloid', href: '/services/marketing-materials/brochures/bi-fold-tabloid',
        name: 'Bi-Fold Brochure — Tabloid', subtitle: '11" × 17" folded to 8.5" × 11"',
        description: 'Large-format bi-fold that opens to a full 11×17 spread. Ideal for bold visual campaigns and high-impact presentations.',
        features: ['100 lb. cover stock', 'Full-color both sides', 'Scored & folded', 'Matte or gloss coating'],
        turnaround: '3–5 business days', color: '#F0E8F5',
      },
    ],
  },
  {
    id: 'tri-fold',
    label: 'Tri-Fold Brochures',
    description: 'The classic 6-panel brochure — compact, organized, and works for nearly any industry.',
    products: [
      {
        id: 'brochure-trifold-letter', href: '/services/marketing-materials/brochures/tri-fold-letter',
        name: 'Tri-Fold Brochure', subtitle: '8.5" × 11" folded to 3.67" × 8.5"',
        description: 'The most universally recognized brochure format. Perfect for service menus, product overviews, real estate, and event guides.',
        features: ['100 lb. gloss or matte text', 'Full-color both sides', 'Scored & folded', 'Bulk pricing available'],
        turnaround: '3–5 business days', color: '#E8F5F1',
      },
      {
        id: 'brochure-trifold-legal', href: '/services/marketing-materials/brochures/tri-fold-legal',
        name: 'Tri-Fold Brochure — Legal', subtitle: '8.5" × 14" folded to 4.67" × 8.5"',
        description: 'Wider panel gives you more breathing room for copy-heavy content, photo layouts, or multi-column designs.',
        features: ['100 lb. gloss or matte text', 'Full-color both sides', 'Scored & folded', 'Legal-size extra panel space'],
        turnaround: '3–5 business days', color: '#F5F0E8',
      },
    ],
  },
  {
    id: 'premium',
    label: 'Premium Brochures',
    description: 'Upgraded stocks and finishes for brands that need their collateral to feel as good as it looks.',
    products: [
      {
        id: 'brochure-soft-touch', href: '/services/marketing-materials/brochures/soft-touch',
        name: 'Soft Touch Brochure', subtitle: 'Custom sizes available',
        description: 'Soft-touch laminated cover with offset-quality interior. Leaves a lasting impression at sales meetings, events, and pitch decks.',
        features: ['100 lb. cover stock', 'Soft-touch matte laminate', 'Full-color printing', 'Spot UV available on cover'],
        turnaround: '5–7 business days', color: '#E8F5EF',
      },
      {
        id: 'brochure-uncoated', href: '/services/marketing-materials/brochures/uncoated',
        name: 'Uncoated Brochure', subtitle: 'Custom sizes available',
        description: 'Natural, tactile paper with rich ink absorption — great for a more editorial or artisan brand feel.',
        features: ['100 lb. uncoated text', 'Full-color printing', 'Writable surface', 'Eco-friendly paper options'],
        turnaround: '3–5 business days', color: '#F5E8E8',
      },
    ],
  },
]

export default function BrochuresPage() {
  return <MarketingCategoryPage
    title="Brochures that do the selling."
    introduction="Tri-fold, bi-fold, premium laminated — full-color brochures that make your pitch in the hands of the right person."
    allLabel="All Brochures"
    groups={GROUPS}
    ctaHeading="Need a custom fold or size?"
    ctaText="Tell us the format, quantity, and deadline and we'll put together a quote."
  />
}
