import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import RollLabelCheckoutFlow from './RollLabelCheckoutFlow'
import { calculateRollLabelPrice, type LabelMaterial, type LabelFinish } from '@/lib/roll-label-pricing'

export const metadata: Metadata = {
  title: 'Upload Artwork & Checkout — Roll Labels | Lettuce Print',
  description: 'Upload your artwork and proceed to secure payment for custom roll labels.',
  robots: { index: false },
}

interface PageProps {
  searchParams: Promise<{
    width?: string
    height?: string
    qty?: string
    material?: string
    finish?: string
    size?: string
    product?: string
  }>
}

const VALID_MATERIALS: LabelMaterial[] = ['standard', 'bopp']
const VALID_FINISHES: LabelFinish[] = ['matte', 'gloss']

export default async function RollLabelCheckoutPage({ searchParams }: PageProps) {
  const params = await searchParams

  const width = params.width ? parseFloat(params.width) : null
  const height = params.height ? parseFloat(params.height) : null
  const qty = params.qty ? parseInt(params.qty, 10) : null
  const material = VALID_MATERIALS.includes(params.material as LabelMaterial) ? params.material as LabelMaterial : null
  const finish = VALID_FINISHES.includes(params.finish as LabelFinish) ? params.finish as LabelFinish : null
  const sizeLabel = params.size ?? null
  const product = params.product ?? 'Custom Roll Labels'

  if (!width || !height || !qty || !material || !finish || isNaN(qty)) {
    redirect('/shop/roll-labels')
  }

  const price = calculateRollLabelPrice(width, height, qty, material, finish)

  const config = {
    width,
    height,
    qty,
    material,
    finish,
    sizeLabel: sizeLabel ?? `${width}" × ${height}"`,
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
              <Link href="/shop/roll-labels" className="hover:text-lp-green transition-colors">Roll Labels</Link>
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
              Select your unwind direction, upload your file, then proceed to payment.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <RollLabelCheckoutFlow config={config} />
        </div>

      </main>
      <Footer />
    </>
  )
}
