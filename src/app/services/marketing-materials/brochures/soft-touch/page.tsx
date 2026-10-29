import ProductOrderPage from '@/components/shop/ProductOrderPage'

export default function Page() {
  return (
    <ProductOrderPage
      name="Soft Touch Brochure"
      tagline="Soft-touch laminated cover with a premium interior. Leaves a lasting impression at meetings and pitch decks."
      parentHref="/services/marketing-materials/brochures"
      breadcrumb={[
        { label: "Brochures", href: "/services/marketing-materials/brochures" },
        { label: "Soft Touch Brochure", href: "" },
      ]}
      badges={["Premium"]}
      color="#E8F5EF"
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
        { label: "Extras", options: [
          { id: "none", label: "None", description: "Standard soft-touch." },
          { id: "spot-uv", label: "Spot UV on cover", description: "Raised gloss.", badge: "Add-on" },
        ] },
      ]}
      specs={[
        { label: "Stock", value: "100 lb. cover" },
        { label: "Finish", value: "Soft-touch matte laminate" },
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
        "Soft-touch laminate cover",
        "Full-color CMYK printing",
        "Quality check before ship",
      ]}
      relatedProducts={[
        { href: "/services/marketing-materials/brochures", name: "All Brochures", description: "Full brochure lineup." },
        { href: "/services/marketing-materials/booklets", name: "Booklets", description: "Saddle-stitch and perfect-bound.", dark: true },
      ]}
    />
  )
}
