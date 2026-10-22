import type { Metadata } from "next";
import { BRAND } from "@/types";

export const metadata: Metadata = {
  title: "Yakup Polat Teklif — Telefon",
  description: `Mobil teklif özeti ve PDF — ${BRAND.name}`,
  robots: { index: false, follow: false },
};

export default function MobilyaTelefonPage() {
  return (
    <iframe
      src="/mobilya/telefon.html"
      title="Yakup Polat mobil teklif"
      className="fixed inset-0 h-[100dvh] w-full border-0 bg-white"
    />
  );
}
