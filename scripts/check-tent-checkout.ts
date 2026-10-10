import assert from 'node:assert/strict'
import { NextRequest } from 'next/server'
import { POST } from '../src/app/api/checkout/route'
import { getStripe } from '../src/lib/stripe'
import { tentDefaults } from '../src/lib/tent-pricing'
// Entire SDK session-create method replaced locally. No network, credentials or real session.
process.env.STRIPE_SECRET_KEY = 'sk_test_local_mock_not_a_credential'
let captured: unknown
let calls = 0
Object.assign(getStripe().checkout.sessions, { create: async (params: unknown) => { calls++; captured = params; return { url: 'https://example.invalid/mock-checkout' } } })
const item = { id: 'local-test', product: '10×10 Canopy Tent', size: '10x10', qty: 2, material: 'Printed canopy with frame', finish: 'Full kit', rush: 'standard', totalCents: 157800, unitPriceCents: 78900, tentConfiguration: { ...tentDefaults, size: '10x10' } }
async function send(body: unknown) { return POST(new NextRequest('http://localhost/api/checkout', { method: 'POST', body: JSON.stringify(body) })) }
async function run() {
  const response = await send({ items: [item] })
  assert.equal(response.status, 200)
  const params = captured as {line_items: {price_data: {unit_amount: number; product_data: {metadata: Record<string,string>}}; quantity: number}[]; shipping_options: unknown[]; metadata: Record<string,string>}
  assert.equal(params.line_items[0].price_data.unit_amount, 157800)
  assert.equal(params.line_items[0].quantity, 1)
  assert.deepEqual(JSON.parse(params.line_items[0].price_data.product_data.metadata.tentConfiguration), item.tentConfiguration)
  assert.equal(params.metadata.orderType, 'cart')
  assert.equal(params.shipping_options.length, 1)
  for (const patch of [{ totalCents: 1 }, { tentConfiguration: null }, { qty: 1.2 }, { rush: 'economy' }, { product: 'Other', tentConfiguration: { ...item.tentConfiguration } }]) assert.equal((await send({ items: [{ ...item, ...patch }] })).status, 400)
  assert.equal((await send({productName:item.product,overridePriceCents:1})).status,400)
  assert.equal(calls, 1)
  assert.equal((await send({items:[{ product:'EuroFit Backdrop 8x8' }]})).status,409)
  assert.equal((await send({items:[{ product:'Vinyl Banner', qty:1, bannerConfiguration:{kind:'vinyl',width:24,height:36,quantity:1,grommets:'24',pockets:'none',pocketSize:3,edge:'hem',windSlits:false,poleKit:false,turnaround:'standard'}}]})).status,503)
  assert.equal(calls,1)
  for (const size of ['10x10', '20x10']) for (const pkg of ['top-only', 'frame-only']) {
    const unitPriceCents = size === '10x10' ? 42900 : pkg === 'top-only' ? 84900 : 85900
    const replacement = { ...item, product: size === '10x10' ? '10×10 Canopy Tent' : '20×10 Canopy Tent', size, unitPriceCents, totalCents: unitPriceCents * 2, material: 'tampered material', finish: 'tampered finish', tentConfiguration: { ...tentDefaults, size, package: pkg } }
    assert.equal((await send({ items: [replacement] })).status, 200)
    const payload = captured as typeof params
    assert.equal(payload.line_items[0].price_data.unit_amount, unitPriceCents * 2)
    const meta = payload.line_items[0].price_data.product_data.metadata
    assert.equal(JSON.parse(meta.tentConfiguration).package, pkg)
    assert.equal(meta.material, pkg === 'frame-only' ? 'Frame only (no print)' : 'Printed fabric top only')
    assert.notEqual(meta.finish, 'tampered finish')
    for (const patch of [{ wheelBag: true }, { backwall: 'single' }, { sides: 'half-single' }, { flagHolders: '1' }, { production: 'next-day' }]) {
      assert.equal((await send({ items: [{ ...replacement, tentConfiguration: { ...replacement.tentConfiguration, ...patch } }] })).status, 400)
    }
  }
  assert.equal(calls, 5)
  console.log('PASS: mocked Stripe payload, authoritative totals, config metadata, invalid/legacy requests, unchanged banner/backdrop gates; zero network requests')
}
run().catch(error => { console.error(error); process.exitCode = 1 })
