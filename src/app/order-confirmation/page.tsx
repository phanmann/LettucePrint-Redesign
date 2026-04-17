import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, ArrowRight, Mail, Clock, FileText } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'
import { getStripe } from '@/lib/stripe'

export const metadata: Metadata = {
  title: 'Order Confirmed — Lettuce Print',
  description: 'Your order has been received. Thank you for choosing Lettuce Print.',
  robots: { index: false },
}

interface PageProps {
  searchParams: Promise<{ session_id?: string }>
}

interface OrderDetails {
  id: string
  customerEmail: string | null
  productName: string
  amount: number
  quantity: string
  size: string
  material: string
  finish: string
  rush: string
  hasArtwork: boolean
}

async function getOrderDetails(sessionId: string): Promise<OrderDetails | null> {
  try {
    const stripe = getStripe()
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items'],
    })

    if (session.payment_status !== 'paid') return null

    const lineItem = session.line_items?.data?.[0]
    const meta = session.metadata ?? {}

    return {
      id: session.id,
      customerEmail: session.customer_details?.email ?? null,
      productName: lineItem?.description ?? lineItem?.price?.product?.toString() ?? 'Custom Print Order',
      amount: session.amount_total ?? 0,
      quantity: meta.quantity ?? '—',
      size: meta.size ?? '—',
      material: meta.material ?? '—',
      finish: meta.finish ?? '—',
      rush: meta.rush ?? 'standard',
      hasArtwork: Boolean(meta.artworkUrl),
    }
  } catch {
    return null
  }
}

const SIZE_LABELS: Record<string, string> = {
  '1x1': '1” × 1”', '2x2': '2” × 2”', '3x3': '3” × 3”', '4x4': '4” × 4”', '5x5': '5” × 5”',
}
const MATERIAL_LABELS: Record<string, string> = {
  standard: 'Standard Vinyl', holographic: 'Holographic',
}
const FINISH_LABELS: Record<string, string> = {
  matte: 'Matte', gloss: 'Gloss', laminate: 'Laminate',
}
const RUSH_LABELS: Record<string, string> = {
  standard: '3–5 business days', '48hr': '48-hour rush', '24hr': '24-hour rush',
}

const STEPS = [
  { icon: Mail,        title: 'Check your email',      desc: 'A receipt has been sent to your email address.' },
  { icon: FileText,    title: 'We\'re reviewing your artwork', desc: 'Our team will review your file and prepare a digital proof.' },
  { icon: CheckCircle, title: 'Approve your proof',   desc: 'You\'ll get a proof by email — approve it before anything goes to print.' },
  { icon: Clock,       title: 'Production & shipping', desc: 'Once the final proof is approved, we print and ship.' },
]

export default async function OrderConfirmationPage({ searchParams }: PageProps) {
  const { session_id } = await searchParams
  const order = session_id ? await getOrderDetails(session_id) : null

  return (
    <>
      <Navbar />
      <main className="pt-[72px] min-h-screen">

        {/* Hero */}
        <div className="bg-lp-green py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-white" />
            </div>
            <h1 className="text-h1 font-semibold text-white mb-4">Order confirmed!</h1>
            <p className="text-body-lg text-white/80">
              {order?.customerEmail
                ? <>A receipt has been sent to <strong className="text-white">{order.customerEmail}</strong></>
                : "Thank you for your order. We've got it and will be in touch shortly."
              }
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

          {/* Order summary */}
          {order && (
            <div className="bg-white rounded-card shadow-card border border-gray-100 p-8 mb-10">
              <h2 className="text-h3 font-semibold text-gray-900 mb-6">Order summary</h2>
              <div className="divide-y divide-gray-100">
                {[
                  { label: 'Order ID',   value: order.id.slice(-12).toUpperCase() },
                  { label: 'Product',    value: order.productName },
                  { label: 'Quantity',   value: Number(order.quantity).toLocaleString() },
                  { label: 'Size',       value: SIZE_LABELS[order.size] ?? order.size },
                  { label: 'Material',   value: MATERIAL_LABELS[order.material] ?? order.material },
                  { label: 'Finish',     value: FINISH_LABELS[order.finish] ?? order.finish },
                  { label: 'Production', value: RUSH_LABELS[order.rush] ?? order.rush },
                  { label: 'Total paid', value: `$${(order.amount / 100).toFixed(2)}`, highlight: true },
                ].map(row => (
                  <div key={row.label} className="flex justify-between py-3">
                    <span className="text-small text-gray-500 font-medium">{row.label}</span>
                    <span className={`text-small font-semibold ${row.highlight ? 'text-lp-green' : 'text-gray-900'}`}>
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Artwork status */}
              {order.hasArtwork ? (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="bg-lp-green/5 border border-lp-green/30 rounded-xl p-5 flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-lp-green flex items-center justify-center flex-shrink-0">
                      <CheckCircle size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Artwork received — you're all set!</p>
                      <p className="text-sm text-gray-600 mb-3">We'll review your file and email you a digital proof within 1 business day. Nothing goes to print until you approve it.</p>
                      <div className="flex items-center gap-2 text-xs font-medium text-lp-green">
                        <span className="w-1.5 h-1.5 rounded-full bg-lp-green animate-pulse" />
                        Next: proof sent to {order.customerEmail ?? 'your email'}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <Mail size={20} className="text-amber-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Artwork still needed</p>
                      <p className="text-sm text-gray-600">Email your file to{' '}
                        <a href="mailto:steve@lettuceprint.com" className="text-lp-green font-semibold hover:underline">steve@lettuceprint.com</a>
                        {' '}with your order ID and we'll get started.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* What happens next */}
          <div className="mb-10">
            <h2 className="text-h3 font-semibold text-gray-900 mb-6">What happens next?</h2>
            <div className="space-y-4">
              {STEPS.map((step, i) => {
                const Icon = step.icon
                return (
                  <div key={i} className="flex gap-5 items-start">
                    <div className="w-10 h-10 rounded-full bg-lp-green/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon size={18} className="text-lp-green" />
                    </div>
                    <div>
                      <p className="text-small font-semibold text-gray-900 mb-0.5">{step.title}</p>
                      <p className="text-small text-gray-500">{step.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Questions */}
          <div className="bg-gray-50 rounded-card border border-gray-100 p-6 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-small font-semibold text-gray-900 mb-1">Questions about your order?</p>
              <p className="text-small text-gray-500">
                Email us at{' '}
                <a href="mailto:info@lettuceprint.com" className="text-lp-green font-semibold hover:underline">
                  info@lettuceprint.com
                </a>{' '}
                with your order ID.
              </p>
            </div>
            <a href="mailto:info@lettuceprint.com" className="flex-shrink-0">
              <Button variant="secondary" size="md">Contact us</Button>
            </a>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop">
              <Button size="lg">Place another order <ArrowRight size={16} /></Button>
            </Link>
            <Link href="/">
              <Button variant="secondary" size="lg">Back to home</Button>
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
