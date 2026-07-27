import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { productSchema } from "@/lib/validations";
import { MAX_ACTIVE_PRODUCTS } from "@/types";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(product);
}

export async function PUT(request: NextRequest, { params }: Params) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = productSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || "Geçersiz veri" },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const current = await prisma.product.findUnique({ where: { id } });
    if (!current) return NextResponse.json({ error: "Not found" }, { status: 404 });

    if (data.active && !current.active) {
      const activeCount = await prisma.product.count({ where: { active: true } });
      if (activeCount >= MAX_ACTIVE_PRODUCTS) {
        return NextResponse.json(
          { error: `En fazla ${MAX_ACTIVE_PRODUCTS} aktif ürün olabilir` },
          { status: 400 }
        );
      }
    }

    const slugConflict = await prisma.product.findFirst({
      where: { slug: data.slug, NOT: { id } },
    });
    if (slugConflict) {
      return NextResponse.json({ error: "Bu slug zaten kullanılıyor" }, { status: 400 });
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...data,
        colors: JSON.stringify(data.colors),
        images: JSON.stringify(data.images),
        comparePrice: data.comparePrice ?? null,
        projectNote: data.projectNote ?? null,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Product update error:", error);
    return NextResponse.json({ error: "Ürün güncellenemedi" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
