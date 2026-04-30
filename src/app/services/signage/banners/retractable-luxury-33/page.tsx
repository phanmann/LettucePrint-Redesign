import ProductOrderPage from '@/components/shop/ProductOrderPage'

export default function Page() {
  return (
    <ProductOrderPage
      name="Luxury Base Retractable"
      tagline="Premium weighted base for a stable, upscale presentation. Perfect for lobbies and showrooms."
      parentHref="/services/signage/banners"
      pricingTable={[
        { qty: "1 unit", standardPrice: 190.4, rushPrice: 247.52 },
      ]}
      pricingNote="Luxury weighted base, full-color print, carry bag. Pickup available at Orlando FL or Hollywood FL. Shipping via customer UPS label."
      breadcrumb={[
        { label: "Banners", href: "/services/signage/banners" },
        { label: "Luxury Base Retractable", href: "" },
      ]}
      badges={["Fast Turnaround"]}
      color="#E8F0F5"
      images={[
        { src: 'https://drive.usercontent.google.com/download?id=1lkdgvN3wjRMfftKmeu5X47ZwHyor7dzB&export=view', alt: 'Retractable banner display' },
        { src: 'https://drive.usercontent.google.com/download?id=1p_mlXivZBXkObui0RQPrmVH8uhVf9WNl&export=view', alt: 'Retractable banner setup' },
      ]}
      showQuantity={true}
      optionGroups={[
        { label: "Hardware", options: [
          { id: "included", label: "Hardware Included", description: "Base and carry bag included." },
          { id: "graphic-only", label: "Graphic Only", description: "Print only, no hardware." },
        ] },
      ]}
      specs={[
        { label: "Size", value: "33 x 80 in." },
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
