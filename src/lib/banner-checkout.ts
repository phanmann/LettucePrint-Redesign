import { bannerNames, calculateBannerPrice, type BannerConfiguration } from './banner-pricing'

/** Recompute retail totals server-side; never trust a client-supplied banner total. */
export function authoritativeBannerPrice(item: { product: string; qty: number; bannerConfiguration?: BannerConfiguration }): number | null {
  if (!Object.values(bannerNames).includes(item.product) && !item.bannerConfiguration) return null
  const c = item.bannerConfiguration
  if (!c || bannerNames[c.kind] !== item.product || c.quantity !== item.qty) throw new Error('Invalid banner configuration. Reconfigure this banner before checkout.')
  const result = calculateBannerPrice(c)
  if (result.quoteReason) throw new Error(result.quoteReason)
  return result.totalCents
}
