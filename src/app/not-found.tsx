import Link from "next/link";
import { BRAND } from "@/types";

export default function NotFound() {
  return (
    <div className="container-site flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-sm uppercase tracking-widest text-earth">404</p>
      <h1 className="mt-4 font-serif text-4xl font-light">Sayfa Bulunamadı</h1>
      <p className="mt-4 max-w-md text-charcoal/70">
        Aradığınız sayfa mevcut değil veya taşınmış olabilir.
      </p>
      <Link href="/" className="btn-primary mt-8">
        {BRAND.name} Ana Sayfa
      </Link>
    </div>
  );
}
