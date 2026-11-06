'use client'

import { useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'
import ProductCard, { type ProductCardProps } from '@/components/shop/ProductCard'

export type MarketingProduct = Omit<ProductCardProps, 'categoryLabel'> & { href: string }

export interface MarketingCategoryGroup {
  id: string
  label: string
  description: string
  products: MarketingProduct[]
}

function subscribeToHash(onChange: () => void) {
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}

// Category listing: Postcards-style hero and product cards, with headed sections like the Banners page.
export default function MarketingCategoryPage({ title, introduction, allLabel, groups, ctaHeading, ctaText, combineGroups = false }: {
  title: string
  introduction: string
  allLabel: string
  groups: MarketingCategoryGroup[]
  ctaHeading: string
  ctaText: string
  combineGroups?: boolean
}) {
  // Old single-category URLs redirect here with a hash (e.g. #posters) that preselects that filter.
  const hash = useSyncExternalStore(subscribeToHash, () => window.location.hash.slice(1), () => '')
  const [pickedGroup, setActiveGroup] = useState<string | null>(null)
  const activeGroup = pickedGroup ?? (groups.some(group => group.id === hash) ? hash : 'all')
  const pill = (active: boolean) => `px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 ${
    active ? 'bg-lp-green text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
  }`

  return (
    <>
      <Navbar />
      <main>
        <section className="pt-[calc(72px+4rem)] pb-12 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/services/marketing-materials" className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-lp-green mb-4 hover:underline">
              Marketing Materials
            </Link>
            <h1 className="text-display font-semibold text-gray-900 mb-4 max-w-2xl">{title}</h1>
            <p className="text-body-lg text-gray-500 max-w-xl mb-8">{introduction}</p>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setActiveGroup('all')} className={pill(activeGroup === 'all')}>{allLabel}</button>
              {groups.map(group => (
                <button key={group.id} onClick={() => setActiveGroup(group.id)} className={pill(activeGroup === group.id)}>
                  {group.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Product sections — same layout as the Banners page */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            <AnimatePresence mode="wait">
              {combineGroups ? (
                <motion.div key={activeGroup} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {groups.filter(group => activeGroup === 'all' || group.id === activeGroup).flatMap(group => group.products.map(product => <ProductCard key={product.id} {...product} categoryLabel={group.label} />))}
                </motion.div>
              ) : groups.filter(group => activeGroup === 'all' || group.id === activeGroup).map(group => (
                <motion.div key={group.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }}>
                  <div className="mb-8">
                    <h2 className="text-h2 font-semibold text-gray-900 mb-2">{group.label}</h2>
                    <p className="text-body text-gray-500 max-w-2xl">{group.description}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {group.products.map(product => <ProductCard key={product.id} {...product} categoryLabel={group.label} />)}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        <section className="py-16 bg-white border-t border-gray-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-h2 font-semibold text-gray-900 mb-4">{ctaHeading}</h2>
            <p className="text-body text-gray-500 mb-8">{ctaText}</p>
            <Link href="/get-quote"><Button size="lg">Talk to Us</Button></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
