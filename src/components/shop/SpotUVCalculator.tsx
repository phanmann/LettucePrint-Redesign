'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Clock, Package, ChevronDown } from 'lucide-react'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import {
  calculatePrice,
  getQuantityBreaks,
  QUANTITY_TIERS,
  SIZE_LABELS,
  FINISH_LABELS,
  RUSH_LABELS,
  type StickerSize,
  type StickerFinish,
  type RushOption,
} from '@/lib/pricing'

const SIZES: StickerSize[] = ['1x1', '2x2', '3x3', '4x4', '5x5']
const FINISHES: StickerFinish[] = ['matte', 'gloss', 'laminate']
const RUSH_OPTIONS: RushOption[] = ['standard', '48hr', '24hr']

interface SpotUVCalculatorProps {
  productName: string
}

export default function SpotUVCalculator({ productName }: SpotUVCalculatorProps) {
  const [size, setSize] = useState<StickerSize>('2x2')
  const [quantity, setQuantity] = useState<number>(100)
  const [finish, setFinish] = useState<StickerFinish>('matte')
  const [rush, setRush] = useState<RushOption>('standard')
  const [showBreaks, setShowBreaks] = useState(false)
  const router = useRouter()

  // Always locked to spot-uv material
  const price = useMemo(
    () => calculatePrice(size, quantity, 'spot-uv', finish, rush),
    [size, quantity, finish, rush]
  )

  const quantityBreaks = useMemo(
    () => getQuantityBreaks(size, 'spot-uv', finish),
    [size, finish]
  )

  const handleOrder = () => {
    const params = new URLSearchParams({
      size,
      qty: String(quantity),
      material: 'spot-uv',
      finish,
      rush,
      product: productName,
    })
    router.push(`/shop/spot-uv/checkout?${params.toString()}`)
  }

  return (
    <div className="bg-gray-50 rounded-modal border border-gray-100 p-5 sm:p-8 lg:sticky lg:top-24">
      <div className="flex items-center gap-2 mb-1">
        <h2 className="text-h3 font-semibold text-gray-900">Configure & Price</h2>
        <Badge variant="popular">Premium</Badge>
      </div>
      <p className="text-small text-gray-900/50 mb-8">Price updates instantly as you select options.</p>

      {/* Size */}
      <div className="mb-6">
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-900/40 mb-3">Size</label>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {SIZES.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`py-2.5 rounded-input text-xs font-semibold border transition-all duration-150 ${
                size === s
                  ? 'bg-lp-green text-gray-900 border-lp-green'
                  : 'bg-white/5 text-gray-900/70 border-white/10 hover:border-lp-green hover:text-gray-900'
              }`}
            >
              {SIZE_LABELS[s]}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div className="mb-6">
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-900/40 mb-3">Quantity</label>
        <div className="grid grid-cols-3 gap-2">
          {QUANTITY_TIERS.map((q) => (
            <button
              key={q}
              onClick={() => setQuantity(q)}
              className={`py-2.5 rounded-input text-xs font-semibold border transition-all duration-150 ${
                quantity === q
                  ? 'bg-lp-green text-gray-900 border-lp-green'
                  : 'bg-white/5 text-gray-900/70 border-white/10 hover:border-lp-green hover:text-gray-900'
              }`}
            >
              {q.toLocaleString()}
            </button>
          ))}
        </div>
      </div>

      {/* Finish */}
      <div className="mb-6">
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-900/40 mb-3">Base Finish</label>
        <div className="grid grid-cols-3 gap-2">
          {FINISHES.map((f) => (
            <button
              key={f}
              onClick={() => setFinish(f)}
              className={`py-2.5 rounded-input text-xs font-semibold border transition-all duration-150 ${
                finish === f
                  ? 'bg-lp-green text-gray-900 border-lp-green'
                  : 'bg-white/5 text-gray-900/70 border-white/10 hover:border-lp-green hover:text-gray-900'
              }`}
            >
              {f === 'laminate' ? 'Laminate' : FINISH_LABELS[f]}
            </button>
          ))}
        </div>
      </div>

      {/* Rush */}
      <div className="mb-8">
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-900/40 mb-3">Production Speed</label>
        <div className="space-y-2">
          {RUSH_OPTIONS.map((r) => (
            <button
              key={r}
              onClick={() => setRush(r)}
              className={`w-full flex items-center gap-3 p-3 rounded-input border text-left transition-all duration-150 ${
                rush === r
                  ? 'bg-lp-green/10 border-lp-green'
                  : 'bg-white/5 border-white/10 hover:border-lp-green/50'
              }`}
            >
              <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-colors ${
                rush === r ? 'border-lp-green bg-lp-green' : 'border-white/30'
              }`} />
              <div className="flex items-center gap-2 flex-1">
                {r === '48hr' && <Zap size={13} className="text-lp-yellow flex-shrink-0" />}
                {r === '24hr' && <Zap size={13} className="text-red-400 flex-shrink-0" />}
                {r === 'standard' && <Clock size={13} className="text-gray-900/30 flex-shrink-0" />}
                <span className={`text-small font-semibold ${rush === r ? 'text-lp-green' : 'text-gray-900/70'}`}>
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
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-900/70 mb-1">Total Price</p>
            <p className="text-display font-semibold text-gray-900 leading-none">{price.totalFormatted}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-900/70 mb-1">Per unit</p>
            <p className="text-h3 font-semibold text-gray-900/90">{price.unitFormatted}</p>
          </div>
        </div>
        {rush !== 'standard' && (
          <p className="text-xs text-gray-900/60 mt-3 pt-3 border-t border-white/20">
            Includes rush fee of {rush === '48hr' ? '$200' : '$300'}
          </p>
        )}
      </motion.div>

      {/* Quantity breaks */}
      <button
        onClick={() => setShowBreaks(!showBreaks)}
        className="w-full flex items-center justify-between text-small text-lp-green font-semibold mb-4 py-2 hover:text-gray-900 transition-colors"
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
            <div className="bg-white/5 rounded-card border border-white/10 overflow-x-auto">
              <table className="w-full text-small min-w-[320px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-gray-900/40">Qty</th>
                    <th className="text-right px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-gray-900/40">Total</th>
                    <th className="text-right px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-gray-900/40">Per Unit</th>
                    <th className="text-right px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-gray-900/40">Save</th>
                  </tr>
                </thead>
                <tbody>
                  {quantityBreaks.map((row) => (
                    <tr
                      key={row.qty}
                      onClick={() => setQuantity(row.qty)}
                      className={`border-b border-white/5 cursor-pointer transition-colors ${
                        quantity === row.qty ? 'bg-lp-green/10' : 'hover:bg-white/5'
                      }`}
                    >
                      <td className={`px-4 py-2.5 font-semibold ${quantity === row.qty ? 'text-lp-green' : 'text-gray-900/80'}`}>
                        {row.qty.toLocaleString()}
                      </td>
                      <td className="px-4 py-2.5 text-right text-gray-900/60">{row.total}</td>
                      <td className="px-4 py-2.5 text-right text-gray-900/60">{row.unit}</td>
                      <td className="px-4 py-2.5 text-right">
                        {row.savingsPct > 0 ? (
                          <span className="text-lp-green font-semibold">{row.savingsPct}%</span>
                        ) : (
                          <span className="text-gray-900/30">—</span>
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

      <Button onClick={handleOrder} size="lg" className="w-full">
        {`Order ${quantity.toLocaleString()} Stickers — ${price.totalFormatted}`}
      </Button>

      <p className="text-xs text-gray-900/30 text-center mt-3">
        + shipping calculated at checkout · Upload artwork · Approve proof
      </p>
    </div>
  )
}
