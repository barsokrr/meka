import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { BRAND } from "@/types";

export const metadata: Metadata = { title: "Mesafeli Satış Sözleşmesi" };

export default function DistanceSalesPage() {
  return (
    <LegalPage title="Mesafeli Satış Sözleşmesi">
      <p>
        İşbu sözleşme, {BRAND.name} ile tüketici arasında elektronik ortamda kurulan mesafeli
        satış sözleşmesidir.
      </p>
      <h2>Satıcı Bilgileri</h2>
      <p>{BRAND.name} — {BRAND.email} — İstanbul, Türkiye</p>
      <h2>Sipariş Süreci</h2>
      <p>
        Web sitesi üzerinden sipariş talebi oluşturulur. Talep onaylandıktan sonra
        ödeme ve teslimat detayları müşteri ile paylaşılır.
      </p>
      <h2>Cayma Hakkı</h2>
      <p>
        Stoklu ürünlerde teslimattan itibaren 14 gün içinde cayma hakkı kullanılabilir.
        Sipariş üzerine üretilen ürünlerde cayma hakkı bulunmamaktadır.
      </p>
      <h2>Teslimat</h2>
      <p>
        Türkiye geneline kargo ile teslimat yapılır. Teslimat süresi ürün bazında
        değişiklik gösterebilir.
      </p>
      <h2>Uyuşmazlık</h2>
      <p>
        Uyuşmazlıklarda Tüketici Hakem Heyetleri ve Tüketici Mahkemeleri yetkilidir.
      </p>
    </LegalPage>
  );
}
