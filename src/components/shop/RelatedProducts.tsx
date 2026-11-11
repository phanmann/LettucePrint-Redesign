import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ProductPreviewImage from '@/components/shop/ProductPreviewImage'
import { getRelatedProducts } from '@/lib/related-products'

export default function RelatedProducts({ currentPath, preferred = [] }: { currentPath: string; preferred?: string[] }) {
  const products = getRelatedProducts(currentPath, preferred)
  return <section aria-label="You might also want" className="mt-20 pt-12 border-t border-gray-100">
    <h2 className="text-h2 font-semibold text-gray-900 mb-8">You might also want</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product.href}
              href={product.href}
              className="group bg-white rounded-card shadow-card border border-gray-100 overflow-hidden flex flex-col motion-safe:hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-56 sm:h-48 lg:h-44 w-full overflow-hidden bg-gray-100">
                <ProductPreviewImage
                  productPath={product.href}
                  alt={product.name}
                  className="motion-safe:group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <span className="absolute top-3 left-3 bg-lp-green text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                  {product.badge}
                </span>
              </div>

              <div className="p-4 sm:p-6 flex flex-col flex-1">
                <h3 className="text-base sm:text-[20px] sm:leading-[1.1] leading-tight font-semibold text-gray-900 mb-3 group-hover:text-lp-green transition-colors">
                  {product.name}
                </h3>
                <p className="text-small text-gray-600 leading-relaxed mb-5">
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
  </section>
}
