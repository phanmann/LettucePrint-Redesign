import ProductOrderPage from '@/components/shop/ProductOrderPage'

export default function Page() {
  return (
    <ProductOrderPage
      name="Standard Retractable Banner"
      tagline="Wide-format retractable for maximum impact. Ideal for large booths and open floor spaces."
      parentHref="/services/signage/banners"
      pricingTable={[
        { qty: "1 unit", standardPrice: 260.8, rushPrice: 339.04 },
      ]}
      pricingNote="Includes hardware, full-color print, and carry bag. Pickup available at Orlando FL or Hollywood FL. Shipping via customer UPS label."
      breadcrumb={[
        { label: "Banners", href: "/services/signage/banners" },
        { label: "Standard Retractable Banner", href: "" },
      ]}
      badges={["Fast Turnaround"]}
      color="#F0E8F5"
      showQuantity={true}
      optionGroups={[
        { label: "Hardware", options: [
          { id: "included", label: "Hardware Included", description: "Base and carry bag included." },
          { id: "graphic-only", label: "Graphic Only", description: "Print only, no hardware." },
        ] },
      ]}
      specs={[
        { label: "Size", value: "48 x 80 in." },
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
