"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const HIDDEN_PREFIXES = ["/admin", "/siparis", "/sepet", "/iletisim"];

export function MobileStickyCta() {
  const pathname = usePathname();

  if (HIDDEN_PREFIXES.some((p) => pathname.startsWith(p))) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-stone/95 px-4 py-3 backdrop-blur-md md:hidden">
      <Link href="/iletisim?kaynak=sticky" className="btn-primary w-full">
        Danışmanlık Talebi
      </Link>
    </div>
  );
}
