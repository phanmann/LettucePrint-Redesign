import ProductOrderPage, { type PricingRule } from '@/components/shop/ProductOrderPage'
import { FLAT_SHEET_SIZES, printPricingRows } from '@/lib/print-pricing'

// Flyers and brochures share Paper Strategies sizes, stocks and prices.
const SIZE_OPTIONS = [
  { id: FLAT_SHEET_SIZES[0], label: FLAT_SHEET_SIZES[0], description: 'Letter size.' },
  { id: FLAT_SHEET_SIZES[1], label: FLAT_SHEET_SIZES[1], description: 'Tabloid size.' },
  { id: FLAT_SHEET_SIZES[2], label: FLAT_SHEET_SIZES[2], description: 'Oversized tabloid.' },
]

const STOCK_OPTIONS = [
  { id: 'Standard', label: 'Standard', description: '80 lb. C2S gloss text.' },
  { id: 'Premium', label: 'Premium', description: '100 lb. C2S gloss text — heavier feel.' },
]

export default function PrintSheetOrderPage({ product, tagline, fold, breadcrumbLabel, relatedProducts }: {
  product: string
  tagline: string
  /** Fold description shown in specs, e.g. "Flat" or "Tri-fold (scored and folded)". */
  fold: string
  breadcrumbLabel: string
  relatedProducts: { href: string; name: string; description: string; dark?: boolean }[]
}) {
  const pricingRules: PricingRule[] = FLAT_SHEET_SIZES.map(size => ({
    selections: { Size: size },
    pricingTable: printPricingRows(product, size),
  }))

  return (
    <ProductOrderPage
      name={product}
      tagline={tagline}
      parentHref={breadcrumbLabel === 'Flyers' ? '/shop/marketing-materials/flyers' : '/shop/marketing-materials/brochures'}
      breadcrumb={[{ label: breadcrumbLabel, href: breadcrumbLabel === 'Flyers' ? '/shop/marketing-materials/flyers' : '/shop/marketing-materials/brochures' }, { label: product, href: '' }]}
      color="#E8F5F1"
      optionGroups={[
        { label: 'Size', options: SIZE_OPTIONS },
        { label: 'Stock', options: STOCK_OPTIONS },
      ]}
      pricingRules={pricingRules}
      pricingTable={printPricingRows(product, FLAT_SHEET_SIZES[0])}
      pricingNote="Price per order. Shipping calculated at checkout."
      specs={[
        { label: 'Sizes', value: FLAT_SHEET_SIZES.join(', ') + (fold === 'Flat' ? '' : ' (flat size before folding)') },
        { label: 'Stock', value: 'Standard 80 lb. C2S text or Premium 100 lb. C2S text' },
        { label: 'Fold', value: fold },
        { label: 'Color mode', value: 'Full-color CMYK' },
        { label: 'Quantities', value: '100, 250, 500, 1,000' },
        { label: 'Turnaround', value: '5–7 business days after proof approval, plus shipping' },
      ]}
      artworkRequirements={[
        { label: 'Preferred formats', value: 'AI, PDF, EPS' },
        { label: 'Accepted formats', value: 'PSD, PNG, JPG (300 DPI min)' },
        { label: 'Color mode', value: 'CMYK preferred' },
        { label: 'Bleed', value: '0.125 in. on all sides' },
        { label: 'Safe zone', value: '0.125 in. from all edges' },
      ]}
      included={['Digital proof before production', 'Full-color CMYK printing', 'Quality check before ship']}
      relatedProducts={relatedProducts}
    />
  )
}
