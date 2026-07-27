import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import { ORDER_STATUS_LABELS, MAX_ACTIVE_PRODUCTS } from "@/types";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const [totalOrders, pendingOrders, activeProducts, unreadMessages, recentOrders] =
    await Promise.all([
      prisma.order.count(),
      prisma.order.count({ where: { status: "NEW" } }),
      prisma.product.count({ where: { active: true } }),
      prisma.contactMessage.count({ where: { read: false } }),
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { items: true },
      }),
    ]);

  return (
    <div>
      <h1 className="font-serif text-3xl font-light">Dashboard</h1>
      <p className="mt-1 text-sm text-charcoal/60">Hoş geldiniz, {session.name}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Toplam Sipariş", value: totalOrders, href: "/admin/siparisler" },
          { label: "Bekleyen Sipariş", value: pendingOrders, href: "/admin/siparisler" },
          { label: "Aktif Ürün", value: `${activeProducts}/${MAX_ACTIVE_PRODUCTS}`, href: "/admin/urunler" },
          { label: "Okunmamış Mesaj", value: unreadMessages, href: "/admin/mesajlar" },
        ].map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-sm bg-white p-6 shadow-sm transition hover:ring-1 hover:ring-border"
          >
            <p className="text-xs uppercase tracking-widest text-earth">{stat.label}</p>
            <p className="mt-2 font-serif text-3xl">{stat.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl">Son Siparişler</h2>
          <Link href="/admin/siparisler" className="text-sm text-earth hover:underline">
            Tümünü Gör
          </Link>
        </div>
        <div className="mt-4 overflow-x-auto rounded-sm bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-earth/10 text-left text-xs uppercase tracking-widest text-earth">
                <th className="p-4">Sipariş No</th>
                <th className="p-4">Müşteri</th>
                <th className="p-4">Toplam</th>
                <th className="p-4">Durum</th>
                <th className="p-4">Tarih</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-earth/5">
                  <td className="p-4">
                    <Link href={`/admin/siparisler/${order.id}`} className="hover:text-earth">
                      {order.orderNumber}
                    </Link>
                  </td>
                  <td className="p-4">{order.customerName}</td>
                  <td className="p-4">{formatPrice(order.total)}</td>
                  <td className="p-4">{ORDER_STATUS_LABELS[order.status]}</td>
                  <td className="p-4">{new Date(order.createdAt).toLocaleDateString("tr-TR")}</td>
                </tr>
              ))}
              {recentOrders.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-charcoal/50">
                    Henüz sipariş yok
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
