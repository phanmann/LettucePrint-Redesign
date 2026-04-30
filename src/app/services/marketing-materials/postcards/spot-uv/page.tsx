import ProductOrderPage from '@/components/shop/ProductOrderPage'

export default function Page() {
  return (
    <ProductOrderPage
      name="Spot UV Postcard"
      tagline="Raised gloss UV highlights on a matte base. Draws the eye to logos, headlines, and CTAs."
      parentHref="/services/marketing-materials/postcards"
      breadcrumb={[
        { label: "Postcards", href: "/services/marketing-materials/postcards" },
        { label: "Spot UV Postcard", href: "" },
      ]}
      badges={["Premium"]}
      color="#F5E8E8"
      optionGroups={[
        { label: "Size", options: [
          { id: "custom", label: "Custom sizes", description: "Tell us your dimensions." },
        ] },
        { label: "Sides", options: [
          { id: "double", label: "Double-Sided", description: "Print on both sides." },
          { id: "single", label: "Single-Sided", description: "Front only." },
        ] },
      ]}
      specs={[
        { label: "Stock", value: "18 pt card stock" },
        { label: "Base", value: "Matte laminate" },
        { label: "Finish", value: "Raised spot UV overlay" },
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
        "Matte laminate base",
        "Raised spot UV overlay",
        "Quality check before ship",
      ]}
      relatedProducts={[
        { href: "/services/marketing-materials/postcards/soft-touch", name: "Soft Touch Postcard", description: "Velvety soft-touch laminate.", dark: true },
        { href: "/services/marketing-materials/postcards", name: "All Postcards", description: "See the full lineup." },
      ]}
    />
  )
}
