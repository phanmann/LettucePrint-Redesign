'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ShoppingCart } from 'lucide-react'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/Button'

const navLinks = [
  {
    label: 'Shop',
    href: '/shop',
    children: [
      { label: 'Stickers & Labels', href: '/shop/stickers' },
      { label: 'Spot UV Stickers', href: '/shop/spot-uv' },
      { label: 'Roll Labels', href: '/shop/roll-labels' },
    ],
  },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Packaging', href: '/services/packaging' },
      { label: 'Graphic Design', href: '/services/graphic-design' },
      { label: 'Signage', href: '/services/signage' },
      { label: 'Screen Printing', href: '/services/screen-printing' },
      { label: 'Large Format', href: '/services/large-format' },
    ],
  },
  { label: 'Portfolio', href: '/projects' },
  { label: 'About', href: '/about-us' },
  { label: 'Contact', href: '/contact-us' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

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
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      'text-small font-medium text-gray-900 transition-colors duration-200',
                      'hover:text-lp-green relative',
                      'after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-lp-green',
                      'after:w-0 hover:after:w-full after:transition-all after:duration-200'
                    )}
                  >
                    {link.label}
                  </Link>

                  {/* Dropdown */}
                  {link.children && activeDropdown === link.label && (
                    <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-card shadow-nav border border-gray-100 py-2 z-50">
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
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-6 py-4 text-h4 font-semibold text-gray-900 hover:text-lp-green border-b border-gray-50 transition-colors"
                  >
                    {link.label}
                  </Link>
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
            <div className="p-6 border-t border-gray-100">
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
