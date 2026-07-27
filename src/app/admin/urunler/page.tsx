import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import { CATEGORY_LABELS, STOCK_STATUS_LABELS, MAX_ACTIVE_PRODUCTS } from "@/types";

export default async function AdminProductsPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const products = await prisma.product.findMany({ orderBy: { sortOrder: "asc" } });
  const activeCount = products.filter((p) => p.active).length;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-light">Ürünler</h1>
          <p className="mt-1 text-sm text-charcoal/60">{activeCount}/{MAX_ACTIVE_PRODUCTS} aktif ürün</p>
        </div>
        <Link
          href="/admin/urunler/yeni"
          className={`btn-primary ${activeCount >= MAX_ACTIVE_PRODUCTS ? "pointer-events-none opacity-50" : ""}`}
        >
          Yeni Ürün
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-sm bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-earth/10 text-left text-xs uppercase tracking-widest text-earth">
              <th className="p-4">Ürün</th>
              <th className="p-4">Kategori</th>
              <th className="p-4">Fiyat</th>
              <th className="p-4">Stok</th>
              <th className="p-4">Durum</th>
              <th className="p-4">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-earth/5">
                <td className="p-4 font-medium">{product.name}</td>
                <td className="p-4">{CATEGORY_LABELS[product.category]}</td>
                <td className="p-4">{formatPrice(product.price)}</td>
                <td className="p-4">{STOCK_STATUS_LABELS[product.stockStatus]}</td>
                <td className="p-4">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      product.active ? "bg-olive/10 text-olive" : "bg-charcoal/10 text-charcoal/50"
                    }`}
                  >
                    {product.active ? "Aktif" : "Pasif"}
                  </span>
                </td>
                <td className="p-4">
                  <Link href={`/admin/urunler/${product.id}`} className="text-earth hover:underline">
                    Düzenle
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
