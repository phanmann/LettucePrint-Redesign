'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { Disclosure } from '@/components/shop/ProductDisclosure'
import { ArrowRight, CheckCircle, FileText, Layers } from 'lucide-react'
import { useRouter } from 'next/navigation'

// ─── Option data ──────────────────────────────────────────────────────────────

type Finish = 'matte' | 'gloss' | 'uncoated'
type Sides  = 'single' | 'double'
type Weight = '14pt' | '16pt' | '18pt'

const FINISHES: { id: Finish; label: string; description: string }[] = [
  {
    id: 'matte',
    label: 'Matte',
    description: 'Smooth, non-reflective finish. Clean and modern look.',
  },
  {
    id: 'gloss',
    label: 'Gloss',
    description: 'High-shine UV coating. Colors pop, great for photos and bold designs.',
  },
  {
    id: 'uncoated',
    label: 'Uncoated',
    description: 'Natural, tactile surface. Writable — ideal for an organic brand feel.',
  },
]

const SIDES: { id: Sides; label: string; description: string }[] = [
  { id: 'single', label: 'Single-Sided', description: 'Print on front only.' },
  { id: 'double', label: 'Double-Sided', description: 'Print on both sides.' },
]

const WEIGHTS: { id: Weight; label: string; description: string }[] = [
  { id: '14pt', label: '14 pt', description: 'Lightweight and economical.' },
  { id: '16pt', label: '16 pt', description: 'Standard weight — sturdy and professional.' },
  { id: '18pt', label: '18 pt', description: 'Thick and substantial. Premium feel.' },
]

// ─── Specs + included ─────────────────────────────────────────────────────────

const specs = [
  { label: 'Size', value: '3.5" × 2" (standard)' },
  { label: 'Finish options', value: 'Matte, Gloss, Uncoated' },
  { label: 'Stock weights', value: '14 pt, 16 pt, 18 pt' },
  { label: 'Color mode', value: 'Full-color CMYK' },
  { label: 'Minimum order', value: '100 cards' },
  { label: 'Standard turnaround', value: '2–3 business days after approval' },
  { label: 'Corner options', value: 'Square or rounded (+cost)' },
]

const artworkRequirements = [
  { label: 'Preferred formats', value: 'AI, PDF, EPS' },
  { label: 'Accepted formats', value: 'PSD, PNG, JPG (300 DPI min)' },
  { label: 'Color mode', value: 'CMYK preferred' },
  { label: 'Bleed', value: '0.125" on all sides' },
  { label: 'Safe zone', value: '0.125" from all edges' },
]

const included = [
  'Digital proof before production',
  'Full-color CMYK printing',
  'Quality check before ship',
  'Bulk quantity discounts available',
]

// ─── Preview swatch colors per finish ────────────────────────────────────────

const FINISH_COLORS: Record<Finish, string> = {
  matte:    '#E8F5F1',
  gloss:    '#E8F0F5',
  uncoated: '#F5F0E8',
}

// ─── Configurator ─────────────────────────────────────────────────────────────

function BusinessCardConfigurator() {
  const [finish, setFinish] = useState<Finish>('matte')
  const [sides,  setSides]  = useState<Sides>('double')
  const [weight, setWeight] = useState<Weight>('16pt')
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
    const finishLabel  = FINISHES.find(f => f.id === finish)?.label ?? finish
    const sidesLabel   = SIDES.find(s => s.id === sides)?.label ?? sides
    const weightLabel  = WEIGHTS.find(w => w.id === weight)?.label ?? weight
    const details = `Standard Business Card — ${finishLabel} finish, ${sidesLabel}, ${weightLabel} stock`
    const params = new URLSearchParams({
      product: 'Standard Business Card',
      details,
    })
    router.push(`/get-quote?${params.toString()}`)
  }

  return (
    <div className="w-full max-w-[600px] bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 lg:sticky lg:top-24">

      {/* Live preview swatch */}
      <div
        className="w-full h-28 rounded-xl mb-6 flex items-center justify-center transition-colors duration-300"
        style={{ backgroundColor: FINISH_COLORS[finish] }}
      >
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-600">Standard Business Card</p>
          <p className="text-xs text-gray-400 mt-0.5">3.5″ × 2″</p>
        </div>
      </div>

      {/* ── Finish ── */}
      <div className="mb-6">
        <p className={sectionLabel}>Paper stock finish</p>
        <div className="space-y-2">
          {FINISHES.map(f => (
            <label key={f.id} className={radioRow(finish === f.id)} onClick={() => setFinish(f.id)}>
              <div className={radioCircle(finish === f.id)} />
              <div>
                <p className={`text-sm font-medium leading-tight ${finish === f.id ? 'text-gray-900' : 'text-gray-700'}`}>
                  {f.label}
                </p>
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
                <p className={`text-sm font-medium leading-tight ${sides === s.id ? 'text-gray-900' : 'text-gray-700'}`}>
                  {s.label}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{s.description}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-100 mb-6" />

      {/* ── Weight ── */}
      <div className="mb-6">
        <p className={sectionLabel}>Paper stock weight</p>
        <div className="space-y-2">
          {WEIGHTS.map(w => (
            <label key={w.id} className={radioRow(weight === w.id)} onClick={() => setWeight(w.id)}>
              <div className={radioCircle(weight === w.id)} />
              <div>
                <p className={`text-sm font-medium leading-tight ${weight === w.id ? 'text-gray-900' : 'text-gray-700'}`}>
                  {w.label}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{w.description}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="border-t border-gray-200 pt-5">
        <Button onClick={handleQuote} size="lg" className="w-full !bg-lp-green hover:!bg-lp-green-dark text-white text-base font-semibold py-4 rounded-xl">
          Get a Quote <ArrowRight size={16} className="ml-2" />
        </Button>
        <p className="text-xs text-gray-400 text-center mt-3">
          We'll confirm pricing + turnaround within a few hours.
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

export default function BusinessCardsPage() {
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
              <span className="text-gray-900 font-medium">Business Cards</span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_600px] gap-12 items-start">

            {/* Right — Configurator (first on mobile) */}
            <div className="order-first lg:order-last lg:sticky lg:top-24">
              <BusinessCardConfigurator />
            </div>

            {/* Left — Product Info */}
            <div className="order-last lg:order-first">

              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="new">Fast Turnaround</Badge>
                  <Badge variant="popular">Most Popular</Badge>
                </div>
                <h1 className="text-h1 font-semibold text-gray-900 mb-4">
                  Standard Business Cards
                </h1>
                <p className="text-body-lg text-gray-600 leading-relaxed">
                  Classic 3.5″ × 2″ business cards with crisp full-color printing. Choose your
                  finish — matte, gloss, or uncoated — and we'll handle the rest. Printed in Brooklyn.
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
              <div className="mb-8 border border-gray-200 rounded-card px-5 py-4">
                <Disclosure
                  title={
                    <div className="flex items-center gap-2">
                      <Layers size={16} className="text-gray-500" />
                      <h3 className="text-small font-semibold text-gray-500 uppercase tracking-wider">
                        Specifications
                      </h3>
                    </div>
                  }
                >
                  <div className="divide-y divide-gray-100">
                    {specs.map((spec) => (
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
                      <h3 className="text-small font-semibold text-gray-500 uppercase tracking-wider">
                        Artwork Requirements
                      </h3>
                    </div>
                  }
                >
                  <div className="space-y-2">
                    {artworkRequirements.map((req) => (
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

              {/* Premium upgrade CTA */}
              <div className="rounded-card border border-gray-200 p-6 mb-8">
                <h3 className="text-h4 font-semibold text-gray-900 mb-2">Want something more premium?</h3>
                <p className="text-small text-gray-600 mb-4">
                  We also do soft-touch laminate, spot UV, foil stamping, and extra-thick 32pt cards.
                  Request a custom quote and we'll spec it out.
                </p>
                <Link
                  href="/get-quote?product=Premium+Business+Cards"
                  className="inline-flex items-center gap-2 text-small font-semibold text-lp-green hover:text-lp-green-dark transition-colors"
                >
                  Request a premium quote <ArrowRight size={14} />
                </Link>
              </div>

              {/* Custom escape hatch */}
              <div className="rounded-card border border-gray-200 p-6">
                <h3 className="text-h4 font-semibold text-gray-900 mb-2">Need something custom?</h3>
                <p className="text-small text-gray-600 mb-4">
                  Die-cut shapes, edge painting, colored core, bulk orders, or branded packaging — let&apos;s talk.
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
              <Link
                href="/services/marketing-materials/flyers"
                className="group block bg-white rounded-card shadow-card hover:shadow-card-hover border border-gray-100 p-6 transition-all duration-250"
              >
                <Badge variant="new" className="mb-4">Marketing</Badge>
                <h3 className="text-h4 font-semibold text-gray-900 group-hover:text-lp-green transition-colors mb-2">
                  Flyers & Postcards
                </h3>
                <p className="text-small text-gray-600 mb-4">
                  Eye-catching printed collateral for campaigns, events, and retail.
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-lp-green">
                  View product <ArrowRight size={12} />
                </span>
              </Link>
              <Link
                href="/shop/stickers"
                className="group block bg-lp-black rounded-card p-6 transition-all duration-250 hover:opacity-90"
              >
                <Badge variant="popular" className="mb-4">Most Popular</Badge>
                <h3 className="text-h4 font-semibold text-white mb-2">
                  Custom Stickers
                </h3>
                <p className="text-small text-white/70 mb-4">
                  Die-cut vinyl stickers in any shape. Perfect for packaging, branding, and swag.
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
