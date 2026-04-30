import ProductOrderPage from '@/components/shop/ProductOrderPage'

export default function Page() {
  return (
    <ProductOrderPage
      images={[
        { src: '/images/products/posters/poster-soft-touch.jpg', alt: 'Soft-touch cover booklet' },
        { src: '/images/products/booklets/booklet-open.jpg', alt: 'Soft-touch booklet interior' },
      ]}
      name="Soft Touch Cover Booklet"
      tagline="Premium soft-touch laminated cover. A favorite for brand books, portfolios, and annual reports."
      parentHref="/services/marketing-materials/booklets"
      breadcrumb={[
        { label: "Booklets", href: "/services/marketing-materials/booklets" },
        { label: "Soft Touch Cover Booklet", href: "" },
      ]}
      badges={["Premium"]}
      color="#F5E8E8"
      optionGroups={[
        { label: "Size", options: [
          { id: "85x11", label: "8.5 x 11 in.", description: "Standard." },
          { id: "6x9", label: "6 x 9 in.", description: "Digest size." },
        ] },
        { label: "Interior", options: [
          { id: "60lb", label: "60 lb. uncoated", description: "Standard interior." },
          { id: "70lb", label: "70 lb. text", description: "Slightly heavier." },
        ] },
        { label: "Pages", options: [
          { id: "8", label: "8 pages", description: "Minimum." },
          { id: "16", label: "16 pages", description: "Standard." },
          { id: "24", label: "24 pages", description: "" },
          { id: "32", label: "32 pages", description: "" },
          { id: "custom", label: "Custom", description: "We will quote based on page count." },
        ] },
      ]}
      specs={[
        { label: "Cover", value: "100 lb. with soft-touch laminate" },
        { label: "Interior", value: "60-70 lb. text" },
        { label: "Binding", value: "Saddle-stitch or perfect-bound" },
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
        "Soft-touch laminate cover",
        "Full-color CMYK throughout",
        "Quality check before ship",
      ]}
      relatedProducts={[
        { href: "/services/marketing-materials/booklets", name: "All Booklets", description: "Full booklet lineup." },
        { href: "/services/marketing-materials/brochures/soft-touch", name: "Soft Touch Brochure", description: "Same premium laminate, shorter format.", dark: true },
      ]}
    />
  )
}
