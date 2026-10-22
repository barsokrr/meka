/** Elmalık Villa — Teklif_1_2328 hakediş verisi (mobil portal) */
window.ELMALIK_HAKEDIS = {
  proje: "VAN / EDREMİT / ELMALIK VİLLA TADİLATI",
  teklifRef: "Teklif_1_2328",
  matrah: 576023,
  karOrani: 0.2,
  kalem: [
    { poz: "T-01", ad: "Elektrik tesisatı", birim: "götürü", tutar: null, aciklama: "Genel" },
    { poz: "T-02", ad: "Mekanik tesisat", birim: "götürü", tutar: null, aciklama: "Genel" },
    { poz: "T-03", ad: "Tavan alçıpan", birim: "m²", miktar: 43.73, bf: 750, tutar: 32797.5, aciklama: "Mutfak — Z.Hol — G.Odası" },
    { poz: "T-04", ad: "Gergi tavan", birim: "m²", miktar: 5.35, bf: 2500, tutar: 13375, aciklama: "Giyinme odası" },
    { poz: "T-05", ad: "Duvar çıtası", birim: "mt", miktar: 103.06, bf: 650, tutar: 66989, aciklama: "Mutfak, hol, 2. kat hol" },
    { poz: "T-06", ad: "Boya", birim: "m²", tutar: null, aciklama: "Genel" },
    { poz: "T-07", ad: "Duvar kağıdı", birim: "m²", miktar: 81, bf: 2500, tutar: 202500, aciklama: "Çalışma odası, yatak odaları" },
    { poz: "T-08", ad: "İtalyan boya", birim: "m²", miktar: 46, bf: 1600, tutar: 73600, aciklama: "Merdiven traverten" },
    { poz: "T-09", ad: "Mobilya", birim: "m²", tutar: null, aciklama: "Mutfak — G.odası — Vestiyer" },
    { poz: "T-10", ad: "Tezgah", birim: "mtül", miktar: 5.4, tutar: null, aciklama: "Mutfak" },
    { poz: "T-11", ad: "Tezgah arası", birim: "mtül", miktar: 7.4, tutar: null, aciklama: "Mutfak" },
    { poz: "T-12", ad: "Zemin seramik", birim: "m²", miktar: 36, tutar: null, aciklama: "Mutfak — ara koridor" },
    { poz: "T-13", ad: "Zemin seramik çıtası", birim: "mt", miktar: 12.14, tutar: null, aciklama: "Mutfak — G.Hol" },
    { poz: "T-14", ad: "Süpürgelik", birim: "mt", tutar: null, aciklama: "Genel" },
    { poz: "T-15", ad: "Aydınlatma", birim: "adet", tutar: null, aciklama: "Genel" },
  ],
  goturuToplam: 186761.5,
};

window.elmalikFormatTL = function (n) {
  if (n == null || Number.isNaN(n)) return "—";
  return n.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " TL";
};
