// Lettuce Print — Sticker Pricing Engine
// Formula: sell price = sq_inches × $0.027 (cost/sq in) × 3.87 (387% markup)
// Reference: 3×3" sticker @ 100 units = $94.04 total

export type StickerSize = '1x1' | '2x2' | '3x3' | '4x4' | '5x5'
export type StickerMaterial = 'standard' | 'holographic'
export type StickerFinish = 'matte' | 'gloss' | 'laminate'
export type RushOption = 'standard' | '48hr' | '24hr'

// Core pricing constants
const COST_PER_SQ_IN_CENTS = 2.7        // $0.027 per sq inch (in cents)
const MARKUP_MULTIPLIER    = 3.87       // 387% of cost

// Available quantity tiers
export const QUANTITY_TIERS = [50, 100, 250, 500, 1000, 2500]

// Size in square inches
export const SIZE_SQ_IN: Record<StickerSize, number> = {
  '1x1': 1,
  '2x2': 4,
  '3x3': 9,
  '4x4': 16,
  '5x5': 25,
}

// Core formula: sell price in cents for a given sq-inch area and quantity
function basePriceCents(sqIn: number, quantity: number): number {
  return Math.round(sqIn * COST_PER_SQ_IN_CENTS * MARKUP_MULTIPLIER * quantity)
}

// Material multipliers on sell price
export const MATERIAL_MULTIPLIERS: Record<StickerMaterial, number> = {
  'standard':    1.00,
  'holographic': 2.80,
}

// Finish add-on in cents per sq inch on sell price
export const FINISH_ADDON_PER_SQIN: Record<StickerFinish, number> = {
  'matte':    0,
  'gloss':    0,
  'laminate': 40, // $0.40/sq in
}

// Rush fees in cents
const RUSH_FEES: Record<RushOption, number> = {
  'standard': 0,
  '48hr':     20000, // $200
  '24hr':     30000, // $300
}

export const RUSH_LABELS: Record<RushOption, string> = {
  'standard': 'Standard (3–5 business days)',
  '48hr':     '48-Hour Rush (+$200)',
  '24hr':     '24-Hour Rush (+$300)',
}

export interface PriceResult {
  totalCents: number
  unitCents: number
  totalFormatted: string
  unitFormatted: string
  rushFeeCents: number
  baseBeforeRush: number
}

export function calculatePrice(
  size: StickerSize,
  quantity: number,
  material: StickerMaterial,
  finish: StickerFinish,
  rush: RushOption
): PriceResult {
  const sqIn = SIZE_SQ_IN[size]

  // Base price from formula: sqIn × $0.027 × 3.87 × qty
  const base = basePriceCents(sqIn, quantity)

  // Apply material multiplier (holographic premium)
  const materialAdjusted = Math.round(base * MATERIAL_MULTIPLIERS[material])

  // Apply finish add-on (per sq in × quantity)
  const finishAddon = FINISH_ADDON_PER_SQIN[finish] * sqIn * quantity

  // Subtotal before rush
  const subtotal = materialAdjusted + finishAddon

  // Rush fee
  const rushFee = RUSH_FEES[rush]

  // Total
  const total = subtotal + rushFee

  // Unit price
  const unitCents = Math.round(total / quantity)

  return {
    totalCents: total,
    unitCents,
    totalFormatted: formatCents(total),
    unitFormatted: formatCents(unitCents),
    rushFeeCents: rushFee,
    baseBeforeRush: subtotal,
  }
}

export function formatCents(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(cents / 100)
}

// Generate full quantity break table for display
export function getQuantityBreaks(
  size: StickerSize,
  material: StickerMaterial,
  finish: StickerFinish
) {
  return QUANTITY_TIERS.map(qty => {
    const result = calculatePrice(size, qty, material, finish, 'standard')
    return {
      qty,
      total: result.totalFormatted,
      unit: result.unitFormatted,
      savingsPct: 0, // Flat rate formula — no volume discount tiers
    }
  })
}

export const SIZE_LABELS: Record<StickerSize, string> = {
  '1x1': '1" × 1"',
  '2x2': '2" × 2"',
  '3x3': '3" × 3"',
  '4x4': '4" × 4"',
  '5x5': '5" × 5"',
}

export const MATERIAL_LABELS: Record<StickerMaterial, string> = {
  'standard':    'Standard Vinyl',
  'holographic': 'Holographic',
}

export const MATERIAL_DESCRIPTIONS: Record<StickerMaterial, string> = {
  'standard':    'Durable white vinyl. Matte or gloss finish. Weather resistant.',
  'holographic': 'Eye-catching rainbow effect. Premium iridescent vinyl.',
}

export const FINISH_LABELS: Record<StickerFinish, string> = {
  'matte':    'Matte',
  'gloss':    'Gloss',
  'laminate': 'Laminate (Additional)',
}

export const FINISH_DESCRIPTIONS: Record<StickerFinish, string> = {
  'matte':    'Smooth, non-reflective finish. Clean and modern look.',
  'gloss':    'High-shine coating. Colors pop, great for photos and bold designs.',
  'laminate': 'Extra protective film layer. Adds durability and a premium feel.',
}

// ── Spot UV Embossing Layers ───────────────────────────────────────────────────
// Base spot-UV price already includes standard print + 1 embossing layer ($0.041/sq in baked in)
// This selector adds EXTRA layers on top of the included 1: 0 = standard, 1–4 = extras
// Each extra layer = +$0.0135/sq in × quantity
export type EmbossingLayers = 0 | 1 | 2 | 3 | 4

const EMBOSSING_EXTRA_RATE_CENTS = 1.35  // $0.0135 per sq in per extra layer

export const EMBOSSING_LAYER_OPTIONS: EmbossingLayers[] = [0, 1, 2, 3, 4]

export const EMBOSSING_LAYER_LABELS: Record<EmbossingLayers, string> = {
  0: 'Standard',
  1: '+1 Layer',
  2: '+2 Layers',
  3: '+3 Layers',
  4: '+4 Layers',
}

export function calculateEmbossingAddon(
  size: StickerSize,
  quantity: number,
  extraLayers: EmbossingLayers
): number {
  if (extraLayers === 0) return 0
  const sqIn = SIZE_SQ_IN[size]
  return Math.round(EMBOSSING_EXTRA_RATE_CENTS * sqIn * quantity * extraLayers)
}

export function calculateSpotUVPrice(
  size: StickerSize,
  quantity: number,
  layers: EmbossingLayers,
  rush: RushOption
): PriceResult {
  const sqIn = SIZE_SQ_IN[size]

  // Base sticker price from formula
  const base = basePriceCents(sqIn, quantity)

  // Spot UV premium: 1.60× the standard sticker sell price
  const spotUVBase = Math.round(base * 1.60)

  // Embossing add-on for extra layers
  const embossingAddon = calculateEmbossingAddon(size, quantity, layers)

  const subtotal = spotUVBase + embossingAddon
  const rushFee = RUSH_FEES[rush]
  const total = subtotal + rushFee
  const unitCents = Math.round(total / quantity)
  return {
    totalCents: total,
    unitCents,
    totalFormatted: formatCents(total),
    unitFormatted: formatCents(unitCents),
    rushFeeCents: rushFee,
    baseBeforeRush: subtotal,
  }
}

export function getSpotUVQuantityBreaks(
  size: StickerSize,
  layers: EmbossingLayers
) {
  return QUANTITY_TIERS.map(qty => {
    const result = calculateSpotUVPrice(size, qty, layers, 'standard')
    const maxPrice = calculateSpotUVPrice(size, 50, layers, 'standard')
    const savings = Math.max(0, Math.round(((maxPrice.totalCents - result.totalCents) / maxPrice.totalCents) * 100))
    return {
      qty,
      total: result.totalFormatted,
      unit: result.unitFormatted,
      savingsPct: savings,
    }
  })
}
