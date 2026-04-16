import { cn } from '@/lib/utils'

type BadgeVariant = 'rush' | 'popular' | 'new' | 'sale' | 'custom' | 'best-value'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  'rush':       'bg-lp-yellow text-lp-black',
  'popular':    'bg-lp-green text-white',
  'new':        'bg-lp-blue text-lp-green-dark',
  'sale':       'bg-lp-green-dark text-white',
  'custom':     'bg-lp-purple text-white',
  'best-value': 'bg-lp-yellow text-lp-black',
}

export default function Badge({ variant = 'popular', children, className }: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-1',
      'rounded-badge text-xs font-semibold uppercase tracking-wider',
      variantStyles[variant],
      className
    )}>
      {children}
    </span>
  )
}
