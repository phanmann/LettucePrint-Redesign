import type { PlaceholderShape } from '@/lib/sticker-catalog'

// Temporary product art (Steve, 2026-11-05): simple brand-colored shapes until real photos are added.
export default function ShapePlaceholder({ shape, tone = 'solid', roll = false, label, className = '' }: {
  shape: PlaceholderShape
  tone?: 'solid' | 'clear' | 'holographic'
  roll?: boolean
  label: string
  className?: string
}) {
  const id = `g-${shape}-${tone}-${roll ? 'r' : 's'}`
  const fill = tone === 'clear' ? 'rgba(255,255,255,0.35)' : `url(#${id})`
  const stroke = tone === 'clear' ? '#9CA3AF' : '#ffffff'
  const body = (() => {
    switch (shape) {
      case 'circle': return <circle cx="100" cy="100" r="62" />
      case 'square': return <rect x="40" y="40" width="120" height="120" rx="10" />
      case 'rectangle': return <rect x="25" y="55" width="150" height="90" rx="10" />
      case 'oval': return <ellipse cx="100" cy="100" rx="78" ry="54" />
      case 'kiss-cut': return <path d="M100 52c22 0 40 14 44 34 14 4 22 16 18 30-4 16-20 26-38 24-6 18-22 28-40 24-16-4-26-18-24-34-16-6-26-22-20-38 6-16 22-24 38-20 4-12 12-20 22-20z" />
      default: return <path d="M100 38c26 0 46 18 50 40 18 4 28 20 24 38-4 20-22 32-44 30-8 22-28 34-50 28-20-6-32-24-28-44-20-8-32-28-24-48 8-20 28-30 48-24 6-12 14-20 24-20z" />
    }
  })()
  return (
    <div role="img" aria-label={label} className={`flex items-center justify-center bg-gray-50 ${className}`}>
      <svg viewBox="0 0 200 200" className="h-full max-h-56 w-auto" aria-hidden="true">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            {tone === 'holographic' ? (<>
              <stop offset="0%" stopColor="#a5f3fc" /><stop offset="35%" stopColor="#f5d0fe" /><stop offset="70%" stopColor="#fde68a" /><stop offset="100%" stopColor="#bbf7d0" />
            </>) : (<>
              <stop offset="0%" stopColor="#1f9d6b" /><stop offset="100%" stopColor="#0f6b47" />
            </>)}
          </linearGradient>
        </defs>
        {roll && <g fill="#ffffff" stroke="#D1D5DB" strokeWidth="2"><rect x="18" y="22" width="164" height="156" rx="16" /></g>}
        {shape === 'kiss-cut' && !roll && <rect x="30" y="30" width="140" height="140" rx="8" fill="#ffffff" stroke="#D1D5DB" strokeWidth="2" />}
        <g fill={fill} stroke={stroke} strokeWidth="5" strokeLinejoin="round">{body}</g>
        <text x="100" y="108" textAnchor="middle" fontSize="18" fontWeight="700" fill={tone === 'solid' ? '#ffffff' : '#0f6b47'} fontFamily="system-ui, sans-serif">LP</text>
      </svg>
    </div>
  )
}
