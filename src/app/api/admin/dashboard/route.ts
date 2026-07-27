import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [totalOrders, pendingOrders, activeProducts, recentOrders] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { status: "NEW" } }),
    prisma.product.count({ where: { active: true } }),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { items: true },
    }),
  ]);

  return NextResponse.json({
    totalOrders,
    pendingOrders,
    activeProducts,
    recentOrders,
  });
}
