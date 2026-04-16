// Lettuce Print — Sticker Pricing Engine
// Base: 2x2 standard sticker at each quantity tier
// All prices in USD cents to avoid floating point issues

export type StickerSize = '1x1' | '2x2' | '3x3' | '4x4' | '5x5'
export type StickerMaterial = 'standard' | 'holographic' | 'spot-uv'
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
  'spot-uv':     1.60,
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
  'spot-uv':     'Spot UV',
}

export const MATERIAL_DESCRIPTIONS: Record<StickerMaterial, string> = {
  'standard':    'Durable white vinyl. Matte or gloss finish. Weather resistant.',
  'holographic': 'Eye-catching rainbow effect. Premium iridescent vinyl.',
  'spot-uv':     'Standard vinyl + UV-cured clear coat for a premium tactile finish.',
}

export const FINISH_LABELS: Record<StickerFinish, string> = {
  'matte':    'Matte',
  'gloss':    'Gloss',
  'laminate': 'Laminate (+$0.40/sq in)',
}
