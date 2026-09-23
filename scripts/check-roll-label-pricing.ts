import {
  calculateRollLabelPrice,
  isLabelFinish,
  isLabelMaterial,
} from '@/lib/roll-label-pricing'
import { authoritativeRollLabelPrice, parseRollLabelDimensions } from '@/lib/roll-label-checkout'

const cases = [
  ['2x2 paper matte at 250', calculateRollLabelPrice(2, 2, 250, 'standard', 'matte').totalCents, 5219],
  ['3x2 paper gloss at 1000', calculateRollLabelPrice(3, 2, 1000, 'standard', 'gloss').totalCents, 19426],
  ['4x3 BOPP matte at 2500', calculateRollLabelPrice(4, 3, 2500, 'bopp', 'matte').totalCents, 98620],
]

let failures = 0
for (const [name, actual, expected] of cases) {
  if (actual !== expected) {
    failures += 1
    console.error(`FAIL ${name}: expected ${expected}, received ${actual}`)
  } else {
    console.log(`PASS ${name}`)
  }
}

const invalidPricingCases: Array<[string, () => unknown]> = [
  ['width below minimum', () => calculateRollLabelPrice(0.49, 2, 250, 'standard', 'matte')],
  ['width above maximum', () => calculateRollLabelPrice(12.01, 2, 250, 'standard', 'matte')],
  ['height is not finite', () => calculateRollLabelPrice(2, Number.NaN, 250, 'standard', 'matte')],
  ['quantity below minimum', () => calculateRollLabelPrice(2, 2, 249, 'standard', 'matte')],
  ['quantity is fractional', () => calculateRollLabelPrice(2, 2, 250.5, 'standard', 'matte')],
  ['quantity above safety cap', () => calculateRollLabelPrice(2, 2, 100001, 'standard', 'matte')],
]

for (const [name, invalid] of invalidPricingCases) {
  try {
    invalid()
    failures += 1
    console.error(`FAIL ${name}: invalid configuration was accepted`)
  } catch {
    console.log(`PASS ${name}`)
  }
}

for (const [name, actual, expected] of [
  ['known material accepted', isLabelMaterial('bopp'), true],
  ['unknown material rejected', isLabelMaterial('vinyl'), false],
  ['known finish accepted', isLabelFinish('gloss'), true],
  ['unknown finish rejected', isLabelFinish('satin'), false],
]) {
  if (actual !== expected) {
    failures += 1
    console.error(`FAIL ${name}`)
  } else {
    console.log(`PASS ${name}`)
  }
}

const authoritativeFixture = {
  product: 'Custom Roll Labels',
  size: '3" × 2"',
  qty: 1000,
  material: 'standard',
  finish: 'gloss',
  rush: 'standard',
}
const authoritativePrice = authoritativeRollLabelPrice(authoritativeFixture)
if (authoritativePrice !== 19426) {
  failures += 1
  console.error(`FAIL authoritative checkout price: expected 19426, received ${authoritativePrice}`)
} else {
  console.log('PASS authoritative checkout price ignores browser totals by recomputing configuration')
}

if (authoritativeRollLabelPrice({ ...authoritativeFixture, product: 'Other Product' }) !== null) {
  failures += 1
  console.error('FAIL unrelated product was treated as a roll label')
} else {
  console.log('PASS unrelated products remain outside roll-label authority')
}

const invalidCheckoutCases: Array<[string, () => unknown]> = [
  ['trailing size text rejected', () => parseRollLabelDimensions('3 x 2 promo')],
  ['unsupported material rejected at checkout', () => authoritativeRollLabelPrice({ ...authoritativeFixture, material: 'vinyl' })],
  ['unsupported finish rejected at checkout', () => authoritativeRollLabelPrice({ ...authoritativeFixture, finish: 'satin' })],
  ['unsupported rush rejected at checkout', () => authoritativeRollLabelPrice({ ...authoritativeFixture, rush: '24hr' })],
]

for (const [name, invalid] of invalidCheckoutCases) {
  try {
    invalid()
    failures += 1
    console.error(`FAIL ${name}`)
  } catch {
    console.log(`PASS ${name}`)
  }
}

if (failures > 0) process.exit(1)
