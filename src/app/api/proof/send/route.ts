import { NextRequest, NextResponse } from 'next/server'
import { writeClient, client } from '@/sanity/client'
import { Resend } from 'resend'
import { randomUUID } from 'crypto'

const resend = new Resend(process.env.RESEND_API_KEY)

// Called by Sanity webhook (or manually) when Steve uploads a proof
// POST { sanityOrderId: string }
export async function POST(req: NextRequest) {
  try {
    const { sanityOrderId } = await req.json()

    if (!sanityOrderId) {
      return NextResponse.json({ error: 'Missing sanityOrderId' }, { status: 400 })
    }

    // Fetch the order
    const order = await client.fetch(
      `*[_type == "order" && _id == $id][0]`,
      { id: sanityOrderId }
    )

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    if (!order.proofUrl) {
      return NextResponse.json({ error: 'No proof file uploaded yet' }, { status: 400 })
    }

    if (!order.customerEmail) {
      return NextResponse.json({ error: 'No customer email on order' }, { status: 400 })
    }

    // Generate a unique token for this proof approval
    const proofToken = randomUUID()
    const proofApprovalUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/proof/${proofToken}`

    // Update order with token + status
    await writeClient
      .patch(order._id)
      .set({
        proofToken,
        proofSentAt: new Date().toISOString(),
        orderStatus: 'proof_sent',
      })
      .commit()

    // Email the customer
    await resend.emails.send({
      from: 'Lettuce Print <proofs@lettuceprint.com>',
      to: order.customerEmail,
      subject: 'Your Lettuce Print proof is ready for review',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #00A175; padding: 24px 32px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 22px; font-weight: 700;">Your proof is ready 🎨</h1>
          </div>
          <div style="background: #f9fafb; padding: 32px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: none;">
            <p style="color: #374151; font-size: 15px; margin: 0 0 16px;">Hi${order.customerName ? ` ${order.customerName.split(' ')[0]}` : ''},</p>
            <p style="color: #374151; font-size: 15px; margin: 0 0 24px;">Your proof for <strong>${order.productName ?? 'your order'}</strong> is ready. Please review it carefully and let us know if you'd like to approve it or request any changes.</p>

            <div style="background: white; border-radius: 8px; border: 1px solid #e5e7eb; padding: 20px; margin-bottom: 24px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 6px 0; color: #6b7280; font-size: 13px; width: 40%;">Product</td><td style="padding: 6px 0; font-weight: 600; font-size: 13px;">${order.productName ?? '—'}</td></tr>
                <tr><td style="padding: 6px 0; color: #6b7280; font-size: 13px;">Quantity</td><td style="padding: 6px 0; font-weight: 600; font-size: 13px;">${order.quantity ?? '—'}</td></tr>
                <tr><td style="padding: 6px 0; color: #6b7280; font-size: 13px;">Size</td><td style="padding: 6px 0; font-weight: 600; font-size: 13px;">${order.size ?? '—'}</td></tr>
                <tr><td style="padding: 6px 0; color: #6b7280; font-size: 13px;">Material</td><td style="padding: 6px 0; font-weight: 600; font-size: 13px;">${order.material ?? '—'}</td></tr>
                <tr><td style="padding: 6px 0; color: #6b7280; font-size: 13px;">Finish</td><td style="padding: 6px 0; font-weight: 600; font-size: 13px;">${order.finish ?? '—'}</td></tr>
              </table>
            </div>

            <div style="text-align: center; margin-bottom: 24px;">
              <a href="${proofApprovalUrl}" style="display: inline-block; background: #00A175; color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-size: 16px; font-weight: 700;">Review your proof →</a>
            </div>

            <div style="background: #fff7ed; border: 1px solid #fed7aa; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
              <p style="margin: 0; font-size: 13px; color: #92400e;"><strong>⚠️ Please review carefully.</strong> Check spelling, colors, sizing, and bleed. Once approved and sent to production, changes cannot be made.</p>
            </div>

            <p style="color: #6b7280; font-size: 13px; margin: 0;">Questions? Reply to this email or reach us at <a href="mailto:steve@lettuceprint.com" style="color: #00A175;">steve@lettuceprint.com</a></p>
          </div>
          <p style="color: #9ca3af; font-size: 12px; text-align: center; margin-top: 16px;">Lettuce Print · 361 Stagg St, Brooklyn NY · (347) 603-0557</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true, proofToken })
  } catch (err) {
    console.error('Proof send error:', err)
    return NextResponse.json({ error: 'Failed to send proof' }, { status: 500 })
  }
}
