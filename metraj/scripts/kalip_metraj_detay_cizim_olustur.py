#!/usr/bin/env python3
"""Kalıp metraj detay çizimleri — SVG + HTML + Excel özet."""

from pathlib import Path

from openpyxl import Workbook
from openpyxl.drawing.image import Image as XLImage
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.utils import get_column_letter

ROOT = Path(__file__).resolve().parents[1]
CIZIM = ROOT / "cizimler"
OUT_HTML = Path(__file__).resolve().parents[2] / "public" / "kalip" / "metraj-cizim.html"
OUT_XLSX = ROOT / "Kalip_Metraj_Detay_Cizim.xlsx"

L, W = 51.18, 20.09  # kat brüt m
CORE = 45.0  # merdiven+asansör m²/kat

KOTLAR = [
    ("Temel", "Radye", "h=0,80 m", 120.4, {"perde": 0, "kolon": 0, "doseme": 0, "kiris": 0}),
    ("Bodrum", "±0,00 altı", "H=4,00 m", 1336.0, {"perde": 1152.7, "kolon": 184.0, "doseme": 0, "kiris": 0}),
    ("±0,00", "Zemin", "H=3,80 m", 2059.2, {"perde": 770.8, "kolon": 174.6, "doseme": 943.4, "kiris": 170.4}),
    ("+4,00", "1. Kat", "H=3,80 m", 2227.7, {"perde": 770.8, "kolon": 174.6, "doseme": 943.4, "kiris": 339.0}),
    ("+8,00", "2. Kat", "H=3,80 m", 2199.7, {"perde": 770.8, "kolon": 174.6, "doseme": 943.4, "kiris": 310.9}),
    ("+12,00", "3. Kat", "H=3,80 m", 2199.7, {"perde": 770.8, "kolon": 174.6, "doseme": 943.4, "kiris": 310.9}),
    ("+16,00", "Çatı", "—", 1253.9, {"perde": 0, "kolon": 0, "doseme": 943.4, "kiris": 310.5}),
]

COLORS = {
    "perde": "#2563eb",
    "kolon": "#dc2626",
    "doseme": "#16a34a",
    "kiris": "#d97706",
    "core": "#94a3b8",
    "radye": "#7c3aed",
}


def svg_plan_typical() -> str:
    """Tipik kat planı — metraj bölgeleri şematik."""
    scale = 7.5
    pw, ph = L * scale, W * scale
    pad = 40
    cw, ch = pw + pad * 2, ph + pad * 2 + 80
    # core ~ 9x5 m approx center-right
    cx, cy, cw_core, ch_core = pw * 0.55, ph * 0.35, 9 * scale, 5 * scale
    net_d = 1028.206 - 35.556 - 6.357 - 45

    cols = [
        (pw * 0.12, ph * 0.2), (pw * 0.35, ph * 0.2), (pw * 0.75, ph * 0.2),
        (pw * 0.12, ph * 0.75), (pw * 0.35, ph * 0.75), (pw * 0.75, ph * 0.75),
        (pw * 0.5, ph * 0.55), (pw * 0.85, ph * 0.5),
    ]

    col_circles = "".join(
        f'<circle cx="{pad + x}" cy="{pad + y}" r="6" fill="{COLORS["kolon"]}" opacity="0.9"/>'
        for x, y in cols
    )

    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {cw} {ch}" width="100%" style="max-width:560px;background:#fafafa">
  <defs>
    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" stroke-width="0.5"/>
    </pattern>
    <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 Z" fill="#334155"/>
    </marker>
  </defs>
  <text x="{cw/2}" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="#1f4e79">TİPİK KAT PLANI — KALIP METRAJ ŞEMASI (±0,00 ref.)</text>
  <text x="{cw/2}" y="38" text-anchor="middle" font-size="9" fill="#64748b">Brüt {L}×{W} m = 1.028,2 m² · Net döşeme ≈ 941,3 m²/kat · Proje: MEBİZ.73-10-25-01-SU-001-R0</text>

  <g transform="translate({pad},{pad})">
    <rect width="{pw}" height="{ph}" fill="url(#grid)"/>
    <!-- Perde band -->
    <rect width="{pw}" height="{ph}" fill="none" stroke="{COLORS['perde']}" stroke-width="14" opacity="0.35"/>
    <rect width="{pw}" height="{ph}" fill="none" stroke="{COLORS['perde']}" stroke-width="2"/>
    <!-- Döşeme alanı -->
    <rect x="7" y="7" width="{pw-14}" height="{ph-14}" fill="{COLORS['doseme']}" opacity="0.15"/>
    <!-- Core boşluk -->
    <rect x="{cx}" y="{cy}" width="{cw_core}" height="{ch_core}" fill="{COLORS['core']}" opacity="0.4" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4,3"/>
    <text x="{cx + cw_core/2}" y="{cy + ch_core/2}" text-anchor="middle" font-size="8" fill="#475569">MERDİVEN+</text>
    <text x="{cx + cw_core/2}" y="{cy + ch_core/2 + 10}" text-anchor="middle" font-size="8" fill="#475569">ASANSÖR</text>
    <text x="{cx + cw_core/2}" y="{cy + ch_core/2 + 22}" text-anchor="middle" font-size="7" fill="#64748b">45 m²/kat düşüm</text>
    {col_circles}
  </g>

  <!-- Boyut okları -->
  <line x1="{pad}" y1="{pad+ph+15}" x2="{pad+pw}" y2="{pad+ph+15}" stroke="#334155" marker-end="url(#arrow)" marker-start="url(#arrow)"/>
  <text x="{pad+pw/2}" y="{pad+ph+28}" text-anchor="middle" font-size="10" fill="#334155">{L} m</text>
  <line x1="{pad+pw+15}" y1="{pad}" x2="{pad+pw+15}" y2="{pad+ph}" stroke="#334155" marker-end="url(#arrow)" marker-start="url(#arrow)"/>
  <text x="{pad+pw+28}" y="{pad+ph/2}" text-anchor="middle" font-size="10" fill="#334155" transform="rotate(90 {pad+pw+28} {pad+ph/2})">{W} m</text>

  <!-- Lejant -->
  <g transform="translate({pad}, {pad+ph+45})">
    <rect x="0" y="0" width="12" height="12" fill="{COLORS['perde']}" opacity="0.5"/><text x="16" y="10" font-size="9">Perde (çift yüz) — CL ≈ 103,1 m/kat</text>
    <rect x="180" y="0" width="12" height="12" fill="{COLORS['doseme']}" opacity="0.5"/><text x="196" y="10" font-size="9">Döşeme altı net</text>
    <rect x="0" y="16" width="12" height="12" fill="{COLORS['kolon']}"/><text x="16" y="26" font-size="9">Kolon — 13 ad/kat · çevre 45,96 m</text>
    <rect x="180" y="16" width="12" height="12" fill="{COLORS['core']}" opacity="0.5"/><text x="196" y="26" font-size="9">Boşluk düşümü</text>
  </g>
</svg>'''


def svg_section_elevation() -> str:
    """Kot kesiti — düşey metraj."""
    floors = [
        ("+16,00", "Çatı döş.", 0, COLORS["doseme"]),
        ("+12,00", "3. Kat", 3.8, COLORS["perde"]),
        ("+8,00", "2. Kat", 3.8, COLORS["perde"]),
        ("+4,00", "1. Kat", 3.8, COLORS["perde"]),
        ("±0,00", "Zemin", 3.8, COLORS["perde"]),
        ("Bodrum", "H=4,0", 4.0, "#6366f1"),
        ("Radye", "h=0,8", 0.8, COLORS["radye"]),
    ]
    unit = 28
    x0, y0 = 120, 30
    wall_w = 180
    total_h = sum(h for _, _, h, _ in floors) * unit + 20

    blocks = []
    y = y0
    for label, sub, h, color in floors:
        bh = max(h * unit, 18)
        blocks.append(
            f'<rect x="{x0}" y="{y}" width="{wall_w}" height="{bh}" fill="{color}" opacity="0.25" stroke="{color}" stroke-width="1.5"/>'
            f'<text x="{x0 - 8}" y="{y + bh/2 + 4}" text-anchor="end" font-size="10" font-weight="600" fill="#1e293b">{label}</text>'
            f'<text x="{x0 + wall_w/2}" y="{y + bh/2 + 4}" text-anchor="middle" font-size="9" fill="#475569">{sub}</text>'
        )
        if h > 0 and label not in ("Radye",):
            blocks.append(
                f'<line x1="{x0 + wall_w + 10}" y1="{y}" x2="{x0 + wall_w + 50}" y2="{y}" stroke="#94a3b8" stroke-dasharray="2,2"/>'
                f'<text x="{x0 + wall_w + 55}" y="{y + 4}" font-size="8" fill="#64748b">kot</text>'
            )
        y += bh

    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 {total_h + 60}" width="100%" style="max-width:400px;background:#fafafa">
  <text x="200" y="18" text-anchor="middle" font-size="12" font-weight="700" fill="#1f4e79">KESİT — KOT &amp; DÜŞEY KALIP YÜKSEKLİKLERİ</text>
  {''.join(blocks)}
  <text x="200" y="{total_h + 45}" text-anchor="middle" font-size="8" fill="#64748b">Brüt kat: 4,00 m · Net üst perde/kolon: 3,80 m · Bodrum: 4,00 m · d=döşeme 20 cm</text>
</svg>'''


def svg_kirik_formula() -> str:
    """Kırık ölçü formül şeması."""
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 200" width="100%" style="max-width:520px;background:#fff">
  <text x="260" y="18" text-anchor="middle" font-size="12" font-weight="700" fill="#1f4e79">KIRIK ÖLÇÜ (a × b × c) — ELEMAN TİPLERİ</text>
  <g transform="translate(20,35)">
    <rect width="140" height="70" rx="6" fill="#eff6ff" stroke="#2563eb"/>
    <text x="70" y="22" text-anchor="middle" font-size="10" font-weight="600">PERDE</text>
    <text x="70" y="38" text-anchor="middle" font-size="8">a=boy · b=H · c=2×adet</text>
    <text x="70" y="52" text-anchor="middle" font-size="8">çift yüz</text>
  </g>
  <g transform="translate(190,35)">
    <rect width="140" height="70" rx="6" fill="#fef2f2" stroke="#dc2626"/>
    <text x="70" y="22" text-anchor="middle" font-size="10" font-weight="600">KOLON</text>
    <text x="70" y="38" text-anchor="middle" font-size="8">a=çevre · b=H · c=adet</text>
    <text x="70" y="52" text-anchor="middle" font-size="8">2×(en+boy)</text>
  </g>
  <g transform="translate(360,35)">
    <rect width="140" height="70" rx="6" fill="#f0fdf4" stroke="#16a34a"/>
    <text x="70" y="22" text-anchor="middle" font-size="10" font-weight="600">DÖŞEME ALT</text>
    <text x="70" y="38" text-anchor="middle" font-size="8">a×b brüt − düşümler</text>
    <text x="70" y="52" text-anchor="middle" font-size="8">perde+kolon+boşluk</text>
  </g>
  <g transform="translate(105,120)">
    <rect width="140" height="70" rx="6" fill="#fffbeb" stroke="#d97706"/>
    <text x="70" y="22" text-anchor="middle" font-size="10" font-weight="600">KİRİŞ</text>
    <text x="70" y="38" text-anchor="middle" font-size="8">Yan: L×0,40×2</text>
    <text x="70" y="52" text-anchor="middle" font-size="8">Alt: L×0,325</text>
  </g>
  <g transform="translate(275,120)">
    <rect width="140" height="70" rx="6" fill="#f5f3ff" stroke="#7c3aed"/>
    <text x="70" y="22" text-anchor="middle" font-size="10" font-weight="600">RADYE YAN</text>
    <text x="70" y="38" text-anchor="middle" font-size="8">a=kenar · b=0,80</text>
    <text x="70" y="52" text-anchor="middle" font-size="8">c=1 · çevre 150,5 m</text>
  </g>
  <text x="260" y="195" text-anchor="middle" font-size="9" font-weight="700" fill="#b45309">GENEL TOPLAM: 11.773,4 m² (+ %5 fire → 12.362 m²)</text>
</svg>'''


def write_svgs():
    CIZIM.mkdir(parents=True, exist_ok=True)
    files = {
        "01_tipik_kat_plani.svg": svg_plan_typical(),
        "02_kot_kesit.svg": svg_section_elevation(),
        "03_kirik_olcu_sema.svg": svg_kirik_formula(),
    }
    for name, content in files.items():
        (CIZIM / name).write_text(content, encoding="utf-8")
    return files


def write_html(svg_files: dict):
    svgs_inline = {k: v for k, v in svg_files.items()}
    cards = ""
    titles = {
        "01_tipik_kat_plani.svg": ("Tipik Kat Planı", "Perde, kolon, döşeme ve boşluk bölgeleri"),
        "02_kot_kesit.svg": ("Kot Kesiti", "Düşey yükseklikler ve kat kotları"),
        "03_kirik_olcu_sema.svg": ("Kırık Ölçü Şeması", "a×b×c formül tipleri"),
    }
    for fname, svg in svgs_inline.items():
        title, sub = titles[fname]
        cards += f'''
<section class="card">
  <h2>{title}</h2>
  <p class="sub">{sub}</p>
  <div class="svg-wrap">{svg}</div>
</section>'''

    kot_rows = ""
    for kat, sub, h, top, d in KOTLAR:
        kot_rows += f"<tr><td>{kat} ({sub})</td><td>{h}</td><td>{d['perde'] or '—'}</td><td>{d['kolon'] or '—'}</td><td>{d['doseme'] or '—'}</td><td>{d['kiris'] or '—'}</td><td><b>{top}</b></td></tr>"

    html = f'''<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>
<meta name="theme-color" content="#1f4e79"/>
<title>Kalıp Metraj Detay Çizim</title>
<style>
:root{{--brand:#1f4e79;--card:#fff;--muted:#64748b;--line:#e2e8f0}}
*{{box-sizing:border-box}}body{{margin:0;font-family:system-ui,sans-serif;background:#eef2f7;color:#1a1a1a;line-height:1.45}}
header{{background:linear-gradient(160deg,#1f4e79,#0f2744);color:#fff;padding:1.2rem 1rem;text-align:center}}
header h1{{margin:0;font-size:1.15rem}}header p{{margin:.35rem 0 0;font-size:.82rem;opacity:.9}}
main{{max-width:580px;margin:0 auto;padding:1rem 1rem 2rem}}
.card{{background:var(--card);border-radius:12px;padding:1rem;margin:.75rem 0;box-shadow:0 4px 16px rgba(0,0,0,.06)}}
.card h2{{margin:0;font-size:1rem;color:var(--brand)}}
.sub{{margin:.25rem 0 .75rem;font-size:.8rem;color:var(--muted)}}
.svg-wrap{{overflow-x:auto;border:1px solid var(--line);border-radius:8px;background:#fafafa}}
table{{width:100%;border-collapse:collapse;font-size:.78rem}}
td,th{{padding:.35rem .2rem;border-bottom:1px solid var(--line);text-align:right}}
th{{text-align:left;color:var(--muted)}}
.scroll-x{{overflow-x:auto}}
.back{{display:block;padding:1rem;color:var(--brand);font-weight:600;text-decoration:none}}
</style>
</head>
<body>
<a class="back" href="index.html">← Portal</a>
<header>
  <h1>Kalıp Metraj Detay Çizimi</h1>
  <p>Karşıyaka Ortaokulu · 11.773,4 m² · Kırık ölçü</p>
</header>
<main>
{cards}
<div class="card scroll-x">
  <h2>Kat Bazlı Metraj (m²)</h2>
  <p class="sub">KIRIK ÖLÇÜ cetvelinden — detay: Karsiyaka_Ortaokulu_Kalip_KIRIK_OLCU.xlsx</p>
  <table>
    <tr><th>Kot/Kat</th><th>H(m)</th><th>Perde</th><th>Kolon</th><th>Döşeme</th><th>Kiriş</th><th>Toplam</th></tr>
    {kot_rows}
    <tr><th colspan="6">GENEL TOPLAM</th><th><b>11.773,4</b></th></tr>
  </table>
</div>
<div class="card">
  <h2>Döşeme altı — kat kırılımı (±0 örnek)</h2>
  <table>
    <tr><th>Kalem</th><th>m²</th></tr>
    <tr><td>Brüt 51,18×20,09</td><td>1.028,21</td></tr>
    <tr><td>Perde izdüşümü (−)</td><td>35,56</td></tr>
    <tr><td>Kolon izdüşümü (−)</td><td>6,36</td></tr>
    <tr><td>Merdiven+asansör (−)</td><td>45,00</td></tr>
    <tr><th>Net döşeme altı / kat</th><th>941,29</th></tr>
    <tr><th>× 5 kat</th><th>4.706,5</th></tr>
  </table>
</div>
</main>
</body>
</html>'''
    OUT_HTML.write_text(html, encoding="utf-8")


def write_excel():
    wb = Workbook()
    ws = wb.active
    ws.title = "Metraj Detay"
    hdr = PatternFill("solid", fgColor="1F4E79")
    thin = Side(style="thin", color="FFAAAAAA")
    brd = Border(left=thin, right=thin, top=thin, bottom=thin)

    ws.merge_cells("A1:H1")
    ws["A1"] = "KALIP METRAJ DETAY ÇİZİM CETVELİ — Karşıyaka Ortaokulu"
    ws["A1"].font = Font(bold=True, size=14, color="1F4E79")

    headers = ["Sıra", "Bölüm", "Kot", "Net H", "Eleman", "a (m)", "b (m)", "c", "m²", "Formül / Not"]
    for c, h in enumerate(headers, 1):
        cell = ws.cell(row=3, column=c, value=h)
        cell.fill = hdr
        cell.font = Font(bold=True, color="FFFFFF")
        cell.border = brd

    rows = [
        (1, "Radye", "Temel", "0,80", "Yan kenar 1-12", "Σ kenar", "0,80", "1", 120.4, "Çevre 150,5×0,80"),
        (2, "Bodrum", "±0 alt", "4,00", "Perde çift yüz", "133,8", "4,00", "2", 1152.7, "Boşluk −19,2"),
        (3, "Bodrum", "±0 alt", "4,00", "Kolon", "45,96", "4,00", "13", 184.0, "150/35+180/30+60/60"),
        (4, "Üst", "0/+4/+8/+12", "3,80", "Perde ×4 aralık", "103,1", "3,80", "2×4", 3468.8, "Boşluk −51,2"),
        (5, "Üst", "0/+4/+8/+12", "3,80", "Kolon ×4", "45,96", "3,80", "13×4", 699.2, ""),
        (6, "Döşeme", "±0/+4/+8/+12/+16", "—", "Alt kalıp ×5", "941,29", "1", "5", 4706.5, "Brüt−düşüm"),
        (7, "Kiriş", "5 kat", "0,40/0,325", "Yan+alt", "ΣL", "—", "—", 1441.8, "Detay: KIRIS sayfası"),
    ]
    for i, row in enumerate(rows, 4):
        for c, val in enumerate(row, 1):
            ws.cell(row=i, column=c, value=val).border = brd

    r = 4 + len(rows) + 1
    ws.cell(row=r, column=8, value="TOPLAM").font = Font(bold=True)
    ws.cell(row=r, column=9, value=11773.4).font = Font(bold=True)

    # Kat kırılım sayfası
    ws2 = wb.create_sheet("Kat Kırılım")
    h2 = ["Kat", "Perde", "Kolon", "Döşeme", "Kiriş", "Toplam"]
    for c, h in enumerate(h2, 1):
        ws2.cell(row=1, column=c, value=h).font = Font(bold=True)
    for i, (kat, _, _, top, d) in enumerate(KOTLAR, 2):
        ws2.cell(row=i, column=1, value=kat)
        ws2.cell(row=i, column=2, value=d["perde"] or "")
        ws2.cell(row=i, column=3, value=d["kolon"] or "")
        ws2.cell(row=i, column=4, value=d["doseme"] or "")
        ws2.cell(row=i, column=5, value=d["kiris"] or "")
        ws2.cell(row=i, column=6, value=top)

    for col in range(1, 11):
        ws.column_dimensions[get_column_letter(col)].width = 14

    wb.save(OUT_XLSX)


def main():
    svg_files = write_svgs()
    write_html(svg_files)
    write_excel()
    print(f"SVG: {CIZIM}")
    print(f"HTML: {OUT_HTML}")
    print(f"Excel: {OUT_XLSX}")


if __name__ == "__main__":
    main()
