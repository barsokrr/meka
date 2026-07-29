import type { Product } from "@prisma/client";
import { parseJsonArray } from "./utils";
import type { ProductDTO } from "@/types";

export function serializeProduct(product: Product): ProductDTO {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    shortDescription: product.shortDescription,
    description: product.description,
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
  };
}

export function serializeProducts(products: Product[]): ProductDTO[] {
  return products.map(serializeProduct);
}
