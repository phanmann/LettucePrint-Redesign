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
    id: 'saddle-stitch',
    label: 'Saddle-Stitched Booklets',
    description: 'Staple-bound booklets for catalogs, lookbooks, event programs, and product guides — the most cost-effective multi-page format.',
    products: [
      {
        id: 'booklet-ss-55x85',
        href: '/services/marketing-materials/booklets/saddle-stitch-55x85',
        name: 'Saddle-Stitch Booklet',
        subtitle: '5.5" × 8.5"',
        description: 'Half-size booklet — compact, easy to carry, and perfect for menus, mini-catalogs, and pocket guides.',
        features: ['80 lb. gloss or matte text', 'Full-color cover & interior', 'Saddle-stitch binding', '8–64 page range'],
        turnaround: '5–7 business days',
        color: '#E8F5F1',
        image: '/images/products/booklets/booklet-open.jpg',
      },
      {
        id: 'booklet-ss-85x11',
        href: '/services/marketing-materials/booklets/saddle-stitch-85x11',
        name: 'Saddle-Stitch Booklet',
        subtitle: '8.5" × 11"',
        description: 'Full letter-size booklet — the standard for lookbooks, product catalogs, annual reports, and event programs.',
        features: ['80 lb. gloss or matte text', 'Full-color cover & interior', 'Saddle-stitch binding', '8–80 page range'],
        turnaround: '5–7 business days',
        color: '#F5F0E8',
        image: '/images/products/booklets/booklet-open.jpg',
      },
      {
        id: 'booklet-ss-square',
        href: '/services/marketing-materials/booklets/saddle-stitch-square',
        name: 'Square Saddle-Stitch Booklet',
        subtitle: '8.5" × 8.5"',
        description: 'Square format for a modern, editorial feel. Stands out on a shelf and works especially well for photo-heavy content.',
        features: ['80 lb. gloss or matte text', 'Full-color throughout', 'Saddle-stitch binding', '8–48 page range'],
        turnaround: '5–7 business days',
        color: '#E8F0F5',
        image: '/images/products/booklets/booklet-closed.jpg',
      },
    ],
  },
  {
    id: 'perfect-bound',
    label: 'Perfect Bound Booklets',
    description: 'Glue-bound with a flat spine — the format for catalogs, magazines, and any booklet you want to look and feel like a real publication.',
    products: [
      {
        id: 'booklet-pb-85x11',
        href: '/services/marketing-materials/booklets/perfect-bound-85x11',
        name: 'Perfect Bound Booklet',
        subtitle: '8.5" × 11"',
        description: 'Flat spine, square edges, and a substantial feel. The go-to for product catalogs, brand books, and trade publications.',
        features: ['100 lb. cover stock', '80 lb. interior text', 'Perfect bind (glued spine)', 'Full-color throughout', '48+ pages'],
        turnaround: '7–10 business days',
        color: '#F0E8F5',
        image: '/images/products/booklets/booklet-closed.jpg',
      },
      {
        id: 'booklet-pb-6x9',
        href: '/services/marketing-materials/booklets/perfect-bound-6x9',
        name: 'Perfect Bound Booklet',
        subtitle: '6" × 9"',
        description: 'Compact trade-book format. Clean and professional for B2B collateral, directories, and editorial-style publications.',
        features: ['100 lb. cover stock', '80 lb. interior text', 'Perfect bind (glued spine)', 'Full-color throughout', '48+ pages'],
        turnaround: '7–10 business days',
        color: '#E8F5EF',
        image: '/images/products/booklets/booklet-closed.jpg',
      },
    ],
  },
  {
    id: 'premium',
    label: 'Premium Booklets',
    description: 'Elevated production for brands that need their printed collateral to match the quality of their product.',
    products: [
      {
        id: 'booklet-soft-touch',
        href: '/services/marketing-materials/booklets/soft-touch-cover',
        name: 'Soft Touch Cover Booklet',
        subtitle: 'Custom sizes available',
        description: 'Saddle-stitch or perfect-bound booklet with a soft-touch laminated cover. The finish that separates a premium brand from everyone else.',
        features: ['Soft-touch laminated cover', '100 lb. interior text', 'Full-color throughout', 'Spot UV on cover available'],
        turnaround: '7–10 business days',
        color: '#F5E8E8',
        image: '/images/products/posters/poster-soft-touch.jpg',
      },
    ],
  },
]


export default function BookletsPage() {
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
              Booklets built to be read.
            </h1>
            <p className="text-body-lg text-gray-500 max-w-xl mb-8">
              Saddle-stitched or perfect-bound — we print product catalogs, lookbooks, event programs, and brand books that hold up.
            </p>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setActiveCategory('all')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 ${activeCategory === 'all' ? 'bg-lp-green text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>All Booklets</button>
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
                      <ProductCard key={product.id} {...product} categoryLabel={category.label} href={product.href} />
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        <section className="py-16 bg-white border-t border-gray-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-h2 font-semibold text-gray-900 mb-4">Have a specific page count or binding in mind?</h2>
            <p className="text-body text-gray-500 mb-8">We'll spec it out for you — page count, paper, binding, finish. Just tell us what it's for.</p>
            <Link href="/get-quote"><Button size="lg">Talk to Us</Button></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
