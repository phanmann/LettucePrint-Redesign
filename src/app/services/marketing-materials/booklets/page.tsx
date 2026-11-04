import type { Metadata } from 'next'
import MarketingCategoryPage, { type MarketingCategoryGroup } from '@/components/marketing/MarketingCategoryPage'

export const metadata: Metadata = {
  title: 'Booklet Printing',
  description: 'Saddle-stitched, perfect bound, and premium booklets printed in Brooklyn by Lettuce Print.',
}

const GROUPS: MarketingCategoryGroup[] = [
  {
    id: 'saddle-stitch',
    label: 'Saddle-Stitched Booklets',
    description: 'Staple-bound booklets for catalogs, lookbooks, event programs, and product guides — the most cost-effective multi-page format.',
    products: [
      {
        id: 'booklet-ss-55x85', href: '/services/marketing-materials/booklets/saddle-stitch-55x85',
        name: 'Saddle-Stitch Booklet', subtitle: '5.5" × 8.5"',
        description: 'Half-size booklet — compact, easy to carry, and perfect for menus, mini-catalogs, and pocket guides.',
        features: ['80 lb. gloss or matte text', 'Full-color cover & interior', 'Saddle-stitch binding', '8–64 page range'],
        turnaround: '5–7 business days', color: '#E8F5F1',
      },
      {
        id: 'booklet-ss-85x11', href: '/services/marketing-materials/booklets/saddle-stitch-85x11',
        name: 'Saddle-Stitch Booklet', subtitle: '8.5" × 11"',
        description: 'Full letter-size booklet — the standard for lookbooks, product catalogs, annual reports, and event programs.',
        features: ['80 lb. gloss or matte text', 'Full-color cover & interior', 'Saddle-stitch binding', '8–80 page range'],
        turnaround: '5–7 business days', color: '#F5F0E8',
      },
      {
        id: 'booklet-ss-square', href: '/services/marketing-materials/booklets/saddle-stitch-square',
        name: 'Square Saddle-Stitch Booklet', subtitle: '8.5" × 8.5"',
        description: 'Square format for a modern, editorial feel. Stands out on a shelf and works especially well for photo-heavy content.',
        features: ['80 lb. gloss or matte text', 'Full-color throughout', 'Saddle-stitch binding', '8–48 page range'],
        turnaround: '5–7 business days', color: '#E8F0F5',
      },
    ],
  },
  {
    id: 'perfect-bound',
    label: 'Perfect Bound Booklets',
    description: 'Glue-bound with a flat spine — the format for catalogs, magazines, and any booklet you want to look and feel like a real publication.',
    products: [
      {
        id: 'booklet-pb-85x11', href: '/services/marketing-materials/booklets/perfect-bound-85x11',
        name: 'Perfect Bound Booklet', subtitle: '8.5" × 11"',
        description: 'Flat spine, square edges, and a substantial feel. The go-to for product catalogs, brand books, and trade publications.',
        features: ['100 lb. cover stock', '80 lb. interior text', 'Perfect bind (glued spine)', 'Full-color throughout', '48+ pages'],
        turnaround: '7–10 business days', color: '#F0E8F5',
      },
      {
        id: 'booklet-pb-6x9', href: '/services/marketing-materials/booklets/perfect-bound-6x9',
        name: 'Perfect Bound Booklet', subtitle: '6" × 9"',
        description: 'Compact trade-book format. Clean and professional for B2B collateral, directories, and editorial-style publications.',
        features: ['100 lb. cover stock', '80 lb. interior text', 'Perfect bind (glued spine)', 'Full-color throughout', '48+ pages'],
        turnaround: '7–10 business days', color: '#E8F5EF',
      },
    ],
  },
  {
    id: 'premium',
    label: 'Premium Booklets',
    description: 'Elevated production for brands that need their printed collateral to match the quality of their product.',
    products: [
      {
        id: 'booklet-soft-touch', href: '/services/marketing-materials/booklets/soft-touch-cover',
        name: 'Soft Touch Cover Booklet', subtitle: 'Custom sizes available',
        description: 'Saddle-stitch or perfect-bound booklet with a soft-touch laminated cover. The finish that separates a premium brand from everyone else.',
        features: ['Soft-touch laminated cover', '100 lb. interior text', 'Full-color throughout', 'Spot UV on cover available'],
        turnaround: '7–10 business days', color: '#F5E8E8',
      },
    ],
  },
]

export default function BookletsPage() {
  return <MarketingCategoryPage
    title="Booklets built to be read."
    introduction="Saddle-stitched or perfect-bound — we print product catalogs, lookbooks, event programs, and brand books that hold up."
    allLabel="All Booklets"
    groups={GROUPS}
    ctaHeading="Need a specialty binding?"
    ctaText="Tell us the page count, size, and deadline and we'll put together a quote."
  />
}
