import type { Metadata } from "next";
import Link from "next/link";
import { BRAND_QUOTE } from "@/lib/home-content";
import { CREDENTIALS } from "@/lib/services-content";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { InteriorArchitectureSection } from "@/components/home/InteriorArchitectureSection";
import { BRAND } from "@/types";
import { getPublicPhone } from "@/lib/contact-channels";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description: `${BRAND.name} — iç mimar kürasyonuyla seçilmiş ev dekorasyonu parçaları.`,
};

export default function AboutPage() {
  const phone = getPublicPhone();
  return (
    <div>
      <div className="border-b border-border bg-surface">
        <div className="container-site py-12 md:py-16">
          <p className="section-label">{BRAND.discoverLabel}</p>
          <h1 className="section-title mt-3">Hakkımızda</h1>
        </div>
      </div>

      <div className="container-site py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <blockquote className="font-serif text-2xl font-light leading-relaxed md:text-3xl">
            &ldquo;{BRAND_QUOTE.text}&rdquo;
          </blockquote>
          <div className="mt-10 space-y-5 text-muted leading-relaxed">
            <p>
              <strong className="font-medium text-charcoal">{BRAND.name}</strong>, yılların iç mimarlık
              deneyiminden doğan kişisel bir küratörlük markasıdır. Mekân tasarlamanın ötesinde,
              o mekânlara hayat veren parçaları seçmek — işimizin en keyifli kısmı.
            </p>
            <p>
              Trendleri takip etmek yetmez; onları kendi dilimize çevirip, gerçek projelerde
              test edip, yalnızca gerçekten işe yarayan parçaları koleksiyonumuza dahil ediyoruz.
            </p>
            <p>
              Her parça sıcak nötr tonlar, dokunsal malzemeler ve zamansız formlar
              etrafında bilinçli seçildi.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/urunler" className="btn-primary">
              Koleksiyonu Keşfet
            </Link>
            <Link href="/tasarim-yaklasimi" className="btn-secondary">
              Tasarım Yaklaşımı
            </Link>
          </div>
        </div>
      </div>

      <InteriorArchitectureSection />

      <section className="border-y border-border bg-surface py-16 md:py-24">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="section-label">Uzmanlık</p>
              <h2 className="section-title mt-3">Ne sunuyoruz?</h2>
              <ul className="mt-8 space-y-4">
                {CREDENTIALS.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-charcoal" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-border bg-white p-8">
              <p className="section-label">İletişim</p>
              <h3 className="mt-3 font-serif text-2xl font-light">Birlikte çalışalım</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Proje danışmanlığı, parça seçimi veya koleksiyondan sipariş için
                doğrudan iletişime geçebilirsiniz.
              </p>
              <div className="mt-6 space-y-2 text-sm">
                {phone && (
                  <p>
                    <span className="text-muted">Telefon:</span>{" "}
                    <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:underline">
                      {phone}
                    </a>
                  </p>
                )}
                <p>
                  <span className="text-muted">E-posta:</span>{" "}
                  <a href={`mailto:${BRAND.email}`} className="hover:underline">
                    {BRAND.email}
                  </a>
                </p>
                <p>
                  <span className="text-muted">Instagram:</span>{" "}
                  <a
                    href={`https://instagram.com/${BRAND.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    @{BRAND.instagram}
                  </a>
                </p>
              </div>
              <Link href="/iletisim" className="btn-primary mt-8 inline-flex">
                İletişime Geç
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-site py-16 md:py-24">
        <div className="mb-12 text-center">
          <p className="section-label">Süreç</p>
          <h2 className="section-title mt-3">Çalışma modelimiz</h2>
        </div>
        <ProcessTimeline />
      </section>
    </div>
  );
}
