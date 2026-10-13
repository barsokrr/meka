import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { INTERIOR_DESIGN_PROJECTS } from "@/lib/interior-design-content";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const products = await prisma.product.findMany({
    where: { active: true },
    select: { slug: true, updatedAt: true },
  });

  const staticPages = [
    "",
    "/urunler",
    "/projeler",
    "/tasarim-yaklasimi",
    "/hizmetler",
    "/hakkimizda",
    "/sss",
    "/iletisim",
    "/proje-bedeli",
    "/kvkk",
    "/gizlilik",
    "/mesafeli-satis",
  ];

  return [
    ...staticPages.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...products.map((p) => ({
      url: `${baseUrl}/urunler/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...INTERIOR_DESIGN_PROJECTS.map((p) => ({
      url: `${baseUrl}/projeler/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
  ];
}
