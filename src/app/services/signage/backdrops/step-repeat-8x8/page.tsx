import ProductOrderPage from '@/components/shop/ProductOrderPage'

export default function Page() {
  return (
    <ProductOrderPage
      name="Step and Repeat Backdrop"
      tagline="The classic event backdrop. Full-color logo repeat on tension fabric or vinyl."
      parentHref="/services/signage/backdrops"
      pricingTable={[
        { qty: 1, standardPrice: 302.4, rushPrice: 423.36 },
        { qty: 5, standardPrice: 1496.0, rushPrice: 2094.4 },
        { qty: 10, standardPrice: 2960.0, rushPrice: 4144.0 },
        { qty: 25, standardPrice: 7360.0, rushPrice: 10304.0 },
        { qty: 50, standardPrice: 14240.0, rushPrice: 19936.0 },
        { qty: 100, standardPrice: 27840.0, rushPrice: 38976.0 },
      ]}
      pricingNote="Prices include hardware + full-color print. Rush = next-day production. Pickup available at Orlando FL or Hollywood FL. Shipping via customer UPS label."
      breadcrumb={[
        { label: "Backdrops", href: "/services/signage/backdrops" },
        { label: "Step and Repeat Backdrop 8 x 8 ft.", href: "" },
      ]}
      badges={["Fast Turnaround"]}
      color="#E8F5F1"
      optionGroups={[
        { label: "Material", options: [
          { id: "fabric", label: "Tension Fabric", description: "Wrinkle-resistant, seamless print." },
          { id: "vinyl", label: "Vinyl", description: "Durable, high-gloss option." },
        ] },
        { label: "Hardware", options: [
          { id: "frame-included", label: "Frame Included", description: "Complete kit with frame and carry case." },
          { id: "graphic-only", label: "Graphic Only", description: "Print only, no hardware." },
        ] },
      ]}
      specs={[
        { label: "Size", value: "8 x 8 ft." },
        { label: "Material", value: "Tension fabric or vinyl" },
        { label: "Color mode", value: "Dye-sublimation or CMYK" },
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
        "Full-color dye-sub or CMYK print",
        "Hardware and carry case included",
        "Quality check before ship",
      ]}
      relatedProducts={[
        { href: "/services/signage/backdrops", name: "All Backdrops", description: "Full backdrop lineup." },
        { href: "/services/signage/banners", name: "Banners", description: "Retractable and hanging banners.", dark: true },
      ]}
    />
  )
}
