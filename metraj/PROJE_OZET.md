# Karşıyaka Ortaokulu — Kalıp Taşeronluğu Proje Özeti

**Proje:** Karşıyaka Ortaokulu (24 derslik)  
**Proje no:** MEBİZ.73-10-25-01-SU-001-R0  
**İş:** Betonarme kalıp işçiliği (taşeron / alt yüklenici)  
**Ölçü yöntemi (tercih):** Kırık ölçü (a × b × c)  
**Belge tarihi:** 2026-08-11  

> Bu paket karar destek ve muhasebe hazırlık amaçlıdır. Sözleşme, fatura kodları ve vergi hesapları avukat / mali müşavir / İSG uzmanı onayına tabidir.

---

## 1) Ne yapıldı?

Kalıp planlarından (PDF + DWG) metraj çıkarıldı; taşeron birim fiyatıyla hakediş, KDV tevkifatı, şahıs şirketi maliyet/kâr, sözleşme taslağı ve muhasebe fatura formu üretildi.

## 2) Metraj (kırık ölçü)

| Kalem | m² |
|---|---:|
| Radye temel yan kalıbı | 120,4 |
| Bodrum perde kalıbı | 1.152,7 |
| Bodrum kolon kalıbı | 184,0 |
| Üst kat perde kalıbı | 3.468,8 |
| Üst kat kolon kalıbı | 699,2 |
| Döşeme alt kalıbı | 4.706,5 |
| Kiriş kalıbı | 1.441,8 |
| **TOPLAM** | **11.773,4** |

Alternatif düz ölçü toplamı: **11.295,7 m²**.  
Yaklaşık inşaat alanı (6 kot): **~6.169 m²**.

## 3) Fiyatlandırma (kanonik)

| | Birim | Matrah (KDV hariç) | Ödenecek (matrah + 6/10 KDV) |
|---|---:|---:|---:|
| **Kırık × 450 (tercih)** | 450 TL/m² | **5.298.030 TL** | **5.933.794 TL** |
| Düz × 750 (alternatif) | 750 TL/m² | 8.471.775 TL | 9.488.388 TL |
| ÇŞB 15.180.1002 (2026 Nis.) | 917 TL/m² | 10.796.208 TL | — (malzeme+işçilik+GG+kâr) |

- **450 TL/m²:** taşeron **işçilik** (malzeme / iskele hariç).  
- **ÇŞB 917 TL/m²:** resmi tam poz; **GG = genel giderler**.  
- Eski **470 TL/m²** satırları arşiv/referans; güncel birim **450**’dir.

## 4) Operasyon modeli (Seçenek A)

- Şahıs şirketi · NACE **43.99.05** (+ 43.99.13 / 43.99.07)  
- İşçiler **şahıs SGK (4A)** · müteahhit dosyasında **Aracı No**  
- Fatura: işçilik + SGK yansıtması · **KDV tevkifatı 4/10**  
- **Yasak:** müteahhitte sigortalı işçi + size fatura (muvazaa)

**Ekip:** 2 usta + 3 çırak + 1 mühendis (4A) + şirket sahibi (4B Bağ-Kur)

## 5) Maliyet / kâr (kabaca, 6 ay, kırık 450)

Ücretler: usta **120.000** · çırak **60.000** · mühendis **70.000** TL/ay brüt.

| | TL |
|---|---:|
| Gelir (matrah) | 5.298.030 |
| İşletme gideri (ücret+SGK+Bağ-Kur+İSG+sarf…) | **3.951.500** |
| Vergi öncesi kâr | **1.346.530** |
| GV sonrası net (kabaca) | **931.244** |

Kesin hesap mali müşavirindir. Detay: `Ekip_Gider_Kirilimi.xlsx`

## 6) İş süresi tahmini (metraj × ekip)

| Senaryo | Süre |
|---|---|
| Saf iş (bekleme yok, kısmi paralel) | ~5.3 ay |
| İyimser | ~5.9 ay |
| **Gerçekçi (baz)** | **~7.1 ay** |
| Kötümser | ~8.5 ay |
| **Sözleşme / maliyet önerisi** | **7.5 ay (≈6 ay)** |

Detay: `Is_Suresi_Tahmini.xlsx`


## 7) Okul yaklaşık toplam

III.B × 6.169 m² × 21.050 TL/m² ≈ **129,9 M TL** (KDV hariç).  
Kalıp işçilik payı ≈ **%4,1**.

## 8) Ana dosyalar

| Dosya | Kullanım |
|---|---|
| `Karsiyaka_Ortaokulu_Kalip_KIRIK_OLCU.xlsx` | Kırık ölçü cetveli |
| `Kalip_Cizim_Metraj_Fiyat_Tablosu.xlsx` | m² + 450 + ÇŞB + tutar |
| `Isveren_Fiyat_Teklifi_Kalip_Taseronlugu.xlsx` | **İşverene fiyat teklifi** (500 TL/m² + senaryo + metraj) |
| `Kalip_Proje_Dashboard.xlsx` | **Proje dashboard** (ilerleme, KPI, hakediş, ekip, bodrum/üst kat takip) |
| `Fatura_Kesim_Formu_Kalip_Hakedis.xlsx` | Muhasebe e-Fatura formu |
| `taseron_paket/Taseron_Saha_Hakedis_Maliyet_Paket.xlsx` | Tevkifatlı hakediş + maliyet + checklist |
| `taseron_paket/sozlesme_taslagi.md` | Taşeronluk sözleşmesi taslağı |
| `public/kalip/` | **Telefonda görüntüleme** — `/kalip` mobil portal (HTML) |
| `taseron_paket/telefon/` | `/kalip` yönlendirme |
| `PROJE_OZET.md` | Bu özet |
| `bilgi_deposu/` | Yapı kalıp + ÇŞB poz + MYB/KKD bilgi deposu |

## 9) Sonraki adımlar

1. Aracı No + 4A girişleri (ekip)  
2. Sözleşmeyi avukatla imzala (kırık × 450)  
3. İSG / MYB / yüksekte çalışma  
4. Dönemsel hakediş tutanağı + fatura formuyla e-Fatura  
5. Geçici vergi / Bağ-Kur / GV takibi
