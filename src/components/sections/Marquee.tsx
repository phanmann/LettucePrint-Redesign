import { cn } from '@/lib/utils'

interface MarqueeProps {
  items: string[]
  speed?: 'normal' | 'fast'
  className?: string
  bgClassName?: string
  textClassName?: string
}

export default function Marquee({
  items,
  speed = 'normal',
  className,
  bgClassName = 'bg-lp-black',
  textClassName = 'text-white',
}: MarqueeProps) {
  const doubled = [...items, ...items]

  return (
    <div className={cn('overflow-hidden py-4', bgClassName, className)}>
      <div className={cn(
        'flex whitespace-nowrap',
        speed === 'fast' ? 'animate-marquee-fast' : 'animate-marquee'
      )}>
        {doubled.map((item, i) => (
          <span
            key={i}
            className={cn(
              'inline-flex items-center gap-6 px-6',
              'text-small font-semibold uppercase tracking-wider',
              textClassName
            )}
          >
            {item}
            <span className="text-white/50 text-lg">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
