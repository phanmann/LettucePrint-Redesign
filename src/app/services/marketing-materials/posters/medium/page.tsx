import ProductOrderPage from '@/components/shop/ProductOrderPage'

export default function Page() {
  return (
    <ProductOrderPage
      images={[
        { src: '/images/products/posters/poster-1.jpg', alt: 'Medium poster print' },
        { src: '/images/products/posters/poster-2.jpg', alt: 'Custom printed poster' },
      ]}
      name="Medium Poster"
      tagline="The classic event poster size. Big enough to command attention, manageable to hang."
      parentHref="/services/marketing-materials/posters"
      breadcrumb={[
        { label: "Posters", href: "/services/marketing-materials/posters" },
        { label: "Medium Poster", href: "" },
      ]}
      badges={["Fast Turnaround"]}
      color="#F5F0E8"
      optionGroups={[
        { label: "Finish", options: [
          { id: "gloss", label: "Gloss", description: "High-shine UV coating. Colors pop." },
          { id: "matte", label: "Matte", description: "Soft matte. Clean and readable." },
        ] },
        { label: "Stock", options: [
          { id: "100lb-text", label: "100 lb. text", description: "Standard weight." },
          { id: "100lb-cover", label: "100 lb. cover", description: "Heavier premium feel." },
        ] },
      ]}
      specs={[
        { label: "Size", value: "18 x 24 in." },
        { label: "Stock", value: "100 lb. gloss or matte text" },
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
        { href: "/services/marketing-materials/posters", name: "All Posters", description: "Full poster lineup." },
        { href: "/services/signage/banners/retractable-33", name: "Banners", description: "Retractable banners for events.", dark: true },
      ]}
    />
  )
}
