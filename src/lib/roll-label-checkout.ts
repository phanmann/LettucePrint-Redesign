import {
  calculateRollLabelPrice,
  isLabelFinish,
  isLabelMaterial,
} from '@/lib/roll-label-pricing'

export interface RollLabelCheckoutConfiguration {
  product: string
  size: string
  qty: number
  material: string
  finish: string
  rush: string
}

const ROLL_LABEL_PRODUCT_NAMES = ['Custom Roll Labels', 'Roll Labels']

export function parseRollLabelDimensions(size: string): { width: number; height: number } {
  const match = size.trim().match(/^([0-9]+(?:\.[0-9]+)?)\s*(?:"|in)?\s*[×x]\s*([0-9]+(?:\.[0-9]+)?)\s*(?:"|in)?$/i)
  if (!match) throw new Error('Invalid roll label dimensions')
  return { width: Number(match[1]), height: Number(match[2]) }
}

export function authoritativeRollLabelPrice(item: RollLabelCheckoutConfiguration): number | null {
  if (!ROLL_LABEL_PRODUCT_NAMES.includes(item.product)) return null
  if (item.rush !== 'standard') throw new Error('Invalid roll label production speed')
  if (!isLabelMaterial(item.material)) throw new Error('Invalid roll label material')
  if (!isLabelFinish(item.finish)) throw new Error('Invalid roll label finish')

  const { width, height } = parseRollLabelDimensions(item.size)
  return calculateRollLabelPrice(width, height, item.qty, item.material, item.finish).totalCents
}
