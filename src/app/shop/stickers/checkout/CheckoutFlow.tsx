'use client'

import { useState } from 'react'
import {
  Upload, CheckCircle, AlertCircle, Loader2,
  FileText, RefreshCw, Eye, ArrowRight,
} from 'lucide-react'
import { useUploadThing } from '@/lib/uploadthingClient'

interface OrderConfig {
  size: string
  qty: number
  material: string
  finish: string
  rush: string
  product: string
  totalFormatted: string
  totalCents: number
}

interface CheckoutFlowProps {
  config: OrderConfig
}

type FlowState = 'upload' | 'uploading' | 'preview' | 'paying' | 'error'

interface UploadedFile {
  url: string
  name: string
  isPdf: boolean
  isImage: boolean
}

const SIZE_LABELS: Record<string, string> = {
  '1x1': '1" × 1"', '2x2': '2" × 2"', '3x3': '3" × 3"',
  '4x4': '4" × 4"', '5x5': '5" × 5"',
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

export default function CheckoutFlow({ config }: CheckoutFlowProps) {
  const [flowState, setFlowState] = useState<FlowState>('upload')
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState(false)

  // We use a temp session key for uploadthing (no Stripe session yet)
  // We'll pass the artwork URL into the Stripe session metadata
  const tempKey = `pre-checkout-${Date.now()}`

  const { startUpload, isUploading } = useUploadThing('artworkUploader', {
    headers: { 'x-session-id': tempKey },
    onClientUploadComplete: (res) => {
      if (!res?.[0]) return
      const file = res[0]
      const ext = file.name.split('.').pop()?.toLowerCase() ?? ''
      setUploadedFile({
        url: file.ufsUrl,
        name: file.name,
        isPdf: ext === 'pdf',
        isImage: ['png', 'jpg', 'jpeg', 'svg', 'gif', 'webp'].includes(ext),
      })
      setFlowState('preview')
    },
    onUploadError: (err) => {
      setFlowState('error')
      setErrorMsg(err.message ?? 'Upload failed. Please try again.')
    },
  })

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return
    setErrorMsg(null)
    setFlowState('uploading')
    startUpload([files[0]])
  }

  const handleReupload = () => {
    setUploadedFile(null)
    setErrorMsg(null)
    setFlowState('upload')
  }

  const handleProceedToPayment = async () => {
    if (!uploadedFile) return
    setFlowState('paying')

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          size: config.size,
          quantity: config.qty,
          material: config.material,
          finish: config.finish,
          rush: config.rush,
          productName: config.product,
          artworkUrl: uploadedFile.url,
          artworkFilename: uploadedFile.name,
        }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error('No checkout URL returned')
      }
    } catch (err) {
      console.error(err)
      setFlowState('error')
      setErrorMsg('Something went wrong creating your checkout. Please try again.')
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

      {/* ── Left: Upload / Preview ── */}
      <div className="lg:col-span-2">

        {/* Upload zone */}
        {(flowState === 'upload' || flowState === 'uploading' || flowState === 'error') && (
          <div className="bg-white rounded-card shadow-card border border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-lp-green flex items-center justify-center">
                <Upload size={16} className="text-white" />
              </div>
              <h2 className="text-h3 font-semibold text-gray-900">Upload your artwork</h2>
            </div>
            <p className="text-small text-gray-500 mb-6 ml-11">
              We'll review your file and send a proof before anything goes to print.
            </p>

            {/* Specs */}
            <div className="bg-[#acf2f9]/20 border border-[#acf2f9] rounded-lg px-4 py-3 mb-6 flex flex-wrap gap-x-6 gap-y-1">
              {['300 DPI minimum', 'CMYK preferred', 'Include bleed if possible', 'PDF · AI · EPS · PNG · SVG'].map(s => (
                <span key={s} className="text-xs font-medium text-gray-700">✓ {s}</span>
              ))}
            </div>

            {/* Drop zone */}
            <label
              className={`
                relative flex flex-col items-center justify-center gap-3 w-full min-h-[200px]
                border-2 border-dashed rounded-xl cursor-pointer transition-colors
                ${dragOver ? 'border-lp-green bg-lp-green/5' : 'border-gray-300 bg-gray-50 hover:border-lp-green hover:bg-lp-green/5'}
                ${isUploading ? 'pointer-events-none opacity-60' : ''}
              `}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files) }}
            >
              <input
                type="file"
                className="sr-only"
                accept=".pdf,.ai,.eps,.png,.svg,.jpg,.jpeg,.tiff,.tif"
                onChange={(e) => handleFiles(e.target.files)}
                disabled={isUploading}
              />
              {isUploading ? (
                <>
                  <Loader2 size={36} className="text-lp-green animate-spin" />
                  <p className="text-sm font-medium text-gray-700">Uploading…</p>
                </>
              ) : (
                <>
                  <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center">
                    <FileText size={28} className="text-gray-500" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-gray-900">
                      Drop your file here, or <span className="text-lp-green">browse</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Max 64MB · PDF, AI, EPS, PNG, SVG</p>
                  </div>
                </>
              )}
            </label>

            {/* Error */}
            {flowState === 'error' && errorMsg && (
              <div className="mt-4 flex gap-3 items-start p-4 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-red-800">Something went wrong</p>
                  <p className="text-sm text-red-600 mt-0.5">{errorMsg}</p>
                  <button
                    onClick={handleReupload}
                    className="text-sm text-red-700 underline mt-1"
                  >
                    Try again
                  </button>
                </div>
              </div>
            )}

            <p className="text-xs text-gray-400 mt-4 text-center">
              Can't upload right now?{' '}
              <a href="mailto:steve@lettuceprint.com" className="text-lp-green hover:underline">
                Email us your file
              </a>{' '}
              and we'll set you up manually.
            </p>
          </div>
        )}

        {/* Preview */}
        {(flowState === 'preview' || flowState === 'paying') && uploadedFile && (
          <div className="bg-white rounded-card shadow-card border border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-lp-green flex items-center justify-center">
                <Eye size={16} className="text-white" />
              </div>
              <h2 className="text-h3 font-semibold text-gray-900">Review your file</h2>
            </div>

            {/* Preview */}
            <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden mb-6">
              {uploadedFile.isImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={uploadedFile.url}
                  alt="Artwork preview"
                  className="w-full max-h-[420px] object-contain p-6"
                />
              ) : uploadedFile.isPdf ? (
                <div className="p-4">
                  <iframe
                    src={`${uploadedFile.url}#toolbar=0&navpanes=0`}
                    className="w-full h-[380px] rounded border border-gray-200"
                    title="Artwork PDF"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-14 text-gray-400">
                  <FileText size={40} className="mb-3" />
                  <p className="text-sm font-medium text-gray-600">{uploadedFile.name}</p>
                  <p className="text-xs text-gray-400 mt-1">Preview not available for this file type</p>
                  <a
                    href={uploadedFile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 text-xs text-lp-green hover:underline"
                  >
                    Open file to verify →
                  </a>
                </div>
              )}
            </div>

            {/* Filename bar */}
            <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 mb-6">
              <FileText size={16} className="text-gray-400 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-700 truncate flex-1">{uploadedFile.name}</span>
              <a
                href={uploadedFile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-lp-green hover:underline flex-shrink-0"
              >
                Open full size
              </a>
            </div>

            <p className="text-sm text-gray-600 mb-5 text-center">
              Does this look right? Confirm to proceed to payment.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleProceedToPayment}
                disabled={flowState === 'paying'}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-lp-green text-white font-semibold rounded-lg hover:bg-lp-green-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm"
              >
                {flowState === 'paying' ? (
                  <><Loader2 size={16} className="animate-spin" /> Taking you to payment…</>
                ) : (
                  <><CheckCircle size={16} /> Looks good — proceed to payment <ArrowRight size={14} /></>
                )}
              </button>
              <button
                onClick={handleReupload}
                disabled={flowState === 'paying'}
                className="flex items-center justify-center gap-2 px-6 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 transition-colors disabled:opacity-60 text-sm"
              >
                <RefreshCw size={16} /> Upload different file
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Right: Order summary sidebar ── */}
      <div className="bg-white rounded-card shadow-card border border-gray-100 p-6 lg:sticky lg:top-24">
        <h2 className="text-small font-semibold text-gray-900 mb-5">Your order</h2>

        <div className="space-y-3 mb-6">
          {[
            { label: 'Product',    value: config.product },
            { label: 'Quantity',   value: config.qty.toLocaleString() },
            { label: 'Size',       value: SIZE_LABELS[config.size] ?? config.size },
            { label: 'Material',   value: MATERIAL_LABELS[config.material] ?? config.material },
            { label: 'Finish',     value: FINISH_LABELS[config.finish] ?? config.finish },
            { label: 'Production', value: RUSH_LABELS[config.rush] ?? config.rush },
          ].map(row => (
            <div key={row.label} className="flex justify-between gap-2">
              <span className="text-xs text-gray-500">{row.label}</span>
              <span className="text-xs font-semibold text-gray-900 text-right">{row.value}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 pt-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-small font-semibold text-gray-700">Total</span>
            <span className="text-h3 font-semibold text-lp-green">{config.totalFormatted}</span>
          </div>
        </div>

        {/* What happens */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">What happens next</p>
          {[
            { n: '1', text: 'Upload your artwork here' },
            { n: '2', text: 'Proceed to secure payment' },
            { n: '3', text: 'We review & send you a proof' },
            { n: '4', text: 'You approve · we print & ship' },
          ].map(step => (
            <div key={step.n} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-lp-green/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[10px] font-bold text-lp-green">{step.n}</span>
              </div>
              <p className="text-xs text-gray-600">{step.text}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
