import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { productSchema } from "@/lib/validations";
import { MAX_ACTIVE_PRODUCTS } from "@/types";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const products = await prisma.product.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const parsed = productSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || "Geçersiz veri" },
        { status: 400 }
      );
    }

    const data = parsed.data;

    if (data.active) {
      const activeCount = await prisma.product.count({ where: { active: true } });
      if (activeCount >= MAX_ACTIVE_PRODUCTS) {
        return NextResponse.json(
          { error: `En fazla ${MAX_ACTIVE_PRODUCTS} aktif ürün olabilir` },
          { status: 400 }
        );
      }
    }

    const existing = await prisma.product.findUnique({ where: { slug: data.slug } });
    if (existing) {
      return NextResponse.json({ error: "Bu slug zaten kullanılıyor" }, { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        ...data,
        colors: JSON.stringify(data.colors),
        images: JSON.stringify(data.images),
        comparePrice: data.comparePrice ?? null,
        projectNote: data.projectNote ?? null,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Product create error:", error);
    return NextResponse.json({ error: "Ürün oluşturulamadı" }, { status: 500 });
  }
}
