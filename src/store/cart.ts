"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types";
import type { StockStatus } from "@prisma/client";

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  syncItems: (
    updates: { productId: string; name?: string; stockStatus?: StockStatus }[]
  ) => void;
  clearCart: () => void;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const { items } = get();
        const existing = items.find((i) => i.productId === item.productId);

        if (existing) {
          if (existing.stockStatus === "OUT_OF_STOCK") return;
          set({
            items: items.map((i) =>
              i.productId === item.productId
                ? { ...i, quantity: i.quantity + (item.quantity || 1) }
                : i
            ),
          });
        } else {
          if (item.stockStatus === "OUT_OF_STOCK") return;
          set({
            items: [
              ...items,
              { ...item, quantity: item.quantity || 1 } as CartItem,
            ],
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
      syncItems: (updates) => {
        if (updates.length === 0) return;
        const byId = new Map(updates.map((u) => [u.productId, u]));
        set({
          items: get().items.map((item) => {
            const update = byId.get(item.productId);
            if (!update) return item;
            return {
              ...item,
              ...(update.name ? { name: update.name } : {}),
              ...(update.stockStatus ? { stockStatus: update.stockStatus } : {}),
            };
          }),
        });
      },
      clearCart: () => set({ items: [] }),
      getItemCount: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: "barisoker-cart" }
  )
);

export function canAddToCart(stockStatus: StockStatus): boolean {
  return stockStatus !== "OUT_OF_STOCK";
}
