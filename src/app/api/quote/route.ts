import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { service, projectDetails, timeline, contact } = body

    const timelineLabel: Record<string, string> = {
      'asap':      'ASAP',
      '1-2weeks':  '1–2 weeks',
      '2-4weeks':  '2–4 weeks',
      '1-2months': '1–2 months',
      'flexible':  'Flexible',
    }

    const detailsRows = Object.entries(projectDetails as Record<string, string>)
      .filter(([, v]) => v)
      .map(([k, v]) => `<tr><td style="padding:6px 0;color:#6b7280;font-size:13px;width:160px">${formatKey(k)}</td><td style="padding:6px 0">${v}</td></tr>`)
      .join('')

    // Internal notification
    await resend.emails.send({
      from: 'Lettuce Print Website <onboarding@resend.dev>',
      to: 'info@lettuceprint.com',
      subject: `New Quote Request — ${service}${contact.company ? ` · ${contact.company}` : ''} · ${contact.name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <div style="background:#00a175;padding:24px 32px;border-radius:8px 8px 0 0">
            <h1 style="color:white;margin:0;font-size:20px">💸 New Quote Request</h1>
            <p style="color:rgba(255,255,255,.8);margin:6px 0 0;font-size:14px">${service}</p>
          </div>
          <div style="background:#f9fafb;padding:32px;border-radius:0 0 8px 8px;border:1px solid #e5e7eb;border-top:none">
            <h3 style="margin:0 0 12px;font-size:13px;text-transform:uppercase;letter-spacing:.05em;color:#9ca3af">Contact</h3>
            <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
              <tr><td style="padding:6px 0;color:#6b7280;font-size:13px;width:160px">Name</td><td style="padding:6px 0;font-weight:600">${contact.name}</td></tr>
              ${contact.company ? `<tr><td style="padding:6px 0;color:#6b7280;font-size:13px">Company</td><td style="padding:6px 0">${contact.company}</td></tr>` : ''}
              <tr><td style="padding:6px 0;color:#6b7280;font-size:13px">Email</td><td style="padding:6px 0"><a href="mailto:${contact.email}" style="color:#00a175">${contact.email}</a></td></tr>
              ${contact.phone ? `<tr><td style="padding:6px 0;color:#6b7280;font-size:13px">Phone</td><td style="padding:6px 0">${contact.phone}</td></tr>` : ''}
            </table>
            <h3 style="margin:0 0 12px;font-size:13px;text-transform:uppercase;letter-spacing:.05em;color:#9ca3af">Project Details</h3>
            <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
              ${detailsRows}
              <tr><td style="padding:6px 0;color:#6b7280;font-size:13px">Timeline</td><td style="padding:6px 0">${timelineLabel[timeline] ?? timeline}</td></tr>
            </table>
            <a href="mailto:${contact.email}" style="background:#00a175;color:white;padding:10px 20px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:600">Reply to ${contact.name}</a>
          </div>
          <p style="color:#9ca3af;font-size:12px;text-align:center;margin-top:16px">Submitted via lettuceprint.com/get-quote</p>
        </div>
      `,
    })

    // Customer confirmation
    await resend.emails.send({
      from: 'Lettuce Print <onboarding@resend.dev>',
      to: contact.email,
      subject: `Got your quote request, ${contact.name.split(' ')[0]}!`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <div style="background:#00a175;padding:24px 32px;border-radius:8px 8px 0 0">
            <h1 style="color:white;margin:0;font-size:20px">🌿 Quote request received!</h1>
          </div>
          <div style="background:#f9fafb;padding:32px;border-radius:0 0 8px 8px;border:1px solid #e5e7eb;border-top:none">
            <p style="margin:0 0 16px">Hey ${contact.name.split(' ')[0]},</p>
            <p style="margin:0 0 16px;line-height:1.6">We received your quote request for <strong>${service}</strong>. Our team will review the details and get back to you with pricing within <strong>1 business day</strong>.</p>
            <p style="margin:0 0 24px;line-height:1.6">If your project is urgent or you'd like to talk through the details, give us a call.</p>
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

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Quote submission error:', error)
    return NextResponse.json({ error: 'Submission failed' }, { status: 500 })
  }
}

function formatKey(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, s => s.toUpperCase())
    .trim()
}
