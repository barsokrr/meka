#!/usr/bin/env python3
"""Elmalık Villa tadilat teklifinden hakediş paketi (Excel) üretici."""

from __future__ import annotations

from datetime import date
from pathlib import Path

from openpyxl import Workbook
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.utils import get_column_letter

TEKLIF_PATH = Path(
    "/home/ubuntu/.cursor/projects/workspace/uploads/Teklif_1_2328.xlsx"
)
OUT = Path(__file__).resolve().parents[1] / "Elmalik_Villa_Hakedis_Paketi.xlsx"

PROJE_ADI = "VAN / EDREMİT / ELMALIK VİLLA TADİLATI"
TEKLIF_REF = "Teklif_1_2328"
SOZLESME_MATRAH = 576_023.0
KAR_ORANI = 0.20
KDV_ORANI = 0.20

# Teklif satırları (yapılacak imalat listesi)
KALEMLER: list[dict] = [
    {
        "poz": "T-01",
        "kalem": "Elektrik tesisatı",
        "miktar": None,
        "birim": "götürü",
        "bf": None,
        "tutar": None,
        "aciklama": "Genel — teklif toplamı içinde",
    },
    {
        "poz": "T-02",
        "kalem": "Mekanik tesisat",
        "miktar": None,
        "birim": "götürü",
        "bf": None,
        "tutar": None,
        "aciklama": "Genel — teklif toplamı içinde",
    },
    {
        "poz": "T-03",
        "kalem": "Tavan alçıpan",
        "miktar": 43.73,
        "birim": "m²",
        "bf": 750.0,
        "tutar": 32_797.5,
        "aciklama": "Mutfak — Z.Hol — G.Odası",
    },
    {
        "poz": "T-04",
        "kalem": "Gergi tavan",
        "miktar": 5.35,
        "birim": "m²",
        "bf": 2_500.0,
        "tutar": 13_375.0,
        "aciklama": "Giyinme odası",
    },
    {
        "poz": "T-05",
        "kalem": "Duvar çıtası",
        "miktar": 103.06,
        "birim": "mt",
        "bf": 650.0,
        "tutar": 66_989.0,
        "aciklama": "Mutfak, hol, 2. kat hol",
    },
    {
        "poz": "T-06",
        "kalem": "Boya",
        "miktar": None,
        "birim": "m²",
        "bf": None,
        "tutar": None,
        "aciklama": "Genel — teklif toplamı içinde",
    },
    {
        "poz": "T-07",
        "kalem": "Duvar kağıdı",
        "miktar": 81.0,
        "birim": "m²",
        "bf": 2_500.0,
        "tutar": 202_500.0,
        "aciklama": "Çalışma odası, yatak odaları (8 rulo)",
    },
    {
        "poz": "T-08",
        "kalem": "İtalyan boya (dekoratif)",
        "miktar": 46.0,
        "birim": "m²",
        "bf": 1_600.0,
        "tutar": 73_600.0,
        "aciklama": "Merdiven traverten",
    },
    {
        "poz": "T-09",
        "kalem": "Mobilya (mutfak / g. odası / vestiyer)",
        "miktar": None,
        "birim": "m²",
        "bf": None,
        "tutar": None,
        "aciklama": "Teklif toplamı içinde",
    },
    {
        "poz": "T-10",
        "kalem": "Tezgah",
        "miktar": 5.4,
        "birim": "mtül",
        "bf": None,
        "tutar": None,
        "aciklama": "Mutfak",
    },
    {
        "poz": "T-11",
        "kalem": "Tezgah arası",
        "miktar": 7.4,
        "birim": "mtül",
        "bf": None,
        "tutar": None,
        "aciklama": "Mutfak",
    },
    {
        "poz": "T-12",
        "kalem": "Zemin seramik",
        "miktar": 36.0,
        "birim": "m²",
        "bf": None,
        "tutar": None,
        "aciklama": "Mutfak — ara koridor (100×100)",
    },
    {
        "poz": "T-13",
        "kalem": "Zemin seramik çıtası",
        "miktar": 12.14,
        "birim": "mt",
        "bf": None,
        "tutar": None,
        "aciklama": "Mutfak — G.Hol (4 boy)",
    },
    {
        "poz": "T-14",
        "kalem": "Süpürgelik",
        "miktar": None,
        "birim": "mt",
        "bf": None,
        "tutar": None,
        "aciklama": "Genel — teklif toplamı içinde",
    },
    {
        "poz": "T-15",
        "kalem": "Aydınlatma armatürleri",
        "miktar": None,
        "birim": "adet",
        "bf": None,
        "tutar": None,
        "aciklama": "Genel — teklif toplamı içinde",
    },
]

HEADER_FILL = PatternFill("solid", fgColor="1F4E79")
ACCENT_FILL = PatternFill("solid", fgColor="D6E4F0")
TOTAL_FILL = PatternFill("solid", fgColor="E2EFDA")
WARN_FILL = PatternFill("solid", fgColor="FFF2CC")
THIN = Side(style="thin", color="AAAAAA")
BORDER = Border(left=THIN, right=THIN, top=THIN, bottom=THIN)


def money(v: float) -> float:
    return round(v, 2)


def detayli_toplam() -> float:
    return money(sum(k["tutar"] or 0 for k in KALEMLER))


def style_header_row(ws, row: int, cols: int) -> None:
    for c in range(1, cols + 1):
        cell = ws.cell(row=row, column=c)
        cell.fill = HEADER_FILL
        cell.font = Font(bold=True, color="FFFFFF", size=10)
        cell.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)
        cell.border = BORDER


def style_table(ws, start_row: int, end_row: int, cols: int) -> None:
    for r in range(start_row, end_row + 1):
        for c in range(1, cols + 1):
            cell = ws.cell(row=r, column=c)
            cell.border = BORDER
            if c >= 6:
                cell.alignment = Alignment(horizontal="right", vertical="center", wrap_text=True)
            else:
                cell.alignment = Alignment(vertical="center", wrap_text=True)


def set_col_widths(ws, widths: dict[str, float]) -> None:
    for col, w in widths.items():
        ws.column_dimensions[col].width = w


def build_kapak(wb: Workbook) -> None:
    ws = wb.active
    ws.title = "KAPAK"
    set_col_widths(ws, {"A": 22, "B": 58})

    ws.merge_cells("A1:B1")
    ws["A1"] = "HAKEDİŞ PAKETİ — VİLLA TADİLAT"
    ws["A1"].font = Font(bold=True, size=14, color="1F4E79")

    kar = money(SOZLESME_MATRAH * KAR_ORANI)
    kdv = money((SOZLESME_MATRAH + kar) * KDV_ORANI)
    genel = money(SOZLESME_MATRAH + kar + kdv)

    rows = [
        ("Proje", PROJE_ADI),
        ("Teklif referansı", TEKLIF_REF),
        ("Hazırlık tarihi", date.today().strftime("%d.%m.%Y")),
        ("", ""),
        ("Sözleşme matrahı (KDV hariç)", f"{SOZLESME_MATRAH:,.2f} TL"),
        ("Yüklenici kâr / genel gider (%20)", f"{kar:,.2f} TL"),
        ("KDV matrahı", f"{SOZLESME_MATRAH + kar:,.2f} TL"),
        ("KDV (%20)", f"{kdv:,.2f} TL"),
        ("Genel toplam (KDV dahil)", f"{genel:,.2f} TL"),
        ("", ""),
        ("Detaylı fiyatlı kalem toplamı", f"{detayli_toplam():,.2f} TL"),
        (
            "Diğer kalemler (götürü / birim fiyat teklifte ayrılmamış)",
            f"{money(SOZLESME_MATRAH - detayli_toplam()):,.2f} TL",
        ),
        ("", ""),
        (
            "Dosya içeriği",
            "1) İMALAT LİSTESİ — sözleşme kalemleri | "
            "2) HAKEDİŞ DÖNEM — bu dönem ilerleme | "
            "3) FATURA TASLAĞI | 4) İCMAL",
        ),
        (
            "Not",
            "Hakediş; çift imzalı saha tutanağı ve tamamlanan imalat oranına göre düzenlenir. "
            "Götürü kalemlerde yüzde ilerleme kullanılabilir.",
        ),
    ]
    r = 3
    for label, val in rows:
        ws.cell(row=r, column=1, value=label).font = Font(bold=True) if label else Font()
        ws.cell(row=r, column=2, value=val).alignment = Alignment(wrap_text=True)
        r += 1


def build_imalat_listesi(wb: Workbook) -> None:
    ws = wb.create_sheet("İMALAT LİSTESİ")
    set_col_widths(
        ws,
        {"A": 5, "B": 8, "C": 28, "D": 10, "E": 8, "F": 12, "G": 14, "H": 36},
    )

    ws.merge_cells("A1:H1")
    ws["A1"] = f"SÖZLEŞME İMALAT CETVELİ — {PROJE_ADI}"
    ws["A1"].font = Font(bold=True, size=12)

    hdr = 3
    headers = [
        "Sıra",
        "Poz",
        "İmalat kalemi",
        "Söz. miktar",
        "Birim",
        "Birim fiyat (TL)",
        "Sözleşme tutarı (TL)",
        "Açıklama / mahal",
    ]
    for c, h in enumerate(headers, 1):
        ws.cell(row=hdr, column=c, value=h)
    style_header_row(ws, hdr, len(headers))

    row = hdr + 1
    data_start = row
    for i, k in enumerate(KALEMLER, 1):
        ws.cell(row=row, column=1, value=i)
        ws.cell(row=row, column=2, value=k["poz"])
        ws.cell(row=row, column=3, value=k["kalem"])
        if k["miktar"] is not None:
            ws.cell(row=row, column=4, value=k["miktar"])
        ws.cell(row=row, column=5, value=k["birim"])
        if k["bf"] is not None:
            ws.cell(row=row, column=6, value=k["bf"])
        if k["tutar"] is not None:
            ws.cell(row=row, column=7, value=k["tutar"])
        ws.cell(row=row, column=8, value=k["aciklama"])
        if k["tutar"] is None:
            for c in range(1, 9):
                ws.cell(row=row, column=c).fill = WARN_FILL
        row += 1

    style_table(ws, data_start, row - 1, 8)
    for r in range(data_start, row):
        ws.cell(row=r, column=4).number_format = "#,##0.00"
        ws.cell(row=r, column=6).number_format = '#,##0.00 "TL"'
        ws.cell(row=r, column=7).number_format = '#,##0.00 "TL"'

    ws.cell(row=row, column=3, value="Detaylı kalem toplamı").font = Font(bold=True)
    ws.cell(row=row, column=7, value=detayli_toplam()).font = Font(bold=True)
    for c in range(1, 9):
        ws.cell(row=row, column=c).fill = ACCENT_FILL
        ws.cell(row=row, column=c).border = BORDER
    row += 1

    ws.cell(row=row, column=3, value="Götürü / fiyatı ayrılmamış kalemler payı").font = Font(bold=True)
    ws.cell(row=row, column=7, value=money(SOZLESME_MATRAH - detayli_toplam())).font = Font(
        bold=True
    )
    for c in range(1, 9):
        ws.cell(row=row, column=c).fill = WARN_FILL
        ws.cell(row=row, column=c).border = BORDER
    row += 1

    ws.cell(row=row, column=3, value="SÖZLEŞME MATRAHI (KDV hariç)").font = Font(bold=True)
    ws.cell(row=row, column=7, value=SOZLESME_MATRAH).font = Font(bold=True)
    for c in range(1, 9):
        ws.cell(row=row, column=c).fill = TOTAL_FILL
        ws.cell(row=row, column=c).border = BORDER
    ws.cell(row=row, column=7).number_format = '#,##0.00 "TL"'


def build_hakedis_donem(wb: Workbook) -> None:
    ws = wb.create_sheet("HAKEDİŞ DÖNEM")
    n = len(KALEMLER)
    last_data = 4 + n
    set_col_widths(
        ws,
        {
            "A": 5,
            "B": 8,
            "C": 26,
            "D": 8,
            "E": 12,
            "F": 12,
            "G": 10,
            "H": 14,
            "I": 14,
            "J": 14,
            "K": 12,
        },
    )

    ws.merge_cells("A1:K1")
    ws["A1"] = "DÖNEMSEL HAKEDİŞ CETVELİ"
    ws["A1"].font = Font(bold=True, size=12)
    ws.merge_cells("A2:K2")
    ws[
        "A2"
    ] = f"Proje: {PROJE_ADI} | Dönem: ____ / ____ — ____ / ____ | Hakediş no: ___"

    hdr = 4
    headers = [
        "Sıra",
        "Poz",
        "İmalat kalemi",
        "Birim",
        "Söz. tutar (TL)",
        "Önceki küm. (TL)",
        "Bu dönem %",
        "Bu dönem miktar",
        "Bu dönem tutar (TL)",
        "Kümülatif (TL)",
        "Kalan (TL)",
    ]
    for c, h in enumerate(headers, 1):
        ws.cell(row=hdr, column=c, value=h)
    style_header_row(ws, hdr, len(headers))

    row = hdr + 1
    data_start = row
    for i, k in enumerate(KALEMLER, 1):
        r = row
        ws.cell(row=r, column=1, value=i)
        ws.cell(row=r, column=2, value=k["poz"])
        ws.cell(row=r, column=3, value=k["kalem"])
        ws.cell(row=r, column=4, value=k["birim"])
        if k["tutar"] is not None:
            ws.cell(row=r, column=5, value=k["tutar"])
        ws.cell(row=r, column=6, value=0)
        ws.cell(row=r, column=9, value=f'=IF(OR(G{r}="",NOT(ISNUMBER(E{r}))),"",E{r}*G{r})')
        ws.cell(row=r, column=10, value=f"=F{r}+I{r}")
        ws.cell(row=r, column=11, value=f'=IF(ISNUMBER(E{r}),E{r}-J{r},"")')
        row += 1

    goturu = money(SOZLESME_MATRAH - detayli_toplam())
    r = row
    ws.cell(row=r, column=1, value=len(KALEMLER) + 1)
    ws.cell(row=r, column=2, value="T-GOT")
    ws.cell(row=r, column=3, value="Götürü kalemler (elektrik, mekanik, boya, mobilya, tezgah, seramik vb.)")
    ws.cell(row=r, column=4, value="götürü")
    ws.cell(row=r, column=5, value=goturu)
    ws.cell(row=r, column=6, value=0)
    ws.cell(row=r, column=9, value=f'=IF(OR(G{r}="",NOT(ISNUMBER(E{r}))),"",E{r}*G{r})')
    ws.cell(row=r, column=10, value=f"=F{r}+I{r}")
    ws.cell(row=r, column=11, value=f"=E{r}-J{r}")
    row += 1

    style_table(ws, data_start, row - 1, 11)
    for r in range(data_start, row):
        for c in (5, 6, 8, 9, 10, 11):
            ws.cell(row=r, column=c).number_format = "#,##0.00"
        ws.cell(row=r, column=7).number_format = "0.00%"

    sum_row = row + 1
    ws.cell(row=sum_row, column=3, value="Bu dönem matrah (KDV hariç)").font = Font(bold=True)
    ws.cell(row=sum_row, column=9, value=f"=SUM(I{data_start}:I{row - 1})").font = Font(bold=True)
    for c in range(1, 12):
        ws.cell(row=sum_row, column=c).fill = ACCENT_FILL
        ws.cell(row=sum_row, column=c).border = BORDER

    kdv_row = sum_row + 1
    ws.cell(row=kdv_row, column=3, value="KDV (%20)")
    ws.cell(row=kdv_row, column=9, value=f"=I{sum_row}*0.20")

    genel_row = kdv_row + 1
    ws.cell(row=genel_row, column=3, value="Bu dönem tahsil (matrah + KDV)").font = Font(
        bold=True
    )
    ws.cell(row=genel_row, column=9, value=f"=I{sum_row}+I{kdv_row}").font = Font(bold=True)
    for c in range(1, 12):
        ws.cell(row=genel_row, column=c).fill = TOTAL_FILL
        ws.cell(row=genel_row, column=c).border = BORDER

    sig = genel_row + 2
    ws.cell(row=sig, column=1, value="İşveren imza / kaşe")
    ws.cell(row=sig, column=6, value="Yüklenici imza / kaşe")
    ws.cell(row=sig + 1, column=1, value="Tarih: __________")
    ws.cell(row=sig + 1, column=6, value="Tarih: __________")


def build_fatura(wb: Workbook) -> None:
    ws = wb.create_sheet("FATURA TASLAĞI")
    set_col_widths(ws, {"A": 5, "B": 10, "C": 44, "D": 8, "E": 10, "F": 12, "G": 14, "H": 8})

    ws.merge_cells("A1:H1")
    ws["A1"] = "e-FATURA / e-ARŞİV HAZIRLIK FORMU — VİLLA TADİLAT HAKEDİŞİ"
    ws["A1"].font = Font(bold=True, size=12)

    info = [
        ("Fatura tarihi", "____ / ____ / 20__"),
        ("Hakediş dönemi", "____ / ____ — ____ / ____"),
        ("Proje", PROJE_ADI),
        ("Alıcı (işveren)", "Unvan / VKN / adres — doldurunuz"),
        ("Satıcı (yüklenici)", "Unvan / VKN / adres — doldurunuz"),
    ]
    r = 3
    for label, val in info:
        ws.cell(row=r, column=1, value=label).font = Font(bold=True)
        ws.merge_cells(start_row=r, start_column=2, end_row=r, end_column=8)
        ws.cell(row=r, column=2, value=val)
        r += 1

    r += 1
    hdr = r
    headers = [
        "Sıra",
        "Poz",
        "Mal / hizmet açıklaması",
        "Birim",
        "Miktar",
        "Birim fiyat",
        "Tutar (KDV hariç)",
        "KDV %",
    ]
    for c, h in enumerate(headers, 1):
        ws.cell(row=hdr, column=c, value=h)
    style_header_row(ws, hdr, len(headers))

    row = hdr + 1
    data_start = row
    for i, k in enumerate(KALEMLER, 1):
        if k["tutar"] is None:
            continue
        acik = f"{k['kalem']} — {PROJE_ADI} hakedişi ({k['aciklama']})"
        ws.cell(row=row, column=1, value=i)
        ws.cell(row=row, column=2, value=k["poz"])
        ws.cell(row=row, column=3, value=acik)
        ws.cell(row=row, column=4, value=k["birim"])
        if k["miktar"] is not None:
            ws.cell(row=row, column=5, value=k["miktar"])
        if k["bf"] is not None:
            ws.cell(row=row, column=6, value=k["bf"])
        ws.cell(row=row, column=7, value=k["tutar"])
        ws.cell(row=row, column=8, value=20)
        row += 1

    # Götürü blok — tek satır
    goturu = money(SOZLESME_MATRAH - detayli_toplam())
    ws.cell(row=row, column=2, value="T-XX")
    ws.cell(
        row=row,
        column=3,
        value=(
            "Elektrik, mekanik, boya, mobilya, tezgah, seramik, süpürgelik, aydınlatma "
            f"ve diğer götürü kalemler — {PROJE_ADI} (Teklif_1_2328)"
        ),
    )
    ws.cell(row=row, column=4, value="götürü")
    ws.cell(row=row, column=7, value=goturu)
    ws.cell(row=row, column=8, value=20)
    row += 1

    style_table(ws, data_start, row - 1, 8)
    for r in range(data_start, row):
        ws.cell(row=r, column=5).number_format = "#,##0.00"
        ws.cell(row=r, column=6).number_format = "#,##0.00"
        ws.cell(row=r, column=7).number_format = "#,##0.00"

    ws.cell(row=row, column=3, value="MAL / HİZMET TOPLAM (KDV matrahı)").font = Font(bold=True)
    ws.cell(row=row, column=7, value=SOZLESME_MATRAH).font = Font(bold=True)
    for c in range(1, 9):
        ws.cell(row=row, column=c).fill = TOTAL_FILL
        ws.cell(row=row, column=c).border = BORDER


def build_icmal(wb: Workbook) -> None:
    ws = wb.create_sheet("İCMAL")
    set_col_widths(ws, {"A": 32, "B": 18})

    kar = money(SOZLESME_MATRAH * KAR_ORANI)
    kdv_matrah = money(SOZLESME_MATRAH + kar)
    kdv = money(kdv_matrah * KDV_ORANI)
    genel = money(kdv_matrah + kdv)

    ws["A1"] = "HAKEDİŞ / FATURA İCMALİ"
    ws["A1"].font = Font(bold=True, size=12)

    items = [
        ("Proje", PROJE_ADI),
        ("Teklif referansı", TEKLIF_REF),
        ("Detaylı kalem matrahı", detayli_toplam()),
        ("Götürü kalemler payı", money(SOZLESME_MATRAH - detayli_toplam())),
        ("Sözleşme matrahı (KDV hariç)", SOZLESME_MATRAH),
        ("Yüklenici kâr / GG (%20)", kar),
        ("KDV matrahı", kdv_matrah),
        ("Hesaplanan KDV (%20)", kdv),
        ("GENEL TOPLAM (KDV dahil)", genel),
    ]
    r = 3
    ws.cell(row=r, column=1, value="Kalem").font = Font(bold=True)
    ws.cell(row=r, column=2, value="Tutar (TL)").font = Font(bold=True)
    style_header_row(ws, r, 2)
    r += 1
    for label, val in items:
        ws.cell(row=r, column=1, value=label)
        ws.cell(row=r, column=2, value=val)
        if isinstance(val, float):
            ws.cell(row=r, column=2).number_format = '#,##0.00 "TL"'
        if label.startswith("GENEL"):
            for c in (1, 2):
                ws.cell(row=r, column=c).fill = TOTAL_FILL
                ws.cell(row=r, column=c).font = Font(bold=True)
        r += 1


def main() -> None:
    wb = Workbook()
    build_kapak(wb)
    build_imalat_listesi(wb)
    build_hakedis_donem(wb)
    build_fatura(wb)
    build_icmal(wb)
    wb.save(OUT)
    print(f"Yazıldı: {OUT}")


if __name__ == "__main__":
    main()
