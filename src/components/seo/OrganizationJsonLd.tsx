import { BRAND } from "@/types";

export function OrganizationJsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://barisoker.com";
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: BRAND.name,
    description: BRAND.description,
    url: siteUrl,
    email: BRAND.email,
    areaServed: "TR",
    serviceType: [
      "Interior Design",
      "İç Mimarlık",
      "Interior Decoration",
      "Curated Home Products",
    ],
    sameAs: [`https://instagram.com/${BRAND.instagram}`],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
