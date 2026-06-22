// Lettuce Print — Roll Label Pricing Engine
// Based on Total Press / Callisto press specs
// All prices in USD cents to avoid floating point issues

export type LabelMaterial = 'standard' | 'bopp'
export type LabelFinish = 'matte' | 'gloss'

// ─── Press Constants ───────────────────────────────────────────────────────
const ROLL_WIDTH_IN = 12.25          // inches across
const GAP_ACROSS_IN = 0.25          // gap between labels across
const GAP_AROUND_IN = 0.25          // gap between labels around
const FACESTOCK_ROLL_LENGTH_IN = 30000  // 2,500 ft in inches
const LAMINATE_ROLL_LENGTH_IN = 24000   // 2,000 ft in inches

// ─── Material Roll Costs (in cents) ────────────────────────────────────────
const FACESTOCK_ROLL_COST: Record<LabelMaterial, number> = {
  'standard': 43400,   // $434 / roll — Matte Paper
  'bopp':     108700,  // $1,087 / roll — BOPP Premium
}
const LAMINATE_ROLL_COST = 33800     // $338 / roll

// ─── Ink Cost ──────────────────────────────────────────────────────────────
const INK_COST_PER_SQ_IN = 0.017    // $ per sq in (fixed per Steven)

// ─── Markup Tiers (replacing flat 2.2× + volume discounts) ──────────────────
// These markups are applied to the proportional roll cost + ink cost
const MARKUP_TIERS: Array<{ minQty: number; markup: number }> = [
  { minQty: 10000, markup: 1.18 },  // 18% markup
  { minQty: 5000,  markup: 1.20 },  // 20% markup
  { minQty: 2500,  markup: 1.40 },  // 40% markup
  { minQty: 1000,  markup: 1.60 },  // 60% markup
  { minQty: 500,   markup: 2.20 },  // 120% markup
  { minQty: 250,   markup: 2.52 },  // 152% markup
]

function getMarkupForQty(quantity: number): number {
  const tier = MARKUP_TIERS.find(t => quantity >= t.minQty)
  return tier?.markup ?? 2.52
}

// ─── Preset Sizes ──────────────────────────────────────────────────────────
export interface PresetSize {
  id: string
  label: string
  width: number
  height: number
  description: string
}

export const PRESET_SIZES: PresetSize[] = [
  { id: '2x2',    label: '2" × 2"',     width: 2,    height: 2,    description: 'Square — great for jar lids, packaging' },
  { id: '3x2',    label: '3" × 2"',     width: 3,    height: 2,    description: 'Landscape — product labels, retail' },
  { id: '4x3',    label: '4" × 3"',     width: 4,    height: 3,    description: 'Large label — bottles, bags' },
  { id: '4x6',    label: '4" × 6"',     width: 4,    height: 6,    description: 'Shipping / mailing labels' },
  { id: '2x1',    label: '2" × 1"',     width: 2,    height: 1,    description: 'Small — address, barcode, price' },
  { id: '3x3',    label: '3" × 3"',     width: 3,    height: 3,    description: 'Square — food packaging, candles' },
  { id: 'custom', label: 'Custom Size',  width: 0,    height: 0,    description: 'Enter your own dimensions' },
]

// ─── Quantity Tiers for Display ─────────────────────────────────────────────
export const QUANTITY_TIERS = [250, 500, 1000, 2500, 5000, 10000, 25000]

// ─── Core Pricing Engine ────────────────────────────────────────────────────

export interface RollLabelPriceResult {
  totalCents: number
  unitCents: number
  totalFormatted: string
  unitFormatted: string
  costCents: number          // internal cost (not shown to customer)
  markupMultiplier: number
  volumeDiscount: number     // kept for UI compatibility (shows as 0 now)
  volumeLabel: string        // kept for UI compatibility
  // Roll math (not shown to customer)
  labelsAcross: number
  labelsPerFacestockRoll: number
  facestockRollsNeeded: number
  laminateRollsNeeded: number | null
}

export function calculateRollLabelPrice(
  widthIn: number,
  heightIn: number,
  quantity: number,
  material: LabelMaterial,
  finish: LabelFinish
): RollLabelPriceResult {
  // ── Roll math ──
  const labelsAcross = Math.floor(ROLL_WIDTH_IN / (widthIn + GAP_ACROSS_IN))
  const labelsAroundPerFacestockRoll = Math.floor(
    FACESTOCK_ROLL_LENGTH_IN / (heightIn + GAP_AROUND_IN)
  )
  const labelsPerFacestockRoll = labelsAcross * labelsAroundPerFacestockRoll

  // ── Proportional facestock cost (NOT whole rolls) ──
  const facestockCostPerLabel = FACESTOCK_ROLL_COST[material] / labelsPerFacestockRoll
  const facestockCostCents = Math.round(facestockCostPerLabel * quantity)

  // ── Laminate cost (proportional, NOT whole rolls) ──
  let laminateRollsNeeded: number | null = null
  let laminateCostCents = 0

  if (finish === 'matte' || finish === 'gloss') {
    const labelsAroundPerLaminateRoll = Math.floor(
      LAMINATE_ROLL_LENGTH_IN / (heightIn + GAP_AROUND_IN)
    )
    const labelsPerLaminateRoll = labelsAcross * labelsAroundPerLaminateRoll
    const laminateCostPerLabel = LAMINATE_ROLL_COST / labelsPerLaminateRoll
    laminateCostCents = Math.round(laminateCostPerLabel * quantity)
    // Calculate whole rolls needed for display only
    laminateRollsNeeded = Math.ceil(quantity / labelsPerLaminateRoll)
  }

  // ── Ink cost ──
  const sqInPerLabel = widthIn * heightIn
  const inkCostCents = Math.round(sqInPerLabel * INK_COST_PER_SQ_IN * 100) * quantity

  // ── Total cost ──
  const totalCostCents = facestockCostCents + laminateCostCents + inkCostCents

  // ── Sell price with tiered markup ──
  const markup = getMarkupForQty(quantity)
  const sellPriceCents = Math.round(totalCostCents * markup)

  const unitCents = Math.round(sellPriceCents / quantity)

  // Calculate whole rolls needed for display only
  const facestockRollsNeeded = Math.ceil(quantity / labelsPerFacestockRoll)

  return {
    totalCents: sellPriceCents,
    unitCents,
    totalFormatted: formatCents(sellPriceCents),
    unitFormatted: formatCents(unitCents),
    costCents: totalCostCents,
    markupMultiplier: markup,
    volumeDiscount: 0,  // No longer using volume discounts
    volumeLabel: 'Volume pricing',
    labelsAcross,
    labelsPerFacestockRoll,
    facestockRollsNeeded,
    laminateRollsNeeded,
  }
}

// ── Quantity break table ──
export function getRollLabelQuantityBreaks(
  widthIn: number,
  heightIn: number,
  material: LabelMaterial,
  finish: LabelFinish
) {
  return QUANTITY_TIERS.map(qty => {
    const result = calculateRollLabelPrice(widthIn, heightIn, qty, material, finish)
    return {
      qty,
      total: result.totalFormatted,
      unit: result.unitFormatted,
      discountPct: Math.round(result.volumeDiscount * 100),
      discountLabel: result.volumeLabel,
    }
  })
}

// ─── Helpers ───────────────────────────────────────────────────────────────
export function formatCents(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(cents / 100)
}

export const MATERIAL_LABELS: Record<LabelMaterial, string> = {
  'standard': 'Standard',
  'bopp':     'Premium BOPP',
}

export const MATERIAL_DESCRIPTIONS: Record<LabelMaterial, string> = {
  'standard': 'Matte paper facestock. Great for food, retail, and general product labeling.',
  'bopp':     'Biaxially-oriented polypropylene. Water-resistant, durable, professional finish.',
}

export const FINISH_LABELS: Record<LabelFinish, string> = {
  'matte': 'Matte Laminate',
  'gloss': 'Gloss Laminate',
}

export const FINISH_DESCRIPTIONS: Record<LabelFinish, string> = {
  'matte': 'Smooth, non-reflective finish. Elegant and easy to write on.',
  'gloss': 'Shiny, vibrant finish. Colors pop. Great for food & beverage.',
}
