import type { MylarBagsQuotePayload, MylarBagSize } from '@/lib/custom-packaging-quote'

export interface PackagingInternalEmail {
  from: string
  to: string
  subject: string
  html: string
}

export function formatMylarBagSize(size: MylarBagSize): string {
  return `${size.width} × ${size.length}${size.gusset === undefined ? '' : ` × ${size.gusset}`} ${size.unit}`
}

export function buildPackagingInternalEmail(quote: MylarBagsQuotePayload): PackagingInternalEmail {
  const { contact, projectDetails: details } = quote
  const detailsRows = [
    row('Bag Sizes', details.bagSizes.map(formatMylarBagSize).join(', ')),
    row('Print Finish', details.printFinish),
    row('Spot Finish', details.spotFinish),
    row('Enclosures', details.enclosures.length ? details.enclosures.join(', ') : 'None selected'),
    row('Artwork Print Ready', details.artworkPrintReady),
    row('Best Contact', details.bestContact.join(', ')),
  ].join('')

  return {
    from: 'Lettuce Print Website <onboarding@resend.dev>',
    to: 'info@lettuceprint.com',
    subject: `New Quote Request — ${quote.service} · ${contact.name}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <div style="background:#00a175;padding:24px 32px;border-radius:8px 8px 0 0">
          <h1 style="color:white;margin:0;font-size:20px">💸 New Quote Request</h1>
          <p style="color:rgba(255,255,255,.8);margin:6px 0 0;font-size:14px">${escapeHtml(quote.service)}</p>
        </div>
        <div style="background:#f9fafb;padding:32px;border-radius:0 0 8px 8px;border:1px solid #e5e7eb;border-top:none">
          <h3 style="margin:0 0 12px;font-size:13px;text-transform:uppercase;letter-spacing:.05em;color:#9ca3af">Contact</h3>
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
            ${row('Name', contact.name, true)}
            ${contact.email ? row('Email', contact.email) : ''}
            ${contact.phone ? row('Phone', contact.phone) : ''}
          </table>
          <h3 style="margin:0 0 12px;font-size:13px;text-transform:uppercase;letter-spacing:.05em;color:#9ca3af">Project Details</h3>
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px">${detailsRows}</table>
          ${contact.email
            ? `<a href="mailto:${escapeAttribute(contact.email)}" style="background:#00a175;color:white;padding:10px 20px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:600">Reply to ${escapeHtml(contact.name)}</a>`
            : ''}
        </div>
        <p style="color:#9ca3af;font-size:12px;text-align:center;margin-top:16px">Submitted via lettuceprint.com${escapeHtml(quote.source)}</p>
      </div>
    `,
  }
}

export function sendPackagingInternalEmail<T>(
  send: (email: PackagingInternalEmail) => Promise<T>,
  quote: MylarBagsQuotePayload,
): Promise<T> {
  return send(buildPackagingInternalEmail(quote))
}

function row(label: string, value: string, strong = false): string {
  return `<tr><td style="padding:6px 0;color:#6b7280;font-size:13px;width:160px">${escapeHtml(label)}</td><td style="padding:6px 0${strong ? ';font-weight:600' : ''}">${escapeHtml(value)}</td></tr>`
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function escapeAttribute(value: string): string {
  return escapeHtml(value).replaceAll('\\', '&#092;')
}
