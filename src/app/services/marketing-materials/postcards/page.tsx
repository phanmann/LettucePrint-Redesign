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
    label: 'Standard Postcards',
    description: 'Crisp, full-color postcards in common mailer sizes — ready to send or hand out.',
    href: '/services/marketing-materials/postcards/standard',
    card: {
      id: 'pc-standard',
      name: 'Standard Postcards',
      subtitle: '4×6 · 5×7 · 6×9',
      description: 'Full-color postcards on Standard 100 lb. gloss cover or Premium 16 pt stock. 4×6, 5×7, and 6×9 — from $49 for 100.',
      color: '#E8F5F1',
      options: [
        { label: 'Sizes',    values: ['4" × 6"', '5" × 7"', '6" × 9"'] },
        { label: 'Stock',    values: ['Standard 100 lb. gloss', 'Premium 16 pt'] },
        { label: 'Sides',    values: ['Single-sided', 'Double-sided'] },
      ],
      features: [
        '100 lb. gloss or matte stock',
        'Full-color CMYK both sides',
        'USPS postcard compliant',
        'Bulk pricing available',
        'Rounded corner option',
      ],
      turnaround: '2–3 business days',
    },
  },

]

export default function PostcardsPage() {
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
              Postcards that actually get noticed.
            </h1>
            <p className="text-body-lg text-gray-500 max-w-xl mb-8">
              Standard mailer sizes with a choice of stocks — full-color postcards for direct mail, events, and brand campaigns.
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
                All Postcards
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
                      <ProductCard
                        {...category.card}
                        categoryLabel={category.label}
                        href={category.href}
                      />
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
              Planning a mail campaign?
            </h2>
            <p className="text-body text-gray-500 mb-8">
              We can help with quantities, turnaround, and mailing logistics. Just tell us what you&apos;re working with.
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
