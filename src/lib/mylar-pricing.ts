export const MYLAR_PRODUCT = 'Standard Mylar Bag'
export const MYLAR_SIZE = '4 x 5 in. (eighth)'
export const MYLAR_REGULAR = 'Standard zipper'
export const MYLAR_CR = 'Child-resistant zipper'
export const MYLAR_GLOSS = 'Gloss'
export const MYLAR_MATTE = 'Matte'
export const MYLAR_SOFT_TOUCH = 'Soft-Touch'

const BASE_PRICE_CENTS: Record<number, number> = {
  1000: 120000,
  3000: 140000,
  5000: 155000,
}

export function mylarPriceCents(config: {
  size: string
  qty: number
  material: string
  finish: string
  rush: string
}): number {
  const base = BASE_PRICE_CENTS[config.qty]
  if (
    !base || config.size !== MYLAR_SIZE ||
    ![MYLAR_REGULAR, MYLAR_CR].includes(config.material) ||
    ![MYLAR_GLOSS, MYLAR_MATTE, MYLAR_SOFT_TOUCH].includes(config.finish) ||
    config.rush !== 'standard'
  ) {
    throw new Error('Invalid Mylar bag configuration')
  }
  return base + (config.material === MYLAR_CR ? 7500 : 0) +
    (config.finish === MYLAR_SOFT_TOUCH ? 5000 : 0)
}

export function authoritativeMylarPrice(item: {
  product: string
  size: string
  qty: number
  material: string
  finish: string
  rush: string
}): number | null {
  return item.product === MYLAR_PRODUCT ? mylarPriceCents(item) : null
}
