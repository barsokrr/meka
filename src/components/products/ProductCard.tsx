"use client";

import Link from "next/link";
import Image from "next/image";
import type { ProductDTO } from "@/types";
import { CATEGORY_LABELS } from "@/types";

export function ProductCard({ product }: { product: ProductDTO }) {
  const hasSecondImage = product.images.length > 1;

  return (
    <Link href={`/urunler/${product.slug}`} className="group block">
      <div className="relative aspect-square overflow-hidden bg-surface">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className={`object-cover transition duration-700 group-hover:scale-105 ${hasSecondImage ? "group-hover:opacity-0" : ""}`}
          sizes="(max-width: 768px) 100vw, 25vw"
        />
        {hasSecondImage && (
          <Image
            src={product.images[1]}
            alt={`${product.name} alternatif görünüm`}
            fill
            className="object-cover opacity-0 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        )}
        {product.featured && (
          <span className="absolute left-4 top-4 z-10 bg-white px-3 py-1 text-[10px] font-medium uppercase tracking-luxury text-charcoal">
            Öne Çıkan
          </span>
        )}
      </div>
      <div className="mt-4 text-center md:text-left">
        <p className="text-[10px] uppercase tracking-luxury text-muted">
          {CATEGORY_LABELS[product.category]}
        </p>
        <h3 className="mt-2 font-serif text-base font-light uppercase leading-snug tracking-wide text-charcoal md:text-lg">
          {product.name}
        </h3>
      </div>
    </Link>
  );
}
