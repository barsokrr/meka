# Sonraki Adımlar — Şahıs Şirketi Kalıp Taşeronu

Proje: **Karşıyaka Ortaokulu (24 derslik)**  
Model: **Seçenek A** (işçiler şahıs SGK’sında + Aracı No + tevkifatlı hakediş faturası)  
Ekip: **2 usta + 3 çırak + 1 mühendis + şirket sahibi** (6 kişi 4A + sahip 4B Bağ-Kur)

---

## 1) Kurulum (işe başlamadan)

1. Şahıs şirketi / vergi levhasında NACE: **43.99.05** (+ gerekirse 43.99.13, 43.99.07)
2. SGK işveren kaydı aç
3. Şantiye SGK müdürlüğünde müteahhit dosyası altında **Aracı No** al
4. Mali müşavir ile KDV tevkifatı 4/10, muhtasar+SGK, geçici vergi takvimini kilitle
5. İSG: risk analizi, uzman/hekim, yüksekte çalışma, MYB, KKD

## 2) Sözleşme

1. `sozlesme_taslagi.md` → avukat kontrolü
2. Ölçü yöntemini seç: **Kırık × 450** (tercih) veya **Düz × 750**
3. Ödeme vadesi, teminat, süre, ek metraj kurallarını doldur
4. Çift nüsha imza + ekler (metraj cetveli, program, İSG listesi)

## 3) Saha / hakediş

1. Günlük puantaj
2. Dönemsel çift imzalı metraj tutanağı
3. `Taseron_Saha_Hakedis_Maliyet_Paket.xlsx` içinden ilgili hakediş sayfasını kullan
4. Faturada: NACE, Aracı No, “işçilik+SGK dahil / malzeme hariç”, tevkifat 4/10

## 4) Mali takip

1. Excel **MALIYET KAR** sayfasında rol bazlı ücretleri güncelle:
   - 2 usta, 3 çırak, 1 mühendis → **4A şahıs şirketi**
   - şirket sahibi → **4B Bağ-Kur** (maaş satırı yok; geçim kârdan çekim)
2. Aylık: ücret, SGK, Bağ-Kur, damga, muhasebe
3. 3 ayda bir: geçici vergi
4. Yıl sonunda: Gelir Vergisi dilimleri (%15–%40)
5. Çıraklar için çıraklık / asgari ücret uygulamasını MM ile netleştir

## 5) Yasak hatırlatma

**Yapma:** Müteahhitte sigortalı işçiler + şahıs şirketine işçilik faturası (muvazaa riski).  
Ya Seçenek A (bu paket) ya da Seçenek B (şirketsiz formen/usta 4A).

---

## Paket dosyaları

| Dosya | İçerik |
|---|---|
| `Taseron_Saha_Hakedis_Maliyet_Paket.xlsx` | Kapak, kırık/düz tevkifatlı hakediş, kıyas, maliyet-kâr, uyum checklist |
| `hakedis_tevkifat_ozet.csv` | Kısa sayısal özet |
| `sozlesme_taslagi.md` | Taşeronluk sözleşmesi taslağı |
| `SONRAKI_ADIMLAR.md` | Bu kontrol listesi |

**Hızlı rakamlar (tevkifatlı tahsil):**

| Yöntem | Matrah | Fatura tahsil (matrah+6/10 KDV) |
|---|---|---|
| Kırık 450 | 5.298.030 TL | **5.933.794 TL** |
| Düz 750 | 8.471.775 TL | **9.488.388 TL** |
