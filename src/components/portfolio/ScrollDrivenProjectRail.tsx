'use client'

import { useEffect, useRef, type ReactNode } from 'react'

interface ScrollDrivenProjectRailProps {
  children: ReactNode
  className?: string
}

const SCROLL_MULTIPLIER = 0.45

export default function ScrollDrivenProjectRail({ children, className }: ScrollDrivenProjectRailProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef(0)
  const cycleWidthRef = useRef(0)
  const touchYRef = useRef<number | null>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const wrapOffset = (value: number) => {
      const cycleWidth = cycleWidthRef.current
      if (!cycleWidth) return value

      const remainder = ((value % cycleWidth) + cycleWidth) % cycleWidth
      return remainder === 0 ? 0 : remainder - cycleWidth
    }

    const renderOffset = (deltaY: number) => {
      offsetRef.current = wrapOffset(offsetRef.current - deltaY * SCROLL_MULTIPLIER)
      track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`
    }

    const measure = () => {
      const styles = window.getComputedStyle(track)
      const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0
      cycleWidthRef.current = (track.scrollWidth + gap) / 2
      offsetRef.current = wrapOffset(offsetRef.current)
      track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`
    }

    const handleWheel = (event: WheelEvent) => {
      const unit = event.deltaMode === WheelEvent.DOM_DELTA_LINE
        ? 16
        : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
          ? window.innerHeight
          : 1
      renderOffset(event.deltaY * unit)
    }

    const handleTouchStart = (event: TouchEvent) => {
      touchYRef.current = event.touches[0]?.clientY ?? null
    }

    const handleTouchMove = (event: TouchEvent) => {
      const currentY = event.touches[0]?.clientY
      if (currentY === undefined || touchYRef.current === null) return

      renderOffset(touchYRef.current - currentY)
      touchYRef.current = currentY
    }

    const clearTouch = () => {
      touchYRef.current = null
    }

    measure()
    const resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(track)
    window.addEventListener('wheel', handleWheel, { passive: true })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', clearTouch, { passive: true })
    window.addEventListener('touchcancel', clearTouch, { passive: true })

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', clearTouch)
      window.removeEventListener('touchcancel', clearTouch)
    }
  }, [])

  return (
    <div ref={trackRef} className={className} data-scroll-driven-project-rail>
      {children}
    </div>
  )
}
