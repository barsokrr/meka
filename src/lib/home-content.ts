import { ProductCategory } from "@prisma/client";

export const HERO = {
  headline: "Mekânınıza karakter katan iç mimarlık",
  subtitle:
    "Konut ve ticari projelerde keşiften teslimata; ölçülü tasarım, şeffaf süreç ve seçilmiş parçalar.",
  image: "/images/products/anita-emperador-masa-lambasi/01.webp",
};

export const BRAND_QUOTE = {
  label: "YAKLAŞIM",
  text: "Her karar bir mekânda test edildi. Trend peşinde değiliz — yaşanan, ölçülen ve kalıcı çözümler sunuyoruz.",
};

export const EXPERTISE = [
  {
    title: "İç mimarlık projesi",
    desc: "Brief, konsept, uygulama ve sahada takip. Konut ve ticari mekânlar için uçtan uca süreç.",
    href: "/hizmetler",
  },
  {
    title: "Tasarım yaklaşımı",
    desc: "Malzeme, ışık ve oran odaklı ölçülü iç mimarlık dili — prensiplerimizi keşfedin.",
    href: "/tasarim-yaklasimi",
  },
  {
    title: "Küratörlü koleksiyon",
    desc: "Proje deneyiminden süzülmüş az sayıda parça — tamamlayıcı seçki.",
    href: "/urunler",
  },
];

export const ROOM_INSPIRATION: {
  title: string;
  desc: string;
  image: string;
  category: ProductCategory;
}[] = [
  {
    title: "Oturma Odası",
    desc: "Konfor ve zarafeti dengeleyen seçkin parçalar.",
    image: "/images/products/ginevra-daybed/01.webp",
    category: "MOBILYA",
  },
  {
    title: "Aydınlatma",
    desc: "Mekâna derinlik katan abajur ve lambalar.",
    image: "/images/products/pluma-alabaster-masa-lambasi/01.webp",
    category: "AYDINLATMA",
  },
  {
    title: "Tekstil & Dokunuş",
    desc: "Kırlent ve kadife detaylarla katmanlı mekânlar.",
    image: "/images/products/viburno-desenli-kirlent/01.webp",
    category: "TEKSTIL",
  },
  {
    title: "Obje & Detay",
    desc: "Vazo, kase ve dekoratif parçalarla tamamlanan köşeler.",
    image: "/images/products/ballarina-murano-cam-kase/01.webp",
    category: "OBJE",
  },
];

export const STATS = [
  { value: "Uçtan uca", label: "Proje süreci", sub: "Keşiften teslimata şeffaf adımlar" },
  { value: "TMMOB", label: "Asgari bedel", sub: "Hesaplama aracıyla ön tahmin" },
  { value: "24s", label: "İlk dönüş", sub: "Danışmanlık taleplerinde hedef süre" },
  { value: "TR", label: "Teslimat ağı", sub: "Koleksiyon için Türkiye geneli" },
];
