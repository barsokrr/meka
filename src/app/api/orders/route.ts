import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { orderSchema } from "@/lib/validations";
import { getSiteSettings } from "@/lib/settings";
import { calculateShipping } from "@/lib/utils";
import { sendOrderEmails } from "@/lib/email";

async function generateOrderNumber() {
  const year = new Date().getFullYear();
  const count = await prisma.order.count();
  return `BO-${year}-${String(count + 1).padStart(4, "0")}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = orderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || "Geçersiz veri" },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const productIds = data.items.map((i) => i.productId);
    const slugs = data.items
      .map((i) => i.slug)
      .filter((slug): slug is string => Boolean(slug));

    // Match on slug as well: product ids change whenever the catalog is rebuilt
    const products = await prisma.product.findMany({
      where: {
        active: true,
        OR: [{ id: { in: productIds } }, { slug: { in: slugs } }],
      },
    });
    const productMap = new Map(products.map((p) => [p.id, p]));
    const productBySlug = new Map(products.map((p) => [p.slug, p]));

    const lineItems: {
      productId: string;
      name: string;
      price: number;
      quantity: number;
    }[] = [];

    for (const item of data.items) {
      const product =
        productMap.get(item.productId) ??
        (item.slug ? productBySlug.get(item.slug) : undefined);
      if (!product) {
        return NextResponse.json(
          { error: `"${item.name}" artık satışta değil. Sepetinizi güncelleyin.` },
          { status: 400 }
        );
      }
      if (product.stockStatus === "OUT_OF_STOCK") {
        return NextResponse.json(
          { error: `"${product.name}" stokta yok.` },
          { status: 400 }
        );
      }
      const existing = lineItems.find((l) => l.productId === product.id);
      if (existing) {
        existing.quantity += item.quantity;
        continue;
      }

      lineItems.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
      });
    }

    const settings = await getSiteSettings();
    const subtotal = lineItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const shippingFee = calculateShipping(subtotal, settings);
    const total = subtotal + shippingFee;
    const orderNumber = await generateOrderNumber();

    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName: data.customerName,
        phone: data.phone,
        email: data.email,
        city: data.city,
        district: data.district,
        address: data.address,
        note: data.note,
        subtotal,
        shippingFee,
        total,
        items: {
          create: lineItems.map((item) => ({
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      },
      include: { items: true },
    });

    const emailResult = await sendOrderEmails(
      {
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        phone: order.phone,
        email: order.email,
        city: order.city,
        district: order.district,
        address: order.address,
        note: order.note,
        items: order.items,
        subtotal: order.subtotal,
        shippingFee: order.shippingFee,
        total: order.total,
      },
      settings
    );

    return NextResponse.json({
      orderNumber: order.orderNumber,
      id: order.id,
      emailSent: emailResult.sent,
    });
  } catch (error) {
    console.error("Order error:", error);
    return NextResponse.json({ error: "Sipariş oluşturulamadı" }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
