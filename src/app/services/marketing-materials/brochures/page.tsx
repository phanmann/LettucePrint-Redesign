import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Brochure Printing',
  description: 'Choose a bi-fold or tri-fold brochure to configure and request a quote.',
}

const formats = [
  { id: 'bi-fold', name: 'Bi-Fold Brochures', description: 'Four panels. Letter or tabloid flat size.', href: '/services/marketing-materials/brochures/bi-fold' },
  { id: 'tri-fold', name: 'Tri-Fold Brochures', description: 'Six panels. Letter or legal flat size.', href: '/services/marketing-materials/brochures/tri-fold' },
]

export default function BrochuresPage() {
  return <><Navbar /><main className="pt-[72px]">
    <section className="border-b border-gray-100 bg-white py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Link href="/services/marketing-materials" className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-lp-green hover:underline">Marketing Materials</Link>
      <h1 className="text-display font-semibold text-gray-900">Choose your brochure format.</h1>
      <p className="mt-4 max-w-2xl text-body-lg text-gray-500">Bi-fold and tri-fold brochures each have their own ordering page.</p>
    </div></section>
    <section className="bg-gray-50 py-16"><div className="mx-auto grid max-w-7xl gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:px-8">
      {formats.map(format => <Link key={format.id} id={format.id} href={format.href} className="group scroll-mt-24 rounded-card border border-gray-200 bg-white p-8 shadow-card hover:shadow-card-hover">
        <h2 className="text-h2 font-semibold text-gray-900">{format.name}</h2>
        <p className="mt-3 text-small text-gray-600">{format.description}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-lp-green">Choose options <ArrowRight size={16} /></span>
      </Link>)}
    </div></section>
  </main><Footer /></>
}
