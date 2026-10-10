import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import ConsolidatedQuoteCard from '@/components/marketing/ConsolidatedQuoteCard'

const paper = { label: 'Paper stock', choices: [
  { value: '80-text', label: '80 lb. text' },
  { value: '100-cover', label: '100 lb. cover' },
] }
const finish = { label: 'Finish', choices: [
  { value: 'gloss', label: 'Gloss' },
  { value: 'matte', label: 'Matte' },
] }
const sides = { label: 'Printed sides', choices: [
  { value: 'single', label: 'Single-sided' },
  { value: 'double', label: 'Double-sided' },
] }

export default function FlyersPage() {
  return <><Navbar /><main className="pt-[72px]">
    <section className="border-b border-gray-100 bg-white py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-lp-green">Marketing Materials</p>
      <h1 className="text-display font-semibold text-gray-900">Flyers and posters that move fast.</h1>
      <p className="mt-4 max-w-2xl text-body-lg text-gray-500">Choose your flyer or poster specifications and request a quote.</p>
    </div></section>
    <section className="bg-gray-50 py-16"><div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
      <ConsolidatedQuoteCard product="Flyers" description="Full-color flyers for handouts, menus, launches, and promotions. Select your size, paper, finish, and printed sides." image="/images/products/flyers/flyer-full-page-card.jpg"
        variantLabel="Type" variants={[{ label: 'Flyer', fields: [{ label: 'Size', choices: [
          { value: 'half', label: '5.5" × 8.5" (half page)' },
          { value: 'letter', label: '8.5" × 11" (full page)' },
          { value: 'tabloid', label: '11" × 17" (tabloid)' },
        ] }] }]} commonFields={[paper, finish, sides]} />
      <div id="posters" className="scroll-mt-24"><ConsolidatedQuoteCard product="Posters" description="Full-color posters for events, retail, and displays. Select a size, stock, finish, and printed sides." image="/images/products/posters/poster-1.jpg"
        variantLabel="Type" variants={[{ label: 'Poster', fields: [{ label: 'Size', choices: [
          { value: '11x17', label: '11" × 17"' }, { value: '18x24', label: '18" × 24"' }, { value: '24x36', label: '24" × 36"' },
        ] }] }]} commonFields={[{ label: 'Paper stock', choices: [
          { value: '100-text', label: '100 lb. text' }, { value: '100-cover', label: '100 lb. cover' },
        ] }, finish, sides]} /></div>
    </div></section>
    <section className="border-t border-gray-100 bg-white py-16 text-center"><h2 className="mb-4 text-h2 font-semibold text-gray-900">Need a custom size or large run?</h2><Link href="/get-quote"><Button size="lg">Talk to Us</Button></Link></section>
  </main><Footer /></>
}
