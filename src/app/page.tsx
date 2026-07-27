import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db";
import { serializeProducts } from "@/lib/products";
import { ProductCard } from "@/components/products/ProductCard";
import { DesignApproachPreview } from "@/components/design-approach/DesignApproachPreview";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { InteriorArchitectureSection } from "@/components/home/InteriorArchitectureSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import {
  HERO,
  BRAND_QUOTE,
  EXPERTISE,
  ROOM_INSPIRATION,
  STATS,
} from "@/lib/home-content";
import { BRAND } from "@/types";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const products = await prisma.product.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
  });

  const allProducts = serializeProducts(products);
  const featured = allProducts.filter((p) => p.featured).slice(0, 8);

  return (
    <>
      <section className="relative flex min-h-[92vh] items-end md:items-center">
        <div className="absolute inset-0">
          <Image
            src={HERO.image}
            alt={`${BRAND.name} iç mimarlık`}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/35 to-charcoal/20" />
        </div>
        <div className="container-site relative z-10 pb-16 pt-28 text-white md:pb-24 md:pt-32">
          <h1 className="animate-hero-reveal max-w-3xl font-serif text-4xl font-light leading-[1.1] md:text-6xl lg:text-7xl">
            {HERO.headline}
          </h1>
          <p className="animate-hero-reveal mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/85 md:mx-0 md:text-lg [animation-delay:160ms]">
            {HERO.subtitle}
          </p>
          <div className="animate-hero-reveal mt-10 flex flex-col gap-3 sm:flex-row [animation-delay:240ms]">
            <Link
              href="/iletisim"
              className="btn-primary min-w-[200px] bg-white text-charcoal hover:bg-white/90"
            >
              Danışmanlık Talebi
            </Link>
            <Link
              href="/tasarim-yaklasimi"
              className="btn-secondary min-w-[200px] border-white text-white hover:bg-white hover:text-charcoal"
            >
              Tasarım Yaklaşımı
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-border py-16 md:py-24">
        <div className="container-site mx-auto max-w-3xl text-center">
          <p className="section-label">{BRAND_QUOTE.label}</p>
          <blockquote className="mt-6 font-serif text-2xl font-light leading-relaxed text-charcoal md:text-3xl">
            &ldquo;{BRAND_QUOTE.text}&rdquo;
          </blockquote>
          <Link href="/hakkimizda" className="btn-link mt-10">
            {BRAND.discoverLabel} →
          </Link>
        </div>
      </section>

      <InteriorArchitectureSection compact />

      <DesignApproachPreview />

      <section className="border-y border-border bg-surface/60 py-16 md:py-24">
        <div className="container-site">
          <div className="mb-12 text-center">
            <p className="section-label">Süreç</p>
            <h2 className="section-title mt-3">Keşiften teslimata</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              Şeffaf adımlar, net kapsam ve beklenen süreler.
            </p>
          </div>
          <ProcessTimeline />
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/hizmetler" className="btn-link">
              Hizmetler →
            </Link>
            <Link href="/proje-bedeli" className="btn-link">
              Proje bedeli hesapla →
            </Link>
          </div>
        </div>
      </section>

      <section className="container-site py-16 md:py-24">
        <div className="mb-12 text-center">
          <p className="section-label">Uzmanlık</p>
          <h2 className="section-title mt-3">Nasıl yardımcı oluruz?</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {EXPERTISE.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group border border-border bg-white/40 p-8 transition duration-300 hover:border-charcoal"
            >
              <h3 className="font-serif text-xl">{item.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">{item.desc}</p>
              <span className="btn-link mt-6">Keşfet →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-border py-16 md:py-24">
        <div className="container-site">
          <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="section-label">Koleksiyon</p>
              <h2 className="section-title mt-3">Küratörlü parçalar</h2>
              <p className="mt-3 max-w-lg text-muted">
                Proje deneyiminden süzülmüş seçki — sipariş talebi ile ilerler, online ödeme yoktur.
              </p>
            </div>
            <Link href="/urunler" className="btn-link">
              Koleksiyonu Gör →
            </Link>
          </div>
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {(featured.length > 0 ? featured : allProducts).slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="container-site py-16 md:py-24">
        <div className="mb-12 text-center">
          <p className="section-label">İlham</p>
          <h2 className="section-title mt-3">Mekânına göre keşfet</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ROOM_INSPIRATION.map((room) => (
            <Link
              key={room.title}
              href={`/urunler?kategori=${room.category}`}
              className="group relative aspect-[3/4] overflow-hidden"
            >
              <Image
                src={room.image}
                alt={room.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="font-serif text-xl">{room.title}</h3>
                <p className="mt-2 text-sm text-white/75">{room.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface/60 py-16 md:py-24">
        <div className="container-site">
          <div className="mb-12 text-center">
            <p className="section-label">Referanslar</p>
            <h2 className="section-title mt-3">Müşteri deneyimleri</h2>
          </div>
          <TestimonialsSection />
        </div>
      </section>

      <section className="bg-charcoal py-16 text-white md:py-24">
        <div className="container-site">
          <div className="mb-12 text-center">
            <p className="section-label text-white/50">{BRAND.whyLabel}</p>
            <h2 className="section-title mt-3 text-white">Net süreç, ölçülü tasarım</h2>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-serif text-3xl font-light md:text-4xl">{stat.value}</p>
                <p className="mt-3 text-xs font-medium uppercase tracking-luxury">{stat.label}</p>
                <p className="mt-2 text-sm text-white/50">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site py-16 md:py-24">
        <div className="grid items-center gap-10 border border-border bg-white/50 px-8 py-16 md:grid-cols-2 md:px-16">
          <div>
            <h2 className="section-title">Projenize birlikte başlayalım</h2>
            <p className="mt-4 text-muted">
              Kısa bir brief yeterli. İhtiyacınıza göre keşif görüşmesi veya proje bedeli tahmini
              ile ilerleriz.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
            <Link href="/iletisim" className="btn-primary">
              Danışmanlık Talebi
            </Link>
            <Link href="/proje-bedeli" className="btn-secondary">
              Proje Bedeli
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
