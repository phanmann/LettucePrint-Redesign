// Lettuce Print — Sticker Pricing Engine
// Base: 2x2 standard sticker at each quantity tier
// All prices in USD cents to avoid floating point issues

export type StickerSize = '1x1' | '2x2' | '3x3' | '4x4' | '5x5'
export type StickerMaterial = 'standard' | 'holographic'
export type StickerFinish = 'matte' | 'gloss' | 'laminate'
export type RushOption = 'standard' | '48hr' | '24hr'

// Base prices for 2x2 standard sticker at each quantity (in cents)
const BASE_PRICES_2x2: Record<number, number> = {
  50:   3800,
  100:  5500,
  250:  10500,
  500:  17500,
  1000: 29500,
  2500: 59500,
}

// Available quantity tiers
export const QUANTITY_TIERS = [50, 100, 250, 500, 1000, 2500]

// Size multipliers relative to 2x2 base (area-based with margin adjustment)
const SIZE_MULTIPLIERS: Record<StickerSize, number> = {
  '1x1': 0.50,
  '2x2': 1.00,
  '3x3': 1.80,
  '4x4': 3.00,
  '5x5': 4.50,
}

// Size in square inches (for cost reference)
export const SIZE_SQ_IN: Record<StickerSize, number> = {
  '1x1': 1,
  '2x2': 4,
  '3x3': 9,
  '4x4': 16,
  '5x5': 25,
}

// Material multipliers on sell price
const MATERIAL_MULTIPLIERS: Record<StickerMaterial, number> = {
  'standard':    1.00,
  'holographic': 2.80,
}

// Finish add-on in cents per sq inch on sell price
const FINISH_ADDON_PER_SQIN: Record<StickerFinish, number> = {
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
  // Find the closest quantity tier (round up)
  const tier = QUANTITY_TIERS.find(t => t >= quantity) ?? 2500

  // Base price for this tier at 2x2 standard
  const base2x2 = BASE_PRICES_2x2[tier]

  // Apply size multiplier
  const sizeAdjusted = Math.round(base2x2 * SIZE_MULTIPLIERS[size])

  // Apply material multiplier
  const materialAdjusted = Math.round(sizeAdjusted * MATERIAL_MULTIPLIERS[material])

  // Apply finish add-on (per sq in × quantity)
  const finishAddon = FINISH_ADDON_PER_SQIN[finish] * SIZE_SQ_IN[size] * tier

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
    const base = calculatePrice('2x2', 50, 'standard', 'matte', 'standard')
    const maxPrice = calculatePrice(size, 50, material, finish, 'standard')
    const savings = Math.max(0, Math.round(((maxPrice.totalCents - result.totalCents) / maxPrice.totalCents) * 100))
    return {
      qty,
      total: result.totalFormatted,
      unit: result.unitFormatted,
      savingsPct: savings,
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
  const tier = QUANTITY_TIERS.find(t => t >= quantity) ?? 2500
  const base2x2 = BASE_PRICES_2x2[tier]
  const sizeAdjusted = Math.round(base2x2 * SIZE_MULTIPLIERS[size])
  const materialAdjusted = Math.round(sizeAdjusted * 1.60) // Spot UV fixed multiplier
  const embossingAddon = calculateEmbossingAddon(size, quantity, layers)
  const subtotal = materialAdjusted + embossingAddon
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
