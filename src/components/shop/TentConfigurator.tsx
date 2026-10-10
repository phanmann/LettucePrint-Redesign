'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { calculateTentPrice, tentDefaults, tentDescription, tentNames, type TentConfiguration, type TentSize } from '@/lib/tent-pricing'
const money = (cents: number) => (cents / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
export default function TentConfigurator({ size }: { size: TentSize }) {
  const [config, setConfig] = useState<TentConfiguration>({ ...tentDefaults, size })
  const [quantity, setQuantity] = useState('1')
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()
  const large = size === '20x10'
  const update = (patch: Partial<TentConfiguration>) => { setConfig(c => ({ ...c, ...patch })); setAdded(false) }
  let price: ReturnType<typeof calculateTentPrice> | undefined
  try { price = calculateTentPrice(config, Number(quantity)) } catch { /* Invalid input cannot enter cart. */ }
  const selectClass = 'block w-full mt-2 border border-gray-300 rounded-lg p-3 bg-white'
  return <section aria-label="Tent configurator" className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
    <h2 className="text-2xl font-semibold">Build your full tent kit</h2>
    <p>Full printed canopy with frame included. All add-ons are priced per tent.</p>
    <label className="block">Backwall<select className={selectClass} value={config.backwall} onChange={e => update({ backwall: e.target.value as TentConfiguration['backwall'] })}>
      <option value="none">None</option><option value="single">Single-sided (+${large ? 579 : 289})</option><option value="double">Double-sided (+${large ? 1149 : 579})</option>
    </select></label>
    <label className="block">Sidewalls (pair)<select className={selectClass} value={config.sides} onChange={e => update({ sides: e.target.value as TentConfiguration['sides'] })}>
      <option value="none">None</option><option value="half-single">Half sides, single-sided (+$349)</option><option value="half-double">Half sides, double-sided (+$679)</option><option value="full-single">Full sides, single-sided (+$579)</option><option value="full-double">Full sides, double-sided (+$1,149)</option>
    </select></label>
    <label className="block">Flag holder hardware<select className={selectClass} value={config.flagHolders} onChange={e => update({ flagHolders: e.target.value as TentConfiguration['flagHolders'] })}>
      <option value="0">None</option><option value="1">1 holder (+$89)</option><option value="2">2 holders (+$169)</option>
    </select><span className="text-sm text-gray-600">Hardware only; flags not included.</span></label>
    <label className="flex gap-3 items-center"><input type="checkbox" checked={config.wheelBag} onChange={e => update({ wheelBag: e.target.checked })} />Premium wheel bag (+${large ? 99 : 89})</label>
    <label className="block">Production<select className={selectClass} value={config.production} onChange={e => update({ production: e.target.value as TentConfiguration['production'] })}>
      <option value="standard">Standard production</option><option value="next-day">Next-day production (+{large ? 30 : 40}%, rounded up to a price ending in 9)</option>
    </select></label>
    <p className="text-sm text-gray-600">Production starts after proof approval. Standard timing is confirmed after approval. Next-day production is not next-day delivery.</p>
    <label className="block">Quantity<input className={selectClass} type="number" min="1" step="1" value={quantity} onChange={e => { setQuantity(e.target.value); setAdded(false) }} /></label>
    <div aria-live="polite"><p>Per tent: {price ? money(price.unitPriceCents) : '—'}</p><p className="text-3xl font-semibold" data-testid="tent-total">{price ? money(price.totalCents) : 'Enter a valid quantity'}</p></div>
    <p className="text-sm text-gray-600">Merchandise only. Shipping and tax excluded. No quantity discount.</p>
    <button type="button" disabled={!price} className="w-full rounded-lg bg-lp-green text-white font-semibold py-4 disabled:opacity-50" onClick={() => {
      if (!price) return
      addItem({ product: tentNames[size], size, qty: Number(quantity), material: 'Printed canopy with frame', finish: tentDescription(config), rush: config.production, tentConfiguration: { ...config }, ...price, totalFormatted: money(price.totalCents), productPath: `/services/signage/tents/${size}` })
      setAdded(true)
    }}>Add to Cart</button>
    <p role="status">{added ? 'Added to cart.' : ''}</p>
    {added && <Link className="underline text-lp-green" href="/cart">View Cart</Link>}
  </section>
}
