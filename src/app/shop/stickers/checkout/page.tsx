import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CheckoutFlow from '@/components/shop/CheckoutFlow'
import {
  QUANTITY_TIERS,
  MATERIAL_MULTIPLIERS,
  FINISH_ADDON_PER_SQIN,
  formatCents,
  type StickerMaterial,
  type StickerFinish,
  type RushOption,
} from '@/lib/pricing'

// Custom size pricing — mirrors PricingCalculator.tsx
const REF_PRICES_3x3_CENTS: Record<number, number> = {
  50: 7500, 100: 9800, 250: 19500, 500: 30000, 1000: 45000, 2500: 86200,
}
const REF_SQ_IN = 9

function calcCustomPrice(
  sqIn: number,
  quantity: number,
  material: StickerMaterial,
  finish: StickerFinish
) {
  const tier = QUANTITY_TIERS.find(t => t >= quantity) ?? 2500
  const ref = REF_PRICES_3x3_CENTS[tier]
  const base = Math.round(ref * (sqIn / REF_SQ_IN))
  const materialAdj = Math.round(base * MATERIAL_MULTIPLIERS[material])
  const finishAddon = FINISH_ADDON_PER_SQIN[finish] * sqIn * tier
  const total = materialAdj + finishAddon
  return { totalCents: total, totalFormatted: formatCents(total) }
}

export const metadata: Metadata = {
  title: 'Upload Artwork & Checkout — Lettuce Print',
  description: 'Upload your artwork and proceed to secure payment.',
  robots: { index: false },
}

interface PageProps {
  searchParams: Promise<{
    width?: string
    height?: string
    size?: string
    qty?: string
    material?: string
    finish?: string
    rush?: string
    product?: string
  }>
}

const VALID_MATERIALS: StickerMaterial[] = ['standard', 'holographic']
const VALID_FINISHES: StickerFinish[] = ['matte', 'gloss', 'laminate']
const VALID_RUSH: RushOption[] = ['standard', '48hr', '24hr']

export default async function StickerCheckoutPage({ searchParams }: PageProps) {
  const params = await searchParams

  const width = params.width ? parseFloat(params.width) : null
  const height = params.height ? parseFloat(params.height) : null
  const sizeLabel = params.size ?? (width && height ? `${width}" × ${height}"` : null)
  const qty = params.qty ? parseInt(params.qty, 10) : null
  const material = VALID_MATERIALS.includes(params.material as StickerMaterial) ? params.material as StickerMaterial : null
  const finish = VALID_FINISHES.includes(params.finish as StickerFinish) ? params.finish as StickerFinish : null
  const rush = VALID_RUSH.includes(params.rush as RushOption) ? params.rush as RushOption : 'standard' as RushOption
  const product = params.product ?? 'Custom Die-Cut Stickers'

  if (!width || !height || !qty || !material || !finish || isNaN(qty)) {
    redirect('/shop/stickers')
  }

  const sqIn = width * height
  const price = calcCustomPrice(sqIn, qty, material, finish)

  const config = {
    size: sizeLabel as string,
    qty,
    material,
    finish,
    rush,
    product,
    totalFormatted: price.totalFormatted,
    totalCents: price.totalCents,
    theme: 'light' as const,
    cancelPath: '/shop/stickers',
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
