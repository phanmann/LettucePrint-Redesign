import {isIP} from 'node:net'
import type { NextConfig } from "next";

const previewHost=process.env.LP_SANDBOX_HOST
if(previewHost&&(isIP(previewHost)!==4||!(/^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(previewHost))))throw Error('LP_SANDBOX_HOST must be one exact private IPv4 address')
const nextConfig: NextConfig = {
  ...(previewHost?{allowedDevOrigins:[previewHost]}:{}),
  async redirects() {
    return [
      {
        source: '/services/marketing-materials/posters',
        destination: '/services/marketing-materials/flyers',
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
