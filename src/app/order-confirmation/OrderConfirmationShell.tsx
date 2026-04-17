'use client'

import { useState } from 'react'
import { Mail, Clock, FileText, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import ArtworkUploader from './ArtworkUploader'

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

const RUSH_LABELS: Record<string, string> = {
  standard: '3–5 business days',
  '48hr': '48-hour rush',
  '24hr': '24-hour rush',
}

const STEPS = [
  { icon: Mail,        title: 'Check your email',       desc: 'A receipt has been sent to your email address.' },
  { icon: FileText,    title: 'Upload your artwork',    desc: 'Use the uploader above — or email your file to steve@lettuceprint.com.' },
  { icon: CheckCircle, title: 'Approve your proof',    desc: "We'll send a digital proof for your approval before anything goes to print." },
  { icon: Clock,       title: 'Production & shipping', desc: 'Once you approve the final proof, we print and ship.' },
]

export default function OrderConfirmationShell({ order }: { order: OrderDetails }) {
  const [showSummary, setShowSummary] = useState(false)

  return (
    <>
      {/* Artwork uploader — always shown first */}
      <ArtworkUploader
        stripeSessionId={order.id}
        onConfirmed={() => setShowSummary(true)}
      />

      {/* Order summary — revealed after artwork confirmed */}
      {showSummary && (
        <>
          <div className="bg-white rounded-card shadow-card border border-gray-100 p-8 mb-10 animate-fade-in">
            <h2 className="text-h3 font-semibold text-gray-900 mb-6">Order summary</h2>
            <div className="divide-y divide-gray-100">
              {[
                { label: 'Order ID',   value: order.id.slice(-12).toUpperCase() },
                { label: 'Product',    value: order.productName },
                { label: 'Quantity',   value: Number(order.quantity).toLocaleString() },
                { label: 'Size',       value: order.size },
                { label: 'Material',   value: order.material },
                { label: 'Finish',     value: order.finish },
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
          </div>

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
              <Button size="lg">
                Place another order <ArrowRight size={16} />
              </Button>
            </Link>
            <Link href="/">
              <Button variant="secondary" size="lg">
                Back to home
              </Button>
            </Link>
          </div>
        </>
      )}
    </>
  )
}
