import ProductOrderPage from '@/components/shop/ProductOrderPage'

export default function Page() {
  return (
    <ProductOrderPage
      name="Die-Cut Mylar Bag"
      tagline="Custom die-cut shaped mylar bags. A unique silhouette that stands out on any shelf."
      parentHref="/services/packaging/mylar-bags"
      breadcrumb={[
        { label: "Mylar Bags", href: "/services/packaging/mylar-bags" },
        { label: "Die-Cut Mylar Bag", href: "" },
      ]}
      badges={["Custom", "Premium"]}
      color="#E8F0F5"
      optionGroups={[
        { label: "Shape", options: [
          { id: "custom", label: "Custom Shape", description: "Provide your dieline or describe your shape." },
        ] },
        { label: "Seal", options: [
          { id: "zip", label: "Zip Lock", description: "Resealable." },
          { id: "cr", label: "Child Resistant Zip", description: "CR compliant.", badge: "Compliance" },
        ] },
        { label: "Finish", options: [
          { id: "gloss", label: "Gloss", description: "High-shine UV coating. Colors pop." },
          { id: "matte", label: "Matte", description: "Soft matte. Clean and readable." },
        ] },
      ]}
      specs={[
        { label: "Material", value: "Multi-layer mylar" },
        { label: "Cut", value: "Die-cut to custom shape" },
        { label: "Print", value: "Full-color CMYK" },
        { label: "Minimum order", value: "500 units" },
        { label: "Turnaround", value: "14-21 business days" },
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
        "Custom die-cut shape",
        "Full-color CMYK printing",
        "Quality check before ship",
      ]}
      relatedProducts={[
        { href: "/services/packaging/mylar-bags/standard", name: "Standard Mylar Bag", description: "Rectangular mylar, faster and more economical." },
        { href: "/services/packaging/boxes", name: "Boxes and Packaging", description: "Full packaging lineup.", dark: true },
      ]}
    />
  )
}
