'use client'

import { useEffect, useState } from 'react'

/** Navigates to the existing mobile form; never creates another purchase action. */
export default function OrderShortcut({ label = 'Order options' }: { label?: 'Order options' | 'Request quote' }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const target = document.querySelector<HTMLElement>('[data-mobile-order-module]')
    const footer = document.querySelector('footer')
    if (!target) return
    let moduleVisible = false
    let footerVisible = false
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.target === target) moduleVisible = entry.isIntersecting
        if (entry.target === footer) footerVisible = entry.isIntersecting
      }
      setVisible(!moduleVisible && !footerVisible)
    }, { rootMargin: '-88px 0px 0px 0px' })
    observer.observe(target)
    if (footer) observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  function goToOrder() {
    const target = document.querySelector<HTMLElement>('[data-mobile-order-module]')
    if (!target) return
    target.focus({ preventScroll: true })
    target.scrollIntoView({ block: 'start', behavior: 'instant' })
  }

  return visible ? <div className="product-order-shortcut lg:hidden">
    <button type="button" onClick={goToOrder} className="rounded-full bg-lp-green-dark px-5 py-3 text-sm font-semibold text-white shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lp-green">
      {label}
    </button>
  </div> : null
}
