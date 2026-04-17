import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CheckoutFlow from './CheckoutFlow'
import { calculatePrice, type StickerSize, type StickerMaterial, type StickerFinish, type RushOption } from '@/lib/pricing'

export const metadata: Metadata = {
  title: 'Upload Artwork & Checkout — Lettuce Print',
  description: 'Upload your artwork and proceed to secure payment.',
  robots: { index: false },
}

interface PageProps {
  searchParams: Promise<{
    size?: string
    qty?: string
    material?: string
    finish?: string
    rush?: string
    product?: string
  }>
}

const VALID_SIZES: StickerSize[] = ['1x1', '2x2', '3x3', '4x4', '5x5']
const VALID_MATERIALS: StickerMaterial[] = ['standard', 'holographic']
const VALID_FINISHES: StickerFinish[] = ['matte', 'gloss', 'laminate']
const VALID_RUSH: RushOption[] = ['standard', '48hr', '24hr']

export default async function StickerCheckoutPage({ searchParams }: PageProps) {
  const params = await searchParams

  const size = VALID_SIZES.includes(params.size as StickerSize) ? params.size as StickerSize : null
  const qty = params.qty ? parseInt(params.qty, 10) : null
  const material = VALID_MATERIALS.includes(params.material as StickerMaterial) ? params.material as StickerMaterial : null
  const finish = VALID_FINISHES.includes(params.finish as StickerFinish) ? params.finish as StickerFinish : null
  const rush = VALID_RUSH.includes(params.rush as RushOption) ? params.rush as RushOption : 'standard' as RushOption
  const product = params.product ?? 'Custom Die-Cut Stickers'

  // If required params missing, kick back to stickers page
  if (!size || !qty || !material || !finish || isNaN(qty)) {
    redirect('/shop/stickers')
  }

  const price = calculatePrice(size, qty, material, finish, rush)

  const config = {
    size,
    qty,
    material,
    finish,
    rush,
    product,
    totalFormatted: price.totalFormatted,
    totalCents: price.totalCents,
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
              <Link href="/shop/stickers" className="hover:text-lp-green transition-colors">Custom Stickers</Link>
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
