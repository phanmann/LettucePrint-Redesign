import ProductOrderPage from '@/components/shop/ProductOrderPage'

export default function Page() {
  return (
    <ProductOrderPage
      images={[
        { src: '/images/products/backdrops/popup.jpg', alt: 'Pop-up display 20x8' },
        { src: '/images/products/backdrops/step-repeat.jpg', alt: 'Large pop-up backdrop' },
      ]}
      name="Pop Up Display"
      tagline="Double-wide pop-up for large booths and conference stages."
      parentHref="/services/signage/backdrops"
      pricingTable={[
        { qty: 1, standardPrice: 1436.8, rushPrice: 1867.84 },
        { qty: 5, standardPrice: 7184.0, rushPrice: 9339.2 },
        { qty: 10, standardPrice: 14368.0, rushPrice: 18678.4 },
        { qty: 25, standardPrice: 35920.0, rushPrice: 46696.0 },
        { qty: 50, standardPrice: 71840.0, rushPrice: 93392.0 },
        { qty: 100, standardPrice: 143680.0, rushPrice: 186784.0 },
      ]}
      pricingNote="Prices include hardware + full-color print. Rush = next-day production. Pickup available at Orlando FL or Hollywood FL. Shipping via customer UPS label."
      breadcrumb={[
        { label: "Backdrops", href: "/services/signage/backdrops" },
        { label: "Pop Up Display 20 x 8 ft.", href: "" },
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
        { label: "Size", value: "20 x 8 ft." },
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
