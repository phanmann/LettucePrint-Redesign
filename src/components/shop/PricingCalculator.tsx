'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Clock, Package, ChevronDown, Ruler } from 'lucide-react'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import {
  calculatePrice,
  getQuantityBreaks,
  QUANTITY_TIERS,
  SIZE_LABELS,
  MATERIAL_LABELS,
  MATERIAL_DESCRIPTIONS,
  FINISH_LABELS,
  RUSH_LABELS,
  type StickerSize,
  type StickerMaterial,
  type StickerFinish,
  type RushOption,
} from '@/lib/pricing'

const PRESET_SIZES: StickerSize[] = ['1x1', '2x2', '3x3', '4x4', '5x5']
const MATERIALS: StickerMaterial[] = ['standard', 'holographic']
const FINISHES: StickerFinish[] = ['matte', 'gloss', 'laminate']
const RUSH_OPTIONS: RushOption[] = ['standard', '48hr', '24hr']

// Size multiplier for custom sizes (area-based relative to 2x2)
function getCustomSizeMultiplier(w: number, h: number): number {
  const sqIn = w * h
  // Interpolate using same curve as presets: roughly 0.125 * sqIn^0.85
  return Math.max(0.3, Math.round(0.125 * Math.pow(sqIn, 0.85) * 100) / 100)
}

interface PricingCalculatorProps {
  productName: string
}

export default function PricingCalculator({ productName }: PricingCalculatorProps) {
  const [selectedPreset, setSelectedPreset] = useState<StickerSize | 'custom'>('2x2')
  const [customWidth, setCustomWidth] = useState('')
  const [customHeight, setCustomHeight] = useState('')
  const [quantity, setQuantity] = useState<number>(100)
  const [customQty, setCustomQty] = useState('')
  const [showCustomQty, setShowCustomQty] = useState(false)
  const [material, setMaterial] = useState<StickerMaterial>('standard')
  const [finish, setFinish] = useState<StickerFinish>('matte')
  const [rush, setRush] = useState<RushOption>('standard')
  const [showBreaks, setShowBreaks] = useState(false)
  const router = useRouter()

  const isCustomSize = selectedPreset === 'custom'
  const customW = parseFloat(customWidth) || 0
  const customH = parseFloat(customHeight) || 0
  const validCustomSize = isCustomSize ? (customW > 0 && customH > 0) : true
  const sizeLabel = isCustomSize
    ? (validCustomSize ? `${customW}" × ${customH}"` : 'Custom')
    : SIZE_LABELS[selectedPreset]

  // For the pricing engine we map custom size to nearest standard tier or override
  // We pass selectedPreset as '2x2' and apply a post-multiplier for custom
  const priceSize: StickerSize = isCustomSize ? '2x2' : selectedPreset
  const customMultiplier = isCustomSize && validCustomSize
    ? getCustomSizeMultiplier(customW, customH)
    : 1

  const price = useMemo(() => {
    const base = calculatePrice(priceSize, quantity, material, finish, rush)
    if (!isCustomSize || !validCustomSize) return base
    // Apply custom size multiplier
    const totalCents = Math.round(base.totalCents * customMultiplier)
    const unitCents = Math.round(totalCents / quantity)
    const fmt = (c: number) =>
      new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(c / 100)
    return { ...base, totalCents, unitCents, totalFormatted: fmt(totalCents), unitFormatted: fmt(unitCents) }
  }, [priceSize, quantity, material, finish, rush, isCustomSize, validCustomSize, customMultiplier])

  const quantityBreaks = useMemo(() => {
    const breaks = getQuantityBreaks(priceSize, material, finish)
    if (!isCustomSize || !validCustomSize) return breaks
    return breaks.map(row => {
      const base = calculatePrice(priceSize, row.qty, material, finish, 'standard')
      const totalCents = Math.round(base.totalCents * customMultiplier)
      const unitCents = Math.round(totalCents / row.qty)
      const fmt = (c: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(c / 100)
      const maxBase = calculatePrice(priceSize, 50, material, finish, 'standard')
      const maxTotal = Math.round(maxBase.totalCents * customMultiplier)
      const savings = Math.max(0, Math.round(((maxTotal - totalCents) / maxTotal) * 100))
      return { qty: row.qty, total: fmt(totalCents), unit: fmt(unitCents), savingsPct: savings }
    })
  }, [priceSize, material, finish, isCustomSize, validCustomSize, customMultiplier])

  const handleAddToCart = () => {
    if (isCustomSize && !validCustomSize) return
    const params = new URLSearchParams({
      size: isCustomSize ? `${customW}" × ${customH}"` : selectedPreset,
      qty: String(quantity),
      material,
      finish,
      rush,
      product: productName,
    })
    router.push(`/shop/stickers/checkout?${params.toString()}`)
  }

  const canOrder = validCustomSize

  return (
    <div className="bg-gray-50 rounded-modal border border-gray-100 p-5 sm:p-8 lg:sticky lg:top-24">
      <h2 className="text-h3 font-semibold text-gray-900 mb-2">Configure & Price</h2>
      <p className="text-small text-gray-500 mb-8">Price updates instantly as you select options.</p>

      {/* Size */}
      <div className="mb-6">
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
          Size
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-2">
          {PRESET_SIZES.map((s) => (
            <button
              key={s}
              onClick={() => setSelectedPreset(s)}
              className={`py-2.5 rounded-input text-xs font-semibold border transition-all duration-150 ${
                selectedPreset === s
                  ? 'bg-lp-green text-white border-lp-green'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-lp-green hover:text-lp-green'
              }`}
            >
              {SIZE_LABELS[s]}
            </button>
          ))}
          <button
            onClick={() => setSelectedPreset('custom')}
            className={`col-span-3 sm:col-span-5 flex items-center justify-center gap-2 py-2.5 rounded-input text-xs font-semibold border transition-all duration-150 ${
              selectedPreset === 'custom'
                ? 'bg-lp-green text-white border-lp-green'
                : 'bg-white text-gray-700 border-gray-200 hover:border-lp-green hover:text-lp-green'
            }`}
          >
            <Ruler size={13} />
            Custom Size
          </button>
        </div>

        <AnimatePresence>
          {isCustomSize && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Width (inches)</label>
                  <input
                    type="number"
                    min="0.5"
                    max="12"
                    step="0.25"
                    value={customWidth}
                    onChange={e => setCustomWidth(e.target.value)}
                    placeholder="e.g. 3.5"
                    className="w-full px-3 py-2.5 rounded-input border border-gray-200 text-small focus:outline-none focus:border-lp-green bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Height (inches)</label>
                  <input
                    type="number"
                    min="0.5"
                    max="12"
                    step="0.25"
                    value={customHeight}
                    onChange={e => setCustomHeight(e.target.value)}
                    placeholder="e.g. 2.5"
                    className="w-full px-3 py-2.5 rounded-input border border-gray-200 text-small focus:outline-none focus:border-lp-green bg-white"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-1.5">Max 12" × 12" · Pricing is estimated — we&apos;ll confirm unusual sizes.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Quantity */}
      <div className="mb-6">
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
          Quantity
        </label>
        <div className="grid grid-cols-3 gap-2 mb-2">
          {QUANTITY_TIERS.map((q) => (
            <button
              key={q}
              onClick={() => { setQuantity(q); setShowCustomQty(false) }}
              className={`py-2.5 rounded-input text-xs font-semibold border transition-all duration-150 ${
                quantity === q && !showCustomQty
                  ? 'bg-lp-green text-white border-lp-green'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-lp-green hover:text-lp-green'
              }`}
            >
              {q.toLocaleString()}
            </button>
          ))}
          <button
            onClick={() => setShowCustomQty(true)}
            className={`col-span-3 py-2.5 rounded-input text-xs font-semibold border transition-all duration-150 ${
              showCustomQty
                ? 'bg-lp-green text-white border-lp-green'
                : 'bg-white text-gray-700 border-gray-200 hover:border-lp-green hover:text-lp-green'
            }`}
          >
            Custom quantity
          </button>
        </div>
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
                type="number"
                min="50"
                step="50"
                value={customQty}
                onChange={e => {
                  setCustomQty(e.target.value)
                  const n = parseInt(e.target.value)
                  if (n >= 50) setQuantity(n)
                }}
                placeholder="Enter quantity (min 50)"
                className="w-full px-3 py-2.5 rounded-input border border-gray-200 text-small focus:outline-none focus:border-lp-green bg-white mt-2"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Material */}
      <div className="mb-6">
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
          Material
        </label>
        <div className="space-y-2">
          {MATERIALS.map((m) => (
            <button
              key={m}
              onClick={() => setMaterial(m)}
              className={`w-full flex items-start gap-3 p-3 rounded-input border text-left transition-all duration-150 ${
                material === m
                  ? 'bg-lp-green/5 border-lp-green'
                  : 'bg-white border-gray-200 hover:border-lp-green/50'
              }`}
            >
              <div className={`w-4 h-4 rounded-full border-2 mt-0.5 flex-shrink-0 transition-colors ${
                material === m ? 'border-lp-green bg-lp-green' : 'border-gray-300'
              }`} />
              <div>
                <p className={`text-small font-semibold ${material === m ? 'text-lp-green' : 'text-gray-900'}`}>
                  {MATERIAL_LABELS[m]}
                  {m === 'holographic' && <span className="ml-2"><Badge variant="popular">Premium</Badge></span>}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{MATERIAL_DESCRIPTIONS[m]}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Finish */}
      <div className="mb-6">
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
          Finish
        </label>
        <div className="grid grid-cols-3 gap-2">
          {FINISHES.map((f) => (
            <button
              key={f}
              onClick={() => setFinish(f)}
              className={`py-2.5 rounded-input text-xs font-semibold border transition-all duration-150 ${
                finish === f
                  ? 'bg-lp-green text-white border-lp-green'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-lp-green hover:text-lp-green'
              }`}
            >
              {f === 'laminate' ? 'Laminate' : FINISH_LABELS[f]}
            </button>
          ))}
        </div>
      </div>

      {/* Rush */}
      <div className="mb-8">
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
          Production Speed
        </label>
        <div className="space-y-2">
          {RUSH_OPTIONS.map((r) => (
            <button
              key={r}
              onClick={() => setRush(r)}
              className={`w-full flex items-center gap-3 p-3 rounded-input border text-left transition-all duration-150 ${
                rush === r
                  ? 'bg-lp-green/5 border-lp-green'
                  : 'bg-white border-gray-200 hover:border-lp-green/50'
              }`}
            >
              <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-colors ${
                rush === r ? 'border-lp-green bg-lp-green' : 'border-gray-300'
              }`} />
              <div className="flex items-center gap-2 flex-1">
                {r === '48hr' && <Zap size={13} className="text-lp-yellow flex-shrink-0" />}
                {r === '24hr' && <Zap size={13} className="text-red-500 flex-shrink-0" />}
                {r === 'standard' && <Clock size={13} className="text-gray-400 flex-shrink-0" />}
                <span className={`text-small font-semibold ${rush === r ? 'text-lp-green' : 'text-gray-700'}`}>
                  {RUSH_LABELS[r]}
                </span>
                {r === '48hr' && <Badge variant="rush" className="ml-auto">Rush</Badge>}
                {r === '24hr' && <Badge variant="rush" className="ml-auto">Urgent</Badge>}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Price Output */}
      {canOrder ? (
        <>
          <motion.div
            key={`${price.totalCents}`}
            initial={{ scale: 0.98, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-lp-green rounded-card p-6 mb-4"
          >
            <div className="mb-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/70 mb-1">Per Unit</p>
              <p className="text-display font-semibold text-white leading-none">{price.unitFormatted}</p>
            </div>
            <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-between">
              <p className="text-xs text-white/60">Total</p>
              <p className="text-h3 font-semibold text-white/90">{price.totalFormatted}</p>
            </div>
            {rush !== 'standard' && (
              <p className="text-xs text-white/60 mt-3 pt-3 border-t border-white/20">
                Includes rush fee of {rush === '48hr' ? '$200' : '$300'}
              </p>
            )}
          </motion.div>

          {/* Quantity breaks toggle */}
          <button
            onClick={() => setShowBreaks(!showBreaks)}
            className="w-full flex items-center justify-between text-small text-lp-green font-semibold mb-4 py-2 hover:text-lp-green-dark transition-colors"
          >
            <span className="flex items-center gap-2">
              <Package size={14} />
              View quantity price breaks
            </span>
            <ChevronDown size={14} className={`transition-transform ${showBreaks ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {showBreaks && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden mb-6"
              >
                <div className="bg-white rounded-card border border-gray-100 overflow-x-auto">
                  <table className="w-full text-small min-w-[320px]">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-gray-500">Qty</th>
                        <th className="text-right px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-gray-500">Total</th>
                        <th className="text-right px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-gray-500">Per Unit</th>
                        <th className="text-right px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-gray-500">Save</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quantityBreaks.map((row) => (
                        <tr
                          key={row.qty}
                          onClick={() => { setQuantity(row.qty); setShowCustomQty(false) }}
                          className={`border-b border-gray-50 cursor-pointer transition-colors ${
                            quantity === row.qty ? 'bg-lp-green/5' : 'hover:bg-gray-50'
                          }`}
                        >
                          <td className={`px-4 py-2.5 font-semibold ${quantity === row.qty ? 'text-lp-green' : 'text-gray-900'}`}>
                            {row.qty.toLocaleString()}
                          </td>
                          <td className="px-4 py-2.5 text-right text-gray-700">{row.total}</td>
                          <td className="px-4 py-2.5 text-right text-gray-700">{row.unit}</td>
                          <td className="px-4 py-2.5 text-right">
                            {row.savingsPct > 0 ? (
                              <span className="text-lp-green font-semibold">{row.savingsPct}%</span>
                            ) : (
                              <span className="text-gray-400">—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <Button onClick={handleAddToCart} size="lg" className="w-full">
            {`Order ${quantity.toLocaleString()} Stickers — ${price.totalFormatted}`}
          </Button>
        </>
      ) : (
        <div className="bg-gray-100 rounded-card p-6 text-center text-small text-gray-400 mb-4">
          Enter dimensions above to see pricing
        </div>
      )}

      <p className="text-xs text-gray-400 text-center mt-3">
        + shipping calculated at checkout · Upload artwork · Approve proof
      </p>
    </div>
  )
}
