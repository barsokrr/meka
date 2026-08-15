import type { Metadata } from "next";
import { BRAND } from "@/types";

export const metadata: Metadata = {
  title: "Kalıp Taşeron Portal",
  description: `Karşıyaka Ortaokulu kalıp taşeronluğu — mobil özet, teklif ve dashboard — ${BRAND.name}`,
  robots: { index: false, follow: false },
};

export default function KalipPortalPage() {
  return (
    <div className="border-b border-border bg-surface">
      <div className="container-site py-6 md:py-8">
        <p className="section-label">Taşeron</p>
        <h1 className="section-title mt-2">Kalıp İşi — Mobil Portal</h1>
        <p className="mt-3 max-w-2xl text-sm text-muted">
          Metraj, fiyat teklifi ve proje dashboard — telefonda PDF/Excel olmadan.
        </p>
      </div>
      <iframe
        src="/kalip/index.html"
        title="Kalıp taşeron mobil portal"
        className="block h-[calc(100dvh-10rem)] min-h-[640px] w-full border-0 bg-white"
      />
    </div>
  );
}
