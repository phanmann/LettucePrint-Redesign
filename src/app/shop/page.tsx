import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
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
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80',
    features: ['Die-cut to shape', 'Waterproof & UV resistant', '3–5 day turnaround', 'Standard & holographic vinyl'],
  },
  {
    name: 'Spot UV Stickers',
    href: '/shop/spot-uv',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    features: ['Gloss-on-matte effect', 'Premium tactile finish', 'Die-cut to shape', '3–5 day turnaround'],
  },
  {
    name: 'Roll Labels',
    href: '/shop/roll-labels',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80',
    features: ['Kiss-cut on roll', 'High-volume ready', 'Food-safe options', 'Custom sizes'],
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
                {/* Product image */}
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="mb-4">
                    <h2 className="text-h3 font-semibold text-gray-900 mb-2">{product.name}</h2>
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
