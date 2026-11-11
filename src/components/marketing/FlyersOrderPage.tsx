'use client'

import { useState } from 'react'
import ProductOrderPage from '@/components/shop/ProductOrderPage'
import { FLAT_SHEET_SIZES, FLYERS_PRODUCT, printPricingRows } from '@/lib/print-pricing'

const HALF = '5.5" × 8.5"'
const sizes = [HALF, ...FLAT_SHEET_SIZES]

export default function FlyersOrderPage({ initialSize = FLAT_SHEET_SIZES[0] }: { initialSize?: string }) {
  const [size, setSize] = useState(initialSize)
  const half = size === HALF
  return <ProductOrderPage
    key={half ? 'half' : 'priced'}
    captureConfiguration
    name="Flyers"
    cartProductName={half ? 'Half Page Flyers' : FLYERS_PRODUCT}
    tagline="Full-color flyers for handouts, menus, launches, and promotions. Select your size and available paper options below."
    parentHref="/shop/marketing-materials/flyers"
    breadcrumb={[{ label: 'Flyers & Posters', href: '/shop/marketing-materials/flyers' }, { label: 'Flyers', href: '' }]}
    color="#E8F5F1"
    galleryPath={half ? '/shop/marketing-materials/flyers/half-page' : '/shop/marketing-materials/flyers/full-page'}
    cartPathsBySize={{
      [HALF]: '/shop/marketing-materials/flyers/half-page',
      [FLAT_SHEET_SIZES[0]]: '/shop/marketing-materials/flyers/full-page',
      [FLAT_SHEET_SIZES[1]]: '/shop/marketing-materials/flyers/full-page?size=tabloid',
      [FLAT_SHEET_SIZES[2]]: '/shop/marketing-materials/flyers/full-page?size=oversized',
    }}
    initialSelections={{ Size: size }}
    onSizeChange={setSize}
    showQuantity={half}
    initialQuantity={250}
    minimumQuantity={100}
    optionGroups={[
      { label: 'Size', options: sizes.map((value, i) => ({ id: value, label: value, description: ['Half page — pricing by quote.', 'Letter size.', 'Tabloid size.', 'Oversized tabloid.'][i] })) },
      ...(half ? [
        { label: 'Finish', options: [
          { id: 'gloss', label: 'Gloss', description: 'High-shine coating.' },
          { id: 'matte', label: 'Matte', description: 'Soft, non-reflective finish.' },
        ] },
        { label: 'Stock', options: [
          { id: '80lb-text', label: '80 lb. Text', description: 'Standard lightweight paper.' },
          { id: '100lb-cover', label: '100 lb. Cover', description: 'Heavier premium feel.' },
        ] },
        { label: 'Printing sides', options: [
          { id: 'double', label: 'Double-Sided', description: 'Print on both sides.' },
          { id: 'single', label: 'Single-Sided', description: 'Front only.' },
        ] },
      ] : [{ label: 'Stock', options: [
        { id: 'Standard', label: 'Standard', description: '80 lb. C2S gloss text.' },
        { id: 'Premium', label: 'Premium', description: '100 lb. C2S gloss text — heavier feel.' },
      ] }]),
    ]}
    pricingRules={half ? undefined : FLAT_SHEET_SIZES.map(value => ({ selections: { Size: value }, pricingTable: printPricingRows(FLYERS_PRODUCT, value) }))}
    pricingNote="Price per order. Shipping calculated at checkout."
    specs={[
      { label: 'Sizes', value: sizes.join(', ') },
      { label: 'Stock', value: half ? '80 lb. text or 100 lb. cover' : 'Standard 80 lb. or Premium 100 lb. C2S gloss text' },
      { label: 'Color mode', value: 'Full-color CMYK' },
      { label: 'Turnaround', value: half ? '1–2 business days after approval; confirmed with quote' : '5–7 business days after proof approval, plus shipping' },
    ]}
    artworkRequirements={[
      { label: 'Preferred formats', value: 'AI, PDF, EPS' },
      { label: 'Accepted formats', value: 'PSD, PNG, JPG (300 DPI min)' },
      { label: 'Bleed', value: '0.125 in. on all sides' },
      { label: 'Safe zone', value: '0.125 in. from all edges' },
    ]}
    included={['Digital proof before production', 'Full-color CMYK printing', 'Quality check before ship']}
    customNote={half ? 'Half-page flyers are quoted individually. We will confirm pricing and turnaround before production.' : undefined}
    relatedProducts={[{ href: '/shop/marketing-materials/flyers', name: 'All Flyers & Posters', description: 'Browse posters and specialty finishes.' }]}
  />
}
