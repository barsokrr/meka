# Geçici Yayın Rehberi (Domain Almadan)

Bu site **Next.js** olduğu için Streamlit kullanılamaz. İki yol var:

| Yöntem | Ne zaman? | PC açık kalmalı mı? |
|--------|-----------|---------------------|
| **baslat.bat** (Tunnel) | Hemen demo, telefona link | Evet |
| **Railway** | Sürekli geçici site (önerilen) | Hayır |

---

## A) Hemen — Tek tık (Tunnel)

1. `baslat.bat` dosyasına çift tıklayın
2. Açılan **Tunnel** penceresinde `https://....trycloudflare.com` linkini kopyalayın
3. Telefonda bu linki açın

**Admin:** `/admin/login`  
E-posta: `admin@barisoker.com` · Şifre: `BarisOker2026!`

---

## B) Sürekli geçici site — Railway (önerilen)

SQLite veritabanı + admin panel + sipariş formu **tam çalışır**. Ücretsiz alt alan adı: `xxx.up.railway.app`

### 1. Railway hesabı
- https://railway.app → GitHub ile giriş

### 2. Proje oluştur
- **New Project** → **Deploy from GitHub repo** (önce kodu GitHub'a yükleyin)  
  veya **Empty Project** → **Deploy from local** (`npx @railway/cli`)

### 3. Kalıcı disk (SQLite için zorunlu)
- Service → **Volumes** → Add Volume  
- Mount path: `/data`  
- Environment variable ekleyin:
  ```
  DATABASE_URL=file:/data/prod.db
  ```

### 4. Ortam değişkenleri
`.env.example` dosyasındaki değerleri Railway **Variables** bölümüne ekleyin:

| Değişken | Örnek |
|----------|--------|
| `DATABASE_URL` | `file:/data/prod.db` |
| `AUTH_SECRET` | güçlü rastgele anahtar |
| `NEXT_PUBLIC_SITE_URL` | Railway verdiği URL (deploy sonrası) |
| `NEXT_PUBLIC_EMAIL` | barsokrr@gmail.com |
| `ADMIN_EMAIL` | barsokrr@gmail.com |
| `NEXT_PUBLIC_WHATSAPP` | 905065847351 |
| `NEXT_PUBLIC_HESAP_KEY` | benimhesap2026 |

### 5. İlk deploy sonrası (bir kez)
Railway shell veya local:
```bash
npm run deploy:setup
```
(Ürünler + admin hesabı oluşturulur.)

### 6. Domain alınca
Railway → **Settings** → **Custom Domain** → kendi domaininizi ekleyin  
`NEXT_PUBLIC_SITE_URL` değerini yeni domain ile güncelleyin.

---

## Neden Vercel değil?

Vercel serverless ortamında SQLite kalıcı değildir; admin/sipariş kayıtları kaybolabilir. Railway + disk bu proje için daha güvenli.

---

## Komutlar

```bash
npm run dev          # Yerel geliştirme
npm run build:deploy # Railway build
npm run deploy:setup # İlk seed (Railway'de bir kez)
```
