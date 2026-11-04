// Customer prices for postcards, flyers and brochures.
// Paper Strategies cost × 1.5, rounded up to a price ending in 9 (Steve, 2026-11-04).
// Source and cost evidence: launch/LP-PSI-PRICING-20261104/PSI-PRICING.md

export const PRINT_QUANTITIES = [100, 250, 500, 1000] as const
export type PrintQuantity = (typeof PRINT_QUANTITIES)[number]

export const POSTCARDS_PRODUCT = 'Postcards'
export const FLYERS_PRODUCT = 'Flyers'
export const BI_FOLD_PRODUCT = 'Bi-Fold Brochure'
export const TRI_FOLD_PRODUCT = 'Tri-Fold Brochure'

export const POSTCARD_SIZES = ['4" × 6"', '5" × 7"', '6" × 9"'] as const
export const FLAT_SHEET_SIZES = ['8.5" × 11"', '11" × 17"', '12" × 18"'] as const
export const PRINT_STOCKS = ['Standard', 'Premium'] as const

const POSTCARD_PRICES: Record<PrintQuantity, number> = { 100: 49, 250: 79, 500: 109, 1000: 199 }
const LETTER_SHEET_PRICES: Record<PrintQuantity, number> = { 100: 49, 250: 119, 500: 229, 1000: 459 }
const LARGE_SHEET_PRICES: Record<PrintQuantity, number> = { 100: 99, 250: 229, 500: 459, 1000: 909 }

/** Price table (whole dollars) for a product and size; same for Standard and Premium stock. */
export function printPriceTable(product: string, size: string): Record<PrintQuantity, number> | null {
  if (product === POSTCARDS_PRODUCT) {
    return (POSTCARD_SIZES as readonly string[]).includes(size) ? POSTCARD_PRICES : null
  }
  if ([FLYERS_PRODUCT, BI_FOLD_PRODUCT, TRI_FOLD_PRODUCT].includes(product)) {
    if (size === FLAT_SHEET_SIZES[0]) return LETTER_SHEET_PRICES
    if ((FLAT_SHEET_SIZES as readonly string[]).includes(size)) return LARGE_SHEET_PRICES
  }
  return null
}

/** Rows for ProductOrderPage pricing tables. */
export function printPricingRows(product: string, size: string) {
  const table = printPriceTable(product, size)
  if (!table) throw new Error(`No print pricing for ${product} ${size}`)
  return PRINT_QUANTITIES.map(qty => ({ qty, standardPrice: table[qty] }))
}

/**
 * Server-side price in cents for checkout, or null when the item is not one of these products.
 * Throws when the item claims to be one of these products but its configuration is not priced.
 */
export function authoritativePrintPrice(item: {
  product: string
  size: string
  qty: number
  material: string
  rush: string
}): number | null {
  if (![POSTCARDS_PRODUCT, FLYERS_PRODUCT, BI_FOLD_PRODUCT, TRI_FOLD_PRODUCT].includes(item.product)) return null
  const table = printPriceTable(item.product, item.size)
  const stockOk = PRINT_STOCKS.some(stock => item.material === stock || item.material.startsWith(`${stock} stock`))
  const qty = item.qty as PrintQuantity
  if (!table || !stockOk || !PRINT_QUANTITIES.includes(qty) || item.rush !== 'standard') {
    throw new Error(`Invalid ${item.product} configuration`)
  }
  return table[qty] * 100
}
