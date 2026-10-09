import type { ValidatedConsultationFile } from './custom-packaging-consultation-server'
import type { EmbroideryQuotePayload } from './embroidery-quote'

const escapeHtml = (value: string) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;')
const row = (label: string, value: string) => `<tr><td style="padding:6px 0;color:#6b7280;width:190px">${escapeHtml(label)}</td><td style="padding:6px 0">${escapeHtml(value)}</td></tr>`

export function buildEmbroideryInternalEmail(quote: EmbroideryQuotePayload, files: ValidatedConsultationFile[]) {
  const artworkByLocation = new Map(quote.artworkLocations.map((number, index) => [number, files[index]]))
  const locationRows = quote.locations.map((location, index) => {
    const number = index + 1
    const file = artworkByLocation.get(number)
    return row(`Location ${number}`, `${location.placement} — approx. ${location.approximateSize} — artwork: ${file ? file.filename : 'None supplied'}`)
  }).join('')
  return {
    from: 'Lettuce Print Website <onboarding@resend.dev>',
    to: 'info@lettuceprint.com',
    subject: `New Embroidery Quote — ${quote.contact.company ? `${quote.contact.company} · ` : ''}${quote.contact.name}`.replace(/[\r\n]/g, ' '),
    html: `<div style="font-family:sans-serif;max-width:680px;margin:0 auto"><h1 style="color:#00a175">New Embroidery Quote Request</h1><table style="width:100%;border-collapse:collapse">
      ${row('Name', quote.contact.name)}${row('Company', quote.contact.company || 'Not provided')}${row('Email', quote.contact.email)}${row('Phone', quote.contact.phone)}
      ${row('Garment type', quote.garmentType)}${row('Quantity', quote.quantity)}${row('Garment source', quote.garmentSource)}
      ${locationRows}${row('Notes', quote.notes || 'None')}${row('In-Hands Date', quote.inHandsDate)}${row('Shipping ZIP code', quote.shippingZip)}
      </table><p style="color:#9ca3af;font-size:12px">Submitted via ${escapeHtml(quote.source)}</p></div>`,
    attachments: files.map((file, index) => ({ filename: `location-${quote.artworkLocations[index]}-${file.filename}`.slice(0, 140), content: file.content })),
  }
}
