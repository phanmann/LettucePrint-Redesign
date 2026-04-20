'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/Button'
import {
  calculatePrice,
  QUANTITY_TIERS,
  SIZE_LABELS,
  MATERIAL_LABELS,
  MATERIAL_DESCRIPTIONS,
  FINISH_LABELS,
  formatCents,
  type StickerSize,
  type StickerMaterial,
  type StickerFinish,
} from '@/lib/pricing'

const PRESET_SIZES: StickerSize[] = ['1x1', '2x2', '3x3', '4x4', '5x5']
const MATERIALS: StickerMaterial[] = ['standard', 'holographic']
const FINISHES: StickerFinish[] = ['matte', 'gloss', 'laminate']

// Area-based multiplier for custom sizes
function customMultiplier(w: number, h: number): number {
  const sqIn = w * h
  return Math.max(0.3, Math.round(0.125 * Math.pow(sqIn, 0.85) * 100) / 100)
}

interface Props { productName: string }

export default function PricingCalculator({ productName }: Props) {
  const [selectedPreset, setSelectedPreset] = useState<StickerSize | 'custom'>('2x2')
  const [customWidth, setCustomWidth] = useState('')
  const [customHeight, setCustomHeight] = useState('')
  const [material, setMaterial] = useState<StickerMaterial>('standard')
  const [finish, setFinish] = useState<StickerFinish>('matte')
  const [quantity, setQuantity] = useState<number>(100)
  const [customQty, setCustomQty] = useState('')
  const [showCustomQty, setShowCustomQty] = useState(false)
  const router = useRouter()

  const isCustomSize = selectedPreset === 'custom'
  const cw = parseFloat(customWidth) || 0
  const ch = parseFloat(customHeight) || 0
  const validSize = isCustomSize ? (cw > 0 && ch > 0) : true
  const priceSize: StickerSize = isCustomSize ? '2x2' : selectedPreset
  const mult = isCustomSize && validSize ? customMultiplier(cw, ch) : 1

  const fmt = (cents: number) => formatCents(cents)

  // Compute price for current selection
  const price = useMemo(() => {
    const base = calculatePrice(priceSize, quantity, material, finish, 'standard')
    if (!isCustomSize || !validSize) return base
    const total = Math.round(base.totalCents * mult)
    const unit = Math.round(total / quantity)
    return { ...base, totalCents: total, unitCents: unit, totalFormatted: fmt(total), unitFormatted: fmt(unit) }
  }, [priceSize, quantity, material, finish, isCustomSize, validSize, mult])

  // Quantity rows with per-tier pricing
  const qtyRows = useMemo(() => {
    return QUANTITY_TIERS.map(qty => {
      const base = calculatePrice(priceSize, qty, material, finish, 'standard')
      const total = isCustomSize && validSize ? Math.round(base.totalCents * mult) : base.totalCents
      const baseAt50 = calculatePrice(priceSize, 50, material, finish, 'standard')
      const maxTotal = isCustomSize && validSize ? Math.round(baseAt50.totalCents * mult) : baseAt50.totalCents
      const save = Math.max(0, Math.round(((maxTotal - total) / maxTotal) * 100))
      return { qty, total, totalFmt: fmt(total), save }
    })
  }, [priceSize, material, finish, isCustomSize, validSize, mult])

  const handleOrder = () => {
    if (!validSize) return
    const params = new URLSearchParams({
      size: isCustomSize ? `${cw}" × ${ch}"` : selectedPreset,
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
        <p className={sectionLabel}>Select a size</p>
        <div className="flex flex-wrap gap-2 mb-2">
          {PRESET_SIZES.map(s => (
            <button
              key={s}
              onClick={() => setSelectedPreset(s)}
              className={`px-4 py-2.5 rounded-full text-sm font-semibold border transition-all duration-150 ${
                selectedPreset === s
                  ? 'bg-lp-green text-white border-lp-green'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
              }`}
            >
              {SIZE_LABELS[s]}
            </button>
          ))}
          <button
            onClick={() => setSelectedPreset('custom')}
            className={`px-4 py-2.5 rounded-full text-sm font-semibold border transition-all duration-150 ${
              selectedPreset === 'custom'
                ? 'bg-lp-green text-white border-lp-green'
                : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
            }`}
          >
            Custom
          </button>
        </div>
        <AnimatePresence>
          {isCustomSize && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.18 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Width (in)</label>
                  <input
                    type="number" min="0.5" max="12" step="0.25"
                    value={customWidth} onChange={e => setCustomWidth(e.target.value)}
                    placeholder="e.g. 3.5"
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-lp-green"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Height (in)</label>
                  <input
                    type="number" min="0.5" max="12" step="0.25"
                    value={customHeight} onChange={e => setCustomHeight(e.target.value)}
                    placeholder="e.g. 2.5"
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-lp-green"
                  />
                </div>
                <p className="col-span-2 text-xs text-gray-400">Pricing estimated — we'll confirm unusual sizes.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
        <div className="flex flex-wrap gap-2">
          {FINISHES.map(f => (
            <button
              key={f}
              onClick={() => setFinish(f)}
              className={`px-4 py-2.5 rounded-full text-sm font-semibold border transition-all duration-150 ${
                finish === f
                  ? 'bg-lp-green text-white border-lp-green'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
              }`}
            >
              {FINISH_LABELS[f]}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-100 mb-6" />

      {/* ── Quantity ── */}
      <div className="mb-6">
        <p className={sectionLabel}>Select a quantity</p>
        {validSize ? (
          <div className="space-y-2">
            <select
              value={showCustomQty ? 'custom' : String(quantity)}
              onChange={e => {
                if (e.target.value === 'custom') {
                  setShowCustomQty(true)
                } else {
                  setShowCustomQty(false)
                  setQuantity(parseInt(e.target.value))
                }
              }}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-900 focus:outline-none focus:border-lp-green focus:ring-2 focus:ring-lp-green/20 transition-all cursor-pointer"
            >
              {qtyRows.map(row => (
                <option key={row.qty} value={String(row.qty)}>
                  {row.qty.toLocaleString()} — {row.totalFmt}{row.save > 0 ? ` (Save ${row.save}%)` : ''}
                </option>
              ))}
              <option value="custom">Custom quantity…</option>
            </select>
            <AnimatePresence>
              {showCustomQty && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.15 }}
                  className="overflow-hidden"
                >
                  <input
                    type="number" min="50" step="50"
                    value={customQty}
                    onChange={e => {
                      setCustomQty(e.target.value)
                      const n = parseInt(e.target.value)
                      if (n >= 50) setQuantity(n)
                    }}
                    placeholder="Enter quantity (min 50)"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-lp-green focus:ring-2 focus:ring-lp-green/20"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <p className="text-sm text-gray-400 py-4 text-center">Enter dimensions above to see pricing</p>
        )}
      </div>

      {/* ── Price Footer + CTA ── */}
      {validSize && (
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
