import Link from "next/link";
import { BRAND, CATEGORY_LABELS } from "@/types";

export function Footer() {
  return (
    <footer className="border-t border-border bg-charcoal text-white">
      <div className="container-site py-14 md:py-20">
        <div className="mb-14 border border-white/10 bg-white/5 p-8 md:flex md:items-center md:justify-between md:p-10">
          <div>
            <p className="font-serif text-xl md:text-2xl">Projenize birlikte başlayalım</p>
            <p className="mt-2 text-sm text-white/60">
              Keşif görüşmesi, proje bedeli tahmini veya mekân brief&apos;i — tek adımla başlayın.
            </p>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row md:mt-0">
            <Link
              href="/iletisim"
              className="btn-primary bg-white text-center text-charcoal hover:bg-white/90"
            >
              Danışmanlık Talebi
            </Link>
            <Link
              href="/proje-bedeli"
              className="btn-secondary border-white text-center text-white hover:bg-white hover:text-charcoal"
            >
              Proje Bedeli
            </Link>
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="font-serif text-xl font-light tracking-[0.12em] md:text-2xl"
            >
              {BRAND.logoText}
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              {BRAND.description}
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a
                href={`https://instagram.com/${BRAND.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-luxury text-white/50 transition hover:text-white"
              >
                @{BRAND.instagram}
              </a>
              <span className="text-white/20">·</span>
              <span className="text-xs uppercase tracking-luxury text-white/40">
                {BRAND.hashtag}
              </span>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-medium uppercase tracking-luxury text-white/50">
              Keşfet
            </h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>
                <Link href="/tasarim-yaklasimi" className="hover:text-white">
                  Tasarım Yaklaşımı
                </Link>
              </li>
              <li>
                <Link href="/hizmetler" className="hover:text-white">
                  Hizmetler
                </Link>
              </li>
              <li>
                <Link href="/proje-bedeli" className="hover:text-white">
                  Proje Bedeli
                </Link>
              </li>
              <li>
                <Link href="/urunler" className="hover:text-white">
                  Koleksiyon
                </Link>
              </li>
              <li>
                <Link href="/hakkimizda" className="hover:text-white">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="hover:text-white">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-medium uppercase tracking-luxury text-white/50">
              Kategoriler
            </h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                <li key={key}>
                  <Link href={`/urunler?kategori=${key}`} className="hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-medium uppercase tracking-luxury text-white/50">
              Destek
            </h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>
                <Link href="/sss" className="hover:text-white">
                  SSS
                </Link>
              </li>
              <li>
                <Link href="/kvkk" className="hover:text-white">
                  KVKK
                </Link>
              </li>
              <li>
                <Link href="/gizlilik" className="hover:text-white">
                  Gizlilik
                </Link>
              </li>
              <li>
                <Link href="/mesafeli-satis" className="hover:text-white">
                  Mesafeli Satış
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 md:flex-row">
          <p>
            © {new Date().getFullYear()} {BRAND.name}. Tüm hakları saklıdır.
          </p>
          <p>{BRAND.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
