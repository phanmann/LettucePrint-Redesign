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

// ─── Markup & Volume Discounts ─────────────────────────────────────────────
const BASE_MARKUP = 2.2             // 2.2× cost = ~55% gross margin

const VOLUME_DISCOUNTS: Array<{ minQty: number; discount: number; label: string }> = [
  { minQty: 25000, discount: 0.18, label: 'Maximum discount' },
  { minQty: 10000, discount: 0.12, label: 'Popular choice' },
  { minQty: 5000,  discount: 0.07, label: 'Standard volume' },
  { minQty: 1000,  discount: 0.03, label: 'Entry tier' },
  { minQty: 0,     discount: 0,    label: 'Base price' },
]

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
  volumeDiscount: number
  volumeLabel: string
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

  const facestockRollsNeeded = Math.ceil(quantity / labelsPerFacestockRoll)

  // ── Facestock cost ──
  const facestockCostCents = facestockRollsNeeded * FACESTOCK_ROLL_COST[material]

  // ── Laminate cost (matte and gloss always laminated; 'laminate' is an upgrade option) ──
  let laminateRollsNeeded: number | null = null
  let laminateCostCents = 0

  if (finish === 'matte' || finish === 'gloss') {
    const labelsAroundPerLaminateRoll = Math.floor(
      LAMINATE_ROLL_LENGTH_IN / (heightIn + GAP_AROUND_IN)
    )
    const labelsPerLaminateRoll = labelsAcross * labelsAroundPerLaminateRoll
    laminateRollsNeeded = Math.ceil(quantity / labelsPerLaminateRoll)
    laminateCostCents = laminateRollsNeeded * LAMINATE_ROLL_COST
  }

  // ── Ink cost ──
  const sqInPerLabel = widthIn * heightIn
  const inkCostCents = Math.round(sqInPerLabel * INK_COST_PER_SQ_IN * 100) * quantity

  // ── Total cost ──
  const totalCostCents = facestockCostCents + laminateCostCents + inkCostCents

  // ── Volume discount ──
  const volumeTier = VOLUME_DISCOUNTS.find(t => quantity >= t.minQty)!
  const discount = volumeTier.discount

  // ── Sell price ──
  const basePrice = Math.round(totalCostCents * BASE_MARKUP)
  const discountedPrice = Math.round(basePrice * (1 - discount))

  const unitCents = Math.round(discountedPrice / quantity)

  return {
    totalCents: discountedPrice,
    unitCents,
    totalFormatted: formatCents(discountedPrice),
    unitFormatted: formatCents(unitCents),
    costCents: totalCostCents,
    markupMultiplier: BASE_MARKUP,
    volumeDiscount: discount,
    volumeLabel: volumeTier.label,
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
