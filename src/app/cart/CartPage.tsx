'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Trash2, Upload, CheckCircle, AlertCircle, Loader2, ShoppingBag, ArrowRight, Plus } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useUploadThing } from '@/lib/uploadthingClient'
import type { CartItem } from '@/lib/cart'
import Button from '@/components/ui/Button'

// ── Product thumbnail map ─────────────────────────────────────────────────────
const THUMBNAILS: Record<string, string> = {
  // Stickers & labels
  'Custom Die-Cut Stickers':     '/images/products/stickers/lettuce-stickers.png',
  'Holographic Stickers':        '/images/products/stickers/holo-stickers.png',
  'Spot UV Stickers':            '/images/products/spot-uv/spot-uv-1.png',
  'Roll Labels':                 '/images/products/roll-labels/roll-labels-1.png',
  'Custom Roll Labels':          '/images/products/roll-labels/roll-labels-1.png',
  // Marketing materials
  'Standard Business Cards':     '/images/hero-cards/packaging.jpg',
  'Premium Business Cards':      '/images/hero-cards/packaging.jpg',
  'Full Page Flyers':            '/images/products/flyers/flyer-1.jpg',
  'Half Page Flyers':            '/images/products/flyers/flyer-2.jpg',
  'Tabloid Flyers':              '/images/products/flyers/flyer-1.jpg',
  'Standard Postcards':          '/images/products/flyers/flyer-2.jpg',
  'Premium Postcards':           '/images/products/flyers/flyer-2.jpg',
  // Signage
  'Vinyl Banner':                '/images/products/banners/vinyl-banner.jpg',
  'Fabric Banner':               '/images/products/banners/fabric-banner.jpg',
  'Mesh Banner':                 '/images/products/banners/mesh-banner.jpg',
  'Posters':                     '/images/products/posters/poster-1.jpg',
  'Booklets':                    '/images/products/booklets/booklet-closed.jpg',
}

function getThumb(product: string): string | null {
  // Exact match first
  if (THUMBNAILS[product]) return THUMBNAILS[product]
  // Fuzzy — first key that appears in the product name
  const key = Object.keys(THUMBNAILS).find(k =>
    product.toLowerCase().includes(k.toLowerCase()) ||
    k.toLowerCase().includes(product.toLowerCase())
  )
  return key ? THUMBNAILS[key] : null
}

// ── Per-item artwork uploader ─────────────────────────────────────────────────
function ArtworkUploader({ item, onUploaded }: {
  item: CartItem
  onUploaded: (url: string, filename: string) => void
}) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { startUpload } = useUploadThing('artworkUploader', {
    headers: { 'x-session-id': `cart-${item.id}` },
    onClientUploadComplete: (res) => {
      if (!res?.[0]) return
      onUploaded(res[0].ufsUrl, res[0].name)
      setUploading(false)
    },
    onUploadError: (err) => {
      setError(err.message ?? 'Upload failed')
      setUploading(false)
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setError(null)
    setUploading(true)
    startUpload([file])
  }

  if (item.artworkUrl) {
    return (
      <div className="flex items-center gap-2 text-sm text-lp-green">
        <CheckCircle size={14} />
        <span className="font-medium truncate max-w-[160px]">{item.artworkFilename ?? 'Artwork uploaded'}</span>
        <label className="text-gray-400 hover:text-gray-600 cursor-pointer text-xs underline ml-1">
          Replace
          <input type="file" className="hidden" accept=".pdf,.ai,.eps,.png,.svg,.jpg,.jpeg" onChange={handleChange} />
        </label>
      </div>
    )
  }

  return (
    <div>
      <label className={`inline-flex items-center gap-1.5 text-sm cursor-pointer px-3 py-1.5 rounded-lg border transition-colors ${
        uploading ? 'border-gray-200 text-gray-400 cursor-not-allowed' : 'border-dashed border-gray-300 hover:border-lp-green hover:text-lp-green text-gray-500'
      }`}>
        {uploading ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
        {uploading ? 'Uploading…' : 'Upload artwork'}
        <input
          type="file"
          className="hidden"
          accept=".pdf,.ai,.eps,.png,.svg,.jpg,.jpeg"
          disabled={uploading}
          onChange={handleChange}
        />
      </label>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      <p className="text-xs text-amber-600 mt-1">⚠ Artwork required before checkout</p>
    </div>
  )
}

// ── Cart item row ─────────────────────────────────────────────────────────────
function CartItemRow({ item }: { item: CartItem }) {
  const { removeItem, updateArtwork } = useCart()
  const thumb = getThumb(item.product)

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col sm:flex-row sm:items-start gap-4">
      {/* Thumbnail */}
      <div className="flex-shrink-0">
        {thumb ? (
          <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-100 bg-gray-50">
            <Image
              src={thumb}
              alt={item.product}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-16 h-16 rounded-lg border border-gray-100 bg-gray-100 flex items-center justify-center">
            <span className="text-xl">🖴</span>
          </div>
        )}
      </div>

      {/* Product info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-semibold text-gray-900 text-sm">{item.product}</p>
            <p className="text-xs text-gray-500 mt-0.5">
              {item.size} · Qty {item.qty} · {item.material} · {item.finish}
            </p>
            {item.rush !== 'standard' && (
              <span className="inline-block mt-1 text-xs bg-amber-50 text-amber-700 border border-amber-200 rounded px-2 py-0.5">
                {item.rush === '48hr' ? '48-hour rush' : '24-hour rush'}
              </span>
            )}
          </div>
          <button
            onClick={() => removeItem(item.id)}
            className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0 mt-0.5"
            aria-label="Remove item"
          >
            <Trash2 size={16} />
          </button>
        </div>

        {/* Artwork */}
        <div className="mt-3">
          <ArtworkUploader
            item={item}
            onUploaded={(url, filename) => updateArtwork(item.id, url, filename)}
          />
        </div>

        {/* Edit link */}
        <Link
          href={item.productPath}
          className="inline-block mt-2 text-xs text-gray-400 hover:text-lp-green transition-colors"
        >
          Edit configuration →
        </Link>
      </div>

      {/* Price */}
      <div className="sm:text-right flex-shrink-0">
        <p className="text-lg font-bold text-gray-900">{item.totalFormatted}</p>
        <p className="text-xs text-gray-400">+ shipping</p>
      </div>
    </div>
  )
}

// ── Main cart page ────────────────────────────────────────────────────────────
export default function CartPage() {
  const router = useRouter()
  const { items, count, clearCart } = useCart()
  const [checkingOut, setCheckingOut] = useState(false)
  const [checkoutError, setCheckoutError] = useState<string | null>(null)

  const subtotalCents = items.reduce((sum, i) => sum + i.totalCents, 0)
  const subtotalFormatted = `$${(subtotalCents / 100).toFixed(2)}`
  const missingArtwork = items.filter(i => !i.artworkUrl)

  const handleCheckout = async () => {
    if (missingArtwork.length > 0) return
    setCheckingOut(true)
    setCheckoutError(null)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })
      const data = await res.json()
      if (data.url) {
        clearCart()
        window.location.href = data.url
      } else {
        throw new Error('No checkout URL')
      }
    } catch {
      setCheckoutError('Something went wrong. Please try again.')
      setCheckingOut(false)
    }
  }

  // Empty state
  if (count === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-24 text-center">
        <ShoppingBag size={48} className="mx-auto text-gray-200 mb-4" />
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h1>
        <p className="text-gray-500 mb-8">Add products from any product page and they'll show up here.</p>
        <Link href="/shop/stickers">
          <Button size="lg">Browse products</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-h2 font-semibold text-gray-900">Your cart</h1>
        <p className="text-gray-500 mt-1">{count} {count === 1 ? 'item' : 'items'}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <CartItemRow key={item.id} item={item} />
          ))}

          {/* Add more */}
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/shop/stickers" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-lp-green transition-colors">
              <Plus size={14} /> Add stickers
            </Link>
            <Link href="/shop/roll-labels" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-lp-green transition-colors">
              <Plus size={14} /> Add roll labels
            </Link>
            <Link href="/services/marketing-materials/business-cards/standard" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-lp-green transition-colors">
              <Plus size={14} /> Add business cards
            </Link>
            <Link href="/services/marketing-materials/flyers/full-page" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-lp-green transition-colors">
              <Plus size={14} /> Add flyers
            </Link>
            <Link href="/services/marketing-materials/postcards/standard" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-lp-green transition-colors">
              <Plus size={14} /> Add postcards
            </Link>
          </div>
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-6 lg:sticky lg:top-24">
            <h2 className="font-semibold text-gray-900 mb-4">Order summary</h2>

            <div className="space-y-2 mb-4">
              {items.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600 truncate max-w-[160px]">{item.product} ×{item.qty}</span>
                  <span className="text-gray-900 font-medium flex-shrink-0 ml-2">{item.totalFormatted}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-4 mb-2">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Shipping</span>
                <span className="italic">Calculated at checkout</span>
              </div>
            </div>

            <div className="flex justify-between font-bold text-gray-900 text-lg mb-6">
              <span>Subtotal</span>
              <span>{subtotalFormatted}</span>
            </div>

            {/* Missing artwork warning */}
            {missingArtwork.length > 0 && (
              <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 text-xs text-amber-700">
                <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
                <span>
                  Upload artwork for {missingArtwork.length} {missingArtwork.length === 1 ? 'item' : 'items'} before checking out.
                </span>
              </div>
            )}

            {checkoutError && (
              <p className="text-sm text-red-500 mb-3">{checkoutError}</p>
            )}

            <Button
              onClick={handleCheckout}
              disabled={missingArtwork.length > 0 || checkingOut}
              size="lg"
              className="w-full !bg-lp-green hover:!bg-lp-green-dark text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {checkingOut ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 size={16} className="animate-spin" /> Processing…
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Proceed to payment <ArrowRight size={16} />
                </span>
              )}
            </Button>

            <p className="text-xs text-gray-400 text-center mt-3">Secure checkout via Stripe</p>
          </div>
        </div>

      </div>
    </div>
  )
}
