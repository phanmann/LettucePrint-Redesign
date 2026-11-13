'use client'

import MobileOptionSelect from '@/components/shop/MobileOptionSelect'

import { useState } from 'react'
import RelatedProducts from '@/components/shop/RelatedProducts'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { Disclosure } from '@/components/shop/ProductDisclosure'
import { CheckCircle, FileText, Layers } from 'lucide-react'
import ProductImageGallery from '@/components/shop/ProductImageGallery'
import { useRouter } from 'next/navigation'
import ProductArtwork, { useProductOrder } from '@/components/shop/ProductArtwork'
import QuantityDropdown from '@/components/shop/QuantityDropdown'
import { unitPriceLabel } from '@/lib/unit-price'
import { POSTCARDS_PRODUCT, PRINT_QUANTITIES, printPriceTable, type PrintQuantity } from '@/lib/print-pricing'

// ─── Option data ──────────────────────────────────────────────────────────────

type Size    = '4x6' | '5x7' | '6x9'
type Stock   = 'standard' | 'premium'
type Finish  = 'gloss' | 'matte'
type Sides   = 'double' | 'single'

const SIZES: { id: Size; label: string; description: string }[] = [
  { id: '4x6',  label: '4" × 6"',  description: 'Classic mailer size. Cost-effective for high-volume campaigns.' },
  { id: '5x7',  label: '5" × 7"',  description: 'More visual real estate for bold imagery and event details.' },
  { id: '6x9',  label: '6" × 9"',  description: 'Large-format. Stands out in any mailbox — great for real estate and promos.' },
]

const STOCKS: { id: Stock; label: string; description: string }[] = [
  { id: 'standard', label: 'Standard', description: '100 lb. gloss cover' },
  { id: 'premium',  label: 'Premium',  description: '16 pt C2S cover' },
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
  { label: 'Sizes',         value: '4×6, 5×7, 6×9' },
  { label: 'Stock',         value: 'Standard (100 lb. gloss cover) or Premium (16 pt C2S cover)' },
  { label: 'Color mode',    value: 'Full-color CMYK' },
  { label: 'Minimum order', value: '100 postcards' },
  { label: 'Turnaround',    value: '5–7 business days after proof approval, plus shipping' },
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
  const [stock,  setStock]  = useState<Stock>('standard')
  const [qty,    setQty]    = useState<PrintQuantity>(100)
  const [finish, setFinish] = useState<Finish>('gloss')
  const [sides,  setSides]  = useState<Sides>('double')
  const router = useRouter()

  const sectionLabel = 'block text-sm font-bold text-gray-900 mb-3'
  const selectClass = 'w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-900 focus:border-lp-green focus:outline-none focus:ring-2 focus:ring-lp-green/20'
  const radioRow = (active: boolean) =>
    `min-w-0 [overflow-wrap:anywhere] flex items-center gap-2 px-3 py-3 rounded-lg border cursor-pointer transition-all duration-150 ${
      active ? 'border-lp-green bg-lp-green/5' : 'border-gray-200 bg-white hover:border-gray-300'
    }`
  const radioCircle = (active: boolean) =>
    `w-4 h-4 rounded-full border-2 flex-shrink-0 transition-colors ${
      active ? 'border-lp-green bg-lp-green' : 'border-gray-300 bg-white'
    }`

  const { addItem, artwork } = useProductOrder()
  const [added, setAdded] = useState(false)

  const sizeLabel = SIZES.find(x => x.id === size)?.label ?? size
  const price = printPriceTable(POSTCARDS_PRODUCT, sizeLabel)?.[qty] ?? null
  const fmt = (n: number) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  const handleQuote = () => {
    if (price == null) return
    const s  = SIZES.find(x => x.id === size)?.label ?? size
    const st = STOCKS.find(x => x.id === stock)?.label ?? stock
    const f  = FINISHES.find(x => x.id === finish)?.label ?? finish
    const sd = SIDES.find(x => x.id === sides)?.label ?? sides
    addItem({
      product: POSTCARDS_PRODUCT,
      size: s,
      qty,
      material: `${st} stock · ${sd}`,
      finish: f,
      rush: 'standard',
      totalCents: price * 100,
      totalFormatted: fmt(price),
      productPath: '/shop/marketing-materials/postcards/standard',
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="w-full max-w-[600px] bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">

      {/* ── Size ── */}
      <div className="mb-6">
        <label htmlFor="postcard-size" className={sectionLabel}>Size</label>
        <select id="postcard-size" value={size} onChange={e => setSize(e.target.value as Size)} className={selectClass}>
          {SIZES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
        </select>
        <p className="text-xs text-gray-400 mt-2">{SIZES.find(s => s.id === size)?.description}</p>
      </div>

      <div className="border-t border-gray-100 mb-6" />

      {/* ── Stock ── */}
      <div className="mb-6">
        <label htmlFor="postcard-stock" className={sectionLabel}>Stock options</label>
        <select id="postcard-stock" value={stock} onChange={e => setStock(e.target.value as Stock)} className={selectClass}>
          {STOCKS.map(s => <option key={s.id} value={s.id}>{s.label} — {s.description}</option>)}
        </select>
      </div>

      <div className="border-t border-gray-100 mb-6" />

      {/* ── Quantity ── */}
      <div className="mb-6">
        <p className={sectionLabel}>Quantity</p>
        <QuantityDropdown unit="card" value={qty} onSelect={q => setQty(q as PrintQuantity)} rows={PRINT_QUANTITIES.map(q => {
          const total = printPriceTable(POSTCARDS_PRODUCT, sizeLabel)?.[q] ?? 0
          const base = (printPriceTable(POSTCARDS_PRODUCT, sizeLabel)?.[PRINT_QUANTITIES[0]] ?? 0) / PRINT_QUANTITIES[0]
          return { qty: q, totalCents: Math.round(total * 100), totalFmt: fmt(total), save: base > 0 ? Math.max(0, Math.round((1 - total / q / base) * 100)) : 0 }
        })} />
      </div>

      <div className="border-t border-gray-100 mb-6" />

      {/* ── Finish ── */}
      <div className="mb-6">
        <p className={sectionLabel}>Paper finish</p>
        <MobileOptionSelect label="Paper finish" value={finish} onChange={setFinish} options={FINISHES.map(option => ({ ...option, value: option.id }))} />
        <div className="hidden md:grid grid-cols-2 gap-2" data-option-grid>
          {FINISHES.map(f => (
            <label key={f.id} className={radioRow(finish === f.id)} onClick={() => setFinish(f.id)}>
              <div className={radioCircle(finish === f.id)} />
              <div>
                <p className={`text-sm font-bold leading-snug ${finish === f.id ? 'text-gray-900' : 'text-gray-700'}`}>{f.label}</p>
                <p className="text-xs font-normal leading-relaxed text-gray-500 mt-1">{f.description}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-100 mb-6" />

      {/* ── Sides ── */}
      <div className="mb-6">
        <p className={sectionLabel}>Printing sides</p>
        <MobileOptionSelect label="Printing sides" value={sides} onChange={setSides} options={SIDES.map(option => ({ ...option, value: option.id }))} />
        <div className="hidden md:grid grid-cols-2 gap-2" data-option-grid>
          {SIDES.map(s => (
            <label key={s.id} className={radioRow(sides === s.id)} onClick={() => setSides(s.id)}>
              <div className={radioCircle(sides === s.id)} />
              <div>
                <p className={`text-sm font-bold leading-snug ${sides === s.id ? 'text-gray-900' : 'text-gray-700'}`}>{s.label}</p>
                <p className="text-xs font-normal leading-relaxed text-gray-500 mt-1">{s.description}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      <ProductArtwork artwork={artwork} />
      {/* ── CTA ── */}
      <div className="border-t border-gray-200 pt-5">
        {price != null && (
          <div className="flex items-baseline justify-between flex-wrap gap-2 mb-4">
            <span className="text-sm text-gray-500">{qty.toLocaleString()} postcards</span>
            <span className="text-right"><span className="block text-3xl font-bold text-gray-900">{fmt(price)}</span><span className="text-sm text-gray-500">{unitPriceLabel(price * 100, qty, 'card')}</span></span>
          </div>
        )}
        <div className="flex gap-2">
          <Button disabled={artwork.busy} onClick={handleQuote} size="lg" className="flex-1 !bg-lp-green hover:!bg-lp-green-dark text-white text-base font-semibold py-4 rounded-xl">
            {added ? '✓ Added to cart' : 'Add to cart'}
          </Button>
          <Button onClick={() => router.push('/cart')} size="lg" variant="secondary" className="px-4 py-4 rounded-xl border-gray-300 text-gray-700 hover:border-lp-green hover:text-lp-green">
            View cart
          </Button>
        </div>
        <p className="text-xs text-gray-400 text-center mt-3">
          Upload artwork · Proof before production · Shipping at checkout
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

export default function PostcardsPage() {
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
              <span className="text-gray-900 font-medium">Postcards</span>
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
                  <Badge variant="new">Fast Turnaround</Badge>
                  <Badge variant="popular">Most Popular</Badge>
                </div>
                <h1 className="text-h1 font-semibold text-gray-900 mb-4">Postcards</h1>
                <p className="text-body-lg text-gray-600 leading-relaxed">
                  Full-color postcards in standard mailer sizes from 4×6 to 6×9. Choose Standard or Premium stock, gloss or matte finish. USPS compliant. Printed in Brooklyn.
                </p>
              </div>

              <ProductImageGallery
              />
              {/* Mobile-only configurator — inline after gallery */}
              <div className="lg:hidden mb-8">
                <Configurator />
              </div>



              <div className="bg-lp-green/5 rounded-card border border-lp-green/20 p-6 mb-8">
                <h2 className="text-small font-semibold text-lp-green uppercase tracking-wider mb-4">Every order includes</h2>
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
                    <span className="flex items-center gap-2">
                      <Layers size={16} className="text-gray-500" />
                      <span className="text-small font-semibold text-gray-500 uppercase tracking-wider">Specifications</span>
                    </span>
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
                    <span className="flex items-center gap-2">
                      <FileText size={16} className="text-gray-500" />
                      <span className="text-small font-semibold text-gray-500 uppercase tracking-wider">Artwork Requirements</span>
                    </span>
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


            </div>
          </div>

          <RelatedProducts currentPath="/shop/marketing-materials/postcards/standard" />
        </div>
      </main>
      <Footer />
    </>
  )
}
