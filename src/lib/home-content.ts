import { HERO_INTERIOR_IMAGE, getInteriorGalleryStats } from "@/lib/interior-design-content";

const galleryStats = getInteriorGalleryStats();

export const HERO = {
  headline: "Mekânınıza karakter katan iç mimarlık",
  subtitle:
    "Konut ve ticari projelerde keşiften teslimata; ölçülü tasarım, şeffaf süreç ve seçilmiş parçalar.",
  image: HERO_INTERIOR_IMAGE,
};

export const BRAND_QUOTE = {
  label: "YAKLAŞIM",
  text: "Her karar bir mekânda test edildi. Trend peşinde değiliz — yaşanan, ölçülen ve kalıcı çözümler sunuyoruz.",
};

export const EXPERTISE = [
  {
    title: "Proje galerisi",
    desc: "Konut projelerinden mutfak, salon, yatak odası ve banyo görselleri — tüm portfolyo tek yerde.",
    href: "/projeler",
  },
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

export const STATS = [
  {
    value: String(galleryStats.imageCount),
    label: "Proje görseli",
    sub: "Portfolyoda tüm mekân kareleri",
  },
  {
    value: String(galleryStats.projectCount),
    label: "Konut projesi",
    sub: "Ev tasarımı serisi",
  },
  { value: "Uçtan uca", label: "Proje süreci", sub: "Keşiften teslimata şeffaf adımlar" },
  { value: "TMMOB", label: "Asgari bedel", sub: "Hesaplama aracıyla ön tahmin" },
  { value: "24s", label: "İlk dönüş", sub: "Danışmanlık taleplerinde hedef süre" },
  { value: "TR", label: "Teslimat ağı", sub: "Koleksiyon için Türkiye geneli" },
];
