"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCartStore } from "@/store/cart";
import { orderSchema, type OrderInput } from "@/lib/validations";
import { formatPrice, calculateShipping } from "@/lib/utils";
import { CITY_NAMES, getDistricts } from "@/data/turkey-cities";
import { BRAND } from "@/types";
import { getPublicPhone } from "@/lib/contact-channels";

type ShippingConfig = {
  shippingFee: number;
  freeShippingMinimum: number;
  shippingNote: string;
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, clearCart, syncPrices } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const cartProductIds = items.map((i) => i.productId).join(",");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [shipping, setShipping] = useState<ShippingConfig>({
    shippingFee: 150,
    freeShippingMinimum: 5000,
    shippingNote: "5.000 ₺ ve üzeri siparişlerde kargo ücretsizdir.",
  });
  const phone = getPublicPhone();
  const contactEmail = process.env.NEXT_PUBLIC_EMAIL || BRAND.email;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<OrderInput>({
    resolver: zodResolver(orderSchema),
    defaultValues: { kvkkAccepted: undefined },
  });

  const city = watch("city");

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    fetch("/api/shipping")
      .then((r) => r.json())
      .then((data: ShippingConfig) => {
        if (typeof data.shippingFee === "number") setShipping(data);
      })
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    if (!mounted || !cartProductIds) return;

    const ids = cartProductIds.split(",");
    fetch("/api/products/prices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids }),
    })
      .then((r) => r.json())
      .then(
        (data: {
          products?: {
            id: string;
            price: number;
            name: string;
            stockStatus: "IN_STOCK" | "MADE_TO_ORDER" | "OUT_OF_STOCK";
          }[];
        }) => {
          if (!data.products?.length) return;
          syncPrices(
            data.products.map((p) => ({
              productId: p.id,
              price: p.price,
              name: p.name,
              stockStatus: p.stockStatus,
            }))
          );
        }
      )
      .catch(() => undefined);
  }, [mounted, cartProductIds, syncPrices]);

  useEffect(() => {
    if (city && city !== selectedCity) {
      setSelectedCity(city);
      setValue("district", "");
    }
  }, [city, selectedCity, setValue]);

  if (!mounted) {
    return <div className="container-site py-16 text-center">Yükleniyor...</div>;
  }

  if (items.length === 0) {
    return (
      <div className="container-site flex min-h-[50vh] flex-col items-center justify-center py-16 text-center">
        <h1 className="section-title">Sepetiniz Boş</h1>
        <Link href="/urunler" className="btn-primary mt-8">
          Koleksiyonu Keşfet
        </Link>
      </div>
    );
  }

  const subtotal = getSubtotal();
  const shippingFee = calculateShipping(subtotal, shipping);
  const total = subtotal + shippingFee;

  const onSubmit = async (data: OrderInput) => {
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          items: items.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
          })),
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Sipariş oluşturulamadı");

      clearCart();
      const emailParam = result.emailSent ? "&email=1" : "";
      router.push(`/siparis/onay?no=${encodeURIComponent(result.orderNumber)}${emailParam}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container-site py-12 md:py-16">
      <h1 className="section-title">Sipariş Talebi</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Bu bir sipariş talebidir — online ödeme alınmaz. Bilgilerinizi gönderdikten sonra stok,
        teslimat ve ödeme detayları sizinle netleştirilir. Sorularınız için{" "}
        <a href={`mailto:${contactEmail}`} className="text-charcoal underline hover:no-underline">
          {contactEmail}
        </a>
        {phone && (
          <>
            {" "}
            veya{" "}
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="text-charcoal underline hover:no-underline"
            >
              {phone}
            </a>
          </>
        )}
        .
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 grid gap-12 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <div>
            <label className="mb-1 block text-sm text-muted">Ad Soyad *</label>
            <input {...register("customerName")} className="input-field" />
            {errors.customerName && (
              <p className="mt-1 text-xs text-accent">{errors.customerName.message}</p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm text-muted">Telefon *</label>
              <input {...register("phone")} placeholder="05XX XXX XX XX" className="input-field" />
              {errors.phone && <p className="mt-1 text-xs text-accent">{errors.phone.message}</p>}
            </div>
            <div>
              <label className="mb-1 block text-sm text-muted">E-posta *</label>
              <input {...register("email")} type="email" className="input-field" />
              {errors.email && <p className="mt-1 text-xs text-accent">{errors.email.message}</p>}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm text-muted">İl *</label>
              <select {...register("city")} className="input-field">
                <option value="">Seçin</option>
                {CITY_NAMES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {errors.city && <p className="mt-1 text-xs text-accent">{errors.city.message}</p>}
            </div>
            <div>
              <label className="mb-1 block text-sm text-muted">İlçe *</label>
              <select {...register("district")} className="input-field" disabled={!city}>
                <option value="">Seçin</option>
                {(city ? getDistricts(city) : []).map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              {errors.district && (
                <p className="mt-1 text-xs text-accent">{errors.district.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm text-muted">Teslimat adresi *</label>
            <textarea {...register("address")} rows={3} className="input-field" />
            {errors.address && <p className="mt-1 text-xs text-accent">{errors.address.message}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm text-muted">Sipariş notu</label>
            <textarea
              {...register("note")}
              rows={2}
              className="input-field"
              placeholder="Opsiyonel"
            />
          </div>

          <label className="flex items-start gap-3 text-sm">
            <input type="checkbox" {...register("kvkkAccepted")} className="mt-1" />
            <span>
              <Link href="/kvkk" className="underline" target="_blank">
                KVKK Aydınlatma Metni
              </Link>
              &apos;ni okudum ve onaylıyorum. *
            </span>
          </label>
          {errors.kvkkAccepted && (
            <p className="text-xs text-accent">{errors.kvkkAccepted.message}</p>
          )}

          {error && <p className="text-sm text-accent">{error}</p>}

          <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-50">
            {submitting ? "Gönderiliyor..." : "Sipariş Talebini Gönder"}
          </button>
        </div>

        <div className="h-fit border border-border bg-surface p-6">
          <h2 className="font-serif text-xl">Talep özeti</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {items.map((item) => (
              <li key={item.productId} className="flex justify-between gap-2">
                <span className="text-charcoal/80">
                  {item.name} x{item.quantity}
                </span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between">
              <span>Ara toplam</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Kargo (tahmini)</span>
              <span>{shippingFee === 0 ? "Ücretsiz" : formatPrice(shippingFee)}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Toplam (tahmini)</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-muted">{shipping.shippingNote}</p>
        </div>
      </form>
    </div>
  );
}
