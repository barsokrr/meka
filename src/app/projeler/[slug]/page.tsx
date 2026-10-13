import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InteriorDesignGalleryView } from "@/components/interior-design/InteriorDesignGalleryView";
import {
  INTERIOR_DESIGN_PROJECTS,
  getProjectBySlug,
} from "@/lib/interior-design-content";
import { BRAND } from "@/types";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return INTERIOR_DESIGN_PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Proje bulunamadı" };
  return {
    title: project.title,
    description: `${BRAND.name} — ${project.desc}`,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div>
      <div className="border-b border-border bg-surface">
        <div className="container-site py-12 md:py-16">
          <Link href="/projeler" className="btn-link text-sm">
            ← Tüm galeri
          </Link>
          <h1 className="section-title mt-6">{project.title}</h1>
          <p className="mt-4 max-w-2xl text-muted">{project.desc}</p>
          <p className="mt-2 text-sm text-muted">{project.images.length} görsel</p>
        </div>
      </div>

      <div className="container-site py-12 md:py-16">
        <InteriorDesignGalleryView variant="page" initialProjectSlug={slug} />
      </div>
    </div>
  );
}
