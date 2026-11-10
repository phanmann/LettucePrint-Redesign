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
  x: number
  axis: 'x' | 'y' | null
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
  const draggedRef = useRef(false)
  const touchRef = useRef<TouchState | null>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

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
      if (!reducedMotion.matches && animationFrameRef.current === null && Math.abs(velocityRef.current) > MIN_VELOCITY) {
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
      if (window.matchMedia('(max-width: 767px)').matches) return
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
      stopGlide()
      velocityRef.current = 0
      draggedRef.current = false
      const touch = event.touches[0]
      touchRef.current = event.touches.length === 1 && touch
        ? { x: touch.clientX, y: touch.clientY, axis: null, time: performance.now() }
        : null
    }
    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0]
      const previous = touchRef.current
      if (event.touches.length !== 1) { touchRef.current = null; velocityRef.current = 0; return }
      if (!touch || !previous) return
      const dx = touch.clientX - previous.x
      const dy = touch.clientY - previous.y
      if (!previous.axis) {
        if (Math.max(Math.abs(dx), Math.abs(dy)) < 6) return
        previous.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y'
      }
      if (previous.axis !== 'x') return
      if (event.cancelable) event.preventDefault()
      draggedRef.current = true
      const now = performance.now()
      const movement = dx * TOUCH_MULTIPLIER
      offsetRef.current = wrapOffset(offsetRef.current + movement)
      velocityRef.current = Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, movement / Math.max(now - previous.time, 1)))
      touchRef.current = { x: touch.clientX, y: touch.clientY, axis: 'x', time: now }
      renderOffset()
    }
    const clearTouch = () => { touchRef.current = null; startGlide() }
    const cancelTouch = () => { touchRef.current = null; velocityRef.current = 0; stopGlide() }
    const suppressDragClick = (event: MouseEvent) => {
      if (!draggedRef.current || event.detail === 0) return
      event.preventDefault()
      event.stopPropagation()
      draggedRef.current = false
    }

    measure()
    const resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(track)
    window.addEventListener('wheel', handleWheel, { passive: true })
    track.addEventListener('touchstart', handleTouchStart, { passive: true })
    track.addEventListener('touchmove', handleTouchMove, { passive: false })
    track.addEventListener('touchend', clearTouch, { passive: true })
    track.addEventListener('touchcancel', cancelTouch, { passive: true })

    track.addEventListener('click', suppressDragClick, true)
    return () => {
      track.removeEventListener('click', suppressDragClick, true)
      stopGlide()
      resizeObserver.disconnect()
      window.removeEventListener('wheel', handleWheel)
      track.removeEventListener('touchstart', handleTouchStart)
      track.removeEventListener('touchmove', handleTouchMove)
      track.removeEventListener('touchend', clearTouch)
      track.removeEventListener('touchcancel', cancelTouch)
    }
  }, [])

  return (
    <div ref={trackRef} className={className} style={{ touchAction: 'pan-y pinch-zoom' }} data-scroll-driven-project-rail>
      {children}
    </div>
  )
}
