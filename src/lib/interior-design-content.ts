export type InteriorDesignProject = {
  slug: string;
  title: string;
  desc: string;
  images: string[];
};

/** İç mimarlık proje görselleri — ev tasarımları sırayla eklenir. */
export const INTERIOR_DESIGN_PROJECTS: InteriorDesignProject[] = [
  {
    slug: "ev-tasarimi-1",
    title: "Ev Tasarımı 1",
    desc: "Açık plan mutfak, yemek ve oturma alanı — ahşap, mermer ve ölçülü aydınlatma.",
    images: [
      "/images/interior-design/ev-tasarimi-1/01.jpg",
      "/images/interior-design/ev-tasarimi-1/02.jpg",
      "/images/interior-design/ev-tasarimi-1/03.jpg",
      "/images/interior-design/ev-tasarimi-1/04.jpg",
      "/images/interior-design/ev-tasarimi-1/05.jpg",
      "/images/interior-design/ev-tasarimi-1/06.jpg",
      "/images/interior-design/ev-tasarimi-1/07.jpg",
      "/images/interior-design/ev-tasarimi-1/08.jpg",
    ],
  },
];

export const INTERIOR_DESIGN_SECTION = {
  label: "Projeler",
  title: "İç mimarlık tasarımları",
  desc: "Gerçekleşen konut projelerinden seçilmiş mekânlar — malzeme, ışık ve işlev bir arada.",
};

/** Ana sayfa hero — proje görseli (küratörlük ürün fotoğrafı yerine). */
export const HERO_INTERIOR_IMAGE =
  "/images/interior-design/ev-tasarimi-1/05.jpg";
