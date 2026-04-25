'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import QuantityDropdown from '@/components/shop/QuantityDropdown'
import {
  QUANTITY_TIERS,
  MATERIAL_LABELS,
  MATERIAL_DESCRIPTIONS,
  FINISH_LABELS,
  FINISH_DESCRIPTIONS,
  FINISH_ADDON_PER_SQIN,
  MATERIAL_MULTIPLIERS,
  formatCents,
  type StickerMaterial,
  type StickerFinish,
} from '@/lib/pricing'

const MATERIALS: StickerMaterial[] = ['standard', 'holographic']
const FINISHES: StickerFinish[] = ['matte', 'gloss', 'laminate']

// Core formula constants (must match pricing.ts)
const COST_PER_SQ_IN_CENTS = 2.7
const MARKUP_MULTIPLIER    = 3.87

// Compute total sell price in cents for custom dimensions
function calcCustomPrice(
  sqIn: number,
  quantity: number,
  material: StickerMaterial,
  finish: StickerFinish
): { totalCents: number; unitCents: number; totalFormatted: string; unitFormatted: string } {
  const base = Math.round(sqIn * COST_PER_SQ_IN_CENTS * MARKUP_MULTIPLIER * quantity)
  const materialAdj = Math.round(base * MATERIAL_MULTIPLIERS[material])
  const finishAddon = FINISH_ADDON_PER_SQIN[finish] * sqIn * quantity
  const total = materialAdj + finishAddon
  const unit = Math.round(total / quantity)
  return {
    totalCents: total,
    unitCents: unit,
    totalFormatted: formatCents(total),
    unitFormatted: formatCents(unit),
  }
}

interface Props { productName: string }

export default function PricingCalculator({ productName }: Props) {
  const [customWidth, setCustomWidth] = useState('')
  const [customHeight, setCustomHeight] = useState('')
  const [material, setMaterial] = useState<StickerMaterial>('standard')
  const [finish, setFinish] = useState<StickerFinish>('matte')
  const [quantity, setQuantity] = useState<number>(100)
  const [customQty, setCustomQty] = useState('')
  const [showCustomQty, setShowCustomQty] = useState(false)
  const router = useRouter()

  const cw = parseFloat(customWidth) || 0
  const ch = parseFloat(customHeight) || 0
  const validSize = cw > 0 && ch > 0
  const sqIn = cw * ch

  // Compute price for current selection
  const price = useMemo(() => {
    if (!validSize) return null
    return calcCustomPrice(sqIn, quantity, material, finish)
  }, [sqIn, quantity, material, finish, validSize])

  // Quantity rows
  const qtyRows = useMemo(() => {
    if (!validSize) return []
    return QUANTITY_TIERS.map(qty => {
      const p = calcCustomPrice(sqIn, qty, material, finish)
      return { qty, total: p.totalCents, totalFmt: p.totalFormatted, save: 0 }
    })
  }, [sqIn, material, finish, validSize])

  const handleOrder = () => {
    if (!validSize) return
    const params = new URLSearchParams({
      size: `${cw}" × ${ch}"`,
      qty: String(quantity),
      material,
      finish,
      rush: 'standard',
      product: productName,
    })
    router.push(`/shop/stickers/checkout?${params.toString()}`)
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

  return (
    <div className="w-full max-w-[600px] bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 lg:sticky lg:top-24">

      {/* ── Size ── */}
      <div className="mb-6">
        <p className={sectionLabel}>Size (inches)</p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Width (W)</label>
            <input
              type="number" min="0.5" max="60" step="0.25"
              value={customWidth} onChange={e => setCustomWidth(e.target.value)}
              placeholder="e.g. 3.5"
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-lp-green"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Length (L)</label>
            <input
              type="number" min="0.5" max="60" step="0.25"
              value={customHeight} onChange={e => setCustomHeight(e.target.value)}
              placeholder="e.g. 2.5"
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-lp-green"
            />
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-2">Pricing is estimated — we'll confirm any unusual sizes before production.</p>
      </div>

      <div className="border-t border-gray-100 mb-6" />

      {/* ── Material ── */}
      <div className="mb-6">
        <p className={sectionLabel}>Select a material</p>
        <div className="space-y-2">
          {MATERIALS.map(m => (
            <label key={m} className={radioRow(material === m)} onClick={() => setMaterial(m)}>
              <div className="flex items-center gap-3">
                <div className={radioCircle(material === m)} />
                <div>
                  <p className={`text-sm font-medium leading-tight ${material === m ? 'text-gray-900' : 'text-gray-700'}`}>
                    {MATERIAL_LABELS[m]}
                    {m === 'holographic' && (
                      <span className="ml-2 text-xs font-semibold text-lp-green bg-lp-green/10 px-1.5 py-0.5 rounded-full">Premium</span>
                    )}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{MATERIAL_DESCRIPTIONS[m]}</p>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-100 mb-6" />

      {/* ── Finish ── */}
      <div className="mb-6">
        <p className={sectionLabel}>Select a finish</p>
        <div className="space-y-2">
          {FINISHES.map(f => (
            <label key={f} className={radioRow(finish === f)} onClick={() => setFinish(f)}>
              <div className="flex items-center gap-3">
                <div className={radioCircle(finish === f)} />
                <div>
                  <p className={`text-sm font-medium leading-tight ${finish === f ? 'text-gray-900' : 'text-gray-700'}`}>
                    {FINISH_LABELS[f]}
                    {f === 'laminate' && (
                      <span className="ml-2 text-xs font-semibold text-lp-green bg-lp-green/10 px-1.5 py-0.5 rounded-full">Add-on</span>
                    )}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{FINISH_DESCRIPTIONS[f]}</p>
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
            <div>
              <p className="text-4xl font-bold text-gray-900 leading-none">{price.totalFormatted}</p>
            </div>
            <p className="text-sm text-gray-500 pb-1">{price.unitFormatted} / sticker</p>
          </div>
          <Button onClick={handleOrder} size="lg" className="w-full !bg-lp-green hover:!bg-lp-green-dark text-white text-base font-semibold py-4 rounded-xl">
            Continue
          </Button>
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
