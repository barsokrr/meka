"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Faq = { q: string; a: string };

export function FaqAccordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div key={faq.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 py-6 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-serif text-lg md:text-xl">{faq.q}</span>
              <span className="text-xl text-muted transition-transform duration-300" aria-hidden>
                {isOpen ? "−" : "+"}
              </span>
            </button>
            <div
              className={cn(
                "grid transition-all duration-300 ease-out",
                isOpen ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <p className="text-sm leading-relaxed text-muted">{faq.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
