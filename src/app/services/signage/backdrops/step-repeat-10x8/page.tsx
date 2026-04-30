import ProductOrderPage from '@/components/shop/ProductOrderPage'

export default function Page() {
  return (
    <ProductOrderPage
      name="Step and Repeat Backdrop"
      tagline="Wide-format step and repeat for larger stages, red carpets, and events."
      parentHref="/services/signage/backdrops"
      breadcrumb={[
        { label: "Backdrops", href: "/services/signage/backdrops" },
        { label: "Step and Repeat Backdrop 10 x 8 ft.", href: "" },
      ]}
      badges={["Fast Turnaround"]}
      color="#E8F0F5"
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
        { label: "Size", value: "10 x 8 ft." },
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
