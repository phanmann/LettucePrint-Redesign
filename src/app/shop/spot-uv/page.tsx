import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, FileText, ArrowRight } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SpotUVCalculator from '@/components/shop/SpotUVCalculator'
import Badge from '@/components/ui/Badge'

export const metadata: Metadata = {
  title: 'Spot UV Stickers',
  description: 'Premium Spot UV stickers printed in Brooklyn. High-gloss UV coating over a matte base for a luxury tactile finish. Custom shapes, fast turnaround.',
}

const specs = [
  { label: 'Material', value: 'Premium white vinyl base' },
  { label: 'Coating', value: 'UV-cured clear coat (spot or flood)' },
  { label: 'Finish effect', value: 'High-gloss UV on matte or gloss base' },
  { label: 'Cut', value: 'Die-cut to your shape' },
  { label: 'Adhesive', value: 'Permanent, waterproof' },
  { label: 'Durability', value: 'UV resistant, scratch resistant' },
  { label: 'Minimum order', value: '50 stickers' },
  { label: 'Standard turnaround', value: '3–5 business days after approval' },
]

const artworkRequirements = [
  { label: 'Preferred formats', value: 'AI, PDF, SVG, EPS' },
  { label: 'Accepted formats', value: 'PSD, PNG, JPG (300 DPI min)' },
  { label: 'Spot UV layer', value: 'Separate spot layer in white (100% K)' },
  { label: 'Color mode', value: 'CMYK preferred' },
  { label: 'Bleed', value: '0.125" on all sides' },
]

const included = [
  'Digital proof before production',
  'Free die-cut to your shape',
  'Spot UV applied to your spec',
  'Quality check before ship',
]

const whySpotUV = [
  {
    title: 'Premium tactile feel',
    desc: 'The raised UV coating creates a texture that makes your sticker feel as good as it looks.',
  },
  {
    title: 'Visual contrast',
    desc: 'Gloss-on-matte creates a dramatic contrast effect that catches light and demands attention.',
  },
  {
    title: 'Brand elevation',
    desc: 'Used by luxury brands, cannabis companies, and anyone who wants packaging that stands apart.',
  },
]

export default function SpotUVPage() {
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
              <span className="text-gray-900 font-medium">Spot UV Stickers</span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_600px] gap-12 items-start">

            {/* Calculator first on mobile */}
            <div className="order-first lg:order-last">
              <SpotUVCalculator productName="Spot UV Stickers" />
            </div>

            {/* Product Info */}
            <div className="order-last lg:order-first">

              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="popular">Premium</Badge>
                  <Badge variant="new">High Impact</Badge>
                </div>
                <h1 className="text-h1 font-semibold text-gray-900 mb-4">
                  Spot UV Stickers
                </h1>
                <p className="text-body-lg text-gray-600 leading-relaxed">
                  Spot UV is a premium finishing technique that applies a UV-cured gloss coating
                  over selected areas of your design. The contrast between the UV-coated elements
                  and the base surface creates a striking visual and tactile effect — the kind of
                  detail that makes people pick up your sticker and actually look at it.
                </p>
              </div>

              {/* Why Spot UV */}
              <div className="space-y-4 mb-8">
                {whySpotUV.map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-lp-green mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-small font-semibold text-gray-900 mb-1">{item.title}</p>
                      <p className="text-small text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
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
                  Not sure how to set up your spot layer? Our design team can prep your file.{' '}
                  <Link href="/services/graphic-design" className="text-lp-green font-semibold hover:underline">
                    Ask about design services →
                  </Link>
                </p>
              </div>

              {/* Custom escape hatch */}
              <div className="rounded-card border border-gray-200 p-6">
                <h3 className="text-h4 font-semibold text-gray-900 mb-2">Need a custom run?</h3>
                <p className="text-small text-gray-600 mb-4">
                  Unusual sizes, specialty substrates, flood UV, or orders over 2,500? Let&apos;s talk.
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

          {/* Related Products */}
          <div className="mt-20 pt-12 border-t border-gray-100">
            <h2 className="text-h2 font-semibold text-gray-900 mb-8">You might also want</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Link href="/shop/stickers" className="group block bg-white rounded-card shadow-card hover:shadow-card-hover border border-gray-100 p-6 transition-all duration-250">
                <Badge variant="popular" className="mb-4">Most Popular</Badge>
                <h3 className="text-h4 font-semibold text-gray-900 group-hover:text-lp-green transition-colors mb-2">
                  Standard & Holographic Stickers
                </h3>
                <p className="text-small text-gray-600 mb-4">
                  Die-cut stickers on premium vinyl. Standard, holographic, matte or gloss.
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-lp-green">
                  View product <ArrowRight size={12} />
                </span>
              </Link>
              <Link href="/shop/roll-labels" className="group block bg-white rounded-card shadow-card hover:shadow-card-hover border border-gray-100 p-6 transition-all duration-250">
                <Badge variant="new" className="mb-4">Bulk</Badge>
                <h3 className="text-h4 font-semibold text-gray-900 group-hover:text-lp-green transition-colors mb-2">
                  Roll Labels
                </h3>
                <p className="text-small text-gray-600 mb-4">
                  High-volume roll labels for product packaging, retail, food & beverage.
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
