"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { BRAND } from "@/types";
import { getPublicPhone } from "@/lib/contact-channels";

export default function CartPage() {
  const { items, updateQuantity, removeItem } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const phone = getPublicPhone();
  const email = process.env.NEXT_PUBLIC_EMAIL || BRAND.email;

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="container-site py-16 text-center text-charcoal/60">Yükleniyor...</div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-site flex min-h-[50vh] flex-col items-center justify-center py-16 text-center">
        <h1 className="section-title">Sepetiniz Boş</h1>
        <p className="mt-4 text-charcoal/70">Koleksiyonumuzdan parça ekleyerek başlayın.</p>
        <Link href="/urunler" className="btn-primary mt-8">
          Koleksiyonu Keşfet
        </Link>
      </div>
    );
  }

  return (
    <div className="container-site py-12 md:py-16">
      <h1 className="section-title">Sepet</h1>

      <div className="mt-10 grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div key={item.productId} className="flex gap-4 border-b border-earth/10 pb-6">
              <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-sm bg-cream">
                <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <Link href={`/urunler/${item.slug}`} className="font-serif text-lg hover:text-earth">
                    {item.name}
                  </Link>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-earth/20">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="px-3 py-1 hover:bg-cream"
                    >
                      −
                    </button>
                    <span className="px-3 py-1 text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="px-3 py-1 hover:bg-cream"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="text-xs uppercase tracking-widest text-charcoal/50 hover:text-terracotta"
                  >
                    Kaldır
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border border-border bg-surface p-6">
          <h2 className="font-serif text-xl">Talep özeti</h2>
          <div className="mt-4 space-y-2 text-sm">
            <p className="text-xs leading-relaxed text-muted">
              Online ödeme yoktur. Sonraki adımda bilgilerinizi bırakın; stok ve teslimat için
              sizinle iletişime geçilir. Acil sorular için{" "}
              <a href={`mailto:${email}`} className="underline hover:text-charcoal">
                {email}
              </a>
              {phone && (
                <>
                  {" "}
                  veya{" "}
                  <a
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="underline hover:text-charcoal"
                  >
                    {phone}
                  </a>
                </>
              )}
              . Kargo ücreti sipariş adımında hesaplanır.
            </p>
          </div>
          <Link href="/siparis" className="btn-primary mt-6 w-full text-center">
            Sipariş Talebini Tamamla
          </Link>
        </div>
      </div>
    </div>
  );
}
