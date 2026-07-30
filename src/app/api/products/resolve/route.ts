import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { parseJsonArray } from "@/lib/utils";

/** Maps cart slugs to current product ids so stored carts survive catalog rebuilds. */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const slugs = Array.isArray(body?.slugs)
      ? body.slugs.filter((slug: unknown): slug is string => typeof slug === "string")
      : [];

    if (slugs.length === 0) {
      return NextResponse.json({ products: [] });
    }

    const products = await prisma.product.findMany({
      where: { slug: { in: slugs }, active: true },
      select: { id: true, slug: true, name: true, stockStatus: true, images: true },
    });

    return NextResponse.json({
      products: products.map((p) => ({
        id: p.id,
        slug: p.slug,
        name: p.name,
        stockStatus: p.stockStatus,
        image: parseJsonArray(p.images)[0] ?? null,
      })),
    });
  } catch {
    return NextResponse.json({ error: "Ürünler doğrulanamadı" }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
