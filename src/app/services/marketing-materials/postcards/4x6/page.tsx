import ProductOrderPage from '@/components/shop/ProductOrderPage'

export default function Page() {
  return (
    <ProductOrderPage
      images={[
        { src: 'https://drive.usercontent.google.com/download?id=16GP_uv16UVWwZyO_WAvAZDfCMoMRsCoE&export=view', alt: 'Postcard print samples' },
        { src: 'https://drive.usercontent.google.com/download?id=1C-8AXzKw1umGCMhR2T03yzFlOZXMBdoX&export=view', alt: 'Custom postcards' },
        { src: 'https://drive.usercontent.google.com/download?id=1_To7GcDYNA3b28ywoo0S8Ev4H5uct3O6&export=view', alt: 'Postcard detail' },
        { src: 'https://drive.usercontent.google.com/download?id=1qt5HNfk394sSSzs9teHR1T5eh5dtwZAc&export=view', alt: 'Postcard stack' },
        { src: 'https://drive.usercontent.google.com/download?id=1wnC7cM8WjOAV5H2gx3DK3u9gr5WLmx4A&export=view', alt: 'Postcard finish' },
      ]}
      name="Postcard 4x6"
      tagline="Classic mailer size. Cost-effective for campaigns, events, and promotional drops."
      parentHref="/services/marketing-materials/postcards"
      breadcrumb={[
        { label: "Postcards", href: "/services/marketing-materials/postcards" },
        { label: "Postcard 4x6", href: "" },
      ]}
      badges={["Fast Turnaround"]}
      color="#E8F5F1"
      optionGroups={[
        { label: "Finish", options: [
          { id: "gloss", label: "Gloss", description: "High-shine UV coating. Colors pop." },
          { id: "matte", label: "Matte", description: "Soft matte. Clean and readable." },
        ] },
        { label: "Sides", options: [
          { id: "double", label: "Double-Sided", description: "Print on both sides." },
          { id: "single", label: "Single-Sided", description: "Front only." },
        ] },
        { label: "Stock", options: [
          { id: "100lb-text", label: "100 lb. text", description: "Standard weight." },
          { id: "100lb-cover", label: "100 lb. cover", description: "Heavier premium feel." },
        ] },
      ]}
      specs={[
        { label: "Size", value: "4 x 6 in." },
        { label: "Stock", value: "100 lb. gloss or matte" },
        { label: "Color mode", value: "Full-color CMYK" },
        { label: "Turnaround", value: "2-3 business days" },
        { label: "Compliance", value: "USPS compliant" },
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
        "Quality check before ship",
        "Bulk quantity discounts available",
      ]}
      relatedProducts={[
        { href: "/services/marketing-materials/flyers/half-sheet", name: "Flyers", description: "High-volume handouts." },
        { href: "/services/marketing-materials/brochures/tri-fold-letter", name: "Brochures", description: "Tri-fold and bi-fold options.", dark: true },
      ]}
    />
  )
}
