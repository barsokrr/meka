"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  INTERIOR_DESIGN_PROJECTS,
  INTERIOR_DESIGN_SECTION,
  flattenInteriorGallery,
  type InteriorGalleryImage,
} from "@/lib/interior-design-content";

type Props = {
  variant?: "home" | "page";
  initialProjectSlug?: string;
};

export function InteriorDesignGalleryView({
  variant = "page",
  initialProjectSlug,
}: Props) {
  const allImages = useMemo(() => flattenInteriorGallery(), []);
  const [activeProject, setActiveProject] = useState<string>(
    initialProjectSlug ?? "all"
  );
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (initialProjectSlug) setActiveProject(initialProjectSlug);
  }, [initialProjectSlug]);

  const filteredImages = useMemo(() => {
    if (activeProject === "all") return allImages;
    return allImages.filter((img) => img.projectSlug === activeProject);
  }, [allImages, activeProject]);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goLightbox = useCallback(
    (delta: number) => {
      setLightboxIndex((current) => {
        if (current === null || filteredImages.length === 0) return current;
        return (current + delta + filteredImages.length) % filteredImages.length;
      });
    },
    [filteredImages.length]
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goLightbox(1);
      if (e.key === "ArrowLeft") goLightbox(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxIndex, goLightbox]);

  const activeProjectMeta = INTERIOR_DESIGN_PROJECTS.find((p) => p.slug === activeProject);

  return (
    <>
      {variant === "home" && (
        <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="section-label">{INTERIOR_DESIGN_SECTION.label}</p>
            <h2 className="section-title mt-3">{INTERIOR_DESIGN_SECTION.title}</h2>
            <p className="mt-3 max-w-lg text-muted">{INTERIOR_DESIGN_SECTION.desc}</p>
            <p className="mt-2 text-sm text-muted">
              {allImages.length} görsel · {INTERIOR_DESIGN_PROJECTS.length} konut projesi
            </p>
          </div>
          <Link href="/projeler" className="btn-link">
            Tam ekran galeri →
          </Link>
        </div>
      )}

      {variant === "page" && !initialProjectSlug && (
        <div className="mb-10 flex flex-wrap gap-2">
          <FilterChip
            active={activeProject === "all"}
            onClick={() => setActiveProject("all")}
            label={`Tümü (${allImages.length})`}
          />
          {INTERIOR_DESIGN_PROJECTS.map((project) => (
            <FilterChip
              key={project.slug}
              active={activeProject === project.slug}
              onClick={() => setActiveProject(project.slug)}
              label={`${project.title} (${project.images.length})`}
            />
          ))}
        </div>
      )}

      {initialProjectSlug && activeProjectMeta && (
        <p className="mb-8 max-w-2xl text-sm leading-relaxed text-muted">
          {activeProjectMeta.desc}
        </p>
      )}

      <ImageGrid images={filteredImages} onImageClick={openLightbox} />

      {lightboxIndex !== null && filteredImages[lightboxIndex] && (
        <Lightbox
          image={filteredImages[lightboxIndex]}
          counter={`${lightboxIndex + 1} / ${filteredImages.length}`}
          onClose={closeLightbox}
          onPrev={() => goLightbox(-1)}
          onNext={() => goLightbox(1)}
        />
      )}
    </>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border px-4 py-2 text-xs uppercase tracking-luxury transition ${
        active
          ? "border-charcoal bg-charcoal text-white"
          : "border-border bg-white/60 text-muted hover:border-charcoal hover:text-charcoal"
      }`}
    >
      {label}
    </button>
  );
}

function ImageGrid({
  images,
  onImageClick,
}: {
  images: InteriorGalleryImage[];
  onImageClick: (index: number) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {images.map((img, index) => (
        <button
          key={`${img.projectSlug}-${img.indexInProject}`}
          type="button"
          onClick={() => onImageClick(index)}
          className="group relative aspect-[3/4] overflow-hidden bg-surface text-left"
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
          <div className="absolute inset-0 bg-charcoal/0 transition group-hover:bg-charcoal/20" />
          <div className="absolute bottom-0 left-0 right-0 translate-y-full bg-gradient-to-t from-charcoal/90 to-transparent p-3 transition duration-300 group-hover:translate-y-0">
            <p className="text-[10px] uppercase tracking-luxury text-white/80">
              {img.projectTitle}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}

function Lightbox({
  image,
  counter,
  onClose,
  onPrev,
  onNext,
}: {
  image: InteriorGalleryImage;
  counter: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-charcoal/95"
      role="dialog"
      aria-modal="true"
      aria-label="Görsel galerisi"
    >
      <div className="flex items-center justify-between px-4 py-3 text-white md:px-8">
        <div>
          <p className="text-xs uppercase tracking-luxury text-white/60">{image.projectTitle}</p>
          <p className="text-sm text-white/90">{counter}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded border border-white/30 px-4 py-2 text-xs uppercase tracking-luxury hover:bg-white/10"
        >
          Kapat
        </button>
      </div>
      <div className="relative flex flex-1 items-center justify-center px-4 pb-6 md:px-16">
        <button
          type="button"
          onClick={onPrev}
          className="absolute left-2 z-10 hidden h-12 w-12 items-center justify-center rounded-full border border-white/30 text-2xl text-white hover:bg-white/10 md:flex"
          aria-label="Önceki"
        >
          ‹
        </button>
        <div className="relative h-full max-h-[75vh] w-full max-w-5xl">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </div>
        <button
          type="button"
          onClick={onNext}
          className="absolute right-2 z-10 hidden h-12 w-12 items-center justify-center rounded-full border border-white/30 text-2xl text-white hover:bg-white/10 md:flex"
          aria-label="Sonraki"
        >
          ›
        </button>
      </div>
      <div className="flex justify-center gap-4 pb-6 md:hidden">
        <button type="button" onClick={onPrev} className="btn-secondary border-white text-white">
          Önceki
        </button>
        <button type="button" onClick={onNext} className="btn-secondary border-white text-white">
          Sonraki
        </button>
      </div>
    </div>
  );
}
