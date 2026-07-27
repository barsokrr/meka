"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import { BRAND, CATEGORY_LABELS } from "@/types";

const mainNav = [
  { href: "/tasarim-yaklasimi", label: "Tasarım Yaklaşımı" },
  { href: "/hizmetler", label: "Hizmetler" },
  { href: "/urunler", label: "Koleksiyon" },
  { href: "/proje-bedeli", label: "Proje Bedeli" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
];

const categoryLinks = Object.entries(CATEGORY_LABELS).map(([key, label]) => ({
  href: `/urunler?kategori=${key}`,
  label,
}));

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [collectionOpen, setCollectionOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const itemCount = useCartStore((s) => s.getItemCount());

  useEffect(() => setMounted(true), []);

  if (pathname.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-stone/90 backdrop-blur-md">
      <div className="hidden border-b border-border/60 md:block">
        <div className="container-site flex h-9 items-center justify-between text-[11px] uppercase tracking-luxury text-muted">
          <span>İç mimarlık</span>
          <div className="flex gap-6">
            <Link href="/sss" className="hover:text-charcoal">
              SSS
            </Link>
            <Link href="/iletisim" className="hover:text-charcoal">
              Danışmanlık
            </Link>
          </div>
        </div>
      </div>

      <div>
        <div className="container-site flex h-16 items-center justify-between md:h-[72px]">
          <Link
            href="/"
            className="font-serif text-xl font-light tracking-[0.12em] text-charcoal md:text-2xl"
          >
            {BRAND.logoText}
          </Link>

          <nav className="hidden items-center gap-7 xl:flex">
            {mainNav.map((link) =>
              link.label === "Koleksiyon" ? (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setCollectionOpen(true)}
                  onMouseLeave={() => setCollectionOpen(false)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "nav-link",
                      pathname.startsWith("/urunler") && "opacity-60"
                    )}
                  >
                    {link.label}
                  </Link>
                  {collectionOpen && (
                    <div className="absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 border border-border bg-stone py-4 shadow-lg">
                      {categoryLinks.map((cat) => (
                        <Link
                          key={cat.href}
                          href={cat.href}
                          className="block px-5 py-2 text-xs uppercase tracking-wider text-charcoal hover:bg-surface"
                        >
                          {cat.label}
                        </Link>
                      ))}
                      <Link
                        href="/urunler"
                        className="mt-2 block border-t border-border px-5 pt-3 text-xs uppercase tracking-wider text-muted hover:text-charcoal"
                      >
                        Tümünü Gör
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "nav-link",
                    (pathname === link.href ||
                      (link.href !== "/" && pathname.startsWith(link.href))) &&
                      "opacity-60"
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-3 md:gap-4">
            <Link href="/sepet" className="nav-link relative hidden sm:inline-flex">
              Sepet
              {mounted && itemCount > 0 && (
                <span className="ml-1 text-muted">({itemCount})</span>
              )}
            </Link>
            <Link
              href="/iletisim"
              className="btn-primary hidden px-5 py-2.5 md:inline-flex"
            >
              Danışmanlık
            </Link>
            <button className="xl:hidden" onClick={() => setOpen(!open)} aria-label="Menü">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {open ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="border-b border-border bg-stone xl:hidden">
          <nav className="container-site flex flex-col gap-1 py-4">
            {mainNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 text-xs uppercase tracking-luxury"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/sepet"
              onClick={() => setOpen(false)}
              className="py-3 text-xs uppercase tracking-luxury"
            >
              Sepet {mounted && itemCount > 0 && `(${itemCount})`}
            </Link>
            <Link
              href="/iletisim"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2 text-center"
            >
              Danışmanlık Talebi
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
