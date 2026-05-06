'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { useCart } from '@/context/CartContext'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ShoppingCart, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/Button'

// ── Product search index ──────────────────────────────────────────────────────
const allProducts = [
  { label: 'Business Cards – Standard',    href: '/services/marketing-materials/business-cards/standard',   tags: ['business cards', 'cards'] },
  { label: 'Business Cards – Premium',     href: '/services/marketing-materials/business-cards/premium',    tags: ['business cards', 'cards', 'premium'] },
  { label: 'Postcards – Standard',         href: '/services/marketing-materials/postcards/standard',        tags: ['postcards', 'mailers'] },
  { label: 'Postcards – Premium',          href: '/services/marketing-materials/postcards/premium',         tags: ['postcards', 'mailers', 'premium'] },
  { label: 'Flyers – Full Page',           href: '/services/marketing-materials/flyers/full-page',          tags: ['flyers', 'print'] },
  { label: 'Flyers – Half Page',           href: '/services/marketing-materials/flyers/half-page',          tags: ['flyers', 'print'] },
  { label: 'Flyers – Tabloid',             href: '/services/marketing-materials/flyers/tabloid',            tags: ['flyers', 'print', 'large'] },
  { label: 'Posters',                      href: '/services/marketing-materials/posters',                   tags: ['posters', 'print', 'large format'] },
  { label: 'Soft Touch Posters',           href: '/services/marketing-materials/posters/soft-touch',        tags: ['posters', 'soft touch', 'premium'] },
  { label: 'Art Print Posters',            href: '/services/marketing-materials/posters/art-print',         tags: ['posters', 'art print'] },
  { label: 'Brochures – Tri-Fold Letter',  href: '/services/marketing-materials/brochures/tri-fold-letter', tags: ['brochures', 'tri-fold'] },
  { label: 'Brochures – Bi-Fold Letter',   href: '/services/marketing-materials/brochures/bi-fold-letter',  tags: ['brochures', 'bi-fold'] },
  { label: 'Brochures – Bi-Fold Tabloid',  href: '/services/marketing-materials/brochures/bi-fold-tabloid', tags: ['brochures', 'bi-fold', 'large'] },
  { label: 'Brochures – Uncoated',         href: '/services/marketing-materials/brochures/uncoated',        tags: ['brochures', 'uncoated'] },
  { label: 'Booklets',                     href: '/services/marketing-materials/booklets',                  tags: ['booklets', 'catalogs', 'magazines'] },
  { label: 'Stickers',                     href: '/shop/stickers',                                          tags: ['stickers', 'die cut', 'custom stickers'] },
  { label: 'Spot UV Stickers',             href: '/shop/spot-uv',                                           tags: ['stickers', 'spot uv', 'premium stickers'] },
  { label: 'Roll Labels',                  href: '/shop/roll-labels',                                       tags: ['labels', 'roll labels', 'stickers', 'packaging'] },
  { label: 'Boxes',                        href: '/services/packaging/boxes',                               tags: ['boxes', 'packaging', 'custom boxes'] },
  { label: 'Mylar Bags',                   href: '/services/packaging/mylar-bags',                          tags: ['mylar', 'bags', 'packaging', 'cannabis'] },
  { label: 'Custom Packaging',             href: '/services/packaging/custom-packaging',                    tags: ['packaging', 'custom', 'boxes'] },
  { label: 'Vinyl Banners',               href: '/services/signage/banners/vinyl-banner',                  tags: ['banners', 'vinyl', 'signage', 'outdoor'] },
  { label: 'Mesh Banners',                href: '/services/signage/banners/mesh-banner',                   tags: ['banners', 'mesh', 'signage', 'outdoor'] },
  { label: 'Fabric Banners',              href: '/services/signage/banners/fabric-banner',                 tags: ['banners', 'fabric', 'signage'] },
  { label: 'Retractable Banners',         href: '/services/signage/banners/retractable-33',                tags: ['banners', 'retractable', 'signage', 'events'] },
  { label: 'Backdrops',                    href: '/services/signage/backdrops',                             tags: ['backdrops', 'signage', 'large format', 'events'] },
  { label: 'Screenprint',                  href: '/services/apparel/screenprint',                           tags: ['screen print', 'apparel', 't-shirts', 'clothing'] },
  { label: 'Embroidery',                   href: '/services/apparel/embroidery',                            tags: ['embroidery', 'apparel', 'hats', 'clothing'] },
  { label: 'DTG Printing',                 href: '/services/apparel/dtg',                                   tags: ['dtg', 'direct to garment', 'apparel', 't-shirts'] },
  { label: 'Custom Promo Items',           href: '/services/apparel/custom-items',                          tags: ['custom', 'promo', 'merch', 'swag'] },
]

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
    { label: 'SEG Light Displays', href: '/services/signage/backdrops' },
  ]},
  { label: 'Apparel & Promo', href: '/services/apparel', children: [
    { label: 'Screenprint', href: '/services/apparel/screenprint' },
    { label: 'Embroidery', href: '/services/apparel/embroidery' },
    { label: 'DTG', href: '/services/apparel/dtg' },
    { label: 'Custom Items', href: '/services/apparel/custom-items' },
  ]},
]

function CartBadge() {
  const { count } = useCart()
  if (count === 0) return null
  return (
    <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-lp-green text-white text-[10px] font-bold leading-none">
      {count > 9 ? '9+' : count}
    </span>
  )
}

export default function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)
  const searchContainerRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const router = useRouter()

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

  // Auto-focus input when search opens
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50)
    } else {
      setSearchQuery('')
    }
  }, [searchOpen])

  // Close on outside click or Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSearchOpen(false) }
    const handleClick = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setSearchOpen(false)
      }
    }
    document.addEventListener('keydown', handleKey)
    document.addEventListener('mousedown', handleClick)
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.removeEventListener('mousedown', handleClick)
    }
  }, [])

  // Live filtered results
  const searchResults = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    if (!q) return []
    return allProducts.filter(
      (p) => p.label.toLowerCase().includes(q) || p.tags.some((t) => t.includes(q))
    ).slice(0, 6)
  }, [searchQuery])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchResults.length === 1) {
      setSearchOpen(false)
      router.push(searchResults[0].href)
    }
  }

  return (
    <>
      <header className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-nav border-b border-gray-100'
          : 'bg-white border-b border-gray-100'
      )}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
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
              {navLinks.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
                return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.children && openDropdown(link.label)}
                  onMouseLeave={closeDropdown}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      'text-[11px] font-medium transition-colors duration-200 tracking-wide pb-0.5',
                      'relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:rounded-full after:transition-all after:duration-200',
                      isActive
                        ? 'text-lp-green after:bg-lp-green after:opacity-100'
                        : 'text-gray-700 hover:text-lp-green after:bg-lp-green after:opacity-0 hover:after:opacity-100'
                    )}
                  >
                    {link.label}
                  </Link>

                  {/* Dropdown */}
                  {link.children && activeDropdown === link.label && (
                    <div
                      className="absolute top-full left-0 w-52 bg-white rounded-card shadow-nav border border-gray-100 py-2 z-50"
                      onMouseEnter={() => openDropdown(link.label)}
                      onMouseLeave={closeDropdown}
                    >
                      {/* Invisible bridge covers the gap between trigger and menu */}
                      <div className="absolute -top-3 left-0 right-0 h-3" />
                      {link.children.map((child) => {
                        const isChildActive = pathname === child.href
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              'block px-4 py-2.5 text-[11px] font-medium transition-colors',
                              isChildActive
                                ? 'text-lp-green bg-lp-green/5 font-semibold'
                                : 'text-gray-700 hover:text-lp-green hover:bg-gray-50'
                            )}
                          >
                            {child.label}
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
                )
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <Link href="/get-quote">
                <Button size="sm" className="h-11 !text-white">Get a Quote</Button>
              </Link>
              {/* Search */}
              <div ref={searchContainerRef} className="relative">
                <button
                  onClick={() => setSearchOpen((o) => !o)}
                  className={cn(
                    'w-11 h-11 flex items-center justify-center rounded-full transition-all duration-150',
                    searchOpen
                      ? 'bg-lp-green text-white'
                      : 'bg-gray-100 hover:bg-lp-green hover:text-white'
                  )}
                  aria-label="Search"
                >
                  <Search size={18} />
                </button>

                {/* Dropdown */}
                {searchOpen && (
                  <div className="absolute top-[calc(100%+10px)] right-0 w-80 bg-white border border-gray-200 rounded-2xl shadow-nav overflow-hidden">
                    {/* Input row */}
                    <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 px-3 py-2 border-b border-gray-100">
                      <Search size={15} className="text-gray-400 flex-shrink-0" />
                      <input
                        ref={searchInputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search products..."
                        className="flex-1 text-sm text-gray-900 placeholder-gray-400 bg-transparent outline-none py-2"
                      />
                      {searchQuery && (
                        <button
                          type="button"
                          onClick={() => setSearchQuery('')}
                          className="text-gray-300 hover:text-gray-500 transition-colors"
                          aria-label="Clear"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </form>

                    {/* Live results */}
                    {searchResults.length > 0 && (
                      <div className="py-1">
                        {searchResults.map((r) => (
                          <Link
                            key={r.href}
                            href={r.href}
                            onClick={() => setSearchOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 group transition-colors"
                          >
                            <Search size={13} className="text-gray-300 group-hover:text-lp-green flex-shrink-0 transition-colors" />
                            <span className="text-sm text-gray-700 group-hover:text-lp-green transition-colors">{r.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* No results */}
                    {searchQuery.trim() && searchResults.length === 0 && (
                      <p className="text-xs text-gray-400 text-center py-4">No products found</p>
                    )}
                  </div>
                )}
              </div>
              <Link href="/cart">
                <span className="relative w-11 h-11 flex items-center justify-center rounded-full bg-gray-100 hover:bg-lp-green hover:text-white transition-all duration-150 cursor-pointer">
                  <ShoppingCart size={18} />
                  <CartBadge />
                </span>
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
                    className="block px-6 py-4 text-h4 font-semibold text-gray-900 border-b border-gray-50 hover:text-lp-green transition-colors"
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
            <div className="p-6 border-t border-gray-100 space-y-3">
              <div className="text-center text-sm text-gray-500 space-x-4">
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
