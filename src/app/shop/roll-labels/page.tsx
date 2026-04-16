import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, FileText, ArrowRight } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import RollLabelCalculator from '@/components/shop/RollLabelCalculator'
import Badge from '@/components/ui/Badge'

export const metadata: Metadata = {
  title: 'Custom Roll Labels',
  description: 'High-volume custom roll labels printed in Brooklyn. Standard and Premium BOPP materials, matte or gloss laminate. Real-time pricing calculator.',
}

const specs = [
  { label: 'Material', value: 'Standard Matte Paper or Premium BOPP' },
  { label: 'Finish', value: 'Matte laminate, Gloss laminate, or Heavy laminate' },
  { label: 'Cut', value: 'Kiss-cut on roll' },
  { label: 'Core size', value: '3" standard core' },
  { label: 'Roll width', value: 'Up to 12.25"' },
  { label: 'Adhesive', value: 'Permanent. Removable available on request.' },
  { label: 'Minimum order', value: '250 labels' },
  { label: 'Standard turnaround', value: '3–5 business days after proof approval' },
]

const artworkRequirements = [
  { label: 'Preferred formats', value: 'AI, PDF, SVG, EPS' },
  { label: 'Accepted formats', value: 'PSD, PNG, JPG (300 DPI min)' },
  { label: 'Color mode', value: 'CMYK preferred' },
  { label: 'Bleed', value: '0.125" on all sides' },
  { label: 'Safe zone', value: '0.0625" from cut line' },
]

const included = [
  'Digital proof before production',
  'Kiss-cut to your shape on roll',
  '3" standard core',
  'Quality check before ship',
]

const useCases = [
  { label: 'Food & Beverage', desc: 'Jar lids, bottles, packaging, nutrition labels' },
  { label: 'Retail & Product', desc: 'Price tags, barcode labels, shelf labels' },
  { label: 'Cannabis', desc: 'Compliant product labels, child-resistant packaging' },
  { label: 'Health & Beauty', desc: 'Cosmetics, skincare, supplement labels' },
  { label: 'Shipping & Logistics', desc: 'Address labels, return labels, tracking' },
  { label: 'Events & Hospitality', desc: 'Wristbands, bottle labels, favor packaging' },
]

export default function RollLabelsPage() {
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
              <span className="text-gray-900 font-medium">Roll Labels</span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Calculator first on mobile */}
            <div className="order-first lg:order-last">
              <RollLabelCalculator productName="Custom Roll Labels" />
            </div>

            {/* Left — Product Info */}
            <div className="order-last lg:order-first">
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="popular">High Volume</Badge>
                  <Badge variant="new">Custom Sizes</Badge>
                </div>
                <h1 className="text-h1 font-semibold text-gray-900 mb-4">
                  Custom Roll Labels
                </h1>
                <p className="text-body-lg text-gray-600 leading-relaxed">
                  Professional kiss-cut labels on a roll. Built for brands that need volume,
                  consistency, and quality across every unit. From craft food producers to
                  enterprise retail — we run the rolls.
                </p>
              </div>

              {/* Use cases */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {useCases.map((u) => (
                  <div key={u.label} className="bg-gray-50 rounded-card border border-gray-100 p-4">
                    <p className="text-small font-semibold text-gray-900 mb-1">{u.label}</p>
                    <p className="text-xs text-gray-500">{u.desc}</p>
                  </div>
                ))}
              </div>

              {/* Included */}
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

              {/* Artwork */}
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
                  Need print-ready files?{' '}
                  <Link href="/services/graphic-design" className="text-lp-green font-semibold hover:underline">
                    Ask about design services →
                  </Link>
                </p>
              </div>

              {/* Custom escape */}
              <div className="rounded-card border border-gray-200 p-6">
                <h3 className="text-h4 font-semibold text-gray-900 mb-2">Need something bigger?</h3>
                <p className="text-small text-gray-600 mb-4">
                  Multiple SKUs, specialty adhesives, extended rolls, or food-safe certifications?
                  Let&apos;s put together a custom quote.
                </p>
                <Link
                  href="/get-quote"
                  className="inline-flex items-center gap-2 text-small font-semibold text-lp-green hover:text-lp-green-dark transition-colors"
                >
                  Request a custom quote <ArrowRight size={14} />
                </Link>
              </div>
            </div>


          </div>

          {/* Related */}
          <div className="mt-20 pt-12 border-t border-gray-100">
            <h2 className="text-h2 font-semibold text-gray-900 mb-8">You might also want</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Link href="/shop/stickers" className="group block bg-white rounded-card shadow-card hover:shadow-card-hover border border-gray-100 p-6 transition-all duration-250">
                <Badge variant="popular" className="mb-4">Most Popular</Badge>
                <h3 className="text-h4 font-semibold text-gray-900 group-hover:text-lp-green transition-colors mb-2">
                  Custom Die-Cut Stickers
                </h3>
                <p className="text-small text-gray-600 mb-4">
                  Premium vinyl stickers cut precisely to your shape. Standard, holographic, and spot UV finishes.
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-lp-green">
                  View product <ArrowRight size={12} />
                </span>
              </Link>
              <Link href="/get-quote" className="group block bg-lp-green rounded-card p-6 transition-all duration-250 hover:bg-lp-green-dark">
                <Badge variant="new" className="mb-4">Custom</Badge>
                <h3 className="text-h4 font-semibold text-white mb-2">
                  Need something custom?
                </h3>
                <p className="text-small text-white/80 mb-4">
                  Unusual sizes, specialty adhesives, multiple SKUs, or food-safe requirements? Get a quote.
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white">
                  Request a quote <ArrowRight size={12} />
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
