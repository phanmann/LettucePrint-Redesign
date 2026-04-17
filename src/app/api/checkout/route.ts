import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { calculatePrice, SIZE_LABELS, MATERIAL_LABELS, FINISH_LABELS, RUSH_LABELS } from '@/lib/pricing'
import type { StickerSize, StickerMaterial, StickerFinish, RushOption } from '@/lib/pricing'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { size, quantity, material, finish, rush, productName, overridePriceCents, artworkUrl, artworkFilename } = body as {
      size: StickerSize
      quantity: number
      material: StickerMaterial
      finish: StickerFinish
      rush: RushOption
      productName: string
      overridePriceCents?: number
      artworkUrl?: string
      artworkFilename?: string
    }

    const price = overridePriceCents
      ? { totalCents: overridePriceCents }
      : calculatePrice(size, quantity, material, finish, rush)

    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: productName,
              description: [
                `Size: ${SIZE_LABELS[size]}`,
                `Material: ${MATERIAL_LABELS[material]}`,
                `Finish: ${FINISH_LABELS[finish]}`,
                `Production: ${RUSH_LABELS[rush]}`,
                `Quantity: ${quantity}`,
              ].join(' · '),
              metadata: { size, quantity: String(quantity), material, finish, rush },
            },
            unit_amount: price.totalCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'],
      },
      shipping_options: [
        {
          shipping_rate: process.env.NODE_ENV === 'production'
            ? process.env.STRIPE_SHIPPING_RATE_LIVE!
            : process.env.STRIPE_SHIPPING_RATE_TEST!,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/shop/stickers`,
      metadata: {
        product: 'stickers',
        size,
        quantity: String(quantity),
        material,
        finish,
        rush,
        ...(artworkUrl && { artworkUrl }),
        ...(artworkFilename && { artworkFilename }),
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
