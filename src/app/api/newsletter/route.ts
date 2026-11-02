import { NextResponse } from 'next/server'
import { getResend } from '@/lib/resend'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Adds a subscriber to the Resend segment named by RESEND_NEWSLETTER_SEGMENT_ID.
// Without that destination the route reports "not configured" rather than pretending to save the lead.
export async function POST(req: Request) {
  const segmentId = process.env.RESEND_NEWSLETTER_SEGMENT_ID
  if (!segmentId || !process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: 'Newsletter signup is not configured' }, { status: 503 })
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

  try {
    const { error } = await getResend().contacts.create({ email, unsubscribed: false, segments: [{ id: segmentId }] })
    if (error && !/already exists/i.test(error.message)) {
      return NextResponse.json({ error: 'Signup failed. Please try again.' }, { status: 502 })
    }
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Signup failed. Please try again.' }, { status: 502 })
  }
}
