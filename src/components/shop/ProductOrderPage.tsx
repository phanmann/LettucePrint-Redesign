'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { Disclosure } from '@/components/shop/ProductDisclosure'
import { ArrowRight, CheckCircle, FileText, Layers, Zap } from 'lucide-react'
import ProductImageGallery from '@/components/shop/ProductImageGallery'
import { useRouter } from 'next/navigation'

export interface OptionGroup {
  label: string
  options: { id: string; label: string; description: string; badge?: string }[]
}

export interface PricingRow {
  qty: number | string
  standardPrice: number
  rushPrice?: number
  note?: string
}

export interface ProductOrderPageProps {
  name: string
  tagline: string
  breadcrumb: { label: string; href: string }[]
  badges?: string[]
  color: string
  optionGroups: OptionGroup[]
  pricingTable?: PricingRow[]
  pricingNote?: string
  specs: { label: string; value: string }[]
  artworkRequirements: { label: string; value: string }[]
  included: string[]
  parentHref: string
  relatedProducts?: { href: string; name: string; description: string; dark?: boolean }[]
  customNote?: string
  showQuantity?: boolean
  images?: { src: string; alt: string }[]
}

function fmt(n: number) {
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

// ─── Shared radio styles ──────────────────────────────────────────────────────
const sectionLabel = 'block text-sm font-bold text-gray-900 mb-3'
const radioRow = (active: boolean) =>
  `flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all duration-150 ${
    active ? 'border-lp-green bg-lp-green/5' : 'border-gray-200 bg-white hover:border-gray-300'
  }`
const radioCircle = (active: boolean) =>
  `w-4 h-4 rounded-full border-2 flex-shrink-0 transition-colors ${
    active ? 'border-lp-green bg-lp-green' : 'border-gray-300 bg-white'
  }`

// ─── CTA block (reused in both desktop panel and mobile inline slot) ──────────
function CtaBlock({
  onClick,
  displayPrice,
  isRush,
  pricingNote,
}: {
  onClick: () => void
  displayPrice: number | null
  isRush: boolean
  pricingNote?: string
}) {
  const subtext = displayPrice != null
    ? 'Upload artwork · Proof before production · Pickup or ship'
    : "We'll confirm pricing + turnaround within a few hours."
  return (
    <>
      {displayPrice != null && (
        <div className="flex items-baseline justify-between mb-4">
          <span className="text-3xl font-bold text-gray-900">{fmt(displayPrice)}</span>
          {isRush && (
            <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded-full flex items-center gap-1">
              <Zap size={11} /> Rush
            </span>
          )}
        </div>
      )}
      <Button
        onClick={onClick}
        size="lg"
        className="w-full !bg-lp-green hover:!bg-lp-green-dark text-white text-base font-semibold py-4 rounded-xl"
      >
        Order Now <ArrowRight size={16} className="ml-2" />
      </Button>
      <p className="text-xs text-gray-400 text-center mt-3">{subtext}</p>
      {pricingNote && <p className="text-xs text-gray-500 text-center mt-2">{pricingNote}</p>}
      <p className="text-xs text-center mt-2">
        <span className="text-gray-500">Questions? Call us: </span>
        <a href="tel:3476030557" className="font-semibold text-lp-green hover:underline">347.603.0557</a>
      </p>
    </>
  )
}

// ─── Configurator panel (options only — no CTA) ───────────────────────────────
function ConfiguratorOptions({
  optionGroups,
  pricingTable,
  showQuantity,
  selections,
  setSelections,
  selectedRowIdx,
  setSelectedRowIdx,
  isRush,
  setIsRush,
  quantity,
  setQuantity,
}: {
  optionGroups: OptionGroup[]
  pricingTable?: PricingRow[]
  showQuantity?: boolean
  selections: Record<string, string>
  setSelections: (s: Record<string, string>) => void
  selectedRowIdx: number
  setSelectedRowIdx: (i: number) => void
  isRush: boolean
  setIsRush: (v: boolean) => void
  quantity: number
  setQuantity: (n: number) => void
}) {
  const hasQtyTiers = pricingTable && pricingTable.length > 1
  const currentRow = pricingTable?.[selectedRowIdx]
  const hasRush = pricingTable?.some(r => r.rushPrice)

  return (
    <>
      {/* Quantity field */}
      {showQuantity && (
        <div className="mb-6">
          <p className={sectionLabel}>Quantity</p>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm font-medium text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-lp-green/30 focus:border-lp-green"
          />
          <div className="border-t border-gray-100 mt-6" />
        </div>
      )}

      {/* Option groups */}
      {optionGroups.map((group, i) => (
        <div key={group.label}>
          <div className="mb-6">
            <p className={sectionLabel}>{group.label}</p>
            <div className="space-y-2">
              {group.options.map(opt => (
                <label
                  key={opt.id}
                  className={radioRow(selections[group.label] === opt.id)}
                  onClick={() => setSelections({ ...selections, [group.label]: opt.id })}
                >
                  <div className={radioCircle(selections[group.label] === opt.id)} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className={`text-sm font-medium leading-tight ${selections[group.label] === opt.id ? 'text-gray-900' : 'text-gray-700'}`}>
                        {opt.label}
                      </p>
                      {opt.badge && (
                        <span className="text-xs font-semibold text-lp-green bg-lp-green/10 px-1.5 py-0.5 rounded-full">
                          {opt.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{opt.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
          {(i < optionGroups.length - 1 || pricingTable) && (
            <div className="border-t border-gray-100 mb-6" />
          )}
        </div>
      ))}

      {/* Qty selector — tiered pricing */}
      {hasQtyTiers && (
        <div className="mb-6">
          <p className={sectionLabel}>Quantity</p>
          <select
            value={selectedRowIdx}
            onChange={e => setSelectedRowIdx(Number(e.target.value))}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm font-medium text-gray-900 bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-lp-green/30 focus:border-lp-green"
          >
            {pricingTable!.map((row, i) => (
              <option key={i} value={i}>
                {typeof row.qty === 'number' ? row.qty.toLocaleString() : row.qty} units
                {' — '}
                {fmt(row.standardPrice)}
                {row.note ? ` (${row.note})` : ''}
              </option>
            ))}
          </select>
          {hasRush && (
            <label className={`mt-2 ${radioRow(isRush)}`} onClick={() => setIsRush(!isRush)}>
              <div className={radioCircle(isRush)} />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Zap size={13} className={isRush ? 'text-amber-500' : 'text-gray-400'} />
                  <p className="text-sm font-medium text-gray-800">Rush production</p>
                  <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full">Next day</span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">
                  {currentRow?.rushPrice
                    ? `Add ${fmt(currentRow.rushPrice - currentRow.standardPrice)} — total ${fmt(currentRow.rushPrice)}`
                    : 'Price on request'}
                </p>
              </div>
            </label>
          )}
          <div className="border-t border-gray-100 mt-6 mb-0" />
        </div>
      )}

      {/* Single-unit rush toggle */}
      {pricingTable && pricingTable.length === 1 && hasRush && (
        <div className="mb-6">
          <label className={`mb-3 ${radioRow(isRush)}`} onClick={() => setIsRush(!isRush)}>
            <div className={radioCircle(isRush)} />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Zap size={13} className={isRush ? 'text-amber-500' : 'text-gray-400'} />
                <p className="text-sm font-medium text-gray-800">Rush production</p>
                <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full">Next day</span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                {pricingTable[0].rushPrice
                  ? `+${fmt(pricingTable[0].rushPrice - pricingTable[0].standardPrice)} — total ${fmt(pricingTable[0].rushPrice)}`
                  : 'Price on request'}
              </p>
            </div>
          </label>
          <div className="border-t border-gray-100 mb-0" />
        </div>
      )}
    </>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function ProductOrderPage({
  name,
  tagline,
  breadcrumb,
  badges = [],
  color,
  optionGroups,
  pricingTable,
  pricingNote,
  specs,
  artworkRequirements,
  included,
  relatedProducts = [],
  customNote,
  showQuantity,
  images,
}: ProductOrderPageProps) {
  const router = useRouter()

  // ── Lifted configurator state ──────────────────────────────────────────────
  const [selections, setSelections] = useState<Record<string, string>>(() =>
    Object.fromEntries(optionGroups.map(g => [g.label, g.options[0].id]))
  )
  const [selectedRowIdx, setSelectedRowIdx] = useState(0)
  const [isRush, setIsRush] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const currentRow = pricingTable?.[selectedRowIdx]
  const displayPrice = currentRow
    ? isRush && currentRow.rushPrice ? currentRow.rushPrice : currentRow.standardPrice
    : null

  const handleOrderNow = () => {
    const details = optionGroups
      .map(g => {
        const sel = g.options.find(o => o.id === selections[g.label])
        return `${g.label}: ${sel?.label ?? selections[g.label]}`
      })
      .join(', ')
    const qtyStr = showQuantity ? `, Qty: ${quantity}` : currentRow ? `, Qty: ${currentRow.qty}` : ''
    const rushStr = isRush ? ', Rush' : ''
    router.push(
      `/get-quote?product=${encodeURIComponent(name)}&details=${encodeURIComponent(details + qtyStr + rushStr)}`
    )
  }

  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        {/* Breadcrumb */}
        <div className="bg-gray-50 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center gap-2 text-xs text-gray-500 flex-wrap">
              <Link href="/" className="hover:text-lp-green transition-colors">Home</Link>
              {breadcrumb.map((crumb, i) => (
                <span key={i} className="flex items-center gap-2">
                  <span>/</span>
                  {i === breadcrumb.length - 1 ? (
                    <span className="text-gray-900 font-medium">{crumb.label}</span>
                  ) : (
                    <Link href={crumb.href} className="hover:text-lp-green transition-colors">{crumb.label}</Link>
                  )}
                </span>
              ))}
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_520px] gap-12 items-start">

            {/* Right — Configurator panel: desktop only (hidden on mobile, rendered inline in left col) */}
            <div className="hidden lg:block lg:order-last">
              <div className="w-full max-w-[600px] bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 lg:sticky lg:top-24">
                <ConfiguratorOptions
                  optionGroups={optionGroups}
                  pricingTable={pricingTable}
                  showQuantity={showQuantity}
                  selections={selections}
                  setSelections={setSelections}
                  selectedRowIdx={selectedRowIdx}
                  setSelectedRowIdx={setSelectedRowIdx}
                  isRush={isRush}
                  setIsRush={setIsRush}
                  quantity={quantity}
                  setQuantity={setQuantity}
                />
                <div className={pricingTable ? 'pt-5' : 'border-t border-gray-200 pt-5'}>
                  <CtaBlock
                    onClick={handleOrderNow}
                    displayPrice={displayPrice}
                    isRush={isRush}
                    pricingNote={pricingNote}
                  />
                </div>
              </div>
            </div>

            {/* Left — Product info (full width on mobile) */}
            <div className="lg:order-first">
              <div className="mb-8">
                {badges.length > 0 && (
                  <div className="flex items-center gap-2 mb-4 flex-wrap">
                    {badges.map(b => (
                      <Badge key={b} variant={b === 'Premium' ? 'popular' : b === 'Rush' ? 'rush' : 'new'}>
                        {b}
                      </Badge>
                    ))}
                  </div>
                )}
                <h1 className="text-h1 font-semibold text-gray-900 mb-4">{name}</h1>
                <p className="text-body-lg text-gray-600 leading-relaxed">{tagline}</p>
              </div>

              {/* Image gallery */}
              {images && images.length > 0 && <ProductImageGallery images={images} />}

              {/* Color swatch fallback */}
              {(!images || images.length === 0) && (
                <div
                  className="w-full h-36 rounded-2xl flex items-center justify-center mb-8"
                  style={{ backgroundColor: color }}
                >
                  <p className="text-sm font-semibold text-gray-500">{name}</p>
                </div>
              )}

              {/* Mobile-only configurator — inline after gallery, hidden on desktop */}
              <div className="lg:hidden mb-8">
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                  <ConfiguratorOptions
                    optionGroups={optionGroups}
                    pricingTable={pricingTable}
                    showQuantity={showQuantity}
                    selections={selections}
                    setSelections={setSelections}
                    selectedRowIdx={selectedRowIdx}
                    setSelectedRowIdx={setSelectedRowIdx}
                    isRush={isRush}
                    setIsRush={setIsRush}
                    quantity={quantity}
                    setQuantity={setQuantity}
                  />
                  <div className={pricingTable ? 'pt-5' : 'border-t border-gray-200 pt-5'}>
                    <CtaBlock
                      onClick={handleOrderNow}
                      displayPrice={displayPrice}
                      isRush={isRush}
                      pricingNote={pricingNote}
                    />
                  </div>
                </div>
              </div>

              {/* Every order includes */}
              <div className="bg-lp-green/5 rounded-card border border-lp-green/20 p-6 mb-8">
                <h3 className="text-small font-semibold text-lp-green uppercase tracking-wider mb-4">
                  Every order includes
                </h3>
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
                      <h3 className="text-small font-semibold text-gray-500 uppercase tracking-wider">
                        Specifications
                      </h3>
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
              {artworkRequirements.length > 0 && (
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
              )}

              {/* Custom escape */}
              <div className="rounded-card border border-gray-200 p-6">
                <h3 className="text-h4 font-semibold text-gray-900 mb-2">Need something custom?</h3>
                <p className="text-small text-gray-600 mb-4">
                  {customNote ?? "Unusual sizes, specialty materials, bulk orders, or branded packaging? Let's talk."}
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
          {relatedProducts.length > 0 && (
            <div className="mt-20 pt-12 border-t border-gray-100">
              <h2 className="text-h2 font-semibold text-gray-900 mb-8">You might also want</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedProducts.map(rp => (
                  <Link
                    key={rp.href}
                    href={rp.href}
                    className={`group block rounded-card p-6 transition-all duration-250 ${
                      rp.dark
                        ? 'bg-lp-black hover:opacity-90'
                        : 'bg-white shadow-card hover:shadow-card-hover border border-gray-100'
                    }`}
                  >
                    <h3 className={`text-h4 font-semibold mb-2 group-hover:text-lp-green transition-colors ${rp.dark ? 'text-white' : 'text-gray-900'}`}>
                      {rp.name}
                    </h3>
                    <p className={`text-small mb-4 ${rp.dark ? 'text-white/70' : 'text-gray-600'}`}>
                      {rp.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-lp-green">
                      View product <ArrowRight size={12} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
