import { NextResponse } from 'next/server'
import { getResend } from '@/lib/resend'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// Signups are emailed to the team for now; there is no mailing list yet.
const NOTIFY_TO = 'info@lettuceprint.com'

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!)
}

export async function POST(req: Request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: 'Email signup is not configured' }, { status: 503 })
  }

  let email = ''
  try {
    const body = await req.json()
    email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : ''
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 })
  }

  const safeEmail = escapeHtml(email)
  try {
    const { error } = await getResend().emails.send({
      from: 'Lettuce Print Website <onboarding@resend.dev>',
      to: NOTIFY_TO,
      replyTo: email,
      subject: `New monthly deals signup — ${email}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <div style="background:#00a175;padding:24px 32px;border-radius:8px 8px 0 0">
            <h1 style="color:white;margin:0;font-size:20px">✉️ New monthly deals signup</h1>
          </div>
          <div style="background:#f9fafb;padding:32px;border-radius:0 0 8px 8px;border:1px solid #e5e7eb;border-top:none">
            <p style="margin:0 0 8px;color:#6b7280;font-size:13px">Email</p>
            <p style="margin:0;font-weight:600"><a href="mailto:${safeEmail}" style="color:#00a175">${safeEmail}</a></p>
            <p style="margin:24px 0 0;color:#6b7280;font-size:13px">Submitted from the homepage signup popup. This person asked to hear about monthly deals and offers; they have not been added to any mailing list automatically.</p>
          </div>
        </div>
      `,
    })
    if (error) {
      return NextResponse.json({ error: 'Signup failed. Please try again.' }, { status: 502 })
    }
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Signup failed. Please try again.' }, { status: 502 })
  }
}
