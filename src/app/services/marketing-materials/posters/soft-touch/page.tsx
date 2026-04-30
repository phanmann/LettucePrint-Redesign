import ProductOrderPage from '@/components/shop/ProductOrderPage'

export default function Page() {
  return (
    <ProductOrderPage
      images={[
        { src: '/images/products/posters/poster-soft-touch.jpg', alt: 'Soft-touch poster finish' },
        { src: '/images/products/posters/poster-1.jpg', alt: 'Premium soft-touch poster' },
      ]}
      name="Soft Touch Poster"
      tagline="Velvety soft-touch laminate over full-color printing. A tactile luxury finish that elevates any space."
      parentHref="/services/marketing-materials/posters"
      breadcrumb={[
        { label: "Posters", href: "/services/marketing-materials/posters" },
        { label: "Soft Touch Poster", href: "" },
      ]}
      badges={["Premium"]}
      color="#E8F5EF"
      optionGroups={[
        { label: "Size", options: [
          { id: "18x24", label: "18 x 24 in.", description: "" },
          { id: "24x36", label: "24 x 36 in.", description: "" },
        ] },
        { label: "Stock", options: [
          { id: "cover", label: "100 lb. cover", description: "Heavy base for laminate." },
          { id: "heavy", label: "120 lb. cover", description: "Extra rigid." },
        ] },
      ]}
      specs={[
        { label: "Stock", value: "100-120 lb. cover" },
        { label: "Finish", value: "Soft-touch matte laminate" },
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
        "Soft-touch matte laminate",
        "Full-color CMYK printing",
        "Quality check before ship",
      ]}
      relatedProducts={[
        { href: "/services/marketing-materials/posters/art-print", name: "Art Print Poster", description: "Museum-quality fine art prints." },
        { href: "/services/marketing-materials/posters", name: "All Posters", description: "Full lineup.", dark: true },
      ]}
    />
  )
}
