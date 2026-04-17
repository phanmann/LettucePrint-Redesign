import { NextRequest, NextResponse } from 'next/server'
import { writeClient, client } from '@/sanity/client'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Called from /proof/[token] page when customer approves or requests changes
// POST { token, action: 'approve' | 'changes', feedback?: string }
export async function POST(req: NextRequest) {
  try {
    const { token, action, feedback } = await req.json()

    if (!token || !action) {
      return NextResponse.json({ error: 'Missing token or action' }, { status: 400 })
    }

    if (!['approve', 'changes'].includes(action)) {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }

    // Find order by proof token
    const order = await client.fetch(
      `*[_type == "order" && proofToken == $token][0]`,
      { token }
    )

    if (!order) {
      return NextResponse.json({ error: 'Invalid or expired proof link' }, { status: 404 })
    }

    // Prevent double-submit
    if (order.proofStatus !== 'pending') {
      return NextResponse.json({ error: 'Proof already responded to', status: order.proofStatus }, { status: 409 })
    }

    const isApproval = action === 'approve'
    const newProofStatus = isApproval ? 'approved' : 'changes_requested'
    const newOrderStatus = isApproval ? 'proof_approved' : 'proof_sent' // stays proof_sent on changes

    // Update Sanity
    await writeClient
      .patch(order._id)
      .set({
        proofStatus: newProofStatus,
        orderStatus: newOrderStatus,
        proofFeedback: feedback ?? null,
        proofRespondedAt: new Date().toISOString(),
      })
      .commit()

    // Email Steve
    if (isApproval) {
      await resend.emails.send({
        from: 'Lettuce Print Orders <orders@lettuceprint.com>',
        to: 'steve@lettuceprint.com',
        subject: `✅ Proof approved — ${order.customerEmail ?? 'Unknown'}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #00A175; padding: 24px 32px; border-radius: 8px 8px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 20px;">Proof approved ✅</h1>
            </div>
            <div style="background: #f9fafb; padding: 32px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: none;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 6px 0; color: #6b7280; font-size: 14px;">Customer</td><td style="padding: 6px 0; font-weight: 600; font-size: 14px;">${order.customerEmail ?? '—'}</td></tr>
                <tr><td style="padding: 6px 0; color: #6b7280; font-size: 14px;">Product</td><td style="padding: 6px 0; font-weight: 600; font-size: 14px;">${order.productName ?? '—'}</td></tr>
                <tr><td style="padding: 6px 0; color: #6b7280; font-size: 14px;">Quantity</td><td style="padding: 6px 0; font-weight: 600; font-size: 14px;">${order.quantity ?? '—'}</td></tr>
                <tr><td style="padding: 6px 0; color: #6b7280; font-size: 14px;">Responded at</td><td style="padding: 6px 0; font-weight: 600; font-size: 14px;">${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} ET</td></tr>
              </table>
              <div style="margin-top: 24px; padding: 16px; background: #f0fdf4; border-radius: 8px; border: 1px solid #bbf7d0;">
                <p style="margin: 0; font-size: 14px; color: #166534;"><strong>Next step:</strong> Send the customer your final proof email, get their reply, then move to production.</p>
              </div>
            </div>
          </div>
        `,
      })
    } else {
      await resend.emails.send({
        from: 'Lettuce Print Orders <orders@lettuceprint.com>',
        to: 'steve@lettuceprint.com',
        subject: `🔁 Changes requested — ${order.customerEmail ?? 'Unknown'}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #f59e0b; padding: 24px 32px; border-radius: 8px 8px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 20px;">Changes requested 🔁</h1>
            </div>
            <div style="background: #f9fafb; padding: 32px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: none;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 6px 0; color: #6b7280; font-size: 14px;">Customer</td><td style="padding: 6px 0; font-weight: 600; font-size: 14px;">${order.customerEmail ?? '—'}</td></tr>
                <tr><td style="padding: 6px 0; color: #6b7280; font-size: 14px;">Product</td><td style="padding: 6px 0; font-weight: 600; font-size: 14px;">${order.productName ?? '—'}</td></tr>
              </table>
              ${feedback ? `
              <div style="margin-top: 20px; padding: 16px; background: white; border-radius: 8px; border: 1px solid #e5e7eb;">
                <p style="margin: 0 0 8px; font-weight: 600; font-size: 13px; color: #374151;">Customer feedback:</p>
                <p style="margin: 0; font-size: 14px; color: #374151; white-space: pre-wrap;">${feedback}</p>
              </div>` : ''}
              <div style="margin-top: 20px; padding: 16px; background: #fff7ed; border-radius: 8px; border: 1px solid #fed7aa;">
                <p style="margin: 0; font-size: 13px; color: #92400e;"><strong>Next step:</strong> Make revisions, upload a new proof in Sanity Studio, and re-send the proof email.</p>
              </div>
            </div>
          </div>
        `,
      })
    }

    return NextResponse.json({ success: true, action })
  } catch (err) {
    console.error('Proof respond error:', err)
    return NextResponse.json({ error: 'Failed to process response' }, { status: 500 })
  }
}
