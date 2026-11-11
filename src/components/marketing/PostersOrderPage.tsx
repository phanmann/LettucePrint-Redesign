import ProductOrderPage from '@/components/shop/ProductOrderPage'

export default function PostersOrderPage({ size = '11" × 17"' }: { size?: string }) {
  return (
    <ProductOrderPage
      captureConfiguration
      name="Posters"
      tagline="Full-color posters for retail displays, events, and storefronts. Choose small, medium, or large below."
      parentHref="/shop/marketing-materials/posters"
      breadcrumb={[
        { label: "Posters", href: "/shop/marketing-materials/posters" },
        { label: "Posters", href: "" },
      ]}
      badges={["Fast Turnaround"]}
      color="#E8F5F1"
      cartPathsBySize={{
        '11" × 17"': '/shop/marketing-materials/posters/small',
        '18" × 24"': '/shop/marketing-materials/posters/medium',
        '24" × 36"': '/shop/marketing-materials/posters/large',
      }}
      initialSelections={{ Size: size }}
      galleryPath="/shop/marketing-materials/posters/small"
      showQuantity
      optionGroups={[
        { label: 'Size', options: [
          { id: '11" × 17"', label: '11" × 17"', description: 'Small poster.' },
          { id: '18" × 24"', label: '18" × 24"', description: 'Medium poster.' },
          { id: '24" × 36"', label: '24" × 36"', description: 'Large poster.' },
        ] },
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
        { label: "Sizes", value: '11" × 17", 18" × 24", 24" × 36"' },
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
        { href: "/shop/marketing-materials/posters", name: "All Posters", description: "Full poster lineup." },
        { href: "/shop/signage/banners/retractable-33", name: "Banners", description: "Retractable banners for events.", dark: true },
      ]}
    />
  )
}
