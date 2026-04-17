import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ExternalLink, FileText } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { client } from '@/sanity/client'
import ProofActions from './ProofActions'

export const metadata: Metadata = {
  title: 'Review Your Proof — Lettuce Print',
  description: 'Review and approve your Lettuce Print proof before production.',
  robots: { index: false, follow: false },
}

interface PageProps {
  params: Promise<{ token: string }>
}

interface ProofOrder {
  _id: string
  customerEmail: string | null
  customerName: string | null
  productName: string | null
  quantity: number | null
  size: string | null
  material: string | null
  finish: string | null
  proofUrl: string | null
  proofFilename: string | null
  proofStatus: 'pending' | 'approved' | 'changes_requested'
  proofToken: string
}

async function getOrderByToken(token: string): Promise<ProofOrder | null> {
  try {
    const query = `*[_type == "order" && proofToken == $token][0]{
        _id,
        customerEmail,
        customerName,
        productName,
        quantity,
        size,
        material,
        finish,
        proofUrl,
        proofFilename,
        proofStatus,
        proofToken
      }`
    return await client.fetch<ProofOrder | null>(query, { token } as Record<string, string>)
  } catch {
    return null
  }
}

const PROOF_STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending:           { label: 'Awaiting your response', color: 'bg-blue-100 text-blue-700' },
  approved:          { label: 'Approved',                color: 'bg-green-100 text-green-700' },
  changes_requested: { label: 'Changes requested',       color: 'bg-amber-100 text-amber-700' },
}

export default async function ProofPage({ params }: PageProps) {
  const { token } = await params
  const order = await getOrderByToken(token)

  if (!order) {
    notFound()
  }

  const statusBadge = PROOF_STATUS_LABELS[order.proofStatus] ?? PROOF_STATUS_LABELS.pending
  const isPdf = order.proofFilename?.toLowerCase().endsWith('.pdf')
  const alreadyResponded = order.proofStatus !== 'pending'

  return (
    <>
      <Navbar />
      <main className="pt-[72px] min-h-screen bg-gray-50">

        {/* Header */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-h2 font-semibold text-gray-900">Review your proof</h1>
                <p className="text-small text-gray-500 mt-1">
                  {order.productName ?? 'Your order'}{order.quantity ? ` · ${order.quantity} pcs` : ''}{order.size ? ` · ${order.size}` : ''}
                </p>
              </div>
              <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold self-start sm:self-auto ${statusBadge.color}`}>
                {statusBadge.label}
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Proof viewer — takes up 2/3 */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-card shadow-card border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText size={16} className="text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">
                      {order.proofFilename ?? 'proof'}
                    </span>
                  </div>
                  {order.proofUrl && (
                    <a
                      href={order.proofUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-medium text-lp-green hover:underline"
                    >
                      Open full size <ExternalLink size={12} />
                    </a>
                  )}
                </div>

                {/* Proof display */}
                <div className="bg-gray-100 min-h-[400px] flex items-center justify-center p-4">
                  {order.proofUrl ? (
                    isPdf ? (
                      <iframe
                        src={`${order.proofUrl}#toolbar=0`}
                        className="w-full h-[600px] rounded border border-gray-200"
                        title="Proof PDF"
                      />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={order.proofUrl}
                        alt="Your proof"
                        className="max-w-full max-h-[600px] object-contain rounded shadow-sm"
                      />
                    )
                  ) : (
                    <div className="text-center text-gray-400">
                      <FileText size={40} className="mx-auto mb-3" />
                      <p className="text-sm">Proof not available</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Warning */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
                <p className="text-xs text-amber-800">
                  <strong>Review carefully:</strong> Check spelling, colors, sizing, and bleed before approving. Once approved and sent to production, changes cannot be made.
                </p>
              </div>
            </div>

            {/* Sidebar — order details + actions */}
            <div className="space-y-6">

              {/* Order details */}
              <div className="bg-white rounded-card shadow-card border border-gray-100 p-6">
                <h2 className="text-small font-semibold text-gray-900 mb-4">Order details</h2>
                <div className="space-y-2">
                  {[
                    { label: 'Product',  value: order.productName },
                    { label: 'Quantity', value: order.quantity?.toLocaleString() },
                    { label: 'Size',     value: order.size },
                    { label: 'Material', value: order.material },
                    { label: 'Finish',   value: order.finish },
                  ].filter(r => r.value).map(row => (
                    <div key={row.label} className="flex justify-between gap-2">
                      <span className="text-xs text-gray-500">{row.label}</span>
                      <span className="text-xs font-semibold text-gray-900 text-right">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="bg-white rounded-card shadow-card border border-gray-100 p-6">
                <h2 className="text-small font-semibold text-gray-900 mb-4">Your response</h2>
                {alreadyResponded ? (
                  <div className="text-center py-2">
                    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${statusBadge.color}`}>
                      {statusBadge.label}
                    </span>
                    <p className="text-xs text-gray-500 mt-3">
                      You've already responded to this proof.{' '}
                      <a href="mailto:steve@lettuceprint.com" className="text-lp-green hover:underline">Email us</a> if you need to make changes.
                    </p>
                  </div>
                ) : (
                  <ProofActions token={token} />
                )}
              </div>

              {/* Contact */}
              <div className="text-center">
                <p className="text-xs text-gray-400">
                  Questions?{' '}
                  <a href="mailto:steve@lettuceprint.com" className="text-lp-green hover:underline">
                    steve@lettuceprint.com
                  </a>
                  {' · '}
                  <a href="tel:3476030557" className="text-lp-green hover:underline">
                    (347) 603-0557
                  </a>
                </p>
              </div>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
