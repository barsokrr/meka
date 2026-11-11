#!/usr/bin/env python3
"""Defter maliyet/gelir hesabı — Excel tablo üretici (75 gün, 24 kişi)."""

from pathlib import Path

from openpyxl import Workbook
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "Maliyet_Gelir_Tablosu_75gun.xlsx"

GUN = 75
USTA_ADET = 16
CIRAK_ADET = 8
TOPLAM_KISI = USTA_ADET + CIRAK_ADET

# Faturalama (müşteriye yansıtılan)
USTA_FATURA_GUN = 4500
CIRAK_FATURA_GUN = 3000

# İç maliyet (yevmiye)
USTA_MALIYET_GUN = 3600
CIRAK_MALIYET_GUN = 2400

YEMEK_TOPLAM = 877_500
M2_A = 9400
M2_B = 7115


def border():
    s = Side(style="thin", color="CBD5E1")
    return Border(left=s, right=s, top=s, bottom=s)


def hdr(ws, row, headers):
    fill = PatternFill("solid", fgColor="1E293B")
    font = Font(bold=True, color="FFFFFF", size=10)
    for col, h in enumerate(headers, 1):
        c = ws.cell(row=row, column=col, value=h)
        c.font = font
        c.fill = fill
        c.alignment = Alignment(horizontal="center", wrap_text=True)
        c.border = border()


def write_row(ws, row, vals, bold=False, fmt="#,##0.00"):
    for col, v in enumerate(vals, 1):
        c = ws.cell(row=row, column=col, value=v)
        c.border = border()
        if bold:
            c.font = Font(bold=True)
        if isinstance(v, (int, float)) and col > 1:
            c.number_format = fmt


def build():
    wb = Workbook()

    # --- ÖZET ---
    ws = wb.active
    ws.title = "Özet"
    ws["A1"] = "BETONARME KALIP — MALİYET / GELİR ÖZETİ"
    ws["A1"].font = Font(bold=True, size=14, color="B45309")
    ws["A2"] = f"İş süresi: {GUN} gün · Ekip: {USTA_ADET} usta + {CIRAK_ADET} çırak = {TOPLAM_KISI} kişi"

    usta_gelir = USTA_ADET * USTA_FATURA_GUN * GUN
    cirak_gelir = CIRAK_ADET * CIRAK_FATURA_GUN * GUN
    isci_gelir = usta_gelir + cirak_gelir
    kdv = isci_gelir * 0.20
    tevkifat = kdv * 0.40
    tahsil_kdv = kdv - tevkifat
    genel_gelir = isci_gelir + tevkifat + YEMEK_TOPLAM  # defter: 8.653.500

    usta_mal = USTA_ADET * USTA_MALIYET_GUN * GUN
    cirak_mal = CIRAK_ADET * CIRAK_MALIYET_GUN * GUN
    isci_mal = usta_mal + cirak_mal
    genel_maliyet = isci_mal + YEMEK_TOPLAM
    kar = isci_gelir - isci_mal

    ozet = [
        ("", "Tutar (TL)"),
        ("İşçilik geliri (fatura matrahı)", isci_gelir),
        ("KDV %20", kdv),
        ("Tevkifat 4/10", tevkifat),
        ("Tahsil KDV (6/10)", tahsil_kdv),
        ("Yemek", YEMEK_TOPLAM),
        ("GENEL TOPLAM (GELİR — defter)", genel_gelir),
        ("", ""),
        ("İşçilik maliyeti (yevmiye)", isci_mal),
        ("Yemek", YEMEK_TOPLAM),
        ("GENEL TOPLAM (MALİYET)", genel_maliyet),
        ("", ""),
        ("Brüt kâr (işçilik farkı)", kar),
        ("m² birim — 9.400 m²", genel_gelir / M2_A),
        ("m² birim — 7.115 m²", genel_gelir / M2_B),
    ]
    r = 4
    for label, val in ozet:
        ws.cell(row=r, column=1, value=label)
        if val != "":
            c = ws.cell(row=r, column=2, value=val)
            c.number_format = "#,##0.00"
        if "GENEL" in str(label) or label == "Brüt kâr (işçilik farkı)":
            ws.cell(row=r, column=1).font = Font(bold=True)
            if val != "":
                c.font = Font(bold=True)
        r += 1
    ws.column_dimensions["A"].width = 32
    ws.column_dimensions["B"].width = 18

    # --- GELİR ---
    ws = wb.create_sheet("Gelir (Fatura)")
    hdr(ws, 1, ["Kalem", "Kişi", "Günlük (TL)", "Gün", "Toplam (TL)"])
    rows = [
        ("Usta — faturalama", USTA_ADET, USTA_FATURA_GUN, GUN, usta_gelir),
        ("Çırak — faturalama", CIRAK_ADET, CIRAK_FATURA_GUN, GUN, cirak_gelir),
        ("İşçilik toplam", "", "", "", isci_gelir),
        ("KDV %20", "", "", "", kdv),
        ("Tevkifat 4/10", "", "", "", tevkifat),
        ("Yemek", TOPLAM_KISI, YEMEK_TOPLAM / TOPLAM_KISI / GUN, GUN, YEMEK_TOPLAM),
        ("GENEL TOPLAM", "", "", "", genel_gelir),
    ]
    for i, row in enumerate(rows, 2):
        write_row(ws, i, row, bold="GENEL" in row[0] or "toplam" in row[0].lower())
    ws.column_dimensions["A"].width = 22
    for col in "BCDE":
        ws.column_dimensions[col].width = 14

    # --- MALİYET ---
    ws = wb.create_sheet("Maliyet (Yevmiye)")
    hdr(ws, 1, ["Kalem", "Kişi", "Günlük (TL)", "Gün", "Toplam (TL)"])
    rows = [
        ("Usta — yevmiye", USTA_ADET, USTA_MALIYET_GUN, GUN, usta_mal),
        ("Çırak — yevmiye", CIRAK_ADET, CIRAK_MALIYET_GUN, GUN, cirak_mal),
        ("İşçilik maliyet toplam", "", "", "", isci_mal),
        ("Yemek", TOPLAM_KISI, YEMEK_TOPLAM / TOPLAM_KISI / GUN, GUN, YEMEK_TOPLAM),
        ("GENEL TOPLAM", "", "", "", genel_maliyet),
    ]
    for i, row in enumerate(rows, 2):
        write_row(ws, i, row, bold="GENEL" in row[0] or "toplam" in row[0].lower())

    # --- KÂR ---
    ws = wb.create_sheet("Kâr Analizi")
    hdr(ws, 1, ["Kalem", "Günlük fark (TL)", "Kişi", "75 gün toplam (TL)"])
    usta_fark = USTA_FATURA_GUN - USTA_MALIYET_GUN
    cirak_fark = CIRAK_FATURA_GUN - CIRAK_MALIYET_GUN
    gunluk_kar = USTA_ADET * usta_fark + CIRAK_ADET * cirak_fark
    rows = [
        ("Usta (4500 − 3600)", usta_fark, USTA_ADET, USTA_ADET * usta_fark * GUN),
        ("Çırak (3000 − 2400)", cirak_fark, CIRAK_ADET, CIRAK_ADET * cirak_fark * GUN),
        ("Ekip günlük kâr", gunluk_kar / GUN, TOPLAM_KISI, gunluk_kar),
        ("75 gün toplam kâr", "", "", kar),
    ]
    for i, row in enumerate(rows, 2):
        write_row(ws, i, row, bold=i == 5)
    ws["A7"] = "Not: Kâr = faturalanan işçilik − ödenen yevmiye (yemek ayrı)."
    ws.merge_cells("A7:D7")

    # --- m² ---
    ws = wb.create_sheet("m² Birim Fiyat")
    hdr(ws, 1, ["Metraj (m²)", "Genel toplam (TL)", "TL/m²"])
    for i, m2 in enumerate([M2_A, M2_B], 2):
        write_row(ws, i, [m2, genel_gelir, genel_gelir / m2])

    wb.save(OUT)
    print(f"Yazıldı: {OUT}")


if __name__ == "__main__":
    build()
