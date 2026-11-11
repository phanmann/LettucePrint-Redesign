/** Keep legacy bookmarks, saved carts and already-open quote forms compatible. */
export function toShopPath(path: string): string
export function toShopPath(path: unknown): string | undefined
export function toShopPath(path: unknown): string | undefined {
  return typeof path === 'string' ? path.replace(/^\/services(?=\/|[?#]|$)/, '/shop') : undefined
}

/** Only migrated departments have legacy CMS gallery keys. */
export function legacyServicePath(path: string): string | undefined {
  const current = toShopPath(path)
  return /^\/shop\/(apparel|graphic-design|marketing-materials|packaging|signage)(\/|$)/.test(current)
    ? current.replace(/^\/shop/, '/services') : undefined
}
