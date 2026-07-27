import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import {
  DESIGN_APPROACH,
  DESIGN_PILLARS,
  DESIGN_PRINCIPLES,
} from "@/lib/design-approach-content";
import { BRAND } from "@/types";

export const metadata: Metadata = {
  title: "Tasarım Yaklaşımı",
  description: `${BRAND.name} tasarım dili — malzeme, renk, ışık ve ölçülü iç mimarlık prensipleri.`,
};

export default function DesignApproachPage() {
  return (
    <div>
      <div className="border-b border-border bg-surface">
        <div className="container-site py-12 md:py-16">
          <p className="section-label">{DESIGN_APPROACH.label}</p>
          <h1 className="section-title mt-3">{DESIGN_APPROACH.title}</h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">{DESIGN_APPROACH.intro}</p>
        </div>
      </div>

      <section className="container-site py-16 md:py-24">
        <div className="mb-12 text-center">
          <p className="section-label">Prensipler</p>
          <h2 className="section-title mt-3">Neye inanıyoruz?</h2>
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          {DESIGN_PRINCIPLES.map((principle) => (
            <div key={principle.title} className="border border-border p-8 md:p-10">
              <h3 className="font-serif text-xl font-light">{principle.title}</h3>
              <p className="mt-4 leading-relaxed text-muted">{principle.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-site py-16 md:py-24">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="section-label">Odak Alanları</p>
            <h2 className="section-title mt-3">Hangi mekân tiplerinde çalışıyoruz?</h2>
          </div>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {DESIGN_PILLARS.map((pillar) => (
            <div key={pillar.title} className="group">
              <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                <Image
                  src={pillar.image}
                  alt={pillar.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="font-serif text-2xl font-light">{pillar.title}</h3>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface/60 py-16 md:py-24">
        <div className="container-site">
          <div className="mb-12 text-center">
            <p className="section-label">Süreç</p>
            <h2 className="section-title mt-3">Keşiften teslimata</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              Tasarım yaklaşımımız, şeffaf ve adım adım ilerleyen bir iş birliği modeliyle hayata geçer.
            </p>
          </div>
          <ProcessTimeline />
        </div>
      </section>

      <section className="border-t border-border bg-charcoal py-16 text-white md:py-20">
        <div className="container-site text-center">
          <h2 className="section-title text-white">Projenize birlikte başlayalım</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            Mekânınız, bütçeniz ve beklentileriniz hakkında kısa bir görüşme ile başlayabiliriz.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/iletisim" className="btn-primary bg-white text-charcoal hover:bg-white/90">
              Danışmanlık Talebi
            </Link>
            <Link
              href="/hizmetler"
              className="btn-secondary border-white text-white hover:bg-white hover:text-charcoal"
            >
              Hizmetleri Keşfet
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
