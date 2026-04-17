import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, phone, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Internal notification to Lettuce Print
    await resend.emails.send({
      from: 'Lettuce Print Website <onboarding@resend.dev>',
      to: 'info@lettuceprint.com',
      subject: `New Contact Form — ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <div style="background:#00a175;padding:24px 32px;border-radius:8px 8px 0 0">
            <h1 style="color:white;margin:0;font-size:20px">📬 New Contact Form Submission</h1>
          </div>
          <div style="background:#f9fafb;padding:32px;border-radius:0 0 8px 8px;border:1px solid #e5e7eb;border-top:none">
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;width:120px">Name</td><td style="padding:8px 0;font-weight:600">${name}</td></tr>
              <tr><td style="padding:8px 0;color:#6b7280;font-size:13px">Email</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#00a175">${email}</a></td></tr>
              ${phone ? `<tr><td style="padding:8px 0;color:#6b7280;font-size:13px">Phone</td><td style="padding:8px 0">${phone}</td></tr>` : ''}
            </table>
            <div style="margin-top:24px;padding-top:24px;border-top:1px solid #e5e7eb">
              <p style="color:#6b7280;font-size:13px;margin:0 0 8px">Message</p>
              <p style="margin:0;line-height:1.6;white-space:pre-wrap">${message}</p>
            </div>
            <div style="margin-top:24px">
              <a href="mailto:${email}" style="background:#00a175;color:white;padding:10px 20px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:600">Reply to ${name}</a>
            </div>
          </div>
          <p style="color:#9ca3af;font-size:12px;text-align:center;margin-top:16px">Submitted via lettuceprint.com/contact-us</p>
        </div>
      `,
    })

    // Customer confirmation
    await resend.emails.send({
      from: 'Lettuce Print <onboarding@resend.dev>',
      to: email,
      subject: `We got your message, ${name.split(' ')[0]}!`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <div style="background:#00a175;padding:24px 32px;border-radius:8px 8px 0 0">
            <h1 style="color:white;margin:0;font-size:20px">🌿 Thanks for reaching out!</h1>
          </div>
          <div style="background:#f9fafb;padding:32px;border-radius:0 0 8px 8px;border:1px solid #e5e7eb;border-top:none">
            <p style="margin:0 0 16px">Hey ${name.split(' ')[0]},</p>
            <p style="margin:0 0 16px;line-height:1.6">We received your message and will get back to you within <strong>1 business day</strong>. If your project is time-sensitive, feel free to call us directly.</p>
            <div style="background:white;border:1px solid #e5e7eb;border-radius:8px;padding:20px;margin:24px 0">
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
  } catch (err) {
    console.error('[Contact API Error]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
