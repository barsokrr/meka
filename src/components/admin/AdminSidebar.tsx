"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { BRAND } from "@/types";

const links = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/urunler", label: "Ürünler" },
  { href: "/admin/siparisler", label: "Siparişler" },
  { href: "/admin/mesajlar", label: "Mesajlar" },
  { href: "/admin/ayarlar", label: "Ayarlar" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") return null;

  const handleLogout = async () => {
    await fetch("/api/auth/login", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="hidden w-64 flex-shrink-0 border-r border-earth/10 bg-cream p-6 md:block">
      <Link href="/" className="font-serif text-xl tracking-widest">
        {BRAND.name}
      </Link>
      <p className="mt-1 text-xs text-charcoal/50">Admin Panel</p>

      <nav className="mt-10 space-y-1">
        {links.map((link) => {
          const active = link.exact
            ? pathname === link.href
            : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "block rounded-sm px-3 py-2 text-sm transition",
                active ? "bg-charcoal text-cream-light" : "hover:bg-earth/10"
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-10 space-y-2 border-t border-earth/10 pt-6">
        <Link href="/" className="block text-xs text-earth hover:underline">
          ← Siteye Dön
        </Link>
        <button onClick={handleLogout} className="text-xs text-charcoal/50 hover:text-terracotta">
          Çıkış Yap
        </button>
      </div>
    </aside>
  );
}
