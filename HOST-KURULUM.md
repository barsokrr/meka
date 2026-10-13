<<<<<<< HEAD
# Tam site host (telefon + bilgisayar)

Cloudflare tünel linkleri birçok telefonda **açılmaz**. Kalıcı adres için aşağıdaki yollardan **birini** seçin.

---

## A) Tam site — Render (önerilen, ~5 dk, ücretsiz plan)

1. Bu linke gidin (GitHub ile giriş isteyebilir):  
   **https://render.com/deploy?repo=https://github.com/barsokrr/meka**
2. **Apply** / deploy tamamlansın (5–10 dk).
3. Render size verir: **`https://meka-xxxx.onrender.com`** → bu **tüm sayfalar** (ana sayfa, `/projeler`, `/urunler`, iletişim, sepet).

Deploy sonrası Render panelinde **Environment** → `NEXT_PUBLIC_SITE_URL` değerini kendi Render URL’niz yapın → **Redeploy**.

---

## B) Tam site — Railway

1. https://railway.app → GitHub → repo **barsokrr/meka**
2. **Volume** mount: `/data` → `DATABASE_URL=file:/data/prod.db`
3. Deploy sonrası **Settings → Networking → Generate domain**  
4. Adres: `https://xxxx.up.railway.app`

Detay: `GECICI-YAYIN.md`

---

## C) Sadece proje galerisi (sunucu yok, hızlı)

GitHub Pages (bir kez): **https://github.com/barsokrr/meka/settings/pages**  
→ Branch **`gh-pages`**, folder **`/`** → Save.

Sonra: **https://barsokrr.github.io/meka/galeri/** (27 görsel, lightbox)

---

## D) PC açıkken geçici tam site

`baslat.bat` → tünel penceresindeki `https://….trycloudflare.com` (PC kapanınca link ölür).

---

**Not:** Agent ortamından sizin adınıza Render/Railway hesabına giriş yapılamaz; kalıcı **tam site URL’si** ancak siz deploy ettikten sonra oluşur.
=======
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
>>>>>>> origin/main
