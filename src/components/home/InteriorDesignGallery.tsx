import Link from "next/link";
import Image from "next/image";
import {
  INTERIOR_DESIGN_PROJECTS,
  INTERIOR_DESIGN_SECTION,
} from "@/lib/interior-design-content";

export function InteriorDesignGallery() {
  return (
    <section className="container-site py-16 md:py-24">
      <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="section-label">{INTERIOR_DESIGN_SECTION.label}</p>
          <h2 className="section-title mt-3">{INTERIOR_DESIGN_SECTION.title}</h2>
          <p className="mt-3 max-w-lg text-muted">{INTERIOR_DESIGN_SECTION.desc}</p>
        </div>
        <Link href="/iletisim" className="btn-link">
          Proje talebi →
        </Link>
      </div>

      <div className="space-y-16">
        {INTERIOR_DESIGN_PROJECTS.map((project) => (
          <div key={project.slug}>
            <div className="mb-8 border-b border-border pb-6">
              <h3 className="font-serif text-2xl font-light">{project.title}</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{project.desc}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {project.images.map((src, index) => (
                <div
                  key={src}
                  className={`relative overflow-hidden bg-surface ${
                    index === 0 ? "sm:col-span-2 sm:row-span-2 aspect-[4/5]" : "aspect-[3/4]"
                  }`}
                >
                  <Image
                    src={src}
                    alt={`${project.title} — görünüm ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes={
                      index === 0
                        ? "(max-width: 768px) 100vw, 50vw"
                        : "(max-width: 768px) 50vw, 25vw"
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
