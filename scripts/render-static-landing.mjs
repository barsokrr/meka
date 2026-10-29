const CDN =
  process.env.STATIC_CDN_BASE ||
  "https://cdn.jsdelivr.net/gh/barsokrr/meka@gh-pages";
const hero = `${CDN}/images/interior-design/ev-tasarimi-1/05.jpg`;

console.log(`<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Barış Öker — İç mimarlık</title>
  <style>
    :root { --bg:#f5f2ed; --text:#2a2a2a; --muted:#666; }
    * { box-sizing:border-box; }
    body { margin:0; font-family:system-ui,sans-serif; background:var(--bg); color:var(--text); }
    .hero { min-height:52vh; background:linear-gradient(to top,rgba(0,0,0,.65),rgba(0,0,0,.25)), url('${hero}') center/cover; color:#fff; display:flex; align-items:flex-end; padding:2rem 1.25rem; }
    h1 { margin:0; font-size:1.75rem; font-weight:500; letter-spacing:.06em; }
    .sub { margin:.75rem 0 0; max-width:28rem; font-size:.95rem; line-height:1.5; opacity:.9; }
    nav { display:flex; flex-wrap:wrap; gap:.5rem; padding:1rem 1.25rem; border-bottom:1px solid #ddd5c8; background:#fff; position:sticky; top:0; z-index:2; }
    nav a { text-decoration:none; color:var(--text); font-size:.65rem; letter-spacing:.14em; text-transform:uppercase; border:1px solid #ddd5c8; padding:.55rem .85rem; }
    nav a.primary { background:var(--text); color:#fff; border-color:var(--text); }
    main { padding:1.25rem; max-width:40rem; }
    p { line-height:1.6; color:var(--muted); font-size:.95rem; }
    .note { margin-top:1.5rem; padding:1rem; border:1px solid #ddd5c8; background:#fff; font-size:.85rem; }
  </style>
</head>
<body>
  <div class="hero">
    <div>
      <h1>BARIŞ ÖKER</h1>
      <p class="sub">Mekânınıza karakter katan iç mimarlık — konut projeleri, danışmanlık ve seçilmiş parçalar.</p>
    </div>
  </div>
  <nav>
    <a class="primary" href="proje-bedeli/index.html?k=benimhesap2026">Proje bedeli hesaplama</a>
    <a href="galeri/index.html">Galeri (27 görsel)</a>
    <a href="https://wa.me/905065847351?text=${encodeURIComponent("Merhaba, iç mimarlık danışmanlığı hakkında bilgi almak istiyorum.")}">WhatsApp</a>
    <a href="mailto:barsokrr@gmail.com">E-posta</a>
    <a href="https://instagram.com/barisoker.studio">Instagram</a>
  </nav>
  <main>
    <p>Proje galerisinde dört konut tasarımının tüm mekân fotoğrafları yer alır. Görsele dokunarak büyütebilir, proje filtrelerini kullanabilirsiniz.</p>
    <div class="note">
      <strong>Tam web sitesi</strong> (koleksiyon, sepet, admin) sunucu gerektirir. Kalıcı adres için Railway deploy — <code>GECICI-YAYIN.md</code> ve <code>HOST-KURULUM.md</code>.
    </div>
  </main>
</body>
</html>`);
