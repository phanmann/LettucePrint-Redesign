import ProductOrderPage from '@/components/shop/ProductOrderPage'

export default function Page() {
  return (
    <ProductOrderPage
      images={[
        { src: '/images/products/posters/poster-1.jpg', alt: 'Art print poster' },
        { src: '/images/products/posters/poster-2.jpg', alt: 'Custom art prints' },
      ]}
      name="Art Print Poster"
      tagline="Museum-quality fine art prints on premium paper. For artists, photographers, and brands that demand the best."
      parentHref="/services/marketing-materials/posters"
      breadcrumb={[
        { label: "Posters", href: "/services/marketing-materials/posters" },
        { label: "Art Print Poster", href: "" },
      ]}
      badges={["Premium"]}
      color="#F0E8F5"
      optionGroups={[
        { label: "Size", options: [
          { id: "11x14", label: "11 x 14 in.", description: "" },
          { id: "16x20", label: "16 x 20 in.", description: "" },
          { id: "18x24", label: "18 x 24 in.", description: "" },
          { id: "24x36", label: "24 x 36 in.", description: "" },
        ] },
        { label: "Paper", options: [
          { id: "matte-art", label: "Matte Art Paper", description: "Museum-quality matte." },
          { id: "lustre", label: "Lustre Photo Paper", description: "Semi-gloss, vibrant." },
        ] },
      ]}
      specs={[
        { label: "Stock", value: "Premium matte art or lustre paper" },
        { label: "Color mode", value: "Full-color CMYK" },
        { label: "Turnaround", value: "3-5 business days" },
      ]}
      artworkRequirements={[
        { label: "Preferred formats", value: "AI, PDF, EPS" },
        { label: "Accepted formats", value: "PSD, PNG, JPG (300 DPI min)" },
        { label: "Color mode", value: "CMYK preferred" },
        { label: "Bleed", value: "0.125 in. on all sides" },
        { label: "Safe zone", value: "0.125 in. from all edges" },
      ]}
      included={[
        "Digital proof before production",
        "Premium paper stock",
        "Full-color CMYK printing",
        "Quality check before ship",
      ]}
      relatedProducts={[
        { href: "/services/marketing-materials/posters/soft-touch", name: "Soft Touch Poster", description: "Premium laminate finish.", dark: true },
        { href: "/services/marketing-materials/posters", name: "All Posters", description: "Full poster lineup." },
      ]}
    />
  )
}
