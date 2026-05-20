export type PortfolioProject = {
  slug: string
  title: string
  client: string
  category: string
  year: string
  image: string
  summary: string
  services: string[]
}

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: 'bergdorf-retail-print-system',
    title: 'Retail print systems',
    client: 'Bergdorf Goodman',
    category: 'Installation / Retail',
    year: '2026',
    image: '/images/portfolio/bergdorf-print-install.jpg',
    summary: 'Retail-facing print production built to feel polished, premium, and installation-ready.',
    services: ['Retail graphics', 'Production', 'Finishing'],
  },
  {
    slug: 'vitasoy-launch-activation',
    title: 'Launch collateral',
    client: 'Vitasoy',
    category: 'Activation / Photo',
    year: '2026',
    image: '/images/portfolio/vitasoy-activation.jpg',
    summary: 'Event collateral and physical touchpoints for a high-energy brand activation.',
    services: ['Event print', 'Collateral', 'Activation support'],
  },
  {
    slug: 'claudine-farms-labels',
    title: 'Cannabis label production',
    client: 'Claudine Farms',
    category: 'Packaging / Labels',
    year: '2026',
    image: '/images/portfolio/claudine-farms-labels.jpeg',
    summary: 'Cannabis packaging labels produced for shelf presence, compliance clarity, and batch consistency.',
    services: ['Roll labels', 'Packaging', 'Production'],
  },
  {
    slug: 'seagate-lightbox-display',
    title: 'Backlit display graphics',
    client: 'Seagate',
    category: 'Large Format',
    year: '2026',
    image: '/images/portfolio/lightbox-display.png',
    summary: 'Large-format display graphics designed to hold color and detail under backlit conditions.',
    services: ['Large format', 'Display graphics', 'Mockups'],
  },
  {
    slug: 'business-card-system',
    title: 'Business card system',
    client: 'Lettuce Print',
    category: 'Print',
    year: '2026',
    image: '/images/portfolio/business-card-system.png',
    summary: 'A clean business card system showing how tactility, paper, and finish create a stronger handoff.',
    services: ['Business cards', 'Finishing', 'Brand system'],
  },
  {
    slug: 'sticker-label-kit',
    title: 'Sticker + label kit',
    client: 'Lettuce Print',
    category: 'Stickers',
    year: '2026',
    image: '/images/portfolio/sticker-labels.png',
    summary: 'Sticker and label samples built around bright color, edge detail, and product flexibility.',
    services: ['Die-cut stickers', 'Labels', 'Sample kit'],
  },
  {
    slug: 'mylar-packaging-system',
    title: 'Mylar packaging mockup',
    client: 'Lettuce Print',
    category: 'Packaging',
    year: '2026',
    image: '/images/portfolio/mylar-packaging.png',
    summary: 'Flexible packaging concepts for brands that need shelf-ready structure and bold surface design.',
    services: ['Mylar bags', 'Packaging', 'Mockups'],
  },
  {
    slug: 'poster-suite',
    title: 'Poster suite',
    client: 'Lettuce Print',
    category: 'Marketing',
    year: '2026',
    image: '/images/portfolio/poster-suite.png',
    summary: 'Poster production with rich coverage, crisp type, and campaign-ready sizing.',
    services: ['Posters', 'Marketing materials', 'Production'],
  },
  {
    slug: 'farmers-brand-system',
    title: 'Farmers brand system',
    client: 'Farmers NY',
    category: 'Identity',
    year: '2026',
    image: '/images/portfolio/farmers-brand-system.jpg',
    summary: 'A physical brand system translating identity into packaging, print, and campaign assets.',
    services: ['Identity', 'Packaging', 'Print system'],
  },
]

export function getPortfolioProject(slug: string) {
  return portfolioProjects.find((project) => project.slug === slug)
}
