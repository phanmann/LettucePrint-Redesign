import ProductOrderPage from '@/components/shop/ProductOrderPage'

export default function Page() {
  return (
    <ProductOrderPage
      name="Uncoated Brochure"
      tagline="Natural, tactile paper with rich ink absorption. Great for editorial or artisan brand feel."
      parentHref="/services/marketing-materials/brochures"
      breadcrumb={[
        { label: "Brochures", href: "/services/marketing-materials/brochures" },
        { label: "Uncoated Brochure", href: "" },
      ]}
      badges={["Eco Friendly"]}
      color="#F5E8E8"
      optionGroups={[
        { label: "Size", options: [
          { id: "letter", label: "8.5 x 11 in.", description: "Standard." },
          { id: "legal", label: "8.5 x 14 in.", description: "Legal size." },
          { id: "custom", label: "Custom", description: "Tell us your dimensions." },
        ] },
        { label: "Fold", options: [
          { id: "tri", label: "Tri-Fold", description: "6-panel." },
          { id: "bi", label: "Bi-Fold", description: "4-panel." },
        ] },
      ]}
      specs={[
        { label: "Stock", value: "100 lb. uncoated text" },
        { label: "Finish", value: "Uncoated - writable surface" },
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
        "Uncoated natural paper stock",
        "Full-color CMYK printing",
        "Quality check before ship",
      ]}
      relatedProducts={[
        { href: "/services/marketing-materials/brochures", name: "All Brochures", description: "Full brochure lineup." },
        { href: "/services/marketing-materials/brochures/soft-touch", name: "Soft Touch Brochure", description: "Premium laminated option.", dark: true },
      ]}
    />
  )
}
