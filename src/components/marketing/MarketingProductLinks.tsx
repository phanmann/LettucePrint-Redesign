import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ProductPreviewImage from '@/components/shop/ProductPreviewImage'

export interface MarketingProductLink {
  title: string
  href: string
  note?: string
}

// Detailed product pages with CMS galleries, listed on their category page.
export default function MarketingProductLinks({ heading, products }: { heading: string; products: MarketingProductLink[] }) {
  return <div className="mb-12">
    <h2 className="mb-6 text-h3 font-semibold text-gray-900">{heading}</h2>
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {products.map(product => <Link key={product.href} href={product.href} className="group overflow-hidden rounded-card border border-gray-100 bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover">
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
          <ProductPreviewImage productPath={product.href} alt={product.title} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
        </div>
        <div className="p-5">
          <h3 className="text-base font-semibold text-gray-900">{product.title}</h3>
          {product.note && <p className="mt-1 text-small text-gray-600">{product.note}</p>}
          <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-lp-green">View product <ArrowRight size={13} /></span>
        </div>
      </Link>)}
    </div>
  </div>
}
