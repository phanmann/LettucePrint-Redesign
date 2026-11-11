import type { ReactNode } from 'react'
import RelatedProducts from '@/components/shop/RelatedProducts'
import Link from 'next/link'
import { CheckCircle, FileText, ArrowRight, Layers } from 'lucide-react'
import { Disclosure } from '@/components/shop/ProductDisclosure'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ShapePlaceholder from '@/components/shop/ShapePlaceholder'
import FaqSection from '@/components/seo/FaqSection'
import JsonLd, { breadcrumbJsonLd, productJsonLd } from '@/components/seo/JsonLd'
import type { Faq, PlaceholderShape } from '@/lib/sticker-catalog'

// Shared layout for sticker and roll-label type pages: one H1, calculator,
// specs, FAQs and Product/FAQ/Breadcrumb structured data.
export default function TypeProductPage({
  name, intro, path, parent, shape, tone, roll = false, calculator, specs, artworkRequirements, included, faqs, metaDescription, related,
}: {
  name: string
  intro: string
  path: string
  parent: { name: string; path: string }
  shape: PlaceholderShape
  tone?: 'solid' | 'clear' | 'holographic'
  roll?: boolean
  calculator: ReactNode
  specs: { label: string; value: string }[]
  artworkRequirements: { label: string; value: string }[]
  included: string[]
  faqs: Faq[]
  metaDescription: string
  related: { href: string; name: string; summary: string }[]
}) {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <div className="bg-gray-50 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-500">
              <Link href="/" className="hover:text-lp-green transition-colors">Home</Link>
              <span>/</span>
              <Link href={parent.path} className="hover:text-lp-green transition-colors">{parent.name}</Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">{name}</span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_600px] gap-12 items-start">
            <div className="hidden lg:block lg:order-last lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">{calculator}</div>

            <div className="lg:order-first min-w-0">
              <div className="mb-8">
                <h1 className="text-h1 font-semibold text-gray-900 mb-4">{name}</h1>
                <p className="text-body-lg text-gray-600 leading-relaxed">{intro}</p>
              </div>

              <ShapePlaceholder shape={shape} tone={tone} roll={roll} label={`${name} example`} className="mb-8 aspect-square rounded-card border border-gray-100" />

              <div className="lg:hidden mb-8">{calculator}</div>

              <div className="bg-lp-green/5 rounded-card border border-lp-green/20 p-6 mb-8">
                <h2 className="text-small font-semibold text-lp-green uppercase tracking-wider mb-4">Every order includes</h2>
                <ul className="space-y-2.5">
                  {included.map(item => (
                    <li key={item} className="flex items-center gap-3 text-small text-gray-700">
                      <CheckCircle size={15} className="text-lp-green flex-shrink-0" />{item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-8 border border-gray-200 rounded-card px-5 py-4">
                <Disclosure title={<span className="flex items-center gap-2"><Layers size={16} className="text-gray-500" /><span className="text-small font-semibold text-gray-500 uppercase tracking-wider">Specifications</span></span>}>
                  <div className="divide-y divide-gray-100">
                    {specs.map(spec => (
                      <div key={spec.label} className="flex justify-between py-3">
                        <span className="text-small font-semibold text-gray-500">{spec.label}</span>
                        <span className="text-small text-gray-900 text-right max-w-[60%]">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </Disclosure>
              </div>

              <div className="bg-white rounded-card border border-gray-200 px-5 py-4 mb-8">
                <Disclosure title={<span className="flex items-center gap-2"><FileText size={16} className="text-gray-500" /><span className="text-small font-semibold text-gray-500 uppercase tracking-wider">Artwork Requirements</span></span>}>
                  <div className="space-y-2">
                    {artworkRequirements.map(req => (
                      <div key={req.label} className="flex justify-between">
                        <span className="text-small font-semibold text-gray-500">{req.label}</span>
                        <span className="text-small text-gray-700 text-right max-w-[55%]">{req.value}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-4 pt-4 border-t border-gray-100">
                    Don&apos;t have print-ready files? Our design team can help.{' '}
                    <Link href="/services/graphic-design" className="text-lp-green font-semibold hover:underline">Ask about design services →</Link>
                  </p>
                </Disclosure>
              </div>

              <FaqSection faqs={faqs} />

              <div className="rounded-card border border-gray-200 p-6">
                <h2 className="text-h4 font-semibold text-gray-900 mb-2">Need something custom?</h2>
                <p className="text-small text-gray-600 mb-4">Unusual sizes, specialty materials or very large runs? Let&apos;s talk.</p>
                <Link href="/get-quote" className="inline-flex items-center gap-2 text-small font-semibold text-lp-green hover:text-lp-green-dark transition-colors">
                  Request a custom quote <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>

          <RelatedProducts currentPath={path} preferred={related.map(product => product.href)} />
        </div>

        <JsonLd data={productJsonLd({ name, description: metaDescription, path })} />
        <JsonLd data={breadcrumbJsonLd([{ name: 'Home', path: '/' }, parent, { name, path }])} />
      </main>
      <Footer />
    </>
  )
}
