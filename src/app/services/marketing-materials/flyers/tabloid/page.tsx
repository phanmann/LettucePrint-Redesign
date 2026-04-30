import ProductOrderPage from '@/components/shop/ProductOrderPage'

export default function Page() {
  return (
    <ProductOrderPage
      images={[
        { src: '/images/products/flyers/flyer-2.jpg', alt: 'Tabloid flyer print' },
        { src: '/images/products/flyers/flyer-1.jpg', alt: 'Large format flyers' },
      ]}
      name="Tabloid Flyer"
      tagline="Twice the real estate of a letter flyer. Perfect for menus, concert bills, and display boards."
      parentHref="/services/marketing-materials/flyers"
      breadcrumb={[
        { label: "Flyers", href: "/services/marketing-materials/flyers" },
        { label: "Tabloid Flyer", href: "" },
      ]}
      badges={["Large Format"]}
      color="#E8F5EF"
      optionGroups={[
        { label: "Finish", options: [
          { id: "gloss", label: "Gloss", description: "High-shine UV coating. Colors pop." },
          { id: "matte", label: "Matte", description: "Soft matte. Clean and readable." },
        ] },
        { label: "Sides", options: [
          { id: "double", label: "Double-Sided", description: "Print on both sides." },
          { id: "single", label: "Single-Sided", description: "Front only." },
        ] },
        { label: "Stock", options: [
          { id: "100lb-text", label: "100 lb. text", description: "Standard weight." },
          { id: "100lb-cover", label: "100 lb. cover", description: "Heavier premium feel." },
        ] },
        { label: "Folding", options: [
          { id: "flat", label: "Flat", description: "No fold." },
          { id: "half-fold", label: "Half Fold", description: "Folded to 8.5x11.", badge: "Add-on" },
        ] },
      ]}
      specs={[
        { label: "Size", value: "11 x 17 in." },
        { label: "Stock", value: "80 lb. gloss or matte text" },
        { label: "Color mode", value: "Full-color CMYK" },
        { label: "Turnaround", value: "2-3 business days" },
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
        "Full-color CMYK printing",
        "Quality check before ship",
        "Bulk quantity discounts available",
      ]}
      relatedProducts={[
        { href: "/services/marketing-materials/flyers/letter-gloss", name: "Letter Flyer", description: "Standard 8.5x11." },
        { href: "/services/marketing-materials/posters", name: "Posters", description: "Full poster-size for events.", dark: true },
      ]}
    />
  )
}
