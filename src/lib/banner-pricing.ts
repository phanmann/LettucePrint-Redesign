/** Customer retail pricing only. All dimensions are inches. */
export type BannerKind = 'vinyl' | 'double-sided'
export interface BannerConfiguration {
  kind: BannerKind
  width: number
  height: number
  quantity: number
  grommets: '24' | 'corners' | '12'
  pockets: 'none' | 'instead' | 'with'
  pocketSize: 2 | 3 | 4
  edge: 'hem' | 'webbing' | 'rings' | 'rope'
  windSlits: boolean
  poleKit: boolean
  turnaround: 'standard' | 'rush'
}
export const defaultBannerConfiguration = (kind: BannerKind): BannerConfiguration => ({
  kind, width: 24, height: 36, quantity: 1, grommets: '24', pockets: 'none', pocketSize: 3,
  edge: 'hem', windSlits: false, poleKit: false, turnaround: 'standard',
})
export const bannerNames = { vinyl: 'Vinyl Banner', 'double-sided': 'Double-Sided Banner' }
export const bannerMaterials = { vinyl: '13 oz matte vinyl (indoor/outdoor)', 'double-sided': '18 oz blockout vinyl, matte both sides' }
export const bannerTurnarounds = {
  standard: 'Ships 3 business days after proof approval + UPS transit',
  rush: 'Rush: next-day production after proof approval; requires expedited shipping',
}
const money = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100
export function calculateBannerPrice(c: BannerConfiguration) {
  const invalid = !c || !['vinyl', 'double-sided'].includes(c.kind) ||
    !Number.isFinite(c.width) || !Number.isFinite(c.height) || c.width < 12 || c.height <= 0 ||
    !Number.isInteger(c.quantity) || c.quantity < 1 ||
    !['24', 'corners', '12'].includes(c.grommets) || !['none', 'instead', 'with'].includes(c.pockets) ||
    ![2, 3, 4].includes(c.pocketSize) || !['hem', 'webbing', 'rings', 'rope'].includes(c.edge) ||
    !['standard', 'rush'].includes(c.turnaround) ||
    typeof c.windSlits !== 'boolean' || typeof c.poleKit !== 'boolean' ||
    (c.kind === 'double-sided' && c.edge === 'rope') ||
    (c.poleKit && (c.kind !== 'double-sided' || c.width > 36 || c.pockets !== 'instead' || c.pocketSize !== 3))
  const sqft = c.width * c.height / 144
  const quoteReason = invalid ? 'Enter valid dimensions and options (minimum width 12 in).' :
    c.width > 126 ? 'Widths over 126 in require a custom quote.' :
    sqft > 100 ? 'Banners over 100 sq ft require a custom quote.' :
    c.quantity >= 50 ? 'Orders of 50 or more require a custom quote.' : null
  if (quoteReason) return { quoteReason, sqft, baseUnit: 0, addons: 0, discount: 0, subtotal: 0, adjustment: 0, totalCents: 0 }
  const large = sqft > 24
  const baseUnit = c.kind === 'vinyl' ? Math.max(39, Math.ceil(24 + 2.3 * sqft - 1e-9)) : Math.max(59, Math.ceil(29 + 5 * sqft - 1e-9))
  // Combined pockets + grommets include standard spacing; 12-inch spacing remains an upgrade.
  const grommets = c.pockets !== 'instead' && c.grommets === '12' ? (large ? 20 : 10) : 0
  const pockets = c.poleKit || c.pockets === 'none' ? 0 : c.pockets === 'instead' ? (large ? 15 : 10) : (large ? 25 : 15)
  const perimeter = 2 * (c.width + c.height) / 12
  const edge = c.edge === 'webbing' ? perimeter * 2 : c.edge === 'rings' ? perimeter * 2 + 30 : c.edge === 'rope' ? perimeter * 2.5 : 0
  const addons = money(grommets + pockets + edge + (c.poleKit ? 119 : 0))
  const discount = c.quantity >= 25 ? .2 : c.quantity >= 10 ? .15 : c.quantity >= 5 ? .1 : c.quantity >= 2 ? .05 : 0
  const subtotal = money((baseUnit + addons) * c.quantity * (1 - discount))
  const subtotalCents = Math.round(subtotal * 100)
  const totalCents = c.turnaround === 'rush' ? subtotalCents + Math.max(2500, Math.round(subtotalCents * 40 / 100)) : subtotalCents
  const adjustment = (totalCents - subtotalCents) / 100
  return { quoteReason: null, sqft, baseUnit, addons, discount, subtotal, adjustment, totalCents }
}
export function bannerFinishing(c: BannerConfiguration): string {
  const spacing = c.grommets === 'corners' ? 'corners only' : `every ${c.grommets} in`
  const pockets = c.pockets === 'none' ? `Grommets ${spacing}` : `${c.pocketSize} in pole pockets top & bottom; ${c.pockets === 'instead' ? 'no grommets' : `grommets ${spacing}`}`
  const edges = { hem: 'Standard hem', webbing: 'Webbing', rings: 'Webbing + D-rings', rope: 'Rope in hem' }
  return [pockets, edges[c.edge], c.windSlits ? 'Wind slits requested (free)' : 'No wind slits', ...(c.poleKit ? ['Pole-mount kit (pocket charge included)'] : [])].join(' · ')
}
