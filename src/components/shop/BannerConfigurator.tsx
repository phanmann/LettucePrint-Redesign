'use client'

import { useId, useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { bannerFinishing, bannerMaterials, bannerNames, bannerTurnarounds, calculateBannerPrice, type BannerConfiguration, type BannerKind } from '@/lib/banner-pricing'

const usd = (value: number) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
const inputClass = 'mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm text-gray-900 focus:ring-2 focus:ring-lp-green'
const presets = [[2,3],[2,4],[2,6],[3,6],[4,6],[4,8],[4,10],[5,10]]
export default function BannerConfigurator({ kind, configuration: c, onConfigurationChange }: { kind: BannerKind; configuration: BannerConfiguration; onConfigurationChange: (configuration: BannerConfiguration) => void }) {
  const [added, setAdded] = useState(false)
  const id = useId()
  const { addItem } = useCart()
  const price = calculateBannerPrice(c)
  const large = price.sqft > 24
  const update = (patch: Partial<BannerConfiguration>) => {
    {
      const next = { ...c, ...patch }
      if (next.width > 36) next.poleKit = false
      if (next.poleKit) { next.pockets = 'instead'; next.pocketSize = 3 }
      onConfigurationChange(next)
    }
    setAdded(false)
  }
  function add() {
    if (price.quoteReason) return
    addItem({ product: bannerNames[kind], size: `${c.width} × ${c.height} in`, qty: c.quantity,
      material: bannerMaterials[kind], finish: bannerFinishing(c), rush: bannerTurnarounds[c.turnaround],
      totalCents: price.totalCents, totalFormatted: usd(price.totalCents / 100),
      productPath: `/services/signage/banners/${kind === 'vinyl' ? 'vinyl-banner' : 'double-sided-banner'}`,
      bannerConfiguration: c,
    })
    setAdded(true)
  }
  return <section aria-label="Banner configurator" className="space-y-5">
    <h2 className="text-xl font-semibold">Build your banner</h2>
    <label className="block text-sm font-semibold">Size preset (feet)
      <select className={inputClass} value={presets.some(([w,h]) => w*12 === c.width && h*12 === c.height) ? `${c.width/12}x${c.height/12}` : 'custom'} onChange={e => { if (e.target.value !== 'custom') { const [w,h] = e.target.value.split('x').map(Number); update({ width: w*12, height: h*12 }) } }}>
        <option value="custom">Custom — enter inches below</option>
        {presets.map(([w,h]) => <option key={`${w}x${h}`} value={`${w}x${h}`}>{w} × {h} ft</option>)}
      </select>
    </label>
    <div className="grid grid-cols-2 gap-3">
      <label className="text-sm font-semibold">Width (inches)<input className={inputClass} type="number" min="12" step="any" value={Number.isNaN(c.width) ? '' : c.width} onChange={e => update({ width: e.target.value === '' ? NaN : Number(e.target.value) })} /></label>
      <label className="text-sm font-semibold">Height (inches)<input className={inputClass} type="number" min="0.01" step="any" value={Number.isNaN(c.height) ? '' : c.height} onChange={e => update({ height: e.target.value === '' ? NaN : Number(e.target.value) })} /></label>
    </div>
    <p className="text-xs text-gray-600">Custom widths 12–126 in. Over 100 sq ft or 50+ banners? Request a quote.</p>
    <label className="block text-sm font-semibold">Quantity<input className={inputClass} type="number" min="1" step="1" value={Number.isNaN(c.quantity) ? '' : c.quantity} onChange={e => update({ quantity: e.target.value === '' ? NaN : Number(e.target.value) })} /></label>
    <p className="text-xs text-gray-600">Quantity savings: 2–4: 5% · 5–9: 10% · 10–24: 15% · 25–49: 20%.</p>
    {kind === 'double-sided' && <div className="rounded-lg bg-gray-50 p-3 text-sm">
      <label className="flex gap-3"><input type="checkbox" className="mt-1" checked={c.poleKit} disabled={c.width > 36 || !Number.isFinite(c.width)} onChange={e => update({ poleKit: e.target.checked })} /><span>Pole-mount kit +$119 per banner</span></label>
      <p className="mt-2 text-xs text-gray-600">For widths up to 36 in. Includes 2 fiberglass arms with end caps, 2 rust-resistant aluminum brackets, and 4 stainless steel bands. Sets 3 in top & bottom pole pockets; pocket charge included.</p>
    </div>}
    <label className="block text-sm font-semibold">Pole pockets
      <select disabled={c.poleKit} className={inputClass} value={c.pockets} onChange={e => update({ pockets: e.target.value as BannerConfiguration['pockets'] })}>
        <option value="none">None — use grommets</option>
        <option value="instead">Instead of grommets (+${large ? 15 : 10} per banner)</option>
        <option value="with">Pockets + grommets (+${large ? 25 : 15} per banner)</option>
      </select>
    </label>
    {c.pockets !== 'none' && <label className="block text-sm font-semibold">Pocket size (top & bottom)<select className={inputClass} disabled={c.poleKit} value={c.pocketSize} onChange={e => update({ pocketSize: Number(e.target.value) as 2|3|4 })}>{[2,3,4].map(size => <option key={size} value={size}>{size} in</option>)}</select></label>}
    {c.pockets !== 'instead' && <label className="block text-sm font-semibold">Grommets<select className={inputClass} value={c.grommets} onChange={e => update({ grommets: e.target.value as BannerConfiguration['grommets'] })}>
      <option value="24">Every 24 in — included</option><option value="corners">Corners only — free</option><option value="12">Every 12 in (+${large ? 20 : 10} per banner)</option>
    </select></label>}
    <label className="block text-sm font-semibold">Edge finishing<select className={inputClass} value={c.edge} onChange={e => update({ edge: e.target.value as BannerConfiguration['edge'] })}>
      <option value="hem">Standard hem — included</option><option value="webbing">Webbing +$2.00 / perimeter ft</option><option value="rings">Webbing + D-rings: webbing price +$30</option>{kind === 'vinyl' && <option value="rope">Rope in hem +$2.50 / perimeter ft</option>}
    </select></label>
    <label className="flex gap-3 text-sm"><input type="checkbox" checked={c.windSlits} onChange={e => update({ windSlits: e.target.checked })} />Wind slits — free on request</label>
    <label className="block text-sm font-semibold">Turnaround<select className={inputClass} value={c.turnaround} onChange={e => update({ turnaround: e.target.value as BannerConfiguration['turnaround'] })}>
      <option value="standard">Standard — list price</option><option value="economy">Economy 7-day — save 5%</option><option value="rush">Rush next-day production +40% (minimum +$25 per line)</option>
    </select></label>
    <p className="text-xs text-gray-600">{bannerTurnarounds[c.turnaround]}. Production timing starts after proof approval.</p>
    <div aria-live="polite" aria-atomic="true" className="border-t border-gray-200 pt-4">
      {price.quoteReason ? <><p className="text-sm mb-3">{price.quoteReason}</p><Link href="/get-quote" className="block rounded-lg bg-lp-green px-4 py-3 text-center font-bold text-white">Request a quote</Link></> : <>
        <dl className="space-y-2 text-sm"><div className="flex justify-between"><dt>Base price / banner</dt><dd>{usd(price.baseUnit)}</dd></div><div className="flex justify-between"><dt>Add-ons / banner</dt><dd>{usd(price.addons)}</dd></div><div className="flex justify-between"><dt>Quantity discount</dt><dd>{price.discount*100}%</dd></div><div className="flex justify-between"><dt>Turnaround adjustment</dt><dd>{usd(price.adjustment)}</dd></div><div className="flex justify-between pt-2 text-xl font-bold"><dt>Line total</dt><dd data-testid="banner-total">{usd(price.totalCents/100)}</dd></div></dl>
        <p className="mt-2 text-xs text-gray-600">Before shipping and applicable tax.</p>
        <button type="button" onClick={add} className="mt-4 w-full rounded-lg bg-lp-green px-4 py-4 font-bold text-white hover:bg-lp-green-dark">Add to Cart</button>
        <p role="status" id={`${id}-added`} className="mt-2 text-sm text-lp-green">{added ? 'Added to cart.' : ''}</p>
        <Link href="/cart" className="block text-center text-sm font-semibold underline">View Cart</Link>
      </>}
    </div>
    <p className="text-xs text-gray-600">Shipping is always charged: UPS rate at checkout. Ships direct from our production partner. No free-shipping threshold.</p>
    <Link href="/get-quote" className="block text-sm text-lp-green underline">Need design help? Available for a custom fee quoted after a quick consult</Link>
  </section>
}
