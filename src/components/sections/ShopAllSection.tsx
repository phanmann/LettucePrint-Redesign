import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ProductPreviewImage from '@/components/shop/ProductPreviewImage'

const products = [
  {
    name: 'Custom Stickers',
    href: '/shop/stickers',
    image: '/images/products/stickers/holo-stickers.png',
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
    name: 'Standard Retractable Banner',
    href: '/services/signage/banners/retractable-standard',
    image: 'https://drive.usercontent.google.com/download?id=1lkdgvN3wjRMfftKmeu5X47ZwHyor7dzB&export=view',
    description: 'A lightweight 33 × 80 in. pull-up banner with an aluminum stand and carry bag.',
    features: ['Fast setup', 'Print or full kit', 'Carry bag included'],
    badge: 'Event Ready',
  },
  {
    name: 'Standard Mylar Bag',
    href: '/services/packaging/mylar-bags/standard',
    image: 'https://drive.usercontent.google.com/download?id=1tnUvh9Y9jYsoOKPUbS9g0-NWdt_CR0KV&export=view',
    description: 'Custom-printed 4 × 5 in. eighth-size bags with zipper and finish options.',
    features: ['Full-color print', 'Zipper options', '1,000 minimum'],
    badge: 'Packaging',
  },
  {
    name: 'Premium Step and Repeat (10 × 8 ft)',
    href: '/services/signage/backdrops/step-repeat-10x8',
    image: '/images/products/backdrops/step-repeat.jpg',
    description: 'A 10 × 8 ft event backdrop with an adjustable telescopic stand and proof review.',
    features: ['Event backdrop', 'Frame or graphic', 'Proof reviewed'],
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
                <ProductPreviewImage
                  productPath={product.href}
                  fallbackSrc={product.image}
                  alt={product.name}
                  className="group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                />
                <span className="absolute top-3 left-3 bg-lp-green text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                  {product.badge}
                </span>
              </div>

              <div className="p-4 sm:p-6 flex flex-col flex-1">
                <h3 className="text-base sm:text-[20px] sm:leading-[1.1] leading-tight font-semibold text-gray-900 mb-3 group-hover:text-lp-green transition-colors">
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

                <div className="inline-flex w-full items-center justify-center gap-1.5 sm:gap-2 rounded-button border-2 border-lp-green bg-white px-3 sm:px-7 py-3 sm:py-3.5 text-[10px] sm:text-small font-semibold uppercase tracking-wider text-lp-green transition-all duration-200 group-hover:bg-lp-green group-hover:text-white">
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
