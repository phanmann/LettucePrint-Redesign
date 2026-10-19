export type Garment = { supply: string; type: string; brand: string; color: string; quantity: number; sizes: string; condition: string }
export type Placement = { location: string; artwork: string; width: string; height: string; recommendSize: boolean; method: string; garments: number[]; personalization: string }
export type EmbroideryRequest = {
  contact: { name: string; email: string; company: string; phone: string }
  dueDate: string; flexible: boolean; firmDeadline: boolean
  fulfillment: string; zip: string
  garments: Garment[]; placements: Placement[]
  repeatJob: boolean; orderReference: string; machineFile: string
  threadRequirements: string; notes: string
}
const str = (v: unknown, max = 300) => typeof v === 'string' && v.length <= max
const nonempty = (v: unknown, max = 300) => str(v, max) && !!(v as string).trim()
const oneOf = (v: unknown, values: string[]) => values.includes(v as string)
export function validateEmbroidery(v: unknown): v is EmbroideryRequest {
  if (!v || typeof v !== 'object' || Array.isArray(v)) return false
  const x = v as EmbroideryRequest
  const c = x.contact
  if (!c || !nonempty(c.name) || !nonempty(c.email) || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(c.email) || !str(c.company) || !str(c.phone)) return false
  if (!str(x.dueDate, 10) || (x.dueDate && !/^\d{4}-\d{2}-\d{2}$/.test(x.dueDate)) || typeof x.flexible !== 'boolean' || typeof x.firmDeadline !== 'boolean' || (x.firmDeadline && !x.dueDate)) return false
  if (!oneOf(x.fulfillment, ['pickup','shipping','unsure']) || !str(x.zip, 12) || (x.fulfillment === 'shipping' && !/^\d{5}(?:-\d{4})?$/.test(x.zip))) return false
  if (!Array.isArray(x.garments) || !x.garments.length || x.garments.length > 12 || !x.garments.every((g: Garment) => g && oneOf(g.supply,['lettuce-print','customer','help']) && nonempty(g.type) && str(g.brand,500) && str(g.color) && Number.isInteger(g.quantity) && g.quantity > 0 && g.quantity <= 100000 && str(g.sizes,500) && oneOf(g.condition,['new','worn','unsure']))) return false
  const dimension = (value: string) => /^(?:[0-9]{1,2}(?:\.[0-9]{1,2})?|100(?:\.0{1,2})?)$/.test(value) && Number(value) > 0
  if (!Array.isArray(x.placements) || !x.placements.length || x.placements.length > 12 || !x.placements.every((p: Placement) => p && nonempty(p.location) && oneOf(p.artwork,['yes','no','help']) && str(p.width,20) && str(p.height,20) && typeof p.recommendSize === 'boolean' && (p.recommendSize || (dimension(p.width) && dimension(p.height))) && oneOf(p.method,['flat','puff','patch','help']) && Array.isArray(p.garments) && p.garments.length > 0 && new Set(p.garments).size === p.garments.length && p.garments.every(i => Number.isInteger(i) && i >= 0 && i < x.garments.length) && str(p.personalization,1000))) return false
  return typeof x.repeatJob === 'boolean' && str(x.orderReference) && oneOf(x.machineFile,['yes','no','unsure']) && str(x.threadRequirements,1000) && str(x.notes,4000)
}
