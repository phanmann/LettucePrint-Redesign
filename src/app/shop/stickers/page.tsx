import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, FileText, ArrowRight } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PricingCalculator from '@/components/shop/PricingCalculator'
import Badge from '@/components/ui/Badge'

export const metadata: Metadata = {
  title: 'Custom Stickers & Labels',
  description: 'Die-cut custom stickers printed in Brooklyn. Standard, holographic, and spot UV finishes. Fast turnaround, starting at $38 for 50 stickers.',
}

const specs = [
  { label: 'Material', value: 'Premium vinyl (white, clear, holographic)' },
  { label: 'Finish', value: 'Matte, gloss, or laminate' },
  { label: 'Cut', value: 'Die-cut to your shape' },
  { label: 'Adhesive', value: 'Permanent, removable available on request' },
  { label: 'Durability', value: 'Waterproof, UV resistant, scratch resistant' },
  { label: 'Minimum order', value: '50 stickers' },
  { label: 'Standard turnaround', value: '3–5 business days after approval' },
]

const artworkRequirements = [
  { label: 'Preferred formats', value: 'AI, PDF, SVG, EPS' },
  { label: 'Accepted formats', value: 'PSD, PNG, JPG, TIFF (300 DPI min)' },
  { label: 'Color mode', value: 'CMYK preferred' },
  { label: 'Bleed', value: '0.125" on all sides' },
  { label: 'Max file size', value: '100MB' },
]

const included = [
  'Digital proof before production',
  'Free die-cut to your shape',
  'Individual backing paper',
  'Quality check before ship',
]

export default function StickersPage() {
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
              <Link href="/shop" className="hover:text-lp-green transition-colors">Shop</Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">Custom Stickers</span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Left — Product Info */}
            <div>
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="popular">Most Popular</Badge>
                  <Badge variant="new">Fast Turnaround</Badge>
                </div>
                <h1 className="text-h1 font-semibold text-gray-900 mb-4">
                  Custom Die-Cut Stickers
                </h1>
                <p className="text-body-lg text-gray-600 leading-relaxed">
                  Premium vinyl stickers cut precisely to your shape. Whether it&apos;s your logo,
                  a product label, or a brand campaign — these stickers are made to impress.
                  Printed and cut in Brooklyn.
                </p>
              </div>

              {/* What's included */}
              <div className="bg-lp-green/5 rounded-card border border-lp-green/20 p-6 mb-8">
                <h3 className="text-small font-semibold text-lp-green uppercase tracking-wider mb-4">
                  Every order includes
                </h3>
                <ul className="space-y-2.5">
                  {included.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-small text-gray-700">
                      <CheckCircle size={15} className="text-lp-green flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specs */}
              <div className="mb-8">
                <h3 className="text-h4 font-semibold text-gray-900 mb-4">Specifications</h3>
                <div className="divide-y divide-gray-100">
                  {specs.map((spec) => (
                    <div key={spec.label} className="flex justify-between py-3">
                      <span className="text-small font-semibold text-gray-500">{spec.label}</span>
                      <span className="text-small text-gray-900 text-right max-w-[60%]">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Artwork Requirements */}
              <div className="bg-lp-blue/30 rounded-card border border-lp-blue p-6 mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <FileText size={16} className="text-lp-green-dark" />
                  <h3 className="text-small font-semibold text-lp-green-dark uppercase tracking-wider">
                    Artwork Requirements
                  </h3>
                </div>
                <div className="space-y-2">
                  {artworkRequirements.map((req) => (
                    <div key={req.label} className="flex justify-between">
                      <span className="text-small text-lp-green-dark font-medium">{req.label}</span>
                      <span className="text-small text-gray-700 text-right max-w-[55%]">{req.value}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-4 pt-4 border-t border-lp-blue">
                  Don&apos;t have print-ready files? Our design team can help.{' '}
                  <Link href="/services/graphic-design" className="text-lp-green font-semibold hover:underline">
                    Ask about design services →
                  </Link>
                </p>
              </div>

              {/* Custom/Escape hatch */}
              <div className="rounded-card border border-gray-200 p-6">
                <h3 className="text-h4 font-semibold text-gray-900 mb-2">Need something custom?</h3>
                <p className="text-small text-gray-600 mb-4">
                  Unusual sizes, specialty materials, bulk orders over 2,500, or branded packaging?
                  Let&apos;s talk.
                </p>
                <Link
                  href="/get-quote"
                  className="inline-flex items-center gap-2 text-small font-semibold text-lp-green hover:text-lp-green-dark transition-colors"
                >
                  Request a custom quote <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Right — Pricing Calculator */}
            <div>
              <PricingCalculator productName="Custom Die-Cut Stickers" />
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-20 pt-12 border-t border-gray-100">
            <h2 className="text-h2 font-semibold text-gray-900 mb-8">You might also want</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Link href="/get-quote" className="group block bg-lp-green rounded-card p-6 transition-all duration-250 hover:bg-lp-green-dark">
                <Badge variant="new" className="mb-4">Custom</Badge>
                <h3 className="text-h4 font-semibold text-white mb-2">
                  Need something custom?
                </h3>
                <p className="text-small text-white/80 mb-4">
                  Unusual sizes, specialty materials, bulk over 2,500, or branded packaging? Get a quote.
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white">
                  Request a quote <ArrowRight size={12} />
                </span>
              </Link>
              <Link href="/shop/roll-labels" className="group block bg-white rounded-card shadow-card hover:shadow-card-hover border border-gray-100 p-6 transition-all duration-250">
                <Badge variant="popular" className="mb-4">Bulk</Badge>
                <h3 className="text-h4 font-semibold text-gray-900 group-hover:text-lp-green transition-colors mb-2">
                  Roll Labels
                </h3>
                <p className="text-small text-gray-600 mb-4">
                  High-volume roll labels for product packaging, retail, food & beverage, and more.
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-lp-green">
                  View product <ArrowRight size={12} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
