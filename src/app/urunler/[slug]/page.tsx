import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { serializeProduct, serializeProducts } from "@/lib/products";
import { ProductGallery, AddToCartButton } from "@/components/products/ProductActions";
import { ProductCard } from "@/components/products/ProductCard";
import { CATEGORY_LABELS, STOCK_STATUS_LABELS } from "@/types";
import { ProductJsonLd } from "@/components/seo/ProductJsonLd";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug, active: true } });
  if (!product) return { title: "Ürün Bulunamadı" };
  return {
    title: product.name,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug, active: true } });
  if (!product) notFound();

  const dto = serializeProduct(product);

  const related = await prisma.product.findMany({
    where: {
      active: true,
      category: product.category,
      NOT: { id: product.id },
    },
    take: 3,
  });

  return (
    <div>
      <ProductJsonLd product={dto} />
      <BreadcrumbJsonLd
        items={[
          { name: "Ana Sayfa", href: "/" },
          { name: "Koleksiyon", href: "/urunler" },
          { name: dto.name, href: `/urunler/${dto.slug}` },
        ]}
      />
      <div className="container-site py-8 md:py-12">
        <Link href="/urunler" className="text-xs uppercase tracking-luxury text-muted hover:text-charcoal">
          ← Koleksiyon
        </Link>
      </div>
      <div className="container-site pb-16 md:pb-24">
      <div className="grid gap-12 lg:grid-cols-2">
        <ProductGallery images={dto.images} name={dto.name} />

        <div>
          <p className="text-[10px] uppercase tracking-luxury text-muted">
            {CATEGORY_LABELS[dto.category]}
          </p>
          <h1 className="mt-3 font-serif text-3xl font-light uppercase tracking-wide md:text-4xl">{dto.name}</h1>
          <p className="mt-6 text-charcoal/80">{dto.shortDescription}</p>

          <div className="mt-6 space-y-2 text-sm">
            <p>
              <span className="text-earth">Stok:</span>{" "}
              {STOCK_STATUS_LABELS[dto.stockStatus]}
            </p>
            <p>
              <span className="text-earth">Teslimat:</span> {dto.deliveryTime}
            </p>
          </div>

          <div className="mt-8">
            <AddToCartButton product={dto} />
          </div>

          <div className="mt-10 space-y-4 border-t border-border pt-8 text-sm">
            <div>
              <h3 className="text-[10px] uppercase tracking-luxury text-muted">Malzeme</h3>
              <p className="mt-1 text-charcoal/80">{dto.material}</p>
            </div>
            <div>
              <h3 className="text-[10px] uppercase tracking-luxury text-muted">Ölçüler</h3>
              <p className="mt-1 text-charcoal/80">{dto.dimensions}</p>
            </div>
            {dto.colors.length > 0 && (
              <div>
                <h3 className="text-[10px] uppercase tracking-luxury text-muted">Renk Seçenekleri</h3>
                <p className="mt-1 text-charcoal/80">{dto.colors.join(", ")}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-16 border-t border-border pt-12">
        <h2 className="font-serif text-2xl font-light">Detaylı Açıklama</h2>
        <div className="prose prose-sm mt-4 max-w-none whitespace-pre-line text-charcoal/80">
          {dto.description}
        </div>
      </div>

      {dto.projectNote && (
        <div className="mt-12 bg-surface p-6">
          <h3 className="text-[10px] uppercase tracking-luxury text-muted">Projede Kullanım</h3>
          <p className="mt-2 text-charcoal/80">{dto.projectNote}</p>
        </div>
      )}

      {related.length > 0 && (
        <div className="mt-16 border-t border-border pt-12">
          <h2 className="section-title">İlgili Ürünler</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {serializeProducts(related).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      </div>
    </div>
  );
}
