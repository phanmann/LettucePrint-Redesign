import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getStripe } from '@/lib/stripe'
import { writeClient } from '@/sanity/client'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET not set')
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
  }

  let event: Stripe.Event
  try {
    event = getStripe().webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // Only handle checkout.session.completed
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session & {
      shipping_details?: {
        name?: string
        address?: { line1?: string; line2?: string; city?: string; state?: string; postal_code?: string; country?: string }
      }
      shipping_cost?: { amount_total?: number; shipping_rate?: { display_name?: string } }
    }

    if (session.payment_status !== 'paid') {
      return NextResponse.json({ received: true })
    }

    const meta = session.metadata ?? {}

    try {
      // Use createOrReplace with deterministic ID so artwork-first orders get merged
      const existingOrder = await writeClient.fetch(
        `*[_type == "order" && stripeSessionId == $id][0]{ _id, artworkUrl, artworkFilename, artworkUploadedAt }`,
        { id: session.id } as Record<string, string>
      )

      const docId = existingOrder?._id ?? `order-${session.id}`

      // Artwork: prefer metadata (pre-payment upload) over any existing record
      const artworkUrl = meta.artworkUrl || existingOrder?.artworkUrl || null
      const artworkFilename = meta.artworkFilename || existingOrder?.artworkFilename || null
      const hasArtwork = Boolean(artworkUrl)

      await writeClient.createOrReplace({
        _type: 'order',
        _id: docId,
        stripeSessionId: session.id,
        stripePaymentIntentId: session.payment_intent as string ?? null,
        customerEmail: session.customer_details?.email ?? null,
        customerName: session.customer_details?.name ?? null,
        shippingName: session.shipping_details?.name ?? null,
        shippingLine1: session.shipping_details?.address?.line1 ?? null,
        shippingLine2: session.shipping_details?.address?.line2 ?? null,
        shippingCity: session.shipping_details?.address?.city ?? null,
        shippingState: session.shipping_details?.address?.state ?? null,
        shippingZip: session.shipping_details?.address?.postal_code ?? null,
        shippingCountry: session.shipping_details?.address?.country ?? null,
        shippingRateName: session.shipping_cost?.shipping_rate?.display_name ?? null,
        shippingAmountCents: session.shipping_cost?.amount_total ?? null,
        productName: meta.product ?? 'Unknown product',
        quantity: meta.quantity ? parseInt(meta.quantity, 10) : null,
        size: meta.size ?? null,
        material: meta.material ?? null,
        finish: meta.finish ?? null,
        rush: meta.rush ?? null,
        amountPaidCents: session.amount_total ?? 0,
        orderStatus: hasArtwork ? 'artwork_received' : 'paid',
        proofStatus: 'pending',
        paidAt: new Date().toISOString(),
        ...(artworkUrl && {
          artworkUrl,
          artworkFilename,
          artworkUploadedAt: existingOrder?.artworkUploadedAt ?? new Date().toISOString(),
        }),
      })

      console.log(`✅ Order upserted in Sanity for session ${session.id}`)

      // Email Steve with order + artwork (if provided pre-payment)
      if (hasArtwork) {
        await resend.emails.send({
          from: 'Lettuce Print Orders <orders@lettuceprint.com>',
          to: 'steve@lettuceprint.com',
          subject: `[LP Order] New order + artwork — ${session.customer_details?.email ?? 'Unknown'}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: #00A175; padding: 24px 32px; border-radius: 8px 8px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 20px;">New order + artwork received 🎉</h1>
              </div>
              <div style="background: #f9fafb; padding: 32px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Customer</td><td style="padding: 8px 0; font-weight: 600; font-size: 14px;">${session.customer_details?.email ?? '—'}</td></tr>
                  <tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Product</td><td style="padding: 8px 0; font-weight: 600; font-size: 14px;">${meta.product ?? '—'}</td></tr>
                  <tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Quantity</td><td style="padding: 8px 0; font-weight: 600; font-size: 14px;">${meta.quantity ?? '—'}</td></tr>
                  <tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Size</td><td style="padding: 8px 0; font-weight: 600; font-size: 14px;">${meta.size ?? '—'}</td></tr>
                  <tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Material</td><td style="padding: 8px 0; font-weight: 600; font-size: 14px;">${meta.material ?? '—'}</td></tr>
                  <tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Finish</td><td style="padding: 8px 0; font-weight: 600; font-size: 14px;">${meta.finish ?? '—'}</td></tr>
                  <tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Production</td><td style="padding: 8px 0; font-weight: 600; font-size: 14px;">${meta.rush ?? '—'}</td></tr>
                  <tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Amount paid</td><td style="padding: 8px 0; font-weight: 600; font-size: 14px; color: #00A175;">$${((session.amount_total ?? 0) / 100).toFixed(2)}</td></tr>
                </table>
                <div style="margin-top: 24px; padding: 16px; background: white; border-radius: 8px; border: 1px solid #e5e7eb;">
                  <p style="margin: 0 0 8px; font-weight: 600; font-size: 14px;">Artwork file</p>
                  <p style="margin: 0 0 12px; font-size: 13px; color: #6b7280;">${artworkFilename ?? 'Unknown'}</p>
                  <a href="${artworkUrl}" style="display: inline-block; background: #00A175; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-size: 14px; font-weight: 600;">Download artwork</a>
                </div>
                <div style="margin-top: 20px; padding: 16px; background: #fff7ed; border-radius: 8px; border: 1px solid #fed7aa;">
                  <p style="margin: 0; font-size: 13px; color: #92400e;"><strong>Next step:</strong> Prep the proof, upload to the order in Sanity Studio, save — customer email fires automatically.</p>
                </div>
              </div>
            </div>
          `,
        }).catch(e => console.error('Failed to send Steve email:', e))
      }
    } catch (err) {
      console.error('Failed to create Sanity order:', err)
      // Return 500 so Stripe retries
      return NextResponse.json({ error: 'Failed to write order to Sanity' }, { status: 500 })
    }
  }

  return NextResponse.json({ received: true })
}
