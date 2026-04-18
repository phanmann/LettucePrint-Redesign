'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Package, Ruler } from 'lucide-react'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import {
  calculateRollLabelPrice,
  getRollLabelQuantityBreaks,
  PRESET_SIZES,
  QUANTITY_TIERS,
  MATERIAL_LABELS,
  MATERIAL_DESCRIPTIONS,
  FINISH_LABELS,
  FINISH_DESCRIPTIONS,
  type LabelMaterial,
  type LabelFinish,
} from '@/lib/roll-label-pricing'

const MATERIALS: LabelMaterial[] = ['standard', 'bopp']
const FINISHES: LabelFinish[] = ['matte', 'gloss']

interface RollLabelCalculatorProps {
  productName: string
}

export default function RollLabelCalculator({ productName }: RollLabelCalculatorProps) {
  const [selectedPreset, setSelectedPreset] = useState('2x2')
  const [customWidth, setCustomWidth] = useState('')
  const [customHeight, setCustomHeight] = useState('')
  const [quantity, setQuantity] = useState(1000)
  const [customQty, setCustomQty] = useState('')
  const [showCustomQty, setShowCustomQty] = useState(false)
  const [material, setMaterial] = useState<LabelMaterial>('standard')
  const [finish, setFinish] = useState<LabelFinish>('matte')
  const [showBreaks, setShowBreaks] = useState(false)
  const router = useRouter()

  const preset = PRESET_SIZES.find(p => p.id === selectedPreset)!
  const isCustomSize = selectedPreset === 'custom'

  const width = isCustomSize ? parseFloat(customWidth) || 0 : preset.width
  const height = isCustomSize ? parseFloat(customHeight) || 0 : preset.height
  const validDimensions = width > 0 && height > 0

  const price = useMemo(() => {
    if (!validDimensions) return null
    return calculateRollLabelPrice(width, height, quantity, material, finish)
  }, [width, height, quantity, material, finish, validDimensions])

  const quantityBreaks = useMemo(() => {
    if (!validDimensions) return []
    return getRollLabelQuantityBreaks(width, height, material, finish)
  }, [width, height, material, finish, validDimensions])

  const handleAddToCart = () => {
    if (!price) return
    const params = new URLSearchParams({
      width: String(width),
      height: String(height),
      qty: String(quantity),
      material,
      finish,
      size: isCustomSize ? `${width}" × ${height}"` : preset.label,
      product: productName,
    })
    router.push(`/shop/roll-labels/checkout?${params.toString()}`)
  }

  return (
    <div className="bg-gray-50 rounded-modal border border-gray-100 p-8 sticky top-24">
      <h2 className="text-h3 font-semibold text-gray-900 mb-2">Configure & Price</h2>
      <p className="text-small text-gray-500 mb-8">Price updates instantly. Based on your exact dimensions.</p>

      {/* Size */}
      <div className="mb-6">
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
          Label Size
        </label>
        <div className="grid grid-cols-2 gap-2 mb-3">
          {PRESET_SIZES.filter(s => s.id !== 'custom').map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedPreset(s.id)}
              className={`py-2.5 px-3 rounded-input text-xs font-semibold border text-left transition-all duration-150 ${
                selectedPreset === s.id
                  ? 'bg-lp-green text-white border-lp-green'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-lp-green hover:text-lp-green'
              }`}
            >
              <span className="block font-bold">{s.label}</span>
              <span className={`block text-[10px] mt-0.5 ${selectedPreset === s.id ? 'text-white/70' : 'text-gray-400'}`}>
                {s.description}
              </span>
            </button>
          ))}
          <button
            onClick={() => setSelectedPreset('custom')}
            className={`py-2.5 px-3 rounded-input text-xs font-semibold border text-left transition-all duration-150 col-span-2 flex items-center gap-2 ${
              selectedPreset === 'custom'
                ? 'bg-lp-green text-white border-lp-green'
                : 'bg-white text-gray-700 border-gray-200 hover:border-lp-green hover:text-lp-green'
            }`}
          >
            <Ruler size={13} />
            Custom Size — Enter your dimensions
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
                    step="0.125"
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
                    step="0.125"
                    value={customHeight}
                    onChange={e => setCustomHeight(e.target.value)}
                    placeholder="e.g. 2.5"
                    className="w-full px-3 py-2.5 rounded-input border border-gray-200 text-small focus:outline-none focus:border-lp-green bg-white"
                  />
                </div>
              </div>
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
            className={`py-2.5 rounded-input text-xs font-semibold border transition-all duration-150 col-span-3 ${
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
                min="250"
                step="250"
                value={customQty}
                onChange={e => {
                  setCustomQty(e.target.value)
                  const n = parseInt(e.target.value)
                  if (n >= 250) setQuantity(n)
                }}
                placeholder="Enter quantity (min 250)"
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
                  {m === 'bopp' && <span className="ml-2"><Badge variant="popular">Premium</Badge></span>}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{MATERIAL_DESCRIPTIONS[m]}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Finish */}
      <div className="mb-8">
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
          Finish
        </label>
        <div className="space-y-2">
          {FINISHES.map((f) => (
            <button
              key={f}
              onClick={() => setFinish(f)}
              className={`w-full flex items-start gap-3 p-3 rounded-input border text-left transition-all duration-150 ${
                finish === f
                  ? 'bg-lp-green/5 border-lp-green'
                  : 'bg-white border-gray-200 hover:border-lp-green/50'
              }`}
            >
              <div className={`w-4 h-4 rounded-full border-2 mt-0.5 flex-shrink-0 transition-colors ${
                finish === f ? 'border-lp-green bg-lp-green' : 'border-gray-300'
              }`} />
              <div>
                <p className={`text-small font-semibold ${finish === f ? 'text-lp-green' : 'text-gray-900'}`}>
                  {FINISH_LABELS[f]}

                </p>
                <p className="text-xs text-gray-500 mt-0.5">{FINISH_DESCRIPTIONS[f]}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Price Output */}
      {validDimensions && price ? (
        <>
          <motion.div
            key={`${price.totalCents}`}
            initial={{ scale: 0.98, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-lp-green rounded-card p-6 mb-4"
          >
            <div className="flex items-end justify-between mb-1">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-white/70 mb-1">Total Price</p>
                <p className="text-display font-semibold text-white leading-none">{price.totalFormatted}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-white/70 mb-1">Per label</p>
                <p className="text-h3 font-semibold text-white/90">{price.unitFormatted}</p>
              </div>
            </div>
            {price.volumeDiscount > 0 && (
              <p className="text-xs text-white/70 mt-3 pt-3 border-t border-white/20">
                {Math.round(price.volumeDiscount * 100)}% volume discount applied — {price.volumeLabel}
              </p>
            )}
          </motion.div>

          {/* Quantity breaks */}
          <button
            onClick={() => setShowBreaks(!showBreaks)}
            className="w-full flex items-center justify-between text-small text-lp-green font-semibold mb-4 py-2 hover:text-lp-green-dark transition-colors"
          >
            <span className="flex items-center gap-2">
              <Package size={14} />
              View all quantity price breaks
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
                        <th className="text-right px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-gray-500">Per Label</th>
                        <th className="text-right px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-gray-500">Discount</th>
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
                            {row.discountPct > 0 ? (
                              <span className="text-lp-green font-semibold">{row.discountPct}%</span>
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

          <Button
            onClick={handleAddToCart}
            size="lg"
            className="w-full"
          >
            {`Order ${quantity.toLocaleString()} Labels — ${price.totalFormatted}`}
          </Button>
          <p className="text-xs text-gray-400 text-center mt-3">
            Artwork upload after checkout · Proof before production
          </p>
        </>
      ) : (
        <div className="bg-gray-100 rounded-card p-6 text-center text-small text-gray-400">
          Enter dimensions above to see pricing
        </div>
      )}
    </div>
  )
}
