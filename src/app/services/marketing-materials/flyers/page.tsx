import type { Metadata } from 'next'
import Link from 'next/link'
import OrderingPageLayout from '@/components/marketing/OrderingPageLayout'
import ConsolidatedQuoteCard from '@/components/marketing/ConsolidatedQuoteCard'
import MarketingProductLinks from '@/components/marketing/MarketingProductLinks'

export const metadata: Metadata = {
  title: 'Flyer Printing | Request a Quote',
  description: 'Choose a flyer size, paper stock, finish, printed sides, and quantity for a custom quote.',
}

const products = [
  { title: 'Half Page Flyer', href: '/services/marketing-materials/flyers/half-page', note: '5.5" × 8.5"' },
  { title: 'Full Page Flyer', href: '/services/marketing-materials/flyers/full-page', note: '8.5" × 11"' },
  { title: 'Tabloid Flyer', href: '/services/marketing-materials/flyers/tabloid', note: '11" × 17"' },
]

export default function FlyersPage() {
  return <OrderingPageLayout title="Flyers that move fast." introduction="Choose your flyer specifications and request a quote." customPrompt="Need a custom size or large run?">
    <MarketingProductLinks heading="Flyer products" products={products} />
    <ConsolidatedQuoteCard product="Flyers" description="Full-color flyers for handouts, menus, launches, and promotions. Select your size, paper, finish, and printed sides."
      variantLabel="Type" variants={[{ label: 'Flyer', fields: [{ label: 'Size', choices: [
        { value: 'half', label: '5.5" × 8.5" (half page)' },
        { value: 'letter', label: '8.5" × 11" (full page)' },
        { value: 'tabloid', label: '11" × 17" (tabloid)' },
      ] }] }]} commonFields={[
        { label: 'Paper stock', choices: [{ value: '80-text', label: '80 lb. text' }, { value: '100-cover', label: '100 lb. cover' }] },
        { label: 'Finish', choices: [{ value: 'gloss', label: 'Gloss' }, { value: 'matte', label: 'Matte' }] },
        { label: 'Printed sides', choices: [{ value: 'single', label: 'Single-sided' }, { value: 'double', label: 'Double-sided' }] },
      ]} />
    <p id="posters" className="mt-8 scroll-mt-24 text-sm text-gray-600">Looking for posters? <Link href="/services/marketing-materials/posters" className="font-semibold text-lp-green hover:underline">Configure a poster instead →</Link></p>
  </OrderingPageLayout>
}
