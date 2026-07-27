import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const ids = Array.isArray(body?.ids)
      ? body.ids.filter((id: unknown): id is string => typeof id === "string")
      : [];

    if (ids.length === 0) {
      return NextResponse.json({ products: [] });
    }

    const products = await prisma.product.findMany({
      where: { id: { in: ids }, active: true },
      select: {
        id: true,
        name: true,
        price: true,
        stockStatus: true,
      },
    });

    return NextResponse.json({ products });
  } catch {
    return NextResponse.json({ error: "Fiyatlar alınamadı" }, { status: 500 });
  }
}
