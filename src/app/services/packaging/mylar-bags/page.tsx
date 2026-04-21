'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const PRODUCTS = [
  {
    id: 'mylar-standard',
    name: 'Standard Mylar Bag',
    subtitle: 'Custom sizes available',
    description: 'Heat-sealable, smell-proof, and child-resistant mylar bags for cannabis, food, supplements, and general retail. Full-color custom print.',
    features: [
      'Smell-proof barrier',
      'Heat-sealable top',
      'Child-resistant zipper option',
      'Full-color custom print',
      'Available in multiple sizes',
      'Matte or gloss finish',
    ],
    turnaround: '10–14 business days',
    color: '#E8F5F1',
  },
  {
    id: 'mylar-diecut',
    name: 'Die-Cut Mylar Bag',
    subtitle: 'Custom shapes available',
    description: "Custom-shaped mylar bags cut to your brand's silhouette. Stand out on the shelf with a unique form factor.",
    features: [
      'Custom die-cut shape',
      'Smell-proof barrier',
      'Heat-sealable',
      'Full-color print',
      'Zipper or tear-notch options',
      'Great for cannabis & boutique food brands',
    ],
    turnaround: '14–21 business days',
    color: '#F5F0E8',
  },
]

export default function MylarBagsPage() {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <>
      <Navbar />
      <main>
        <section className="pt-[calc(72px+4rem)] pb-12 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lp-green mb-4">Boxes & Packaging</p>
            <h1 className="text-display font-semibold text-gray-900 mb-4 max-w-2xl">Custom Mylar Bags</h1>
            <p className="text-body-lg text-gray-500 max-w-xl">Smell-proof, heat-sealable, and fully custom printed. Built for cannabis brands, food products, supplements, and specialty retail.</p>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {PRODUCTS.map(product => (
                <div key={product.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
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
                    <button onClick={() => setExpanded(expanded === product.id ? null : product.id)} className="flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-lp-green transition-colors mb-4">
                      <ChevronDown size={14} className={`transition-transform duration-200 ${expanded === product.id ? 'rotate-180' : ''}`} />
                      {expanded === product.id ? 'Hide details' : 'See details'}
                    </button>
                    <AnimatePresence>
                      {expanded === product.id && (
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
                    <Link href={`/get-quote?product=${encodeURIComponent(product.name)}&category=Mylar+Bags`}>
                      <Button size="sm" className="w-full">Get a Quote <ArrowRight size={14} className="ml-1" /></Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white border-t border-gray-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-h2 font-semibold text-gray-900 mb-4">Need compliance packaging?</h2>
            <p className="text-body text-gray-500 mb-8">We understand cannabis compliance requirements. Tell us your state and product type and we'll make sure your bags meet the rules.</p>
            <Link href="/get-quote"><Button size="lg">Talk to Us</Button></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
