# Meka — yayın adresleri

## Site açılmıyorsa (sık nedenler)

| Denenen adres | Durum |
|---------------|--------|
| `https://meka-production.up.railway.app` | **404** — Railway servisi durmuş veya silinmiş |
| `https://barsokrr.github.io/meka/` | **404 veya sadece kalıp** — GitHub Pages tam Next.js sitesini yayınlamaz; repo’da Pages açılmamış olabilir |
| `http://localhost:3000` | Sadece kendi bilgisayarınızda `npm run dev` çalışırken |

**Ana sayfa (iç mimarlık galerisi dahil)** tam Next.js uygulamasıdır; **Railway (veya benzeri) ile yeniden deploy** gerekir. Adımlar: `GECICI-YAYIN.md` → **B) Railway**.

## İç mimarlık proje bedeli (tam sayfa algoritma)

TMMOB 2026 formülü — form, kırılım tablosu, KDV; Next.js iframe’siz **tek sayfa**:

**https://cdn.jsdelivr.net/gh/barsokrr/meka@gh-pages/proje-bedeli/index.html?k=benimhesap2026**

Kalıcı (GitHub Pages açıksa): **https://barsokrr.github.io/meka/proje-bedeli/?k=benimhesap2026**

Anahtarı yer imine kaydedin; bir kez açınca oturumda kilit kalkar.

---

## Telefon — proje galerisi (statik, tünel gerekmez)

`gh-pages` dalında 27 görselin tamamı:

**https://raw.githack.com/barsokrr/meka/gh-pages/galeri/index.html**

Kalıcı adres (bir kez ayar): GitHub → repo **meka** → **Settings → Pages** → Source: **Deploy from a branch** → **gh-pages** / **/** → Save. Sonra:

**https://barsokrr.github.io/meka/galeri/**

(Tam Next.js sitesi için Railway deploy — `GECICI-YAYIN.md`.)

---

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
