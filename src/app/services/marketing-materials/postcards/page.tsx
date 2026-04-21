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
    label: 'Standard Postcards',
    description: 'Crisp, full-color postcards in common mailer sizes — ready to send or hand out.',
    products: [
      {
        id: 'pc-4x6',
        name: 'Postcard 4" × 6"',
        subtitle: '4" × 6"',
        description: 'The classic mailer size. Cost-effective for high-volume campaigns, event announcements, and promotional drops.',
        features: ['100 lb. gloss or matte stock', 'Full-color both sides', 'USPS postcard compliant', 'Bulk pricing available'],
        turnaround: '2–3 business days',
        color: '#E8F5F1',
      },
      {
        id: 'pc-5x7',
        name: 'Postcard 5" × 7"',
        subtitle: '5" × 7"',
        description: 'More visual real estate for bold imagery, menus, event details, or product showcases.',
        features: ['100 lb. gloss or matte stock', 'Full-color both sides', 'USPS first-class compliant', 'Rounded corner option'],
        turnaround: '2–3 business days',
        color: '#F5F0E8',
      },
      {
        id: 'pc-6x9',
        name: 'Postcard 6" × 9"',
        subtitle: '6" × 9"',
        description: 'Large-format postcard that stands out in any mailbox. Great for real estate, promotions, and direct mail campaigns.',
        features: ['100 lb. gloss or matte stock', 'Full-color both sides', 'USPS bulk mail ready', 'Bleed printing'],
        turnaround: '3–5 business days',
        color: '#E8F0F5',
      },
      {
        id: 'pc-6x11',
        name: 'Postcard 6" × 11"',
        subtitle: '6" × 11"',
        description: 'Maximum impact, maximum visibility. The largest standard postcard size — designed to dominate the mailbox.',
        features: ['100 lb. gloss or matte stock', 'Full-color both sides', 'USPS standard mail', 'Panoramic design space'],
        turnaround: '3–5 business days',
        color: '#F0E8F5',
      },
    ],
  },
  {
    id: 'premium',
    label: 'Premium Postcards',
    description: 'Elevated stocks and finishes for brands that want their mailers to feel as good as they look.',
    products: [
      {
        id: 'pc-soft-touch',
        name: 'Soft Touch Postcard',
        subtitle: 'Custom sizes available',
        description: 'Velvety soft-touch laminate on heavy stock. Stands apart in any stack — a luxury feel that drives open rates.',
        features: ['18 pt card stock', 'Soft-touch matte laminate', 'Full-color printing', 'Spot UV available'],
        turnaround: '3–5 business days',
        color: '#E8F5EF',
      },
      {
        id: 'pc-spot-uv',
        name: 'Spot UV Postcard',
        subtitle: 'Custom sizes available',
        description: 'Raised gloss UV highlights on a matte base — draws the eye to logos, headlines, and CTAs.',
        features: ['18 pt card stock', 'Matte laminate base', 'Raised spot UV overlay', 'Full-color printing'],
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

export default function PostcardsPage() {
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
              Postcards that actually get noticed.
            </h1>
            <p className="text-body-lg text-gray-500 max-w-xl mb-8">
              Standard mailer sizes to oversized premium stock — full-color postcards for direct mail, events, and brand campaigns.
            </p>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setActiveCategory('all')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 ${activeCategory === 'all' ? 'bg-lp-green text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>All Postcards</button>
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
            <h2 className="text-h2 font-semibold text-gray-900 mb-4">Planning a mail campaign?</h2>
            <p className="text-body text-gray-500 mb-8">We can help with quantities, turnaround, and mailing logistics. Just tell us what you're working with.</p>
            <Link href="/get-quote"><Button size="lg">Talk to Us</Button></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
