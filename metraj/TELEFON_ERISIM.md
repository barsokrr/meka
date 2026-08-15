# Telefondan Kalıp Paketine Erişim

Excel dosyaları telefonda açılmaz. Aşağıdaki yollardan **birini** kullanın.

---

## Yol 1 — Site linki (en kolay, sürekli)

Site Railway’de yayında ise telefonda şu adresi açın:

```
https://SITENIZ.up.railway.app/kalip
```

veya kendi domaininiz:

```
https://domaininiz.com/kalip
```

**Yer imine ekleyin** → uygulama gibi kullanırsınız.

Alt sayfalar:
- `/kalip/teklif.html` — fiyat teklifi
- `/kalip/dashboard.html` — proje dashboard
- `/kalip/ozet.html` — proje özeti
- `/kalip/telefon.html` — tek sayfa (4 sekme, alt menü)

---

## Yol 2 — GitHub Pages (domain gerekmez)

PR **main**’e merge edildikten sonra:

1. GitHub → repo **barsokrr/meka** → **Settings** → **Pages**
2. **Source:** GitHub Actions
3. `main` branch’e push olunca workflow otomatik yayınlar
4. Telefonda açın:

```
https://barsokrr.github.io/meka/
```

(Bu adres doğrudan kalıp mobil portalını açar.)

---

## Yol 3 — Tek HTML dosyası (hemen, internetsiz)

1. Bilgisayardan `public/kalip/telefon.html` dosyasını **WhatsApp / e-posta / Google Drive** ile telefona gönderin
2. Telefonda dosyayı açın (Safari / Chrome)
3. **Paylaş → Ana Ekrana Ekle**

İnternet gerekmez; özet, teklif, dashboard ve tablolar alt menüde 4 sekme.

---

## Yol 4 — Hızlı demo (PC açıkken)

1. Bilgisayarda `npm run dev`
2. Ayrı terminal: `npx cloudflared tunnel --url http://localhost:3000`
3. Çıkan `https://....trycloudflare.com/kalip` linkini telefonda açın

---

## Excel ne zaman?

| Cihaz | Kullan |
|--------|--------|
| Telefon | `/kalip` veya `telefon.html` |
| Masaüstü | `metraj/*.xlsx` (dashboard, teklif, metraj) |

---

## Sorun giderme

| Sorun | Çözüm |
|--------|--------|
| Link 404 | Deploy / merge bekleyin veya Yol 3 |
| PDF açılmıyor | PDF kullanmayın; HTML portal yeterli |
| Excel bozuk görünüm | Normal; telefonda HTML kullanın |
