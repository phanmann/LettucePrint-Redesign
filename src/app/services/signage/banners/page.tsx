'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Data ────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    id: 'retractable',
    label: 'Retractable Banners',
    description: 'Professional pull-up banners for trade shows, events, retail, and corporate settings. Easy setup, portable, and built to last.',
    products: [
      {
        id: 'retractable-standard-33',
        name: 'Standard Retractable Banner',
        size: '33" × 80"',
        description: 'Our most popular retractable banner. Lightweight aluminum base, full-color print on premium banner material.',
        features: ['Aluminum base', 'Full-color print', 'Carrying bag included', 'Setup in under 60 seconds'],
        turnaround: '3–5 business days',
        color: '#E8F5F1',
      },
      {
        id: 'retractable-luxury-33',
        name: 'Luxury Base Retractable',
        size: '33" × 80"',
        description: 'Premium weighted base for a more stable, upscale presentation. Perfect for lobbies, showrooms, and high-end events.',
        features: ['Heavy-duty base', 'Premium banner material', 'Carrying bag included', 'Enhanced stability'],
        turnaround: '3–5 business days',
        color: '#E8F0F5',
      },
      {
        id: 'retractable-tabletop',
        name: 'Table Top Retractable',
        size: '9" × 12"',
        description: 'Compact tabletop version for product displays, reception desks, and counter promotions.',
        features: ['Compact design', 'Desk & counter ready', 'Full-color print', 'Lightweight'],
        turnaround: '3–5 business days',
        color: '#F5F0E8',
      },
      {
        id: 'retractable-standard-48',
        name: 'Standard Retractable Banner',
        size: '48" × 80"',
        description: 'Wide-format retractable for maximum visual impact. Ideal for large booths and open floor spaces.',
        features: ['Wide 48" format', 'Aluminum base', 'Full-color print', 'Carrying bag included'],
        turnaround: '3–5 business days',
        color: '#F0E8F5',
      },
      {
        id: 'retractable-standard-60',
        name: 'Standard Retractable Banner',
        size: '60" × 80"',
        description: 'Our largest retractable format — a commanding presence at any event or trade show floor.',
        features: ['XL 60" format', 'Dual base system', 'Full-color print', 'Heavy-duty carrying case'],
        turnaround: '5–7 business days',
        color: '#E8F5EF',
      },
    ],
  },
  {
    id: 'hanging',
    label: 'Hanging Banners',
    description: 'Suspended overhead displays for retail environments, trade shows, gyms, arenas, and large venues.',
    products: [
      {
        id: 'hanging-vinyl',
        name: 'Vinyl Banner',
        size: 'Custom sizes available',
        description: 'Durable, weather-resistant vinyl banners for indoor and outdoor hanging. Grommets included for easy install.',
        features: ['13 oz. scrim vinyl', 'Grommets included', 'Indoor & outdoor use', 'Custom sizes'],
        turnaround: '2–4 business days',
        color: '#E8F5F1',
      },
      {
        id: 'hanging-fabric',
        name: 'Fabric Banner',
        size: 'Custom sizes available',
        description: 'Soft, wrinkle-resistant fabric with vibrant dye-sublimation printing. Lightweight and elegant.',
        features: ['Dye-sublimation print', 'Wrinkle resistant', 'Lightweight fabric', 'Machine washable'],
        turnaround: '3–5 business days',
        color: '#F5F0E8',
      },
      {
        id: 'hanging-mesh',
        name: 'Perforated Mesh Banner',
        size: 'Custom sizes available',
        description: 'Wind-permeable mesh for outdoor hanging. Maintains visibility while reducing wind load on large installations.',
        features: ['Wind-permeable mesh', 'Outdoor rated', 'Grommets included', 'UV resistant inks'],
        turnaround: '3–5 business days',
        color: '#E8F0F5',
      },
    ],
  },
]

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({ product, categoryLabel }: { product: typeof CATEGORIES[0]['products'][0]; categoryLabel: string }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Placeholder image */}
      <div
        className="w-full h-52 flex items-center justify-center"
        style={{ backgroundColor: product.color }}
      >
        <div className="text-center px-6">
          <p className="text-sm font-semibold text-gray-500 mb-1">{product.name}</p>
          <p className="text-xs text-gray-400">{product.size}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-base font-semibold text-gray-900 leading-snug">{product.name}</h3>
          <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0">{product.size}</span>
        </div>
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">{product.description}</p>

        {/* Expandable features */}
        <button
          onClick={() => setExpanded(e => !e)}
          className="flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-lp-green transition-colors mb-4"
        >
          <ChevronDown size={14} className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
          {expanded ? 'Hide details' : 'See details'}
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.15 }}
              className="overflow-hidden"
            >
              <ul className="space-y-1.5 mb-4">
                {product.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-lp-green flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-gray-400 mb-4">Turnaround: {product.turnaround}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <Link
          href={`/get-quote?product=${encodeURIComponent(product.name)}&size=${encodeURIComponent(product.size)}&category=${encodeURIComponent(categoryLabel)}`}
        >
          <Button size="sm" className="w-full">
            Get a Quote <ArrowRight size={14} className="ml-1" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BannersPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const filtered = activeCategory === 'all'
    ? CATEGORIES
    : CATEGORIES.filter(c => c.id === activeCategory)

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-[calc(72px+4rem)] pb-12 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lp-green mb-4">Signs & Banners</p>
            <h1 className="text-display font-semibold text-gray-900 mb-4 max-w-2xl">
              Banners that show up.
            </h1>
            <p className="text-body-lg text-gray-500 max-w-xl mb-8">
              Retractable pull-ups, hanging fabric, vinyl, mesh — we print and build banners for events, trade shows, retail, and everything in between.
            </p>

            {/* Category filter pills */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 ${
                  activeCategory === 'all'
                    ? 'bg-lp-green text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All Banners
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

        {/* Product sections */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            <AnimatePresence mode="wait">
              {filtered.map(category => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Category header */}
                  <div className="mb-8">
                    <h2 className="text-h2 font-semibold text-gray-900 mb-2">{category.label}</h2>
                    <p className="text-body text-gray-500 max-w-2xl">{category.description}</p>
                  </div>

                  {/* Product grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {category.products.map(product => (
                      <ProductCard key={product.id} product={product} categoryLabel={category.label} />
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-h2 font-semibold text-gray-900 mb-4">Not sure what you need?</h2>
            <p className="text-body text-gray-500 mb-8">Tell us about your event or space and we'll recommend the right banner for the job.</p>
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
