'use client'

import { useState } from 'react'
import { Upload, CheckCircle, AlertCircle, Loader2, FileText } from 'lucide-react'
import { useUploadThing } from '@/lib/uploadthingClient'

interface ArtworkUploaderProps {
  stripeSessionId: string
}

type UploadState = 'idle' | 'uploading' | 'success' | 'error'

export default function ArtworkUploader({ stripeSessionId }: ArtworkUploaderProps) {
  const [uploadState, setUploadState] = useState<UploadState>('idle')
  const [fileName, setFileName] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState(false)

  const { startUpload, isUploading } = useUploadThing('artworkUploader', {
    headers: { 'x-session-id': stripeSessionId },
    onClientUploadComplete: async (res) => {
      if (!res?.[0]) return
      const file = res[0]
      setFileName(file.name)

      // Notify our backend to update Sanity + email Steve
      try {
        await fetch('/api/artwork', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            stripeSessionId,
            fileUrl: file.ufsUrl,
            fileName: file.name,
          }),
        })
        setUploadState('success')
      } catch {
        setUploadState('error')
        setErrorMsg('Upload succeeded but we couldn\'t notify the team. Please email us your file.')
      }
    },
    onUploadError: (err) => {
      console.error('Upload error:', err)
      setUploadState('error')
      setErrorMsg(err.message ?? 'Upload failed. Please try again or email us your file.')
    },
  })

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return
    const file = files[0]
    setErrorMsg(null)
    setUploadState('uploading')
    startUpload([file])
  }

  if (uploadState === 'success') {
    return (
      <div className="rounded-card border border-green-200 bg-green-50 p-6 flex gap-4 items-start">
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
          <CheckCircle size={20} className="text-green-600" />
        </div>
        <div>
          <p className="font-semibold text-green-900 mb-1">Artwork received!</p>
          <p className="text-sm text-green-700">
            <span className="font-medium">{fileName}</span> has been uploaded.
            We'll have your proof ready soon.
          </p>
        </div>
      </div>
    )
  }

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
        {[
          '300 DPI minimum',
          'CMYK preferred',
          'Include bleed if possible',
          'PDF · AI · EPS · PNG · SVG',
        ].map(spec => (
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
        onDrop={(e) => {
          e.preventDefault()
          setDragOver(false)
          handleFiles(e.dataTransfer.files)
        }}
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

      {/* Error state */}
      {uploadState === 'error' && errorMsg && (
        <div className="mt-4 flex gap-3 items-start p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-red-800">Upload failed</p>
            <p className="text-sm text-red-600 mt-0.5">{errorMsg}</p>
            <a
              href={`mailto:steve@lettuceprint.com?subject=Artwork for order`}
              className="text-sm text-red-700 underline mt-1 inline-block"
            >
              Email us your file instead →
            </a>
          </div>
        </div>
      )}

      <p className="text-xs text-gray-400 mt-4 text-center">
        You can also email your artwork to{' '}
        <a href="mailto:steve@lettuceprint.com" className="text-lp-green hover:underline">
          steve@lettuceprint.com
        </a>
      </p>
    </div>
  )
}
