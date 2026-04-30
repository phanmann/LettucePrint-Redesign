'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import ProductCard from '@/components/shop/ProductCard'
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
                      <ProductCard key={product.id} {...product} categoryLabel={category.label} />
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
