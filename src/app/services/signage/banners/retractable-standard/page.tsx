import ProductOrderPage from '@/components/shop/ProductOrderPage'

export default function Page() {
  return (
    <ProductOrderPage
      name="Standard Retractable Banner"
      tagline="Lightweight aluminum pull-up banners with size options for trade shows, retail, events, and office displays."
      parentHref="/services/signage/banners"
      breadcrumb={[
        { label: "Banners", href: "/services/signage/banners" },
        { label: "Standard Retractable Banner", href: "" },
      ]}
      badges={["Fast Turnaround"]}
      color="#E8F5F1"
      images={[
        { src: 'https://drive.usercontent.google.com/download?id=1lkdgvN3wjRMfftKmeu5X47ZwHyor7dzB&export=view', alt: 'Standard retractable banner display' },
        { src: 'https://drive.usercontent.google.com/download?id=1p_mlXivZBXkObui0RQPrmVH8uhVf9WNl&export=view', alt: 'Wide standard retractable banner setup' },
      ]}
      showQuantity={true}
      optionGroups={[
        { label: "Size", options: [
          { id: "33x80", label: "33\" × 80\"", description: "Most popular standard size. From $126.40 · rush from $164.32." },
          { id: "48x80", label: "48\" × 80\"", description: "Wider format for larger booths and open spaces. From $260.80 · rush from $339.04." },
          { id: "60x80", label: "60\" × 80\"", description: "Largest standard pull-up size. Pricing confirmed after request.", badge: "Quote" },
        ] },
        { label: "Hardware", options: [
          { id: "included", label: "Hardware Included", description: "Base and carry bag included." },
          { id: "graphic-only", label: "Graphic Only", description: "Print only, no hardware." },
        ] },
      ]}
      specs={[
        { label: "Available sizes", value: "33 × 80 in., 48 × 80 in., 60 × 80 in." },
        { label: "Material", value: "Premium banner material" },
        { label: "Hardware", value: "Aluminum retractable base with carry bag" },
        { label: "Color mode", value: "Full-color CMYK" },
        { label: "Turnaround", value: "3–7 business days depending on size" },
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
        "Standard retractable hardware and carry bag when selected",
        "Quality check before pickup or ship",
      ]}
      customNote="Need a specialty base, double-sided display, or a non-standard size? Send the specs and we'll quote the right setup."
      relatedProducts={[
        { href: "/services/signage/banners/retractable-luxury-33", name: "Luxury Base Retractable", description: "Premium weighted base for upscale displays." },
        { href: "/services/signage/banners", name: "All Banners", description: "Vinyl, fabric, mesh, tabletop, and more.", dark: true },
      ]}
    />
  )
}
