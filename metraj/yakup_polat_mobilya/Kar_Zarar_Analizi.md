# Yakup Polat — Kâr / Zarar Analizi

**Tarih:** 02.10.2026 · **Para birimi:** TL · Resa girdi ve müteahhit teklif **KDV dahil**  
> Ön muhasebe / karar destek. Kesin vergi ve KDV nakit etkisi **mali müşavir** onayındadır.

---

## 1) Özet tablo (brüt)

| | TL |
|---|---:|
| **Müteahhitten tahsil (toplam)** | **19.170.225** |
| ↳ Barter daire (değerleme) | 8.000.000 |
| ↳ Likit (nakit + çek) | 11.170.225 |
| **Resa Mutfak gider (toplam)** | **14.856.180** |
| **Brüt kâr (maliyet sonrası)** | **4.314.045** |
| Brüt kâr / ciro | **%22,5** |
| Brüt kâr / Resa maliyeti | **%29,0** |

### Kalem kârı

| Gelir kalemi | Tahsil (TL) | Maliyet (TL) | Brüt kâr (TL) |
|---|---:|---:|---:|
| İmalat paketi (mobilya + kapı + montaj) | 18.570.225 | 14.856.180 | **3.714.045** |
| Mimari danışmanlık | 600.000 | — * | **600.000** |
| **Toplam** | **19.170.225** | **14.856.180** | **4.314.045** |

\* Danışmanlık için doğrudan Resa faturası yok; asıl maliyet zaman / saha / ofis (aşağıda operasyon notu).

---

## 2) Nakit akış senaryoları

### Senaryo A — Barter daire **Resa’ya devredilir** (tercih: nakit kâr)

| Adım | TL |
|---|---:|
| Likit tahsil | +11.170.225 |
| Resa’ya nakit/çek (barter 8 M sonrası kalan) | −6.856.180 |
| **Net elde kalan likit** | **+4.314.045** |
| Barter daire | Resa’ya gider (stokta daire kalmaz) |

**Sonuç:** Yaklaşık **4,31 M TL** likit brüt kâr; daire riski yok.

### Senaryo B — Barter daire **sizde kalır**

| Adım | TL |
|---|---:|
| Likit tahsil | +11.170.225 |
| Resa’ya tam ödeme | −14.856.180 |
| **Likit açık (iç finansman gerekir)** | **−3.685.955** |
| Varlık | 1 daire (mutabık değer **8.000.000**) |

**Ekonomik okuma (basit):**  
Daireyi **8 M** satılabilir / değerlenir varsayımıyla:  
8.000.000 − 3.685.955 (iç nakit) ≈ **4.314.045 TL** brüt — Senaryo A ile aynı **brüt**, fakat kâr **daire likidasyonuna** bağlı (vade, iskan, piyasa).

| | Senaryo A | Senaryo B |
|---|---|---|
| Likit kâr (hemen) | **4.314.045** | **−3.685.955** (önce) |
| Daire | Yok | 8.000.000 (riskli varlık) |
| Toplam brüt (daire 8 M ise) | 4.314.045 | ~4.314.045 |

---

## 3) Kâr marjı kontrolü (imalat)

| | TL |
|---|---:|
| Resa belge toplamı | 14.856.180 |
| Hedef imalat satışı (danışmanlık hariç) | 18.570.225 |
| Fark | 3.714.045 |
| **Marj / Resa** | **%25,0** (planlanan barter marjı ile uyumlu) |

Danışmanlık **600.000 TL** marja ek **+%3,2** ciro (toplam ciro üzerinden).

---

## 4) Hassasiyet (kâr ne kadar oynar?)

| Varyasyon | Brüt kâr (TL) | Not |
|---|---:|---|
| **Baz** | **4.314.045** | Mevcut teklif |
| Resa maliyeti **+%5** (14.856.180 → 15.599.589) | **3.570.636** | ÜFE / fiyat farkı riski |
| Resa **+%10** | **2.827.227** | Kötümser maliyet |
| Barter daire **7,0 M** (8 M yerine), Senaryo A | **3.314.045** | 1 M × likit kaybı gibi |
| Barter daire **7,0 M**, Senaryo B + daire satış 7 M | ~3.314.045 | Daire değer düşüşü |
| Müteahhit likit **%10 gecikmeli** | Faiz/stres | Çek vadesi > Resa vadesi |
| Çek **tahsil edilemez** (ciro) | **−7.856.180**’e kadar zarar riski | 5,29 M çek + Resa yükümlülüğü |

Detay: `Kar_Zarar_Hassasiyet.csv`

---

## 5) Zarar / risk eşikleri

| Risk | Eşik / etki |
|---|---|
| **Resa ödenmeden çek patlar** | Likit 11,17 M’nin **%47’si** çek — kefaletsiz ciro yüksek risk |
| **Barter tapu gecikmesi** | Resa’ya barter verilemezse Senaryo B’ye kayma → **3,69 M** nakit ihtiyacı |
| **Resa > tahsil** | Resa kalem farkı 231.500 + fiyat artışı marjı eritir |
| **KDV tevkifat 4/10** | Tahsil KDV dahil; tevkifatlı faturada **nakit KDV** MM ile planlanmalı (kârı kilitlemez, nakit zamanlaması) |

**Break-even (Resa tam ödeme, likit ile):**  
14.856.180 − 11.170.225 = **3.685.955 TL** → barter veya özkaynak ile kapatılması gerekir (Senaryo B).

**Break-even (Senaryo A):**  
Resa’ya barter sonrası max nakit = 6.856.180 ≤ likit 11.170.225 → **pozitif**, zarar yok (baz fiyatlarda).

---

## 6) Vergi sonrası (kabaca — şahıs şirketi)

Brüt **4.314.045 TL** üzerinden **yıllık** gelir vergisi dilimi (2026 tarifesi, MM kesin):

| Dilim (örnek) | Oran | Kabaca GV (tek başına brüt)* |
|---|---:|---:|
| İlk 158.000 | %15 | — |
| 158.000 – 330.000 | %20 | — |
| … üst dilimler | %27–40 | |

\* 4,3 M TL yıllık matrah **üst dilimlere** girer; **GV sonrası net** genelde brütün **~%60–70’i** bandında tahmin edilir (Bağ-Kur, gider indirimi, stopaj, tevkifat değişir).

**Operasyon gideri (danışmanlık):** Saha ziyaret, ölçü, proje yönetimi — ayda X TL × ~8 ay → net kârdan düşülür (fiş/fatura ile).

**Limited şirket:** Kurumlar + dağıtım farklı; marj aynı, vergi optimizasyonu ayrı çalışma.

---

## 7) Sonuç ve öneri

| Soru | Cevap |
|---|---|
| İş **kârlı mı?** | Evet — baz senaryoda **4,31 M TL brüt** (maliyet Resa 14,86 M, satış 19,17 M). |
| En güvenli kâr | **Senaryo A** (barter Resa) — likit kâr, daire piyasa riski yok. |
| En riskli | **Senaryo B** + çek ciro + Resa fiyat artışı birleşimi. |
| Marj yeterli mi? | **%22,5** brüt ciro iyi; Resa **+10%** ile hâlâ **~2,83 M** brüt. |

**Aksiyon:** Çek kefaleti, barter tapu takvimi, Resa fiyat farkı maddesi (ÜFE), tevkifat nakit takvimi (MM).

---

## Dosyalar

| Dosya | İçerik |
|---|---|
| `Kar_Zarar_Senaryolar.csv` | A/B nakit tablosu |
| `Kar_Zarar_Hassasiyet.csv` | Varyasyonlar |
| `Finansal_Ozet.csv` | Ana girdiler |
| `/mobilya/kar-zarar.html` | Telefon özeti |
