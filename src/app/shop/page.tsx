import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Shop - Custom Print Products',
  description: 'Order custom stickers, labels, business cards, packaging, banners, and more. Real-time pricing, fast turnaround, printed in Brooklyn.',
  alternates: { canonical: 'https://lettuceprint.com/shop' },
}

type Product = {
  name: string
  href: string
  image: string
  features: string[]
  badge?: string
}

type Category = {
  label: string
  products: Product[]
}

const categories: Category[] = [
  {
    label: 'Stickers & Labels',
    products: [
      {
        name: 'Custom Die-Cut Stickers',
        href: '/shop/stickers',
        image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80',
        features: ['Die-cut to shape', 'Waterproof & UV resistant', '3-5 day turnaround', 'Standard & holographic vinyl'],
        badge: 'Order Online',
      },
      {
        name: 'Spot UV Stickers',
        href: '/shop/spot-uv',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
        features: ['Gloss-on-matte effect', 'Premium tactile finish', 'Die-cut to shape', '3-5 day turnaround'],
        badge: 'Order Online',
      },
      {
        name: 'Roll Labels',
        href: '/shop/roll-labels',
        image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80',
        features: ['Kiss-cut on roll', 'High-volume ready', 'Food-safe options', 'Custom sizes'],
        badge: 'Order Online',
      },
    ],
  },
  {
    label: 'Marketing Materials',
    products: [
      {
        name: 'Business Cards',
        href: '/services/marketing-materials/business-cards',
        image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80',
        features: ['Standard & premium stock', 'Soft touch & gloss options', 'Spot UV available', 'Fast turnaround'],
      },
      {
        name: 'Flyers',
        href: '/services/marketing-materials/flyers',
        image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80',
        features: ['Full page, half page & tabloid', 'Gloss or matte coating', 'Full-color printing', '3-5 day turnaround'],
      },
      {
        name: 'Postcards',
        href: '/services/marketing-materials/postcards',
        image: 'https://images.unsplash.com/photo-1580793033168-c5f6a2869c35?w=800&q=80',
        features: ['Standard & premium stock', 'Single or double-sided', 'Rounded corners available', 'Great for direct mail'],
      },
      {
        name: 'Posters',
        href: '/services/marketing-materials/posters',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
        features: ['Multiple sizes available', 'Soft touch & art print options', 'UV-coated or matte', 'Event & retail ready'],
      },
      {
        name: 'Brochures',
        href: '/services/marketing-materials/brochures',
        image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80',
        features: ['Tri-fold & bi-fold options', 'Letter & tabloid sizes', 'Uncoated & soft touch', 'Premium presentation'],
      },
      {
        name: 'Booklets',
        href: '/services/marketing-materials/booklets',
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80',
        features: ['Saddle-stitch & perfect bound', 'Catalog & magazine format', 'Soft touch cover option', 'Custom sizes'],
      },
    ],
  },
  {
    label: 'Boxes & Packaging',
    products: [
      {
        name: 'Custom Boxes',
        href: '/services/packaging/boxes',
        image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=800&q=80',
        features: ['Mailer, folding carton & rigid', 'Full-color printing', 'Magnetic closure available', 'Low minimums'],
      },
      {
        name: 'Mylar Bags',
        href: '/services/packaging/mylar-bags',
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80',
        features: ['Standard & die-cut shapes', 'Child-resistant options', 'High-barrier material', 'Custom print'],
      },
      {
        name: 'Custom Packaging',
        href: '/services/packaging/custom-packaging',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
        features: ['Fully custom structures', 'Full-color & specialty finishes', 'Sampling available', 'Retail-ready'],
      },
    ],
  },
  {
    label: 'Signs & Banners',
    products: [
      {
        name: 'Banners',
        href: '/services/signage/banners',
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
        features: ['Vinyl, mesh & fabric options', 'Retractable banner stands', 'Indoor & outdoor use', 'Fast turnaround'],
      },
      {
        name: 'Backdrops & Step-Repeats',
        href: '/services/signage/backdrops',
        image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80',
        features: ['Pop-up, euro & SEG frames', 'Multiple sizes available', 'Event-ready hardware', 'Custom graphics'],
      },
    ],
  },
  {
    label: 'Apparel & Promo',
    products: [
      {
        name: 'Screen Printing',
        href: '/services/apparel/screenprint',
        image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80',
        features: ['T-shirts, hoodies & totes', 'Pantone color matching', 'Bulk discounts', 'Minimum 12 pcs'],
      },
      {
        name: 'Embroidery',
        href: '/services/apparel/embroidery',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
        features: ['Hats, polos & more', 'Thread color matching', 'Digitizing included', 'Premium finish'],
      },
      {
        name: 'DTG Printing',
        href: '/services/apparel/dtg',
        image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80',
        features: ['Full-color direct to garment', 'No minimums', 'Photo-quality prints', 'Quick turnaround'],
      },
      {
        name: 'Custom Promo Items',
        href: '/services/apparel/custom-items',
        image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80',
        features: ['Totes, drinkware & more', "Logo'd merch & swag", 'Event giveaways', 'Custom sourcing'],
      },
    ],
  },
]

export default function ShopPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* Page header */}
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lp-green mb-2">Shop</p>
          <h1 className="text-h2 font-semibold text-gray-900 mb-2">All Products</h1>
          <p className="text-small text-gray-500 mb-12">Custom print products - designed and shipped from Brooklyn.</p>

          {/* Category sections */}
          <div className="space-y-16 mb-16">
            {categories.map((cat) => (
              <section key={cat.label}>
                <h2 className="text-h4 font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-100">
                  {cat.label}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cat.products.map((product) => (
                    <div
                      key={product.href}
                      className="bg-white rounded-card shadow-card border border-gray-100 overflow-hidden flex flex-col"
                    >
                      {/* Product image */}
                      <div className="relative h-44 w-full overflow-hidden bg-gray-100">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        {product.badge && (
                          <span className="absolute top-3 left-3 bg-lp-green text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                            {product.badge}
                          </span>
                        )}
                      </div>

                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="text-h4 font-semibold text-gray-900 mb-3">{product.name}</h3>

                        <ul className="space-y-1.5 mb-5 flex-1">
                          {product.features.map((f) => (
                            <li key={f} className="flex items-center gap-2 text-xs text-gray-600">
                              <span className="w-1.5 h-1.5 rounded-full bg-lp-green flex-shrink-0" />
                              {f}
                            </li>
                          ))}
                        </ul>

                        <Link href={product.href}>
                          <Button size="md" className="w-full">
                            {product.badge ? 'Order Now' : 'Get a Quote'}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Custom CTA */}
          <div className="bg-gray-50 rounded-card border border-gray-200 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-h3 font-semibold text-gray-900 mb-2">Need something not listed here?</h3>
              <p className="text-small text-gray-600">
                Packaging, large format, screen printing, signage - get a custom quote for any project.
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
