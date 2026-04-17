import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Shop — Custom Print Products',
  description: 'Order custom stickers and roll labels online. Real-time pricing, fast turnaround, printed in Brooklyn.',
}

const products = [
  {
    name: 'Custom Die-Cut Stickers',
    href: '/shop/stickers',
    description: 'Premium vinyl stickers cut precisely to your shape. Standard and holographic finishes available.',
    features: ['Die-cut to shape', 'Waterproof & UV resistant', '3–5 day turnaround', 'Standard & holographic vinyl'],
    color: 'bg-lp-green',
  },
  {
    name: 'Spot UV Stickers',
    href: '/shop/spot-uv',
    description: 'Gloss UV coating over a matte base for a luxury tactile finish. The sticker that gets noticed.',
    features: ['Gloss-on-matte effect', 'Premium tactile finish', 'Die-cut to shape', '3–5 day turnaround'],
    color: 'bg-lp-black',
  },
  {
    name: 'Roll Labels',
    href: '/shop/roll-labels',
    description: 'High-volume kiss-cut labels on a roll. Ideal for product packaging, retail, food & beverage.',
    features: ['Kiss-cut on roll', 'High-volume ready', 'Food-safe options', 'Custom sizes'],
    color: 'bg-lp-green-dark',
  },
]

export default function ShopPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">

        {/* Products */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lp-green mb-8">Shop</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {products.map((product) => (
              <div
                key={product.href}
                className="bg-white rounded-card shadow-card border border-gray-100 overflow-hidden flex flex-col"
              >
                {/* Color block */}
                <div className={`${product.color} h-32 flex items-center justify-center`}>
                  <span className="text-white/60 text-xs uppercase tracking-widest font-semibold">
                    {product.name}
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="mb-4">
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
                    <Link href={product.href}>
                      <Button size="md" className="w-full">
                        Order Now
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
