import type { Metadata } from 'next'
import { CheckCircle } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { getStripe } from '@/lib/stripe'
import OrderConfirmationShell from './OrderConfirmationShell'

export const metadata: Metadata = {
  title: 'Order Confirmed',
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
    }
  } catch {
    return null
  }
}

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
            <h1 className="text-h1 font-semibold text-white mb-4">
              Order confirmed!
            </h1>
            <p className="text-body-lg text-white/80">
              {order?.customerEmail
                ? <>A receipt has been sent to <strong className="text-white">{order.customerEmail}</strong></>
                : "Thank you for your order. We've got it and will be in touch shortly."
              }
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {order ? (
            <OrderConfirmationShell order={order} />
          ) : (
            // Fallback — no session or unpaid
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">We couldn't load your order details.</p>
              <a href="mailto:info@lettuceprint.com" className="text-lp-green hover:underline text-sm">
                Contact us if you need help →
              </a>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
