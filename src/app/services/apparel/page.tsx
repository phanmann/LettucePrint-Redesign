import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Apparel & Promo Printing',
  description: 'Screen printing, embroidery, DTG, and custom promotional items from Lettuce Print in Brooklyn.',
  alternates: { canonical: 'https://lettuceprint.com/services/apparel' },
}

const products = [
  { title: 'Screen Printing', href: '/services/apparel/screenprint', note: 'T-shirts, hoodies, totes, and bulk apparel with durable ink and clean registration.' },
  { title: 'Embroidery', href: '/services/apparel/embroidery', note: 'Hats, polos, jackets, bags, and uniforms with stitched logos and thread matching.' },
  { title: 'DTG Printing', href: '/services/apparel/dtg', note: 'Full-color, low-minimum garment prints for short runs and detailed artwork.' },
  { title: 'Custom Promo Items', href: '/services/apparel/custom-items', note: 'Totes, drinkware, giveaway kits, staff merch, and sourced branded products.' },
]

export default function ApparelPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <section className="bg-white border-b border-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lp-green mb-4">Apparel & Promo</p>
            <h1 className="text-display font-semibold text-gray-900 mb-5 max-w-3xl">Merch people actually want to wear.</h1>
            <p className="text-body-lg text-gray-500 max-w-2xl">Apparel and promotional pieces for launches, staff, events, and brand drops — with help choosing blanks, placement, and production method.</p>
          </div>
        </section>
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((product) => (
              <Link key={product.href} href={product.href} className="group bg-white border border-gray-100 rounded-card p-6 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all">
                <h2 className="text-h4 font-semibold text-gray-900 mb-3">{product.title}</h2>
                <p className="text-small text-gray-600 mb-6">{product.note}</p>
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-lp-green">Get details <ArrowRight size={13} /></span>
              </Link>
            ))}
          </div>
        </section>
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-h2 font-semibold text-gray-900 mb-4">Bring the logo. We’ll build the merch plan.</h2>
            <p className="text-body text-gray-500 mb-8">Tell us quantity, deadline, and vibe — we’ll recommend print method, garment options, and placement.</p>
            <Link href="/get-quote"><Button size="lg">Start Apparel Quote</Button></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
