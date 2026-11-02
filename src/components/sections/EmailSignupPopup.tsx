'use client'

import { useId, useRef, useState, useSyncExternalStore } from 'react'

const STORAGE_KEY = 'lp-email-signup'
const DISMISS_KEY = 'lp-email-signup-dismissed'
type Status = 'idle' | 'submitting' | 'success' | 'error'

const noopSubscribe = () => () => {}
const readStored = () => window.localStorage.getItem(STORAGE_KEY)
const readDismissed = () => window.sessionStorage.getItem(DISMISS_KEY) === '1'
const WIDE_QUERY = '(min-width: 640px)'
const subscribeWide = (onChange: () => void) => {
  const query = window.matchMedia(WIDE_QUERY)
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}
const readWide = () => window.matchMedia(WIDE_QUERY).matches

export default function EmailSignupPopup() {
  // Client-only snapshots keep the server render empty, so hydration never mismatches.
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false)
  const stored = useSyncExternalStore(noopSubscribe, readStored, () => null)
  const [openOverride, setOpen] = useState<boolean | null>(null)
  // Phones start minimized so the panel never covers hero calls to action; visitors can open it.
  const wide = useSyncExternalStore(subscribeWide, readWide, () => false)
  const open = openOverride ?? (wide && !(stored === 'minimized' || stored === 'subscribed'))
  // Dismissal hides the whole widget for the rest of this browser session.
  const storedDismissed = useSyncExternalStore(noopSubscribe, readDismissed, () => false)
  const [dismissedNow, setDismissedNow] = useState(false)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')
  const inputId = useId()
  const statusId = useId()
  const reopenRef = useRef<HTMLButtonElement>(null)
  const minimizeRef = useRef<HTMLButtonElement>(null)

  function setPanel(next: boolean) {
    setOpen(next)
    if (status !== 'success') window.localStorage.setItem(STORAGE_KEY, next ? 'open' : 'minimized')
    requestAnimationFrame(() => (next ? minimizeRef.current : reopenRef.current)?.focus())
  }

  function dismiss() {
    window.sessionStorage.setItem(DISMISS_KEY, '1')
    setDismissedNow(true)
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const value = email.trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setStatus('error')
      setMessage('Please enter a valid email address.')
      return
    }
    setStatus('submitting')
    setMessage('')
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value }),
      })
      if (response.ok) {
        setStatus('success')
        setMessage("Thanks! We'll be in touch about our monthly deals and offers.")
        window.localStorage.setItem(STORAGE_KEY, 'subscribed')
        return
      }
      setStatus('error')
      setMessage(response.status === 503
        ? "Signups aren't available just yet. Please check back soon."
        : 'Something went wrong. Please try again.')
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  if (!mounted || storedDismissed || dismissedNow) return null

  if (!open) {
    return (
      <div className="fixed bottom-4 right-4 z-30">
        <button
          ref={reopenRef}
          type="button"
          onClick={() => setPanel(true)}
          aria-label="Open monthly deals email signup"
          className="rounded-full bg-[#00a175] px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-[#008a64] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00a175] focus-visible:ring-offset-2"
        >
          ✉ Monthly deals
        </button>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss monthly deals signup"
          className="absolute -left-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border border-black/10 bg-white text-xs font-bold text-gray-600 shadow transition hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00a175]"
        >
          <span aria-hidden="true">✕</span>
        </button>
      </div>
    )
  }

  return (
    <section
      aria-label="Monthly deals email signup"
      className="fixed bottom-3 right-3 z-30 w-[calc(100vw-1.5rem)] max-w-[320px] rounded-[12px] border border-black/10 bg-white p-4 shadow-[0_8px_32px_rgba(0,0,0,0.14)] sm:bottom-4 sm:right-4"
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-semibold leading-snug text-gray-900">
          Stay connected to know about our monthly deals and offers!
        </p>
        <button
          ref={minimizeRef}
          type="button"
          onClick={() => setPanel(false)}
          aria-label="Minimize email signup"
          className="-mr-1 -mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00a175]"
        >
          <span aria-hidden="true" className="text-lg leading-none">–</span>
        </button>
      </div>

      {status === 'success' ? (
        <p id={statusId} role="status" className="mt-3 text-sm text-[#00a175]">{message}</p>
      ) : (
        <form onSubmit={onSubmit} noValidate className="mt-3">
          <label htmlFor={inputId} className="sr-only">Email address</label>
          <div className="flex gap-2">
            <input
              id={inputId}
              type="email"
              name="email"
              autoComplete="email"
              inputMode="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(event) => { setEmail(event.target.value); if (status === 'error') setStatus('idle') }}
              aria-invalid={status === 'error'}
              aria-describedby={message ? statusId : undefined}
              className="min-w-0 flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#00a175] focus:outline-none focus:ring-2 focus:ring-[#00a175]/30"
            />
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="shrink-0 rounded-md bg-[#00a175] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#008a64] disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00a175] focus-visible:ring-offset-2"
            >
              {status === 'submitting' ? 'Joining…' : 'Subscribe'}
            </button>
          </div>
          <p id={statusId} role="status" aria-live="polite" className={`mt-2 min-h-[1rem] text-xs ${status === 'error' ? 'text-red-600' : 'text-gray-500'}`}>
            {message}
          </p>
        </form>
      )}
    </section>
  )
}
