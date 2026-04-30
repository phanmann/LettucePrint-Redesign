import ProductOrderPage from '@/components/shop/ProductOrderPage'

export default function Page() {
  return (
    <ProductOrderPage
      images={[
        { src: 'https://drive.usercontent.google.com/download?id=16GP_uv16UVWwZyO_WAvAZDfCMoMRsCoE&export=view', alt: 'Postcard print samples' },
        { src: 'https://drive.usercontent.google.com/download?id=1C-8AXzKw1umGCMhR2T03yzFlOZXMBdoX&export=view', alt: 'Custom postcards' },
        { src: 'https://drive.usercontent.google.com/download?id=1qt5HNfk394sSSzs9teHR1T5eh5dtwZAc&export=view', alt: 'Postcard stack' },
      ]}
      name="Soft Touch Postcard"
      tagline="Velvety soft-touch laminate on heavy stock. A luxury feel that drives open rates."
      parentHref="/services/marketing-materials/postcards"
      breadcrumb={[
        { label: "Postcards", href: "/services/marketing-materials/postcards" },
        { label: "Soft Touch Postcard", href: "" },
      ]}
      badges={["Premium"]}
      color="#E8F5EF"
      optionGroups={[
        { label: "Size", options: [
          { id: "custom", label: "Custom sizes", description: "Tell us your dimensions." },
        ] },
        { label: "Sides", options: [
          { id: "double", label: "Double-Sided", description: "Print on both sides." },
          { id: "single", label: "Single-Sided", description: "Front only." },
        ] },
        { label: "Extras", options: [
          { id: "none", label: "None", description: "Standard soft-touch only." },
          { id: "spot-uv", label: "Add Spot UV", description: "Raised gloss on select areas.", badge: "Add-on" },
        ] },
      ]}
      specs={[
        { label: "Stock", value: "18 pt card stock" },
        { label: "Finish", value: "Soft-touch matte laminate" },
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
        "Soft-touch matte laminate",
        "Full-color CMYK printing",
        "Quality check before ship",
      ]}
      relatedProducts={[
        { href: "/services/marketing-materials/postcards/spot-uv", name: "Spot UV Postcard", description: "Raised gloss UV highlights on a matte base.", dark: true },
        { href: "/services/marketing-materials/postcards", name: "All Postcards", description: "See the full lineup." },
      ]}
    />
  )
}
