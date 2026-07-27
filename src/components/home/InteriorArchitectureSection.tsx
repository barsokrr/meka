import Link from "next/link";
import { INTERIOR_ARCHITECTURE } from "@/lib/services-content";

type Props = {
  compact?: boolean;
};

export function InteriorArchitectureSection({ compact = false }: Props) {
  const { title, definition, usageTitle, usageAreas } = INTERIOR_ARCHITECTURE;

  if (compact) {
    return (
      <section className="border-y border-border bg-surface/60 py-16 md:py-24">
        <div className="container-site mx-auto max-w-3xl text-center">
          <h2 className="section-title">{title}</h2>
          <p className="mt-6 leading-relaxed text-muted">{definition}</p>
          <Link href="/hakkimizda" className="btn-link mt-8">
            Daha fazla bilgi →
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="border-y border-border bg-surface py-16 md:py-24">
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="section-title">{title}</h2>
            <p className="mt-6 leading-relaxed text-muted">{definition}</p>
          </div>
          <div>
            <h3 className="font-serif text-xl font-light">{usageTitle}</h3>
            <ul className="mt-6 space-y-3">
              {usageAreas.map((area) => (
                <li key={area} className="flex items-start gap-3 text-sm text-muted">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-charcoal" />
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
