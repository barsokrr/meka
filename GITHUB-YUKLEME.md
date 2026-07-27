# GitHub'a Yükleme Rehberi

GitHub web sitesinde sürükle-bırak **en fazla ~100 dosya** kabul eder.  
`node_modules` (binlerce dosya) veya tüm klasörü sürüklediyseniz bu uyarıyı alırsınız.

**Çözüm:** Web arayüzü yerine **Git** kullanın.

---

## Yüklenmeyecek klasörler (önemli)

| Klasör / dosya | Neden |
|----------------|--------|
| `node_modules/` | Binlerce dosya, `npm install` ile oluşur |
| `.next/` | Build çıktısı |
| `.env` | Şifreler — asla GitHub'a koymayın |
| `*.db` | Yerel veritabanı |
| `public/images/products/_originals/` | Yedek görseller (isteğe bağlı) |

Bunlar `.gitignore` dosyasında zaten tanımlı.

---

## Adım 1 — Git kurulumu

1. https://git-scm.com/download/win adresinden **Git for Windows** indirin  
   veya PowerShell'de:
   ```powershell
   winget install Git.Git
   ```
2. Kurulumdan sonra **Cursor/terminali kapatıp yeniden açın**.

---

## Adım 2 — GitHub'da boş repo

1. https://github.com/new
2. Repo adı: örn. `baris-oker-site`
3. **Public** veya Private
4. README, .gitignore ekleme — **boş repo** oluşturun
5. Oluşan URL'yi kopyalayın: `https://github.com/KULLANICI/baris-oker-site.git`

---

## Adım 3 — İlk yükleme (terminal)

```powershell
cd "d:\Cursor proje\meka"

git init
git add .
git status
git commit -m "Initial commit: Barış Öker site"
git branch -M main
git remote add origin https://github.com/KULLANICI/baris-oker-site.git
git push -u origin main
```

`git status` çıktısında `node_modules` **görünmemeli**. Görünüyorsa durun ve `.gitignore` kontrol edin.

GitHub kullanıcı adı/şifre sorarsa **Personal Access Token** kullanın (Settings → Developer settings → Tokens).

---

## Adım 4 — Railway bağlantısı

1. https://railway.app → GitHub ile giriş
2. **New Project** → **Deploy from GitHub repo**
3. Az önce yüklediğiniz repoyu seçin

Detaylar: `GECICI-YAYIN.md`

---

## Alternatif: GitHub Desktop

Git komut satırı istemiyorsanız:

1. https://desktop.github.com kurun
2. **Add existing repository** → `d:\Cursor proje\meka`
3. **Publish repository**

Desktop da `.gitignore` sayesinde gereksiz dosyaları eklemez.

---

## Kaç dosya gidecek?

`node_modules` hariç yaklaşık **150–200** kaynak dosya (görseller dahil). Web arayüzüyle değil, Git ile sorunsuz yüklenir.
