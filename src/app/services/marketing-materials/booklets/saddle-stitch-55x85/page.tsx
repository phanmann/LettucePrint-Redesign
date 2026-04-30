import ProductOrderPage from '@/components/shop/ProductOrderPage'

export default function Page() {
  return (
    <ProductOrderPage
      name="Saddle-Stitch Booklet"
      tagline="Compact saddle-stitch booklet for lookbooks, programs, menus, and product catalogs."
      parentHref="/services/marketing-materials/booklets"
      breadcrumb={[
        { label: "Booklets", href: "/services/marketing-materials/booklets" },
        { label: "Saddle-Stitch Booklet 5.5 x 8.5 in.", href: "" },
      ]}
      badges={["Fast Turnaround"]}
      color="#E8F5F1"
      optionGroups={[
        { label: "Cover", options: [
          { id: "gloss", label: "Gloss Cover", description: "High-shine coating." },
          { id: "matte", label: "Matte Cover", description: "Soft matte." },
        ] },
        { label: "Interior", options: [
          { id: "60lb", label: "60 lb. uncoated", description: "Standard interior." },
          { id: "70lb", label: "70 lb. text", description: "Slightly heavier." },
        ] },
        { label: "Pages", options: [
          { id: "8", label: "8 pages", description: "Minimum." },
          { id: "16", label: "16 pages", description: "Standard." },
          { id: "24", label: "24 pages", description: "" },
          { id: "32", label: "32 pages", description: "" },
          { id: "custom", label: "Custom", description: "We will quote based on page count." },
        ] },
      ]}
      specs={[
        { label: "Size", value: "5.5 x 8.5 in." },
        { label: "Cover", value: "100 lb. gloss or matte" },
        { label: "Interior", value: "60-70 lb. text" },
        { label: "Binding", value: "Saddle-stitch" },
        { label: "Color mode", value: "Full-color CMYK" },
        { label: "Turnaround", value: "5-7 business days" },
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
        "Full-color CMYK cover + interior",
        "Bound and finished",
        "Quality check before ship",
      ]}
      relatedProducts={[
        { href: "/services/marketing-materials/booklets", name: "All Booklets", description: "Full booklet lineup." },
        { href: "/services/marketing-materials/brochures", name: "Brochures", description: "Shorter format options.", dark: true },
      ]}
    />
  )
}
