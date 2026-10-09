export const MAX_DTG_LOCATIONS = 10
export const GARMENT_TYPES = ['T-shirts', 'Hoodies', 'Sweatshirts', 'Other'] as const
export const GARMENT_SOURCES = ['Lettuce Print supplies garments', 'I supply garments'] as const

export interface DtgQuotePayload {
  formType: 'dtg'
  service: 'DTG Printing'
  source: '/services/apparel/dtg'
  garmentType: string
  quantity: string
  garmentSource: string
  garmentColor: string
  locations: { placement: string; approximateSize: string }[]
  notes: string
  inHandsDate: string
  shippingZip: string
  contact: { name: string; company: string; email: string; phone: string }
  artworkLocations: number[]
}

export function validateDtgQuote(input: unknown): { success: true; data: DtgQuotePayload } | { success: false; error: string } {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return { success: false, error: 'Invalid DTG request.' }
  const value = input as Record<string, unknown>
  const contact = value.contact && typeof value.contact === 'object' && !Array.isArray(value.contact) ? value.contact as Record<string, unknown> : {}
  const locations = Array.isArray(value.locations) ? value.locations : []
  const artworkLocations = Array.isArray(value.artworkLocations) ? value.artworkLocations : []
  const string = (item: unknown, max = 300) => typeof item === 'string' && item.trim().length > 0 && item.length <= max
  if (value.formType !== 'dtg' || value.service !== 'DTG Printing' || value.source !== '/services/apparel/dtg'
    || !GARMENT_TYPES.includes(value.garmentType as typeof GARMENT_TYPES[number])
    || !GARMENT_SOURCES.includes(value.garmentSource as typeof GARMENT_SOURCES[number])
    || !string(value.garmentColor, 100)
    || typeof value.quantity !== 'string' || !/^[1-9]\d{0,5}$/.test(value.quantity)
    || locations.length < 1 || locations.length > MAX_DTG_LOCATIONS
    || !locations.every(item => item && typeof item === 'object' && !Array.isArray(item)
      && string(item.placement, 100) && string(item.approximateSize, 100))
    || typeof value.notes !== 'string' || value.notes.length > 4000
    || !string(contact.name) || !string(contact.email) || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(contact.email as string)
    || !string(contact.phone) || typeof contact.company !== 'string' || contact.company.length > 300
    || typeof value.inHandsDate !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value.inHandsDate)
    || Number.isNaN(Date.parse(`${value.inHandsDate}T00:00:00Z`))
    || new Date(`${value.inHandsDate}T00:00:00Z`).toISOString().slice(0, 10) !== value.inHandsDate
    || typeof value.shippingZip !== 'string' || !/^\d{5}(?:-\d{4})?$/.test(value.shippingZip)
    || artworkLocations.length > locations.length
    || !artworkLocations.every(index => Number.isInteger(index) && index >= 1 && index <= locations.length)
    || new Set(artworkLocations).size !== artworkLocations.length) {
    return { success: false, error: 'Please check the required DTG details, contact information, date, ZIP, and artwork.' }
  }
  return { success: true, data: {
    formType: 'dtg', service: 'DTG Printing', source: '/services/apparel/dtg',
    garmentType: value.garmentType as string, quantity: value.quantity, garmentSource: value.garmentSource as string, garmentColor: (value.garmentColor as string).trim(),
    locations: locations.map(item => ({ placement: item.placement.trim(), approximateSize: item.approximateSize.trim() })),
    notes: value.notes.trim(), inHandsDate: value.inHandsDate, shippingZip: value.shippingZip,
    contact: { name: (contact.name as string).trim(), company: contact.company.trim(), email: (contact.email as string).trim(), phone: (contact.phone as string).trim() },
    artworkLocations,
  } }
}
