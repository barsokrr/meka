import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const designRoot = path.join(root, "public/images/interior-design");

const titles = {
  "ev-tasarimi-1": "Ev Tasarımı 1",
  "ev-tasarimi-2": "Ev Tasarımı 2",
  "ev-tasarimi-3": "Ev Tasarımı 3",
  "ev-tasarimi-4": "Ev Tasarımı 4",
};

const projects = fs
  .readdirSync(designRoot, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort()
  .map((slug) => {
    const dir = path.join(designRoot, slug);
    const images = fs
      .readdirSync(dir)
      .filter((f) => /\.(jpe?g|webp|png)$/i.test(f))
      .sort()
      .map((file) => ({
        src: `../images/interior-design/${slug}/${file}`,
        alt: `${titles[slug] ?? slug} — ${file}`,
      }));
    return { slug, title: titles[slug] ?? slug, images };
  });

const allImages = projects.flatMap((p) =>
  p.images.map((img) => ({ ...img, projectSlug: p.slug, projectTitle: p.title }))
);

const dataJson = JSON.stringify({ projects, allImages });

console.log(`<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Barış Öker — Proje Galerisi</title>
  <style>
    :root { --bg:#f5f2ed; --text:#2a2a2a; --muted:#6b6b6b; --border:#ddd5c8; }
    * { box-sizing: border-box; }
    body { margin:0; font-family: system-ui, -apple-system, sans-serif; background:var(--bg); color:var(--text); }
    header { padding:1.25rem 1rem 1rem; border-bottom:1px solid var(--border); background:#fff; }
    h1 { margin:0; font-size:1.35rem; font-weight:500; letter-spacing:.04em; }
    .sub { margin:.5rem 0 0; font-size:.9rem; color:var(--muted); line-height:1.5; }
    .filters { display:flex; flex-wrap:wrap; gap:.5rem; padding:1rem; position:sticky; top:0; background:var(--bg); z-index:5; border-bottom:1px solid var(--border); }
    .chip { border:1px solid var(--border); background:#fff; padding:.45rem .75rem; font-size:.65rem; letter-spacing:.12em; text-transform:uppercase; cursor:pointer; }
    .chip.active { background:var(--text); color:#fff; border-color:var(--text); }
    .grid { display:grid; grid-template-columns:repeat(2,1fr); gap:.35rem; padding:.35rem; }
    @media (min-width:640px) { .grid { grid-template-columns:repeat(3,1fr); gap:.5rem; padding:.75rem; } }
    @media (min-width:1024px) { .grid { grid-template-columns:repeat(4,1fr); } }
    .cell { position:relative; aspect-ratio:3/4; border:0; padding:0; background:#e8e4dc; cursor:pointer; overflow:hidden; }
    .cell img { width:100%; height:100%; object-fit:cover; display:block; }
    .lb { position:fixed; inset:0; background:rgba(20,20,20,.95); z-index:50; display:none; flex-direction:column; }
    .lb.open { display:flex; }
    .lb-top { display:flex; justify-content:space-between; align-items:center; padding:.75rem 1rem; color:#fff; font-size:.85rem; }
    .lb-body { flex:1; display:flex; align-items:center; justify-content:center; padding:0 .5rem 1rem; position:relative; }
    .lb-body img { max-width:100%; max-height:72vh; object-fit:contain; }
    .lb-nav { position:absolute; top:50%; transform:translateY(-50%); background:rgba(255,255,255,.12); border:1px solid rgba(255,255,255,.35); color:#fff; width:2.75rem; height:2.75rem; font-size:1.5rem; cursor:pointer; }
    .lb-prev { left:.25rem; } .lb-next { right:.25rem; }
    .lb-foot { display:flex; justify-content:center; gap:.75rem; padding-bottom:1rem; }
    .btn { border:1px solid rgba(255,255,255,.4); background:transparent; color:#fff; padding:.5rem 1rem; font-size:.75rem; text-transform:uppercase; letter-spacing:.1em; }
  </style>
</head>
<body>
  <header>
    <h1>Proje Galerisi</h1>
    <p class="sub">İç mimarlık — ${allImages.length} görsel, ${projects.length} konut projesi. Görsele dokunun.</p>
  </header>
  <div class="filters" id="filters"></div>
  <div class="grid" id="grid"></div>
  <div class="lb" id="lightbox" aria-hidden="true">
    <div class="lb-top">
      <span id="lb-meta"></span>
      <button type="button" class="btn" id="lb-close">Kapat</button>
    </div>
    <div class="lb-body">
      <button type="button" class="lb-nav lb-prev" id="lb-prev" aria-label="Önceki">‹</button>
      <img id="lb-img" alt="" />
      <button type="button" class="lb-nav lb-next" id="lb-next" aria-label="Sonraki">›</button>
    </div>
    <div class="lb-foot">
      <button type="button" class="btn" id="lb-prev-m">Önceki</button>
      <button type="button" class="btn" id="lb-next-m">Sonraki</button>
    </div>
  </div>
  <script>
    const DATA = ${dataJson};
    let active = "all";
    let list = DATA.allImages;
    let lbIndex = null;
    const grid = document.getElementById("grid");
    const filters = document.getElementById("filters");
    const lb = document.getElementById("lightbox");
    const lbImg = document.getElementById("lb-img");
    const lbMeta = document.getElementById("lb-meta");

    function renderFilters() {
      filters.innerHTML = "";
      const mk = (slug, label) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "chip" + (active === slug ? " active" : "");
        b.textContent = label;
        b.onclick = () => { active = slug; applyFilter(); renderFilters(); renderGrid(); };
        filters.appendChild(b);
      };
      mk("all", "Tümü (" + DATA.allImages.length + ")");
      DATA.projects.forEach(p => mk(p.slug, p.title + " (" + p.images.length + ")"));
    }

    function applyFilter() {
      list = active === "all" ? DATA.allImages : DATA.allImages.filter(i => i.projectSlug === active);
    }

    function renderGrid() {
      grid.innerHTML = "";
      list.forEach((item, idx) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "cell";
        btn.innerHTML = '<img src="' + item.src + '" alt="' + item.alt.replace(/"/g, "&quot;") + '" loading="lazy" />';
        btn.onclick = () => openLb(idx);
        grid.appendChild(btn);
      });
    }

    function openLb(i) { lbIndex = i; updateLb(); lb.classList.add("open"); document.body.style.overflow = "hidden"; }
    function closeLb() { lb.classList.remove("open"); lbIndex = null; document.body.style.overflow = ""; }
    function step(d) {
      if (lbIndex === null || !list.length) return;
      lbIndex = (lbIndex + d + list.length) % list.length;
      updateLb();
    }
    function updateLb() {
      const item = list[lbIndex];
      lbImg.src = item.src;
      lbImg.alt = item.alt;
      lbMeta.textContent = item.projectTitle + " · " + (lbIndex + 1) + " / " + list.length;
    }

    document.getElementById("lb-close").onclick = closeLb;
    document.getElementById("lb-prev").onclick = () => step(-1);
    document.getElementById("lb-next").onclick = () => step(1);
    document.getElementById("lb-prev-m").onclick = () => step(-1);
    document.getElementById("lb-next-m").onclick = () => step(1);
    lb.onclick = (e) => { if (e.target === lb) closeLb(); };

    applyFilter();
    renderFilters();
    renderGrid();
  </script>
</body>
</html>`);
