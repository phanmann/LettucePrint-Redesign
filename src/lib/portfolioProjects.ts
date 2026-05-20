export type PortfolioProjectImage = {
  src: string
  alt: string
  caption?: string
}

export type PortfolioProject = {
  slug: string
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
    slug: 'bergdorf-retail-print-system',
    title: 'Retail print systems',
    client: 'Bergdorf Goodman',
    category: 'Installation / Retail',
    year: '2026',
    image: '/images/portfolio/bergdorf-retail-print-system/hero.jpg',
    summary: 'Retail-facing print production built to feel polished, premium, and installation-ready.',
    services: ['Retail graphics', 'Production', 'Finishing'],
    output: 'Retail graphics, installation-ready print assets, finishing, and production support',
    galleryImages: [
      {
        src: '/images/portfolio/bergdorf-retail-print-system/hero.jpg',
        alt: 'Bergdorf Goodman retail print installation detail',
        caption: 'Retail print system produced for premium in-store presentation.',
      },
    ],
  },
  {
    slug: 'vitasoy-launch-activation',
    title: 'Launch collateral',
    client: 'Vitasoy',
    category: 'Activation / Photo',
    year: '2026',
    image: '/images/portfolio/vitasoy-launch-activation/hero.jpg',
    summary: 'Event collateral and physical touchpoints for a high-energy brand activation.',
    services: ['Event print', 'Collateral', 'Activation support'],
    output: 'Event collateral, launch materials, activation support, and photo-ready touchpoints',
    galleryImages: [
      {
        src: '/images/portfolio/vitasoy-launch-activation/hero.jpg',
        alt: 'Vitasoy launch activation collateral and event touchpoints',
        caption: 'Launch collateral built for a high-energy activation environment.',
      },
    ],
  },
  {
    slug: 'claudine-farms-labels',
    title: 'Cannabis label production',
    client: 'Claudine Farms',
    category: 'Packaging / Labels',
    year: '2026',
    image: '/images/portfolio/claudine-farms-labels/hero.jpeg',
    summary: 'Cannabis packaging labels produced for shelf presence, compliance clarity, and batch consistency.',
    services: ['Roll labels', 'Packaging', 'Production'],
    output: 'Roll labels, packaging production, compliance-forward layout support, and batch consistency',
    galleryImages: [
      {
        src: '/images/portfolio/claudine-farms-labels/hero.jpeg',
        alt: 'Claudine Farms cannabis label production detail',
        caption: 'Label production balancing shelf presence with compliance clarity.',
      },
    ],
  },
  {
    slug: 'seagate-lightbox-display',
    title: 'Backlit display graphics',
    client: 'Seagate',
    category: 'Large Format',
    year: '2026',
    image: '/images/portfolio/seagate-lightbox-display/hero.png',
    summary: 'Large-format display graphics designed to hold color and detail under backlit conditions.',
    services: ['Large format', 'Display graphics', 'Mockups'],
    output: 'Backlit display graphics, large-format production, color handling, and mockup support',
    galleryImages: [
      {
        src: '/images/portfolio/seagate-lightbox-display/hero.png',
        alt: 'Seagate backlit display graphic',
        caption: 'Large-format graphics prepared for backlit display conditions.',
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
  return portfolioProjects.find((project) => project.slug === slug)
}
