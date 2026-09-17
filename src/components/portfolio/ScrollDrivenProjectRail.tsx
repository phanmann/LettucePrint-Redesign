'use client'

import { useEffect, useRef, type ReactNode } from 'react'

interface ScrollDrivenProjectRailProps {
  children: ReactNode
  className?: string
}

const WHEEL_IMPULSE = 0.0022
const TOUCH_MULTIPLIER = 0.45
const DECAY_PER_FRAME = 0.9
const MIN_VELOCITY = 0.005
const MAX_VELOCITY = 0.9
const FRAME_DURATION = 1000 / 60

interface TouchState {
  y: number
  time: number
}

export default function ScrollDrivenProjectRail({ children, className }: ScrollDrivenProjectRailProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef(0)
  const cycleWidthRef = useRef(0)
  const velocityRef = useRef(0)
  const animationFrameRef = useRef<number | null>(null)
  const previousFrameRef = useRef<number | null>(null)
  const touchRef = useRef<TouchState | null>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const wrapOffset = (value: number) => {
      const cycleWidth = cycleWidthRef.current
      if (!cycleWidth) return value

      const remainder = ((value % cycleWidth) + cycleWidth) % cycleWidth
      return remainder === 0 ? 0 : remainder - cycleWidth
    }

    const renderOffset = () => {
      track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`
    }

    const stopGlide = () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      animationFrameRef.current = null
      previousFrameRef.current = null
    }

    const glide = (timestamp: number) => {
      if (previousFrameRef.current === null) {
        previousFrameRef.current = timestamp
      }

      const elapsed = Math.min(timestamp - previousFrameRef.current, 32)
      previousFrameRef.current = timestamp
      offsetRef.current = wrapOffset(offsetRef.current + velocityRef.current * elapsed)
      velocityRef.current *= Math.pow(DECAY_PER_FRAME, elapsed / FRAME_DURATION)
      renderOffset()

      if (Math.abs(velocityRef.current) > MIN_VELOCITY) {
        animationFrameRef.current = requestAnimationFrame(glide)
      } else {
        velocityRef.current = 0
        animationFrameRef.current = null
        previousFrameRef.current = null
      }
    }

    const startGlide = () => {
      if (animationFrameRef.current === null && Math.abs(velocityRef.current) > MIN_VELOCITY) {
        animationFrameRef.current = requestAnimationFrame(glide)
      }
    }

    const measure = () => {
      const styles = window.getComputedStyle(track)
      const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0
      cycleWidthRef.current = (track.scrollWidth + gap) / 2
      offsetRef.current = wrapOffset(offsetRef.current)
      renderOffset()
    }

    const handleWheel = (event: WheelEvent) => {
      const unit = event.deltaMode === WheelEvent.DOM_DELTA_LINE
        ? 16
        : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
          ? window.innerHeight
          : 1
      const impulse = -event.deltaY * unit * WHEEL_IMPULSE

      velocityRef.current = Math.sign(velocityRef.current) === Math.sign(impulse)
        ? velocityRef.current + impulse
        : impulse
      velocityRef.current = Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, velocityRef.current))
      startGlide()
    }

    const handleTouchStart = (event: TouchEvent) => {
      const y = event.touches[0]?.clientY
      if (y === undefined) return

      stopGlide()
      velocityRef.current = 0
      touchRef.current = { y, time: performance.now() }
    }

    const handleTouchMove = (event: TouchEvent) => {
      const currentY = event.touches[0]?.clientY
      const previousTouch = touchRef.current
      if (currentY === undefined || previousTouch === null) return

      const now = performance.now()
      const elapsed = Math.max(now - previousTouch.time, 1)
      const movement = -(previousTouch.y - currentY) * TOUCH_MULTIPLIER
      offsetRef.current = wrapOffset(offsetRef.current + movement)
      velocityRef.current = Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, movement / elapsed))
      touchRef.current = { y: currentY, time: now }
      renderOffset()
    }

    const clearTouch = () => {
      touchRef.current = null
      startGlide()
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
      stopGlide()
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
