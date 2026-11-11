import { MetadataRoute } from 'next'
import { portfolioProjects } from '@/lib/portfolioProjects'

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
  { path: '/shop/stickers/die-cut', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/shop/stickers/kiss-cut', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/shop/stickers/circle', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/shop/stickers/square', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/shop/stickers/rectangle', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/shop/stickers/oval', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/shop/stickers/clear', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/shop/stickers/holographic', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/shop/roll-labels/rectangle', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/shop/roll-labels/circle', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/shop/roll-labels/square', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/shop/roll-labels/oval', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/shop/roll-labels', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/shop/marketing-materials', changeFrequency: 'weekly', priority: 0.75 },
  { path: '/shop/marketing-materials/business-cards', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/shop/marketing-materials/flyers', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/shop/marketing-materials/postcards', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/shop/marketing-materials/brochures', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/shop/graphic-design', changeFrequency: 'monthly', priority: 0.65 },
  { path: '/shop/packaging', changeFrequency: 'weekly', priority: 0.75 },
  { path: '/shop/packaging/mylar-bags', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/shop/packaging/custom-packaging', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/shop/signage', changeFrequency: 'weekly', priority: 0.75 },
  { path: '/shop/signage/banners', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/shop/signage/backdrops', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/shop/apparel', changeFrequency: 'monthly', priority: 0.65 },
  { path: '/shop/apparel/screenprint', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/shop/apparel/embroidery', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/shop/apparel/dtg', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/shop/apparel/dtf', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/shop/apparel/custom-items', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/get-quote', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/portfolio', changeFrequency: 'weekly', priority: 0.75 },
  { path: '/projects', changeFrequency: 'weekly', priority: 0.6 },
  { path: '/about-us', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/contact-us', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/shipping-policy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/privacy-policy', changeFrequency: 'yearly', priority: 0.2 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.2 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    ...entries.map((entry) => ({
      url: `${BASE_URL}${entry.path}`,
      lastModified: now,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
    })),
    ...portfolioProjects.map((project) => ({
      url: `${BASE_URL}/portfolio/${project.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.55,
    })),
  ]
}
