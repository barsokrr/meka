"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProductDTO } from "@/types";
import { useCartStore, canAddToCart } from "@/store/cart";
import { useToast } from "@/components/ui/Toast";
import { STOCK_STATUS_LABELS } from "@/types";

export function AddToCartButton({ product }: { product: ProductDTO }) {
  const addItem = useCartStore((s) => s.addItem);
  const { showToast } = useToast();
  const [adding, setAdding] = useState(false);

  const handleAdd = () => {
    if (!canAddToCart(product.stockStatus)) return;
    setAdding(true);
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      stockStatus: product.stockStatus,
    });
    showToast("Sepete eklendi");
    setTimeout(() => setAdding(false), 500);
  };

  const disabled = !canAddToCart(product.stockStatus);

  return (
    <button
      onClick={handleAdd}
      disabled={disabled || adding}
      className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
    >
      {disabled
        ? STOCK_STATUS_LABELS[product.stockStatus]
        : adding
          ? "Ekleniyor..."
          : "Sepete Ekle"}
    </button>
  );
}

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-square overflow-hidden bg-surface">
        <Image
          src={images[active]}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-3 gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative aspect-square overflow-hidden rounded-sm ${
                active === i ? "ring-2 ring-earth" : "opacity-70 hover:opacity-100"
              }`}
            >
              <Image src={img} alt={`${name} ${i + 1}`} fill className="object-cover" sizes="100px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
