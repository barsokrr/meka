# Tam site host (telefon + bilgisayar)

Cloudflare tünel linkleri birçok telefonda **açılmaz**. Kalıcı adres için aşağıdaki yollardan **birini** seçin. **Yeni sunucu (VPS) kurulumu:** `YENI-HOST.md`

---

## A) Tam site — Render (Blueprint, ~5–10 dk)

1. **https://render.com/deploy?repo=https://github.com/barsokrr/meka**
2. Deploy tamamlansın.
3. Environment → `NEXT_PUBLIC_SITE_URL` = kendi Render URL’niz → **Redeploy**

SQLite: `render.yaml` içinde `/data` diski tanımlıdır.

---

## B) Tam site — Railway

1. https://railway.app → GitHub → **barsokrr/meka**
2. **Volume** mount: `/data` → `DATABASE_URL=file:/data/prod.db`
3. **Settings → Networking → Generate domain**
4. `NEXT_PUBLIC_SITE_URL` güncelle → redeploy

Detay: `GECICI-YAYIN.md`

---

## C) Tam site — kendi VPS (Docker)

```bash
git clone https://github.com/barsokrr/meka.git && cd meka
cp .env.example .env   # AUTH_SECRET + NEXT_PUBLIC_SITE_URL
docker compose up -d --build
```

Adım adım: **`YENI-HOST.md`**

---

## D) Sadece proje galerisi (sunucu yok)

GitHub Pages: **https://github.com/barsokrr/meka/settings/pages**  
→ Branch **`gh-pages`**, folder **`/`**

**https://barsokrr.github.io/meka/galeri/** — koleksiyon/sepet/admin **yok**

---

## E) PC açıkken geçici tam site

`baslat.bat` → `https://….trycloudflare.com` (PC kapanınca link ölür)

---

**Not:** Cloud agent hesabınıza Render/Railway’de giriş yapamaz; kalıcı URL için A, B veya C’yi sizin başlatmanız gerekir.