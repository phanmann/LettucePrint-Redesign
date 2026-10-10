import assert from 'node:assert/strict'
import { calculateTentPrice, authoritativeTentPrice, tentDefaults, tentNames, isValidatedTentFrame, type TentConfiguration } from '../src/lib/tent-pricing'
let cases = 0
for (const size of ['10x10', '20x10'] as const) {
  const large = size === '20x10'
  for (const backwall of ['none', 'single', 'double'] as const)
  for (const sides of ['none', 'half-single', 'half-double', 'full-single', 'full-double'] as const)
  for (const flagHolders of ['0', '1', '2'] as const)
  for (const wheelBag of [false, true])
  for (const production of ['standard', 'next-day'] as const) {
    const c: TentConfiguration = { size, backwall, sides, flagHolders, wheelBag, production }
    const base = large ? 1419 : 789
    const extras = { none: 0, single: large ? 579 : 289, double: large ? 1149 : 579 }[backwall] +
      { none: 0, 'half-single': 349, 'half-double': 679, 'full-single': 579, 'full-double': 1149 }[sides] +
      { '0': 0, '1': 89, '2': 169 }[flagHolders] + (wheelBag ? large ? 99 : 89 : 0)
    let expected = base + extras
    if (production === 'next-day') { expected = Math.ceil(expected * (large ? 1.3 : 1.4)); while (expected % 10 !== 9) expected++ }
    const price = calculateTentPrice(c, 3)
    assert.equal(price.unitPriceCents, expected * 100)
    assert.equal(price.totalCents, expected * 300)
    const item = { product: tentNames[size], size, qty: 3, rush: production, ...price, tentConfiguration: c }
    assert.equal(authoritativeTentPrice(item)?.totalCents, expected * 300)
    for (const patch of [{ totalCents: 1 }, { unitPriceCents: 1 }, { qty: 2 }, { product: 'Other tent' }, { size: 'bad' }, { rush: 'economy' }, { tentConfiguration: undefined }]) assert.throws(() => authoritativeTentPrice({ ...item, ...patch }))
    cases++
  }
  assert.equal(calculateTentPrice({ ...tentDefaults, size, production: 'next-day' }, 1).unitPriceCents, large ? 184900 : 110900)
  for (const patch of [{ package: 'invalid' }, { backwall: 'bogus' }, { sides: 'bad' }, { production: 'economy' }, { flagHolders: 2 }, { wheelBag: 'yes' }]) assert.throws(() => calculateTentPrice({ ...tentDefaults, size, ...patch }, 1))
  for (const qty of [0, -1, 1.5, NaN, Infinity, Number.MAX_SAFE_INTEGER]) assert.throws(() => calculateTentPrice({ ...tentDefaults, size }, qty))
}
console.log(`PASS: ${cases} complete configurations, quantity multiplication, rush boundaries and tamper rejection`)

for (const size of ['10x10', '20x10'] as const) for (const pkg of ['top-only', 'frame-only'] as const) {
  const c = { ...tentDefaults, size, package: pkg }
  const expected = size === '10x10' ? 42900 : pkg === 'top-only' ? 84900 : 85900
  const price = calculateTentPrice(c, 2)
  assert.deepEqual(price, { unitPriceCents: expected, totalCents: expected * 2 })
  const item = { product: tentNames[size], size, qty: 2, rush: 'standard', ...price, tentConfiguration: c }
  assert.equal(authoritativeTentPrice(item)?.totalCents, expected * 2)
  assert.equal(isValidatedTentFrame(item), pkg === 'frame-only')
  assert.equal(isValidatedTentFrame({ ...item, totalCents: 1 }), false)
  for (const patch of [{ backwall: 'single' }, { sides: 'half-single' }, { flagHolders: '1' }, { wheelBag: true }, { production: 'next-day' }]) assert.throws(() => calculateTentPrice({ ...c, ...patch }, 1))
  assert.throws(() => authoritativeTentPrice({ ...item, tentConfiguration: { ...c, package: 'full-kit' } }))
}
console.log('PASS: four replacement packages, exact totals, accessory/rush rejection, frame artwork exemption and tamper rejection')
