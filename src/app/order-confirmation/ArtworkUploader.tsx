'use client'

import { useState } from 'react'
import { Upload, CheckCircle, AlertCircle, Loader2, FileText, RefreshCw, Eye } from 'lucide-react'
import { useUploadThing } from '@/lib/uploadthingClient'

interface ArtworkUploaderProps {
  stripeSessionId: string
  onConfirmed: () => void // tells the page to reveal the order summary
}

type UploadState = 'idle' | 'uploading' | 'preview' | 'confirming' | 'confirmed' | 'error'

interface UploadedFile {
  url: string
  name: string
  isPdf: boolean
  isImage: boolean
}

export default function ArtworkUploader({ stripeSessionId, onConfirmed }: ArtworkUploaderProps) {
  const [uploadState, setUploadState] = useState<UploadState>('idle')
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState(false)

  const { startUpload, isUploading } = useUploadThing('artworkUploader', {
    headers: { 'x-session-id': stripeSessionId },
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
      setUploadState('preview')
    },
    onUploadError: (err) => {
      console.error('Upload error:', err)
      setUploadState('error')
      setErrorMsg(err.message ?? 'Upload failed. Please try again or email us your file.')
    },
  })

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return
    setErrorMsg(null)
    setUploadState('uploading')
    startUpload([files[0]])
  }

  const handleConfirm = async () => {
    if (!uploadedFile) return
    setUploadState('confirming')

    try {
      const res = await fetch('/api/artwork', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stripeSessionId,
          fileUrl: uploadedFile.url,
          fileName: uploadedFile.name,
        }),
      })

      if (!res.ok) throw new Error('Notification failed')

      setUploadState('confirmed')
      onConfirmed() // reveal order summary below
    } catch {
      setUploadState('error')
      setErrorMsg("We received your file but couldn't confirm it. Please email us if you don't hear from us within an hour.")
    }
  }

  const handleReupload = () => {
    setUploadedFile(null)
    setErrorMsg(null)
    setUploadState('idle')
  }

  // ── Confirmed ──────────────────────────────────────────────────
  if (uploadState === 'confirmed') {
    return (
      <div className="rounded-card border border-green-200 bg-green-50 p-6 flex gap-4 items-start mb-8">
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
          <CheckCircle size={20} className="text-green-600" />
        </div>
        <div>
          <p className="font-semibold text-green-900 mb-1">Artwork submitted!</p>
          <p className="text-sm text-green-700">
            <span className="font-medium">{uploadedFile?.name}</span> is in. We'll review it and send you a proof shortly.
          </p>
        </div>
      </div>
    )
  }

  // ── Preview / confirm ──────────────────────────────────────────
  if (uploadState === 'preview' || uploadState === 'confirming') {
    const file = uploadedFile!
    return (
      <div className="bg-white rounded-card shadow-card border border-gray-100 p-8 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-full bg-lp-green flex items-center justify-center">
            <Eye size={16} className="text-white" />
          </div>
          <h2 className="text-h3 font-semibold text-gray-900">Review your file</h2>
        </div>

        {/* Preview area */}
        <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden mb-6">
          {file.isImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={file.url}
              alt="Uploaded artwork preview"
              className="w-full max-h-[400px] object-contain p-4"
            />
          ) : file.isPdf ? (
            <div className="p-6">
              <iframe
                src={`${file.url}#toolbar=0&navpanes=0`}
                className="w-full h-[360px] rounded border border-gray-200"
                title="Artwork PDF preview"
              />
            </div>
          ) : (
            // Non-previewable (AI, EPS, etc.)
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <FileText size={40} className="mb-3" />
              <p className="text-sm font-medium text-gray-600">{file.name}</p>
              <p className="text-xs text-gray-400 mt-1">Preview not available for this file type</p>
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 text-xs text-lp-green hover:underline"
              >
                Open file to verify →
              </a>
            </div>
          )}
        </div>

        {/* File name bar */}
        <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 mb-6">
          <FileText size={16} className="text-gray-400 flex-shrink-0" />
          <span className="text-sm font-medium text-gray-700 truncate flex-1">{file.name}</span>
          <a
            href={file.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-lp-green hover:underline flex-shrink-0"
          >
            Open full size
          </a>
        </div>

        {/* Call to action */}
        <p className="text-sm text-gray-600 mb-5 text-center">
          Does this look right? Make sure it's the correct file before confirming.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleConfirm}
            disabled={uploadState === 'confirming'}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-lp-green text-white font-semibold rounded-lg hover:bg-lp-green-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm"
          >
            {uploadState === 'confirming' ? (
              <><Loader2 size={16} className="animate-spin" /> Submitting…</>
            ) : (
              <><CheckCircle size={16} /> Yes, submit this file</>
            )}
          </button>

          <button
            onClick={handleReupload}
            disabled={uploadState === 'confirming'}
            className="flex items-center justify-center gap-2 px-6 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 hover:text-gray-900 transition-colors disabled:opacity-60 text-sm"
          >
            <RefreshCw size={16} /> Upload a different file
          </button>
        </div>
      </div>
    )
  }

  // ── Upload zone (idle / uploading / error) ─────────────────────
  return (
    <div className="bg-white rounded-card shadow-card border border-gray-100 p-8 mb-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 rounded-full bg-lp-green flex items-center justify-center">
          <Upload size={16} className="text-white" />
        </div>
        <h2 className="text-h3 font-semibold text-gray-900">Upload your artwork</h2>
      </div>
      <p className="text-small text-gray-500 mb-6 ml-11">
        Upload now to get your proof faster. We'll review it and send you a proof before anything goes to print.
      </p>

      {/* Spec callout */}
      <div className="bg-[#acf2f9]/20 border border-[#acf2f9] rounded-lg px-4 py-3 mb-6 flex flex-wrap gap-x-6 gap-y-1">
        {['300 DPI minimum', 'CMYK preferred', 'Include bleed if possible', 'PDF · AI · EPS · PNG · SVG'].map(spec => (
          <span key={spec} className="text-xs font-medium text-gray-700">✓ {spec}</span>
        ))}
      </div>

      {/* Drop zone */}
      <label
        className={`
          relative flex flex-col items-center justify-center gap-3 w-full min-h-[160px]
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
            <Loader2 size={32} className="text-lp-green animate-spin" />
            <p className="text-sm font-medium text-gray-700">Uploading…</p>
          </>
        ) : (
          <>
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              <FileText size={24} className="text-gray-500" />
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
      {uploadState === 'error' && errorMsg && (
        <div className="mt-4 flex gap-3 items-start p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-red-800">Upload failed</p>
            <p className="text-sm text-red-600 mt-0.5">{errorMsg}</p>
            <a href="mailto:steve@lettuceprint.com?subject=Artwork for order" className="text-sm text-red-700 underline mt-1 inline-block">
              Email us your file instead →
            </a>
          </div>
        </div>
      )}

      <p className="text-xs text-gray-400 mt-4 text-center">
        You can also email your artwork to{' '}
        <a href="mailto:steve@lettuceprint.com" className="text-lp-green hover:underline">steve@lettuceprint.com</a>
      </p>
    </div>
  )
}
