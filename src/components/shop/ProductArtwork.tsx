'use client'

import { createContext, useContext, useId, useRef, useState, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import type { CartItem } from '@/lib/cart'
import { useUploadThing } from '@/lib/uploadthingClient'

/** One artwork draft per product module, copied only onto the item being added. */
function useProductOrderState() {
  const cart = useCart()
  const sessionId = useId()
  const [file, setFile] = useState<{ url: string; name: string } | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const pending = useRef(false)
  const { startUpload } = useUploadThing('artworkUploader', { headers: { 'x-session-id': `product-${sessionId}` } })
  const upload = async (selected: File) => {
    if (pending.current) return
    setError('')
    if (!selected.size) { setError('This file is empty. Choose another file.'); return }
    // Matches the currently deployed UploadThing route; do not promise the pending 1 GB upgrade.
    const max = selected.type === 'application/pdf' || selected.type.startsWith('image/') ? 32 : 64
    if (selected.size > max * 1024 * 1024) { setError(`This file exceeds the ${max} MB upload limit.`); return }
    pending.current = true
    setBusy(true)
    try {
      const result = await startUpload([selected])
      if (!result?.[0]?.ufsUrl) throw new Error('Upload did not complete. Please try again.')
      setFile({ url: result[0].ufsUrl, name: result[0].name })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed. Please try again.')
    } finally { pending.current = false; setBusy(false) }
  }
  const addItem = (item: Omit<CartItem, 'id' | 'addedAt'>) => {
    if (pending.current) return
    cart.addItem({ ...item, ...(file ? { artworkUrl: file.url, artworkFilename: file.name } : {}) })
    setFile(null)
    setError('')
  }
  return { addItem, artwork: { file, busy, error, upload, remove: () => { setFile(null); setError('') } } }
}

const ProductOrderContext = createContext<ReturnType<typeof useProductOrderState> | null>(null)

function RouteOrderProvider({ children }: { children: ReactNode }) {
  const order = useProductOrderState()
  return <ProductOrderContext.Provider value={order}>{children}</ProductOrderContext.Provider>
}

/** Desktop/mobile copies share the draft; navigating to another product clears it. */
export function ProductOrderProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  return <RouteOrderProvider key={pathname}>{children}</RouteOrderProvider>
}

export function useProductOrder() {
  const order = useContext(ProductOrderContext)
  if (!order) throw new Error('ProductOrderProvider is required')
  return order
}

export default function ProductArtwork({ artwork, quote = false }: { artwork: ReturnType<typeof useProductOrder>['artwork']; quote?: boolean }) {
  const id = useId()
  return <section aria-label="Product artwork" className="my-5 rounded-xl border border-dashed border-gray-300 bg-lp-blue/30 p-4 min-w-0">
    <p className="text-sm font-bold text-gray-900 mb-1">Artwork</p>
    <p className="text-xs text-gray-600 mb-3">{quote ? 'Upload artwork to include with your quote request.' : 'Upload for this item now, or add it in your cart later.'}</p>
    <div className="flex items-center gap-3 min-w-0">
    <label htmlFor={id} className="shrink-0 text-sm font-semibold text-lp-green">{artwork.file ? 'Replace artwork' : 'Upload artwork'}</label>
    <input id={id} type="file" disabled={artwork.busy} className="block w-0 flex-1 min-w-0 text-xs text-gray-600 file:mr-2 file:rounded-lg file:border-0 file:bg-white file:px-3 file:py-2 file:font-semibold file:text-lp-green disabled:opacity-50" onChange={e => { const file = e.target.files?.[0]; e.target.value = ''; if (file) void artwork.upload(file) }} />
    </div>
    <p className="mt-2 text-xs text-gray-500">PDF/images up to 32 MB; other artwork files up to 64 MB.</p>
    {artwork.busy && <p role="status" className="mt-2 text-sm">{quote ? 'Uploading artwork… Please wait before continuing.' : 'Uploading artwork… Please wait before adding to cart.'}</p>}
    {artwork.file && <div className="mt-3 text-sm"><p role="status" className="break-all font-semibold text-gray-800">Uploaded: {artwork.file.name}</p><button type="button" disabled={artwork.busy} onClick={artwork.remove} className="mt-1 text-xs underline text-gray-600">Remove artwork</button></div>}
    {artwork.error && <p role="alert" className="mt-2 text-sm text-red-700">{artwork.error}</p>}
  </section>
}
