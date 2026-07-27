import type { Metadata } from "next";
import Link from "next/link";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

export const metadata: Metadata = {
  title: "Sıkça Sorulan Sorular",
  description:
    "İç mimarlık projesi süreci, proje bedeli, danışmanlık ve koleksiyon sipariş talepleri hakkında SSS.",
};

const faqs = [
  {
    q: "İç mimarlık projesi nasıl başlar?",
    a: "İletişim formundan kısa bir brief bırakmanız yeterlidir (mekân tipi, alan, bütçe bandı). Genelde 24 saat içinde dönüş yapar, keşif görüşmesi planlarız. Kapsam netleştikten sonra süreç ve teslim takvimi paylaşılır.",
  },
  {
    q: "Proje bedeli nasıl hesaplanır?",
    a: "Asgari ücret için sitedeki TMMOB İçmimarlar Odası formülüne dayalı hesaplama aracını kullanabilirsiniz. Bu tutar ön tahmindir; nihai teklif kapsam, hizmet kalemleri ve mekân koşullarına göre belirlenir.",
  },
  {
    q: "Proje sürecinde neler var?",
    a: "Tipik olarak rölöve/keşif, ön proje, kesin proje, uygulama detayları ve ihtiyaç halinde sahada takip adımları yer alır. Hangi kalemlerin dahil olacağı brief aşamasında netleştirilir.",
  },
  {
    q: "Süre ne kadar sürer?",
    a: "Konut daire ölçeğinde çizim ve karar süreçleri genelde birkaç hafta ile birkaç ay arasında değişir. Uygulama süresi şantiye kapsamına bağlıdır; görüşmede gerçekçi bir takvim paylaşılır.",
  },
  {
    q: "Sipariş nasıl verilir?",
    a: "Koleksiyondan beğendiğiniz ürünleri sepete ekleyip sipariş talebi formunu doldurun. Online ödeme yoktur; talebiniz kaydedilir, stok ve teslimat için sizinle iletişime geçilir.",
  },
  {
    q: "Ödeme nasıl yapılır?",
    a: "Ne proje ne koleksiyon tarafında siteden online ödeme alınmaz. Onay sonrası havale/EFT veya anlaşmalı yöntemlerle ilerlenir.",
  },
  {
    q: "Teslimat süresi ve kargo",
    a: "Stoklu ürünler genelde 3–7 iş günü içinde kargoya verilir. Sipariş üzerine üretilen parçalar 2–4 hafta sürebilir. Kargo koşulları sipariş adımında güncel ayarlara göre hesaplanır. Türkiye geneline teslimat yapılır.",
  },
  {
    q: "İade ve değişim koşulları",
    a: "Stoklu ürünlerde teslimattan itibaren 14 gün içinde, kullanılmamış ve orijinal ambalajında iade kabul edilir. Sipariş üzerine üretilen parçalarda iade yapılmaz; hasar durumunda değişim sağlanır.",
  },
  {
    q: "Montaj hizmeti var mı?",
    a: "Büyük mobilya parçalarında İstanbul ve çevresinde montaj hizmeti sunulabilir. Diğer iller için kargo teslimat noktasına kadar gönderim yapılır.",
  },
];

export default function FAQPage() {
  return (
    <div>
      <div className="border-b border-border bg-surface/70">
        <div className="container-site py-12 md:py-16">
          <p className="section-label">Destek</p>
          <h1 className="section-title mt-3">Sıkça Sorulan Sorular</h1>
          <p className="mt-4 max-w-2xl text-muted">
            Proje süreci, bedel tahmini ve koleksiyon sipariş talepleri hakkında sık sorulanlar.
          </p>
        </div>
      </div>
      <div className="container-site py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <FaqAccordion items={faqs} />
          <div className="mt-12 border border-border bg-white/50 p-8 text-center">
            <p className="font-serif text-xl">Hâlâ netleşmeyen bir nokta mı var?</p>
            <p className="mt-2 text-sm text-muted">Kısa bir brief ile başlayalım.</p>
            <Link href="/iletisim" className="btn-primary mt-6 inline-flex">
              Danışmanlık Talebi
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
