import type { Metadata } from 'next'
import OrderingPageLayout from '@/components/marketing/OrderingPageLayout'
import ConsolidatedQuoteCard from '@/components/marketing/ConsolidatedQuoteCard'

export const metadata: Metadata = {
  title: 'Tri-Fold Brochure Printing | Request a Quote',
  description: 'Choose a tri-fold brochure size, paper stock, finish, lamination, and quantity for a custom quote.',
}

export default function TriFoldBrochuresPage() {
  return <OrderingPageLayout title="Tri-Fold Brochures" introduction="Six-panel brochures for menus, mailers, and handouts. Select your specifications and request a quote." customPrompt="Need a custom fold or format?">
    <ConsolidatedQuoteCard product="Tri-Fold Brochures" description="Six-panel brochures for menus, mailers, and handouts. Choose the flat and finished size, stock, and finish." image="https://drive.usercontent.google.com/download?id=16MXaFyl5PkM53NeawAHF2MZp831_eeTs&export=view"
      variantLabel="Type" variants={[{ label: 'Tri-fold', fields: [{ label: 'Flat size / finished size', choices: [
        { value: 'letter', label: '8.5" × 11" / approximately 3.67" × 8.5"' },
        { value: 'legal', label: '8.5" × 14" / approximately 4.67" × 8.5"' },
      ] }] }]} commonFields={[
        { label: 'Paper stock', choices: [{ value: '100-text', label: '100 lb. text' }, { value: '100-cover', label: '100 lb. cover' }] },
        { label: 'Finish', choices: [{ value: 'gloss', label: 'Gloss' }, { value: 'matte', label: 'Matte' }] },
        { label: 'Lamination', choices: [{ value: 'none', label: 'None' }, { value: 'soft-touch', label: 'Soft-touch' }] },
      ]} />
  </OrderingPageLayout>
}
