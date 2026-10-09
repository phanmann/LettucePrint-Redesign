'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import ProductCard from '@/components/shop/ProductCard'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Data ────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    id: 'retractable',
    label: 'Retractable & X-Stand Banners',
    description: 'Portable banner stands for trade shows, events, retail, and corporate settings. Easy setup, carry bag included, built to last.',
    products: [
      {
        id: 'retractable-standard',
        href: '/services/signage/banners/retractable-standard',
        name: 'Standard Retractable Banner',
        subtitle: '33" × 80" · from $149',
        description: 'Lightweight aluminum pull-up banner for booths, retail displays, and event signage.',
        features: ['Aluminum base', 'Curl-free blockout print', 'Carrying bag included', 'Setup in under 60 seconds'],
        turnaround: 'Production 3 business days after proof approval',
        color: '#E8F5F1',
        image: 'https://drive.usercontent.google.com/download?id=1lkdgvN3wjRMfftKmeu5X47ZwHyor7dzB&export=view',
      },
      {
        id: 'retractable-luxury-33',
        href: '/services/signage/banners/retractable-luxury-33',
        name: 'Luxury Base Retractable',
        subtitle: '33" × 80" · from $239',
        description: 'Premium teardrop base for a more stable, upscale presentation. Perfect for lobbies, showrooms, and high-end events.',
        features: ['Luxury teardrop base', 'Curl-free blockout print', 'Carrying bag included', 'Enhanced stability'],
        turnaround: 'Production 3 business days after proof approval',
        color: '#E8F0F5',
        image: '/images/products/banners/retractable-luxury-33/luxury-base-retractable.webp',
        imageFit: 'contain' as const,
      },
      {
        id: 'x-stand-24x63',
        href: '/services/signage/banners/x-stand-24x63',
        name: 'X-Stand Banner',
        subtitle: '24" × 63" · from $79',
        description: 'Budget-friendly X-frame banner stand for counters, entrances, and events.',
        features: ['Fiberglass X-frame', 'Curl-free blockout print', 'Carrying bag included', 'Lightweight'],
        turnaround: 'Production 3 business days after proof approval',
        color: '#F5F0E8',
        image: '/images/products/banners/x-stand-placeholder.svg',
        imageFit: 'contain' as const,
      },
      {
        id: 'x-stand-32x71',
        href: '/services/signage/banners/x-stand-32x71',
        name: 'X-Stand Banner — Large',
        subtitle: '32" × 71" · from $119',
        description: 'Larger X-frame banner stand for trade shows, retail floors, and events.',
        features: ['Fiberglass X-frame', 'Curl-free blockout print', 'Carrying bag included', 'Lightweight'],
        turnaround: 'Production 3 business days after proof approval',
        color: '#F5F0E8',
        image: '/images/products/banners/x-stand-placeholder.svg',
        imageFit: 'contain' as const,
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
        href: '/services/signage/banners/vinyl-banner',
        name: 'Vinyl Banner',
        subtitle: 'Custom sizes available',
        description: 'Durable, weather-resistant vinyl banners for indoor and outdoor hanging. Grommets included for easy install.',
        features: ['13 oz matte vinyl', 'Hem + grommets every 24 in', 'Indoor & outdoor use', 'Custom sizes'],
        turnaround: 'Ships 3 business days after proof approval + UPS transit',
        color: '#E8F5F1',
        image: '/images/products/banners/vinyl-banner.jpg',
      },
      {
        id: 'hanging-double-sided',
        href: '/services/signage/banners/double-sided-banner',
        name: 'Double-Sided Banner',
        subtitle: 'Custom widths 12–126 in',
        description: '18 oz blockout vinyl, matte both sides. No show-through. Placeholder illustration shown.',
        features: ['Indoor & outdoor use', 'Hem + grommets every 24 in', 'Pole pockets available', 'From $59'],
        turnaround: 'Ships 3 business days after proof approval + UPS transit',
        color: '#E8F5F1',
        image: '/images/products/banners/double-sided-placeholder.svg',
      },
      {
        id: 'hanging-fabric',
        href: '/services/signage/banners/fabric-banner',
        name: 'Fabric Banner',
        subtitle: 'Custom sizes available',
        description: 'Soft, wrinkle-resistant fabric with vibrant dye-sublimation printing. Lightweight and elegant.',
        features: ['Dye-sublimation print', 'Wrinkle resistant', 'Lightweight fabric', 'Machine washable'],
        turnaround: '3–5 business days',
        color: '#F5F0E8',
        image: '/images/products/banners/fabric-banner.jpg',
      },
      {
        id: 'hanging-mesh',
        href: '/services/signage/banners/mesh-banner',
        name: 'Perforated Mesh Banner',
        subtitle: 'Custom sizes available',
        description: 'Wind-permeable mesh for outdoor hanging. Maintains visibility while reducing wind load on large installations.',
        features: ['Wind-permeable mesh', 'Outdoor rated', 'Grommets included', 'UV resistant inks'],
        turnaround: '3–5 business days',
        color: '#E8F0F5',
        image: '/images/products/banners/mesh-banner.jpg',
      },
    ],
  },
]

// ─── Product Card ─────────────────────────────────────────────────────────────


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
                      <ProductCard key={product.id} {...product} categoryLabel={category.label} href={product.href} />
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
            <p className="text-body text-gray-500 mb-8">Tell us about your event or space and we&apos;ll recommend the right banner for the job.</p>
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
