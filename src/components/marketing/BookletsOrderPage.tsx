import ProductOrderPage from '@/components/shop/ProductOrderPage'

const saddleSizes = ['5.5" × 8.5"', '8.5" × 11"', '8.5" × 8.5"']
const perfectSizes = ['8.5" × 11"', '6" × 9"']
export default function BookletsOrderPage({ binding, size }: { binding: 'saddle' | 'perfect'; size: string }) {
 const perfect = binding === 'perfect'
 const sizes = perfect ? perfectSizes : saddleSizes
 const slugs = perfect ? ['perfect-bound-85x11', 'perfect-bound-6x9'] : ['saddle-stitch-55x85', 'saddle-stitch-85x11', 'saddle-stitch-square']
 const name = perfect ? 'Perfect Bound Book' : 'Saddle-Stitch Booklet'
  return (
    <ProductOrderPage
      name={name}
 captureConfiguration
 showQuantity
 initialSelections={{ Size: size }}
 cartPathsBySize={Object.fromEntries(sizes.map((value, i) => [value, "/services/marketing-materials/booklets/" + slugs[i]]))}
      tagline="Choose your size, cover, interior, and page count for a custom booklet quote."
      parentHref="/services/marketing-materials/booklets"
      breadcrumb={[
        { label: "Booklets", href: "/services/marketing-materials/booklets" },
        { label: name, href: "" },
      ]}
      badges={["Fast Turnaround"]}
      color="#E8F5F1"
      optionGroups={[
 { label: "Size", options: sizes.map(value => ({ id: value, label: value, description: "Finished booklet size." })) },
        { label: "Cover", options: [
          { id: "gloss", label: "Gloss Cover", description: "High-shine coating." },
          { id: "matte", label: "Matte Cover", description: "Soft matte." },
        ] },
        { label: "Interior", options: [
          { id: "60lb", label: "60 lb. uncoated", description: "Standard interior." },
          { id: "70lb", label: "70 lb. text", description: "Slightly heavier." },
        ] },
        { label: "Pages", options: [
          { id: "8", label: "8 pages", description: "Subject to binding review." },
          { id: "16", label: "16 pages", description: "Standard." },
          { id: "24", label: "24 pages", description: "" },
          { id: "32", label: "32 pages", description: "" },
          { id: "custom", label: "Custom", description: "We will quote based on page count." },
        ] },
      ]}
      customNote="Pricing and page count are confirmed by quote before production. Ask us about soft-touch cover options."
      specs={[
        { label: "Sizes", value: sizes.join(", ") },
        { label: "Cover", value: "100 lb. gloss or matte" },
        { label: "Interior", value: "60-70 lb. text" },
        { label: "Binding", value: perfect ? "Perfect bound" : "Saddle-stitch" },
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
