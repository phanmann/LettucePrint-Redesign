import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Marketing Materials Printing',
  description: 'Business cards, flyers, postcards, posters, brochures, and booklets printed by Lettuce Print in Brooklyn.',
  alternates: { canonical: 'https://lettuceprint.com/services/marketing-materials' },
}

const products = [
  { title: 'Business Cards', href: '/services/marketing-materials/business-cards', note: 'Standard, premium, soft-touch, foil, and spot UV.' },
  { title: 'Flyers', href: '/services/marketing-materials/flyers', note: 'Full-page, half-page, and tabloid formats.' },
  { title: 'Postcards', href: '/services/marketing-materials/postcards', note: 'Direct mail, event handouts, and retail inserts.' },
  { title: 'Posters', href: '/services/marketing-materials/posters', note: 'Small, medium, large, art print, and soft-touch options.' },
  { title: 'Brochures', href: '/services/marketing-materials/brochures', note: 'Tri-fold, bi-fold, tabloid, soft-touch, and uncoated.' },
  { title: 'Booklets', href: '/services/marketing-materials/booklets', note: 'Saddle-stitch and perfect-bound catalogs, zines, and menus.' },
]

export default function MarketingMaterialsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <section className="bg-white border-b border-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lp-green mb-4">Marketing Materials</p>
            <h1 className="text-display font-semibold text-gray-900 mb-5 max-w-3xl">Print pieces that make the handoff feel premium.</h1>
            <p className="text-body-lg text-gray-500 max-w-2xl">Cards, mailers, flyers, posters, brochures, and booklets — built for launches, events, retail, sales teams, and client leave-behinds.</p>
          </div>
        </section>
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((product) => (
              <Link key={product.href} href={product.href} className="group bg-white border border-gray-100 rounded-card p-6 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all">
                <h2 className="text-h3 font-semibold text-gray-900 mb-3">{product.title}</h2>
                <p className="text-small text-gray-600 mb-6">{product.note}</p>
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-lp-green">View options <ArrowRight size={13} /></span>
              </Link>
            ))}
          </div>
        </section>
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-h2 font-semibold text-gray-900 mb-4">Need a full campaign kit?</h2>
            <p className="text-body text-gray-500 mb-8">Bundle cards, flyers, postcards, and event pieces into one quote.</p>
            <Link href="/get-quote"><Button size="lg">Request a Quote</Button></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
