import type { Metadata } from "next";
import { Suspense } from "react";
import { prisma } from "@/lib/db";
import { serializeProducts } from "@/lib/products";
import { ProductsClient } from "@/components/products/ProductsClient";

import { BRAND } from "@/types";

export const metadata: Metadata = {
  title: "Koleksiyon",
  description: `${BRAND.name} küratörlü ev dekorasyonu koleksiyonu — seçilmiş mobilya, aydınlatma, tekstil ve objeler.`,
};

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div>
      <div className="border-b border-border bg-surface">
        <div className="container-site py-12 md:py-16">
          <p className="section-label">Shop</p>
          <h1 className="section-title mt-3">Koleksiyon</h1>
          <p className="mt-4 max-w-2xl text-muted">
            İç mimar kürasyonuyla seçilmiş koleksiyonumuzu keşfedin.
          </p>
        </div>
      </div>

      <div className="container-site py-12 md:py-16">
        <Suspense fallback={<div className="py-20 text-center text-muted">Yükleniyor...</div>}>
          <ProductsClient products={serializeProducts(products)} />
        </Suspense>
      </div>
    </div>
  );
}
