import { redirect, notFound } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { parseJsonArray } from "@/lib/utils";
import { ProductForm } from "@/components/admin/ProductForm";

type Props = { params: Promise<{ id: string }> };

export default async function EditProductPage({ params }: Props) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();

  return (
    <div>
      <h1 className="font-serif text-3xl font-light">Ürün Düzenle</h1>
      <p className="mt-1 text-sm text-charcoal/60">{product.name}</p>
      <div className="mt-8">
        <ProductForm
          productId={product.id}
          initial={{
            name: product.name,
            slug: product.slug,
            shortDescription: product.shortDescription,
            description: product.description,
            price: product.price,
            comparePrice: product.comparePrice,
            category: product.category,
            material: product.material,
            dimensions: product.dimensions,
            colors: parseJsonArray(product.colors),
            stockStatus: product.stockStatus,
            deliveryTime: product.deliveryTime,
            images: parseJsonArray(product.images),
            featured: product.featured,
            active: product.active,
            sortOrder: product.sortOrder,
            projectNote: product.projectNote,
          }}
        />
      </div>
    </div>
  );
}
