'use client'

import { useState } from 'react'
import {
  Upload, CheckCircle, AlertCircle, Loader2,
  FileText, RefreshCw, Eye, ArrowRight,
} from 'lucide-react'
import { useUploadThing } from '@/lib/uploadthingClient'

export interface CheckoutFlowConfig {
  size: string
  qty: number
  material: string
  finish: string
  rush: string
  product: string
  totalFormatted: string
  totalCents: number
  // Visual theme
  theme?: 'light' | 'dark'
  // Extra artwork note shown in spec bar
  artworkNote?: string
  // Override accepted formats label (e.g. 'AI · EPS · SVG · PDF')
  acceptedFormats?: string
  // Cancel URL if user wants to go back
  cancelPath?: string
  // Skip preview step — just show file received confirmation (for non-previewable formats like AI/EPS)
  skipPreview?: boolean
}

const SIZE_LABELS: Record<string, string> = {
  '1x1': '1" × 1"', '2x2': '2" × 2"', '3x3': '3" × 3"',
  '4x4': '4" × 4"', '5x5': '5" × 5"',
}
const MATERIAL_LABELS: Record<string, string> = {
  standard: 'Standard Vinyl', holographic: 'Holographic', 'spot-uv': 'Spot UV',
}
const FINISH_LABELS: Record<string, string> = {
  matte: 'Matte', gloss: 'Gloss', laminate: 'Laminate',
}
const RUSH_LABELS: Record<string, string> = {
  standard: '3–5 business days', '48hr': '48-hour rush', '24hr': '24-hour rush',
}

interface UploadedFile {
  url: string
  name: string
  isPdf: boolean
  isImage: boolean
}

type FlowState = 'upload' | 'uploading' | 'preview' | 'received' | 'paying' | 'error'

export default function CheckoutFlow({ config }: { config: CheckoutFlowConfig }) {
  const [flowState, setFlowState] = useState<FlowState>('upload')
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const isDark = config.theme === 'dark'

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
      setFlowState(config.skipPreview ? 'received' : 'preview')
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
        throw new Error('No checkout URL')
      }
    } catch (err) {
      console.error(err)
      setFlowState('error')
      setErrorMsg('Something went wrong creating your checkout. Please try again.')
    }
  }

  const formatsLabel = config.acceptedFormats ?? 'PDF · AI · EPS · PNG · SVG'
  const specs = [
    '300 DPI minimum',
    'CMYK preferred',
    'Include bleed if possible',
    ...(config.artworkNote ? [config.artworkNote] : [formatsLabel]),
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

      {/* ── Left: Upload / Preview ── */}
      <div className="lg:col-span-2">

        {/* Upload zone */}
        {(flowState === 'upload' || flowState === 'uploading' || flowState === 'error') && (
          <div className={`rounded-card shadow-card border p-8 ${isDark ? 'bg-lp-black border-white/10' : 'bg-white border-gray-100'}`}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-lp-green flex items-center justify-center">
                <Upload size={16} className="text-white" />
              </div>
              <h2 className={`text-h3 font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Upload your artwork</h2>
            </div>
            <p className={`text-small mb-6 ml-11 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
              We'll review your file and send a proof before anything goes to print.
            </p>

            {/* Specs */}
            <div className={`rounded-lg px-4 py-3 mb-6 flex flex-wrap gap-x-6 gap-y-1 ${isDark ? 'bg-white/5 border border-white/10' : 'bg-[#acf2f9]/20 border border-[#acf2f9]'}`}>
              {specs.map(s => (
                <span key={s} className={`text-xs font-medium ${isDark ? 'text-white/60' : 'text-gray-700'}`}>✓ {s}</span>
              ))}
            </div>

            {/* Drop zone */}
            <label
              className={`
                relative flex flex-col items-center justify-center gap-3 w-full min-h-[200px]
                border-2 border-dashed rounded-xl cursor-pointer transition-colors
                ${dragOver
                  ? 'border-lp-green bg-lp-green/5'
                  : isDark
                    ? 'border-white/20 bg-white/5 hover:border-lp-green hover:bg-lp-green/5'
                    : 'border-gray-300 bg-gray-50 hover:border-lp-green hover:bg-lp-green/5'
                }
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
                  <p className={`text-sm font-medium ${isDark ? 'text-white/70' : 'text-gray-700'}`}>Uploading…</p>
                </>
              ) : (
                <>
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center ${isDark ? 'bg-white/10' : 'bg-gray-200'}`}>
                    <FileText size={28} className={isDark ? 'text-white/50' : 'text-gray-500'} />
                  </div>
                  <div className="text-center">
                    <p className={`text-sm font-semibold ${isDark ? 'text-white/80' : 'text-gray-900'}`}>
                      Drop your file here, or <span className="text-lp-green">browse</span>
                    </p>
                    <p className={`text-xs mt-1 ${isDark ? 'text-white/40' : 'text-gray-500'}`}>Max 64MB · {formatsLabel}</p>
                  </div>
                </>
              )}
            </label>

            {flowState === 'error' && errorMsg && (
              <div className="mt-4 flex gap-3 items-start p-4 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-red-800">Something went wrong</p>
                  <p className="text-sm text-red-600 mt-0.5">{errorMsg}</p>
                  <button onClick={handleReupload} className="text-sm text-red-700 underline mt-1">Try again</button>
                </div>
              </div>
            )}

            <p className={`text-xs mt-4 text-center ${isDark ? 'text-white/30' : 'text-gray-400'}`}>
              Can't upload right now?{' '}
              <a href="mailto:steve@lettuceprint.com" className="text-lp-green hover:underline">Email us your file</a>
              {' '}and we'll set you up manually.
            </p>
          </div>
        )}

        {/* File received — no preview (skipPreview mode) */}
        {(flowState === 'received' || (config.skipPreview && flowState === 'paying')) && uploadedFile && (
          <div className={`rounded-card shadow-card border p-8 ${isDark ? 'bg-lp-black border-white/10' : 'bg-white border-gray-100'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-lp-green flex items-center justify-center">
                <CheckCircle size={16} className="text-white" />
              </div>
              <h2 className={`text-h3 font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>File received</h2>
            </div>

            <div className={`flex items-center gap-4 px-5 py-4 rounded-xl border mb-6 ${isDark ? 'bg-white/5 border-white/10' : 'bg-lp-green/5 border-lp-green/20'}`}>
              <div className="w-10 h-10 rounded-full bg-lp-green/10 flex items-center justify-center flex-shrink-0">
                <FileText size={20} className="text-lp-green" />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{uploadedFile.name}</p>
                <p className={`text-xs mt-0.5 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>Uploaded successfully</p>
              </div>
              <CheckCircle size={18} className="text-lp-green flex-shrink-0" />
            </div>

            <p className={`text-sm mb-6 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
              We&apos;ll review your file and send a proof before anything goes to print. Proceed to payment to confirm your order.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleProceedToPayment}
                disabled={flowState === 'paying'}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-lp-green text-white font-semibold rounded-lg hover:bg-lp-green-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm"
              >
                {flowState === 'paying'
                  ? <><Loader2 size={16} className="animate-spin" /> Taking you to payment…</>
                  : <><CheckCircle size={16} /> Proceed to payment <ArrowRight size={14} /></>
                }
              </button>
              <button
                onClick={handleReupload}
                disabled={flowState === 'paying'}
                className={`flex items-center justify-center gap-2 px-6 py-4 border-2 font-semibold rounded-lg transition-colors disabled:opacity-60 text-sm ${isDark ? 'border-white/20 text-white/70 hover:border-white/40' : 'border-gray-300 text-gray-700 hover:border-gray-400'}`}
              >
                <RefreshCw size={16} /> Upload different file
              </button>
            </div>
          </div>
        )}

        {/* Preview */}
        {(flowState === 'preview' || flowState === 'paying') && uploadedFile && (
          <div className={`rounded-card shadow-card border p-8 ${isDark ? 'bg-lp-black border-white/10' : 'bg-white border-gray-100'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-lp-green flex items-center justify-center">
                <Eye size={16} className="text-white" />
              </div>
              <h2 className={`text-h3 font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Review your file</h2>
            </div>

            <div className={`rounded-xl border overflow-hidden mb-6 ${isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
              {uploadedFile.isImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={uploadedFile.url} alt="Artwork preview" className="w-full max-h-[420px] object-contain p-6" />
              ) : uploadedFile.isPdf ? (
                <div className="p-4">
                  <iframe
                    src={`https://docs.google.com/viewer?url=${encodeURIComponent(uploadedFile.url)}&embedded=true`}
                    className="w-full h-[380px] rounded border-0"
                    title="Artwork PDF preview"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 px-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-lp-green/10 flex items-center justify-center mb-4">
                    <FileText size={28} className="text-lp-green" />
                  </div>
                  <p className={`text-sm font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{uploadedFile.name}</p>
                  <p className={`text-xs mb-4 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                    Browser previews aren't available for {uploadedFile.name.split('.').pop()?.toUpperCase()} files — but your file uploaded successfully.
                  </p>
                  <a href={uploadedFile.url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-lp-green hover:border-lp-green transition-colors">
                    Open in new tab to verify →
                  </a>
                  <p className={`text-xs mt-4 ${isDark ? 'text-white/30' : 'text-gray-400'}`}>If this is the wrong file, use "Upload different file" below.</p>
                </div>
              )}
            </div>

            <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border mb-6 ${isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
              <FileText size={16} className={isDark ? 'text-white/40' : 'text-gray-400'} />
              <span className={`text-sm font-medium truncate flex-1 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>{uploadedFile.name}</span>
              <a href={uploadedFile.url} target="_blank" rel="noopener noreferrer" className="text-xs text-lp-green hover:underline flex-shrink-0">Open full size</a>
            </div>

            <p className={`text-sm mb-5 text-center ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
              Does this look right? Confirm to proceed to payment.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleProceedToPayment}
                disabled={flowState === 'paying'}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-lp-green text-white font-semibold rounded-lg hover:bg-lp-green-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm"
              >
                {flowState === 'paying'
                  ? <><Loader2 size={16} className="animate-spin" /> Taking you to payment…</>
                  : <><CheckCircle size={16} /> Looks good — proceed to payment <ArrowRight size={14} /></>
                }
              </button>
              <button
                onClick={handleReupload}
                disabled={flowState === 'paying'}
                className={`flex items-center justify-center gap-2 px-6 py-4 border-2 font-semibold rounded-lg transition-colors disabled:opacity-60 text-sm ${isDark ? 'border-white/20 text-white/70 hover:border-white/40' : 'border-gray-300 text-gray-700 hover:border-gray-400'}`}
              >
                <RefreshCw size={16} /> Upload different file
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Right: Order summary ── */}
      <div className={`rounded-card shadow-card border p-6 lg:sticky lg:top-24 ${isDark ? 'bg-lp-black border-white/10' : 'bg-white border-gray-100'}`}>
        <h2 className={`text-small font-semibold mb-5 ${isDark ? 'text-white' : 'text-gray-900'}`}>Your order</h2>

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
              <span className={`text-xs ${isDark ? 'text-white/40' : 'text-gray-500'}`}>{row.label}</span>
              <span className={`text-xs font-semibold text-right ${isDark ? 'text-white/80' : 'text-gray-900'}`}>{row.value}</span>
            </div>
          ))}
        </div>

        <div className={`border-t pt-4 mb-6 space-y-2 ${isDark ? 'border-white/10' : 'border-gray-100'}`}>
          <div className="flex justify-between items-center">
            <span className={`text-xs ${isDark ? 'text-white/40' : 'text-gray-500'}`}>Subtotal</span>
            <span className={`text-xs font-semibold ${isDark ? 'text-white/80' : 'text-gray-900'}`}>{config.totalFormatted}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className={`text-xs ${isDark ? 'text-white/40' : 'text-gray-500'}`}>Shipping</span>
            <span className={`text-xs font-medium italic ${isDark ? 'text-white/30' : 'text-gray-400'}`}>Calculated at checkout</span>
          </div>
          <div className={`flex justify-between items-center pt-2 border-t ${isDark ? 'border-white/10' : 'border-gray-100'}`}>
            <span className={`text-small font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Est. Total</span>
            <span className="text-h3 font-semibold text-lp-green">{config.totalFormatted}+</span>
          </div>
        </div>

        <div className="space-y-3">
          <p className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-white/30' : 'text-gray-500'}`}>What happens next</p>
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
              <p className={`text-xs ${isDark ? 'text-white/50' : 'text-gray-600'}`}>{step.text}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
