import ProductOrderPage from '@/components/shop/ProductOrderPage'

export default function Page() {
  return (
    <ProductOrderPage
      name="Vinyl Banner"
      tagline="Durable, weather-resistant vinyl for indoor and outdoor hanging. Grommets included."
      parentHref="/services/signage/banners"
      breadcrumb={[
        { label: "Banners", href: "/services/signage/banners" },
        { label: "Vinyl Banner", href: "" },
      ]}
      badges={["Fast Turnaround"]}
      color="#F5E8E8"
      optionGroups={[
        { label: "Finish", options: [
          { id: "gloss", label: "Gloss print", description: "Vibrant high-shine." },
          { id: "matte", label: "Matte print", description: "Soft matte." },
        ] },
        { label: "Hardware", options: [
          { id: "included", label: "Hardware Included", description: "Base and carry bag included." },
          { id: "graphic-only", label: "Graphic Only", description: "Print only, no hardware." },
        ] },
      ]}
      specs={[
        { label: "Size", value: "Custom sizes" },
        { label: "Material", value: "Premium banner material" },
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
        "Full-color CMYK printing",
        "Hardware and carry bag included",
        "Quality check before ship",
      ]}
      relatedProducts={[
        { href: "/services/signage/banners", name: "All Banners", description: "Full banner lineup." },
        { href: "/services/signage/backdrops", name: "Backdrops", description: "Step and repeat, eurofit, and pop-up displays.", dark: true },
      ]}
    />
  )
}
