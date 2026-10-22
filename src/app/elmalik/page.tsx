import type { Metadata } from "next";
import { BRAND } from "@/types";

export const metadata: Metadata = {
  title: "Elmalık Villa Hakediş",
  description: `Elmalık Villa tadilat hakediş — mobil imalat listesi — ${BRAND.name}`,
  robots: { index: false, follow: false },
};

export default function ElmalikHakedisPage() {
  return (
    <div className="border-b border-border bg-surface">
      <div className="container-site py-6 md:py-8">
        <p className="section-label">Tadilat</p>
        <h1 className="section-title mt-2">Elmalık Villa — Hakediş</h1>
        <p className="mt-3 max-w-2xl text-sm text-muted">
          İmalat listesi ve dönemsel hakediş — telefonda Excel olmadan.
        </p>
      </div>
      <iframe
        src="/elmalik/index.html"
        title="Elmalık Villa mobil hakediş"
        className="block h-[calc(100dvh-10rem)] min-h-[640px] w-full border-0 bg-white"
      />
    </div>
  );
}
