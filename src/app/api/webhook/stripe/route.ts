import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getStripe } from '@/lib/stripe'
import { writeClient } from '@/sanity/client'

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
    const session = event.data.object as Stripe.Checkout.Session

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

      await writeClient.createOrReplace({
        _type: 'order',
        _id: docId,
        stripeSessionId: session.id,
        stripePaymentIntentId: session.payment_intent as string ?? null,
        customerEmail: session.customer_details?.email ?? null,
        customerName: session.customer_details?.name ?? null,
        productName: meta.product ?? 'Unknown product',
        quantity: meta.quantity ? parseInt(meta.quantity, 10) : null,
        size: meta.size ?? null,
        material: meta.material ?? null,
        finish: meta.finish ?? null,
        rush: meta.rush ?? null,
        amountPaidCents: session.amount_total ?? 0,
        orderStatus: existingOrder?.artworkUrl ? 'artwork_received' : 'paid',
        proofStatus: 'pending',
        paidAt: new Date().toISOString(),
        // Preserve artwork if already uploaded before webhook fired
        ...(existingOrder?.artworkUrl && {
          artworkUrl: existingOrder.artworkUrl,
          artworkFilename: existingOrder.artworkFilename,
          artworkUploadedAt: existingOrder.artworkUploadedAt,
        }),
      })

      console.log(`✅ Order upserted in Sanity for session ${session.id}`)
    } catch (err) {
      console.error('Failed to create Sanity order:', err)
      // Return 500 so Stripe retries
      return NextResponse.json({ error: 'Failed to write order to Sanity' }, { status: 500 })
    }
  }

  return NextResponse.json({ received: true })
}
