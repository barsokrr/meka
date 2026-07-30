"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import { ORDER_STATUS_LABELS } from "@/types";
import type { OrderStatus } from "@prisma/client";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface OrderDetailProps {
  order: {
    id: string;
    orderNumber: string;
    customerName: string;
    phone: string;
    email: string;
    city: string;
    district: string;
    address: string;
    note: string | null;
    subtotal: number;
    shippingFee: number;
    total: number;
    status: OrderStatus;
    createdAt: string;
    items: OrderItem[];
  };
}

export function OrderDetailClient({ order }: OrderDetailProps) {
  const router = useRouter();
  const [status, setStatus] = useState(order.status);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const updateStatus = async () => {
    setSaving(true);
    await fetch("/api/admin/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: order.id, status }),
    });
    setSaving(false);
    router.refresh();
  };

  const removeOrder = async () => {
    if (!confirm(`${order.orderNumber} numaralı siparişi silmek istediğinize emin misiniz?`)) return;
    setDeleting(true);
    const res = await fetch("/api/admin/orders", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: order.id }),
    });
    setDeleting(false);
    if (res.ok) router.push("/admin/siparisler");
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-6">
        <div className="rounded-sm bg-white p-6 shadow-sm">
          <h2 className="font-serif text-xl">Müşteri Bilgileri</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div><dt className="text-earth">Ad Soyad</dt><dd>{order.customerName}</dd></div>
            <div><dt className="text-earth">Telefon</dt><dd>{order.phone}</dd></div>
            <div><dt className="text-earth">E-posta</dt><dd>{order.email}</dd></div>
            <div><dt className="text-earth">Adres</dt><dd>{order.district}, {order.city}<br />{order.address}</dd></div>
            {order.note && <div><dt className="text-earth">Not</dt><dd>{order.note}</dd></div>}
          </dl>
        </div>

        <div className="rounded-sm bg-white p-6 shadow-sm">
          <h2 className="font-serif text-xl">Durum Güncelle</h2>
          <div className="mt-4 flex gap-3">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as OrderStatus)}
              className="input-field"
            >
              {Object.entries(ORDER_STATUS_LABELS).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
            <button onClick={updateStatus} disabled={saving} className="btn-primary">
              {saving ? "..." : "Kaydet"}
            </button>
          </div>
          <button
            onClick={removeOrder}
            disabled={deleting}
            className="mt-4 text-xs uppercase tracking-widest text-terracotta underline disabled:opacity-50"
          >
            {deleting ? "Siliniyor..." : "Siparişi Sil"}
          </button>
        </div>
      </div>

      <div className="rounded-sm bg-white p-6 shadow-sm">
        <h2 className="font-serif text-xl">Sipariş Özeti</h2>
        <p className="mt-1 text-sm text-charcoal/60">{order.orderNumber}</p>
        <ul className="mt-4 space-y-2 text-sm">
          {order.items.map((item) => (
            <li key={item.id} className="flex justify-between">
              <span>{item.name} x{item.quantity}</span>
              <span>{formatPrice(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 space-y-1 border-t border-earth/10 pt-4 text-sm">
          <div className="flex justify-between"><span>Ara Toplam</span><span>{formatPrice(order.subtotal)}</span></div>
          <div className="flex justify-between"><span>Kargo</span><span>{order.shippingFee === 0 ? "Ücretsiz" : formatPrice(order.shippingFee)}</span></div>
          <div className="flex justify-between font-medium"><span>Toplam</span><span>{formatPrice(order.total)}</span></div>
        </div>
        <p className="mt-4 text-xs text-charcoal/50">
          {new Date(order.createdAt).toLocaleString("tr-TR")}
        </p>
      </div>
    </div>
  );
}
