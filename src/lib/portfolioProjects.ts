export type PortfolioProjectImage = {
  src: string
  alt: string
  caption?: string
}

export type PortfolioProject = {
  slug: string
  aliases?: string[]
  title: string
  client: string
  category: string
  year: string
  image: string
  summary: string
  services: string[]
  output: string
  galleryImages: PortfolioProjectImage[]
}

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: 'rolling-green-cannabis',
    aliases: ['bergdorf-retail-print-system'],
    title: 'Rolling Green Cannabis',
    client: 'Rolling Green Cannabis',
    category: 'Packaging / Cannabis',
    year: '2026',
    image: '/images/portfolio/rolling-green-cannabis/hero.jpg',
    summary: 'Cannabis packaging photography and production details built around premium shelf presence.',
    services: ['Cannabis packaging', 'Label production', 'Product photography'],
    output: 'Cannabis packaging visuals, label production support, product photography, and shelf-ready presentation',
    galleryImages: [
      {
        src: '/images/portfolio/rolling-green-cannabis/detail-01.jpg',
        alt: 'Rolling Green Cannabis three jar packaging detail',
        caption: 'Three-jar packaging detail showing label consistency across product variants.',
      },
    ],
  },
  {
    slug: 'county-road-cannabis',
    aliases: ['vitasoy-launch-activation'],
    title: 'County Road Cannabis',
    client: 'County Road Cannabis',
    category: 'Cannabis / Brand System',
    year: '2026',
    image: '/images/portfolio/county-road-cannabis/store-sign-red.jpg',
    summary: 'Cannabis brand applications translated across apparel, retail signage, packaging, and carryout materials.',
    services: ['Cannabis branding', 'Retail signage', 'Packaging'],
    output: 'Apparel graphics, storefront signage, custom tote artwork, paper bag packaging, and retail brand applications',
    galleryImages: [
      {
        src: '/images/portfolio/county-road-cannabis/paper-bag.jpg',
        alt: 'County Road Cannabis branded paper bag packaging',
        caption: 'Custom paper bag packaging carrying the County Road Cannabis identity into retail handoff.',
      },
      {
        src: '/images/portfolio/county-road-cannabis/hero.jpg',
        alt: 'County Road Cannabis branded t-shirt cover image',
        caption: 'Branded apparel artwork showing the County Road Cannabis identity in use.',
      },
      {
        src: '/images/portfolio/county-road-cannabis/tote.jpg',
        alt: 'County Road Cannabis red branded tote bag',
        caption: 'Branded tote artwork extending the identity into reusable merchandise.',
      },
    ],
  },
  {
    slug: 'noizey',
    aliases: ['claudine-farms-labels'],
    title: 'Noizey',
    client: 'Noizey',
    category: 'Cannabis / Packaging',
    year: '2026',
    image: '/images/portfolio/noizey/noizey-paint2.jpg',
    summary: 'Cannabis packaging and product photography built around bold color, label clarity, and shelf-ready presentation.',
    services: ['Cannabis packaging', 'Label production', 'Product photography'],
    output: 'Jar label production, cannabis packaging visuals, product photography, and shelf-ready brand presentation',
    galleryImages: [
      {
        src: '/images/portfolio/noizey/3-jars-dark.png',
        alt: 'Noizey three jar cannabis packaging on a dark background',
        caption: 'Three-jar packaging detail showing label consistency across product variants.',
      },
      {
        src: '/images/portfolio/noizey/products-table-1.jpg',
        alt: 'Noizey cannabis products arranged on a table',
        caption: 'Product lineup photography for shelf-ready cannabis packaging.',
      },
      {
        src: '/images/portfolio/noizey/products-table-2.jpg',
        alt: 'Noizey cannabis packaging product table detail',
        caption: 'Packaging details captured across jars and product formats.',
      },
    ],
  },
  {
    slug: 'lucky-sun-farms',
    aliases: ['seagate-lightbox-display'],
    title: 'Lucky Sun Farms',
    client: 'Lucky Sun Farms',
    category: 'Cannabis / Brand System',
    year: '2026',
    image: '/images/portfolio/lucky-sun-farms/wood-platform-set-2.jpg',
    summary: 'Cannabis packaging and branded display materials built around a bright, farm-forward product identity.',
    services: ['Cannabis packaging', 'Wood engraving', 'Product display'],
    output: 'Cannabis product packaging, engraved wood signage, branded display photography, and shelf-ready presentation',
    galleryImages: [
      {
        src: '/images/portfolio/lucky-sun-farms/wood-platform-set.jpg',
        alt: 'Lucky Sun Farms cannabis packaging on a wooden display platform',
        caption: 'Product packaging staged on a wooden display platform for a warm retail presentation.',
      },
      {
        src: '/images/portfolio/lucky-sun-farms/wood-engrave-2.png',
        alt: 'Lucky Sun Farms engraved wood sign',
        caption: 'Engraved wood branding detail extending the farm identity into physical display materials.',
      },
      {
        src: '/images/portfolio/lucky-sun-farms/three-set-bg.jpg',
        alt: 'Lucky Sun Farms three product packaging set on a yellow background',
        caption: 'Bright cannabis packaging system built around bold color and clear product hierarchy.',
      },
    ],
  },
  {
    slug: 'sticker-label-kit',
    title: 'Sticker + label kit',
    client: 'Lettuce Print',
    category: 'Stickers',
    year: '2026',
    image: '/images/portfolio/sticker-label-kit/hero.png',
    summary: 'Sticker and label samples built around bright color, edge detail, and product flexibility.',
    services: ['Die-cut stickers', 'Labels', 'Sample kit'],
    output: 'Die-cut stickers, label samples, color testing, edge detail, and sample kit production',
    galleryImages: [
      {
        src: '/images/portfolio/sticker-label-kit/hero.png',
        alt: 'Lettuce Print sticker and label sample kit',
        caption: 'Sticker and label samples built to show color, edge detail, and format flexibility.',
      },
    ],
  },
  {
    slug: 'mylar-packaging-system',
    title: 'Mylar packaging mockup',
    client: 'Lettuce Print',
    category: 'Packaging',
    year: '2026',
    image: '/images/portfolio/mylar-packaging-system/hero.png',
    summary: 'Flexible packaging concepts for brands that need shelf-ready structure and bold surface design.',
    services: ['Mylar bags', 'Packaging', 'Mockups'],
    output: 'Mylar packaging concepts, shelf-ready mockups, flexible packaging layouts, and production direction',
    galleryImages: [
      {
        src: '/images/portfolio/mylar-packaging-system/hero.png',
        alt: 'Lettuce Print mylar packaging mockup',
        caption: 'Flexible packaging concepts designed for bold shelf presence.',
      },
    ],
  },
  {
    slug: 'farmers-brand-system',
    title: 'Farmers brand system',
    client: 'Farmers NY',
    category: 'Identity',
    year: '2026',
    image: '/images/portfolio/farmers-brand-system/hero.jpg',
    summary: 'A physical brand system translating identity into packaging, print, and campaign assets.',
    services: ['Identity', 'Packaging', 'Print system'],
    output: 'Identity-to-print translation, packaging applications, campaign assets, and physical brand system',
    galleryImages: [
      {
        src: '/images/portfolio/farmers-brand-system/hero.jpg',
        alt: 'Farmers NY physical brand system',
        caption: 'A physical brand system connecting identity, packaging, and campaign assets.',
      },
    ],
  },
]

export function getPortfolioProject(slug: string) {
  return portfolioProjects.find((project) => project.slug === slug || project.aliases?.includes(slug))
}
