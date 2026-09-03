import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Custom Packaging Printing',
  description: 'Custom boxes, mylar bags, sleeves, cartons, and specialty packaging from Lettuce Print in Brooklyn.',
  alternates: { canonical: 'https://lettuceprint.com/services/packaging' },
}

const products = [
  { title: 'Mylar Bags', href: '/services/packaging/mylar-bags', note: 'Standard and die-cut mylar bags with high-barrier material and custom print.' },
  { title: 'Custom Packaging', href: '/services/packaging/custom-packaging', note: 'Built-from-scratch structures, sampling, specialty finishes, and launch support.' },
]

export default function PackagingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <section className="bg-white border-b border-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lp-green mb-4">Boxes & Packaging</p>
            <h1 className="text-display font-semibold text-gray-900 mb-5 max-w-3xl">Packaging that earns shelf space.</h1>
            <p className="text-body-lg text-gray-500 max-w-2xl">Retail boxes, DTC mailers, mylar bags, inserts, and specialty structures — designed to feel right before the customer even opens it.</p>
          </div>
        </section>
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-5">
            {products.map((product) => (
              <Link key={product.href} href={product.href} className="group bg-white border border-gray-100 rounded-card p-6 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all">
                <h2 className="text-h3 font-semibold text-gray-900 mb-3">{product.title}</h2>
                <p className="text-small text-gray-600 mb-6">{product.note}</p>
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-lp-green">View options <ArrowRight size={13} /></span>
              </Link>
            ))}
          </div>
        </section>
        <section className="py-16 bg-lp-blue/45 border-y border-lp-blue">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-h2 font-semibold text-gray-900 mb-4">Bring the product dimensions. We’ll help with the rest.</h2>
            <p className="text-body text-gray-600 mb-8">Dielines, materials, finish choices, samples, and production planning can all be handled through one quote.</p>
            <Link href="/get-quote"><Button size="lg">Start Packaging Quote</Button></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
