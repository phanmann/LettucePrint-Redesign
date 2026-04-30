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
    label: 'Standard Business Cards',
    description: 'Classic 3.5" × 2" business cards with crisp full-color printing and a range of stock options.',
    href: '/services/marketing-materials/business-cards/standard',
    card: {
      id: 'bc-standard',
      name: 'Standard Business Cards',
      subtitle: '3.5" × 2"',
      description: 'Full-color printing on your choice of finish — matte, gloss, or uncoated. Clean, professional, and fast.',
      color: '#E8F5F1'
        image: 'https://drive.usercontent.google.com/download?id=1LYzqKl5GRanrRWxBdsn_tnLxmp2dau-D&export=view',,
      options: [
        { label: 'Finishes', values: ['Matte', 'Gloss', 'Uncoated'] },
        { label: 'Stock',    values: ['14 pt', '16 pt'] },
        { label: 'Sides',    values: ['Single-sided', 'Double-sided'] },
      ],
      features: [
        '14–16 pt card stock',
        'Full-color CMYK printing',
        'Matte, gloss, or uncoated finish',
        'Rounded corner option',
        'Single or double-sided',
      ],
      turnaround: '2–3 business days',
    },
  },
  {
    id: 'premium',
    label: 'Premium Business Cards',
    description: 'Elevated finishes that make a lasting first impression — soft-touch, foil, raised spot UV, and thick board.',
    href: '/services/marketing-materials/business-cards/premium',
    card: {
      id: 'bc-premium',
      name: 'Premium Business Cards',
      subtitle: '3.5" × 2"',
      description: 'Stand-out finishes for brands that want to leave an impression. Soft-touch, spot UV, foil, and extra-thick options.',
      color: '#F0E8F5'
        image: 'https://drive.usercontent.google.com/download?id=1MHeRH5jLNMqM58gLeg9xmIsKEn791F7K&export=view',,
      options: [
        { label: 'Finishes', values: ['Soft Touch', 'Spot UV', 'Foil Stamped', 'Extra Thick 32pt'] },
        { label: 'Stock',    values: ['18 pt', '32 pt'] },
        { label: 'Extras',   values: ['Edge painting', 'Colored core', 'Rounded corners'] },
      ],
      features: [
        '18–32 pt card stock',
        'Soft-touch matte laminate',
        'Raised spot UV overlay',
        'Hot foil stamping (gold, silver, custom)',
        'Triple-layer colored core available',
        'Edge painting available',
      ],
      turnaround: '3–7 business days',
    },
  },
]

export default function BusinessCardsPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const filtered =
    activeCategory === 'all' ? CATEGORIES : CATEGORIES.filter(c => c.id === activeCategory)

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-[calc(72px+4rem)] pb-12 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lp-green mb-4">
              Marketing Materials
            </p>
            <h1 className="text-display font-semibold text-gray-900 mb-4 max-w-2xl">
              Business cards worth keeping.
            </h1>
            <p className="text-body-lg text-gray-500 max-w-xl mb-8">
              From clean matte to foil-stamped luxury — we print business cards that make the right
              first impression.
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 ${
                  activeCategory === 'all'
                    ? 'bg-lp-green text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All Cards
              </button>
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 ${
                    activeCategory === cat.id
                      ? 'bg-lp-green text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Cards */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatePresence mode="wait">
              {activeCategory === 'all' ? (
                <motion.div
                  key="all"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                >
                  {CATEGORIES.map(cat => (
                    <ProductCard
                      key={cat.id}
                      {...cat.card}
                      categoryLabel={cat.label}
                      href={cat.href}
                    />
                  ))}
                </motion.div>
              ) : (
                filtered.map(category => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="mb-8">
                      <h2 className="text-h2 font-semibold text-gray-900 mb-2">{category.label}</h2>
                      <p className="text-body text-gray-500 max-w-2xl">{category.description}</p>
                    </div>
                    <div className="max-w-sm">
                      <ProductCard {...category.card} categoryLabel={category.label} href={category.href} />
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-h2 font-semibold text-gray-900 mb-4">
              Not sure which finish is right?
            </h2>
            <p className="text-body text-gray-500 mb-8">
              We'll help you pick the card that matches your brand — and order a sample pack if you
              want to feel the difference.
            </p>
            <Link href="/get-quote">
              <Button size="lg">Talk to Us</Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
