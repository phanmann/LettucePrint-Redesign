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
    id: 'shipping',
    label: 'Shipping Boxes',
    description: 'Sturdy corrugated boxes for ecommerce, fulfillment, and branded shipping. Custom print inside and out.',
    products: [
      {
        id: 'shipping-mailer',
        name: 'Mailer Box',
        subtitle: 'Custom sizes available',
        description: 'Rigid self-locking mailer box — no tape needed. Perfect for subscription boxes and DTC unboxing experiences.',
        features: ['Rigid corrugated board', 'Full-color inside & out', 'Self-locking lid', 'Custom sizes'],
        turnaround: '7–10 business days',
        color: '#E8F5F1',
      },
      {
        id: 'shipping-rsc',
        name: 'Regular Slotted Carton (RSC)',
        subtitle: 'Custom sizes available',
        description: 'Classic corrugated shipping box for bulk fulfillment. Functional, stackable, and fully custom printed.',
        features: ['32 ECT corrugated', 'Exterior print', 'Custom sizes', 'Bulk pricing available'],
        turnaround: '7–10 business days',
        color: '#F5F0E8',
      },
    ],
  },
  {
    id: 'paperboard',
    label: 'Paperboard Boxes',
    description: 'Lightweight folding cartons for retail packaging, cosmetics, food, cannabis, and consumer products.',
    products: [
      {
        id: 'paperboard-folding',
        name: 'Folding Carton',
        subtitle: 'Custom sizes available',
        description: 'Reverse tuck, straight tuck, or auto-bottom — full-color folding cartons for retail shelves and DTC.',
        features: ['Multiple tuck styles', 'Full-color offset or digital', 'Soft-touch, gloss, or matte finish', 'Custom dielines'],
        turnaround: '10–14 business days',
        color: '#E8F0F5',
      },
      {
        id: 'paperboard-sleeve',
        name: 'Box Sleeve / Wrap',
        subtitle: 'Custom sizes available',
        description: 'Slide-over sleeve for plain boxes — cost-effective way to brand standard packaging.',
        features: ['Slides over existing box', 'Full-color print', 'Matte or gloss finish', 'No minimum dieline'],
        turnaround: '7–10 business days',
        color: '#F0E8F5',
      },
    ],
  },
  {
    id: 'rigid',
    label: 'Premium Rigid Board Boxes',
    description: 'High-end rigid boxes for luxury products, gifting, and premium brand experiences.',
    products: [
      {
        id: 'rigid-lid-base',
        name: 'Lid & Base Box',
        subtitle: 'Custom sizes available',
        description: 'Classic two-piece rigid box with separate lid. The gold standard for premium unboxing — cosmetics, jewelry, spirits, gifts.',
        features: ['2mm rigid greyboard', 'Wrapped in custom paper or fabric', 'Magnet close option', 'Interior foam/EVA insert available'],
        turnaround: '14–21 business days',
        color: '#E8F5EF',
      },
      {
        id: 'rigid-magnetic',
        name: 'Magnetic Closure Box',
        subtitle: 'Custom sizes available',
        description: 'Hinged rigid box with hidden magnetic closure. Feels expensive. Because it is.',
        features: ['Hidden magnet closure', 'Rigid board construction', 'Custom interior print', 'Ribbon pull option'],
        turnaround: '14–21 business days',
        color: '#F5E8F0',
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

export default function BoxesPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const filtered = activeCategory === 'all' ? CATEGORIES : CATEGORIES.filter(c => c.id === activeCategory)

  return (
    <>
      <Navbar />
      <main>
        <section className="pt-[calc(72px+4rem)] pb-12 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lp-green mb-4">Boxes & Packaging</p>
            <h1 className="text-display font-semibold text-gray-900 mb-4 max-w-2xl">Boxes built for your brand.</h1>
            <p className="text-body-lg text-gray-500 max-w-xl mb-8">Shipping boxes, folding cartons, and premium rigid boxes — custom printed and finished for any product or budget.</p>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setActiveCategory('all')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 ${activeCategory === 'all' ? 'bg-lp-green text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>All Boxes</button>
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
            <h2 className="text-h2 font-semibold text-gray-900 mb-4">Need something custom?</h2>
            <p className="text-body text-gray-500 mb-8">We build packaging from scratch — unique structures, special finishes, and low minimums for indie brands.</p>
            <Link href="/get-quote"><Button size="lg">Talk to Us</Button></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
