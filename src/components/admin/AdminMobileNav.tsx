"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BRAND } from "@/types";

export function AdminMobileNav() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") return null;

  const handleLogout = async () => {
    await fetch("/api/auth/login", { method: "DELETE" });
    router.push("/admin/login");
  };

  return (
    <div className="border-b border-earth/10 bg-cream p-4 md:hidden">
      <div className="flex items-center justify-between">
        <Link href="/admin" className="font-serif text-lg tracking-widest">
          {BRAND.name} Admin
        </Link>
        <button onClick={handleLogout} className="text-xs text-charcoal/50">
          Çıkış
        </button>
      </div>
      <nav className="mt-3 flex gap-2 overflow-x-auto text-xs">
        {[
          { href: "/admin", label: "Dashboard" },
          { href: "/admin/urunler", label: "Ürünler" },
          { href: "/admin/siparisler", label: "Siparişler" },
          { href: "/admin/mesajlar", label: "Mesajlar" },
          { href: "/admin/ayarlar", label: "Ayarlar" },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`whitespace-nowrap rounded-sm px-3 py-1 ${
              pathname === link.href || pathname.startsWith(link.href + "/")
                ? "bg-charcoal text-cream-light"
                : "bg-white"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
