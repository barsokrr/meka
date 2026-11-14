# Meka — yeni hostta tam site kurulumu

Bu rehber **tüm siteyi** (ana sayfa, projeler, ürünler, sepet, sipariş, admin) yeni bir sunucuda çalıştırır. SQLite veritabanı **kalıcı disk/volume** üzerinde tutulmalıdır.

---

## Seçenek 1 — Kendi VPS (Docker Compose) — önerilen kalıcı kurulum

Gereksinimler: Linux sunucu, Docker + Docker Compose, 1 GB+ RAM.

```bash
git clone https://github.com/barsokrr/meka.git
cd meka
cp .env.example .env
# .env içinde mutlaka:
#   AUTH_SECRET=güçlü-rastgele-anahtar
#   NEXT_PUBLIC_SITE_URL=https://sizin-domaininiz.com
nano .env
chmod +x scripts/host-kur.sh
./scripts/host-kur.sh
```

Veya doğrudan:

```bash
docker compose up -d --build
```

- Site: `http://SUNUCU_IP:3000` (veya reverse proxy ile 443)
- Veri: Docker volume `meka_sqlite_data` → `/data/prod.db`
- İlk açılışta `docker-start.sh` şema + boş DB için seed çalıştırır

**HTTPS (domain):** Sunucuda Caddy/Nginx ile `3000` portuna proxy yapın. Örnek Caddy:

```caddy
sizin-domaininiz.com {
  reverse_proxy localhost:3000
}
```

Güncelleme:

```bash
git pull
docker compose up -d --build
```

---

## Seçenek 2 — Render (Blueprint)

1. https://render.com/deploy?repo=https://github.com/barsokrr/meka  
2. Deploy bitince **Environment** → `NEXT_PUBLIC_SITE_URL` = Render URL’niz  
3. **Redeploy**  
4. `render.yaml` içinde `/data` disk tanımlıdır (SQLite kalıcı)

---

## Seçenek 3 — Railway

1. https://railway.app → GitHub → `barsokrr/meka`  
2. **Volume** mount: `/data`  
3. `DATABASE_URL=file:/data/prod.db`  
4. Diğer değişkenler: `.env.example`  
5. **Networking → Generate domain**  
6. `NEXT_PUBLIC_SITE_URL` = Railway domain → redeploy  

Detay: `GECICI-YAYIN.md`

---

## Ortam değişkenleri (özet)

| Değişken | Zorunlu | Açıklama |
|----------|---------|----------|
| `DATABASE_URL` | Evet | VPS/Docker: `file:/data/prod.db` |
| `AUTH_SECRET` | Evet | Admin JWT |
| `NEXT_PUBLIC_SITE_URL` | Evet | Tam site URL (https) |
| `ADMIN_EMAIL` | Önerilir | Sipariş bildirimi |
| `NEXT_PUBLIC_WHATSAPP` | Önerilir | İletişim |

Admin (seed sonrası): `/admin/login` — `README.md` içindeki varsayılan bilgiler; **canlıda şifreyi değiştirin**.

---

## Ne deploy edilmez?

- `public/kalip/`, `public/proje-bedeli/` statik araçlardır; ana Next.js uygulamasıyla aynı container’da `public/` altından sunulur.
- GitHub Pages yalnızca galeri için (`HOST-KURULUM.md` C bölümü); tam e-ticaret değildir.

---

## Sorun giderme

| Belirti | Çözüm |
|---------|--------|
| Her deploy’da siparişler siliniyor | Volume/disk bağlı değil; `DATABASE_URL=file:/data/prod.db` + `/data` mount |
| 502 / açılmıyor | `docker compose logs -f meka` — build hatası veya `PORT` |
| Admin girmiyor | Seed çalıştı mı? Volume dolu ama bozuksa yedekten `prod.db` geri yükleyin |

Agent ortamından **sizin** Render/Railway hesabına giriş yapılamaz; kalıcı URL için yukarıdaki adımlardan birini sizin tetiklemeniz gerekir. VPS için bu repodaki `docker-compose.yml` ile kurulum tek başına yeterlidir.