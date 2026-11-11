import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'
import ProductPreviewImage from '@/components/shop/ProductPreviewImage'

export const metadata: Metadata = {
  title: 'Marketing Materials Printing',
  description: 'Business cards, postcards, brochures, flyers, posters, and booklets printed by Lettuce Print in Brooklyn.',
  alternates: { canonical: 'https://lettuceprint.com/shop/marketing-materials' },
}

const products = [
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
    ]

export default function MarketingMaterialsPage() {
  return <>
    <Navbar />
    <main className="pt-[72px]">
      <section className="border-b border-gray-100 bg-white pt-14 pb-8 sm:pt-16 sm:pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-lp-green">Marketing Materials</p>
          <h1 className="mb-5 max-w-3xl text-display font-semibold text-gray-900">Print pieces that make the handoff feel premium.</h1>
          <p className="max-w-2xl text-body-lg text-gray-500">Cards, mailers, flyers, posters, brochures, and booklets — built for launches, events, retail, sales teams, and client leave-behinds.</p>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-h4 font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-100">Marketing Materials</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => <article key={product.href} className="bg-white rounded-card shadow-card border border-gray-100 overflow-hidden flex flex-col">
            <div className="relative h-44 w-full overflow-hidden bg-gray-100">
              <ProductPreviewImage productPath={product.imagePath} alt={product.name} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
            </div>
            <div className="p-5 flex flex-col flex-1">
              <h3 className="text-h4 font-semibold text-gray-900 mb-3">{product.name}</h3>
              <ul className="space-y-1.5 mb-5 flex-1">
                {product.features.map(feature => <li key={feature} className="flex items-center gap-2 text-xs text-gray-600"><span className="w-1.5 h-1.5 rounded-full bg-lp-green flex-shrink-0" />{feature}</li>)}
              </ul>
              <Link href={product.href}><Button variant="secondary" size="md" className="w-full bg-white">Get a Quote</Button></Link>
            </div>
          </article>)}
        </div>
      </section>
    </main>
    <Footer />
  </>
}
