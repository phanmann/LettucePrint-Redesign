import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import ConsolidatedQuoteCard from '@/components/marketing/ConsolidatedQuoteCard'


export default function BrochuresPage() {
  return <><Navbar /><main className="pt-[72px]">
    <section className="border-b border-gray-100 bg-white py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-lp-green">Marketing Materials</p>
      <h1 className="text-display font-semibold text-gray-900">Brochures that do the selling.</h1>
      <p className="mt-4 max-w-2xl text-body-lg text-gray-500">Bi-fold and tri-fold are separate products. Select the flat and finished size for either format.</p>
    </div></section>
    <section className="bg-gray-50 py-16"><div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
      <div id="bi-fold" className="scroll-mt-24"><ConsolidatedQuoteCard product="Bi-Fold Brochures" description="Four-panel brochures, scored and folded. Choose the flat and finished size, stock, and finish." image="https://drive.usercontent.google.com/download?id=1_pNzHBcCwVT_F3rvdcMUWz76DQh77Wvm&export=view"
        variantLabel="Type" variants={[{ label: 'Bi-fold', fields: [{ label: 'Flat size / finished size', choices: [
          { value: 'letter', label: '8.5" × 11" / 5.5" × 8.5"' },
          { value: 'tabloid', label: '11" × 17" / 8.5" × 11"' },
        ] }] }]} commonFields={[
          { label: 'Paper stock', choices: [{ value: '100-text', label: '100 lb. text' }, { value: '100-cover', label: '100 lb. cover' }] },
          { label: 'Finish', choices: [{ value: 'gloss', label: 'Gloss' }, { value: 'matte', label: 'Matte' }] },
          { label: 'Lamination', choices: [{ value: 'none', label: 'None' }, { value: 'soft-touch', label: 'Soft-touch' }] },
        ]} /></div>
      <div id="tri-fold" className="scroll-mt-24"><ConsolidatedQuoteCard product="Tri-Fold Brochures" description="Six-panel brochures for menus, mailers, and handouts. Choose the flat and finished size, stock, and finish." image="https://drive.usercontent.google.com/download?id=16MXaFyl5PkM53NeawAHF2MZp831_eeTs&export=view"
        variantLabel="Type" variants={[{ label: 'Tri-fold', fields: [{ label: 'Flat size / finished size', choices: [
          { value: 'letter', label: '8.5" × 11" / approximately 3.67" × 8.5"' },
          { value: 'legal', label: '8.5" × 14" / approximately 4.67" × 8.5"' },
        ] }] }]} commonFields={[
          { label: 'Paper stock', choices: [{ value: '100-text', label: '100 lb. text' }, { value: '100-cover', label: '100 lb. cover' }] },
          { label: 'Finish', choices: [{ value: 'gloss', label: 'Gloss' }, { value: 'matte', label: 'Matte' }] },
          { label: 'Lamination', choices: [{ value: 'none', label: 'None' }, { value: 'soft-touch', label: 'Soft-touch' }] },
        ]} /></div>
    </div></section>
    <section className="border-t border-gray-100 bg-white py-16 text-center"><h2 className="mb-4 text-h2 font-semibold text-gray-900">Need a custom fold or format?</h2><Link href="/get-quote"><Button size="lg">Talk to Us</Button></Link></section>
  </main><Footer /></>
}
