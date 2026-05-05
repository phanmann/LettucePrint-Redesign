import Link from 'next/link'
import { Search } from 'lucide-react'

// Static product index — searchable catalogue
const allProducts = [
  { label: 'Business Cards – Standard', href: '/services/marketing-materials/business-cards/standard', tags: ['business cards', 'cards', 'marketing'] },
  { label: 'Business Cards – Premium', href: '/services/marketing-materials/business-cards/premium', tags: ['business cards', 'cards', 'premium', 'marketing'] },
  { label: 'Postcards – Standard', href: '/services/marketing-materials/postcards/standard', tags: ['postcards', 'mailers', 'marketing'] },
  { label: 'Postcards – Premium', href: '/services/marketing-materials/postcards/premium', tags: ['postcards', 'mailers', 'premium', 'marketing'] },
  { label: 'Flyers – Full Page', href: '/services/marketing-materials/flyers/full-page', tags: ['flyers', 'marketing', 'print'] },
  { label: 'Flyers – Half Page', href: '/services/marketing-materials/flyers/half-page', tags: ['flyers', 'marketing', 'print'] },
  { label: 'Flyers – Tabloid', href: '/services/marketing-materials/flyers/tabloid', tags: ['flyers', 'marketing', 'print', 'large'] },
  { label: 'Posters', href: '/services/marketing-materials/posters', tags: ['posters', 'marketing', 'print', 'large format'] },
  { label: 'Brochures – Tri-Fold Letter', href: '/services/marketing-materials/brochures/tri-fold-letter', tags: ['brochures', 'tri-fold', 'marketing'] },
  { label: 'Brochures – Bi-Fold Letter', href: '/services/marketing-materials/brochures/bi-fold-letter', tags: ['brochures', 'bi-fold', 'marketing'] },
  { label: 'Booklets', href: '/services/marketing-materials/booklets', tags: ['booklets', 'catalogs', 'marketing'] },
  { label: 'Stickers', href: '/shop/stickers', tags: ['stickers', 'labels', 'custom stickers'] },
  { label: 'Spot UV Stickers', href: '/shop/spot-uv', tags: ['stickers', 'spot uv', 'premium', 'labels'] },
  { label: 'Roll Labels', href: '/shop/roll-labels', tags: ['roll labels', 'labels', 'stickers', 'packaging'] },
  { label: 'Boxes', href: '/services/packaging/boxes', tags: ['boxes', 'packaging', 'custom boxes'] },
  { label: 'Mylar Bags', href: '/services/packaging/mylar-bags', tags: ['mylar', 'bags', 'packaging', 'cannabis'] },
  { label: 'Custom Packaging', href: '/services/packaging/custom-packaging', tags: ['packaging', 'custom', 'boxes'] },
  { label: 'Banners', href: '/services/signage/banners', tags: ['banners', 'signage', 'large format'] },
  { label: 'Backdrops', href: '/services/signage/backdrops', tags: ['backdrops', 'signage', 'large format', 'events'] },
  { label: 'Screenprint', href: '/services/apparel/screenprint', tags: ['screen print', 'apparel', 't-shirts', 'clothing'] },
  { label: 'Embroidery', href: '/services/apparel/embroidery', tags: ['embroidery', 'apparel', 'hats', 'clothing'] },
  { label: 'DTG Printing', href: '/services/apparel/dtg', tags: ['dtg', 'direct to garment', 'apparel', 't-shirts'] },
  { label: 'Custom Items', href: '/services/apparel/custom-items', tags: ['custom', 'promo', 'apparel', 'merch'] },
]

function searchProducts(q: string) {
  const lower = q.toLowerCase().trim()
  if (!lower) return []
  return allProducts.filter(
    (p) =>
      p.label.toLowerCase().includes(lower) ||
      p.tags.some((t) => t.includes(lower))
  )
}

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string }
}) {
  const query = searchParams.q ?? ''
  const results = searchProducts(query)

  return (
    <main className="min-h-screen pt-[72px] bg-white">
      <div className="max-w-3xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lp-green mb-3">Search</p>
          <h1 className="text-h2 font-semibold text-gray-900">
            {query ? `Results for "${query}"` : 'What are you looking for?'}
          </h1>
          {query && (
            <p className="text-body text-gray-400 mt-2">
              {results.length > 0
                ? `${results.length} product${results.length !== 1 ? 's' : ''} found`
                : 'No products matched your search.'}
            </p>
          )}
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="divide-y divide-gray-100">
            {results.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="flex items-center justify-between py-4 group"
              >
                <span className="text-gray-800 group-hover:text-lp-green font-medium transition-colors">
                  {r.label}
                </span>
                <Search size={14} className="text-gray-300 group-hover:text-lp-green transition-colors" />
              </Link>
            ))}
          </div>
        )}

        {/* No results */}
        {query && results.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 mb-6">Try "stickers", "banners", or "business cards"</p>
            <Link
              href="/get-quote"
              className="inline-flex items-center gap-2 bg-lp-green text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-lp-green-dark transition-colors"
            >
              Request a custom quote instead
            </Link>
          </div>
        )}

        {/* Empty state — no query */}
        {!query && (
          <div className="grid grid-cols-2 gap-3">
            {['Stickers', 'Business Cards', 'Banners', 'Packaging', 'Apparel', 'Flyers'].map((s) => (
              <Link
                key={s}
                href={`/search?q=${encodeURIComponent(s.toLowerCase())}`}
                className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-600 hover:border-lp-green hover:text-lp-green transition-colors"
              >
                {s}
              </Link>
            ))}
          </div>
        )}

      </div>
    </main>
  )
}
