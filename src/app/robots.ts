import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/studio',
          '/studio/',
          '/api/',
          '/order-confirmation',
          '/proof/',
          '/shop/stickers/checkout',
          '/shop/spot-uv/checkout',
          '/shop/roll-labels/checkout',
        ],
      },
    ],
    sitemap: 'https://lettuceprint.com/sitemap.xml',
  }
}
