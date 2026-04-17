import { NextRequest, NextResponse } from 'next/server'
import { writeClient, client } from '@/sanity/client'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { stripeSessionId, fileUrl, fileName } = await req.json()

    if (!stripeSessionId || !fileUrl || !fileName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Find the Sanity order by Stripe session ID
    const order = await client.fetch(
      `*[_type == "order" && stripeSessionId == $id][0]`,
      { id: stripeSessionId }
    )

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    // Update the order with artwork details
    await writeClient
      .patch(order._id)
      .set({
        artworkUrl: fileUrl,
        artworkFilename: fileName,
        artworkUploadedAt: new Date().toISOString(),
        orderStatus: 'artwork_received',
      })
      .commit()

    // Email Steve
    await resend.emails.send({
      from: 'Lettuce Print Orders <orders@lettuceprint.com>',
      to: 'steve@lettuceprint.com',
      subject: `[LP Order] Artwork received — ${order.customerEmail ?? 'Unknown'}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #00A175; padding: 24px 32px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 20px;">Artwork received 📁</h1>
          </div>
          <div style="background: #f9fafb; padding: 32px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Customer</td><td style="padding: 8px 0; font-weight: 600; font-size: 14px;">${order.customerEmail ?? '—'}</td></tr>
              <tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Product</td><td style="padding: 8px 0; font-weight: 600; font-size: 14px;">${order.productName ?? '—'}</td></tr>
              <tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Quantity</td><td style="padding: 8px 0; font-weight: 600; font-size: 14px;">${order.quantity ?? '—'}</td></tr>
              <tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Size</td><td style="padding: 8px 0; font-weight: 600; font-size: 14px;">${order.size ?? '—'}</td></tr>
              <tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Material</td><td style="padding: 8px 0; font-weight: 600; font-size: 14px;">${order.material ?? '—'}</td></tr>
              <tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Finish</td><td style="padding: 8px 0; font-weight: 600; font-size: 14px;">${order.finish ?? '—'}</td></tr>
              <tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Production</td><td style="padding: 8px 0; font-weight: 600; font-size: 14px;">${order.rush ?? '—'}</td></tr>
              <tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Amount paid</td><td style="padding: 8px 0; font-weight: 600; font-size: 14px; color: #00A175;">$${((order.amountPaidCents ?? 0) / 100).toFixed(2)}</td></tr>
            </table>

            <div style="margin-top: 24px; padding: 16px; background: white; border-radius: 8px; border: 1px solid #e5e7eb;">
              <p style="margin: 0 0 8px; font-weight: 600; font-size: 14px;">Artwork file</p>
              <p style="margin: 0 0 12px; font-size: 13px; color: #6b7280;">${fileName}</p>
              <a href="${fileUrl}" style="display: inline-block; background: #00A175; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-size: 14px; font-weight: 600;">Download artwork</a>
            </div>

            <div style="margin-top: 24px; padding: 16px; background: #fff7ed; border-radius: 8px; border: 1px solid #fed7aa;">
              <p style="margin: 0; font-size: 13px; color: #92400e;"><strong>Next step:</strong> Prep the proof, upload it to the order in Sanity Studio, and save. The customer email will be triggered automatically.</p>
            </div>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Artwork upload handler error:', err)
    return NextResponse.json({ error: 'Failed to process artwork upload' }, { status: 500 })
  }
}
