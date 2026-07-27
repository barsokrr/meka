import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { BRAND } from "@/types";

export const metadata: Metadata = { title: "Gizlilik Politikası" };

export default function PrivacyPage() {
  return (
    <LegalPage title="Gizlilik Politikası">
      <p>
        Bu gizlilik politikası, {BRAND.name} web sitesini kullanırken toplanan bilgilerin
        nasıl işlendiğini açıklar.
      </p>
      <h2>Toplanan Bilgiler</h2>
      <p>
        Sipariş formu, iletişim formu ve site kullanımı sırasında gönüllü olarak
        paylaştığınız bilgiler toplanır.
      </p>
      <h2>Çerezler</h2>
      <p>
        Sepet işlevselliği için tarayıcınızda localStorage kullanılmaktadır.
        Analitik çerezler opsiyoneldir.
      </p>
      <h2>Veri Güvenliği</h2>
      <p>
        Kişisel verileriniz yetkisiz erişime karşı korunmaktadır. Veriler yalnızca
        sipariş ve iletişim amaçlarıyla kullanılır, üçüncü taraflarla paylaşılmaz.
      </p>
      <h2>İletişim</h2>
      <p>Gizlilik ile ilgili sorularınız için: {BRAND.email}</p>
    </LegalPage>
  );
}
