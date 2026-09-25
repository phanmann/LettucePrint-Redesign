import { NextRequest, NextResponse } from 'next/server'
import { getResend } from '@/lib/resend'
import {
  type CustomPackagingQuotePayload,
  validateCustomPackagingQuote,
} from '@/lib/custom-packaging-quote'

interface LegacyQuotePayload {
  service: string
  projectDetails: Record<string, string>
  timeline: string
  contact: {
    name: string
    company?: string
    email: string
    phone?: string
  }
}

const timelineLabel: Record<string, string> = {
  'asap': 'ASAP',
  '1-2weeks': '1–2 weeks',
  '2-4weeks': '2–4 weeks',
  '1-2months': '1–2 months',
  'flexible': 'Flexible',
}

export async function POST(req: NextRequest) {
  try {
    const body: unknown = await req.json()
    const parsed = parseQuote(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid quote request', fields: parsed.errors }, { status: 400 })
    }

    const resend = getResend()
    const quote = parsed.data
    const isCustomPackaging = quote.quoteType === 'custom-packaging'
    const contact = quote.contact
    const service = quote.service
    const company = 'company' in contact ? contact.company : ''
    const source = isCustomPackaging ? quote.source : '/get-quote'
    const detailsRows = isCustomPackaging
      ? customPackagingRows(quote)
      : legacyDetailRows(quote)

    await resend.emails.send({
      from: 'Lettuce Print Website <onboarding@resend.dev>',
      to: 'info@lettuceprint.com',
      subject: `New Quote Request — ${service}${company ? ` · ${company}` : ''} · ${contact.name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <div style="background:#00a175;padding:24px 32px;border-radius:8px 8px 0 0">
            <h1 style="color:white;margin:0;font-size:20px">💸 New Quote Request</h1>
            <p style="color:rgba(255,255,255,.8);margin:6px 0 0;font-size:14px">${escapeHtml(service)}</p>
          </div>
          <div style="background:#f9fafb;padding:32px;border-radius:0 0 8px 8px;border:1px solid #e5e7eb;border-top:none">
            <h3 style="margin:0 0 12px;font-size:13px;text-transform:uppercase;letter-spacing:.05em;color:#9ca3af">Contact</h3>
            <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
              ${row('Name', contact.name, true)}
              ${company ? row('Company', company) : ''}
              ${contact.email ? row('Email', contact.email) : ''}
              ${contact.phone ? row('Phone', contact.phone) : ''}
            </table>
            <h3 style="margin:0 0 12px;font-size:13px;text-transform:uppercase;letter-spacing:.05em;color:#9ca3af">Project Details</h3>
            <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
              ${detailsRows}
            </table>
            ${contact.email
              ? `<a href="mailto:${escapeAttribute(contact.email)}" style="background:#00a175;color:white;padding:10px 20px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:600">Reply to ${escapeHtml(contact.name)}</a>`
              : ''}
          </div>
          <p style="color:#9ca3af;font-size:12px;text-align:center;margin-top:16px">Submitted via lettuceprint.com${escapeHtml(source)}</p>
        </div>
      `,
    })

    if (contact.email) {
      const firstName = contact.name.split(/\s+/)[0]
      await resend.emails.send({
        from: 'Lettuce Print <onboarding@resend.dev>',
        to: contact.email,
        subject: `Got your quote request, ${firstName}!`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
            <div style="background:#00a175;padding:24px 32px;border-radius:8px 8px 0 0">
              <h1 style="color:white;margin:0;font-size:20px">🌿 Quote request received!</h1>
            </div>
            <div style="background:#f9fafb;padding:32px;border-radius:0 0 8px 8px;border:1px solid #e5e7eb;border-top:none">
              <p style="margin:0 0 16px">Hey ${escapeHtml(firstName)},</p>
              <p style="margin:0 0 16px;line-height:1.6">We received your quote request for <strong>${escapeHtml(service)}</strong>. Our team will review the details and get back to you with pricing within <strong>1 business day</strong>.</p>
              <p style="margin:0 0 24px;line-height:1.6">If your project is urgent or you&apos;d like to talk through the details, give us a call.</p>
              <div style="background:white;border:1px solid #e5e7eb;border-radius:8px;padding:20px;margin:0 0 24px">
                <p style="margin:0 0 8px;font-weight:600">Lettuce Print</p>
                <p style="margin:0;color:#6b7280;font-size:14px;line-height:1.8">
                  361 Stagg St, Brooklyn NY<br>
                  (347) 603-0557<br>
                  <a href="mailto:info@lettuceprint.com" style="color:#00a175">info@lettuceprint.com</a>
                </p>
              </div>
              <p style="margin:0;color:#6b7280;font-size:13px">Monday – Friday, 9am – 5pm ET</p>
            </div>
          </div>
        `,
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Quote submission error:', error)
    return NextResponse.json({ error: 'Submission failed' }, { status: 500 })
  }
}

function parseQuote(input: unknown):
  | { success: true; data: CustomPackagingQuotePayload | (LegacyQuotePayload & { quoteType?: undefined }) }
  | { success: false; errors: Record<string, string> } {
  if (input && typeof input === 'object' && (input as Record<string, unknown>).quoteType === 'custom-packaging') {
    return validateCustomPackagingQuote(input)
  }

  const value = input && typeof input === 'object' ? input as Record<string, unknown> : {}
  const contact = value.contact && typeof value.contact === 'object'
    ? value.contact as Record<string, unknown>
    : {}
  const projectDetails = value.projectDetails && typeof value.projectDetails === 'object'
    ? value.projectDetails as Record<string, unknown>
    : {}

  if (
    typeof value.service !== 'string'
    || typeof value.timeline !== 'string'
    || typeof contact.name !== 'string'
    || !contact.name.trim()
    || typeof contact.email !== 'string'
    || !contact.email.trim()
    || Object.values(projectDetails).some(item => typeof item !== 'string')
  ) {
    return { success: false, errors: { request: 'Missing or invalid quote fields.' } }
  }

  return {
    success: true,
    data: {
      service: value.service,
      timeline: value.timeline,
      projectDetails: projectDetails as Record<string, string>,
      contact: {
        name: contact.name.trim(),
        company: typeof contact.company === 'string' ? contact.company.trim() : '',
        email: contact.email.trim(),
        phone: typeof contact.phone === 'string' ? contact.phone.trim() : '',
      },
    },
  }
}

function customPackagingRows(quote: CustomPackagingQuotePayload): string {
  const details = quote.projectDetails
  return [
    row('Bag Sizes', details.bagSizes.map(size => `${size.width} × ${size.length} ${size.unit}`).join(', ')),
    row('Print Finish', details.printFinish),
    row('Spot Finish', details.spotFinish),
    row('Enclosures', details.enclosures.length ? details.enclosures.join(', ') : 'None selected'),
    row('Artwork Print Ready', details.artworkPrintReady),
    row('Best Contact', details.bestContact.join(', ')),
  ].join('')
}

function legacyDetailRows(quote: LegacyQuotePayload): string {
  const details = Object.entries(quote.projectDetails)
    .filter(([, value]) => value)
    .map(([key, value]) => row(formatKey(key), value))
    .join('')
  return `${details}${row('Timeline', timelineLabel[quote.timeline] ?? quote.timeline)}`
}

function row(label: string, value: string, strong = false): string {
  return `<tr><td style="padding:6px 0;color:#6b7280;font-size:13px;width:160px">${escapeHtml(label)}</td><td style="padding:6px 0${strong ? ';font-weight:600' : ''}">${escapeHtml(value)}</td></tr>`
}

function formatKey(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, character => character.toUpperCase())
    .trim()
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
