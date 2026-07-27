# Barış Öker — Küratörlü Ev Dekorasyonu Web Sitesi

İç mimar **Barış Öker** için Türkiye genelinde sipariş alabilen e-ticaret / sipariş sitesi.

## Özellikler

-
- Sepet + sipariş talebi akışı (online ödeme yok — ilk sürüm)
- Türkiye il/ilçe seçimi
- Admin paneli (ürün CRUD, sipariş yönetimi)
- WhatsApp iletişim butonu
- KVKK, gizlilik ve mesafeli satış sayfaları
- Responsive, mobil öncelikli tasarım

## Gereksinimler

- Node.js 18+
- npm

## Kurulum

```bash
cd meka
npm install
npm run db:setup
npm run dev
```

Site: [http://localhost:3000](http://localhost:3000)

## Admin Giriş

- URL: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- E-posta: `admin@barisoker.com`
- Şifre: `BarisOker2026!`

> Production ortamında şifreyi mutlaka değiştirin.

## Ortam Değişkenleri

`.env.example` dosyasını `.env` olarak kopyalayın:

| Değişken | Açıklama |
|---|---|
| `DATABASE_URL` | SQLite veritabanı yolu |
| `AUTH_SECRET` | Admin JWT secret |
| `NEXT_PUBLIC_WHATSAPP` | WhatsApp numarası (90...) |
| `NEXT_PUBLIC_PHONE` | Telefon |
| `NEXT_PUBLIC_EMAIL` | E-posta |
| `ADMIN_EMAIL` | Sipariş bildirim e-postası |

## Komutlar

| Komut | Açıklama |
|---|---|
| `npm run dev` | Geliştirme sunucusu |
| `npm run build` | Production build |
| `npm run db:setup` | Veritabanı + seed |
| `npm run db:seed` | Sadece seed |

## Kargo Politikası

- 5.000 ₺ ve üzeri: **ücretsiz kargo**
- Altında: **150 ₺**

## Proje Yapısı

```
src/
  app/           → Sayfalar (App Router)
  components/    → UI bileşenleri
  lib/           → Utils, auth, validations
  store/         → Zustand sepet
  data/          → Türkiye illeri
prisma/          → Schema + seed
```

## Sonraki Adımlar

1. Gerçek ürün fotoğrafları
2. Domain ve deploy (Vercel önerilir)
3. Online ödeme (iyzico / PayTR)
4. SMTP e-posta yapılandırması
5. Admin şifresini değiştirme

## Marka

- **Barış Öker** — Mekânına karakter katan seçilmiş parçalar
