/** Display-only average; never used to calculate or charge an order. */
export function unitPriceLabel(totalCents: number, quantity: number, unit = 'unit') {
  if (!Number.isFinite(totalCents) || !Number.isFinite(quantity) || quantity <= 0) return ''
  const value = (totalCents / 100 / quantity).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })
  return `${value} / ${unit}`
}
