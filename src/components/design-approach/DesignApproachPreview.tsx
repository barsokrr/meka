import Link from "next/link";
import Image from "next/image";
import { DESIGN_PILLARS, DESIGN_PRINCIPLES } from "@/lib/design-approach-content";

export function DesignApproachPreview() {
  const previewPrinciples = DESIGN_PRINCIPLES.slice(0, 3);

  return (
    <section className="container-site py-16 md:py-24">
      <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="section-label">Tasarım Dili</p>
          <h2 className="section-title mt-3">Tasarım yaklaşımımız</h2>
          <p className="mt-4 max-w-xl text-muted">
            Ölçülü, zamansız ve yaşanabilir mekânlar için malzeme, ışık ve oran odaklı bir dil.
          </p>
        </div>
        <Link href="/tasarim-yaklasimi" className="btn-link">
          Tümünü Oku →
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          {previewPrinciples.map((principle) => (
            <div key={principle.title} className="border border-border p-6">
              <h3 className="font-serif text-lg font-light">{principle.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{principle.desc}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          {DESIGN_PILLARS.map((pillar) => (
            <div key={pillar.title} className="group">
              <div className="relative aspect-[3/4] overflow-hidden bg-surface">
                <Image
                  src={pillar.image}
                  alt={pillar.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 33vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-serif text-lg font-light">{pillar.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
