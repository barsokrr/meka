# Meka — yayın adresleri

## Eski adres (çalışmıyor)

`https://meka-production.up.railway.app` → **404** (Railway servisi kaldırılmış veya durmuş).

## Kalıcı tam site (önerilen)

1. https://railway.app → GitHub ile giriş  
2. **New Project** → **Deploy from GitHub** → `barsokrr/meka`  
3. **Volume** mount: `/data` → `DATABASE_URL=file:/data/prod.db`  
4. Deploy sonrası Railway’in verdiği adres: `https://XXXX.up.railway.app`  
5. Variables: `.env.example` + `NEXT_PUBLIC_SITE_URL` = yeni Railway URL  
6. Bir kez: `npm run deploy:setup` (Railway shell)

Detay: `GECICI-YAYIN.md`

## Kalıp mobil portal (GitHub Pages)

Repo **main** branch’e push sonrası (Settings → Pages → GitHub Actions):

**https://barsokrr.github.io/meka/**

(Sadece `/kalip` statik sayfaları; ürün/sepet/admin yok.)

## Yerel demo (PC açıkken)

`baslat.bat` veya `npm run dev` + `cloudflared tunnel --url http://localhost:3000`
