'use client'

import { useState } from 'react'
import ProductOrderPage from '@/components/shop/ProductOrderPage'
import { FLAT_SHEET_SIZES, TRI_FOLD_PRODUCT, printPricingRows } from '@/lib/print-pricing'

const LEGAL = '8.5" × 14"'
const sizes = [LEGAL, ...FLAT_SHEET_SIZES]

export default function TriFoldOrderPage({ initialSize = FLAT_SHEET_SIZES[0] }: { initialSize?: string }) {
  const [size, setSize] = useState(initialSize)
  const legal = size === LEGAL
  return <ProductOrderPage
    key={legal ? 'legal' : 'priced'}
    captureConfiguration
    name="Tri-Fold Brochure"
    cartProductName={legal ? 'Tri-Fold Brochure - Legal' : TRI_FOLD_PRODUCT}
    tagline="Full-color trifold brochures. Choose your flat size and available paper options below."
    parentHref="/services/marketing-materials/brochures"
    breadcrumb={[{ label: 'Brochures & Booklets', href: '/services/marketing-materials/brochures' }, { label: 'Tri-Fold Brochure', href: '' }]}
    color="#E8F5F1"
    galleryPath={legal ? '/services/marketing-materials/brochures/tri-fold-legal' : '/services/marketing-materials/brochures/tri-fold-letter'}
    cartPathsBySize={{
      [LEGAL]: '/services/marketing-materials/brochures/tri-fold-legal',
      [FLAT_SHEET_SIZES[0]]: '/services/marketing-materials/brochures/tri-fold-letter',
      [FLAT_SHEET_SIZES[1]]: '/services/marketing-materials/brochures/tri-fold-letter?size=tabloid',
      [FLAT_SHEET_SIZES[2]]: '/services/marketing-materials/brochures/tri-fold-letter?size=oversized',
    }}
    initialSelections={{ Size: size }}
    onSizeChange={setSize}
    showQuantity={legal}
    initialQuantity={250}
    minimumQuantity={100}
    optionGroups={[
      { label: 'Size', options: sizes.map((value, i) => ({ id: value, label: value, description: ['Legal size — pricing by quote.', 'Letter size.', 'Tabloid size.', 'Oversized tabloid.'][i] })) },
      ...(legal ? [
        { label: 'Finish', options: [
          { id: 'gloss', label: 'Gloss', description: 'High-shine coating.' },
          { id: 'matte', label: 'Matte', description: 'Soft, non-reflective finish.' },
        ] },
        { label: 'Stock', options: [
          { id: '100lb-text', label: '100 lb. Text', description: 'Standard weight.' },
          { id: '100lb-cover', label: '100 lb. Cover', description: 'Heavier premium feel.' },
        ] },
        { label: 'Laminate', options: [
          { id: 'none', label: 'None', description: 'No laminate.' },
          { id: 'soft-touch', label: 'Soft Touch', description: 'Velvety matte laminate.' },
        ] },
      ] : [{ label: 'Stock', options: [
        { id: 'Standard', label: 'Standard', description: '80 lb. C2S gloss text.' },
        { id: 'Premium', label: 'Premium', description: '100 lb. C2S gloss text — heavier feel.' },
      ] }]),
    ]}
    pricingRules={legal ? undefined : FLAT_SHEET_SIZES.map(value => ({ selections: { Size: value }, pricingTable: printPricingRows(TRI_FOLD_PRODUCT, value) }))}
    pricingNote="Price per order. Shipping calculated at checkout."
    specs={[
      { label: 'Flat sizes', value: sizes.join(', ') },
      { label: 'Fold', value: 'Tri-fold, scored and folded' },
      { label: 'Stock', value: legal ? '100 lb. text or 100 lb. cover' : 'Standard 80 lb. or Premium 100 lb. C2S gloss text' },
      { label: 'Color mode', value: 'Full-color CMYK' },
      { label: 'Turnaround', value: legal ? '3–5 business days after approval; confirmed with quote' : '5–7 business days after proof approval, plus shipping' },
    ]}
    artworkRequirements={[
      { label: 'Preferred formats', value: 'AI, PDF, EPS' },
      { label: 'Accepted formats', value: 'PSD, PNG, JPG (300 DPI min)' },
      { label: 'Bleed', value: '0.125 in. on all sides' },
      { label: 'Safe zone', value: '0.125 in. from all edges' },
    ]}
    included={['Digital proof before production', 'Full-color CMYK printing', 'Quality check before ship']}
    customNote={legal ? 'Legal-size brochures are quoted individually. We will confirm pricing and turnaround before production.' : undefined}
    relatedProducts={[{ href: '/services/marketing-materials/brochures', name: 'All Brochures & Booklets', description: 'Browse brochures and booklets.' }]}
  />
}
