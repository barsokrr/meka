#!/usr/bin/env python3
"""Gündoğdu KM — işçilik, yemek ve kalıp malzemesi (IS-KA teklif EUR→TL) PDF."""

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import cm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "kocaeli_gundogdu_iscilik_yemek_malzeme.pdf"

# IS-KA / Algüç Beamform proje teklifi STEC-261736 (05.10.2026)
EUR_KDV_HARIC = 42_852.98
EUR_KDV = 8_570.60
EUR_GENEL_TOPLAM = 51_423.58
EUR_TRY = 55.32  # 05.10.2026 piyasa kuru
TL_KALIP_MALZEME = round(EUR_GENEL_TOPLAM * EUR_TRY)

FONT_PATH = Path("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf")
FONT_BOLD = Path("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf")


def fmt_tl(n: float | int) -> str:
    s = f"{int(round(n)):,}".replace(",", ".")
    return f"{s} TL"


def fmt_eur(n: float) -> str:
    s = f"{n:,.2f}".replace(",", "X").replace(".", ",").replace("X", ".")
    return f"{s} EUR"


def register_fonts():
    if FONT_PATH.exists():
        pdfmetrics.registerFont(TTFont("DejaVu", str(FONT_PATH)))
    if FONT_BOLD.exists():
        pdfmetrics.registerFont(TTFont("DejaVu-Bold", str(FONT_BOLD)))
    return "DejaVu", "DejaVu-Bold"


def build_pdf():
    font, font_b = register_fonts()
    doc = SimpleDocTemplate(
        str(OUT),
        pagesize=A4,
        leftMargin=2 * cm,
        rightMargin=2 * cm,
        topMargin=1.5 * cm,
        bottomMargin=1.5 * cm,
    )
    styles = getSampleStyleSheet()
    title_style = ParagraphStyle(
        "title",
        parent=styles["Heading1"],
        fontName=font_b,
        fontSize=14,
        alignment=1,
        spaceAfter=6,
    )
    sub_style = ParagraphStyle(
        "sub",
        parent=styles["Normal"],
        fontName=font,
        fontSize=10,
        alignment=1,
        textColor=colors.HexColor("#444444"),
        spaceAfter=14,
    )
    h_style = ParagraphStyle(
        "h2",
        parent=styles["Heading2"],
        fontName=font_b,
        fontSize=11,
        spaceBefore=8,
        spaceAfter=6,
    )
    note_style = ParagraphStyle(
        "note",
        parent=styles["Normal"],
        fontName=font,
        fontSize=9,
        textColor=colors.HexColor("#555555"),
    )

    iscilik_yemek = 1_188_000
    genel = iscilik_yemek + TL_KALIP_MALZEME

    story = []
    story.append(
        Paragraph(
            "Kocaeli Gündoğdu Kültür Merkezi<br/>İşçilik, Yemek ve Kalıp Malzemesi",
            title_style,
        )
    )
    story.append(
        Paragraph(
            "6 usta · 40 iş günü · 3 öğün × 150 TL · sözleşme metrajı 2.145 m²",
            sub_style,
        )
    )

    def table(data, col_widths=None):
        t = Table(data, colWidths=col_widths, hAlign="LEFT")
        t.setStyle(
            TableStyle(
                [
                    ("FONT", (0, 0), (-1, 0), font_b, 9),
                    ("FONT", (0, 1), (-1, -1), font, 9),
                    ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#e8eef4")),
                    ("GRID", (0, 0), (-1, -1), 0.5, colors.grey),
                    ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                    ("LEFTPADDING", (0, 0), (-1, -1), 6),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                    ("TOPPADDING", (0, 0), (-1, -1), 4),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
                ]
            )
        )
        return t

    story.append(Paragraph("1. İşçilik ve yemek", h_style))
    iscilik = [
        ["Kalem", "Hesap", "Tutar"],
        ["Yevmiye", "6 usta × 4.500 TL × 40 gün", fmt_tl(1_080_000)],
        ["Yemek", "6 kişi × 150 TL × 3 öğün × 40 gün", fmt_tl(108_000)],
        ["Toplam işçilik + yemek", "", fmt_tl(iscilik_yemek)],
    ]
    story.append(table(iscilik, [7 * cm, 7.5 * cm, 3.5 * cm]))

    story.append(Spacer(1, 0.4 * cm))
    story.append(
        Paragraph(
            "2. Kalıp malzemesi — İS-KA Beamform (STEC-261736, Algüç İnşaat proje teklifi)",
            h_style,
        )
    )
    malzeme = [
        ["Kalem", "EUR", "TL"],
        ["Teklif toplamı (KDV hariç)", fmt_eur(EUR_KDV_HARIC), fmt_tl(EUR_KDV_HARIC * EUR_TRY)],
        ["KDV (%20)", fmt_eur(EUR_KDV), fmt_tl(EUR_KDV * EUR_TRY)],
        [
            "Genel toplam (KDV dahil)",
            fmt_eur(EUR_GENEL_TOPLAM),
            fmt_tl(TL_KALIP_MALZEME),
        ],
    ]
    story.append(table(malzeme, [6.5 * cm, 4 * cm, 4.5 * cm]))
    story.append(Spacer(1, 0.2 * cm))
    story.append(
        Paragraph(
            f"Döviz: 1 EUR = {EUR_TRY:.2f} TL (05.10.2026). "
            f"Kalıp malzemesi TL = {fmt_eur(EUR_GENEL_TOPLAM)} × {EUR_TRY:.2f}.",
            note_style,
        )
    )

    story.append(Spacer(1, 0.5 * cm))
    ozet = [
        ["Özet", "Tutar"],
        ["İşçilik + yemek", fmt_tl(iscilik_yemek)],
        ["Kalıp malzemesi (teklif genel toplam, TL)", fmt_tl(TL_KALIP_MALZEME)],
        ["Genel toplam", fmt_tl(genel)],
    ]
    t = Table(ozet, colWidths=[10 * cm, 5 * cm], hAlign="LEFT")
    t.setStyle(
        TableStyle(
            [
                ("FONT", (0, 0), (-1, 0), font_b, 10),
                ("FONT", (0, 1), (-1, -2), font, 10),
                ("FONT", (0, -1), (-1, -1), font_b, 10),
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#1e3a5f")),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("BACKGROUND", (0, -1), (-1, -1), colors.HexColor("#dbeafe")),
                ("GRID", (0, 0), (-1, -1), 0.5, colors.grey),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    story.append(t)

    story.append(Spacer(1, 0.6 * cm))
    story.append(
        Paragraph(
            "Not: Teklif fabrika teslim; nakliye ve montaj hariç. "
            "Demir malzemesi, iskele, beton, vinç işveren teminidir.",
            note_style,
        )
    )

    doc.build(story)


if __name__ == "__main__":
    build_pdf()
    print(OUT)
    print(f"Kalıp malzeme TL: {TL_KALIP_MALZEME}")
    print(f"Genel toplam TL: {1_188_000 + TL_KALIP_MALZEME}")
