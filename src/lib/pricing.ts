// Lettuce Print — customer-facing sticker pricing
// Source: authenticated Paper Strategies "Lettuce | Stickers" calculator,
// validated 2026-09-03. Portal amounts are supplier cost.
// Approved sell rule: supplier cost × 1.40 (40% markup).

export type StickerSize = '1x1' | '2x2' | '3x3' | '4x4' | '5x5'
export type StickerMaterial = 'standard' | 'holographic'
export type StickerFinish = 'matte' | 'gloss' | 'laminate'
export type RushOption = 'standard' | '48hr' | '24hr'
export type SpotUVHits = 1 | 2 | 3

export const QUANTITY_TIERS = [50, 100, 250, 500, 1000, 2500]

// Pricing is linear after Paper Strategies' $50 minimum, so the old displayed
// tier-discount percentages were not truthful and are intentionally disabled.
export const TIER_DISCOUNTS: Record<number, number> = Object.fromEntries(
  QUANTITY_TIERS.map(quantity => [quantity, 0])
)

export const SIZE_SQ_IN: Record<StickerSize, number> = {
  '1x1': 1,
  '2x2': 4,
  '3x3': 9,
  '4x4': 16,
  '5x5': 25,
}

export const SIZE_LABELS: Record<StickerSize, string> = {
  '1x1': '1" × 1"',
  '2x2': '2" × 2"',
  '3x3': '3" × 3"',
  '4x4': '4" × 4"',
  '5x5': '5" × 5"',
}

export const MATERIAL_LABELS: Record<StickerMaterial, string> = {
  standard: 'Standard Vinyl',
  holographic: 'Holographic',
}

export const MATERIAL_DESCRIPTIONS: Record<StickerMaterial, string> = {
  standard: 'Durable white permanent vinyl. Weather resistant.',
  holographic: 'Eye-catching rainbow effect on premium iridescent vinyl.',
}

export const FINISH_LABELS: Record<StickerFinish, string> = {
  matte: 'Matte',
  gloss: 'Gloss',
  laminate: 'Protective Laminate',
}

export const FINISH_DESCRIPTIONS: Record<StickerFinish, string> = {
  matte: 'Smooth, non-reflective appearance.',
  gloss: 'Bright, high-shine appearance.',
  laminate: 'Added protective layer for greater durability.',
}

export const SPOT_UV_HIT_OPTIONS: SpotUVHits[] = [1, 2, 3]
export const SPOT_UV_HIT_LABELS: Record<SpotUVHits, string> = {
  1: '1 Clear UV Hit',
  2: '2 Clear UV Hits',
  3: '3 Clear UV Hits',
}

// Paper Strategies calculator rates, in cents per square inch per sticker.
// The portal rounds supplier cost to cents, with a $50.00 minimum.
const SUPPLIER_MINIMUM_CENTS = 5000
const CUSTOMER_MARKUP_NUMERATOR = 140
const CUSTOMER_MARKUP_DENOMINATOR = 100
const SUPPLIER_RATE_CENTS = {
  standard: 2.13,
  standardLaminate: 2.38,
  holographic: 7.5,
  spotUv1: 4.1,
  spotUv2: 5.5,
  spotUv3: 6.9,
} as const

// Paper Strategies' separate "Lamination Required" option adds $0.006/unit.
// This applies when holographic is paired with our laminate finish. Standard
// laminate has its own authoritative material rate above.
const LAMINATION_ADDON_CENTS_PER_STICKER = 0.6

const RUSH_FEES: Record<RushOption, number> = {
  standard: 0,
  '48hr': 20000,
  '24hr': 30000,
}

export const RUSH_LABELS: Record<RushOption, string> = {
  standard: 'Standard (3–5 business days)',
  '48hr': '48-Hour Rush (+$200)',
  '24hr': '24-Hour Rush (+$300)',
}

export interface PriceResult {
  supplierCostCents: number
  totalCents: number
  unitCents: number
  totalFormatted: string
  unitFormatted: string
  rushFeeCents: number
  baseBeforeRush: number
}

function validateInputs(width: number, height: number, quantity: number) {
  if (!Number.isFinite(width) || !Number.isFinite(height) || width < 0.5 || height < 0.5) {
    throw new Error('Sticker dimensions must be at least 0.5 inches')
  }
  if (width > 52 || height > 240) {
    throw new Error('Sticker dimensions exceed supplier limits')
  }
  if (!Number.isInteger(quantity) || quantity < 50) {
    throw new Error('Sticker quantity must be an integer of at least 50')
  }
}

function supplierCostCents(
  width: number,
  height: number,
  quantity: number,
  rateCents: number,
  addonCents = 0
): number {
  validateInputs(width, height, quantity)
  const calculated = Math.round(width * height * quantity * rateCents + addonCents)
  return Math.max(SUPPLIER_MINIMUM_CENTS, calculated)
}

function sellPriceFromSupplierCost(costCents: number): number {
  return Math.round(costCents * CUSTOMER_MARKUP_NUMERATOR / CUSTOMER_MARKUP_DENOMINATOR)
}

function resultFromSupplierCost(costCents: number, quantity: number, rush: RushOption): PriceResult {
  const baseBeforeRush = sellPriceFromSupplierCost(costCents)
  const rushFeeCents = RUSH_FEES[rush]
  const totalCents = baseBeforeRush + rushFeeCents
  const unitCents = Math.round(totalCents / quantity)
  return {
    supplierCostCents: costCents,
    totalCents,
    unitCents,
    totalFormatted: formatCents(totalCents),
    unitFormatted: formatCents(unitCents),
    rushFeeCents,
    baseBeforeRush,
  }
}

export function calculateCustomStickerPrice(
  width: number,
  height: number,
  quantity: number,
  material: StickerMaterial,
  finish: StickerFinish,
  rush: RushOption = 'standard'
): PriceResult {
  const rate = material === 'holographic'
    ? SUPPLIER_RATE_CENTS.holographic
    : finish === 'laminate'
      ? SUPPLIER_RATE_CENTS.standardLaminate
      : SUPPLIER_RATE_CENTS.standard
  const laminationAddon = material === 'holographic' && finish === 'laminate'
    ? Math.round(quantity * LAMINATION_ADDON_CENTS_PER_STICKER)
    : 0
  const cost = supplierCostCents(width, height, quantity, rate, laminationAddon)
  return resultFromSupplierCost(cost, quantity, rush)
}

export function calculatePrice(
  size: StickerSize,
  quantity: number,
  material: StickerMaterial,
  finish: StickerFinish,
  rush: RushOption
): PriceResult {
  const [width, height] = size.split('x').map(Number)
  return calculateCustomStickerPrice(width, height, quantity, material, finish, rush)
}

export function calculateCustomSpotUVPrice(
  width: number,
  height: number,
  quantity: number,
  hits: SpotUVHits,
  rush: RushOption = 'standard'
): PriceResult {
  const rate = hits === 1
    ? SUPPLIER_RATE_CENTS.spotUv1
    : hits === 2
      ? SUPPLIER_RATE_CENTS.spotUv2
      : SUPPLIER_RATE_CENTS.spotUv3
  const cost = supplierCostCents(width, height, quantity, rate)
  return resultFromSupplierCost(cost, quantity, rush)
}

export function calculateSpotUVPrice(
  size: StickerSize,
  quantity: number,
  hits: SpotUVHits,
  rush: RushOption
): PriceResult {
  const [width, height] = size.split('x').map(Number)
  return calculateCustomSpotUVPrice(width, height, quantity, hits, rush)
}

export function getQuantityBreaks(
  size: StickerSize,
  material: StickerMaterial,
  finish: StickerFinish
) {
  return QUANTITY_TIERS.map(qty => {
    const result = calculatePrice(size, qty, material, finish, 'standard')
    return { qty, total: result.totalFormatted, unit: result.unitFormatted, savingsPct: 0 }
  })
}

export function getSpotUVQuantityBreaks(size: StickerSize, hits: SpotUVHits) {
  return QUANTITY_TIERS.map(qty => {
    const result = calculateSpotUVPrice(size, qty, hits, 'standard')
    return { qty, total: result.totalFormatted, unit: result.unitFormatted, savingsPct: 0 }
  })
}

export function formatCents(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(cents / 100)
}
