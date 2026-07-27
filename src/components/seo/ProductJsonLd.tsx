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
    offers: {
      "@type": "Offer",
      url: `${siteUrl}/urunler/${product.slug}`,
      priceCurrency: "EUR",
      price: product.price,
      availability:
        product.stockStatus === "OUT_OF_STOCK"
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
