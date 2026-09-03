import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import {
  calculateCustomStickerPrice,
  calculateCustomSpotUVPrice,
  type StickerFinish,
  type StickerMaterial,
  type SpotUVHits,
} from '@/lib/pricing'

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

function parseDimensions(size: string): { width: number; height: number } {
  const match = size.match(/([0-9]+(?:\.[0-9]+)?)\s*(?:"|in)?\s*[×x]\s*([0-9]+(?:\.[0-9]+)?)/i)
  if (!match) throw new Error('Invalid sticker dimensions')
  return { width: Number(match[1]), height: Number(match[2]) }
}

function authoritativeStickerPrice(item: {
  product: string
  size: string
  qty: number
  material: string
  finish: string
  rush: string
}): number | null {
  const rush = item.rush === '48hr' || item.rush === '24hr' ? item.rush : 'standard'

  if (item.product === 'Custom Die-Cut Stickers') {
    const { width, height } = parseDimensions(item.size)
    if (!['standard', 'holographic'].includes(item.material)) {
      throw new Error('Invalid sticker material')
    }
    if (!['matte', 'gloss', 'laminate'].includes(item.finish)) {
      throw new Error('Invalid sticker finish')
    }
    return calculateCustomStickerPrice(
      width,
      height,
      item.qty,
      item.material as StickerMaterial,
      item.finish as StickerFinish,
      rush
    ).totalCents
  }

  if (item.product === 'Spot UV Stickers') {
    const { width, height } = parseDimensions(item.size)
    const hitsMatch = item.finish.match(/^([123])\s+Clear UV Hit(?:s)?$/)
    if (!['Spot UV', 'spot-uv'].includes(item.material) || !hitsMatch) {
      throw new Error('Invalid Spot UV configuration')
    }
    return calculateCustomSpotUVPrice(
      width,
      height,
      item.qty,
      Number(hitsMatch[1]) as SpotUVHits,
      rush
    ).totalCents
  }

  return null
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

      const lineItems = items.map((item) => {
        const secureStickerPrice = authoritativeStickerPrice(item)
        const unitAmount = secureStickerPrice ?? item.totalCents
        if (!Number.isInteger(unitAmount) || unitAmount <= 0) {
          throw new Error('Invalid item price')
        }
        return {
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
          unit_amount: unitAmount,
        },
        quantity: 1,
      }})

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

      const secureStickerPrice = authoritativeStickerPrice({
        product: productName,
        size,
        qty: quantity,
        material,
        finish,
        rush,
      })
      const unitAmount = secureStickerPrice ?? overridePriceCents

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
              unit_amount: unitAmount,
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
