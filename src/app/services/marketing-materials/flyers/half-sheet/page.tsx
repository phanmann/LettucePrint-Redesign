import ProductOrderPage from '@/components/shop/ProductOrderPage'

export default function Page() {
  return (
    <ProductOrderPage
      name="Half Sheet Flyer"
      tagline="The workhorse handout. Great for menus, event promos, and retail inserts."
      parentHref="/services/marketing-materials/flyers"
      breadcrumb={[
        { label: "Flyers", href: "/services/marketing-materials/flyers" },
        { label: "Half Sheet Flyer", href: "" },
      ]}
      badges={["Fast Turnaround"]}
      color="#E8F5F1"
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
      ]}
      specs={[
        { label: "Size", value: "5.5 x 8.5 in." },
        { label: "Stock", value: "80-100 lb. gloss or matte text" },
        { label: "Color mode", value: "Full-color CMYK" },
        { label: "Turnaround", value: "1-2 business days" },
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
        { href: "/services/marketing-materials/flyers/letter-gloss", name: "Letter Flyer", description: "Full 8.5x11 for maximum impact.", dark: true },
        { href: "/services/marketing-materials/flyers", name: "All Flyers", description: "Full flyer lineup." },
      ]}
    />
  )
}
