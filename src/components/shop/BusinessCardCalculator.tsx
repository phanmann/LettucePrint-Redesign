'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import Button from '@/components/ui/Button'
import QuantityDropdown from '@/components/shop/QuantityDropdown'
import {
  QUANTITY_TIERS,
  FINISH_LABELS,
  FINISH_DESCRIPTIONS,
  WEIGHT_LABELS,
  WEIGHT_DESCRIPTIONS,
  calculatePrice,
  getQuantityBreaks,
  type CardFinish,
  type CardWeight,
} from '@/lib/business-card-pricing'

const FINISHES: CardFinish[] = ['matte', 'gloss']
const WEIGHTS: CardWeight[] = ['14pt', '16pt']

interface Props { productName: string }

export default function BusinessCardCalculator({ productName }: Props) {
  const [finish, setFinish] = useState<CardFinish>('matte')
  const [weight, setWeight] = useState<CardWeight>('14pt')
  const [quantity, setQuantity] = useState<number>(100)
  const [customQty, setCustomQty] = useState('')
  const [showCustomQty, setShowCustomQty] = useState(false)
  const router = useRouter()

  // Compute price for current selection
  const price = useMemo(() => {
    return calculatePrice(quantity, finish, weight)
  }, [quantity, finish, weight])

  // Quantity rows
  const qtyRows = useMemo(() => {
    return getQuantityBreaks(finish, weight)
  }, [finish, weight])

  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleOrder = () => {
    addItem({
      product: productName,
      size: '3.5" × 2"',
      qty: quantity,
      material: 'Double-sided',
      finish: `${FINISH_LABELS[finish]} · ${WEIGHT_LABELS[weight]} stock`,
      rush: 'standard',
      totalCents: price.totalCents,
      totalFormatted: price.totalFormatted,
      productPath: '/services/marketing-materials/business-cards/standard',
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

      {/* ── Finish ── */}
      <div className="mb-6">
        <p className={sectionLabel}>Paper stock finish</p>
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

      {/* ── Weight ── */}
      <div className="mb-6">
        <p className={sectionLabel}>Paper stock weight</p>
        <div className="space-y-2">
          {WEIGHTS.map(w => (
            <label key={w} className={radioRow(weight === w)} onClick={() => setWeight(w)}>
              <div className="flex items-center gap-3">
                <div className={radioCircle(weight === w)} />
                <div>
                  <p className={`text-sm font-medium leading-tight ${weight === w ? 'text-gray-900' : 'text-gray-700'}`}>
                    {WEIGHT_LABELS[w]}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{WEIGHT_DESCRIPTIONS[w]}</p>
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
      </div>

      {/* ── Price Footer + CTA ── */}
      <div className="border-t border-gray-200 pt-5 mb-4 flex items-end justify-between">
        <div>
          <p className="text-4xl font-bold text-gray-900 leading-none">{price.totalFormatted}</p>
        </div>
        <p className="text-sm text-gray-500 pb-1">{price.unitFormatted} / card</p>
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
    </div>
  )
}
