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
    id: 'half-sheet',
    label: 'Half Sheet Flyers',
    description: 'Compact and cost-effective — perfect for handouts, rack cards, and high-volume distribution.',
    products: [
      {
        id: 'flyer-55x85',
        name: 'Half Sheet Flyer',
        subtitle: '5.5" × 8.5"',
        description: 'The workhorse handout. Fits in bags, pockets, and racks. Great for menus, event promos, and retail inserts.',
        features: ['100 lb. gloss or matte stock', 'Full-color single or double-sided', 'Bulk pricing available', 'Fast turnaround'],
        turnaround: '1–2 business days',
        color: '#E8F5F1',
      },
    ],
  },
  {
    id: 'letter',
    label: 'Letter Size Flyers',
    description: 'Standard 8.5" × 11" flyers for maximum visual impact — the format people expect.',
    products: [
      {
        id: 'flyer-85x11-gloss',
        name: 'Letter Flyer — Gloss',
        subtitle: '8.5" × 11"',
        description: 'Vibrant high-gloss finish that makes photos and colors pop. Ideal for event promos, product launches, and retail displays.',
        features: ['80 lb. gloss text', 'Full-color printing', 'Single or double-sided', 'Bulk pricing available'],
        turnaround: '1–2 business days',
        color: '#E8F0F5',
      },
      {
        id: 'flyer-85x11-matte',
        name: 'Letter Flyer — Matte',
        subtitle: '8.5" × 11"',
        description: 'Soft matte finish for a sophisticated look — ideal for menus, lookbooks, and editorial-style promotions.',
        features: ['80 lb. matte text', 'Full-color printing', 'Single or double-sided', 'Writable surface'],
        turnaround: '1–2 business days',
        color: '#F5F0E8',
      },
      {
        id: 'flyer-85x11-heavy',
        name: 'Heavy Stock Flyer',
        subtitle: '8.5" × 11"',
        description: 'Heavier 100 lb. cover stock for a more substantial, premium feel. Doesn\'t flop or bend in hand.',
        features: ['100 lb. cover stock', 'Matte or gloss coating', 'Full-color printing', 'Double-sided'],
        turnaround: '2–3 business days',
        color: '#F0E8F5',
      },
    ],
  },
  {
    id: 'large',
    label: 'Large Format Flyers',
    description: 'Tabloid-sized flyers for maximum presence — menus, posters, event sheets, and retail displays.',
    products: [
      {
        id: 'flyer-11x17',
        name: 'Tabloid Flyer',
        subtitle: '11" × 17"',
        description: 'Twice the real estate of a letter flyer. Perfect for menus, in-store promotions, concert bills, and display boards.',
        features: ['80 lb. gloss or matte text', 'Full-color printing', 'Single or double-sided', 'Folding available'],
        turnaround: '2–3 business days',
        color: '#E8F5EF',
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

export default function FlyersPage() {
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
              Flyers that move fast.
            </h1>
            <p className="text-body-lg text-gray-500 max-w-xl mb-8">
              Half-sheet handouts to tabloid-sized showstoppers — high-volume flyer printing with quick turnaround.
            </p>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setActiveCategory('all')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 ${activeCategory === 'all' ? 'bg-lp-green text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>All Flyers</button>
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
            <h2 className="text-h2 font-semibold text-gray-900 mb-4">Need a custom size or big quantity?</h2>
            <p className="text-body text-gray-500 mb-8">We handle large runs efficiently. Tell us the size, quantity, and deadline and we'll make it happen.</p>
            <Link href="/get-quote"><Button size="lg">Talk to Us</Button></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
