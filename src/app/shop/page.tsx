import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Shop — Custom Print Products',
  description: 'Order custom stickers and roll labels online. Real-time pricing, fast turnaround, printed in Brooklyn.',
}

const products = [
  {
    name: 'Custom Die-Cut Stickers',
    href: '/shop/stickers',
    badge: { label: 'Most Popular', variant: 'popular' as const },
    description: 'Premium vinyl stickers cut precisely to your shape. Standard, holographic, and spot UV finishes available.',
    startingAt: '$38',
    forQty: '50 stickers',
    features: ['Die-cut to shape', 'Waterproof & UV resistant', '3–5 day turnaround', 'Holographic & Spot UV available'],
    color: 'bg-lp-green',
  },
  {
    name: 'Roll Labels',
    href: '/shop/roll-labels',
    badge: { label: 'Bulk', variant: 'rush' as const },
    description: 'High-volume kiss-cut labels on a roll. Ideal for product packaging, retail, food & beverage.',
    startingAt: 'Custom',
    forQty: 'pricing',
    features: ['Kiss-cut on roll', 'High-volume ready', 'Food-safe options', 'Custom sizes'],
    color: 'bg-lp-green-dark',
  },
]

export default function ShopPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">

        {/* Header */}
        <div className="bg-lp-green py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70 mb-4">Shop</p>
            <h1 className="text-h1 font-semibold text-white mb-4">
              Order online. Pick up or ship.
            </h1>
            <p className="text-body-lg text-white/80 max-w-xl">
              Transparent pricing, instant quotes, and real turnaround times.
              No back-and-forth for standard products.
            </p>
          </div>
        </div>

        {/* Products */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
            {products.map((product) => (
              <div
                key={product.href}
                className="bg-white rounded-card shadow-card border border-gray-100 overflow-hidden flex flex-col"
              >
                {/* Color block */}
                <div className={`${product.color} h-32 flex items-center justify-center`}>
                  <span className="text-white/20 text-xs uppercase tracking-widest font-semibold">
                    {product.name}
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="mb-4">
                    <Badge variant={product.badge.variant} className="mb-3">{product.badge.label}</Badge>
                    <h2 className="text-h3 font-semibold text-gray-900 mb-2">{product.name}</h2>
                    <p className="text-small text-gray-600">{product.description}</p>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {product.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-lp-green flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <div className="flex items-baseline gap-1.5 mb-4">
                      <span className="text-h3 font-semibold text-gray-900">{product.startingAt}</span>
                      <span className="text-small text-gray-500">/ {product.forQty}</span>
                    </div>
                    <Link href={product.href}>
                      <Button size="md" className="w-full">
                        Configure & Order
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Custom CTA */}
          <div className="bg-gray-50 rounded-card border border-gray-200 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-h3 font-semibold text-gray-900 mb-2">Need something not listed here?</h3>
              <p className="text-small text-gray-600">
                Packaging, large format, screen printing, signage — get a custom quote for any project.
              </p>
            </div>
            <Link href="/get-quote" className="flex-shrink-0">
              <Button variant="secondary" size="lg">
                Get a Custom Quote <ArrowRight size={14} />
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
