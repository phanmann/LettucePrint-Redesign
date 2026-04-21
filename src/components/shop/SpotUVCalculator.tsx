'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/Button'
import QuantityDropdown from '@/components/shop/QuantityDropdown'
import {
  calculateSpotUVPrice,
  QUANTITY_TIERS,
  SIZE_LABELS,
  EMBOSSING_LAYER_OPTIONS,
  EMBOSSING_LAYER_LABELS,
  formatCents,
  type StickerSize,
  type RushOption,
  type EmbossingLayers,
} from '@/lib/pricing'

const PRESET_SIZES: StickerSize[] = ['1x1', '2x2', '3x3', '4x4', '5x5']

function customMultiplier(w: number, h: number): number {
  const sqIn = w * h
  return Math.max(0.3, Math.round(0.125 * Math.pow(sqIn, 0.85) * 100) / 100)
}

interface Props { productName: string }

export default function SpotUVCalculator({ productName }: Props) {
  const [selectedPreset, setSelectedPreset] = useState<StickerSize | 'custom'>('2x2')
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
  const mult = isCustomSize && validSize ? customMultiplier(cw, ch) : 1
  const rush: RushOption = 'standard'

  const fmt = (cents: number) => formatCents(cents)

  const price = useMemo(() => {
    const base = calculateSpotUVPrice(priceSize, quantity, layers, rush)
    if (!isCustomSize || !validSize) return base
    const total = Math.round(base.totalCents * mult)
    const unit = Math.round(total / quantity)
    return { ...base, totalCents: total, unitCents: unit, totalFormatted: fmt(total), unitFormatted: fmt(unit) }
  }, [priceSize, quantity, layers, isCustomSize, validSize, mult])

  const qtyRows = useMemo(() => {
    const baseAt50 = calculateSpotUVPrice(priceSize, 50, layers, rush)
    const unitAt50 = isCustomSize && validSize
      ? Math.round(baseAt50.totalCents * mult) / 50
      : baseAt50.unitCents

    return QUANTITY_TIERS.map(qty => {
      const base = calculateSpotUVPrice(priceSize, qty, layers, rush)
      const total = isCustomSize && validSize ? Math.round(base.totalCents * mult) : base.totalCents
      const unitCost = total / qty
      const save = unitAt50 > unitCost
        ? Math.round(((unitAt50 - unitCost) / unitAt50) * 100)
        : 0
      return { qty, total, totalFmt: fmt(total), save }
    })
  }, [priceSize, layers, isCustomSize, validSize, mult])

  const handleOrder = () => {
    if (!validSize) return
    const params = new URLSearchParams({
      size: isCustomSize ? `${cw}" × ${ch}"` : selectedPreset,
      qty: String(quantity),
      material: 'spot-uv',
      layers: String(layers),
      rush,
      product: productName,
    })
    router.push(`/shop/spot-uv/checkout?${params.toString()}`)
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
