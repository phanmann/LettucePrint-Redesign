// Lettuce Print — Standard Business Card Pricing Engine
// Cost basis from PSI supplier (Tango 14pt/16pt C2S White)
// 14pt: 40% markup | 16pt: 42% markup
// Single-sided and double-sided are the same price

export type CardFinish = 'matte' | 'gloss'
export type CardWeight = '14pt' | '16pt'

// Quantity tiers
export const QUANTITY_TIERS = [50, 100, 250, 500, 1000]

// ── 14pt Cost from supplier (cents) ──
const COST_14PT_CENTS: Record<number, number> = {
  50:   2500,  // $25.00
  100:  2500,  // $25.00
  250:  3000,  // $30.00
  500:  3500,  // $35.00
  1000: 4500,  // $45.00
}

// ── 16pt Cost from supplier (cents) ──
// Same base costs as 14pt, but 42% markup instead of 40%
const COST_16PT_CENTS: Record<number, number> = {
  50:   2500,  // $25.00
  100:  2500,  // $25.00
  250:  3000,  // $30.00
  500:  3500,  // $35.00
  1000: 4500,  // $45.00
}

// Markup percentages
const MARKUP_14PT = 0.40  // 40%
const MARKUP_16PT = 0.45  // 45%

// Finish labels & descriptions
export const FINISH_LABELS: Record<CardFinish, string> = {
  'matte': 'Matte',
  'gloss': 'Gloss',
}

export const FINISH_DESCRIPTIONS: Record<CardFinish, string> = {
  'matte': 'Smooth, non-reflective finish. Clean and modern look.',
  'gloss': 'High-shine UV coating. Colors pop, great for photos and bold designs.',
}

export const WEIGHT_LABELS: Record<CardWeight, string> = {
  '14pt': '14 pt',
  '16pt': '16 pt',
}

export const WEIGHT_DESCRIPTIONS: Record<CardWeight, string> = {
  '14pt': 'Lightweight and economical.',
  '16pt': 'Standard weight — sturdy and professional.',
}

export interface PriceResult {
  totalCents: number
  unitCents: number
  totalFormatted: string
  unitFormatted: string
}

export function calculatePrice(
  quantity: number,
  finish: CardFinish,
  weight: CardWeight
): PriceResult {
  // Find the appropriate tier
  const tier = QUANTITY_TIERS.find(t => t >= quantity) ?? 1000

  // Get base cost for weight
  const cost = weight === '14pt' ? COST_14PT_CENTS[tier] : COST_16PT_CENTS[tier]

  // Apply markup
  const markup = weight === '14pt' ? MARKUP_14PT : MARKUP_16PT
  const sellPrice = Math.round(cost * (1 + markup))

  // Unit price
  const unitCents = Math.round(sellPrice / tier)

  return {
    totalCents: sellPrice,
    unitCents,
    totalFormatted: formatCents(sellPrice),
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
  finish: CardFinish,
  weight: CardWeight
) {
  return QUANTITY_TIERS.map(qty => {
    const result = calculatePrice(qty, finish, weight)
    // Calculate savings vs 50-unit price per unit
    const baseUnit = calculatePrice(50, finish, weight).unitCents
    const savingsPct = Math.round(((baseUnit - result.unitCents) / baseUnit) * 100)
    return {
      qty,
      totalFmt: result.totalFormatted,
      save: savingsPct,
    }
  })
}
