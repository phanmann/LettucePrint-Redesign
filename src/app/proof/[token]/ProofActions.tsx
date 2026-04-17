'use client'

import { useState } from 'react'
import { CheckCircle, RefreshCw, Loader2, AlertCircle } from 'lucide-react'

interface ProofActionsProps {
  token: string
}

type ActionState = 'idle' | 'submitting' | 'approved' | 'changes_sent' | 'error' | 'already_responded'

export default function ProofActions({ token }: ProofActionsProps) {
  const [state, setState] = useState<ActionState>('idle')
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const submit = async (action: 'approve' | 'changes') => {
    if (action === 'changes' && !showFeedback) {
      setShowFeedback(true)
      return
    }
    if (action === 'changes' && !feedback.trim()) {
      setErrorMsg('Please describe the changes you need before submitting.')
      return
    }

    setState('submitting')
    setErrorMsg(null)

    try {
      const res = await fetch('/api/proof/respond', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, action, feedback: feedback.trim() || undefined }),
      })

      const data = await res.json()

      if (res.status === 409) {
        setState('already_responded')
        return
      }

      if (!res.ok) {
        throw new Error(data.error ?? 'Something went wrong')
      }

      setState(action === 'approve' ? 'approved' : 'changes_sent')
    } catch (err) {
      setState('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please email us.')
    }
  }

  // ── Result states ──────────────────────────────────────────────

  if (state === 'approved') {
    return (
      <div className="rounded-card border border-green-200 bg-green-50 p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-green-600" />
        </div>
        <h2 className="text-h3 font-semibold text-green-900 mb-2">Proof approved!</h2>
        <p className="text-sm text-green-700 max-w-sm mx-auto">
          We've got your approval. We'll send you a final proof before anything goes to print. Keep an eye on your inbox.
        </p>
      </div>
    )
  }

  if (state === 'changes_sent') {
    return (
      <div className="rounded-card border border-amber-200 bg-amber-50 p-8 text-center">
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <RefreshCw size={32} className="text-amber-600" />
        </div>
        <h2 className="text-h3 font-semibold text-amber-900 mb-2">Changes noted!</h2>
        <p className="text-sm text-amber-700 max-w-sm mx-auto">
          We've received your feedback and will prepare a revised proof. We'll be in touch shortly.
        </p>
      </div>
    )
  }

  if (state === 'already_responded') {
    return (
      <div className="rounded-card border border-gray-200 bg-gray-50 p-8 text-center">
        <p className="text-sm font-semibold text-gray-700 mb-1">Already responded</p>
        <p className="text-sm text-gray-500">
          You've already submitted a response for this proof. Questions?{' '}
          <a href="mailto:steve@lettuceprint.com" className="text-lp-green hover:underline">Email us</a>.
        </p>
      </div>
    )
  }

  // ── Action UI ──────────────────────────────────────────────────

  return (
    <div className="space-y-4">
      {/* Error */}
      {state === 'error' && errorMsg && (
        <div className="flex gap-3 items-start p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{errorMsg}</p>
        </div>
      )}

      {/* Feedback box — shown when requesting changes */}
      {showFeedback && (
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-900 block">
            What needs to change?
          </label>
          <textarea
            value={feedback}
            onChange={(e) => { setFeedback(e.target.value); setErrorMsg(null) }}
            placeholder="Describe the changes you need — spelling, sizing, color, layout..."
            rows={4}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lp-green focus:border-transparent resize-none"
          />
          {errorMsg && <p className="text-xs text-red-600">{errorMsg}</p>}
        </div>
      )}

      {/* CTA buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Approve */}
        {!showFeedback && (
          <button
            onClick={() => submit('approve')}
            disabled={state === 'submitting'}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-lp-green text-white font-semibold rounded-lg hover:bg-lp-green-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm"
          >
            {state === 'submitting' ? (
              <><Loader2 size={16} className="animate-spin" /> Processing…</>
            ) : (
              <><CheckCircle size={16} /> Approve this proof</>
            )}
          </button>
        )}

        {/* Request changes */}
        <button
          onClick={() => showFeedback ? submit('changes') : setShowFeedback(true)}
          disabled={state === 'submitting'}
          className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-semibold rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm border-2
            ${showFeedback
              ? 'bg-amber-500 text-white border-amber-500 hover:bg-amber-600'
              : 'bg-transparent text-gray-700 border-gray-300 hover:border-gray-400 hover:text-gray-900'
            }`}
        >
          {state === 'submitting' && showFeedback ? (
            <><Loader2 size={16} className="animate-spin" /> Sending…</>
          ) : (
            <><RefreshCw size={16} /> {showFeedback ? 'Submit changes' : 'Request changes'}</>
          )}
        </button>

        {/* Cancel feedback */}
        {showFeedback && (
          <button
            onClick={() => { setShowFeedback(false); setFeedback(''); setErrorMsg(null) }}
            className="px-4 py-4 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>

      <p className="text-xs text-gray-400 text-center pt-1">
        By approving, you confirm the proof is correct. We'll send a final proof before production starts.
      </p>
    </div>
  )
}
