import type { Metadata } from "next";
import Link from "next/link";
import { InteriorDesignGalleryView } from "@/components/interior-design/InteriorDesignGalleryView";
import {
  INTERIOR_DESIGN_PAGE,
  INTERIOR_DESIGN_PROJECTS,
  getInteriorGalleryStats,
} from "@/lib/interior-design-content";
import { BRAND } from "@/types";

const stats = getInteriorGalleryStats();

export const metadata: Metadata = {
  title: "Proje Galerisi",
  description: `${BRAND.name} konut iç mimarlık projeleri — ${stats.imageCount} görsel, ${stats.projectCount} proje.`,
};

export default function ProjectsGalleryPage() {
  return (
    <div>
      <div className="border-b border-border bg-surface">
        <div className="container-site py-12 md:py-16">
          <p className="section-label">Portfolyo</p>
          <h1 className="section-title mt-3">{INTERIOR_DESIGN_PAGE.title}</h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">
            {INTERIOR_DESIGN_PAGE.intro}
          </p>
          <p className="mt-3 text-sm text-muted">
            {stats.imageCount} görsel · {stats.projectCount} konut projesi
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {INTERIOR_DESIGN_PROJECTS.map((project) => (
              <Link
                key={project.slug}
                href={`/projeler/${project.slug}`}
                className="border border-border px-4 py-2 text-xs uppercase tracking-luxury transition hover:border-charcoal"
              >
                {project.title}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="container-site py-12 md:py-16">
        <InteriorDesignGalleryView variant="page" />
      </div>

      <section className="border-t border-border bg-charcoal py-14 text-white">
        <div className="container-site flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="font-serif text-2xl font-light">Benzer bir proje mi planlıyorsunuz?</h2>
            <p className="mt-2 max-w-md text-sm text-white/70">
              Mekân brief&apos;inizi paylaşın; keşif görüşmesi ve proje kapsamı için dönüş yapalım.
            </p>
          </div>
          <Link href="/iletisim" className="btn-primary bg-white text-charcoal hover:bg-white/90">
            Danışmanlık Talebi
          </Link>
        </div>
      </section>
    </div>
  );
}
