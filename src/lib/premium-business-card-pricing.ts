// Lettuce Print — Premium Business Card Pricing Engine
// All prices are sell prices from PSI supplier (no markup needed — already priced)

export type PremiumFinish = 'soft-touch' | 'raised-spot-gloss' | 'raised-foil' | 'extra-thick'
export type CardWeight = '14pt' | '16pt' | '38pt'
export type SpotSide = 'front' | 'back'

// Quantity tiers (standardized across all premium types)
export const QUANTITY_TIERS = [50, 100, 250, 500, 1000]

// ── Soft Touch 16pt ──
// Single-sided and double-sided have DIFFERENT pricing
const SOFT_TOUCH_SINGLE_CENTS: Record<number, number> = {
  50:   3204,  // $32.04
  100:  3840,  // $38.40
  250:  4702,  // $47.02
  500:  6035,  // $60.35
  1000: 9340,  // $93.40
}

const SOFT_TOUCH_DOUBLE_CENTS: Record<number, number> = {
  50:   4279,  // $42.79
  100:  4913,  // $49.13
  250:  5823,  // $58.23
  500:  7194,  // $71.94
  1000: 10547, // $105.47
}

// ── Raised Spot Gloss ──
// Single/double same price. Finish only on ONE side (front or back)
const SPOT_GLOSS_14PT_CENTS: Record<number, number> = {
  50:   4621,  // $46.21
  100:  5120,  // $51.20
  250:  6925,  // $69.25
  500:  9470,  // $94.70
  1000: 13642, // $136.42
}

const SPOT_GLOSS_16PT_CENTS: Record<number, number> = {
  50:   4848,  // $48.48
  100:  5372,  // $53.72
  250:  7260,  // $72.60
  500:  10020, // $100.20
  1000: 14230, // $142.30
}

// ── Raised Foil ──
// Single/double same price. Finish only on ONE side (front or back)
const FOIL_14PT_CENTS: Record<number, number> = {
  50:   4621,  // $46.21
  100:  5120,  // $51.20
  250:  7009,  // $70.09
  500:  9890,  // $98.90
  1000: 14438, // $144.38
}

const FOIL_16PT_CENTS: Record<number, number> = {
  50:   4813,  // $48.13
  100:  5333,  // $53.33
  250:  7300,  // $73.00
  500:  10311, // $103.11
  1000: 15064, // $150.64
}

// ── Extra Thick 38pt ──
// Single/double same price
const EXTRA_THICK_CENTS: Record<number, number> = {
  50:   3299,  // $32.99
  100:  4051,  // $40.51
  250:  6371,  // $63.71
  500:  8518,  // $85.18
  1000: 13243, // $132.43
}

// Labels & descriptions
export const FINISH_LABELS: Record<PremiumFinish, string> = {
  'soft-touch':       'Soft Touch',
  'raised-spot-gloss': 'Raised Spot Gloss',
  'raised-foil':      'Raised Foil',
  'extra-thick':      'Extra Thick',
}

export const FINISH_DESCRIPTIONS: Record<PremiumFinish, string> = {
  'soft-touch':        'Velvety matte laminate. Premium feel, fingerprint-resistant.',
  'raised-spot-gloss': 'Glossy raised accents on matte stock. Tactile and eye-catching.',
  'raised-foil':       'Metallic foil stamping with raised texture. Luxe and memorable.',
  'extra-thick':       '38pt triple-layer board. Substantial weight that commands attention.',
}

export const WEIGHT_LABELS: Record<CardWeight, string> = {
  '14pt': '14 pt',
  '16pt': '16 pt',
  '38pt': '38 pt',
}

export const WEIGHT_DESCRIPTIONS: Record<CardWeight, string> = {
  '14pt': 'Standard weight with premium finish.',
  '16pt': 'Thicker stock for added durability and feel.',
  '38pt': 'Extra thick triple-layer board.',
}

export const SPOT_SIDE_LABELS: Record<SpotSide, string> = {
  'front': 'Front side',
  'back':  'Back side',
}

export interface PriceResult {
  totalCents: number
  unitCents: number
  totalFormatted: string
  unitFormatted: string
}

export function calculatePrice(
  quantity: number,
  finish: PremiumFinish,
  weight: CardWeight,
  sides: 'single' | 'double',
  spotSide?: SpotSide
): PriceResult {
  const tier = QUANTITY_TIERS.find(t => t >= quantity) ?? 1000

  let priceCents: number

  switch (finish) {
    case 'soft-touch':
      // Soft touch: 16pt only, different pricing for single vs double
      priceCents = sides === 'single' ? SOFT_TOUCH_SINGLE_CENTS[tier] : SOFT_TOUCH_DOUBLE_CENTS[tier]
      break

    case 'raised-spot-gloss':
      // Raised spot gloss: 14pt or 16pt, single/double same price
      priceCents = weight === '14pt' ? SPOT_GLOSS_14PT_CENTS[tier] : SPOT_GLOSS_16PT_CENTS[tier]
      break

    case 'raised-foil':
      // Raised foil: 14pt or 16pt, single/double same price
      priceCents = weight === '14pt' ? FOIL_14PT_CENTS[tier] : FOIL_16PT_CENTS[tier]
      break

    case 'extra-thick':
      // Extra thick: 38pt only, single/double same price
      priceCents = EXTRA_THICK_CENTS[tier]
      break

    default:
      priceCents = 0
  }

  const unitCents = Math.round(priceCents / tier)

  return {
    totalCents: priceCents,
    unitCents,
    totalFormatted: formatCents(priceCents),
    unitFormatted: formatCents(unitCents),
  }
}

export function formatCents(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(cents / 100)
}

// Generate quantity break table for display
export function getQuantityBreaks(
  finish: PremiumFinish,
  weight: CardWeight,
  sides: 'single' | 'double',
  spotSide?: SpotSide
) {
  return QUANTITY_TIERS.map(qty => {
    const result = calculatePrice(qty, finish, weight, sides, spotSide)
    const baseUnit = calculatePrice(50, finish, weight, sides, spotSide).unitCents
    const savingsPct = Math.round(((baseUnit - result.unitCents) / baseUnit) * 100)
    return {
      qty,
      totalFmt: result.totalFormatted,
      save: savingsPct,
    }
  })
}

// Helper: get available weights for a finish
export function getWeightsForFinish(finish: PremiumFinish): CardWeight[] {
  switch (finish) {
    case 'soft-touch':
      return ['16pt']
    case 'raised-spot-gloss':
    case 'raised-foil':
      return ['14pt', '16pt']
    case 'extra-thick':
      return ['38pt']
    default:
      return ['16pt']
  }
}

// Helper: does this finish have different single/double pricing?
export function hasDifferentSidesPricing(finish: PremiumFinish): boolean {
  return finish === 'soft-touch'
}

// Helper: does this finish show the "spot side" selector?
export function hasSpotSideSelector(finish: PremiumFinish): boolean {
  return finish === 'raised-spot-gloss' || finish === 'raised-foil'
}
