'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Homepage section links still scroll when the URL already ends in that hash.
export default function FooterLink({ href, className, children }: {
  href: string
  className?: string
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const sectionId = href.startsWith('/#') ? href.slice(2) : null

  function onClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (!sectionId || pathname !== '/') return
    const section = document.getElementById(sectionId)
    if (!section) return
    event.preventDefault()
    window.history.replaceState(null, '', href)
    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  )
}
