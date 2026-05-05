// Cart types shared across the app
export interface CartItem {
  id: string           // uuid — stable across sessions
  product: string      // e.g. "Custom Die-Cut Stickers"
  size: string         // display label e.g. '3" × 3"'
  qty: number
  material: string
  finish: string
  rush: string
  totalCents: number
  totalFormatted: string
  // Artwork — optional at add-to-cart time, required before checkout
  artworkUrl?: string
  artworkFilename?: string
  // Source path so we can link back to the product configurator
  productPath: string
  addedAt: number      // Date.now()
}

export function cartItemDescription(item: CartItem): string {
  const parts = [item.size, item.material, item.finish].filter(Boolean)
  return `Qty ${item.qty} · ${parts.join(' · ')}`
}
