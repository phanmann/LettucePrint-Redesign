'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import Button from '@/components/ui/Button'
import QuantityDropdown from '@/components/shop/QuantityDropdown'
import {
  calculateSpotUVPrice,
  QUANTITY_TIERS,
  TIER_DISCOUNTS,
  SIZE_LABELS,
  SIZE_SQ_IN,
  EMBOSSING_LAYER_OPTIONS,
  EMBOSSING_LAYER_LABELS,
  EMBOSSING_EXTRA_RATE_CENTS,
  formatCents,
  type StickerSize,
  type RushOption,
  type EmbossingLayers,
} from '@/lib/pricing'

// Tier table for custom Spot UV pricing (must match pricing.ts)
const REF_PRICES_3x3_CENTS: Record<number, number> = {
  50:   7500,
  100:  9800,
  250:  19500,
  500:  30000,
  1000: 45000,
  2500: 86200,
}
const REF_SQ_IN = 9
const SPOT_UV_MULT = 1.60

function calcCustomSpotUVPrice(
  sqIn: number,
  quantity: number,
  layers: EmbossingLayers
): { totalCents: number; unitCents: number; totalFormatted: string; unitFormatted: string } {
  const tier = QUANTITY_TIERS.find(t => t >= quantity) ?? 2500
  const ref = REF_PRICES_3x3_CENTS[tier]
  const base = Math.round(ref * (sqIn / REF_SQ_IN))
  const spotBase = Math.round(base * SPOT_UV_MULT)
  const embossing = layers > 0 ? Math.round(EMBOSSING_EXTRA_RATE_CENTS * sqIn * tier * layers) : 0
  const total = spotBase + embossing
  const unit = Math.round(total / tier)
  return { totalCents: total, unitCents: unit, totalFormatted: formatCents(total), unitFormatted: formatCents(unit) }
}

interface Props { productName: string }

export default function SpotUVCalculator({ productName }: Props) {
  const [selectedPreset] = useState<StickerSize | 'custom'>('custom')
  const [customWidth, setCustomWidth] = useState('')
  const [customHeight, setCustomHeight] = useState('')
  const [layers, setLayers] = useState<EmbossingLayers>(0)
  const [quantity, setQuantity] = useState<number>(100)
  const [customQty, setCustomQty] = useState('')
  const [showCustomQty, setShowCustomQty] = useState(false)
  const router = useRouter()

  const isCustomSize = selectedPreset === 'custom'
  const cw = parseFloat(customWidth) || 0
  const ch = parseFloat(customHeight) || 0
  const validSize = isCustomSize ? (cw > 0 && ch > 0) : true
  const priceSize: StickerSize = isCustomSize ? '2x2' : selectedPreset
  const customSqIn = cw * ch
  const rush: RushOption = 'standard'

  const price = useMemo(() => {
    if (isCustomSize && validSize) {
      return calcCustomSpotUVPrice(customSqIn, quantity, layers)
    }
    return calculateSpotUVPrice(priceSize, quantity, layers, rush)
  }, [priceSize, quantity, layers, isCustomSize, validSize, customSqIn])

  const qtyRows = useMemo(() => {
    return QUANTITY_TIERS.map(qty => {
      const p = isCustomSize && validSize
        ? calcCustomSpotUVPrice(customSqIn, qty, layers)
        : calculateSpotUVPrice(priceSize, qty, layers, rush)
      return { qty, total: p.totalCents, totalFmt: p.totalFormatted, save: TIER_DISCOUNTS[qty] ?? 0 }
    })
  }, [priceSize, layers, isCustomSize, validSize, customSqIn])

  const { addItem } = useCart()

  const handleOrder = () => {
    if (!validSize) return
    addItem({
      product: productName,
      size: `${cw}" × ${ch}"`,
      qty: quantity,
      material: 'Spot UV',
      finish: layers === 0 ? 'Standard (1 layer)' : `+${layers} extra layer${layers > 1 ? 's' : ''}`,
      rush,
      totalCents: price.totalCents,
      totalFormatted: price.totalFormatted,
      productPath: '/shop/spot-uv',
    })
    router.push(`/cart`)
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

  const layerDescriptions: Record<EmbossingLayers, string> = {
    0: 'Single UV pass — clean, crisp gloss',
    1: 'Two passes — slightly raised texture',
    2: 'Three passes — noticeably raised',
    3: 'Four passes — premium deep emboss',
    4: 'Five passes — maximum tactile effect',
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
        <p className="text-xs text-gray-400 mt-2">Pricing is estimated — we&apos;ll confirm any unusual sizes before production.</p>
      </div>

      <div className="border-t border-gray-100 mb-6" />

      {/* ── Embossing Layers ── */}
      <div className="mb-6">
        <p className={sectionLabel}>Additional embossing layers</p>
        <p className="text-xs text-gray-500 mb-3">1 UV layer included. More layers = deeper raised texture.</p>
        <div className="space-y-2">
          {EMBOSSING_LAYER_OPTIONS.map(l => (
            <label key={l} className={radioRow(layers === l)} onClick={() => setLayers(l)}>
              <div className="flex items-center gap-3">
                <div className={radioCircle(layers === l)} />
                <div>
                  <p className={`text-sm font-medium leading-tight ${layers === l ? 'text-gray-900' : 'text-gray-700'}`}>
                    {EMBOSSING_LAYER_LABELS[l]}
                    {l === 0 && (
                      <span className="ml-2 text-xs font-semibold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">Included</span>
                    )}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{layerDescriptions[l]}</p>
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
      {validSize && (
        <>
          <div className="border-t border-gray-200 pt-5 mb-4 flex items-end justify-between">
            <p className="text-4xl font-bold text-gray-900 leading-none">{price.totalFormatted}</p>
            <p className="text-sm text-gray-500 pb-1">{price.unitFormatted} / sticker</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleOrder} size="lg" className="flex-1 !bg-lp-green hover:!bg-lp-green-dark text-white text-base font-semibold py-4 rounded-xl">
              Add to cart
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
