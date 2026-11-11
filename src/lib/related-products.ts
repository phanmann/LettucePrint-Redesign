export const recommendationProducts = [
  {
    name: 'Custom Stickers',
    href: '/shop/stickers',
    description: 'Die-cut, kiss-cut, holographic, clear, and durable vinyl stickers made for brands that need sharp details.',
    features: ['Order online', 'Waterproof vinyl', 'Fast turnaround'],
    badge: 'Best Seller',
  },
  {
    name: 'Spot UV Stickers',
    href: '/shop/spot-uv',
    description: 'Premium gloss-on-matte stickers with a tactile finish that catches light and makes packaging feel elevated.',
    features: ['Premium finish', 'Gloss detail', 'Die-cut shapes'],
    badge: 'Premium',
  },
  {
    name: 'Roll Labels',
    href: '/shop/roll-labels',
    description: 'High-volume labels for jars, bottles, bags, boxes, and anything headed to shelves or fulfillment.',
    features: ['Bulk friendly', 'Custom sizes', 'Machine-ready rolls'],
    badge: 'Bulk Ready',
  },
  {
    name: 'Standard Retractable Banner',
    href: '/services/signage/banners/retractable-standard',
    description: 'A lightweight 33 × 80 in. pull-up banner with an aluminum stand and carry bag.',
    features: ['Fast setup', 'Print or full kit', 'Carry bag included'],
    badge: 'Event Ready',
  },
  {
    name: 'Standard Mylar Bag',
    href: '/services/packaging/mylar-bags/standard',
    description: 'Custom-printed 4 × 5 in. eighth-size bags with zipper and finish options.',
    features: ['Full-color print', 'Zipper options', '1,000 minimum'],
    badge: 'Packaging',
  },
  {
    name: 'Premium Step and Repeat (10 × 8 ft)',
    href: '/services/signage/backdrops/step-repeat-10x8',
    description: 'A 10 × 8 ft event backdrop with an adjustable telescopic stand and proof review.',
    features: ['Event backdrop', 'Frame or graphic', 'Proof reviewed'],
    badge: 'Large Format',
  },
  { name: 'Standard Business Cards', href: '/services/marketing-materials/business-cards/standard', description: 'Classic business cards with crisp full-color printing and your choice of paper finish.', features: ['Matte or gloss', 'Paper stock options', 'Order online'], badge: 'Classic' },
  { name: 'Premium Business Cards', href: '/services/marketing-materials/business-cards/premium', description: 'Make a lasting impression with specialty finishes and substantial card stocks.', features: ['Soft-touch options', 'Specialty finishes', 'Full-color printing'], badge: 'Premium' },
  { name: 'Standard Postcards', href: '/services/marketing-materials/postcards/standard', description: 'Full-color postcards for promotions, announcements, and packaging inserts.', features: ['Size options', 'Full-color printing', 'Order online'], badge: 'Marketing' },
]

export function getRelatedProducts(currentPath: string, preferred: string[] = []) {
  const [stickers, spotUv, labels, banner, mylar, backdrop, standardCards, premiumCards, postcards] = recommendationProducts
  const paths = currentPath.includes('/signage/')
    ? [banner.href, backdrop.href, standardCards.href, stickers.href, postcards.href]
    : currentPath.includes('/packaging/') || currentPath.includes('/roll-labels')
      ? [labels.href, mylar.href, stickers.href, spotUv.href, postcards.href]
      : currentPath.startsWith('/shop/')
        ? [stickers.href, spotUv.href, labels.href, mylar.href, premiumCards.href]
        : [currentPath === premiumCards.href ? standardCards.href : premiumCards.href, stickers.href, postcards.href, labels.href, spotUv.href, standardCards.href]
  const candidates = [...preferred, ...paths, ...recommendationProducts.map(p => p.href)];
  const unique = [...new Set(candidates)].filter(href => href !== currentPath && !currentPath.startsWith(href + '/'));
  return unique.flatMap(href => {
    const product = recommendationProducts.find(p => p.href === href);
    return product ? [product] : [];
  }).slice(0, 4);
}
