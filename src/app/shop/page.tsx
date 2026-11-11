import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'
import ProductPreviewImage from '@/components/shop/ProductPreviewImage'

export const metadata: Metadata = {
  title: 'Shop - Custom Print Products',
  description: 'Order custom stickers, labels, business cards, packaging, banners, and more. Real-time pricing, fast turnaround, printed in Brooklyn.',
  alternates: { canonical: 'https://lettuceprint.com/shop' },
}

type Product = {
  name: string
  href: string
  features: string[]
  badge?: string
  /** Product page whose CMS gallery supplies the card image, when the category page has none. */
  imagePath?: string
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
        name: 'Custom Stickers',
        href: '/shop/stickers',
        features: ['Die cut, kiss cut & shaped', 'Clear & holographic vinyl', 'Waterproof & UV resistant', '3–5 day turnaround'],
        badge: 'Order Online',
      },
      {
        name: 'Spot UV Stickers',
        href: '/shop/spot-uv',
        features: ['Gloss-on-matte effect', 'Premium tactile finish', 'Die-cut to shape', '3–5 day turnaround'],
        badge: 'Order Online',
      },
      {
        name: 'Roll Labels',
        href: '/shop/roll-labels',
        features: ['Rectangle, circle, square & oval', 'Kiss-cut on roll', 'High-volume ready', 'Custom sizes'],
        badge: 'Order Online',
      },
    ],
  },
  {
    label: 'Marketing Materials',
    products: [
      {
        name: 'Business Cards',
        href: '/shop/marketing-materials/business-cards',
        imagePath: '/shop/marketing-materials/business-cards/standard',
        features: ['Standard & premium stock', 'Soft touch & gloss options', 'Spot UV available', 'Fast turnaround'],
      },
      {
        name: 'Flyers & Posters',
        href: '/shop/marketing-materials/flyers',
        imagePath: '/shop/marketing-materials/flyers/half-page',
        features: ['Flyers and standard posters', 'Sizes from 5.5×8.5 to 24×36', 'Full-color printing', 'Fast turnaround'],
      },
      {
        name: 'Postcards',
        href: '/shop/marketing-materials/postcards',
        imagePath: '/shop/marketing-materials/postcards/standard',
        features: ['Standard & premium stock', 'Single or double-sided', 'Rounded corners available', 'Great for direct mail'],
      },
      {
        name: 'Brochures & Booklets',
        href: '/shop/marketing-materials/brochures',
        imagePath: '/shop/marketing-materials/brochures/tri-fold-letter',
        features: ['Tri-fold & bi-fold brochures', 'Saddle-stitch & perfect bound booklets', 'Uncoated & soft touch options', 'Custom sizes'],
      },
    ],
  },
  {
    label: 'Boxes & Packaging',
    products: [
      {
        name: 'Mylar Bags',
        href: '/shop/packaging/mylar-bags',
        features: ['Standard & die-cut shapes', 'Child-resistant options', 'High-barrier material', 'Custom print'],
      },
      {
        name: 'Custom Packaging',
        href: '/shop/packaging/custom-packaging',
        features: ['Fully custom structures', 'Full-color & specialty finishes', 'Sampling available', 'Retail-ready'],
      },
    ],
  },
  {
    label: 'Signs & Banners',
    products: [
      {
        name: 'Banners',
        href: '/shop/signage/banners',
        features: ['Vinyl, mesh & fabric options', 'Retractable banner stands', 'Indoor & outdoor use', 'Fast turnaround'],
      },
      {
        name: 'Backdrops & Step-Repeats',
        href: '/shop/signage/backdrops',
        features: ['Pop-up, euro & SEG frames', 'Multiple sizes available', 'Event-ready hardware', 'Custom graphics'],
      },
    ],
  },
  {
    label: 'Apparel & Promo',
    products: [
      {
        name: 'Screen Printing',
        href: '/shop/apparel/screenprint',
        features: ['T-shirts, hoodies & totes', 'Pantone color matching', 'Bulk discounts', 'Minimum 12 pcs'],
      },
      {
        name: 'Embroidery',
        href: '/shop/apparel/embroidery',
        imagePath: '/shop/cards/embroidery',
        features: ['Hats, polos & more', 'Thread color matching', 'Digitizing included', 'Premium finish'],
      },
      {
        name: 'DTG Printing',
        href: '/shop/apparel/dtg',
        imagePath: '/shop/cards/dtg',
        features: ['Full-color direct to garment', 'No minimums', 'Photo-quality prints', 'Quick turnaround'],
      },
      {
        name: 'Custom Promo Items',
        href: '/shop/apparel/custom-items',
        imagePath: '/shop/packaging/custom-packaging',
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
                        <ProductPreviewImage
                          productPath={product.imagePath ?? product.href}
                          alt={product.name}
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
                          <Button variant="secondary" size="md" className="w-full bg-white">
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
              <h2 className="text-h3 font-semibold text-gray-900 mb-2">Need something not listed here?</h2>
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
