'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { Disclosure } from '@/components/shop/ProductDisclosure'
import { ArrowRight, CheckCircle, FileText, Layers } from 'lucide-react'
import ProductImageGallery from '@/components/shop/ProductImageGallery'
import BusinessCardCalculator from '@/components/shop/BusinessCardCalculator'

const specs = [
  { label: 'Size',           value: '3.5" × 2" (standard)' },
  { label: 'Finish options', value: 'Matte, Gloss, Uncoated' },
  { label: 'Stock weights',  value: '14 pt, 16 pt' },
  { label: 'Color mode',     value: 'Full-color CMYK' },
  { label: 'Minimum order',  value: '50 cards' },
  { label: 'Turnaround',     value: '2–3 business days after approval' },
  { label: 'Corner options', value: 'Square or rounded (+cost)' },
]

const artworkRequirements = [
  { label: 'Preferred formats', value: 'AI, PDF, EPS' },
  { label: 'Accepted formats',  value: 'PSD, PNG, JPG (300 DPI min)' },
  { label: 'Color mode',        value: 'CMYK preferred' },
  { label: 'Bleed',             value: '0.125" on all sides' },
  { label: 'Safe zone',         value: '0.125" from all edges' },
]

const included = [
  'Digital proof before production',
  'Full-color CMYK printing',
  'Quality check before ship',
  'Bulk quantity discounts available',
]

export default function StandardBusinessCardsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">

        {/* Breadcrumb */}
        <div className="bg-gray-50 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center gap-2 text-xs text-gray-500">
              <Link href="/" className="hover:text-lp-green transition-colors">Home</Link>
              <span>/</span>
              <Link href="/services/marketing-materials/business-cards" className="hover:text-lp-green transition-colors">Business Cards</Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">Standard</span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_600px] gap-12 items-start">

            {/* Right — Pricing Calculator (desktop only) */}
            <div className="hidden lg:block lg:order-last lg:sticky lg:top-24">
              <BusinessCardCalculator productName="Standard Business Cards" />
            </div>

            {/* Left — Product Info */}
            <div className="lg:order-first">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="new">Fast Turnaround</Badge>
                  <Badge variant="popular">Most Popular</Badge>
                </div>
                <h1 className="text-h1 font-semibold text-gray-900 mb-4">Standard Business Cards</h1>
                <p className="text-body-lg text-gray-600 leading-relaxed">
                  Classic 3.5″ × 2″ business cards with crisp full-color printing. Choose your finish — matte, gloss, or uncoated — and we'll handle the rest. Printed in Brooklyn.
                </p>
              </div>

              <ProductImageGallery
                images={[
                  { src: 'https://drive.usercontent.google.com/download?id=1LYzqKl5GRanrRWxBdsn_tnLxmp2dau-D&export=view', alt: 'Business card print samples' },
                  { src: 'https://drive.usercontent.google.com/download?id=1MHeRH5jLNMqM58gLeg9xmIsKEn791F7K&export=view', alt: 'Custom business cards' },
                ]}
              />

              {/* Mobile-only calculator — inline after gallery */}
              <div className="lg:hidden mb-8">
                <BusinessCardCalculator productName="Standard Business Cards" />
              </div>

              {/* What's included */}
              <div className="bg-lp-green/5 rounded-card border border-lp-green/20 p-6 mb-8">
                <h3 className="text-small font-semibold text-lp-green uppercase tracking-wider mb-4">Every order includes</h3>
                <ul className="space-y-2.5">
                  {included.map(item => (
                    <li key={item} className="flex items-center gap-3 text-small text-gray-700">
                      <CheckCircle size={15} className="text-lp-green flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specs */}
              <div className="mb-8 border border-gray-200 rounded-card px-5 py-4">
                <Disclosure title={
                  <div className="flex items-center gap-2">
                    <Layers size={16} className="text-gray-500" />
                    <h3 className="text-small font-semibold text-gray-500 uppercase tracking-wider">Specifications</h3>
                  </div>
                }>
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

              {/* Artwork Requirements */}
              <div className="bg-white rounded-card border border-gray-200 px-5 py-4 mb-8">
                <Disclosure title={
                  <div className="flex items-center gap-2">
                    <FileText size={16} className="text-gray-500" />
                    <h3 className="text-small font-semibold text-gray-500 uppercase tracking-wider">Artwork Requirements</h3>
                  </div>
                }>
                  <div className="space-y-2">
                    {artworkRequirements.map(req => (
                      <div key={req.label} className="flex justify-between">
                        <span className="text-small font-semibold text-gray-500">{req.label}</span>
                        <span className="text-small text-gray-700 text-right max-w-[55%]">{req.value}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-4 pt-4 border-t border-gray-100">
                    Don't have print-ready files? Our design team can help.{' '}
                    <Link href="/get-quote" className="text-lp-green font-semibold hover:underline">Ask about design services →</Link>
                  </p>
                </Disclosure>
              </div>

              {/* Premium upgrade */}
              <div className="rounded-card border border-gray-200 p-6">
                <h3 className="text-h4 font-semibold text-gray-900 mb-2">Want something more premium?</h3>
                <p className="text-small text-gray-600 mb-4">Soft-touch laminate, spot UV, foil stamping, and extra-thick 32pt cards available.</p>
                <Link href="/services/marketing-materials/business-cards/premium" className="inline-flex items-center gap-2 text-small font-semibold text-lp-green hover:text-lp-green-dark transition-colors">
                  See Premium Business Cards <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>

          {/* Related */}
          <div className="mt-20 pt-12 border-t border-gray-100">
            <h2 className="text-h2 font-semibold text-gray-900 mb-8">You might also want</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Link href="/services/marketing-materials/business-cards/premium" className="group block bg-lp-black rounded-card p-6 transition-all duration-250 hover:opacity-90">
                <Badge variant="popular" className="mb-4">Premium</Badge>
                <h3 className="text-h4 font-semibold text-white mb-2">Premium Business Cards</h3>
                <p className="text-small text-white/70 mb-4">Soft-touch, spot UV, foil stamping, and extra-thick options.</p>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-lp-green">View product <ArrowRight size={12} /></span>
              </Link>
              <Link href="/shop/stickers" className="group block bg-white rounded-card shadow-card hover:shadow-card-hover border border-gray-100 p-6 transition-all duration-250">
                <Badge variant="new" className="mb-4">Popular</Badge>
                <h3 className="text-h4 font-semibold text-gray-900 group-hover:text-lp-green transition-colors mb-2">Custom Stickers</h3>
                <p className="text-small text-gray-600 mb-4">Die-cut vinyl stickers in any shape. Perfect for packaging and branding.</p>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-lp-green">View product <ArrowRight size={12} /></span>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
