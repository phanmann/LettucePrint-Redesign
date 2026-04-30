import ProductOrderPage from '@/components/shop/ProductOrderPage'

export default function Page() {
  return (
    <ProductOrderPage
      images={[
        { src: 'https://drive.usercontent.google.com/download?id=16MXaFyl5PkM53NeawAHF2MZp831_eeTs&export=view', alt: 'Brochure print sample' },
        { src: 'https://drive.usercontent.google.com/download?id=1_pNzHBcCwVT_F3rvdcMUWz76DQh77Wvm&export=view', alt: 'Custom brochure' },
      ]}
      name="Tri-Fold Brochure - Legal"
      tagline="Wider panel for copy-heavy content, photo layouts, or multi-column designs."
      parentHref="/services/marketing-materials/brochures"
      breadcrumb={[
        { label: "Brochures", href: "/services/marketing-materials/brochures" },
        { label: "Tri-Fold Brochure - Legal", href: "" },
      ]}
      badges={["Fast Turnaround"]}
      color="#E8F5F1"
      optionGroups={[
        { label: "Finish", options: [
          { id: "gloss", label: "Gloss", description: "High-shine UV coating. Colors pop." },
          { id: "matte", label: "Matte", description: "Soft matte. Clean and readable." },
        ] },
        { label: "Stock", options: [
          { id: "100lb-text", label: "100 lb. text", description: "Standard weight." },
          { id: "100lb-cover", label: "100 lb. cover", description: "Heavier premium feel." },
        ] },
        { label: "Laminate", options: [
          { id: "none", label: "None", description: "No laminate." },
          { id: "soft-touch", label: "Soft Touch", description: "Velvety matte laminate.", badge: "Add-on" },
        ] },
      ]}
      specs={[
        { label: "Size", value: "8.5 x 14 in. folded to 4.67 x 8.5 in." },
        { label: "Stock", value: "100 lb. gloss or matte text" },
        { label: "Fold", value: "Scored and folded" },
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
        "Scored and folded",
        "Quality check before ship",
      ]}
      relatedProducts={[
        { href: "/services/marketing-materials/brochures", name: "All Brochures", description: "Full brochure lineup." },
        { href: "/services/marketing-materials/booklets", name: "Booklets", description: "Saddle-stitch and perfect-bound.", dark: true },
      ]}
    />
  )
}
