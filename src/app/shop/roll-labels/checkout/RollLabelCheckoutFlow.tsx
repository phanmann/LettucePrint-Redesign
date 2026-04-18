'use client'

import { useState } from 'react'
import { useUploadThing } from '@/lib/uploadthingClient'
import { CheckCircle, Upload, Eye, CreditCard, RotateCcw } from 'lucide-react'
import Button from '@/components/ui/Button'
import { MATERIAL_LABELS, FINISH_LABELS, type LabelMaterial, type LabelFinish } from '@/lib/roll-label-pricing'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

// ── Unwind directions ────────────────────────────────────────────────────────
// Industry standard 1–8. Label face shown as rectangle, roll core shown as circle.
// Arrow indicates direction label feeds off roll.

type UnwindDirection = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

interface DirectionOption {
  id: UnwindDirection
  label: string
  description: string
}

const DIRECTIONS: DirectionOption[] = [
  { id: 1, label: 'Direction 1', description: 'Unwinds from top, face out, labels feed right' },
  { id: 2, label: 'Direction 2', description: 'Unwinds from top, face out, labels feed left' },
  { id: 3, label: 'Direction 3', description: 'Unwinds from bottom, face out, labels feed left' },
  { id: 4, label: 'Direction 4', description: 'Unwinds from bottom, face out, labels feed right' },
  { id: 5, label: 'Direction 5', description: 'Unwinds from top, face in, labels feed right' },
  { id: 6, label: 'Direction 6', description: 'Unwinds from top, face in, labels feed left' },
  { id: 7, label: 'Direction 7', description: 'Unwinds from bottom, face in, labels feed left' },
  { id: 8, label: 'Direction 8', description: 'Unwinds from bottom, face in, labels feed right' },
]

// SVG diagram for each unwind direction
function DirectionDiagram({ dir, selected }: { dir: UnwindDirection; selected: boolean }) {
  const color = selected ? '#00A175' : '#6B7280'
  const bg = selected ? '#F0FBF7' : '#F9FAFB'

  // Label rectangle position and roll core position vary by direction
  // Core is always a circle; arrow shows feed direction
  // Face out (1-4): label top faces up. Face in (5-8): label top faces down (rotated).
  const configs: Record<UnwindDirection, {
    coreX: number; coreY: number;
    labelX: number; labelY: number; labelRotate: number;
    arrowPath: string;
    feedLabel: string;
  }> = {
    1: { coreX: 50, coreY: 70, labelX: 50, labelY: 28, labelRotate: 0,   arrowPath: 'M 62 48 L 78 48 L 72 42 M 78 48 L 72 54', feedLabel: '→' },
    2: { coreX: 50, coreY: 70, labelX: 50, labelY: 28, labelRotate: 0,   arrowPath: 'M 38 48 L 22 48 L 28 42 M 22 48 L 28 54', feedLabel: '←' },
    3: { coreX: 50, coreY: 30, labelX: 50, labelY: 72, labelRotate: 0,   arrowPath: 'M 38 52 L 22 52 L 28 46 M 22 52 L 28 58', feedLabel: '←' },
    4: { coreX: 50, coreY: 30, labelX: 50, labelY: 72, labelRotate: 0,   arrowPath: 'M 62 52 L 78 52 L 72 46 M 78 52 L 72 58', feedLabel: '→' },
    5: { coreX: 50, coreY: 70, labelX: 50, labelY: 28, labelRotate: 180, arrowPath: 'M 62 48 L 78 48 L 72 42 M 78 48 L 72 54', feedLabel: '→' },
    6: { coreX: 50, coreY: 70, labelX: 50, labelY: 28, labelRotate: 180, arrowPath: 'M 38 48 L 22 48 L 28 42 M 22 48 L 28 54', feedLabel: '←' },
    7: { coreX: 50, coreY: 30, labelX: 50, labelY: 72, labelRotate: 180, arrowPath: 'M 38 52 L 22 52 L 28 46 M 22 52 L 28 58', feedLabel: '←' },
    8: { coreX: 50, coreY: 30, labelX: 50, labelY: 72, labelRotate: 180, arrowPath: 'M 62 52 L 78 52 L 72 46 M 78 52 L 72 58', feedLabel: '→' },
  }

  const c = configs[dir]
  const faceOut = dir <= 4

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" style={{ background: bg }}>
      {/* Roll core */}
      <circle cx={c.coreX} cy={c.coreY} r="12" fill="none" stroke={color} strokeWidth="2" />
      <circle cx={c.coreX} cy={c.coreY} r="5" fill={color} opacity="0.3" />

      {/* Label rectangle */}
      <g transform={`rotate(${c.labelRotate}, 50, 50)`}>
        <rect
          x={c.labelX - 16} y={c.labelY - 14}
          width="32" height="28"
          rx="2"
          fill="white" stroke={color} strokeWidth="1.5"
        />
        {/* "TOP" indicator line */}
        <line
          x1={c.labelX - 10} y1={c.labelY - 14}
          x2={c.labelX + 10} y2={c.labelY - 14}
          stroke={color} strokeWidth="3" strokeLinecap="round"
        />
        {/* Face indicator */}
        <text x={c.labelX} y={c.labelY + 2} textAnchor="middle" fontSize="6" fill={color} opacity="0.7">
          {faceOut ? 'FACE' : 'BACK'}
        </text>
        <text x={c.labelX} y={c.labelY + 9} textAnchor="middle" fontSize="5" fill={color} opacity="0.5">
          {faceOut ? 'OUT' : 'IN'}
        </text>
      </g>

      {/* Feed direction arrow */}
      <path d={c.arrowPath} stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Direction number */}
      <text x="50" y="96" textAnchor="middle" fontSize="7" fontWeight="bold" fill={color}>
        {dir}
      </text>
    </svg>
  )
}

// ── Step indicator ───────────────────────────────────────────────────────────
const STEPS = ['Direction', 'Upload', 'Review', 'Pay']

function StepBar({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-0 mb-8">
      {STEPS.map((label, i) => (
        <div key={label} className="flex items-center flex-1 last:flex-none">
          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors ${
              i < current ? 'bg-lp-green text-white' :
              i === current ? 'bg-lp-green text-white ring-4 ring-lp-green/20' :
              'bg-gray-200 text-gray-500'
            }`}>
              {i < current ? <CheckCircle size={12} /> : i + 1}
            </div>
            <span className={`text-xs font-semibold hidden sm:block ${i <= current ? 'text-gray-900' : 'text-gray-400'}`}>
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`flex-1 h-px mx-3 ${i < current ? 'bg-lp-green' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

// ── Order sidebar ─────────────────────────────────────────────────────────────
interface Config {
  width: number
  height: number
  qty: number
  material: LabelMaterial
  finish: LabelFinish
  sizeLabel: string
  product: string
  totalFormatted: string
  totalCents: number
}

function OrderSidebar({ config, direction }: { config: Config; direction: UnwindDirection | null }) {
  return (
    <div className="bg-white rounded-card border border-gray-100 p-6 lg:sticky lg:top-24">
      <h3 className="text-small font-semibold text-gray-900 mb-4">Your order</h3>
      <div className="space-y-2 text-small mb-4">
        <div className="flex justify-between">
          <span className="text-gray-500">Product</span>
          <span className="font-semibold text-gray-900 text-right">{config.product}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Size</span>
          <span className="font-semibold text-gray-900">{config.sizeLabel}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Quantity</span>
          <span className="font-semibold text-gray-900">{config.qty.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Material</span>
          <span className="font-semibold text-gray-900">{MATERIAL_LABELS[config.material]}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Finish</span>
          <span className="font-semibold text-gray-900">{FINISH_LABELS[config.finish]}</span>
        </div>
        {direction && (
          <div className="flex justify-between">
            <span className="text-gray-500">Unwind</span>
            <span className="font-semibold text-lp-green">Direction {direction}</span>
          </div>
        )}
      </div>
      <div className="border-t border-gray-100 pt-4 space-y-1">
        <div className="flex justify-between text-small">
          <span className="text-gray-500">Subtotal</span>
          <span className="font-semibold">{config.totalFormatted}</span>
        </div>
        <div className="flex justify-between text-small">
          <span className="text-gray-500">Shipping</span>
          <span className="text-gray-400 italic">Calculated at checkout</span>
        </div>
        <div className="flex justify-between text-base font-bold text-lp-green mt-2 pt-2 border-t border-gray-100">
          <span>Est. Total</span>
          <span>{config.totalFormatted}+</span>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">What happens next</p>
        <ol className="space-y-2">
          {['Select unwind direction', 'Upload your artwork', 'We review & send a proof', 'You approve · we print & ship'].map((s, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-gray-500">
              <span className="w-4 h-4 rounded-full bg-lp-green/10 text-lp-green flex-shrink-0 flex items-center justify-center text-[10px] font-bold mt-0.5">{i + 1}</span>
              {s}
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function RollLabelCheckoutFlow({ config }: { config: Config }) {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0) // 0=direction, 1=upload, 2=review, 3=pay
  const [direction, setDirection] = useState<UnwindDirection | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [fileUrl, setFileUrl] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sessionId = typeof window !== 'undefined'
    ? (sessionStorage.getItem('lp-session') ?? (() => {
        const id = crypto.randomUUID()
        sessionStorage.setItem('lp-session', id)
        return id
      })())
    : ''

  const { startUpload, isUploading } = useUploadThing('artworkUploader', {
    headers: { 'x-session-id': sessionId },
    onClientUploadComplete: (res) => {
      if (res?.[0]) {
        setFileUrl(res[0].url)
        setFileName(res[0].name)
        setStep(2)
      }
    },
    onUploadError: () => setError('Upload failed. Please try again.'),
  })

  const handleFile = (file: File) => {
    setError(null)
    startUpload([file])
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const handlePay = async () => {
    if (!fileUrl || !direction) return
    setLoading(true)
    try {
      // Store artwork in Sanity via artwork API
      await fetch('/api/artwork', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, artworkUrl: fileUrl, artworkFilename: fileName }),
      })

      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: config.product,
          size: config.sizeLabel,
          quantity: config.qty,
          material: config.material,
          finish: config.finish,
          rush: 'standard',
          overridePriceCents: config.totalCents,
          artworkUrl: fileUrl,
          artworkFilename: fileName,
          unwindDirection: direction,
          sessionId,
        }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch (e) {
      console.error(e)
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  const isImage = fileName ? /\.(png|jpe?g|gif|webp|svg)$/i.test(fileName) : false
  const isPDF = fileName ? /\.pdf$/i.test(fileName) : false

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main panel */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-card border border-gray-100 p-6 sm:p-8">
          <StepBar current={step} />

          {/* ── Step 0: Unwind Direction ── */}
          {step === 0 && (
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-lp-green flex items-center justify-center">
                  <RotateCcw size={16} className="text-white" />
                </div>
                <h2 className="text-h3 font-semibold text-gray-900">Select unwind direction</h2>
              </div>
              <p className="text-small text-gray-500 mb-1">
                How should the labels come off the roll? This affects how your applicator or team feeds the labels. 
                <strong className="text-gray-700"> The thick bar on each label indicates the top edge of your design.</strong>
              </p>
              <p className="text-xs text-gray-400 mb-6">
                Not sure? Check your label applicator manual, or{' '}
                <a href="mailto:steve@lettuceprint.com" className="text-lp-green underline">email us</a> — we'll confirm before printing.
              </p>

              <div className="grid grid-cols-4 gap-3 mb-6">
                {DIRECTIONS.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setDirection(d.id)}
                    className={`relative rounded-lg border-2 transition-all duration-150 overflow-hidden aspect-square ${
                      direction === d.id
                        ? 'border-lp-green shadow-md'
                        : 'border-gray-200 hover:border-lp-green/50'
                    }`}
                  >
                    <DirectionDiagram dir={d.id} selected={direction === d.id} />
                    {direction === d.id && (
                      <div className="absolute top-1 right-1 w-4 h-4 bg-lp-green rounded-full flex items-center justify-center">
                        <CheckCircle size={10} className="text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {direction && (
                <div className="mb-6 p-3 bg-lp-green/5 border border-lp-green/20 rounded-lg">
                  <p className="text-sm font-semibold text-lp-green">Direction {direction} selected</p>
                  <p className="text-xs text-gray-600 mt-0.5">{DIRECTIONS[direction - 1].description}</p>
                </div>
              )}

              <Button
                onClick={() => setStep(1)}
                disabled={!direction}
                size="lg"
                className="w-full"
              >
                Continue to artwork upload →
              </Button>
              {!direction && (
                <p className="text-xs text-red-400 text-center mt-2">Please select an unwind direction to continue</p>
              )}
            </div>
          )}

          {/* ── Step 1: Upload ── */}
          {step === 1 && (
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-lp-green flex items-center justify-center">
                  <Upload size={16} className="text-white" />
                </div>
                <h2 className="text-h3 font-semibold text-gray-900">Upload your artwork</h2>
              </div>
              <p className="text-small text-gray-500 mb-6">
                PDF or AI files preferred. Include bleed where possible.
              </p>

              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-card p-12 text-center transition-all duration-200 ${
                  isDragging ? 'border-lp-green bg-lp-green/5' :
                  isUploading ? 'border-lp-green/50 bg-gray-50' :
                  'border-gray-200 hover:border-lp-green/50 bg-gray-50'
                }`}
              >
                {isUploading ? (
                  <div>
                    <div className="w-10 h-10 border-2 border-lp-green border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                    <p className="text-small font-semibold text-gray-700">Uploading…</p>
                  </div>
                ) : (
                  <>
                    <Upload size={32} className="text-gray-300 mx-auto mb-3" />
                    <p className="text-small font-semibold text-gray-700 mb-1">Drop your file here</p>
                    <p className="text-xs text-gray-400 mb-4">Max 64MB · PDF · AI · EPS · PNG · SVG</p>
                    <label className="cursor-pointer">
                      <span className="px-4 py-2 bg-white border border-gray-200 rounded-input text-xs font-semibold text-gray-700 hover:border-lp-green hover:text-lp-green transition-colors">
                        Browse files
                      </span>
                      <input
                        type="file"
                        className="sr-only"
                        accept=".pdf,.ai,.eps,.png,.jpg,.jpeg,.svg"
                        onChange={(e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]) }}
                      />
                    </label>
                  </>
                )}
              </div>

              {error && <p className="text-xs text-red-500 mt-3 text-center">{error}</p>}

              <button
                onClick={() => setStep(0)}
                className="mt-4 text-xs text-gray-400 hover:text-gray-700 transition-colors"
              >
                ← Back to direction selection
              </button>
            </div>
          )}

          {/* ── Step 2: Review ── */}
          {step === 2 && fileUrl && (
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-lp-green flex items-center justify-center">
                  <Eye size={16} className="text-white" />
                </div>
                <h2 className="text-h3 font-semibold text-gray-900">Review your file</h2>
              </div>
              <p className="text-small text-gray-500 mb-6">Does this look right? Confirm to proceed to payment.</p>

              <div className="rounded-card border border-gray-100 overflow-hidden mb-4 bg-gray-50">
                {isImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={fileUrl} alt="Artwork preview" className="w-full max-h-80 object-contain p-4" />
                ) : isPDF ? (
                  <iframe src={fileUrl} className="w-full h-80" title="PDF preview" />
                ) : (
                  <div className="h-40 flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <div className="text-3xl mb-2">📄</div>
                      <p className="text-sm font-medium text-gray-600">{fileName}</p>
                      <p className="text-xs text-gray-400">Preview not available for this file type</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-input border border-gray-100 mb-4 text-xs text-gray-600">
                <span>📎 {fileName}</span>
                <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="text-lp-green font-semibold hover:underline">
                  Open full size
                </a>
              </div>

              {/* Unwind direction confirmation */}
              {direction && (
                <div className="mb-6 flex items-center gap-4 p-4 bg-lp-green/5 border border-lp-green/20 rounded-card">
                  <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border border-lp-green/30">
                    <DirectionDiagram dir={direction} selected={true} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Unwind Direction</p>
                    <p className="text-base font-bold text-lp-green">Direction {direction}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{DIRECTIONS[direction - 1].description}</p>
                    <button
                      onClick={() => setStep(0)}
                      className="text-xs text-gray-400 hover:text-lp-green underline mt-1 transition-colors"
                    >
                      Change direction
                    </button>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <Button onClick={handlePay} disabled={loading} size="lg" className="flex-1">
                  <CreditCard size={16} className="mr-2" />
                  {loading ? 'Redirecting…' : 'Looks good — proceed to payment →'}
                </Button>
                <button
                  onClick={() => { setFileUrl(null); setFileName(null); setStep(1) }}
                  className="px-4 py-3 bg-white border border-gray-200 rounded-card text-sm font-semibold text-gray-700 hover:border-gray-400 transition-colors flex items-center gap-2"
                >
                  <RotateCcw size={14} />
                  Upload different file
                </button>
              </div>
              {error && <p className="text-xs text-red-500 mt-3 text-center">{error}</p>}
            </div>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div>
        <OrderSidebar config={config} direction={direction} />
      </div>
    </div>
  )
}
