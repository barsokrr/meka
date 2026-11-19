import type { Metadata } from "next";
import { BRAND } from "@/types";

export const metadata: Metadata = {
  title: "Yakup Polat — Mobilya & Kapı Portal",
  description: `Elmalık Mah. 40 daire mobilya ve kapı taşeronluğu — teklif ve nakit akış özeti — ${BRAND.name}`,
  robots: { index: false, follow: false },
};

export default function MobilyaPortalPage() {
  return (
    <div className="border-b border-border bg-surface">
      <div className="container-site py-6 md:py-8">
        <p className="section-label">Taşeron</p>
        <h1 className="section-title mt-2">Yakup Polat — Mobilya &amp; Kapı</h1>
        <p className="mt-3 max-w-2xl text-sm text-muted">
          Müteahhit teklifi, Resa girdi maliyeti, barter/nakit senaryoları — mobil özet.
        </p>
      </div>
      <iframe
        src="/mobilya/index.html"
        title="Yakup Polat mobilya mobil portal"
        className="block h-[calc(100dvh-10rem)] min-h-[640px] w-full border-0 bg-white"
      />
    </div>
  );
}
