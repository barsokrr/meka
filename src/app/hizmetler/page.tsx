import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES, CREDENTIALS } from "@/lib/services-content";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { InteriorArchitectureSection } from "@/components/home/InteriorArchitectureSection";
import { BRAND } from "@/types";

export const metadata: Metadata = {
  title: "Hizmetler",
  description: `${BRAND.name} iç mimarlık hizmetleri — kürasyon, proje bedeli danışmanlığı ve koleksiyon satışı.`,
};

export default function ServicesPage() {
  return (
    <div>
      <div className="border-b border-border bg-surface">
        <div className="container-site py-12 md:py-16">
          <p className="section-label">Ne Sunuyoruz</p>
          <h1 className="section-title mt-3">Hizmetler</h1>
          <p className="mt-4 max-w-2xl text-muted">
            İç mimarlık projelerinden doğan deneyimle; kürasyon, danışmanlık ve seçilmiş parça
            satışını tek çatı altında sunuyoruz.
          </p>
        </div>
      </div>

      <InteriorArchitectureSection />

      <div className="container-site py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-2">
          {SERVICES.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group border border-border p-8 transition hover:border-charcoal md:p-10"
            >
              <h2 className="font-serif text-2xl font-light">{service.title}</h2>
              <p className="mt-4 leading-relaxed text-muted">{service.desc}</p>
              <span className="btn-link mt-6">Detay →</span>
            </Link>
          ))}
        </div>
      </div>

      <section className="border-y border-border bg-surface py-16 md:py-24">
        <div className="container-site">
          <div className="mb-12 text-center">
            <p className="section-label">Süreç</p>
            <h2 className="section-title mt-3">Nasıl çalışıyoruz?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted">
              Keşiften teslimata şeffaf, adım adım ilerleyen bir iş birliği modeli.
            </p>
          </div>
          <ProcessTimeline />
        </div>
      </section>

      <section className="container-site py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="section-label">Uzmanlık</p>
            <h2 className="section-title mt-3">Neden {BRAND.name}?</h2>
            <ul className="mt-8 space-y-4">
              {CREDENTIALS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-muted">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-charcoal" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-border bg-surface p-8 md:p-10">
            <h3 className="font-serif text-2xl font-light">Projenize başlayalım</h3>
            <p className="mt-4 text-muted">
              Mekânınız, bütçeniz ve zaman planınız hakkında kısa bir görüşme ile başlayabiliriz.
              Proje bedeli tahmini için hesaplama aracını da kullanabilirsiniz.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/iletisim" className="btn-primary">
                Danışmanlık Talebi
              </Link>
              <Link href="/proje-bedeli" className="btn-secondary">
                Proje Bedeli Hesapla
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
