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
      subtitle: '4×6 · 5×7 · 6×9 · 6×11',
      description: 'Full-color printing on 100 lb. gloss or matte stock. Available in all standard mailer sizes — USPS compliant, bulk pricing available.',
      color: '#E8F5F1',
      image: 'https://drive.usercontent.google.com/download?id=16GP_uv16UVWwZyO_WAvAZDfCMoMRsCoE&export=view',
      options: [
        { label: 'Sizes',    values: ['4" × 6"', '5" × 7"', '6" × 9"', '6" × 11"'] },
        { label: 'Stock',    values: ['100 lb. Gloss', '100 lb. Matte'] },
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
  {
    id: 'premium',
    label: 'Premium Postcards',
    description: 'Elevated stocks and finishes for brands that want their mailers to feel as good as they look.',
    href: '/services/marketing-materials/postcards/premium',
    card: {
      id: 'pc-premium',
      name: 'Premium Postcards',
      subtitle: 'Custom sizes available',
      description: 'Stand-out finishes for mailers that demand attention. Soft-touch laminate or raised spot UV on heavy 18 pt stock.',
      color: '#F0E8F5',
      image: 'https://drive.usercontent.google.com/download?id=1wnC7cM8WjOAV5H2gx3DK3u9gr5WLmx4A&export=view',
      options: [
        { label: 'Finishes', values: ['Soft Touch', 'Spot UV'] },
        { label: 'Stock',    values: ['18 pt'] },
        { label: 'Sides',    values: ['Single-sided', 'Double-sided'] },
      ],
      features: [
        '18 pt card stock',
        'Soft-touch matte laminate',
        'Raised spot UV overlay',
        'Full-color CMYK printing',
        'Custom sizes available',
      ],
      turnaround: '3–5 business days',
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
              Standard mailer sizes to oversized premium stock — full-color postcards for direct mail, events, and brand campaigns.
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
