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
    id: 'step-repeat',
    label: 'Step & Repeat Backdrops',
    description: 'The classic branded photo backdrop — tiled logos on fabric or vinyl for red carpets, press walls, events, and activations.',
    products: [
      {
        id: 'sr-8x8',
        name: 'Step & Repeat Backdrop',
        subtitle: '8\' × 8\'',
        description: 'Standard step & repeat size for most events. Full-color dye-sublimation on wrinkle-resistant fabric with aluminum frame system.',
        features: ['Dye-sublimation fabric print', 'Wrinkle-resistant polyester', 'Aluminum frame included', 'Carry bag included', 'Tool-free assembly'],
        turnaround: '5–7 business days',
        color: '#E8F5F1',
      },
      {
        id: 'sr-10x8',
        name: 'Step & Repeat Backdrop',
        subtitle: '10\' × 8\'',
        description: 'Wider format for larger press walls, red carpets, and branded activations with more visual real estate.',
        features: ['Dye-sublimation fabric print', 'Wrinkle-resistant polyester', 'Aluminum frame included', 'Carry bag included', 'Tool-free assembly'],
        turnaround: '5–7 business days',
        color: '#F5F0E8',
      },
    ],
  },
  {
    id: 'eurofit',
    label: 'Eurofit Backdrops',
    description: 'Seamless fabric backdrops with a pillowcase-style stretch fit — no wrinkles, no hardware visible, ultra-clean presentation.',
    products: [
      {
        id: 'eurofit-8x8',
        name: 'Eurofit Backdrop',
        subtitle: '8\' × 8\'',
        description: 'Stretch-fit fabric graphic slides over the aluminum extrusion frame for a taut, seamless display. Clean and professional.',
        features: ['Stretch dye-sublimation fabric', 'Pillow-case edge fit', 'Aluminum extrusion frame', 'No visible hardware', 'Carry bag included'],
        turnaround: '5–7 business days',
        color: '#E8F0F5',
      },
      {
        id: 'eurofit-10x8',
        name: 'Eurofit Backdrop',
        subtitle: '10\' × 8\'',
        description: 'Wider Eurofit configuration for larger event footprints — same seamless finish, more coverage.',
        features: ['Stretch dye-sublimation fabric', 'Pillow-case edge fit', 'Aluminum extrusion frame', 'No visible hardware', 'Carry bag included'],
        turnaround: '5–7 business days',
        color: '#F0E8F5',
      },
    ],
  },
  {
    id: 'popup',
    label: 'Pop Up Displays',
    description: 'Curved or straight pop-up frame systems with full-color fabric or graphic panels — fast setup, big presence.',
    products: [
      {
        id: 'popup-8x8',
        name: 'Pop Up Display',
        subtitle: '8\' × 8\'',
        description: 'Compact pop-up backdrop ideal for smaller booths, photo ops, and press setups. Collapses into a carry case in minutes.',
        features: ['Full-color fabric or vinyl graphic', 'Spring-loaded frame', 'Collapses to carry case', 'Reusable graphic panels', 'Setup under 10 minutes'],
        turnaround: '5–7 business days',
        color: '#E8F5EF',
      },
      {
        id: 'popup-10x8',
        name: 'Pop Up Display',
        subtitle: '10\' × 8\'',
        description: 'Mid-size pop-up for standard trade show booths and event backdrops. Maximum visual impact with minimal setup time.',
        features: ['Full-color fabric or vinyl graphic', 'Spring-loaded frame', 'Collapses to carry case', 'Reusable graphic panels', 'Setup under 10 minutes'],
        turnaround: '5–7 business days',
        color: '#F5E8E8',
      },
      {
        id: 'popup-20x8',
        name: 'Pop Up Display',
        subtitle: '20\' × 8\'',
        description: 'Full-width trade show wall — commands the back of any 20-foot booth. Multiple frame sections connect seamlessly.',
        features: ['Full-color fabric or vinyl graphic', 'Multi-section frame system', 'Collapses to carry cases', 'Continuous seamless graphic', 'Setup under 20 minutes'],
        turnaround: '7–10 business days',
        color: '#E8F5F5',
      },
    ],
  },
  {
    id: 'seg',
    label: 'SEG Pop Up Stands',
    description: 'Silicone Edge Graphics (SEG) stretched into a lightweight aluminum frame — the cleanest, most professional backdrop available.',
    products: [
      {
        id: 'seg-10x8',
        name: 'SEG Pop Up Stand',
        subtitle: '10\' × 8\'',
        description: 'SEG fabric graphic with a silicone bead edge pressed into an aluminum frame channel. Zero hardware visible, perfectly flat print.',
        features: ['SEG dye-sublimation fabric', 'Silicone bead edge', 'Aluminum extrusion frame', 'Tool-free graphic swap', 'Carry bag included'],
        turnaround: '7–10 business days',
        color: '#F0E8F5',
      },
      {
        id: 'seg-8x10',
        name: 'SEG Pop Up Stand',
        subtitle: '8\' × 10\'',
        description: 'Taller SEG configuration — great for double-deck activations, stage backdrops, and high-ceiling venues.',
        features: ['SEG dye-sublimation fabric', 'Silicone bead edge', 'Aluminum extrusion frame', 'Tool-free graphic swap', 'Carry bag included'],
        turnaround: '7–10 business days',
        color: '#E8F0F5',
      },
      {
        id: 'seg-20x8',
        name: 'SEG Pop Up Stand',
        subtitle: '20\' × 8\'',
        description: 'Full 20-foot SEG wall for large activations, keynote stages, and trade show island booths. Maximum presence, seamless execution.',
        features: ['SEG dye-sublimation fabric', 'Silicone bead edge', 'Multi-section aluminum frame', 'Continuous seamless graphic', 'Carry bags included'],
        turnaround: '7–10 business days',
        color: '#E8F5F1',
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
        <Link href={`/get-quote?product=${encodeURIComponent(product.name)}&size=${encodeURIComponent(product.subtitle)}&category=${encodeURIComponent(categoryLabel)}`}>
          <Button size="sm" className="w-full">Get a Quote <ArrowRight size={14} className="ml-1" /></Button>
        </Link>
      </div>
    </div>
  )
}

export default function BackdropsPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const filtered = activeCategory === 'all' ? CATEGORIES : CATEGORIES.filter(c => c.id === activeCategory)

  return (
    <>
      <Navbar />
      <main>
        <section className="pt-[calc(72px+4rem)] pb-12 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lp-green mb-4">Signs & Banners</p>
            <h1 className="text-display font-semibold text-gray-900 mb-4 max-w-2xl">
              Backdrops that set the scene.
            </h1>
            <p className="text-body-lg text-gray-500 max-w-xl mb-8">
              Step & repeats, Eurofit fabric walls, pop-up displays, and SEG stands — full-color backdrops for events, trade shows, and brand activations.
            </p>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setActiveCategory('all')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 ${activeCategory === 'all' ? 'bg-lp-green text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>All Backdrops</button>
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
            <h2 className="text-h2 font-semibold text-gray-900 mb-4">Got an event coming up?</h2>
            <p className="text-body text-gray-500 mb-8">Tell us the venue, setup, and vibe — we'll recommend the right backdrop and make sure it arrives on time.</p>
            <Link href="/get-quote"><Button size="lg">Talk to Us</Button></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
