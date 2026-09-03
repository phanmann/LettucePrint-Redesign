import {
  calculateCustomStickerPrice,
  calculateCustomSpotUVPrice,
} from '../src/lib/pricing.ts'

const cases = [
  ['supplier minimum + markup', calculateCustomStickerPrice(3, 3, 100, 'standard', 'matte').totalCents, 7000],
  ['standard linear rate', calculateCustomStickerPrice(3, 3, 1000, 'standard', 'matte').totalCents, 26838],
  ['supplier rounding before markup', calculateCustomStickerPrice(2.5, 3.5, 777, 'standard', 'matte').totalCents, 20273],
  ['standard laminate rate', calculateCustomStickerPrice(3, 3, 1000, 'standard', 'laminate').totalCents, 29988],
  ['holographic rate', calculateCustomStickerPrice(3, 3, 1000, 'holographic', 'matte').totalCents, 94500],
  ['Spot UV 1 hit', calculateCustomSpotUVPrice(3, 3, 1000, 1).totalCents, 51660],
  ['Spot UV 2 hits', calculateCustomSpotUVPrice(3, 3, 1000, 2).totalCents, 69300],
  ['Spot UV 3 hits', calculateCustomSpotUVPrice(3, 3, 1000, 3).totalCents, 86940],
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

for (const invalid of [
  () => calculateCustomStickerPrice(0.25, 3, 100, 'standard', 'matte'),
  () => calculateCustomStickerPrice(3, 3, 49, 'standard', 'matte'),
  () => calculateCustomSpotUVPrice(53, 3, 100, 1),
]) {
  try {
    invalid()
    failures += 1
    console.error('FAIL invalid configuration was accepted')
  } catch {
    console.log('PASS invalid configuration rejected')
  }
}

if (failures > 0) process.exit(1)
