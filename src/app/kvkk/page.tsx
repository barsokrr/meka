import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { BRAND } from "@/types";

export const metadata: Metadata = { title: "KVKK Aydınlatma Metni" };

export default function KVKKPage() {
  return (
    <LegalPage title="KVKK Aydınlatma Metni">
      <p>
        {BRAND.name} olarak kişisel verilerinizin güvenliğine önem veriyoruz. 6698 sayılı Kişisel
        Verilerin Korunması Kanunu (&quot;KVKK&quot;) kapsamında veri sorumlusu sıfatıyla
        aşağıdaki bilgileri sunuyoruz.
      </p>
      <h2>Veri Sorumlusu</h2>
      <p>{BRAND.name} — {BRAND.email}</p>
      <h2>İşlenen Kişisel Veriler</h2>
      <p>
        Sipariş ve iletişim süreçlerinde ad soyad, telefon numarası, e-posta adresi,
        teslimat adresi ve sipariş notu bilgileri işlenmektedir.
      </p>
      <h2>İşleme Amaçları</h2>
      <ul>
        <li>Sipariş taleplerinin alınması ve yönetilmesi</li>
        <li>Müşteri iletişimi</li>
        <li>Teslimat organizasyonu</li>
        <li>Yasal yükümlülüklerin yerine getirilmesi</li>
      </ul>
      <h2>Haklarınız</h2>
      <p>
        KVKK kapsamında kişisel verilerinize erişim, düzeltme, silme ve itiraz haklarınız
        bulunmaktadır. Talepleriniz için {BRAND.email} adresine başvurabilirsiniz.
      </p>
    </LegalPage>
  );
}
