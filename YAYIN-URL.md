# Meka — çalışan site adresleri

## Hemen açılır (GitHub Pages ayarı gerekmez)

Telefon ve bilgisayarda **şimdi** kullanın — jsDelivr üzerinden `gh-pages` dalı:

| Sayfa | Link |
|--------|------|
| **Ana portal** | https://cdn.jsdelivr.net/gh/barsokrr/meka@gh-pages/index.html |
| **Proje galerisi** | https://cdn.jsdelivr.net/gh/barsokrr/meka@gh-pages/galeri/index.html |
| **Proje bedeli 2026** | https://cdn.jsdelivr.net/gh/barsokrr/meka@gh-pages/proje-bedeli/index.html?k=benimhesap2026 |
| **Şantiye / metraj (kalıp)** | https://cdn.jsdelivr.net/gh/barsokrr/meka@gh-pages/kalip/index.html |

Bu linkleri **yer imine** kaydedin. `barsokrr.github.io` adresi açılmıyorsa normal — aşağıdaki GitHub Pages adımı yapılmamış olabilir.

---

## Neden `github.io` açılmıyor?

| Adres | Durum |
|--------|--------|
| `https://barsokrr.github.io/meka/` | **404** — Repo’da GitHub Pages **açık değil** veya kaynak dal ayarlı değil |
| `https://meka-production.up.railway.app` | **404** — Eski Railway servisi kapalı |
| Tam Next.js (ürünler, sepet, admin) | Railway / Render deploy gerekir → `YENI-HOST.md` |

### GitHub Pages’i bir kez açın (kalıcı `github.io` için)

1. https://github.com/barsokrr/meka/settings/pages  
2. **Build and deployment → Source:** **Deploy from a branch**  
3. **Branch:** `gh-pages` · **Folder:** `/ (root)` → **Save**  
4. 2–5 dakika sonra: **https://barsokrr.github.io/meka/**

`main` branch’e push olunca workflow **`Publish Mobil Site (gh-pages branch)`** `gh-pages` dalını günceller.

---

## Tam e-ticaret sitesi (koleksiyon, sepet, admin)

Sunucu gerekir:

- Render: https://render.com/deploy?repo=https://github.com/barsokrr/meka  
- Detay: `YENI-HOST.md`, `GECICI-YAYIN.md`

Admin (canlıda): `/admin/login` — `README.md`

---

## Geçici (PC açıkken)

`baslat.bat` veya `npm run dev` + Cloudflare tünel — PC kapanınca link ölür.