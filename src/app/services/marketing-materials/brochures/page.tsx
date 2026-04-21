'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const CATEGORIES = [
  {
    id: 'tri-fold',
    label: 'Tri-Fold Brochures',
    description: 'The classic 6-panel brochure — compact, organized, and works for nearly any industry.',
    products: [
      {
        id: 'brochure-trifold-letter',
        name: 'Tri-Fold Brochure',
        subtitle: '8.5" × 11" folded to 3.67" × 8.5"',
        description: 'The most universally recognized brochure format. Perfect for service menus, product overviews, real estate, and event guides.',
        features: ['100 lb. gloss or matte text', 'Full-color both sides', 'Scored & folded', 'Bulk pricing available'],
        turnaround: '3–5 business days',
        color: '#E8F5F1',
      },
      {
        id: 'brochure-trifold-legal',
        name: 'Tri-Fold Brochure — Legal',
        subtitle: '8.5" × 14" folded to 4.67" × 8.5"',
        description: 'Wider panel gives you more breathing room for copy-heavy content, photo layouts, or multi-column designs.',
        features: ['100 lb. gloss or matte text', 'Full-color both sides', 'Scored & folded', 'Legal-size extra panel space'],
        turnaround: '3–5 business days',
        color: '#F5F0E8',
      },
    ],
  },
  {
    id: 'bi-fold',
    label: 'Bi-Fold Brochures',
    description: 'Four-panel bi-fold brochures — clean, minimal, and easy to design for.',
    products: [
      {
        id: 'brochure-bifold-letter',
        name: 'Bi-Fold Brochure',
        subtitle: '8.5" × 11" folded to 5.5" × 8.5"',
        description: 'Simple, elegant two-fold. A natural fit for lookbooks, service guides, annual reports, and menus.',
        features: ['100 lb. gloss or matte text', 'Full-color both sides', 'Scored & folded', 'Optional lamination'],
        turnaround: '3–5 business days',
        color: '#E8F0F5',
      },
      {
        id: 'brochure-bifold-tabloid',
        name: 'Bi-Fold Brochure — Tabloid',
        subtitle: '11" × 17" folded to 8.5" × 11"',
        description: 'Large-format bi-fold that opens to a full 11×17 spread. Ideal for bold visual campaigns and high-impact presentations.',
        features: ['100 lb. cover stock', 'Full-color both sides', 'Scored & folded', 'Matte or gloss coating'],
        turnaround: '3–5 business days',
        color: '#F0E8F5',
      },
    ],
  },
  {
    id: 'premium',
    label: 'Premium Brochures',
    description: 'Upgraded stocks and finishes for brands that need their collateral to feel as good as it looks.',
    products: [
      {
        id: 'brochure-soft-touch',
        name: 'Soft Touch Brochure',
        subtitle: 'Custom sizes available',
        description: 'Soft-touch laminated cover with offset-quality interior. Leaves a lasting impression at sales meetings, events, and pitch decks.',
        features: ['100 lb. cover stock', 'Soft-touch matte laminate', 'Full-color printing', 'Spot UV available on cover'],
        turnaround: '5–7 business days',
        color: '#E8F5EF',
      },
      {
        id: 'brochure-uncoated',
        name: 'Uncoated Brochure',
        subtitle: 'Custom sizes available',
        description: 'Natural, tactile paper with rich ink absorption — great for a more editorial or artisan brand feel.',
        features: ['100 lb. uncoated text', 'Full-color printing', 'Writable surface', 'Eco-friendly paper options'],
        turnaround: '3–5 business days',
        color: '#F5E8E8',
      },
    ],
  },
]

function ProductCard({ product, categoryLabel }: { product: typeof CATEGORIES[0]['products'][0]; categoryLabel: string }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="w-full h-48 flex items-center justify-center" style={{ backgroundColor: product.color }}>
        <div className="text-center px-6">
          <p className="text-sm font-semibold text-gray-500 mb-1">{product.name}</p>
          <p className="text-xs text-gray-400">{product.subtitle}</p>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-base font-semibold text-gray-900 mb-1">{product.name}</h3>
        <p className="text-xs text-gray-400 mb-3">{product.subtitle}</p>
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">{product.description}</p>
        <button onClick={() => setExpanded(e => !e)} className="flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-lp-green transition-colors mb-4">
          <ChevronDown size={14} className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
          {expanded ? 'Hide details' : 'See details'}
        </button>
        <AnimatePresence>
          {expanded && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.15 }} className="overflow-hidden">
              <ul className="space-y-1.5 mb-4">
                {product.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-lp-green flex-shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-gray-400 mb-4">Turnaround: {product.turnaround}</p>
            </motion.div>
          )}
        </AnimatePresence>
        <Link href={`/get-quote?product=${encodeURIComponent(product.name)}&category=${encodeURIComponent(categoryLabel)}`}>
          <Button size="sm" className="w-full">Get a Quote <ArrowRight size={14} className="ml-1" /></Button>
        </Link>
      </div>
    </div>
  )
}

export default function BrochuresPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const filtered = activeCategory === 'all' ? CATEGORIES : CATEGORIES.filter(c => c.id === activeCategory)

  return (
    <>
      <Navbar />
      <main>
        <section className="pt-[calc(72px+4rem)] pb-12 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lp-green mb-4">Marketing Materials</p>
            <h1 className="text-display font-semibold text-gray-900 mb-4 max-w-2xl">
              Brochures that do the selling.
            </h1>
            <p className="text-body-lg text-gray-500 max-w-xl mb-8">
              Tri-fold, bi-fold, premium laminated — full-color brochures that make your pitch in the hands of the right person.
            </p>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setActiveCategory('all')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 ${activeCategory === 'all' ? 'bg-lp-green text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>All Brochures</button>
              {CATEGORIES.map(cat => (
                <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 ${activeCategory === cat.id ? 'bg-lp-green text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{cat.label}</button>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            <AnimatePresence mode="wait">
              {filtered.map(category => (
                <motion.div key={category.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }}>
                  <div className="mb-8">
                    <h2 className="text-h2 font-semibold text-gray-900 mb-2">{category.label}</h2>
                    <p className="text-body text-gray-500 max-w-2xl">{category.description}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {category.products.map(product => (
                      <ProductCard key={product.id} product={product} categoryLabel={category.label} />
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        <section className="py-16 bg-white border-t border-gray-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-h2 font-semibold text-gray-900 mb-4">Need a custom fold or format?</h2>
            <p className="text-body text-gray-500 mb-8">We do z-folds, gate folds, roll folds — if it folds, we can print it. Tell us what you're going for.</p>
            <Link href="/get-quote"><Button size="lg">Talk to Us</Button></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
