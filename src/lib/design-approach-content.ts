export type DesignPillar = {
  title: string;
  desc: string;
  image: string;
};

export const DESIGN_APPROACH = {
  label: "Tasarım Dili",
  title: "Tasarım Yaklaşımı",
  intro:
    "Her mekânın kendine özgü bir ritmi vardır. Biz bu ritmi dinleyerek; işlev, malzeme ve ışığı bir araya getiren ölçülü, zamansız ve yaşanabilir iç mekânlar tasarlıyoruz.",
};

export const DESIGN_PRINCIPLES = [
  {
    title: "Az ama öz",
    desc: "Her parça bir amaca hizmet eder. Gereksiz ekleme yerine, mekânın ihtiyacına göre seçilmiş, birbiriyle konuşan parçalar tercih edilir.",
  },
  {
    title: "Malzeme dürüstlüğü",
    desc: "Doğal dokular, kaliteli yüzeyler ve dokunsal zenginlik. Malzeme seçimi estetik kadar dayanıklılık ve bakım kolaylığı açısından da değerlendirilir.",
  },
  {
    title: "Işık ve oran",
    desc: "Gün ışığı, yapay aydınlatma ve mekân oranları birlikte düşünülür. Doğru ışık, malzemenin ve rengin karakterini ortaya çıkarır.",
  },
  {
    title: "Zamansızlık",
    desc: "Geçici trendler yerine yıllarca güncel kalacak formlar. Sıcak nötr tonlar, yumuşak hatlar ve kişisel dokunuşlarla kalıcı bir dil kurulur.",
  },
];

export const DESIGN_PILLARS: DesignPillar[] = [
  {
    title: "Konut",
    desc: "Daire, villa ve yazlıklarda günlük yaşam ritmine uygun, sakin ve kişisel mekânlar.",
    image: "/images/products/ginevra-daybed/01.webp",
  },
  {
    title: "Ticari",
    desc: "Otel, restoran ve mağazalarda misafir deneyimini güçlendiren sıcak ve seçkin atmosferler.",
    image: "/images/products/louis-xv-daybed/01.webp",
  },
  {
    title: "Detay & Styling",
    desc: "Aydınlatma, tekstil ve objelerle mekâna derinlik katan son dokunuşlar.",
    image: "/images/products/pluma-alabaster-masa-lambasi/01.webp",
  },
];
