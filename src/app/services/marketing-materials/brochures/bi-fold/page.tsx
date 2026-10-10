import type { Metadata } from 'next'
import OrderingPageLayout from '@/components/marketing/OrderingPageLayout'
import ConsolidatedQuoteCard from '@/components/marketing/ConsolidatedQuoteCard'

export const metadata: Metadata = {
  title: 'Bi-Fold Brochure Printing | Request a Quote',
  description: 'Choose a bi-fold brochure size, paper stock, finish, lamination, and quantity for a custom quote.',
}

export default function BiFoldBrochuresPage() {
  return <OrderingPageLayout title="Bi-Fold Brochures" introduction="Four-panel brochures, scored and folded. Select your specifications and request a quote." customPrompt="Need a custom fold or format?">
    <ConsolidatedQuoteCard product="Bi-Fold Brochures" description="Four-panel brochures, scored and folded. Choose the flat and finished size, stock, and finish." image="https://drive.usercontent.google.com/download?id=1_pNzHBcCwVT_F3rvdcMUWz76DQh77Wvm&export=view"
      variantLabel="Type" variants={[{ label: 'Bi-fold', fields: [{ label: 'Flat size / finished size', choices: [
        { value: 'letter', label: '8.5" × 11" / 5.5" × 8.5"' },
        { value: 'tabloid', label: '11" × 17" / 8.5" × 11"' },
      ] }] }]} commonFields={[
        { label: 'Paper stock', choices: [{ value: '100-text', label: '100 lb. text' }, { value: '100-cover', label: '100 lb. cover' }] },
        { label: 'Finish', choices: [{ value: 'gloss', label: 'Gloss' }, { value: 'matte', label: 'Matte' }] },
        { label: 'Lamination', choices: [{ value: 'none', label: 'None' }, { value: 'soft-touch', label: 'Soft-touch' }] },
      ]} />
  </OrderingPageLayout>
}
