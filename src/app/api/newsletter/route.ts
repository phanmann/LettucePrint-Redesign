import { NextResponse } from 'next/server'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Adds the visitor to the Brevo newsletter list. Key and list ID stay server-side in Vercel env vars.
export async function POST(req: Request) {
  const apiKey = process.env.BREVO_API_KEY
  const listId = Number(process.env.BREVO_NEWSLETTER_LIST_ID)
  if (!apiKey || !Number.isInteger(listId) || listId <= 0) {
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

  try {
    // updateEnabled adds an existing contact to the list instead of failing as a duplicate.
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: { 'api-key': apiKey, 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({
        email,
        listIds: [listId],
        updateEnabled: true,
      }),
      cache: 'no-store',
    })
    if (!response.ok) {
      console.error('Brevo signup failed', response.status)
      return NextResponse.json({ error: 'Signup failed. Please try again.' }, { status: 502 })
    }
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Signup failed. Please try again.' }, { status: 502 })
  }
}
