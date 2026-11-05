import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import RollLabelCalculator from '@/components/shop/RollLabelCalculator'
import TypeProductPage from '@/components/shop/TypeProductPage'
import { ROLL_LABEL_SHAPES } from '@/lib/sticker-catalog'

export const dynamicParams = false

export function generateStaticParams() {
  return ROLL_LABEL_SHAPES.map(s => ({ shape: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ shape: string }> }): Promise<Metadata> {
  const { shape } = await params
  const s = ROLL_LABEL_SHAPES.find(x => x.slug === shape)
  if (!s) return {}
  return { title: s.metaTitle, description: s.metaDescription, alternates: { canonical: `https://lettuceprint.com/shop/roll-labels/${s.slug}` } }
}

export default async function RollLabelShapePage({ params }: { params: Promise<{ shape: string }> }) {
  const { shape } = await params
  const s = ROLL_LABEL_SHAPES.find(x => x.slug === shape)
  if (!s) notFound()
  const path = `/shop/roll-labels/${s.slug}`
  return <TypeProductPage
    name={s.name} intro={s.intro} path={path} parent={{ name: 'Roll Labels', path: '/shop/roll-labels' }}
    shape={s.shape} roll calculator={<RollLabelCalculator productName={s.productName} productPath={path} />}
    faqs={s.faqs} metaDescription={s.metaDescription}
    specs={[
      { label: 'Shape', value: s.name.replace(' Labels', '') },
      { label: 'Material', value: 'Standard Matte Paper or Premium BOPP' },
      { label: 'Finish', value: 'Matte laminate, Gloss laminate, or Heavy laminate' },
      { label: 'Cut', value: 'Kiss-cut on roll' },
      { label: 'Core size', value: '3" standard core' },
      { label: 'Roll width', value: 'Up to 12.25"' },
      { label: 'Adhesive', value: 'Permanent. Removable available on request.' },
      { label: 'Minimum order', value: '250 labels' },
      { label: 'Standard turnaround', value: '3–5 business days after proof approval' },
    ]}
    artworkRequirements={[
      { label: 'Preferred formats', value: 'AI, PDF, SVG, EPS' },
      { label: 'Accepted formats', value: 'PSD, PNG, JPG (300 DPI min)' },
      { label: 'Color mode', value: 'CMYK preferred' },
      { label: 'Bleed', value: '0.125" on all sides' },
      { label: 'Safe zone', value: '0.0625" from cut line' },
    ]}
    included={['Digital proof before production', 'Kiss-cut on roll', '3" standard core', 'Quality check before ship']}
    related={ROLL_LABEL_SHAPES.filter(x => x.slug !== s.slug).map(x => ({ href: `/shop/roll-labels/${x.slug}`, name: x.name, summary: x.summary }))}
  />
}
