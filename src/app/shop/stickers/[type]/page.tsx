import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PricingCalculator from '@/components/shop/PricingCalculator'
import TypeProductPage from '@/components/shop/TypeProductPage'
import { SPOT_UV_CARD, STICKER_TYPES } from '@/lib/sticker-catalog'
import { MATERIAL_LABELS } from '@/lib/pricing'

export const dynamicParams = false

export function generateStaticParams() {
  return STICKER_TYPES.map(t => ({ type: t.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ type: string }> }): Promise<Metadata> {
  const { type } = await params
  const t = STICKER_TYPES.find(x => x.slug === type)
  if (!t) return {}
  return { title: t.metaTitle, description: t.metaDescription, alternates: { canonical: `https://lettuceprint.com/shop/stickers/${t.slug}` } }
}

export default async function StickerTypePage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params
  const t = STICKER_TYPES.find(x => x.slug === type)
  if (!t) notFound()
  const path = `/shop/stickers/${t.slug}`
  const calculator = <PricingCalculator productName={t.productName} materials={t.materials} productPath={path} />
  return <TypeProductPage
    name={t.name} intro={t.intro} path={path} parent={{ name: 'Stickers', path: '/shop/stickers' }}
    shape={t.shape} tone={t.tone} calculator={calculator} faqs={t.faqs} metaDescription={t.metaDescription}
    specs={[
      { label: 'Material', value: t.materials.map(m => MATERIAL_LABELS[m]).join(', ') },
      { label: 'Finish', value: 'Matte, gloss, or protective laminate' },
      { label: 'Cut', value: t.cut },
      { label: 'Adhesive', value: 'Permanent, removable available on request' },
      { label: 'Durability', value: 'Waterproof, UV resistant, scratch resistant' },
      { label: 'Minimum order', value: '50 stickers' },
      { label: 'Standard turnaround', value: '3–5 business days after approval' },
    ]}
    artworkRequirements={[
      { label: 'Preferred formats', value: 'AI, PDF, SVG, EPS' },
      { label: 'Accepted formats', value: 'PSD, PNG, JPG, TIFF (300 DPI min)' },
      { label: 'Color mode', value: 'CMYK preferred' },
      { label: 'Bleed', value: '0.125" on all sides' },
      { label: 'Max file size', value: '100MB' },
    ]}
    included={['Digital proof before production', 'Cut to your selected shape', 'Individual backing paper', 'Quality check before ship']}
    related={[...STICKER_TYPES.filter(x => x.slug !== t.slug).slice(0, 3).map(x => ({ href: `/shop/stickers/${x.slug}`, name: x.name, summary: x.summary })), { href: SPOT_UV_CARD.href, name: SPOT_UV_CARD.name, summary: SPOT_UV_CARD.summary }]}
  />
}
