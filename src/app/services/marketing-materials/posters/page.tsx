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
    id: 'standard',
    label: 'Standard Posters',
    description: 'Full-color posters in the most common sizes — concerts, retail, events, and everything in between.',
    products: [
      {
        id: 'poster-11x17',
        name: 'Small Poster',
        subtitle: '11" × 17"',
        description: 'The classic concert bill size. Works everywhere — bulletin boards, windows, retail counters, and bar walls.',
        features: ['80 lb. gloss or matte text', 'Full-color printing', 'Crisp edge-to-edge coverage', 'Bulk pricing available'],
        turnaround: '1–2 business days',
        color: '#E8F5F1',
      },
      {
        id: 'poster-18x24',
        name: 'Medium Poster',
        subtitle: '18" × 24"',
        description: 'Standard poster size for retail displays, in-store promotions, event signage, and gallery prints.',
        features: ['80 lb. gloss or matte text', 'Full-color printing', 'Vivid, accurate color reproduction', 'Optional lamination'],
        turnaround: '2–3 business days',
        color: '#F5F0E8',
      },
      {
        id: 'poster-24x36',
        name: 'Large Poster',
        subtitle: '24" × 36"',
        description: 'Movie-poster size. Maximum impact for storefronts, events, trade shows, and gallery spaces.',
        features: ['80 lb. or 100 lb. stock', 'Full-color printing', 'Matte or gloss finish', 'Optional tube rolling'],
        turnaround: '2–3 business days',
        color: '#E8F0F5',
      },
    ],
  },
  {
    id: 'premium',
    label: 'Premium Posters',
    description: 'Elevated paper stocks and finishes for art prints, limited editions, and high-end brand collateral.',
    products: [
      {
        id: 'poster-art-print',
        name: 'Art Print Poster',
        subtitle: 'Custom sizes available',
        description: 'Heavy-weight uncoated stock for a fine-art feel — rich ink absorption, matte surface, and museum-quality output.',
        features: ['100 lb. uncoated cover', 'Fine-art quality output', 'Accurate color profiling', 'Custom sizes available'],
        turnaround: '3–5 business days',
        color: '#F0E8F5',
      },
      {
        id: 'poster-soft-touch',
        name: 'Soft Touch Poster',
        subtitle: 'Custom sizes available',
        description: 'Velvety soft-touch laminate over a heavy stock base — tactile luxury for limited edition prints, brand activations, and retail.',
        features: ['100 lb. cover stock', 'Soft-touch matte laminate', 'Full-color printing', 'Spot UV available'],
        turnaround: '3–5 business days',
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

export default function PostersPage() {
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
              Posters that command the room.
            </h1>
            <p className="text-body-lg text-gray-500 max-w-xl mb-8">
              From concert bills to fine-art prints — full-color posters in standard sizes and premium finishes, printed in Brooklyn.
            </p>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setActiveCategory('all')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 ${activeCategory === 'all' ? 'bg-lp-green text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>All Posters</button>
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
            <h2 className="text-h2 font-semibold text-gray-900 mb-4">Need a custom size or finish?</h2>
            <p className="text-body text-gray-500 mb-8">We can hit just about any size or spec. Describe the project and we'll come back with options.</p>
            <Link href="/get-quote"><Button size="lg">Talk to Us</Button></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
