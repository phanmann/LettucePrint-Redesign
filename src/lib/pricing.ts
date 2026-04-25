// Lettuce Print — Sticker Pricing Engine
// Anchor: 3×3" sticker @ 50 units = $75 ($1.50/unit)
// Volume discounts off $1.50/unit base: 35% / 48% / 60% / 70% / 77%
// All other sizes scale linearly by sq-inch area relative to 3×3 (9 sq in)
// Minimum margin floor: 20% (actual floor is ~29.5% at 2500 units)

export type StickerSize = '1x1' | '2x2' | '3x3' | '4x4' | '5x5'
export type StickerMaterial = 'standard' | 'holographic'
export type StickerFinish = 'matte' | 'gloss' | 'laminate'
export type RushOption = 'standard' | '48hr' | '24hr'

// Reference tier prices for 3×3" standard sticker (in cents)
// Anchor: 50 units = $75. Discounts: 35% / 48% / 60% / 70% / 77% off $1.50/unit
const REF_PRICES_3x3_CENTS: Record<number, number> = {
  50:   7500,   // $75.00  — $1.50/unit
  100:  9800,   // $98.00  — $0.98/unit (save 35%)
  250:  19500,  // $195.00 — $0.78/unit (save 48%)
  500:  30000,  // $300.00 — $0.60/unit (save 60%)
  1000: 45000,  // $450.00 — $0.45/unit (save 70%)
  2500: 86200,  // $862.00 — $0.345/unit (save 77%)
}

// Reference sq inches for anchor size (3×3)
const REF_SQ_IN = 9

// Available quantity tiers
export const QUANTITY_TIERS = [50, 100, 250, 500, 1000, 2500]

// Discount percentages per tier (for display only)
export const TIER_DISCOUNTS: Record<number, number> = {
  50:   0,
  100:  35,
  250:  48,
  500:  60,
  1000: 70,
  2500: 77,
}

// Size in square inches
export const SIZE_SQ_IN: Record<StickerSize, number> = {
  '1x1': 1,
  '2x2': 4,
  '3x3': 9,
  '4x4': 16,
  '5x5': 25,
}

// Base price in cents: scale 3×3 reference price by area ratio, snap to nearest tier
function basePriceCents(sqIn: number, quantity: number): number {
  const tier = QUANTITY_TIERS.find(t => t >= quantity) ?? 2500
  const ref = REF_PRICES_3x3_CENTS[tier]
  return Math.round(ref * (sqIn / REF_SQ_IN))
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
  const tier = QUANTITY_TIERS.find(t => t >= quantity) ?? 2500

  // Base price: scale 3×3 reference by area, snapped to tier
  const base = basePriceCents(sqIn, tier)

  // Apply material multiplier (holographic premium)
  const materialAdjusted = Math.round(base * MATERIAL_MULTIPLIERS[material])

  // Apply finish add-on (per sq in × tier qty)
  const finishAddon = FINISH_ADDON_PER_SQIN[finish] * sqIn * tier

  // Subtotal before rush
  const subtotal = materialAdjusted + finishAddon

  // Rush fee
  const rushFee = RUSH_FEES[rush]

  // Total
  const total = subtotal + rushFee

  // Unit price
  const unitCents = Math.round(total / tier)

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
      savingsPct: TIER_DISCOUNTS[qty] ?? 0,
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
  const tier = QUANTITY_TIERS.find(t => t >= quantity) ?? 2500
  return Math.round(EMBOSSING_EXTRA_RATE_CENTS * sqIn * tier * extraLayers)
}

export function calculateSpotUVPrice(
  size: StickerSize,
  quantity: number,
  layers: EmbossingLayers,
  rush: RushOption
): PriceResult {
  const sqIn = SIZE_SQ_IN[size]
  const tier = QUANTITY_TIERS.find(t => t >= quantity) ?? 2500

  // Base sticker price from tier table
  const base = basePriceCents(sqIn, tier)

  // Spot UV premium: 1.60× the standard sticker sell price
  const spotUVBase = Math.round(base * 1.60)

  // Embossing add-on for extra layers
  const embossingAddon = calculateEmbossingAddon(size, tier, layers)

  const subtotal = spotUVBase + embossingAddon
  const rushFee = RUSH_FEES[rush]
  const total = subtotal + rushFee
  const unitCents = Math.round(total / tier)
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
