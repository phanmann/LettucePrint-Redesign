import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CheckoutFlow from '@/components/shop/CheckoutFlow'
import { calculateSpotUVPrice, type StickerSize, type RushOption, type EmbossingLayers } from '@/lib/pricing'

export const metadata: Metadata = {
  title: 'Upload Artwork & Checkout — Spot UV Stickers | Lettuce Print',
  description: 'Upload your artwork and proceed to secure payment for Spot UV stickers.',
  robots: { index: false },
}

interface PageProps {
  searchParams: Promise<{
    size?: string
    qty?: string
    layers?: string
    rush?: string
    product?: string
  }>
}

const VALID_SIZES: StickerSize[] = ['1x1', '2x2', '3x3', '4x4', '5x5']
const VALID_RUSH: RushOption[] = ['standard', '48hr', '24hr']

export default async function SpotUVCheckoutPage({ searchParams }: PageProps) {
  const params = await searchParams

  const size = VALID_SIZES.includes(params.size as StickerSize) ? params.size as StickerSize : null
  const qty = params.qty ? parseInt(params.qty, 10) : null
  const layersRaw = params.layers ? parseInt(params.layers, 10) : 0
  const layers = ([0,1,2,3,4].includes(layersRaw) ? layersRaw : 0) as EmbossingLayers
  const rush = VALID_RUSH.includes(params.rush as RushOption) ? params.rush as RushOption : 'standard' as RushOption
  const product = params.product ?? 'Spot UV Stickers'

  if (!size || !qty || isNaN(qty)) {
    redirect('/shop/spot-uv')
  }

  const price = calculateSpotUVPrice(size, qty, layers, rush)

  const config = {
    size,
    qty,
    material: 'spot-uv',
    finish: layers === 0 ? 'Standard (1 layer)' : `+${layers} extra layer${layers > 1 ? 's' : ''}`,
    rush,
    product,
    totalFormatted: price.totalFormatted,
    totalCents: price.totalCents,
    theme: 'light' as const,
    artworkNote: 'Spot UV layer in yellow (100% Y) on separate layer',
    acceptedFormats: 'AI · EPS · SVG · PDF',
    cancelPath: '/shop/spot-uv',
    skipPreview: true,
  }

  return (
    <>
      <Navbar />
      <main className="pt-[72px] min-h-screen bg-gray-50">

        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center gap-2 text-xs text-gray-500">
              <Link href="/" className="hover:text-lp-green transition-colors">Home</Link>
              <span>/</span>
              <Link href="/shop" className="hover:text-lp-green transition-colors">Shop</Link>
              <span>/</span>
              <Link href="/shop/spot-uv" className="hover:text-lp-green transition-colors">Spot UV Stickers</Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">Upload & Checkout</span>
            </nav>
          </div>
        </div>

        {/* Header */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-h2 font-semibold text-gray-900 mb-1">Upload your artwork</h1>
            <p className="text-small text-gray-500">
              Upload your file, preview it, then proceed to payment. We'll send a proof before anything goes to print.
            </p>
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-lg">
              <span className="text-xs font-medium text-amber-700">
                ⚠ Spot UV requires a separate spot layer in yellow (100% Y).{' '}
                <a href="mailto:steve@lettuceprint.com" className="underline">Not sure? Email us.</a>
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <CheckoutFlow config={config} />
        </div>

      </main>
      <Footer />
    </>
  )
}
