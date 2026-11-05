import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/services/marketing-materials/postcards/premium",
        destination: "/services/marketing-materials/postcards",
        permanent: true,
      },
      {
        source: '/services/marketing-materials/flyers/tabloid',
        destination: '/services/marketing-materials/flyers/full-page?size=tabloid',
        permanent: false,
      },
      {
        source: '/services/marketing-materials/brochures/bi-fold-tabloid',
        destination: '/services/marketing-materials/brochures/bi-fold-letter',
        permanent: false,
      },
      {
        source: '/services/marketing-materials/posters',
        destination: '/services/marketing-materials/flyers#posters',
        permanent: false,
      },
      {
        source: '/services/marketing-materials/booklets',
        destination: '/services/marketing-materials/brochures#booklets',
        permanent: false,
      },
      {
        source: '/services/signage/banners/double-sided-banner',
        destination: '/services/signage/banners',
        permanent: true,
      },
      {
        source: '/services/packaging/boxes',
        destination: '/services/packaging',
        permanent: true,
      },
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
