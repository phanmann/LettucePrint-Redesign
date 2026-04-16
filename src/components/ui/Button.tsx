'use client'

import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  asChild?: boolean
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:   'bg-lp-green text-white hover:bg-lp-green-dark border-2 border-lp-green hover:border-lp-green-dark',
  secondary: 'bg-transparent text-lp-green border-2 border-lp-green hover:bg-lp-green hover:text-white',
  ghost:     'bg-transparent text-white border-2 border-white hover:bg-white hover:text-lp-green',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-5 py-2.5 text-xs',
  md: 'px-7 py-3.5 text-small',
  lg: 'px-8 py-4 text-small',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2',
          'font-semibold uppercase tracking-wider',
          'rounded-button',
          'transition-all duration-200 ease-out',
          'hover:scale-[1.02] active:scale-[0.98]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lp-green focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:pointer-events-none',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
