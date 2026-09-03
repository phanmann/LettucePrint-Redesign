'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import Button from '@/components/ui/Button'
import QuantityDropdown from '@/components/shop/QuantityDropdown'
import {
  calculateCustomSpotUVPrice,
  QUANTITY_TIERS,
  TIER_DISCOUNTS,
  SPOT_UV_HIT_OPTIONS,
  SPOT_UV_HIT_LABELS,
  type RushOption,
  type SpotUVHits,
} from '@/lib/pricing'

interface Props { productName: string }

export default function SpotUVCalculator({ productName }: Props) {
  const [customWidth, setCustomWidth] = useState('')
  const [customHeight, setCustomHeight] = useState('')
  const [hits, setHits] = useState<SpotUVHits>(1)
  const [quantity, setQuantity] = useState<number>(100)
  const [customQty, setCustomQty] = useState('')
  const [showCustomQty, setShowCustomQty] = useState(false)
  const router = useRouter()

  const cw = parseFloat(customWidth) || 0
  const ch = parseFloat(customHeight) || 0
  const validSize = cw >= 0.5 && cw <= 12 && ch >= 0.5 && ch <= 12
  const rush: RushOption = 'standard'

  const price = useMemo(() => {
    if (!validSize) return null
    return calculateCustomSpotUVPrice(cw, ch, quantity, hits, rush)
  }, [cw, ch, quantity, hits, validSize, rush])

  const qtyRows = useMemo(() => {
    if (!validSize) return []
    return QUANTITY_TIERS.map(qty => {
      const p = calculateCustomSpotUVPrice(cw, ch, qty, hits, rush)
      return { qty, total: p.totalCents, totalFmt: p.totalFormatted, save: TIER_DISCOUNTS[qty] ?? 0 }
    })
  }, [cw, ch, hits, validSize, rush])

  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleOrder = () => {
    if (!validSize || !price) return
    addItem({
      product: productName,
      size: `${cw}" × ${ch}"`,
      qty: quantity,
      material: 'Spot UV',
      finish: SPOT_UV_HIT_LABELS[hits],
      rush,
      totalCents: price.totalCents,
      totalFormatted: price.totalFormatted,
      productPath: '/shop/spot-uv',
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const sectionLabel = 'block text-sm font-bold text-gray-900 mb-3'
  const radioRow = (active: boolean) =>
    `flex items-center justify-between px-4 py-3 rounded-lg border cursor-pointer transition-all duration-150 ${
      active ? 'border-lp-green bg-lp-green/5' : 'border-gray-200 bg-white hover:border-gray-300'
    }`
  const radioCircle = (active: boolean) =>
    `w-4 h-4 rounded-full border-2 flex-shrink-0 transition-colors ${
      active ? 'border-lp-green bg-lp-green' : 'border-gray-300 bg-white'
    }`

  const hitDescriptions: Record<SpotUVHits, string> = {
    1: 'One clear UV pass for crisp gloss contrast',
    2: 'Two clear UV passes for a more raised effect',
    3: 'Three clear UV passes for maximum available depth',
  }

  return (
    <div className="w-full max-w-[600px] bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 lg:sticky lg:top-24">

      {/* ── Size ── */}
      <div className="mb-6">
        <p className={sectionLabel}>Size (inches)</p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Width (W)</label>
            <input
              type="number" min="0.5" max="12" step="0.25"
              value={customWidth} onChange={e => setCustomWidth(e.target.value)}
              placeholder="e.g. 3.5"
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-lp-green"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Length (L)</label>
            <input
              type="number" min="0.5" max="12" step="0.25"
              value={customHeight} onChange={e => setCustomHeight(e.target.value)}
              placeholder="e.g. 2.5"
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-lp-green"
            />
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-2">Live customer pricing based on your dimensions and quantity.</p>
      </div>

      <div className="border-t border-gray-100 mb-6" />

      {/* ── Clear UV hits ── */}
      <div className="mb-6">
        <p className={sectionLabel}>Clear UV coating</p>
        <p className="text-xs text-gray-500 mb-3">More UV hits create a deeper raised texture.</p>
        <div className="space-y-2">
          {SPOT_UV_HIT_OPTIONS.map(hit => (
            <label key={hit} className={radioRow(hits === hit)} onClick={() => setHits(hit)}>
              <div className="flex items-center gap-3">
                <div className={radioCircle(hits === hit)} />
                <div>
                  <p className={`text-sm font-medium leading-tight ${hits === hit ? 'text-gray-900' : 'text-gray-700'}`}>
                    {SPOT_UV_HIT_LABELS[hit]}
                    {hit === 1 && (
                      <span className="ml-2 text-xs font-semibold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">Included</span>
                    )}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{hitDescriptions[hit]}</p>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-100 mb-6" />

      {/* ── Quantity ── */}
      <div className="mb-6">
        <p className={sectionLabel}>Select a quantity</p>
        {validSize ? (
          <QuantityDropdown
            rows={qtyRows}
            value={quantity}
            showCustom={showCustomQty}
            customValue={customQty}
            onSelect={qty => { setQuantity(qty); setShowCustomQty(false) }}
            onSelectCustom={() => setShowCustomQty(true)}
            onCustomChange={val => {
              setCustomQty(val)
              const n = parseInt(val)
              if (n >= 50) setQuantity(n)
            }}
            minCustom={50}
            stepCustom={50}
          />
        ) : (
          <p className="text-sm text-gray-400 py-4 text-center">Enter dimensions above to see pricing</p>
        )}
      </div>

      {/* ── Price Footer + CTA ── */}
      {validSize && price && (
        <>
          <div className="border-t border-gray-200 pt-5 mb-4 flex items-end justify-between">
            <p className="text-4xl font-bold text-gray-900 leading-none">{price.totalFormatted}</p>
            <p className="text-sm text-gray-500 pb-1">{price.unitFormatted} / sticker</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleOrder} size="lg" className="flex-1 !bg-lp-green hover:!bg-lp-green-dark text-white text-base font-semibold py-4 rounded-xl">
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
            <span className="text-gray-500">Need rush? Call us: </span>
            <a href="tel:3476030557" className="font-semibold text-lp-green hover:underline">347.603.0557</a>
          </p>
        </>
      )}
    </div>
  )
}
