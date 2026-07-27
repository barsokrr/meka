"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, type ProductInput } from "@/lib/validations";
import { slugify } from "@/lib/utils";
import { CATEGORY_LABELS } from "@/types";

export function ProductForm({
  initial,
  productId,
}: {
  initial?: Partial<ProductInput>;
  productId?: string;
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [imageInput, setImageInput] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm<ProductInput>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      slug: "",
      shortDescription: "",
      description: "",
      price: 0,
      category: "OBJE",
      material: "",
      dimensions: "",
      colors: [],
      stockStatus: "IN_STOCK",
      deliveryTime: "3–5 iş günü",
      images: [],
      featured: false,
      active: true,
      sortOrder: 0,
      ...initial,
    },
  });

  const images = watch("images") || [];
  const colors = watch("colors") || [];

  const onSubmit = async (data: ProductInput) => {
    setError("");
    try {
      const url = productId ? `/api/admin/products/${productId}` : "/api/admin/products";
      const method = productId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error);

      router.push("/admin/urunler");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kaydedilemedi");
    }
  };

  const addImage = () => {
    if (imageInput && images.length < 5) {
      setValue("images", [...images, imageInput]);
      setImageInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-4">
      <div>
        <label className="mb-1 block text-sm text-earth">Ürün Adı *</label>
        <input
          {...register("name")}
          className="input-field"
          onBlur={(e) => {
            if (!watch("slug")) setValue("slug", slugify(e.target.value));
          }}
        />
      </div>
      <div>
        <label className="mb-1 block text-sm text-earth">Slug *</label>
        <input {...register("slug")} className="input-field" />
      </div>
      <div>
        <label className="mb-1 block text-sm text-earth">Kısa Açıklama *</label>
        <input {...register("shortDescription")} className="input-field" />
      </div>
      <div>
        <label className="mb-1 block text-sm text-earth">Detaylı Açıklama *</label>
        <textarea {...register("description")} rows={5} className="input-field" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm text-earth">Fiyat (€) *</label>
          <input {...register("price", { valueAsNumber: true })} type="number" className="input-field" />
        </div>
        <div>
          <label className="mb-1 block text-sm text-earth">Karşılaştırma Fiyatı</label>
          <input {...register("comparePrice", { valueAsNumber: true })} type="number" className="input-field" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm text-earth">Kategori *</label>
          <select {...register("category")} className="input-field">
            {Object.entries(CATEGORY_LABELS).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm text-earth">Stok Durumu *</label>
          <select {...register("stockStatus")} className="input-field">
            <option value="IN_STOCK">Stokta</option>
            <option value="MADE_TO_ORDER">Sipariş üzerine</option>
            <option value="OUT_OF_STOCK">Tükendi</option>
          </select>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm text-earth">Malzeme *</label>
          <input {...register("material")} className="input-field" />
        </div>
        <div>
          <label className="mb-1 block text-sm text-earth">Ölçüler *</label>
          <input {...register("dimensions")} className="input-field" />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm text-earth">Teslimat Süresi *</label>
        <input {...register("deliveryTime")} className="input-field" />
      </div>
      <div>
        <label className="mb-1 block text-sm text-earth">Proje Notu</label>
        <input {...register("projectNote")} className="input-field" />
      </div>
      <div>
        <label className="mb-1 block text-sm text-earth">Görseller (URL) *</label>
        <div className="flex gap-2">
          <input
            value={imageInput}
            onChange={(e) => setImageInput(e.target.value)}
            placeholder="https://..."
            className="input-field"
          />
          <button type="button" onClick={addImage} className="btn-secondary whitespace-nowrap">
            Ekle
          </button>
        </div>
        <ul className="mt-2 space-y-1 text-xs text-charcoal/60">
          {images.map((img, i) => (
            <li key={i} className="flex justify-between">
              <span className="truncate">{img}</span>
              <button
                type="button"
                onClick={() => setValue("images", images.filter((_, j) => j !== i))}
                className="text-terracotta"
              >
                Sil
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" {...register("featured")} />
          Öne çıkan
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" {...register("active")} />
          Aktif
        </label>
      </div>
      <div>
        <label className="mb-1 block text-sm text-earth">Sıra</label>
        <input {...register("sortOrder", { valueAsNumber: true })} type="number" className="input-field w-24" />
      </div>
      {error && <p className="text-sm text-terracotta">{error}</p>}
      <button type="submit" disabled={isSubmitting} className="btn-primary">
        {isSubmitting ? "Kaydediliyor..." : "Kaydet"}
      </button>
    </form>
  );
}
