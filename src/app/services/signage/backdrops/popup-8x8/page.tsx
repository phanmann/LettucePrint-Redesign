import ProductOrderPage from '@/components/shop/ProductOrderPage'

export default function Page() {
  return (
    <ProductOrderPage
      images={[
        { src: '/images/products/backdrops/popup.jpg', alt: 'Pop-up display 8x8' },
        { src: '/images/products/backdrops/step-repeat.jpg', alt: 'Event pop-up backdrop' },
      ]}
      name="Pop Up Display"
      tagline="Spring-loaded pop-up frame with fabric graphic. Setup in under 5 minutes."
      parentHref="/services/signage/backdrops"
      pricingTable={[
        { qty: 1, standardPrice: 592.0, rushPrice: 828.8 },
        { qty: 5, standardPrice: 2952.0, rushPrice: 4132.8 },
        { qty: 10, standardPrice: 5840.0, rushPrice: 8176.0 },
        { qty: 25, standardPrice: 14400.0, rushPrice: 20160.0 },
        { qty: 50, standardPrice: 28400.0, rushPrice: 39760.0 },
        { qty: 100, standardPrice: 56320.0, rushPrice: 78848.0 },
      ]}
      pricingNote="Config: Straight, White Stretch Fabric 9oz. Wrap style and grey back options available on request. Pickup available at Orlando FL or Hollywood FL. Shipping via customer UPS label."
      breadcrumb={[
        { label: "Backdrops", href: "/services/signage/backdrops" },
        { label: "Pop Up Display 8 x 8 ft.", href: "" },
      ]}
      badges={["Fast Turnaround"]}
      color="#E8F5EF"
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
