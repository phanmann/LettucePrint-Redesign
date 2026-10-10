import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import ConsolidatedQuoteCard from '@/components/marketing/ConsolidatedQuoteCard'

const saddleSizes = { label: 'Size', choices: [
  { value: '55x85', label: '5.5" × 8.5"' },
  { value: '85x11', label: '8.5" × 11"' },
  { value: 'square', label: '8.5" × 8.5" square' },
] }
const perfectSizes = { label: 'Size', choices: [
  { value: '6x9', label: '6" × 9"' },
  { value: '85x11', label: '8.5" × 11"' },
] }
const cover = { label: 'Cover finish', choices: [
  { value: 'gloss', label: 'Gloss' }, { value: 'matte', label: 'Matte' },
  { value: 'soft-touch', label: 'Soft-touch (quote required)' },
] }
const interior = { label: 'Interior paper', choices: [
  { value: '60-uncoated', label: '60 lb. uncoated' },
  { value: '70-text', label: '70 lb. text' },
] }

export default function BookletsPage() {
  return <><Navbar /><main className="pt-[72px]">
    <section className="border-b border-gray-100 bg-white py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-lp-green">Marketing Materials</p>
      <h1 className="text-display font-semibold text-gray-900">Booklets built to be read.</h1>
      <p className="mt-4 max-w-2xl text-body-lg text-gray-500">One booklet listing, with binding, size, paper, and page count selected for your project.</p>
    </div></section>
    <section className="bg-gray-50 py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <ConsolidatedQuoteCard product="Booklets" description="Saddle-stitched, Wire-O, or soft-cover perfect-bound booklets. Choose the construction that fits your project." image="/images/products/booklets/booklet-open.jpg"
        variants={[
          { label: 'Saddle Stitch', fields: [saddleSizes, { label: 'Page count', choices: [
            { value: '8', label: '8 pages' }, { value: '16', label: '16 pages' }, { value: '24', label: '24 pages' }, { value: '32', label: '32 pages' }, { value: 'custom', label: 'Custom page count' },
          ] }], note: 'Saddle-stitch page counts must be in multiples of four; we will confirm the final count.' },
          { label: 'Wire-O', fields: [saddleSizes, { label: 'Page count', choices: [
            { value: '16', label: '16 pages' }, { value: '24', label: '24 pages' }, { value: '32', label: '32 pages' }, { value: '48', label: '48 pages' }, { value: 'custom', label: 'Custom page count' },
          ] }], note: 'Wire-O capacity depends on paper thickness; we will confirm the final specification.' },
          { label: 'Soft-Cover Perfect Bound', fields: [perfectSizes, { label: 'Page count', choices: [
            { value: '48', label: '48 pages' }, { value: '64', label: '64 pages' }, { value: '96', label: '96 pages' }, { value: 'custom', label: 'Custom page count (48+)' },
          ] }], note: 'Perfect binding starts at 48 pages; spine and paper specifications are confirmed in your quote.' },
        ]} commonFields={[cover, interior]} />
    </div></section>
    <section className="border-t border-gray-100 bg-white py-16 text-center"><h2 className="mb-4 text-h2 font-semibold text-gray-900">Need a specialty binding?</h2><Link href="/get-quote"><Button size="lg">Talk to Us</Button></Link></section>
  </main><Footer /></>
}
