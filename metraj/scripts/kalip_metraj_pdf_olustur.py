#!/usr/bin/env python3
"""Metraj alanları görünüş çizimleri → çok sayfalı PDF + mobil görüntüleyici."""

import io
import tempfile
from pathlib import Path

from reportlab.graphics import renderPDF
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.units import cm
from reportlab.pdfgen import canvas
from svglib.svglib import svg2rlg

ROOT = Path(__file__).resolve().parents[1]
CIZIM_POZ = ROOT / "cizimler" / "poz"
OUT_PDF_PUBLIC = Path(__file__).resolve().parents[2] / "public" / "kalip" / "metraj-alanlari.pdf"
OUT_PDF_METRAJ = ROOT / "Kalip_Metraj_Alanlari.pdf"
OUT_HTML = Path(__file__).resolve().parents[2] / "public" / "kalip" / "metraj-pdf.html"

L, W = 51.18, 20.09
PAGE = landscape(A4)
PW, PH = PAGE

COLORS = {
    "perde": "#2563eb",
    "kolon": "#dc2626",
    "doseme": "#16a34a",
    "kiris": "#d97706",
    "core": "#94a3b8",
    "radye": "#7c3aed",
    "void": "#f472b6",
    "bg": "#f8fafc",
    "dim": "#64748b",
}

POZLAR = [
    {
        "kod": "A",
        "ad": "Radye temel yan kalıbı",
        "m2": 120.4,
        "pay": "1,0%",
        "formul": "150,5 m × 0,80 m = 120,4 m²",
        "detay": "Radye döşeme (RD01) çevresinde h=80 cm yan kalıp. T.Ü.K. −5,10.",
        "color": COLORS["radye"],
        "view_plan": "radye",
        "view_section": "radye_section",
    },
    {
        "kod": "B",
        "ad": "Bodrum perde kalıbı (çift yüz)",
        "m2": 1152.7,
        "pay": "9,8%",
        "formul": "2 × 133,8 m × 4,0 m − boşluk = 1.152,7 m²",
        "detay": "Bodrum perde BP1, BP17, BP18, P109… Çift yüz · H=4,00 m.",
        "color": COLORS["perde"],
        "view_plan": "bodrum_perde",
        "view_section": "perde_section",
        "section_note": "H = 4,00 m (bodrum)",
    },
    {
        "kod": "C",
        "ad": "Bodrum kolon kalıbı",
        "m2": 184.0,
        "pay": "1,6%",
        "formul": "45,96 m × 4,0 m × 13 ad = 184,0 m²",
        "detay": "13 kolon · çevre toplam 45,96 m · H=4,00 m.",
        "color": COLORS["kolon"],
        "view_plan": "bodrum_kolon",
        "view_section": "kolon_section",
        "section_note": "H = 4,00 m",
    },
    {
        "kod": "D",
        "ad": "Üst kat perde kalıbı (×4 kat)",
        "m2": 3468.8,
        "pay": "29,5%",
        "formul": "2 × 103,1 m × 3,8 m × 4 kat − boşluk = 3.468,8 m²",
        "detay": "±0,00 / +4 / +8 / +12 kotları · çift yüz · net H=3,80 m.",
        "color": COLORS["perde"],
        "view_plan": "ust_perde",
        "view_section": "perde_section",
        "section_note": "H = 3,80 m (üst kat)",
    },
    {
        "kod": "E",
        "ad": "Üst kat kolon kalıbı (×4 kat)",
        "m2": 699.2,
        "pay": "5,9%",
        "formul": "45,96 m × 3,8 m × 13 ad × 4 = 699,2 m²",
        "detay": "13 kolon/kat · 4 kat aralığı · net H=3,80 m.",
        "color": COLORS["kolon"],
        "view_plan": "ust_kolon",
        "view_section": "kolon_section",
        "section_note": "H = 3,80 m × 4 kat",
    },
    {
        "kod": "F",
        "ad": "Döşeme alt kalıbı (×5 kat)",
        "m2": 4706.5,
        "pay": "40,0%",
        "formul": "(1.028,2 − 35,6 − 6,4 − 45) × 5 = 4.706,5 m²",
        "detay": "±0 … +16 döşeme altı · brüt 51,18×20,09 m · net 941,3 m²/kat.",
        "color": COLORS["doseme"],
        "view_plan": "doseme",
        "view_section": "doseme_section",
    },
    {
        "kod": "G",
        "ad": "Kiriş kalıbı yan + alt (×5 kat)",
        "m2": 1441.8,
        "pay": "12,2%",
        "formul": "ΣL × (2×0,40 + 0,325) · H1 20/60 vb.",
        "detay": "Kaburga kiriş yan 40 cm + alt 32,5 cm · 5 kat toplamı.",
        "color": COLORS["kiris"],
        "view_plan": "kiris",
        "view_section": "kiris_section",
    },
]


def _cols_svg(scale, pw, ph, pad=0):
    positions = [
        (pw * 0.12, ph * 0.2), (pw * 0.35, ph * 0.2), (pw * 0.75, ph * 0.2),
        (pw * 0.12, ph * 0.75), (pw * 0.35, ph * 0.75), (pw * 0.75, ph * 0.75),
        (pw * 0.5, ph * 0.55), (pw * 0.85, ph * 0.5),
    ]
    return "".join(
        f'<circle cx="{pad + x}" cy="{pad + y}" r="5" fill="{COLORS["kolon"]}" opacity="0.9"/>'
        for x, y in positions
    )


def _building_outline(pw, ph, pad, stroke="#cbd5e1", sw=1):
    return (
        f'<rect x="{pad}" y="{pad}" width="{pw}" height="{ph}" '
        f'fill="{COLORS["bg"]}" stroke="{stroke}" stroke-width="{sw}"/>'
    )


def svg_radye_plan() -> str:
    pad, pw, ph = 30, 340, 200
    cw, ch = pw + pad * 2, ph + pad * 2 + 60
    c = COLORS["radye"]
    inner = f'<rect x="{pad+18}" y="{pad+12}" width="{pw-36}" height="{ph-24}" fill="#e2e8f0" opacity="0.5"/>'
    strip = (
        f'<rect x="{pad}" y="{pad}" width="{pw}" height="{ph}" fill="none" stroke="{c}" stroke-width="16" opacity="0.55"/>'
        f'<rect x="{pad}" y="{pad}" width="{pw}" height="{ph}" fill="none" stroke="{c}" stroke-width="2"/>'
    )
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {cw} {ch}">
  <text x="{cw/2}" y="18" text-anchor="middle" font-size="11" font-weight="700" fill="{c}">PLAN GÖRÜNÜŞ — RADYE YAN KALIP (metraj alanı)</text>
  {_building_outline(pw, ph, pad)}{inner}{strip}
  <text x="{pad+pw/2}" y="{pad+ph/2}" text-anchor="middle" font-size="9" fill="#475569">Radye döşeme RD01</text>
  <text x="{pad+pw/2}" y="{pad+ph/2+12}" text-anchor="middle" font-size="8" fill="{c}">Mor bant = yan kalıp · h=80 cm</text>
  <text x="{pad+pw/2}" y="{pad+ph+35}" text-anchor="middle" font-size="8" fill="{COLORS["dim"]}">Çevre ≈ 150,5 m · 150,5×0,80 = 120,4 m²</text>
</svg>'''


def svg_radye_section() -> str:
    c = COLORS["radye"]
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 160">
  <text x="180" y="16" text-anchor="middle" font-size="10" font-weight="700" fill="{c}">KESİT GÖRÜNÜŞ — RADYE YAN</text>
  <rect x="80" y="50" width="200" height="24" fill="#e2e8f0" stroke="#64748b"/>
  <rect x="80" y="74" width="200" height="32" fill="{c}" opacity="0.35" stroke="{c}"/>
  <text x="180" y="68" text-anchor="middle" font-size="8">Radye döşeme</text>
  <text x="180" y="92" text-anchor="middle" font-size="8" fill="{c}">Yan kalıp h=0,80 m</text>
  <line x1="60" y1="50" x2="60" y2="106" stroke="#334155"/><line x1="55" y1="50" x2="65" y2="50" stroke="#334155"/>
  <line x1="55" y1="106" x2="65" y2="106" stroke="#334155"/>
  <text x="48" y="82" text-anchor="end" font-size="8">0,80</text>
  <text x="180" y="130" text-anchor="middle" font-size="8" fill="{COLORS["dim"]}">T.Ü.K. −5,10 · T.A.K. −5,90</text>
</svg>'''


def svg_bodrum_perde_plan() -> str:
    pad, pw, ph = 30, 340, 200
    cw, ch = pw + pad * 2, ph + pad * 2 + 70
    c = COLORS["perde"]
    piers = (
        f'<rect x="{pad+60}" y="{pad+40}" width="14" height="60" fill="{c}" opacity="0.3"/>'
        f'<rect x="{pad+180}" y="{pad+70}" width="80" height="12" fill="{c}" opacity="0.3"/>'
        f'<rect x="{pad+260}" y="{pad+30}" width="12" height="90" fill="{c}" opacity="0.3"/>'
    )
    void = (
        f'<rect x="{pad+170}" y="{pad+95}" width="55" height="35" fill="{COLORS["void"]}" opacity="0.2" stroke="{COLORS["void"]}" stroke-dasharray="3,2"/>'
        f'<text x="{pad+197}" y="{pad+115}" text-anchor="middle" font-size="7" fill="#be185d">BOŞLUK</text>'
    )
    strip = f'<rect x="{pad}" y="{pad}" width="{pw}" height="{ph}" fill="none" stroke="{c}" stroke-width="14" opacity="0.45"/>'
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {cw} {ch}">
  <text x="{cw/2}" y="18" text-anchor="middle" font-size="11" font-weight="700" fill="{c}">PLAN GÖRÜNÜŞ — BODRUM PERDE (çift yüz)</text>
  {_building_outline(pw, ph, pad)}{strip}{piers}{void}
  <text x="{pad+8}" y="{pad+14}" font-size="7" fill="{c}">P109</text>
  <text x="{pad+270}" y="{pad+28}" font-size="7" fill="{c}">P103</text>
  <text x="{pad+pw/2}" y="{pad+ph+35}" text-anchor="middle" font-size="8" fill="{COLORS["dim"]}">Mavi bant = perde kalıbı · CL 133,8 m · H=4,0 m · ×2 yüz</text>
  <text x="{pad+pw/2}" y="{pad+ph+48}" text-anchor="middle" font-size="8" fill="{COLORS["dim"]}">Boşluk düşümü metrajda düşülmüştür</text>
</svg>'''


def svg_ust_perde_plan() -> str:
    scale = 6.2
    pw, ph = L * scale, W * scale
    pad = 25
    cw, ch = pw + pad * 2, ph + pad * 2 + 55
    c = COLORS["perde"]
    cx, cy, cw_c, ch_c = pw * 0.55, ph * 0.35, 9 * scale, 5 * scale
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {cw} {ch}">
  <text x="{cw/2}" y="16" text-anchor="middle" font-size="11" font-weight="700" fill="{c}">PLAN GÖRÜNÜŞ — ÜST KAT PERDE (tipik kat)</text>
  <g transform="translate({pad},{pad+8})">
    <rect width="{pw}" height="{ph}" fill="{COLORS["bg"]}" stroke="#cbd5e1"/>
    <rect width="{pw}" height="{ph}" fill="none" stroke="{c}" stroke-width="12" opacity="0.45"/>
    <rect x="{cx}" y="{cy}" width="{cw_c}" height="{ch_c}" fill="{COLORS["core"]}" opacity="0.35" stroke="#64748b" stroke-dasharray="4,3"/>
    {_cols_svg(scale, pw, ph)}
  </g>
  <text x="{cw/2}" y="{pad+ph+38}" text-anchor="middle" font-size="8" fill="{COLORS["dim"]}">{L}×{W} m · CL 103,1 m/kat · H=3,80 m · ×4 kat · çift yüz</text>
</svg>'''


def svg_bodrum_kolon_plan() -> str:
    pad, pw, ph = 30, 340, 200
    cw, ch = pw + pad * 2, ph + pad * 2 + 50
    c = COLORS["kolon"]
    cols = "".join(
        f'<rect x="{pad+x}" y="{pad+y}" width="12" height="12" fill="{c}" opacity="0.85" stroke="#991b1b"/>'
        for x, y in [(40, 35), (120, 35), (260, 35), (40, 140), (120, 140), (260, 140), (180, 100), (290, 90)]
    )
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {cw} {ch}">
  <text x="{cw/2}" y="18" text-anchor="middle" font-size="11" font-weight="700" fill="{c}">PLAN GÖRÜNÜŞ — BODRUM KOLON KALIBI</text>
  {_building_outline(pw, ph, pad)}{cols}
  <text x="{pad+pw/2}" y="{pad+ph+35}" text-anchor="middle" font-size="8" fill="{COLORS["dim"]}">Kırmızı = kolon kalıbı · 13 ad · çevre 45,96 m · H=4,0 m</text>
</svg>'''


def svg_ust_kolon_plan() -> str:
    scale = 6.2
    pw, ph = L * scale, W * scale
    pad = 25
    cw, ch = pw + pad * 2, ph + pad * 2 + 50
    c = COLORS["kolon"]
    positions = [
        (pw * 0.12, ph * 0.2), (pw * 0.35, ph * 0.2), (pw * 0.75, ph * 0.2),
        (pw * 0.12, ph * 0.75), (pw * 0.35, ph * 0.75), (pw * 0.75, ph * 0.75),
        (pw * 0.5, ph * 0.55), (pw * 0.85, ph * 0.5),
    ]
    cols = "".join(
        f'<rect x="{pad+x-6}" y="{pad+8+y-6}" width="12" height="12" fill="{c}" opacity="0.9"/>'
        for x, y in positions
    )
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {cw} {ch}">
  <text x="{cw/2}" y="16" text-anchor="middle" font-size="11" font-weight="700" fill="{c}">PLAN GÖRÜNÜŞ — ÜST KAT KOLON (×4 kat)</text>
  <g>{_building_outline(pw, ph, pad+0, pad+8)}{cols}</g>
  <text x="{cw/2}" y="{pad+ph+38}" text-anchor="middle" font-size="8" fill="{COLORS["dim"]}">13 kolon/kat · H=3,80 m · 4 kat = 699,2 m²</text>
</svg>'''


def svg_doseme_plan() -> str:
    scale = 6.2
    pw, ph = L * scale, W * scale
    pad = 25
    cw, ch = pw + pad * 2, ph + pad * 2 + 70
    c = COLORS["doseme"]
    cx, cy, cw_c, ch_c = pw * 0.55, ph * 0.35, 9 * scale, 5 * scale
    perde_band = 12
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {cw} {ch}">
  <text x="{cw/2}" y="16" text-anchor="middle" font-size="11" font-weight="700" fill="{c}">PLAN GÖRÜNÜŞ — DÖŞEME ALTI KALIP</text>
  <g transform="translate({pad},{pad+8})">
    <rect width="{pw}" height="{ph}" fill="{COLORS["bg"]}" stroke="#cbd5e1"/>
    <rect x="{perde_band}" y="{perde_band}" width="{pw-2*perde_band}" height="{ph-2*perde_band}" fill="{c}" opacity="0.35" stroke="{c}"/>
    <rect x="{cx}" y="{cy}" width="{cw_c}" height="{ch_c}" fill="#fff" stroke="{COLORS["void"]}" stroke-dasharray="3,2"/>
    <text x="{cx+cw_c/2}" y="{cy+ch_c/2}" text-anchor="middle" font-size="7" fill="#be185d">−45 m²</text>
    {_cols_svg(scale, pw, ph)}
    <rect x="{pw*0.12-6}" y="{ph*0.2-6}" width="12" height="12" fill="#fff" opacity="0.8"/>
  </g>
  <text x="{cw/2}" y="{pad+ph+38}" text-anchor="middle" font-size="8" fill="{COLORS["dim"]}">Yeşil = döşeme altı · net 941,3 m²/kat · ×5 kat = 4.706,5 m²</text>
  <text x="{cw/2}" y="{pad+ph+50}" text-anchor="middle" font-size="7" fill="{COLORS["dim"]}">Brüt 1.028,2 − perde 35,6 − kolon 6,4 − boşluk 45</text>
</svg>'''


def svg_kiris_plan() -> str:
    scale = 6.2
    pw, ph = L * scale, W * scale
    pad = 25
    cw, ch = pw + pad * 2, ph + pad * 2 + 50
    c = COLORS["kiris"]
    beams = (
        f'<line x1="{pad+10}" y1="{pad+8+ph*0.35}" x2="{pad+pw-10}" y2="{pad+8+ph*0.35}" stroke="{c}" stroke-width="8" opacity="0.7"/>'
        f'<line x1="{pad+10}" y1="{pad+8+ph*0.55}" x2="{pad+pw-10}" y2="{pad+8+ph*0.55}" stroke="{c}" stroke-width="8" opacity="0.7"/>'
        f'<line x1="{pad+10}" y1="{pad+8+ph*0.75}" x2="{pad+pw-10}" y2="{pad+8+ph*0.75}" stroke="{c}" stroke-width="6" opacity="0.5"/>'
        f'<line x1="{pad+pw*0.35}" y1="{pad+8+10}" x2="{pad+pw*0.35}" y2="{pad+8+ph-10}" stroke="{c}" stroke-width="6" opacity="0.5"/>'
    )
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {cw} {ch}">
  <text x="{cw/2}" y="16" text-anchor="middle" font-size="11" font-weight="700" fill="{c}">PLAN GÖRÜNÜŞ — KİRİŞ KALIBI (yan+alt)</text>
  {_building_outline(pw, ph, pad, pad+8)}{beams}
  <text x="{pad+pw*0.55}" y="{pad+8+ph*0.33}" font-size="7" fill="{c}">H1 20/60</text>
  <text x="{cw/2}" y="{pad+ph+38}" text-anchor="middle" font-size="8" fill="{COLORS["dim"]}">Turuncu = kiriş kalıbı · yan 40 cm + alt 32,5 cm · 5 kat</text>
</svg>'''


def svg_perde_section(h_label: str = "3,80 m") -> str:
    c = COLORS["perde"]
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 180">
  <text x="180" y="16" text-anchor="middle" font-size="10" font-weight="700" fill="{c}">KESİT — PERDE KALIP (çift yüz)</text>
  <rect x="155" y="40" width="50" height="90" fill="#cbd5e1" stroke="#64748b"/>
  <rect x="125" y="40" width="30" height="90" fill="{c}" opacity="0.35" stroke="{c}"/>
  <rect x="205" y="40" width="30" height="90" fill="{c}" opacity="0.35" stroke="{c}"/>
  <line x1="100" y1="40" x2="100" y2="130" stroke="#334155"/>
  <line x1="95" y1="40" x2="105" y2="40" stroke="#334155"/><line x1="95" y1="130" x2="105" y2="130" stroke="#334155"/>
  <text x="88" y="88" text-anchor="end" font-size="8">H={h_label}</text>
  <text x="140" y="88" font-size="7" fill="{c}">Kalıp</text>
  <text x="220" y="88" font-size="7" fill="{c}">Kalıp</text>
  <text x="180" y="155" text-anchor="middle" font-size="8" fill="{COLORS["dim"]}">m² = boy × H × 2 − boşluk</text>
</svg>'''


def svg_kolon_section(h_label: str = "3,80 m") -> str:
    c = COLORS["kolon"]
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 180">
  <text x="180" y="16" text-anchor="middle" font-size="10" font-weight="700" fill="{c}">KESİT — KOLON KALIP</text>
  <rect x="165" y="55" width="30" height="30" fill="#cbd5e1" stroke="#64748b"/>
  <rect x="155" y="45" width="50" height="50" fill="none" stroke="{c}" stroke-width="8" opacity="0.5"/>
  <line x1="120" y1="45" x2="120" y2="95" stroke="#334155"/>
  <text x="108" y="75" text-anchor="end" font-size="8">H={h_label}</text>
  <text x="180" y="120" text-anchor="middle" font-size="8" fill="{COLORS["dim"]}">m² = çevre × H · 2×(en+boy)</text>
  <text x="180" y="155" text-anchor="middle" font-size="8" fill="{COLORS["dim"]}">150/35 · 180/30 · 60/60 kolon tipleri</text>
</svg>'''


def svg_doseme_section() -> str:
    c = COLORS["doseme"]
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 160">
  <text x="180" y="16" text-anchor="middle" font-size="10" font-weight="700" fill="{c}">KESİT — DÖŞEME ALTI KALIP</text>
  <rect x="60" y="70" width="240" height="14" fill="#cbd5e1" stroke="#64748b"/>
  <rect x="60" y="84" width="240" height="8" fill="{c}" opacity="0.5" stroke="{c}"/>
  <text x="180" y="79" text-anchor="middle" font-size="8">Beton döşeme h=20</text>
  <text x="180" y="100" text-anchor="middle" font-size="8" fill="{c}">Alt kalıp (plywood)</text>
  <text x="180" y="130" text-anchor="middle" font-size="8" fill="{COLORS["dim"]}">Plan görünüşte yeşil alan = metraj</text>
</svg>'''


def svg_kiris_section() -> str:
    c = COLORS["kiris"]
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 180">
  <text x="180" y="16" text-anchor="middle" font-size="10" font-weight="700" fill="{c}">KESİT — KİRİŞ KALIP (H1 20/60)</text>
  <rect x="80" y="90" width="200" height="40" fill="#cbd5e1" stroke="#64748b"/>
  <rect x="80" y="50" width="200" height="40" fill="{c}" opacity="0.25" stroke="{c}"/>
  <rect x="80" y="130" width="200" height="10" fill="{c}" opacity="0.4" stroke="{c}"/>
  <text x="180" y="75" text-anchor="middle" font-size="8">Kaburga h=40</text>
  <text x="180" y="115" text-anchor="middle" font-size="8">Kiriş h=60</text>
  <text x="180" y="140" text-anchor="middle" font-size="7" fill="{c}">Alt kalıp 32,5 cm</text>
  <text x="180" y="165" text-anchor="middle" font-size="8" fill="{COLORS["dim"]}">Yan: L×0,40×2 + Alt: L×0,325</text>
</svg>'''


VIEW_MAP = {
    "radye": svg_radye_plan,
    "radye_section": svg_radye_section,
    "bodrum_perde": svg_bodrum_perde_plan,
    "bodrum_kolon": svg_bodrum_kolon_plan,
    "ust_perde": svg_ust_perde_plan,
    "ust_kolon": svg_ust_kolon_plan,
    "doseme": svg_doseme_plan,
    "kiris": svg_kiris_plan,
    "perde_section": lambda: svg_perde_section("3,80 m"),
    "kolon_section": lambda: svg_kolon_section("3,80 m"),
    "doseme_section": svg_doseme_section,
    "kiris_section": svg_kiris_section,
}


def svg_poz_page(poz: dict) -> str:
    plan_fn = VIEW_MAP[poz["view_plan"]]
    sec_fn = VIEW_MAP[poz["view_section"]]
    if poz["kod"] == "B":
        sec_svg = svg_perde_section("4,00 m")
    elif poz["kod"] == "C":
        sec_svg = svg_kolon_section("4,00 m")
    else:
        sec_svg = sec_fn() if callable(sec_fn) else sec_fn

    c = poz["color"]
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 520">
  <rect width="720" height="520" fill="#ffffff"/>
  <rect x="0" y="0" width="720" height="52" fill="#1f4e79"/>
  <text x="360" y="22" text-anchor="middle" font-size="14" font-weight="700" fill="#ffffff">POZ {poz["kod"]} — {poz["ad"]}</text>
  <text x="360" y="40" text-anchor="middle" font-size="10" fill="#cbd5e1">{poz["formul"]} · {poz["m2"]:,.1f} m² ({poz["pay"]})</text>
  <foreignObject x="10" y="58" width="350" height="220">{plan_fn()}</foreignObject>
  <foreignObject x="360" y="58" width="350" height="220">{sec_svg if isinstance(sec_svg, str) else sec_fn()}</foreignObject>
  <rect x="20" y="290" width="680" height="210" fill="#f8fafc" stroke="#e2e8f0" rx="6"/>
  <text x="36" y="315" font-size="11" font-weight="700" fill="{c}">Metraj alanı açıklaması</text>
  <text x="36" y="335" font-size="10" fill="#334155">{poz["detay"]}</text>
  <rect x="36" y="355" width="16" height="16" fill="{c}" opacity="0.6"/>
  <text x="58" y="367" font-size="9" fill="#475569">Renkli alan = ölçülen kalıp yüzeyi (kırık ölçü)</text>
  <text x="36" y="395" font-size="10" font-weight="600" fill="#1f4e79">Proje: MEBİZ.73-10-25-01-SU-001-R0 · Karşıyaka Ortaokulu</text>
  <text x="36" y="415" font-size="9" fill="#64748b">Sol: plan görünüş · Sağ: kesit görünüş · Şematik (CAD referanslı)</text>
</svg>'''


def svg_poz_combined(poz: dict) -> str:
    """Single poz page without foreignObject (PDF-safe)."""
    plan_fn = VIEW_MAP[poz["view_plan"]]
    if poz["kod"] == "B":
        sec_inner = svg_perde_section("4,00 m")
    elif poz["kod"] == "C":
        sec_inner = svg_kolon_section("4,00 m")
    else:
        sec_fn = VIEW_MAP[poz["view_section"]]
        sec_inner = sec_fn() if callable(sec_fn) else sec_fn

    # Embed plan and section by scaling into slots — use nested svg
    c = poz["color"]
    plan = plan_fn().replace('xmlns="http://www.w3.org/2000/svg"', "").replace("<svg", "<g").replace("</svg>", "</g>")
    section = sec_inner.replace('xmlns="http://www.w3.org/2000/svg"', "").replace("<svg", "<g").replace("</svg>", "</g>")

    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 500">
  <rect width="720" height="500" fill="#ffffff"/>
  <rect width="720" height="48" fill="#1f4e79"/>
  <text x="360" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="#fff">POZ {poz["kod"]} — {poz["ad"]}</text>
  <text x="360" y="38" text-anchor="middle" font-size="9" fill="#cbd5e1">{poz["formul"]} · {poz["m2"]:,.1f} m²</text>
  <g transform="translate(8,52) scale(0.95)">{plan}</g>
  <g transform="translate(365,52) scale(0.95)">{section}</g>
  <rect x="16" y="280" width="688" height="200" fill="#f8fafc" stroke="#e2e8f0" rx="4"/>
  <text x="28" y="302" font-size="10" font-weight="700" fill="{c}">{poz["detay"]}</text>
  <rect x="28" y="318" width="14" height="14" fill="{c}" opacity="0.55"/>
  <text x="48" y="329" font-size="9" fill="#475569">Renkli bölge = metraj alanı · Plan (sol) + Kesit (sağ)</text>
  <text x="28" y="355" font-size="9" fill="#64748b">Karşıyaka Ortaokulu · Kırık ölçü · Taslak metraj çizimi</text>
  <text x="28" y="375" font-size="11" font-weight="700" fill="#1f4e79">Toplam poz: {poz["m2"]:,.1f} m² ({poz["pay"]} genel metraj)</text>
</svg>'''


def svg_cover() -> str:
    rows = ""
    y = 200
    for p in POZLAR:
        rows += (
            f'<rect x="80" y="{y}" width="14" height="14" fill="{p["color"]}" opacity="0.7"/>'
            f'<text x="102" y="{y+11}" font-size="10" fill="#334155">'
            f'{p["kod"]}) {p["ad"]} — {p["m2"]:,.1f} m²</text>'
        )
        y += 22
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 500">
  <rect width="720" height="500" fill="#ffffff"/>
  <rect width="720" height="90" fill="#1f4e79"/>
  <text x="360" y="40" text-anchor="middle" font-size="18" font-weight="700" fill="#fff">KALIP METRAJ ALANLARI</text>
  <text x="360" y="62" text-anchor="middle" font-size="11" fill="#cbd5e1">Görünüş Çizimleri — Karşıyaka Ortaokulu (24 derslik)</text>
  <text x="360" y="78" text-anchor="middle" font-size="9" fill="#94a3b8">MEBİZ.73-10-25-01-SU-001-R0 · Kırık ölçü</text>
  <text x="360" y="130" text-anchor="middle" font-size="28" font-weight="800" fill="#f5a623">11.773,4 m²</text>
  <text x="360" y="155" text-anchor="middle" font-size="10" fill="#64748b">7 poz · Plan + kesit görünüş · +%5 fire → 12.362 m²</text>
  {rows}
  <text x="360" y="480" text-anchor="middle" font-size="8" fill="#94a3b8">ABDURRAHMAN BARIŞ ÖKER · Taslak — MM/İSG onayı</text>
</svg>'''


def svg_to_drawing(svg_str: str):
    with tempfile.NamedTemporaryFile("w", suffix=".svg", delete=False, encoding="utf-8") as f:
        f.write(svg_str)
        path = f.name
    drawing = svg2rlg(path)
    Path(path).unlink(missing_ok=True)
    return drawing


def scale_drawing(drawing, max_w, max_h):
    if not drawing:
        return None
    sw, sh = drawing.width, drawing.height
    if sw <= 0 or sh <= 0:
        return drawing
    scale = min(max_w / sw, max_h / sh)
    drawing.width = sw * scale
    drawing.height = sh * scale
    drawing.scale(scale, scale)
    return drawing


def build_pdf():
    CIZIM_POZ.mkdir(parents=True, exist_ok=True)
    pages = [("00_kapak", svg_cover())]
    for poz in POZLAR:
        svg = svg_poz_combined(poz)
        fname = f'{poz["kod"]}_{poz["ad"][:20].replace(" ", "_")}.svg'
        (CIZIM_POZ / fname).write_text(svg, encoding="utf-8")
        pages.append((f'poz_{poz["kod"]}', svg))

    margin = 1.2 * cm
    max_w = PW - 2 * margin
    max_h = PH - 2 * margin

    for out_path in (OUT_PDF_PUBLIC, OUT_PDF_METRAJ):
        c = canvas.Canvas(str(out_path), pagesize=PAGE)
        for _name, svg_str in pages:
            drawing = svg_to_drawing(svg_str)
            if drawing:
                scale_drawing(drawing, max_w, max_h)
                x = (PW - drawing.width) / 2
                y = (PH - drawing.height) / 2
                renderPDF.draw(drawing, c, x, y)
            c.showPage()
        c.save()
        print(f"PDF: {out_path} ({len(pages)} sayfa)")


def write_html():
    poz_links = "".join(
        f'<tr><td><span class="dot" style="background:{p["color"]}"></span> {p["kod"]}</td>'
        f'<td>{p["ad"]}</td><td class="num">{p["m2"]:,.1f}</td><td>{p["pay"]}</td></tr>'
        for p in POZLAR
    )
    html = f'''<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>
<meta name="theme-color" content="#1f4e79"/>
<title>Metraj Alanları PDF — Karşıyaka</title>
<style>
:root{{--brand:#1f4e79;--accent:#f5a623;--card:#fff;--muted:#64748b;--line:#e2e8f0}}
*{{box-sizing:border-box}}body{{margin:0;font-family:system-ui,sans-serif;background:#eef2f7;line-height:1.45}}
header{{background:linear-gradient(160deg,#1f4e79,#0f2744);color:#fff;padding:1.1rem;text-align:center}}
header h1{{margin:0;font-size:1.1rem}}header p{{margin:.3rem 0 0;font-size:.82rem;opacity:.9}}
main{{max-width:580px;margin:0 auto;padding:.85rem 1rem 2rem}}
.card{{background:var(--card);border-radius:12px;padding:.9rem;margin:.65rem 0;box-shadow:0 4px 14px rgba(0,0,0,.06)}}
.card h2{{margin:0 0 .5rem;font-size:.95rem;color:var(--brand)}}
.sub{{font-size:.78rem;color:var(--muted);margin:0 0 .5rem}}
.btn{{display:block;text-align:center;background:var(--brand);color:#fff;padding:.85rem;border-radius:10px;text-decoration:none;font-weight:700;margin:.5rem 0}}
.btn.accent{{background:linear-gradient(135deg,#b45309,#f5a623);color:#1a1a1a}}
.pdf-frame{{width:100%;height:min(70vh,520px);border:1px solid var(--line);border-radius:8px;background:#525659}}
table{{width:100%;border-collapse:collapse;font-size:.8rem}}
td,th{{padding:.4rem .2rem;border-bottom:1px solid var(--line)}}
th{{color:var(--muted);text-align:left}}
td.num{{text-align:right;font-variant-numeric:tabular-nums}}
.dot{{display:inline-block;width:10px;height:10px;border-radius:2px;vertical-align:middle}}
.back{{display:block;padding:1rem;color:var(--brand);font-weight:600;text-decoration:none}}
</style>
</head>
<body>
<a class="back" href="index.html">← Portal</a>
<header>
  <h1>Metraj Alanları — PDF</h1>
  <p>7 poz · plan + kesit görünüş · 11.773,4 m²</p>
</header>
<main>
<div class="card">
  <h2>PDF Görüntüle</h2>
  <p class="sub">Her metraj pozunun plan ve kesit görünüşü — 8 sayfa</p>
  <iframe class="pdf-frame" src="metraj-alanlari.pdf" title="Metraj PDF"></iframe>
  <a class="btn accent" href="metraj-alanlari.pdf" download="Karşıyaka_Kalip_Metraj_Alanlari.pdf">📥 PDF İndir</a>
  <a class="btn" href="metraj-alanlari.pdf" target="_blank" rel="noopener">PDF Yeni Sekmede Aç</a>
</div>
<div class="card">
  <h2>Poz listesi</h2>
  <table>
    <tr><th>Poz</th><th>Alan</th><th class="num">m²</th><th>Pay</th></tr>
    {poz_links}
    <tr><th colspan="2">TOPLAM</th><th class="num"><b>11.773,4</b></th><th>100%</th></tr>
  </table>
</div>
<div class="card">
  <h2>Alternatif</h2>
  <p class="sub"><a href="metraj-cizim.html">HTML detay çizimler</a> · <a href="telefon.html">Özet tablo</a></p>
</div>
</main>
</body>
</html>'''
    OUT_HTML.write_text(html, encoding="utf-8")
    print(f"HTML: {OUT_HTML}")


def main():
    build_pdf()
    write_html()


if __name__ == "__main__":
    main()
