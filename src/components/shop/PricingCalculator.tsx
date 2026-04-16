'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Clock, Package, ChevronDown } from 'lucide-react'
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

const SIZES: StickerSize[] = ['1x1', '2x2', '3x3', '4x4', '5x5']
const MATERIALS: StickerMaterial[] = ['standard', 'holographic', 'spot-uv']
const FINISHES: StickerFinish[] = ['matte', 'gloss', 'laminate']
const RUSH_OPTIONS: RushOption[] = ['standard', '48hr', '24hr']

interface PricingCalculatorProps {
  productName: string
}

export default function PricingCalculator({ productName }: PricingCalculatorProps) {
  const [size, setSize] = useState<StickerSize>('2x2')
  const [quantity, setQuantity] = useState<number>(100)
  const [material, setMaterial] = useState<StickerMaterial>('standard')
  const [finish, setFinish] = useState<StickerFinish>('matte')
  const [rush, setRush] = useState<RushOption>('standard')
  const [showBreaks, setShowBreaks] = useState(false)
  const [loading, setLoading] = useState(false)

  const price = useMemo(
    () => calculatePrice(size, quantity, material, finish, rush),
    [size, quantity, material, finish, rush]
  )

  const quantityBreaks = useMemo(
    () => getQuantityBreaks(size, material, finish),
    [size, material, finish]
  )

  const handleAddToCart = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ size, quantity, material, finish, rush, productName }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch (e) {
      console.error(e)
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-50 rounded-modal border border-gray-100 p-5 sm:p-8 lg:sticky lg:top-24">
      <h2 className="text-h3 font-semibold text-gray-900 mb-2">Configure & Price</h2>
      <p className="text-small text-gray-500 mb-8">Price updates instantly as you select options.</p>

      {/* Size */}
      <div className="mb-6">
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
          Size
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {SIZES.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`py-2.5 rounded-input text-xs font-semibold border transition-all duration-150 ${
                size === s
                  ? 'bg-lp-green text-white border-lp-green'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-lp-green hover:text-lp-green'
              }`}
            >
              {SIZE_LABELS[s]}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div className="mb-6">
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
          Quantity
        </label>
        <div className="grid grid-cols-3 gap-2">
          {QUANTITY_TIERS.map((q) => (
            <button
              key={q}
              onClick={() => setQuantity(q)}
              className={`py-2.5 rounded-input text-xs font-semibold border transition-all duration-150 ${
                quantity === q
                  ? 'bg-lp-green text-white border-lp-green'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-lp-green hover:text-lp-green'
              }`}
            >
              {q.toLocaleString()}
            </button>
          ))}
        </div>
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
                  {m === 'spot-uv' && <span className="ml-2"><Badge variant="new">Popular</Badge></span>}
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
            <p className="text-xs text-white/70 mb-1">Per unit</p>
            <p className="text-h3 font-semibold text-white/90">{price.unitFormatted}</p>
          </div>
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
                      onClick={() => setQuantity(row.qty)}
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

      {/* CTA */}
      <Button
        onClick={handleAddToCart}
        disabled={loading}
        size="lg"
        className="w-full"
      >
        {loading ? 'Redirecting...' : `Order ${quantity.toLocaleString()} Stickers — ${price.totalFormatted}`}
      </Button>

      <p className="text-xs text-gray-400 text-center mt-3">
        Artwork upload after checkout · Proof before production
      </p>
    </div>
  )
}
