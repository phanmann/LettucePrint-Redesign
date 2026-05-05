import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'

// ── Single-item checkout (legacy, still used by direct checkout flow) ─────────
interface SingleItemBody {
  size: string
  quantity: number
  material: string
  finish: string
  rush: string
  productName: string
  overridePriceCents?: number
  artworkUrl?: string
  artworkFilename?: string
}

// ── Multi-item cart checkout ──────────────────────────────────────────────────
interface CartItemBody {
  id: string
  product: string
  size: string
  qty: number
  material: string
  finish: string
  rush: string
  totalCents: number
  artworkUrl?: string
  artworkFilename?: string
}

interface CartCheckoutBody {
  items: CartItemBody[]
}

function isSingleItem(body: unknown): body is SingleItemBody {
  return typeof body === 'object' && body !== null && 'productName' in body
}

function isCartCheckout(body: unknown): body is CartCheckoutBody {
  return typeof body === 'object' && body !== null && 'items' in body && Array.isArray((body as CartCheckoutBody).items)
}

const RUSH_LABELS: Record<string, string> = {
  standard: '3–5 business days',
  '48hr': '48-hour rush',
  '24hr': '24-hour rush',
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    if (isCartCheckout(body)) {
      // ── Multi-item cart checkout ──────────────────────────────────────────
      const { items } = body

      if (!items.length) {
        return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
      }

      const lineItems = items.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.product,
            description: [
              `Size: ${item.size}`,
              `Material: ${item.material}`,
              `Finish: ${item.finish}`,
              `Production: ${RUSH_LABELS[item.rush] ?? item.rush}`,
              `Qty: ${item.qty}`,
            ].join(' · '),
            metadata: {
              cartItemId: item.id,
              size: item.size,
              qty: String(item.qty),
              material: item.material,
              finish: item.finish,
              rush: item.rush,
              ...(item.artworkUrl && { artworkUrl: item.artworkUrl }),
            },
          },
          unit_amount: item.totalCents,
        },
        quantity: 1,
      }))

      // Build metadata for webhook — encode artwork info per item
      const artworkMeta: Record<string, string> = {}
      items.forEach((item, idx) => {
        if (item.artworkUrl) artworkMeta[`artwork_${idx}_url`] = item.artworkUrl
        if (item.artworkFilename) artworkMeta[`artwork_${idx}_name`] = item.artworkFilename
        artworkMeta[`item_${idx}_product`] = item.product
        artworkMeta[`item_${idx}_qty`] = String(item.qty)
      })

      const session = await getStripe().checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        shipping_address_collection: { allowed_countries: ['US', 'CA'] },
        shipping_options: [
          {
            shipping_rate: process.env.NODE_ENV === 'production'
              ? process.env.STRIPE_SHIPPING_RATE_LIVE!
              : process.env.STRIPE_SHIPPING_RATE_TEST!,
          },
        ],
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
        metadata: {
          orderType: 'cart',
          itemCount: String(items.length),
          ...artworkMeta,
        },
      })

      return NextResponse.json({ url: session.url })

    } else if (isSingleItem(body)) {
      // ── Legacy single-item checkout ───────────────────────────────────────
      const {
        size, quantity, material, finish, rush,
        productName, overridePriceCents, artworkUrl, artworkFilename,
      } = body

      if (!overridePriceCents) {
        return NextResponse.json({ error: 'overridePriceCents required' }, { status: 400 })
      }

      const session = await getStripe().checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: productName,
                description: [
                  `Size: ${size}`,
                  `Material: ${material}`,
                  `Finish: ${finish}`,
                  `Production: ${RUSH_LABELS[rush] ?? rush}`,
                  `Quantity: ${quantity}`,
                ].join(' · '),
                metadata: { size, quantity: String(quantity), material, finish, rush },
              },
              unit_amount: overridePriceCents,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        shipping_address_collection: { allowed_countries: ['US', 'CA'] },
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
          orderType: 'single',
          product: productName,
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
    } else {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
