/** Dormant integration boundary; no existing customer flow imports this module yet.
 * Custom routes must pass local HTTP acceptance before this is wired into calculators.
 * SDK installation and pinned Medusa API verification remain blocked; use fetch only here.
 */
export const commerceBackend = process.env.NEXT_PUBLIC_COMMERCE_BACKEND === 'medusa' ? 'medusa' : 'legacy'
export type PrintEngine = 'sticker' | 'spot-uv' | 'roll-label' | 'business-card' | 'premium-business-card'
export interface PrintQuote {
  engine: PrintEngine
  currencyCode: 'usd'
  unitPriceCents: number
  totalCents: number
  normalizedConfig: Record<string, unknown>
  breakdown: { printedUnitCents: number; rushFeeCents: number }
  display: { summary: string; directionSummary?: string }
}
export async function fetchPrintQuote(engine: PrintEngine, config: Record<string, unknown>, signal?: AbortSignal): Promise<PrintQuote> {
  if (commerceBackend !== 'medusa') throw new Error('Medusa integration is disabled')
  const origin = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
  const key = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
  if (!origin || !key) throw new Error('Local Medusa configuration is incomplete')
  const response = await fetch(`${origin.replace(/\/$/,'')}/store/print-quote`, {
    method:'POST', headers:{'content-type':'application/json','x-publishable-api-key':key},
    body:JSON.stringify({engine,config}), cache:'no-store', signal,
  })
  if (!response.ok) throw new Error('Unable to quote this print configuration')
  return response.json() as Promise<PrintQuote>
}
