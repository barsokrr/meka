"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types";
import type { StockStatus } from "@prisma/client";

export interface ResolvedProduct {
  id: string;
  slug: string;
  name: string;
  stockStatus: StockStatus;
  image?: string | null;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  /** Realigns stored items with the live catalog; returns dropped item names. */
  repairItems: (resolved: ResolvedProduct[]) => string[];
  clearCart: () => void;
  getItemCount: () => number;
}

function mergeBySlug(items: CartItem[]): CartItem[] {
  const merged: CartItem[] = [];
  for (const item of items) {
    const existing = merged.find((i) => i.slug === item.slug);
    if (existing) {
      existing.quantity += item.quantity;
      continue;
    }
    merged.push({ ...item });
  }
  return merged;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const { items } = get();
        const existing = items.find((i) => i.slug === item.slug);

        if (existing) {
          if (existing.stockStatus === "OUT_OF_STOCK") return;
          set({
            items: items.map((i) =>
              i.slug === item.slug
                ? {
                    ...i,
                    productId: item.productId,
                    quantity: i.quantity + (item.quantity || 1),
                  }
                : i
            ),
          });
        } else {
          if (item.stockStatus === "OUT_OF_STOCK") return;
          set({
            items: [...items, { ...item, quantity: item.quantity || 1 } as CartItem],
          });
        }
      },
      removeItem: (productId) => {
        set({ items: get().items.filter((i) => i.productId !== productId) });
      },
      updateQuantity: (productId, quantity) => {
        if (quantity < 1) {
          get().removeItem(productId);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.productId === productId ? { ...i, quantity } : i
          ),
        });
      },
      repairItems: (resolved) => {
        const bySlug = new Map(resolved.map((p) => [p.slug, p]));
        const dropped: string[] = [];
        const kept: CartItem[] = [];

        for (const item of get().items) {
          const match = bySlug.get(item.slug);
          if (!match) {
            dropped.push(item.name);
            continue;
          }
          kept.push({
            ...item,
            productId: match.id,
            name: match.name,
            stockStatus: match.stockStatus,
            ...(match.image ? { image: match.image } : {}),
          });
        }

        set({ items: mergeBySlug(kept) });
        return dropped;
      },
      clearCart: () => set({ items: [] }),
      getItemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: "barisoker-cart" }
  )
);

export function canAddToCart(stockStatus: StockStatus): boolean {
  return stockStatus !== "OUT_OF_STOCK";
}
