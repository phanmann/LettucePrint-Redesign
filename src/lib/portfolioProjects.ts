export type PortfolioProjectImage = {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
  layout?: 'full' | 'half'
}

export type PortfolioProject = {
  slug: string
  aliases?: string[]
  title: string
  client: string
  category: string
  year: string
  image: string
  coverWidth?: number
  coverHeight?: number
  summary: string
  services: string[]
  output: string
  galleryImages: PortfolioProjectImage[]
}

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: 'rolling-green-cannabis',
    aliases: ['rolling-green-cannabis-packaging'],
    title: 'Rolling Green Cannabis',
    client: 'Rolling Green Cannabis',
    category: 'Packaging / Cannabis',
    year: '2024',
    image: '/images/portfolio/rolling-green-cannabis/hero.jpg',
    summary: "Rolling Green Cannabis is a premium, farmer-forward cannabis brand focused on delivering high-quality, organically grown products. The goal of this project was to design a cohesive, eye-catching line of jar labels for their best-selling flower. The packaging needed to honor the brand's connection to nature while providing a sophisticated, modern shelf presence that immediately communicates product variety to the consumer.",
    services: ['Cannabis packaging', 'Label production', 'Packaging design'],
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
    image: '/images/portfolio/county-road-cannabis/Paperbag_V1.jpg',
    coverWidth: 2400,
    coverHeight: 1600,
    summary: 'Cannabis brand applications translated across apparel, retail signage, packaging, and carryout materials.',
    services: ['Cannabis branding', 'Retail signage', 'Packaging'],
    output: 'Apparel graphics, storefront signage, custom tote artwork, paper bag packaging, and retail brand applications',
    galleryImages: [
      {
        src: '/images/portfolio/county-road-cannabis/store-sign-red.jpg',
        alt: 'County Road Cannabis storefront sign',
        caption: 'Storefront signage application for a clean, recognizable retail presence.',
        width: 1600,
        height: 1066,
      },
      {
        src: '/images/portfolio/county-road-cannabis/lifestyle-white-tee-arch-red.jpg',
        alt: 'County Road Cannabis white t-shirt with red arch artwork',
        caption: 'Branded apparel artwork showing the County Road Cannabis identity in use.',
        width: 5184,
        height: 3456,
      },
      {
        src: '/images/portfolio/county-road-cannabis/logooptions.jpg',
        alt: 'County Road Cannabis logo option sheet',
        caption: 'Logo option sheet showing the mark system and brand direction.',
        width: 1128,
        height: 1920,
        layout: 'half',
      },
      {
        src: '/images/portfolio/county-road-cannabis/tote_red2.jpg',
        alt: 'County Road Cannabis red branded tote bag',
        caption: 'Branded tote artwork extending the identity into reusable merchandise.',
        width: 1080,
        height: 1080,
        layout: 'half',
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
    slug: 'jamaica-smooth',
    aliases: ['sticker-label-kit'],
    title: 'Jamaica Smooth',
    client: 'Jamaica Smooth',
    category: 'Cannabis / Brand System',
    year: '2026',
    image: '/images/portfolio/jamaica-smooth/3bags.jpg',
    summary: 'Cannabis packaging and merchandise visuals built around a bold tropical brand system.',
    services: ['Cannabis packaging', 'Merchandise', 'Product photography'],
    output: 'Cannabis bag packaging, billboard-style product visuals, apparel graphics, tote artwork, and branded merchandise photography',
    galleryImages: [
      {
        src: '/images/portfolio/jamaica-smooth/3bags-billboard.jpg',
        alt: 'Jamaica Smooth three cannabis bags on a billboard-style background',
        caption: 'Packaging visuals built around a bold tropical product system.',
      },
      {
        src: '/images/portfolio/jamaica-smooth/black-tote-yellow-print-beach.jpg',
        alt: 'Jamaica Smooth black tote with yellow print on a beach',
        caption: 'Branded tote artwork extending the identity into lifestyle merchandise.',
      },
      {
        src: '/images/portfolio/jamaica-smooth/hat-logo-2.jpg',
        alt: 'Jamaica Smooth branded hat logo detail',
        caption: 'Hat logo detail showing the brand system translated into wearable merch.',
      },
      {
        src: '/images/portfolio/jamaica-smooth/tshirt-blank-design-1.jpg',
        alt: 'Jamaica Smooth t-shirt design mockup',
        caption: 'Apparel graphic mockup for a clean merch extension.',
      },
    ],
  },
  {
    slug: 'orange-county-cannabis',
    aliases: ['mylar-packaging-system'],
    title: 'Orange County Cannabis',
    client: 'Orange County Cannabis',
    category: 'Cannabis / Brand System',
    year: '2026',
    image: '/images/portfolio/orange-county-cannabis/store2.jpg',
    coverWidth: 2000,
    coverHeight: 3000,
    summary: 'Cannabis retail brand applications translated across storefront visuals, outdoor advertising, and identity systems.',
    services: ['Cannabis branding', 'Retail signage', 'Outdoor advertising'],
    output: 'Storefront visuals, logo system presentation, bus stop advertising, and cannabis retail brand applications',
    galleryImages: [
      {
        src: '/images/portfolio/orange-county-cannabis/store1.jpg',
        alt: 'Orange County Cannabis storefront exterior',
        caption: 'Storefront brand application for a clear cannabis retail presence.',
        width: 1440,
        height: 961,
      },
      {
        src: '/images/portfolio/orange-county-cannabis/bus-stop-ad.jpg',
        alt: 'Orange County Cannabis bus stop advertisement',
        caption: 'Outdoor advertising concept extending the brand into public-facing media.',
        width: 1920,
        height: 1280,
      },
      {
        src: '/images/portfolio/orange-county-cannabis/occc-logos.jpg',
        alt: 'Orange County Cannabis logo system sheet',
        caption: 'Logo system presentation showing the mark across lockups and color applications.',
        width: 1920,
        height: 1113,
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
