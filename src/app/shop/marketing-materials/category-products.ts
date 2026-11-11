import type { MarketingProduct } from '@/components/marketing/MarketingCategoryPage'

export const FLYERS: MarketingProduct[] = [{
  id: 'flyers', href: '/shop/marketing-materials/flyers/full-page', name: 'Flyers',
  subtitle: 'Half page, letter, tabloid & oversized',
  description: 'Full-color flyers for handouts, menus, and promotions. Choose your size and paper options when ordering.',
  color: '#E8F5F1',
  options: [{ label: 'Size', values: ['5.5" × 8.5"', '8.5" × 11"', '11" × 17"', '12" × 18"'] }],
  features: ['Full-color CMYK printing', 'Size-specific paper options', 'Online pricing for letter and larger sizes', 'Half-page pricing by quote'],
  turnaround: 'Confirmed with your selected size',
}]

export const POSTERS: MarketingProduct[] = [{
  id: 'posters', href: '/shop/marketing-materials/posters/small', name: 'Posters',
  subtitle: '11" × 17" · 18" × 24" · 24" × 36"',
  description: 'Full-color posters for retail displays, events, and storefronts. Choose your size when ordering.',
  color: '#E8F5F1',
  options: [{ label: 'Size', values: ['11" × 17"', '18" × 24"', '24" × 36"'] }],
  features: ['Gloss or matte finish', '100 lb. text or cover stock', 'Full-color CMYK printing', 'Pricing by quote'],
  turnaround: '2–3 business days',
}]

export const BROCHURES: MarketingProduct[] = [
  {
    id: 'brochure-bifold-letter',
    href: '/shop/marketing-materials/brochures/bi-fold-letter',
    name: 'Bi-Fold Brochure',
    subtitle: '8.5" × 11" · 11" × 17" · 12" × 18" (flat)',
    description: 'Simple, elegant two-fold. A natural fit for lookbooks, service guides, annual reports, and menus. From $49 for 100.',
    features: ['80 or 100 lb. C2S gloss text', 'Full-color printing', 'Scored & folded', 'Online pricing'],
    turnaround: '5–7 business days',
    color: '#E8F0F5',
  },
  {
    id: 'brochure-trifold-letter',
    href: '/shop/marketing-materials/brochures/tri-fold-letter',
    name: 'Tri-Fold Brochure',
    subtitle: '8.5" × 11" · 8.5" × 14" · 11" × 17" · 12" × 18" (flat)',
    description: 'The most universally recognized brochure format. Perfect for service menus, product overviews, real estate, and event guides. From $49 for 100.',
    features: ['80 or 100 lb. C2S gloss text', 'Full-color printing', 'Scored & folded', 'Online pricing'],
    turnaround: '5–7 business days',
    color: '#E8F5F1',
  },
]

export const BOOKLETS: MarketingProduct[] = [
  {
    id: 'booklet-ss-55x85',
    href: '/shop/marketing-materials/booklets/saddle-stitch-55x85',
    name: 'Saddle-Stitch Booklet',
    subtitle: '5.5" × 8.5" · 8.5" × 11" · 8.5" × 8.5"',
    description: 'Saddle-stitch booklets for menus, catalogs, and programs. Choose your size in Order Details.',
    features: ['80 lb. gloss or matte text', 'Full-color cover & interior', 'Saddle-stitch binding', 'Page count confirmed with quote'],
    turnaround: '5–7 business days',
    color: '#E8F5F1',
  },
  {
    id: 'booklet-pb-85x11',
    href: '/shop/marketing-materials/booklets/perfect-bound-85x11',
    name: 'Perfect Bound Book',
    subtitle: '8.5" × 11" · 6" × 9"',
    description: 'Flat spine, square edges, and a substantial feel. The go-to for product catalogs, brand books, and trade publications.',
    features: ['100 lb. cover stock', '80 lb. interior text', 'Perfect bind (glued spine)', 'Full-color throughout', '48+ pages'],
    turnaround: '7–10 business days',
    color: '#F0E8F5',
  },
]
