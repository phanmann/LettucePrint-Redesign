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
    id: 'half-page',
    label: 'Half Page Flyer',
    description: 'Compact and cost-effective — perfect for handouts, rack cards, and high-volume distribution.',
    href: '/services/marketing-materials/flyers/half-page',
    card: {
      id: 'flyer-half',
      name: 'Half Page Flyer',
      subtitle: '5.5" × 8.5"',
      description: 'The workhorse handout. Fits in bags, pockets, and racks. Great for menus, event promos, and retail inserts.',
      color: '#E8F5F1',
      image: '/images/products/flyers/flyer-half-page-card.jpg',
      options: [
        { label: 'Size',    values: ['5.5" × 8.5"'] },
        { label: 'Stock',   values: ['80 lb. Gloss', '80 lb. Matte', '100 lb. Cover'] },
        { label: 'Sides',   values: ['Single-sided', 'Double-sided'] },
      ],
      features: [
        '80–100 lb. stock options',
        'Full-color CMYK printing',
        'Gloss or matte finish',
        'Single or double-sided',
        'Bulk pricing available',
      ],
      turnaround: '1–2 business days',
    },
  },
  {
    id: 'full-page',
    label: 'Full Page Flyer',
    description: 'Standard 8.5" × 11" flyers for maximum visual impact — the format people expect.',
    href: '/services/marketing-materials/flyers/full-page',
    card: {
      id: 'flyer-full',
      name: 'Full Page Flyer',
      subtitle: '8.5" × 11"',
      description: 'Full letter-size flyers in gloss, matte, or heavy cover stock. High-volume or premium — your call.',
      color: '#E8F0F5',
      image: '/images/products/flyers/flyer-full-page-card.jpg',
      options: [
        { label: 'Size',    values: ['8.5" × 11"'] },
        { label: 'Finish',  values: ['Gloss', 'Matte', 'Heavy Stock'] },
        { label: 'Sides',   values: ['Single-sided', 'Double-sided'] },
      ],
      features: [
        '80 lb. gloss or matte text',
        '100 lb. cover option',
        'Full-color CMYK printing',
        'Single or double-sided',
        'Bulk pricing available',
      ],
      turnaround: '1–2 business days',
    },
  },
  {
    id: 'tabloid',
    label: 'Tabloid Flyer',
    description: 'Tabloid-sized flyers for maximum presence — menus, posters, event sheets, and retail displays.',
    href: '/services/marketing-materials/flyers/tabloid',
    card: {
      id: 'flyer-tabloid',
      name: 'Tabloid Flyer',
      subtitle: '11" × 17"',
      description: 'Twice the real estate of a letter flyer. Perfect for menus, in-store promotions, concert bills, and display boards.',
      color: '#E8F5EF',
      image: '/images/products/flyers/flyer-tabloid-card.jpg',
      options: [
        { label: 'Size',    values: ['11" × 17"'] },
        { label: 'Finish',  values: ['Gloss', 'Matte'] },
        { label: 'Sides',   values: ['Single-sided', 'Double-sided'] },
      ],
      features: [
        '80 lb. gloss or matte text',
        'Full-color CMYK printing',
        'Single or double-sided',
        'Folding available',
        'Bulk pricing available',
      ],
      turnaround: '2–3 business days',
    },
  },
  {
    id: 'poster-11x17',
    label: '11" × 17" Poster',
    description: 'The classic concert-bill size for bulletin boards, windows, retail counters, and event walls.',
    href: '/services/marketing-materials/posters/small',
    card: {
      id: 'poster-11x17',
      name: 'Small Poster',
      subtitle: '11" × 17"',
      description: 'The classic concert bill size. Works everywhere — bulletin boards, windows, retail counters, and bar walls.',
      features: ['80 lb. gloss or matte text', 'Full-color printing', 'Crisp edge-to-edge coverage', 'Bulk pricing available'],
      turnaround: '1–2 business days',
      color: '#E8F5F1',
      image: '/images/products/posters/poster-1.jpg',
    },
  },
  {
    id: 'poster-18x24',
    label: '18" × 24" Poster',
    description: 'A versatile standard poster size for retail displays, promotions, events, and gallery prints.',
    href: '/services/marketing-materials/posters/medium',
    card: {
      id: 'poster-18x24',
      name: 'Medium Poster',
      subtitle: '18" × 24"',
      description: 'Standard poster size for retail displays, in-store promotions, event signage, and gallery prints.',
      features: ['80 lb. gloss or matte text', 'Full-color printing', 'Vivid, accurate color reproduction', 'Optional lamination'],
      turnaround: '2–3 business days',
      color: '#F5F0E8',
      image: '/images/products/posters/poster-1.jpg',
    },
  },
  {
    id: 'poster-24x36',
    label: '24" × 36" Poster',
    description: 'Movie-poster scale for high-impact storefronts, events, trade shows, and gallery spaces.',
    href: '/services/marketing-materials/posters/large',
    card: {
      id: 'poster-24x36',
      name: 'Large Poster',
      subtitle: '24" × 36"',
      description: 'Movie-poster size. Maximum impact for storefronts, events, trade shows, and gallery spaces.',
      features: ['80 lb. or 100 lb. stock', 'Full-color printing', 'Matte or gloss finish', 'Optional tube rolling'],
      turnaround: '2–3 business days',
      color: '#E8F0F5',
      image: '/images/products/posters/poster-2.jpg',
    },
  },
]

export default function FlyersPage() {
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
              Flyers &amp; Posters that move fast.
            </h1>
            <p className="text-body-lg text-gray-500 max-w-xl mb-8">
              From half-sheet handouts to large-format posters — full-color printing with quick turnaround.
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
                All Flyers &amp; Posters
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
              Need a custom size or big quantity?
            </h2>
            <p className="text-body text-gray-500 mb-8">
              We handle large runs efficiently. Tell us the size, quantity, and deadline and we&apos;ll make it happen.
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
