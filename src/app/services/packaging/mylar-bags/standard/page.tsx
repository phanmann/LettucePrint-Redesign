import ProductOrderPage from '@/components/shop/ProductOrderPage'

export default function Page() {
  return (
    <ProductOrderPage
      name="Standard Mylar Bag"
      tagline="Custom-printed mylar bags for cannabis, food, supplements, and consumer goods."
      parentHref="/services/packaging/mylar-bags"
      breadcrumb={[
        { label: "Mylar Bags", href: "/services/packaging/mylar-bags" },
        { label: "Standard Mylar Bag", href: "" },
      ]}
      badges={["Custom Sizes"]}
      color="#E8F5F1"
      optionGroups={[
        { label: "Size", options: [
          { id: "3x5", label: "3 x 5 in.", description: "Small, single serve." },
          { id: "4x6", label: "4 x 6 in.", description: "Medium." },
          { id: "6x9", label: "6 x 9 in.", description: "Large." },
          { id: "custom", label: "Custom", description: "Tell us your dimensions." },
        ] },
        { label: "Seal", options: [
          { id: "zip", label: "Zip Lock", description: "Resealable zip top." },
          { id: "heat", label: "Heat Seal", description: "Sealed, no reopen." },
          { id: "cr", label: "Child Resistant Zip", description: "CR compliant.", badge: "Compliance" },
        ] },
        { label: "Finish", options: [
          { id: "gloss", label: "Gloss", description: "High-shine UV coating. Colors pop." },
          { id: "matte", label: "Matte", description: "Soft matte. Clean and readable." },
        ] },
      ]}
      specs={[
        { label: "Material", value: "Multi-layer mylar" },
        { label: "Print", value: "Full-color CMYK" },
        { label: "Seal options", value: "Zip, heat seal, child-resistant" },
        { label: "Minimum order", value: "500 units" },
        { label: "Turnaround", value: "10-14 business days" },
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
        "Bulk quantity discounts",
      ]}
      relatedProducts={[
        { href: "/services/packaging/mylar-bags/die-cut", name: "Die-Cut Mylar Bag", description: "Custom shaped mylar for unique shelf presence.", dark: true },
        { href: "/services/packaging/boxes", name: "Boxes and Packaging", description: "Custom printed boxes." },
      ]}
    />
  )
}
