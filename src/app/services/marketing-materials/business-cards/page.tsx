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
    label: 'Standard Business Cards',
    description: 'Classic 3.5" × 2" business cards with crisp full-color printing and a range of stock options.',
    products: [
      {
        id: 'bc-standard-matte',
        name: 'Matte Business Card',
        subtitle: '3.5" × 2"',
        description: 'Smooth matte finish that feels premium and photographs well. A clean, modern look that lets your design breathe.',
        features: ['16 pt card stock', 'Matte coating both sides', 'Full-color printing', 'Rounded corner option'],
        turnaround: '2–3 business days',
        color: '#E8F5F1',
      },
      {
        id: 'bc-standard-gloss',
        name: 'Gloss Business Card',
        subtitle: '3.5" × 2"',
        description: 'High-gloss UV coating for vibrant colors and a polished, eye-catching finish.',
        features: ['16 pt card stock', 'High-gloss UV coating', 'Full-color printing', 'Rounded corner option'],
        turnaround: '2–3 business days',
        color: '#E8F0F5',
      },
      {
        id: 'bc-standard-uncoated',
        name: 'Uncoated Business Card',
        subtitle: '3.5" × 2"',
        description: 'Natural, tactile feel — great for writing on and ideal for brands that want an organic, approachable look.',
        features: ['100 lb. uncoated stock', 'Matte finish', 'Full-color printing', 'Writable surface'],
        turnaround: '2–3 business days',
        color: '#F5F0E8',
      },
    ],
  },
  {
    id: 'premium',
    label: 'Premium Business Cards',
    description: 'Elevated finishes that make a lasting first impression — soft-touch, foil, raised spot UV, and thick board.',
    products: [
      {
        id: 'bc-soft-touch',
        name: 'Soft Touch Business Card',
        subtitle: '3.5" × 2"',
        description: 'Velvety matte laminate that feels as good as it looks. A favorite for luxury brands, creatives, and anyone who wants to stand out.',
        features: ['18 pt card stock', 'Soft-touch matte laminate', 'Full-color printing', 'Spot UV available as add-on'],
        turnaround: '3–5 business days',
        color: '#F0E8F5',
      },
      {
        id: 'bc-spot-uv',
        name: 'Spot UV Business Card',
        subtitle: '3.5" × 2"',
        description: 'Raised gloss UV on select areas over a matte base — creates a tactile contrast that makes logos and details pop.',
        features: ['18 pt card stock', 'Matte laminate base', 'Raised spot UV overlay', 'Full-color printing'],
        turnaround: '3–5 business days',
        color: '#E8F5EF',
      },
      {
        id: 'bc-foil',
        name: 'Foil Stamped Business Card',
        subtitle: '3.5" × 2"',
        description: 'Gold, silver, or custom foil stamping for a premium metallic accent. Unmistakable. Unforgettable.',
        features: ['18 pt card stock', 'Hot foil stamping', 'Gold, silver, or custom foil', 'Matte or gloss base'],
        turnaround: '5–7 business days',
        color: '#F5E8E8',
      },
      {
        id: 'bc-thick',
        name: 'Extra Thick Business Card',
        subtitle: '3.5" × 2"',
        description: '32 pt triple-layer card with a colored core — substantial, sturdy, and impossible to ignore.',
        features: ['32 pt triple-layer stock', 'Colored core options', 'Matte or gloss finish', 'Edge painting available'],
        turnaround: '5–7 business days',
        color: '#E8F5F5',
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

export default function BusinessCardsPage() {
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
              Business cards worth keeping.
            </h1>
            <p className="text-body-lg text-gray-500 max-w-xl mb-8">
              From clean matte to foil-stamped luxury — we print business cards that make the right first impression.
            </p>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setActiveCategory('all')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 ${activeCategory === 'all' ? 'bg-lp-green text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>All Cards</button>
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
            <h2 className="text-h2 font-semibold text-gray-900 mb-4">Not sure which finish is right?</h2>
            <p className="text-body text-gray-500 mb-8">We'll help you pick the card that matches your brand — and order a sample pack if you want to feel the difference.</p>
            <Link href="/get-quote"><Button size="lg">Talk to Us</Button></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
