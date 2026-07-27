import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import { ORDER_STATUS_LABELS } from "@/types";

export default async function AdminOrdersPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  return (
    <div>
      <h1 className="font-serif text-3xl font-light">Siparişler</h1>
      <p className="mt-1 text-sm text-charcoal/60">{orders.length} sipariş</p>

      <div className="mt-8 overflow-x-auto rounded-sm bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-earth/10 text-left text-xs uppercase tracking-widest text-earth">
              <th className="p-4">Sipariş No</th>
              <th className="p-4">Müşteri</th>
              <th className="p-4">Telefon</th>
              <th className="p-4">Toplam</th>
              <th className="p-4">Durum</th>
              <th className="p-4">Tarih</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-earth/5">
                <td className="p-4">
                  <Link href={`/admin/siparisler/${order.id}`} className="hover:text-earth">
                    {order.orderNumber}
                  </Link>
                </td>
                <td className="p-4">{order.customerName}</td>
                <td className="p-4">{order.phone}</td>
                <td className="p-4">{formatPrice(order.total)}</td>
                <td className="p-4">{ORDER_STATUS_LABELS[order.status]}</td>
                <td className="p-4">{new Date(order.createdAt).toLocaleDateString("tr-TR")}</td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-charcoal/50">
                  Henüz sipariş yok
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
