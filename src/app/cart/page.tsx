import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, ArrowRight, Zap, Clock, Star } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Cart — Lettuce Print',
  description: 'Your cart is empty. Browse our best-selling print products.',
}

const bestSellers = [
  {
    name: 'Custom Die-Cut Stickers',
    subtitle: 'Waterproof · UV resistant · Any shape',
    badge: 'Best Seller',
    badgeColor: '#00A175',
    href: '/shop/stickers',
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80',
    features: ['Die-cut to any shape', 'Standard & holographic vinyl', '3–5 day turnaround'],
  },
  {
    name: 'Spot UV Stickers',
    subtitle: 'Gloss-on-matte · Premium tactile finish',
    badge: 'Premium',
    badgeColor: '#006145',
    href: '/shop/spot-uv',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    features: ['High-gloss UV coating', 'Matte base contrast', '3–5 day turnaround'],
  },
  {
    name: 'Roll Labels',
    subtitle: 'Kiss-cut · High volume ready',
    badge: 'Popular',
    badgeColor: '#acf2f9',
    badgeText: '#006145',
    href: '/shop/roll-labels',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80',
    features: ['Kiss-cut on roll', 'Food-safe options', 'Custom sizes'],
  },
]

export default function CartPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-[72px] bg-white">

        {/* ── Empty state hero ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center text-center py-20 lg:py-28">

            {/* Icon */}
            <div className="w-20 h-20 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center mb-6">
              <ShoppingCart size={32} className="text-gray-300" />
            </div>

            {/* Headline */}
            <h1 className="text-h1 font-semibold text-gray-900 mb-4">
              Your cart is empty.
            </h1>
            <p className="text-body-lg text-gray-400 max-w-sm mb-8 leading-relaxed">
              Looks like you haven&apos;t added anything yet. Browse our products or get a custom quote for your next project.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/shop">
                <Button size="md" className="!text-white">Browse Products</Button>
              </Link>
              <Link href="/get-quote">
                <Button variant="secondary" size="md">Get a Custom Quote</Button>
              </Link>
            </div>

            {/* Trust pills */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-10 text-xs text-gray-400">
              <span className="flex items-center gap-1.5">
                <Zap size={12} className="text-lp-green" /> Fast turnaround
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={12} className="text-lp-green" /> 3–5 day standard
              </span>
              <span className="flex items-center gap-1.5">
                <Star size={12} className="text-lp-green" /> Printed in Brooklyn
              </span>
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="border-t border-gray-100" />

        {/* ── Best sellers ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lp-green mb-2">
                Our Best Sellers
              </p>
              <h2 className="text-h2 font-semibold text-gray-900">
                Start with something great.
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-lp-green hover:text-lp-green-dark transition-colors"
            >
              View all <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bestSellers.map((product) => (
              <Link
                key={product.href}
                href={product.href}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {/* Image */}
                <div className="relative h-52 w-full overflow-hidden bg-gray-50 flex-shrink-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Badge */}
                  <span
                    className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: product.badgeColor,
                      color: product.badgeText ?? '#ffffff',
                    }}
                  >
                    {product.badge}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-base font-bold text-gray-900 mb-0.5 group-hover:text-lp-green transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-400 mb-4">{product.subtitle}</p>

                  <ul className="space-y-1.5 mb-5">
                    {product.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-lp-green flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-xs font-semibold text-lp-green uppercase tracking-wide">
                      Order Now
                    </span>
                    <ArrowRight
                      size={14}
                      className="text-lp-green -translate-x-1 group-hover:translate-x-0 transition-transform duration-200"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile view-all */}
          <div className="mt-8 text-center sm:hidden">
            <Link href="/shop">
              <Button variant="secondary" size="md">View All Products</Button>
            </Link>
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
