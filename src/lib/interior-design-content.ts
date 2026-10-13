export type InteriorDesignProject = {
  slug: string;
  title: string;
  desc: string;
  images: string[];
};

export type InteriorGalleryImage = {
  src: string;
  alt: string;
  projectSlug: string;
  projectTitle: string;
  indexInProject: number;
};

export function flattenInteriorGallery(): InteriorGalleryImage[] {
  return INTERIOR_DESIGN_PROJECTS.flatMap((project) =>
    project.images.map((src, indexInProject) => ({
      src,
      alt: `${project.title} — görünüm ${indexInProject + 1}`,
      projectSlug: project.slug,
      projectTitle: project.title,
      indexInProject,
    }))
  );
}

export function getInteriorGalleryStats() {
  const images = flattenInteriorGallery();
  return {
    projectCount: INTERIOR_DESIGN_PROJECTS.length,
    imageCount: images.length,
  };
}

export function getProjectBySlug(slug: string): InteriorDesignProject | undefined {
  return INTERIOR_DESIGN_PROJECTS.find((p) => p.slug === slug);
}

export const INTERIOR_DESIGN_PAGE = {
  title: "Proje Galerisi",
  intro:
    "Konut iç mimarlık projelerinden tüm mekân görselleri — mutfak, salon, yatak odası ve banyo.",
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
  {
    slug: "ev-tasarimi-2",
    title: "Ev Tasarımı 2",
    desc: "Mermer adalı mutfak, yemek alanı ve banyo — flüt detay, ahşap ve pirinç aksanlar.",
    images: [
      "/images/interior-design/ev-tasarimi-2/01.jpg",
      "/images/interior-design/ev-tasarimi-2/02.jpg",
      "/images/interior-design/ev-tasarimi-2/03.jpg",
      "/images/interior-design/ev-tasarimi-2/04.jpg",
      "/images/interior-design/ev-tasarimi-2/05.jpg",
      "/images/interior-design/ev-tasarimi-2/06.jpg",
      "/images/interior-design/ev-tasarimi-2/07.jpg",
      "/images/interior-design/ev-tasarimi-2/08.jpg",
      "/images/interior-design/ev-tasarimi-2/09.jpg",
    ],
  },
  {
    slug: "ev-tasarimi-3",
    title: "Ev Tasarımı 3",
    desc: "Modern mutfak — ahşap ve gri-beyaz mermer yüzeyler, ray aydınlatma ve entegre depolama.",
    images: [
      "/images/interior-design/ev-tasarimi-3/01.jpg",
      "/images/interior-design/ev-tasarimi-3/02.jpg",
      "/images/interior-design/ev-tasarimi-3/03.jpg",
      "/images/interior-design/ev-tasarimi-3/04.jpg",
      "/images/interior-design/ev-tasarimi-3/05.jpg",
    ],
  },
  {
    slug: "ev-tasarimi-4",
    title: "Ev Tasarımı 4",
    desc: "Salon, yemek ve yatak odası — ahşap panel, entegre depolama ve sıcak LED vurgular.",
    images: [
      "/images/interior-design/ev-tasarimi-4/01.jpg",
      "/images/interior-design/ev-tasarimi-4/02.jpg",
      "/images/interior-design/ev-tasarimi-4/03.jpg",
      "/images/interior-design/ev-tasarimi-4/04.jpg",
      "/images/interior-design/ev-tasarimi-4/05.jpg",
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
