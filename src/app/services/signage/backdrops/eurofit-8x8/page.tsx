import ProductOrderPage from '@/components/shop/ProductOrderPage'

export default function Page() {
  return (
    <ProductOrderPage
      name="Eurofit Backdrop"
      tagline="Seamless fabric display with aluminum frame. Clean, frameless look."
      parentHref="/services/signage/backdrops"
      pricingTable={[
        { qty: 1, standardPrice: 571.2, rushPrice: 742.56 },
        { qty: 5, standardPrice: 2824.0, rushPrice: 3671.2 },
        { qty: 10, standardPrice: 5616.0, rushPrice: 7300.8 },
        { qty: 25, standardPrice: 13920.0, rushPrice: 18096.0 },
        { qty: 50, standardPrice: 27600.0, rushPrice: 35880.0 },
        { qty: 100, standardPrice: 53600.0, rushPrice: 69680.0 },
      ]}
      pricingNote="Config: With Fabric Print, Double Sided. Single-sided and zipper options available on request. Pickup available at Orlando FL or Hollywood FL. Shipping via customer UPS label."
      breadcrumb={[
        { label: "Backdrops", href: "/services/signage/backdrops" },
        { label: "Eurofit Backdrop 8 x 8 ft.", href: "" },
      ]}
      badges={["Fast Turnaround"]}
      color="#F5F0E8"
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
