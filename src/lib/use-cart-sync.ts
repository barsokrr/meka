"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cart";
import type { ResolvedProduct } from "@/store/cart";

/**
 * Realigns the stored cart with the live catalog. Product ids change whenever the
 * catalog is rebuilt, so items are matched by slug and stale ids are refreshed.
 */
export function useCartSync(enabled: boolean) {
  const items = useCartStore((s) => s.items);
  const repairItems = useCartStore((s) => s.repairItems);
  const [notice, setNotice] = useState("");
  const slugKey = items.map((i) => i.slug).join(",");

  useEffect(() => {
    if (!enabled || !slugKey) return;

    let active = true;
    fetch("/api/products/resolve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slugs: slugKey.split(",") }),
    })
      .then((r) => r.json())
      .then((data: { products?: ResolvedProduct[] }) => {
        if (!active || !data.products) return;
        const dropped = repairItems(data.products);
        if (dropped.length > 0) {
          setNotice(
            `${dropped.join(", ")} artık satışta olmadığı için sepetten çıkarıldı.`
          );
        }
      })
      .catch(() => undefined);

    return () => {
      active = false;
    };
  }, [enabled, slugKey, repairItems]);

  return notice;
}
