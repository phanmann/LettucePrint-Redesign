import type { Metadata } from 'next'
import OrderingPageLayout from '@/components/marketing/OrderingPageLayout'
import ConsolidatedQuoteCard from '@/components/marketing/ConsolidatedQuoteCard'

export const metadata: Metadata = {
  title: 'Poster Printing | Request a Quote',
  description: 'Choose a poster size, paper stock, finish, printed sides, and quantity for a custom quote.',
}

export default function PostersPage() {
  return <OrderingPageLayout title="Posters that make an impact." introduction="Choose your poster specifications and request a quote." customPrompt="Need a custom size or large run?">
    <ConsolidatedQuoteCard product="Posters" description="Full-color posters for events, retail, and displays. Select a size, stock, finish, and printed sides." image="/images/products/posters/poster-1.jpg"
      variantLabel="Type" variants={[{ label: 'Poster', fields: [{ label: 'Size', choices: [
        { value: '11x17', label: '11" × 17"' }, { value: '18x24', label: '18" × 24"' }, { value: '24x36', label: '24" × 36"' },
      ] }] }]} commonFields={[
        { label: 'Paper stock', choices: [{ value: '100-text', label: '100 lb. text' }, { value: '100-cover', label: '100 lb. cover' }] },
        { label: 'Finish', choices: [{ value: 'gloss', label: 'Gloss' }, { value: 'matte', label: 'Matte' }] },
        { label: 'Printed sides', choices: [{ value: 'single', label: 'Single-sided' }, { value: 'double', label: 'Double-sided' }] },
      ]} />
  </OrderingPageLayout>
}
