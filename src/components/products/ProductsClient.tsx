"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/products/ProductCard";
import type { ProductDTO } from "@/types";
import { CATEGORY_LABELS, type ProductCategory } from "@/types";

export function ProductsClient({ products }: { products: ProductDTO[] }) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("kategori") as ProductCategory | null;

  const [category, setCategory] = useState<ProductCategory | "ALL">(
    initialCategory && initialCategory in CATEGORY_LABELS ? initialCategory : "ALL"
  );

  useEffect(() => {
    if (initialCategory && initialCategory in CATEGORY_LABELS) {
      setCategory(initialCategory);
    }
  }, [initialCategory]);

  const filtered = useMemo(() => {
    let result = [...products];
    if (category !== "ALL") {
      result = result.filter((p) => p.category === category);
    }
    result.sort((a, b) => a.sortOrder - b.sortOrder);
    return result;
  }, [products, category]);

  return (
    <>
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
        <p className="text-sm text-muted">{filtered.length} ürün</p>
        <div className="flex flex-wrap gap-3">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as ProductCategory | "ALL")}
            className="input-field w-auto min-w-[160px] text-xs uppercase tracking-wider"
          >
            <option value="ALL">Tüm Kategoriler</option>
            {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-20 text-center text-muted">Bu kategoride ürün bulunamadı.</p>
      ) : (
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}
