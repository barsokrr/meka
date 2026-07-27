"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getWhatsAppLink } from "@/lib/utils";
import { getPublicPhone, getPublicWhatsApp } from "@/lib/contact-channels";
import { BRAND } from "@/types";

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("no");
  const emailSent = searchParams.get("email") === "1";
  const whatsapp = getPublicWhatsApp();
  const phone = getPublicPhone();
  const email = process.env.NEXT_PUBLIC_EMAIL || BRAND.email;

  return (
    <div className="container-site flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <div className="mx-auto max-w-md">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-olive/10">
          <svg className="h-8 w-8 text-olive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="mt-6 font-serif text-3xl font-light">Sipariş Talebiniz Alındı</h1>
        {orderNumber && (
          <p className="mt-4 text-sm text-muted">
            Sipariş No: <strong className="text-charcoal">{orderNumber}</strong>
          </p>
        )}
        <p className="mt-4 text-charcoal/80">
          Talebiniz kaydedildi. Online ödeme alınmaz; ekibimiz fiyat ve teslimat detaylarını
          onaylamak için sizinle iletişime geçecektir.
        </p>
        {emailSent ? (
          <p className="mt-3 text-sm text-muted">Onay özeti e-posta adresinize gönderildi.</p>
        ) : (
          <p className="mt-3 text-sm text-muted">
            Sipariş numaranızı saklayın; dönüş için bu numarayı kullanabilirsiniz.
          </p>
        )}

        <div className="mt-6 space-y-1 text-sm text-muted">
          {phone && (
            <p>
              Telefon:{" "}
              <a href={`tel:${phone.replace(/\s/g, "")}`} className="text-charcoal hover:underline">
                {phone}
              </a>
            </p>
          )}
          <p>
            E-posta:{" "}
            <a href={`mailto:${email}`} className="text-charcoal hover:underline">
              {email}
            </a>
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          {whatsapp && (
            <a
              href={getWhatsAppLink(
                whatsapp,
                `Merhaba, ${orderNumber || ""} numaralı sipariş talebim hakkında bilgi almak istiyorum.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              WhatsApp ile İletişim
            </a>
          )}
          {!whatsapp && phone && (
            <a href={`tel:${phone.replace(/\s/g, "")}`} className="btn-primary">
              Telefon ile Ara
            </a>
          )}
          <Link href="/urunler" className="btn-secondary">
            Koleksiyona Dön
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="container-site py-16 text-center">Yükleniyor...</div>}>
      <OrderConfirmationContent />
    </Suspense>
  );
}
