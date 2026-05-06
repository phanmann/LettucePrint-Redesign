import { MetadataRoute } from 'next'

const BASE_URL = 'https://lettuceprint.com'

type SitemapEntry = {
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
}

const entries: SitemapEntry[] = [
  { path: '', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/shop', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/shop/stickers', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/shop/spot-uv', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/shop/roll-labels', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/services', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/services/marketing-materials', changeFrequency: 'weekly', priority: 0.75 },
  { path: '/services/marketing-materials/business-cards', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/services/marketing-materials/flyers', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/services/marketing-materials/postcards', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/services/marketing-materials/posters', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/services/marketing-materials/brochures', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/services/marketing-materials/booklets', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/services/graphic-design', changeFrequency: 'monthly', priority: 0.65 },
  { path: '/services/packaging', changeFrequency: 'weekly', priority: 0.75 },
  { path: '/services/packaging/boxes', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/services/packaging/mylar-bags', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/services/packaging/custom-packaging', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/services/signage', changeFrequency: 'weekly', priority: 0.75 },
  { path: '/services/signage/banners', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/services/signage/backdrops', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/services/apparel', changeFrequency: 'monthly', priority: 0.65 },
  { path: '/services/apparel/screenprint', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/services/apparel/embroidery', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/services/apparel/dtg', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/services/apparel/custom-items', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/get-quote', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/projects', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/about-us', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/contact-us', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/shipping-policy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/privacy-policy', changeFrequency: 'yearly', priority: 0.2 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.2 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return entries.map((entry) => ({
    url: `${BASE_URL}${entry.path}`,
    lastModified: now,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }))
}
