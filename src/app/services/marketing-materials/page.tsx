import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'
import ProductPreviewImage from '@/components/shop/ProductPreviewImage'

export const metadata: Metadata = {
  title: 'Marketing Materials Printing',
  description: 'Business cards, postcards, brochures, flyers, posters, and booklets printed by Lettuce Print in Brooklyn.',
  alternates: { canonical: 'https://lettuceprint.com/services/marketing-materials' },
}

const products = [
      {
        name: 'Business Cards',
        href: '/services/marketing-materials/business-cards',
        imagePath: '/services/marketing-materials/business-cards/standard',
        features: ['Standard & premium stock', 'Soft touch & gloss options', 'Spot UV available', 'Fast turnaround'],
      },
      {
        name: 'Flyers & Posters',
        href: '/services/marketing-materials/flyers',
        imagePath: '/services/marketing-materials/flyers/half-page',
        features: ['Flyers and standard posters', 'Sizes from 5.5×8.5 to 24×36', 'Full-color printing', 'Fast turnaround'],
      },
      {
        name: 'Postcards',
        href: '/services/marketing-materials/postcards',
        imagePath: '/services/marketing-materials/postcards/standard',
        features: ['Standard & premium stock', 'Single or double-sided', 'Rounded corners available', 'Great for direct mail'],
      },
      {
        name: 'Brochures & Booklets',
        href: '/services/marketing-materials/brochures',
        imagePath: '/services/marketing-materials/brochures/tri-fold-letter',
        features: ['Tri-fold & bi-fold brochures', 'Saddle-stitch & perfect bound booklets', 'Uncoated & soft touch options', 'Custom sizes'],
      },
    ]

export default function MarketingMaterialsPage() {
  return <>
    <Navbar />
    <main className="pt-[72px]">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-h4 font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-100">Marketing Materials</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => <article key={product.href} className="bg-white rounded-card shadow-card border border-gray-100 overflow-hidden flex flex-col">
            <div className="relative h-44 w-full overflow-hidden bg-gray-100">
              <ProductPreviewImage productPath={product.imagePath} alt={product.name} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
            </div>
            <div className="p-5 flex flex-col flex-1">
              <h2 className="text-h4 font-semibold text-gray-900 mb-3">{product.name}</h2>
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
