import type { Metadata } from "next";
import { BRAND } from "@/types";
import { getPublicWhatsApp } from "@/lib/contact-channels";

const accessKey = process.env.NEXT_PUBLIC_HESAP_KEY || "benimhesap2026";

export const metadata: Metadata = {
  title: "Proje Bedeli Hesaplama",
  description: `TMMOB İçmimarlar Odası formülüyle iç mimarlık proje asgari ücret hesaplama — ${BRAND.name}`,
};

export default function ProjeBedeliPage() {
  const wa = getPublicWhatsApp();
  const qs = new URLSearchParams({ k: accessKey });
  if (wa) qs.set("wa", wa.replace(/\D/g, ""));

  return (
    <div className="border-b border-border bg-surface">
      <div className="container-site py-8 md:py-10">
        <p className="section-label">Araç</p>
        <h1 className="section-title mt-3">Proje Bedeli Hesaplama</h1>
        <p className="mt-4 max-w-2xl text-muted">
          TMMOB İçmimarlar Odası 2026 formülüne göre asgari proje bedeli tahmini. Sonucu aldıktan
          sonra teklif veya keşif görüşmesi talep edebilirsiniz.
        </p>
      </div>
      <iframe
        src={`/proje-bedeli/index.html?${qs.toString()}`}
        title="İç mimarlık proje bedeli hesaplama"
        className="block h-[calc(100vh-12rem)] min-h-[720px] w-full border-0 bg-white md:h-[calc(100vh-14rem)]"
        allow="clipboard-write"
      />
    </div>
  );
}
