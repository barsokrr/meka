#!/usr/bin/env python3
"""Gündoğdu KM — işçilik, yemek ve ahşap kalıp malzemesi PDF."""

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

FONT_PATH = Path("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf")
FONT_BOLD = Path("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf")


def fmt_tl(n: float | int) -> str:
    s = f"{int(round(n)):,}".replace(",", ".")
    return f"{s} TL"


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

    story = []
    story.append(
        Paragraph(
            "Kocaeli Gündoğdu Kültür Merkezi<br/>İşçilik, Yemek ve Ahşap Kalıp Malzemesi",
            title_style,
        )
    )
    story.append(
        Paragraph(
            "6 usta · 40 iş günü · 3 öğün × 150 TL · sözleşme metrajı 2.145 m² (düz ölçü)",
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
        ["Toplam işçilik + yemek", "", fmt_tl(1_188_000)],
        ["SGK işveren payı (opsiyonel %22,5)", "yevmiye üzerinden", fmt_tl(243_000)],
    ]
    story.append(table(iscilik, [7 * cm, 7.5 * cm, 3.5 * cm]))

    story.append(Spacer(1, 0.4 * cm))
    story.append(Paragraph("2. Ahşap kalıp malzemesi (2.145 m², rayiç)", h_style))
    malzeme = [
        ["Malzeme", "Miktar", "Tutar (TL)"],
        ["Film kaplı plywood 18 mm", "322 m²", fmt_tl(172_495)],
        ["Çam kereste II. sınıf", "29 m³", fmt_tl(277_418)],
        ["Çivi, yağ, tel, distan, hurda/fire (%8)", "—", fmt_tl(75_933)],
        ["Toplam ahşap kalıp malzemesi", "", fmt_tl(525_646)],
    ]
    story.append(table(malzeme, [7 * cm, 4 * cm, 4 * cm]))

    story.append(Spacer(1, 0.4 * cm))
    story.append(Paragraph("3. Malzeme kalemleri (miktar listesi)", h_style))
    detay = [
        ["Kalem", "Birim", "Miktar"],
        ["Film kaplı plywood (18 mm)", "m²", "322"],
        ["Çam kereste II. sınıf", "m³", "26"],
        ["Ahşap dikme / payanda", "m³", "12"],
        ["Çivi", "kg", "215"],
        ["Kalıp ayırıcı yağ", "kg", "215"],
        ["Bağ teli", "kg", "86"],
        ["Plastik distan", "adet", "2.145"],
        ["Hurda / fire payı", "%", "8 (sipariş ilavesi)"],
    ]
    story.append(table(detay, [8 * cm, 2.5 * cm, 5.5 * cm]))

    story.append(Spacer(1, 0.5 * cm))
    ozet = [
        ["Özet", "Tutar"],
        ["İşçilik + yemek", fmt_tl(1_188_000)],
        ["Ahşap kalıp malzemesi", fmt_tl(525_646)],
        ["Genel toplam (KDV hariç)", fmt_tl(1_713_646)],
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
            "Not: Demir malzemesi, iskele, beton, vinç ve nakliye işveren teminidir. "
            "IS-KA Beamform sistem malzemesi bu tabloya dahil değildir.",
            note_style,
        )
    )

    doc.build(story)


if __name__ == "__main__":
    build_pdf()
    print(OUT)
