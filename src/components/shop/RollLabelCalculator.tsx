'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import Button from '@/components/ui/Button'
import QuantityDropdown from '@/components/shop/QuantityDropdown'
import RollLabelDirectionSelector from '@/components/shop/RollLabelDirectionSelector'
import type { RollLabelDirection } from '@/lib/roll-label-direction'
import {
  calculateRollLabelPrice,
  PRESET_SIZES,
  QUANTITY_TIERS,
  MATERIAL_LABELS,
  MATERIAL_DESCRIPTIONS,
  ROLL_LABEL_LIMITS,
  FINISH_LABELS,
  FINISH_DESCRIPTIONS,
  formatCents,
  type LabelMaterial,
  type LabelFinish,
} from '@/lib/roll-label-pricing'

const MATERIALS: LabelMaterial[] = ['standard', 'bopp']
const FINISHES: LabelFinish[] = ['matte', 'gloss']

interface Props {
  productName: string
  purchaseCtaStyle?: 'solid' | 'outline'
}

export default function RollLabelCalculator({ productName, purchaseCtaStyle = 'solid' }: Props) {
  const [selectedPreset] = useState('custom')
  const [customWidth, setCustomWidth] = useState('')
  const [customHeight, setCustomHeight] = useState('')
  const [material, setMaterial] = useState<LabelMaterial>('standard')
  const [finish, setFinish] = useState<LabelFinish>('matte')
  const [quantity, setQuantity] = useState<number>(1000)
  const [customQty, setCustomQty] = useState('')
  const [showCustomQty, setShowCustomQty] = useState(false)
  const [labelDirection, setLabelDirection] = useState<RollLabelDirection>({ applicationMethod: 'hand' })
  const router = useRouter()

  const isCustomSize = selectedPreset === 'custom'
  const cw = parseFloat(customWidth) || 0
  const ch = parseFloat(customHeight) || 0
  const preset = PRESET_SIZES.find(p => p.id === selectedPreset)
  const width = isCustomSize ? cw : (preset?.width ?? 0)
  const height = isCustomSize ? ch : (preset?.height ?? 0)
  const validSize = width >= ROLL_LABEL_LIMITS.minDimension && width <= ROLL_LABEL_LIMITS.maxDimension
    && height >= ROLL_LABEL_LIMITS.minDimension && height <= ROLL_LABEL_LIMITS.maxDimension
  const validQuantity = Number.isInteger(quantity)
    && quantity >= ROLL_LABEL_LIMITS.minQuantity
    && quantity <= ROLL_LABEL_LIMITS.maxQuantity

  const fmt = (cents: number) => formatCents(cents)

  const price = useMemo(() => {
    if (!validSize || !validQuantity) return null
    return calculateRollLabelPrice(width, height, quantity, material, finish)
  }, [width, height, quantity, material, finish, validSize, validQuantity])

  const qtyRows = useMemo(() => {
    if (!validSize) return []
    return QUANTITY_TIERS.map(qty => {
      const result = calculateRollLabelPrice(width, height, qty, material, finish)
      return {
        qty,
        totalFmt: fmt(result.totalCents),
        discountPct: Math.round(result.volumeDiscount * 100),
      }
    })
  }, [width, height, material, finish, validSize])

  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleOrder = () => {
    if (!price) return
    const sizeLabel = isCustomSize ? `${cw}" × ${ch}"` : (preset?.label ?? '')
    addItem({
      product: productName,
      size: sizeLabel,
      qty: quantity,
      material,
      finish,
      rush: 'standard',
      applicationMethod: labelDirection.applicationMethod,
      unwindEdge: labelDirection.unwindEdge,
      unwindFace: labelDirection.unwindFace,
      totalCents: price.totalCents,
      totalFormatted: price.totalFormatted,
      productPath: '/shop/roll-labels',
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

  return (
    <div className="w-full max-w-[600px] bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 lg:sticky lg:top-24">

      {/* ── Size ── */}
      <div className="mb-6">
        <p className={sectionLabel}>Size (inches)</p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="roll-label-width" className="block text-xs text-gray-500 mb-1">Width (W)</label>
            <input
              id="roll-label-width" type="number" min="0.5" max="12" step="0.125"
              value={customWidth} onChange={e => setCustomWidth(e.target.value)}
              placeholder="e.g. 3.5"
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-lp-green"
            />
          </div>
          <div>
            <label htmlFor="roll-label-length" className="block text-xs text-gray-500 mb-1">Length (L)</label>
            <input
              id="roll-label-length" type="number" min="0.5" max="12" step="0.125"
              value={customHeight} onChange={e => setCustomHeight(e.target.value)}
              placeholder="e.g. 2.5"
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-lp-green"
            />
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-2">Pricing is estimated — we&apos;ll confirm any unusual sizes before production.</p>
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
                    {m === 'bopp' && (
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
            rows={qtyRows.map(r => ({ qty: r.qty, totalFmt: r.totalFmt, save: r.discountPct }))}
            value={quantity}
            showCustom={showCustomQty}
            customValue={customQty}
            onSelect={qty => { setQuantity(qty); setShowCustomQty(false) }}
            onSelectCustom={() => setShowCustomQty(true)}
            onCustomChange={val => {
              setCustomQty(val)
              const n = parseInt(val)
              setQuantity(n)
            }}
            minCustom={ROLL_LABEL_LIMITS.minQuantity}
            maxCustom={ROLL_LABEL_LIMITS.maxQuantity}
            stepCustom={250}
          />
        ) : (
          <p className="text-sm text-gray-400 py-4 text-center">Enter dimensions from 0.5&Prime; to 12&Prime; to see pricing</p>
        )}
      </div>

      {showCustomQty && !validQuantity && (
        <p className="-mt-4 mb-5 text-xs text-amber-600">Enter a whole-number quantity from 250 to 100,000.</p>
      )}

      <div className="border-t border-gray-100 mb-6" />

      {/* ── Application + unwind direction ── */}
      <div className="mb-6">
        <RollLabelDirectionSelector value={labelDirection} onChange={setLabelDirection} />
      </div>

      {/* ── Price Footer + CTA ── */}
      {validSize && price && (
        <>
          <div className="border-t border-gray-200 pt-5 mb-4 flex items-end justify-between">
            <p className="text-4xl font-bold text-gray-900 leading-none">{price.totalFormatted}</p>
            <p className="text-sm text-gray-500 pb-1">{price.unitFormatted} / label</p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleOrder}
              disabled={labelDirection.applicationMethod === 'machine' && !labelDirection.unwindEdge}
              size="lg"
              variant={purchaseCtaStyle === 'outline' ? 'secondary' : 'primary'}
              className={`flex-1 text-base font-semibold py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed ${
                purchaseCtaStyle === 'outline'
                  ? '!bg-white !text-lp-green !border-lp-green hover:!bg-lp-green hover:!text-white'
                  : '!bg-lp-green hover:!bg-lp-green-dark text-white'
              }`}
            >
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
