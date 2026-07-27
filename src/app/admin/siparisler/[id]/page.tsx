import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { OrderDetailClient } from "@/components/admin/OrderDetailClient";

type Props = { params: Promise<{ id: string }> };

export default async function AdminOrderDetailPage({ params }: Props) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true },
  });

  if (!order) notFound();

  return (
    <div>
      <Link href="/admin/siparisler" className="text-sm text-earth hover:underline">
        ← Siparişlere Dön
      </Link>
      <h1 className="mt-4 font-serif text-3xl font-light">Sipariş Detayı</h1>
      <div className="mt-8">
        <OrderDetailClient
          order={{
            ...order,
            createdAt: order.createdAt.toISOString(),
          }}
        />
      </div>
    </div>
  );
}
