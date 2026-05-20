import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const products = [
  {
    name: 'Custom Stickers',
    href: '/shop/stickers',
    image: '/images/products/stickers/sticker-single.png',
    description: 'Die-cut, kiss-cut, holographic, clear, and durable vinyl stickers made for brands that need sharp details.',
    features: ['Order online', 'Waterproof vinyl', 'Fast turnaround'],
    badge: 'Best Seller',
  },
  {
    name: 'Spot UV Stickers',
    href: '/shop/spot-uv',
    image: '/images/products/spot-uv/spot-uv-1.png',
    description: 'Premium gloss-on-matte stickers with a tactile finish that catches light and makes packaging feel elevated.',
    features: ['Premium finish', 'Gloss detail', 'Die-cut shapes'],
    badge: 'Premium',
  },
  {
    name: 'Roll Labels',
    href: '/shop/roll-labels',
    image: '/images/products/roll-labels/roll-labels-1.png',
    description: 'High-volume labels for jars, bottles, bags, boxes, and anything headed to shelves or fulfillment.',
    features: ['Bulk friendly', 'Custom sizes', 'Machine-ready rolls'],
    badge: 'Bulk Ready',
  },
  {
    name: 'Business Cards',
    href: '/services/marketing-materials/business-cards',
    image: 'https://drive.usercontent.google.com/download?id=1LYzqKl5GRanrRWxBdsn_tnLxmp2dau-D&export=view',
    description: 'Premium business cards with clean stocks, sharp color, and finishing options that make intros feel polished.',
    features: ['Premium stocks', 'Soft touch options', 'Fast reorders'],
    badge: 'Classic',
  },
  {
    name: 'Flyers',
    href: '/services/marketing-materials/flyers',
    image: '/images/products/flyers/flyer-full-page-card.jpg',
    description: 'Full-color flyers for launches, menus, promos, handouts, and campaigns that need to move fast.',
    features: ['Multiple sizes', 'Gloss or matte', 'Event ready'],
    badge: 'Fast Print',
  },
  {
    name: 'Banners',
    href: '/services/signage/banners',
    image: '/images/products/banners/vinyl-banner.jpg',
    description: 'Indoor and outdoor banners for storefronts, events, pop-ups, step-and-repeats, and large-format moments.',
    features: ['Vinyl & fabric', 'Indoor/outdoor', 'Custom sizes'],
    badge: 'Large Format',
  },
]

export default function ShopAllSection() {
  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lp-green mb-4">Shop All</p>
            <h2 className="text-h2 font-semibold text-gray-900 mb-4">Ready-to-order print products.</h2>
            <p className="text-body-lg text-gray-600">
              Start with the products clients order most — transparent options, quick checkout, Brooklyn production.
            </p>
          </div>
          <Link
            href="/shop"
            className="text-small font-semibold text-lp-green hover:text-lp-green-dark transition-colors flex-shrink-0"
          >
            View full shop →
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {products.map((product) => (
            <Link
              key={product.href}
              href={product.href}
              className="group bg-white rounded-card shadow-card border border-gray-100 overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-32 sm:h-48 lg:h-56 w-full overflow-hidden bg-gray-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                />
                <span className="absolute top-3 left-3 bg-lp-green text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                  {product.badge}
                </span>
              </div>

              <div className="p-4 sm:p-6 flex flex-col flex-1">
                <h3 className="text-base sm:text-h4 leading-tight font-semibold text-gray-900 mb-3 group-hover:text-lp-green transition-colors">
                  {product.name}
                </h3>
                <p className="hidden sm:block text-small text-gray-600 leading-relaxed mb-5">
                  {product.description}
                </p>

                <ul className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6 flex-1">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-xs text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-lp-green flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="inline-flex w-full items-center justify-center gap-1.5 sm:gap-2 rounded-button border-2 border-lp-green bg-lp-green px-3 sm:px-7 py-3 sm:py-3.5 text-[10px] sm:text-small font-semibold uppercase tracking-wider text-white transition-all duration-200 group-hover:bg-lp-green-dark group-hover:border-lp-green-dark">
                  Shop Product <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
