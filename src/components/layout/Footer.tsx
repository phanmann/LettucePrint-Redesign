import Link from 'next/link'
import Image from 'next/image'

const footerLinks = {
  'Quick Links': [
    { label: 'Shop Products', href: '/shop' },
    { label: 'Our Services', href: '/services' },
    { label: 'Portfolio', href: '/projects' },
    { label: 'About Us', href: '/about-us' },
    { label: 'Contact Us', href: '/contact-us' },
    { label: 'Get a Quote', href: '/get-quote' },
  ],
  'Services': [
    { label: 'Packaging', href: '/services/packaging' },
    { label: 'Design & Branding', href: '/services/graphic-design' },
    { label: 'Signage & Displays', href: '/services/signage' },
    { label: 'Apparel Printing', href: '/services/screen-printing' },
    { label: 'Large Format', href: '/services/large-format' },
  ],
  'Shop': [
    { label: 'Custom Stickers', href: '/shop/stickers' },
    { label: 'Roll Labels', href: '/shop/roll-labels' },
    { label: 'All Products', href: '/shop' },
  ],
  'Support': [
    { label: 'Shipping & Delivery', href: '/shipping-policy' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-lp-black text-white border-t-[3px] border-lp-green pt-20 pb-10">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12 mb-16">

          {/* Brand col */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Image
              src="/images/logos/LP_Logos_Wordmark-White.svg"
              alt="Lettuce Print"
              width={160}
              height={46}
              className="mb-4"
            />
            <p className="text-small text-white/60 leading-relaxed mb-6">
              Brooklyn&apos;s creative print studio.<br />
              Design + print in one place.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/lettuceprint"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-lp-green hover:border-lp-green transition-all duration-200"
                aria-label="Instagram"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
              </a>
              <a
                href="https://linkedin.com/company/lettuceprint"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-lp-green hover:border-lp-green transition-all duration-200"
                aria-label="LinkedIn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40 mb-5">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-small text-white/70 hover:text-white hover:text-lp-green transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Lettuce Print LLC. All rights reserved. Brooklyn, NY.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="text-xs text-white/40 hover:text-white/70 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-xs text-white/40 hover:text-white/70 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
