import ProductOrderPage from '@/components/shop/ProductOrderPage'

export default function Page() {
  return (
    <ProductOrderPage
      images={[
        { src: '/images/products/boxes/box-folding-carton.jpg', alt: 'Printed box sleeve' },
        { src: '/images/products/boxes/box-magnetic.jpg', alt: 'Custom sleeve packaging' },
      ]}
      name="Box Sleeve"
      tagline="Printed sleeve that wraps around an existing box. A cost-effective way to add branded packaging."
      parentHref="/services/packaging/boxes"
      breadcrumb={[
        { label: "Boxes and Packaging", href: "/services/packaging/boxes" },
        { label: "Box Sleeve", href: "" },
      ]}
      badges={["Custom Sizes"]}
      color="#F0E8F5"
      optionGroups={[
        { label: "Print", options: [
          { id: "outside", label: "Outside Only", description: "Print on exterior." },
          { id: "both", label: "Inside + Outside", description: "Full interior + exterior print.", badge: "Add-on" },
        ] },
        { label: "Finish", options: [
          { id: "matte", label: "Matte Laminate", description: "Soft matte finish." },
          { id: "gloss", label: "Gloss Laminate", description: "High-shine finish." },
          { id: "soft-touch", label: "Soft Touch", description: "Velvety premium.", badge: "Premium" },
        ] },
        { label: "Quantity", options: [
          { id: "100", label: "100 units", description: "" },
          { id: "250", label: "250 units", description: "" },
          { id: "500", label: "500 units", description: "" },
          { id: "1000", label: "1,000 units", description: "" },
          { id: "custom", label: "Custom", description: "Tell us your quantity." },
        ] },
      ]}
      specs={[
        { label: "Material", value: "Corrugated or paperboard" },
        { label: "Print", value: "Full-color CMYK" },
        { label: "Finish", value: "Matte, gloss, or soft-touch" },
        { label: "Minimum order", value: "100 units" },
        { label: "Turnaround", value: "7-14 business days" },
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
        "Dieline template provided",
        "Quality check before ship",
      ]}
      relatedProducts={[
        { href: "/services/packaging/boxes", name: "All Boxes", description: "Full packaging lineup." },
        { href: "/services/packaging/custom-packaging", name: "Custom Packaging", description: "Full custom packaging solutions.", dark: true },
      ]}
      customNote="Need a custom size, special finish, or bulk order? We will spec it out and quote you fast."
    />
  )
}
