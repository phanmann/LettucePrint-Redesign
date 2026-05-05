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
import { useCart } from '@/context/CartContext'

// ─── Option data ──────────────────────────────────────────────────────────────

type Finish  = 'gloss' | 'matte'
type Sides   = 'double' | 'single'
type Fold    = 'none' | 'half' | 'tri'

const FINISHES: { id: Finish; label: string; description: string }[] = [
  { id: 'gloss', label: 'Gloss', description: 'High-shine coating. Colors pop — great for event posters and bold imagery.' },
  { id: 'matte', label: 'Matte', description: 'Soft, non-reflective finish. Clean and sophisticated — ideal for menus and lookbooks.' },
]

const SIDES: { id: Sides; label: string; description: string }[] = [
  { id: 'double', label: 'Double-Sided', description: 'Print on both sides.' },
  { id: 'single', label: 'Single-Sided', description: 'Front only.' },
]

const FOLDS: { id: Fold; label: string; description: string }[] = [
  { id: 'none', label: 'No Fold',    description: 'Flat sheet — standard.' },
  { id: 'half', label: 'Half Fold',  description: 'Folded to 8.5" × 11" — works as a booklet or menu.' },
  { id: 'tri',  label: 'Tri-Fold',   description: 'Three panels — great for brochures and handouts.' },
]

const specs = [
  { label: 'Size',          value: '11" × 17"' },
  { label: 'Stock',         value: '80 lb. gloss or matte text' },
  { label: 'Color mode',    value: 'Full-color CMYK' },
  { label: 'Minimum order', value: '50 flyers' },
  { label: 'Turnaround',    value: '2–3 business days after approval' },
  { label: 'Folding',       value: 'Half fold, tri-fold available' },
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
  const [finish, setFinish] = useState<Finish>('gloss')
  const [sides,  setSides]  = useState<Sides>('double')
  const [fold,   setFold]   = useState<Fold>('none')
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

  const { addItem } = useCart()

  const handleQuote = () => {
    const f  = FINISHES.find(x => x.id === finish)?.label ?? finish
    const sd = SIDES.find(x => x.id === sides)?.label ?? sides
    const fo = FOLDS.find(x => x.id === fold)?.label ?? fold
    addItem({
      product: 'Tabloid Flyers',
      size: '11" × 17"',
      qty: 250,
      material: sd,
      finish: fold !== 'none' ? `${f} · ${fo}` : f,
      rush: 'standard',
      totalCents: 0,
      totalFormatted: 'Quote pending',
      productPath: '/services/marketing-materials/flyers/tabloid',
    })
    router.push(`/cart`)
  }

  return (
    <div className="w-full max-w-[600px] bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 lg:sticky lg:top-24">

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

      <div className="border-t border-gray-100 mb-6" />

      {/* ── Fold ── */}
      <div className="mb-6">
        <p className={sectionLabel}>Folding</p>
        <div className="space-y-2">
          {FOLDS.map(fo => (
            <label key={fo.id} className={radioRow(fold === fo.id)} onClick={() => setFold(fo.id)}>
              <div className={radioCircle(fold === fo.id)} />
              <div>
                <p className={`text-sm font-medium leading-tight ${fold === fo.id ? 'text-gray-900' : 'text-gray-700'}`}>{fo.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{fo.description}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="border-t border-gray-200 pt-5">
        <div className="flex gap-2">
          <Button onClick={handleQuote} size="lg" className="flex-1 !bg-lp-green hover:!bg-lp-green-dark text-white text-base font-semibold py-4 rounded-xl">
            Add to cart
          </Button>
          <Button onClick={() => router.push('/cart')} size="lg" variant="secondary" className="px-4 py-4 rounded-xl border-gray-300 text-gray-700 hover:border-lp-green hover:text-lp-green">
            View cart
          </Button>
        </div>
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

export default function TabloidFlyerPage() {
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
              <Link href="/services/marketing-materials/flyers" className="hover:text-lp-green transition-colors">Flyers</Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">Tabloid Flyer</span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_520px] gap-12 items-start">

            {/* Right — Configurator (first on mobile) */}
            <div className="hidden lg:block lg:order-last">
              <Configurator />
            </div>

            {/* Left — Product Info */}
            <div className="lg:order-first">
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="new">Large Format</Badge>
                </div>
                <h1 className="text-h1 font-semibold text-gray-900 mb-4">Tabloid Flyer</h1>
                <p className="text-body-lg text-gray-600 leading-relaxed">
                  11″ × 17″ — twice the real estate of a letter flyer. Impossible to miss. Perfect for menus, in-store promotions, concert bills, and display boards. Available flat or folded. Printed in Brooklyn.
                </p>
              </div>

              <ProductImageGallery
                images={[
                  { src: '/images/products/flyers/flyer-1.jpg', alt: 'Tabloid flyer print' },
                  { src: '/images/products/flyers/flyer-2.jpg', alt: 'Large format flyer stack' },
                ]}
              />
              {/* Mobile-only configurator — inline after gallery */}
              <div className="lg:hidden mb-8">
                <Configurator />
              </div>



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

              {/* Downsize */}
              <div className="rounded-card border border-gray-200 p-6">
                <h3 className="text-h4 font-semibold text-gray-900 mb-2">Need a smaller size?</h3>
                <p className="text-small text-gray-600 mb-4">
                  Full-page 8.5″ × 11″ or half-page 5.5″ × 8.5″ — same great quality, smaller footprint.
                </p>
                <div className="flex flex-col gap-2">
                  <Link
                    href="/services/marketing-materials/flyers/full-page"
                    className="inline-flex items-center gap-2 text-small font-semibold text-lp-green hover:text-lp-green-dark transition-colors"
                  >
                    See Full Page Flyers <ArrowRight size={14} />
                  </Link>
                  <Link
                    href="/services/marketing-materials/flyers/half-page"
                    className="inline-flex items-center gap-2 text-small font-semibold text-lp-green hover:text-lp-green-dark transition-colors"
                  >
                    See Half Page Flyers <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Related */}
          <div className="mt-20 pt-12 border-t border-gray-100">
            <h2 className="text-h2 font-semibold text-gray-900 mb-8">You might also want</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Link
                href="/services/marketing-materials/flyers/full-page"
                className="group block bg-lp-black rounded-card p-6 transition-all duration-250 hover:opacity-90"
              >
                <Badge variant="new" className="mb-4">Full Size</Badge>
                <h3 className="text-h4 font-semibold text-white mb-2">Full Page Flyer</h3>
                <p className="text-small text-white/70 mb-4">8.5″ × 11″ in gloss, matte, or heavy cover stock.</p>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-lp-green">
                  View product <ArrowRight size={12} />
                </span>
              </Link>
              <Link
                href="/services/marketing-materials/postcards"
                className="group block bg-white rounded-card shadow-card hover:shadow-card-hover border border-gray-100 p-6 transition-all duration-250"
              >
                <Badge variant="popular" className="mb-4">Popular</Badge>
                <h3 className="text-h4 font-semibold text-gray-900 group-hover:text-lp-green transition-colors mb-2">Postcards</h3>
                <p className="text-small text-gray-600 mb-4">Standard and premium postcards for direct mail campaigns.</p>
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
