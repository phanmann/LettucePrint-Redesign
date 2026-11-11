import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    const aliases = [
      {
        source: "/services/marketing-materials/postcards/premium",
        destination: "/shop/marketing-materials/postcards",
        permanent: true,
      },
      {
        source: '/services/marketing-materials/flyers/tabloid',
        destination: '/shop/marketing-materials/flyers/full-page?size=tabloid',
        permanent: false,
      },
      {
        source: '/services/marketing-materials/brochures/bi-fold-tabloid',
        destination: '/shop/marketing-materials/brochures/bi-fold-letter',
        permanent: false,
      },
      {
        source: '/services/marketing-materials/posters',
        destination: '/shop/marketing-materials/flyers#posters',
        permanent: false,
      },
      {
        source: '/services/marketing-materials/booklets',
        destination: '/shop/marketing-materials/brochures#booklets',
        permanent: false,
      },
      {
        source: '/services/signage/banners/double-sided-banner',
        destination: '/shop/signage/banners',
        permanent: true,
      },
      {
        source: '/services/packaging/boxes',
        destination: '/shop/packaging',
        permanent: true,
      },
    ]
    return [
      ...aliases.map(rule => ({ ...rule, permanent: true })),
      ...aliases.map(rule => ({ ...rule, source: rule.source.replace('/services', '/shop') })),
      { source: '/services/:path*', destination: '/shop/:path*', permanent: true },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'drive.usercontent.google.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
};

export default nextConfig;
