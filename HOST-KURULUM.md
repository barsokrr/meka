# Telefonda site açılmıyorsa — 2 dakikalık kurulum

Cloudflare tünel linkleri birçok mobil operatörde **açılmaz**. Kalıcı ve telefonda çalışan adres için **GitHub Pages** açın (ücretsiz).

## Adımlar (telefon veya bilgisayar)

1. Tarayıcıda açın: **https://github.com/barsokrr/meka/settings/pages**
2. **Build and deployment → Source** → **Deploy from a branch**
3. **Branch:** `gh-pages` · **Folder:** `/ (root)` → **Save**
4. 2–5 dakika bekleyin.

## Açılacak adresler

| Sayfa | Adres |
|--------|--------|
| Ana (mobil site) | **https://barsokrr.github.io/meka/** |
| Proje galerisi (27 görsel) | **https://barsokrr.github.io/meka/galeri/** |

Bu sürüm: iç mimarlık galerisi + iletişim linkleri. **Koleksiyon / sepet / admin** için Railway gerekir → `GECICI-YAYIN.md`.

## PC’de anında tam site (geçici)

`baslat.bat` çalıştırın → tünel penceresindeki `https://….trycloudflare.com` adresi (PC açık kalmalı).

## Kalıcı tam site (Next.js)

https://railway.app → GitHub `barsokrr/meka` → Volume `/data` → `DATABASE_URL=file:/data/prod.db` → deploy sonrası verilen `*.up.railway.app` adresi.
