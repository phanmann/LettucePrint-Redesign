'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ShoppingCart } from 'lucide-react'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/Button'

type NavLink = { label: string; href: string; children?: { label: string; href: string }[] }

const navLinks: NavLink[] = [
  { label: 'Marketing Materials', href: '/services/marketing-materials', children: [
    { label: 'Business Cards', href: '/services/marketing-materials/business-cards' },
    { label: 'Postcards', href: '/services/marketing-materials/postcards' },
    { label: 'Flyers', href: '/services/marketing-materials/flyers' },
    { label: 'Posters', href: '/services/marketing-materials/posters' },
    { label: 'Brochures', href: '/services/marketing-materials/brochures' },
    { label: 'Booklets', href: '/services/marketing-materials/booklets' },
  ]},
  { label: 'Stickers & Labels', href: '/shop/stickers', children: [
    { label: 'Stickers', href: '/shop/stickers' },
    { label: 'Spot UV Stickers', href: '/shop/spot-uv' },
    { label: 'Roll Labels', href: '/shop/roll-labels' },
  ]},
  { label: 'Boxes & Packaging', href: '/services/packaging', children: [
    { label: 'Boxes', href: '/services/packaging/boxes' },
    { label: 'Mylar Bags', href: '/services/packaging/mylar-bags' },
    { label: 'Custom Packaging', href: '/services/packaging/custom-packaging' },
  ]},
  { label: 'Signs & Banners', href: '/services/signage', children: [
    { label: 'Banners', href: '/services/signage/banners' },
    { label: 'Backdrops', href: '/services/signage/backdrops' },
    { label: 'SEG Light Displays', href: '/services/signage/seg-light-displays' },
  ]},
  { label: 'Apparel & Promo', href: '/services/apparel', children: [
    { label: 'Screenprint', href: '/services/apparel/screenprint' },
    { label: 'Embroidery', href: '/services/apparel/embroidery' },
    { label: 'DTG', href: '/services/apparel/dtg' },
    { label: 'Custom Items', href: '/services/apparel/custom-items' },
  ]},
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const openDropdown = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setActiveDropdown(label)
  }

  const closeDropdown = () => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 120)
  }

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-nav border-b border-gray-100'
          : 'bg-white border-b border-gray-100'
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/images/logos/LP_Logos_Wordmark-Green.svg"
                alt="Lettuce Print"
                width={140}
                height={40}
                priority
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.children && openDropdown(link.label)}
                  onMouseLeave={closeDropdown}
                >
                  <span
                    className={cn(
                      'text-small font-medium text-gray-900 transition-colors duration-200 select-none',
                      link.children ? 'cursor-default' : 'cursor-pointer hover:text-lp-green'
                    )}
                  >
                    {link.label}
                  </span>

                  {/* Dropdown */}
                  {link.children && activeDropdown === link.label && (
                    <div
                      className="absolute top-full left-0 w-52 bg-white rounded-card shadow-nav border border-gray-100 py-2 z-50"
                      onMouseEnter={() => openDropdown(link.label)}
                      onMouseLeave={closeDropdown}
                    >
                      {/* Invisible bridge covers the gap between trigger and menu */}
                      <div className="absolute -top-3 left-0 right-0 h-3" />
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-small text-gray-700 hover:text-lp-green hover:bg-gray-50 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <button className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-100 hover:bg-lp-green hover:text-white transition-all duration-150">
                <ShoppingCart size={18} />
              </button>
              <Link href="/get-quote">
                <Button size="md">Get a Quote</Button>
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden w-11 h-11 flex items-center justify-center rounded-full bg-gray-100"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-modal flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <Image src="/images/logos/LP_Logos_Wordmark-Green.svg" alt="Lettuce Print" width={120} height={36} />
              <button onClick={() => setMobileOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100">
                <X size={18} />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto py-4">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <span className="block px-6 py-4 text-h4 font-semibold text-gray-900 border-b border-gray-50 select-none cursor-default">
                    {link.label}
                  </span>
                  {link.children && (
                    <div className="bg-gray-50">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="block px-10 py-3 text-small text-gray-600 hover:text-lp-green transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
            <div className="p-6 border-t border-gray-100 space-y-3">
              <div className="flex gap-4 text-sm text-gray-500">
                <Link href="/projects" onClick={() => setMobileOpen(false)} className="hover:text-lp-green transition-colors">Portfolio</Link>
                <Link href="/about-us" onClick={() => setMobileOpen(false)} className="hover:text-lp-green transition-colors">About</Link>
                <Link href="/contact-us" onClick={() => setMobileOpen(false)} className="hover:text-lp-green transition-colors">Contact</Link>
              </div>
              <Link href="/get-quote" onClick={() => setMobileOpen(false)}>
                <Button size="lg" className="w-full">Get a Quote</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
