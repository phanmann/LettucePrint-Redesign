/** Provisional merchandise-only retail prices. No shipping or tax included. */
export const tentNames = { '10x10': '10×10 Canopy Tent', '20x10': '20×10 Canopy Tent' } as const
export type TentSize = keyof typeof tentNames
export interface TentConfiguration {
  package?: 'full-kit' | 'top-only' | 'frame-only'
  size: TentSize
  backwall: 'none' | 'single' | 'double'
  sides: 'none' | 'half-single' | 'half-double' | 'full-single' | 'full-double'
  flagHolders: '0' | '1' | '2'
  wheelBag: boolean
  production: 'standard' | 'next-day'
}
export const tentDefaults: Omit<TentConfiguration, 'size'> = { package: 'full-kit', backwall: 'none', sides: 'none', flagHolders: '0', wheelBag: false, production: 'standard' }
export function calculateTentPrice(input: unknown, quantity: number) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('Invalid tent configuration')
  const c = input as TentConfiguration
  const keys = ['size', 'backwall', 'sides', 'flagHolders', 'wheelBag', 'production', 'package']
  if (Object.keys(c).length !== (c.package === undefined ? keys.length - 1 : keys.length) || Object.keys(c).some(k => !keys.includes(k)) ||
      (c.package !== undefined && !['full-kit', 'top-only', 'frame-only'].includes(c.package)) ||
      !['10x10', '20x10'].includes(c.size) || !['none', 'single', 'double'].includes(c.backwall) ||
      !['none', 'half-single', 'half-double', 'full-single', 'full-double'].includes(c.sides) ||
      !['0', '1', '2'].includes(c.flagHolders) || typeof c.wheelBag !== 'boolean' ||
      !['standard', 'next-day'].includes(c.production) || !Number.isSafeInteger(quantity) || quantity < 1) {
    throw new Error('Invalid tent configuration or quantity')
  }
  if (c.package && c.package !== 'full-kit' && (c.backwall !== 'none' || c.sides !== 'none' || c.flagHolders !== '0' || c.wheelBag || c.production !== 'standard')) throw new Error('Replacement packages support standard production only, without accessories')
  const large = c.size === '20x10'
  const subtotal = (c.package === 'top-only' ? large ? 849 : 429 : c.package === 'frame-only' ? large ? 859 : 429 : large ? 1419 : 789) +
    ({ none: 0, single: large ? 579 : 289, double: large ? 1149 : 579 })[c.backwall] +
    ({ none: 0, 'half-single': 349, 'half-double': 679, 'full-single': 579, 'full-double': 1149 })[c.sides] +
    ({ '0': 0, '1': 89, '2': 169 })[c.flagHolders] + (c.wheelBag ? large ? 99 : 89 : 0)
  // Integer arithmetic: round UP to the next whole-dollar price ending in 9.
  const unitPriceCents = c.production === 'standard' ? subtotal * 100 :
    (Math.ceil((subtotal * (large ? 130 : 140) - 900) / 1000) * 10 + 9) * 100
  const totalCents = unitPriceCents * quantity
  if (!Number.isSafeInteger(totalCents) || totalCents > 99999999) throw new Error('Tent order exceeds checkout amount limit')
  return { unitPriceCents, totalCents }
}
export function tentDescription(c: TentConfiguration) {
  if (c.package === 'top-only') return 'Replacement printed fabric top only; frame and accessories not included'
  if (c.package === 'frame-only') return 'Replacement frame only; printed fabric top and accessories not included'
  return `Full printed tent with frame; backwall: ${c.backwall}; sides (pair): ${c.sides}; flag holders: ${c.flagHolders}; premium wheel bag: ${c.wheelBag ? 'yes' : 'no'}`
}
export function tentMaterial(c: TentConfiguration) {
  return c.package === 'top-only' ? 'Printed fabric top only' : c.package === 'frame-only' ? 'Frame only (no print)' : 'Printed canopy with frame'
}
export function isValidatedTentFrame(item: Parameters<typeof authoritativeTentPrice>[0]) {
  try { return item.tentConfiguration !== undefined && (item.tentConfiguration as TentConfiguration).package === 'frame-only' && authoritativeTentPrice(item) !== null } catch { return false }
}
export function isTentItem(item: { product?: string; productPath?: string; tentConfiguration?: unknown }) {
  return item.tentConfiguration !== undefined || /tent/i.test(item.product ?? '') || /\/tents(?:\/|$)/.test(item.productPath ?? '')
}
export function authoritativeTentPrice(item: { product: string; productPath?: string; size: string; qty: number; rush: string; totalCents: number; unitPriceCents?: number; tentConfiguration?: unknown }) {
  if (!isTentItem(item)) return null
  const price = calculateTentPrice(item.tentConfiguration, item.qty)
  const c = item.tentConfiguration as TentConfiguration
  if (item.product !== tentNames[c.size] || item.size !== c.size || item.rush !== c.production ||
      item.totalCents !== price.totalCents || (item.unitPriceCents !== undefined && item.unitPriceCents !== price.unitPriceCents)) {
    throw new Error('Tent price or configuration changed. Reconfigure your tent before checkout.')
  }
  return { ...price, description: tentDescription(c), material: tentMaterial(c), productionLabel: c.package === 'frame-only' ? 'Standard fulfillment — timing confirmed after order' : c.production === 'standard' ? 'Standard production — timing confirmed after proof approval' : 'Next-day production after proof approval (not delivery)' }
}
