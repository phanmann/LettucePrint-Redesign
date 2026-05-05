import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CheckoutFlow from '@/components/shop/CheckoutFlow'

export const metadata: Metadata = {
  title: 'Upload Artwork & Checkout — Lettuce Print',
  description: 'Upload your artwork and proceed to checkout.',
  robots: { index: false },
}

interface PageProps {
  searchParams: Promise<{
    product?: string
    size?: string
    qty?: string
    material?: string
    finish?: string
    rush?: string
    cancelPath?: string
  }>
}

export default async function MarketingMaterialsCheckoutPage({ searchParams }: PageProps) {
  const params = await searchParams

  const product  = params.product  ?? null
  const size     = params.size     ?? null
  const qty      = params.qty      ? parseInt(params.qty, 10) : null
  const material = params.material ?? 'standard'
  const finish   = params.finish   ?? 'standard'
  const rush     = params.rush     ?? 'standard'
  const cancelPath = params.cancelPath ?? '/services/marketing-materials'

  if (!product || !size || !qty || isNaN(qty)) {
    redirect(cancelPath)
  }

  const config = {
    product,
    size,
    qty,
    material,
    finish,
    rush,
    // Quote-based — price confirmed after order
    totalFormatted: 'Quote',
    totalCents: 0,
    theme: 'light' as const,
    cancelPath,
    skipPreview: true,
    artworkNote: 'AI · PDF · EPS preferred — 300 DPI min for raster files',
    acceptedFormats: 'AI · PDF · EPS · PSD · PNG · JPG',
  }

  // Derive breadcrumb label from cancelPath
  const breadcrumbLabel = product

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
              <Link href="/services/marketing-materials" className="hover:text-lp-green transition-colors">Marketing Materials</Link>
              <span>/</span>
              <Link href={cancelPath} className="hover:text-lp-green transition-colors">{breadcrumbLabel}</Link>
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
              Upload your file and submit your order. We&apos;ll confirm pricing and send a proof before anything goes to print.
            </p>
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-lp-green/5 border border-lp-green/20 rounded-lg">
              <span className="text-xs font-medium text-lp-green">
                ✓ Pricing confirmed within a few hours · No charge until you approve your proof
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
