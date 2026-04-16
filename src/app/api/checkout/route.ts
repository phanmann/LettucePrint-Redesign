import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { calculatePrice, SIZE_LABELS, MATERIAL_LABELS, FINISH_LABELS, RUSH_LABELS } from '@/lib/pricing'
import type { StickerSize, StickerMaterial, StickerFinish, RushOption } from '@/lib/pricing'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { size, quantity, material, finish, rush, productName, overridePriceCents } = body as {
      size: StickerSize
      quantity: number
      material: StickerMaterial
      finish: StickerFinish
      rush: RushOption
      productName: string
      overridePriceCents?: number
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
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/shop/stickers`,
      metadata: {
        product: 'stickers',
        size,
        quantity: String(quantity),
        material,
        finish,
        rush,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
