'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { Disclosure } from '@/components/shop/ProductDisclosure'
import { ArrowRight, CheckCircle, FileText, Layers } from 'lucide-react'
import ProductImageGallery from '@/components/shop/ProductImageGallery'
import { useRouter } from 'next/navigation'

// ─── Option data ──────────────────────────────────────────────────────────────

type Size    = '4x6' | '5x7' | '6x9' | '6x11'
type Finish  = 'gloss' | 'matte'
type Sides   = 'double' | 'single'

const SIZES: { id: Size; label: string; description: string }[] = [
  { id: '4x6',  label: '4" × 6"',  description: 'Classic mailer size. Cost-effective for high-volume campaigns.' },
  { id: '5x7',  label: '5" × 7"',  description: 'More visual real estate for bold imagery and event details.' },
  { id: '6x9',  label: '6" × 9"',  description: 'Large-format. Stands out in any mailbox — great for real estate and promos.' },
  { id: '6x11', label: '6" × 11"', description: 'Maximum impact. The largest standard postcard size.' },
]

const FINISHES: { id: Finish; label: string; description: string }[] = [
  { id: 'gloss', label: 'Gloss', description: 'High-shine coating. Colors pop — great for bold imagery and photos.' },
  { id: 'matte', label: 'Matte', description: 'Soft, non-reflective finish. Clean and easy to read.' },
]

const SIDES: { id: Sides; label: string; description: string }[] = [
  { id: 'double', label: 'Double-Sided', description: 'Print on both sides.' },
  { id: 'single', label: 'Single-Sided', description: 'Front only.' },
]

const specs = [
  { label: 'Sizes',         value: '4×6, 5×7, 6×9, 6×11' },
  { label: 'Stock',         value: '100 lb. coated gloss or matte' },
  { label: 'Color mode',    value: 'Full-color CMYK' },
  { label: 'Minimum order', value: '100 postcards' },
  { label: 'Turnaround',    value: '2–3 business days after approval' },
  { label: 'USPS',          value: 'Postcard compliant sizes available' },
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

// ─── Configurator ─────────────────────────────────────────────────────────────

function Configurator() {
  const [size,   setSize]   = useState<Size>('4x6')
  const [finish, setFinish] = useState<Finish>('gloss')
  const [sides,  setSides]  = useState<Sides>('double')
  const router = useRouter()

  const sectionLabel = 'block text-sm font-bold text-gray-900 mb-3'
  const radioRow = (active: boolean) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all duration-150 ${
      active ? 'border-lp-green bg-lp-green/5' : 'border-gray-200 bg-white hover:border-gray-300'
    }`
  const radioCircle = (active: boolean) =>
    `w-4 h-4 rounded-full border-2 flex-shrink-0 transition-colors ${
      active ? 'border-lp-green bg-lp-green' : 'border-gray-300 bg-white'
    }`

  const handleQuote = () => {
    const s  = SIZES.find(x => x.id === size)?.label ?? size
    const f  = FINISHES.find(x => x.id === finish)?.label ?? finish
    const sd = SIDES.find(x => x.id === sides)?.label ?? sides
    const details = `Standard Postcard — ${s}, ${f} finish, ${sd}`
    router.push(
      `/get-quote?product=${encodeURIComponent('Standard Postcard')}&details=${encodeURIComponent(details)}`
    )
  }

  return (
    <div className="w-full max-w-[600px] bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 lg:sticky lg:top-24">

      {/* ── Size ── */}
      <div className="mb-6">
        <p className={sectionLabel}>Size</p>
        <div className="space-y-2">
          {SIZES.map(s => (
            <label key={s.id} className={radioRow(size === s.id)} onClick={() => setSize(s.id)}>
              <div className={radioCircle(size === s.id)} />
              <div>
                <p className={`text-sm font-medium leading-tight ${size === s.id ? 'text-gray-900' : 'text-gray-700'}`}>{s.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{s.description}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-100 mb-6" />

      {/* ── Finish ── */}
      <div className="mb-6">
        <p className={sectionLabel}>Paper finish</p>
        <div className="space-y-2">
          {FINISHES.map(f => (
            <label key={f.id} className={radioRow(finish === f.id)} onClick={() => setFinish(f.id)}>
              <div className={radioCircle(finish === f.id)} />
              <div>
                <p className={`text-sm font-medium leading-tight ${finish === f.id ? 'text-gray-900' : 'text-gray-700'}`}>{f.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{f.description}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-100 mb-6" />

      {/* ── Sides ── */}
      <div className="mb-6">
        <p className={sectionLabel}>Printing sides</p>
        <div className="space-y-2">
          {SIDES.map(s => (
            <label key={s.id} className={radioRow(sides === s.id)} onClick={() => setSides(s.id)}>
              <div className={radioCircle(sides === s.id)} />
              <div>
                <p className={`text-sm font-medium leading-tight ${sides === s.id ? 'text-gray-900' : 'text-gray-700'}`}>{s.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{s.description}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="border-t border-gray-200 pt-5">
        <Button
          onClick={handleQuote}
          size="lg"
          className="w-full !bg-lp-green hover:!bg-lp-green-dark text-white text-base font-semibold py-4 rounded-xl"
        >
          Get a Quote <ArrowRight size={16} className="ml-2" />
        </Button>
        <p className="text-xs text-gray-400 text-center mt-3">
          We&apos;ll confirm pricing + turnaround within a few hours.
        </p>
        <p className="text-xs text-center mt-2">
          <span className="text-gray-500">Questions? Call us: </span>
          <a href="tel:3476030557" className="font-semibold text-lp-green hover:underline">347.603.0557</a>
        </p>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function StandardPostcardsPage() {
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
              <Link href="/services/marketing-materials/postcards" className="hover:text-lp-green transition-colors">Postcards</Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">Standard</span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_520px] gap-12 items-start">

            {/* Right — Configurator (first on mobile) */}
            <div className="order-first lg:order-last">
              <Configurator />
            </div>

            {/* Left — Product Info */}
            <div className="order-last lg:order-first">
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="new">Fast Turnaround</Badge>
                  <Badge variant="popular">Most Popular</Badge>
                </div>
                <h1 className="text-h1 font-semibold text-gray-900 mb-4">Standard Postcards</h1>
                <p className="text-body-lg text-gray-600 leading-relaxed">
                  Full-color postcards in every standard mailer size — 4×6 up to 6×11. Gloss or matte finish on 100 lb. coated stock. USPS compliant. Printed in Brooklyn.
                </p>
              </div>

              <ProductImageGallery
                images={[
                  { src: 'https://drive.usercontent.google.com/download?id=16GP_uv16UVWwZyO_WAvAZDfCMoMRsCoE&export=view', alt: 'Postcard print samples' },
                  { src: 'https://drive.usercontent.google.com/download?id=1C-8AXzKw1umGCMhR2T03yzFlOZXMBdoX&export=view', alt: 'Custom postcards' },
                  { src: 'https://drive.usercontent.google.com/download?id=1_To7GcDYNA3b28ywoo0S8Ev4H5uct3O6&export=view', alt: 'Large format postcard' },
                  { src: 'https://drive.usercontent.google.com/download?id=1qt5HNfk394sSSzs9teHR1T5eh5dtwZAc&export=view', alt: 'Postcard stack' },
                ]}
              />

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
                <Disclosure
                  title={
                    <div className="flex items-center gap-2">
                      <Layers size={16} className="text-gray-500" />
                      <h3 className="text-small font-semibold text-gray-500 uppercase tracking-wider">Specifications</h3>
                    </div>
                  }
                >
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
                <Disclosure
                  title={
                    <div className="flex items-center gap-2">
                      <FileText size={16} className="text-gray-500" />
                      <h3 className="text-small font-semibold text-gray-500 uppercase tracking-wider">Artwork Requirements</h3>
                    </div>
                  }
                >
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
                    <Link href="/get-quote" className="text-lp-green font-semibold hover:underline">
                      Ask about design services →
                    </Link>
                  </p>
                </Disclosure>
              </div>

              {/* Premium upgrade */}
              <div className="rounded-card border border-gray-200 p-6">
                <h3 className="text-h4 font-semibold text-gray-900 mb-2">Want a premium upgrade?</h3>
                <p className="text-small text-gray-600 mb-4">
                  Soft-touch laminate and raised spot UV available on 18 pt stock — for mailers that demand a second look.
                </p>
                <Link
                  href="/services/marketing-materials/postcards/premium"
                  className="inline-flex items-center gap-2 text-small font-semibold text-lp-green hover:text-lp-green-dark transition-colors"
                >
                  See Premium Postcards <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>

          {/* Related */}
          <div className="mt-20 pt-12 border-t border-gray-100">
            <h2 className="text-h2 font-semibold text-gray-900 mb-8">You might also want</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Link
                href="/services/marketing-materials/postcards/premium"
                className="group block bg-lp-black rounded-card p-6 transition-all duration-250 hover:opacity-90"
              >
                <Badge variant="popular" className="mb-4">Premium</Badge>
                <h3 className="text-h4 font-semibold text-white mb-2">Premium Postcards</h3>
                <p className="text-small text-white/70 mb-4">Soft-touch or spot UV on heavy 18 pt stock.</p>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-lp-green">
                  View product <ArrowRight size={12} />
                </span>
              </Link>
              <Link
                href="/services/marketing-materials/business-cards"
                className="group block bg-white rounded-card shadow-card hover:shadow-card-hover border border-gray-100 p-6 transition-all duration-250"
              >
                <Badge variant="new" className="mb-4">Popular</Badge>
                <h3 className="text-h4 font-semibold text-gray-900 group-hover:text-lp-green transition-colors mb-2">Business Cards</h3>
                <p className="text-small text-gray-600 mb-4">Standard and premium business cards printed in Brooklyn.</p>
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
