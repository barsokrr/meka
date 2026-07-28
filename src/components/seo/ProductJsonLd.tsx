import type { ProductDTO } from "@/types";
import { BRAND } from "@/types";

export function ProductJsonLd({ product }: { product: ProductDTO }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://barisoker.com";
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    image: product.images,
    sku: product.slug,
    brand: {
      "@type": "Brand",
      name: BRAND.name,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
