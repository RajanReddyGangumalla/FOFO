#!/usr/bin/env python3
"""Compile case_report.md -> case_report.pdf using reportlab."""
import re
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, PageBreak

SRC = "case_report.md"
OUT = "case_report.pdf"

styles = getSampleStyleSheet()
H1 = ParagraphStyle("H1", parent=styles["Heading1"], fontSize=17, spaceAfter=10, textColor=colors.HexColor("#1a3a5c"))
H2 = ParagraphStyle("H2", parent=styles["Heading2"], fontSize=13, spaceBefore=14, spaceAfter=6, textColor=colors.HexColor("#1a3a5c"))
H3 = ParagraphStyle("H3", parent=styles["Heading3"], fontSize=11, spaceBefore=10, spaceAfter=4)
BODY = ParagraphStyle("BODY", parent=styles["BodyText"], fontSize=9.5, leading=13, spaceAfter=5)
BULLET = ParagraphStyle("BULLET", parent=BODY, leftIndent=14, bulletIndent=4)
CELL = ParagraphStyle("CELL", parent=BODY, fontSize=8.5, leading=11, spaceAfter=0)
CELLB = ParagraphStyle("CELLB", parent=CELL, fontName="Helvetica-Bold")

def inline(t):
    t = t.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    t = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", t)
    t = re.sub(r"`(.+?)`", r'<font face="Courier" size="8">\1</font>', t)
    return t

def flush_table(rows):
    data = []
    for i, r in enumerate(rows):
        data.append([Paragraph(inline(c), CELLB if i == 0 else CELL) for c in r])
    t = Table(data, repeatRows=1)
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#1a3a5c")),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("GRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#b8c4d0")),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#f2f5f8")]),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 3),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
    ]))
    return t

COVER_TITLE = ParagraphStyle("COVER_TITLE", fontName="Helvetica-Bold", fontSize=26, leading=32, textColor=colors.HexColor("#1a3a5c"), alignment=1, spaceAfter=14)
COVER_SUB = ParagraphStyle("COVER_SUB", fontName="Helvetica", fontSize=13, leading=18, textColor=colors.HexColor("#444444"), alignment=1, spaceAfter=8)
COVER_META = ParagraphStyle("COVER_META", fontName="Helvetica", fontSize=10, leading=15, textColor=colors.HexColor("#666666"), alignment=1)
COVER_RULE = HRFlowable(width="40%", thickness=2, color=colors.HexColor("#1a3a5c"), spaceBefore=20, spaceAfter=20, hAlign="CENTER")

doc = SimpleDocTemplate(OUT, pagesize=A4, leftMargin=0.7*inch, rightMargin=0.7*inch,
                        topMargin=0.7*inch, bottomMargin=0.7*inch,
                        title="Bambinos AI PM Sales - Take-Home Case Report")
story = []
story += [
    Spacer(1, 2.2*inch),
    Paragraph("Bambinos.live", COVER_TITLE),
    Paragraph("AI Post-Demo Conversion &amp; Call Intelligence Pipeline", COVER_SUB),
    COVER_RULE,
    Paragraph("AI Program Manager (Sales) — Take-Home Case Submission", COVER_META),
    Spacer(1, 10),
    Paragraph("Candidate: [Your Name] &nbsp;·&nbsp; November 2026", COVER_META),
    Paragraph("Dataset: 6 call transcripts · 12-lead CRM · demo evaluations · orders · pricing &amp; compliance policy", COVER_META),
    Paragraph("Repository: github.com/[your-username]/FOFO", COVER_META),
]
story.append(PageBreak())
lines = open(SRC).read().splitlines()
i = 0
while i < len(lines):
    line = lines[i].rstrip()
    if not line.strip():
        i += 1; continue
    if line.startswith("|"):
        rows = []
        while i < len(lines) and lines[i].strip().startswith("|"):
            cells = [c.strip() for c in lines[i].strip().strip("|").split("|")]
            if not all(set(c) <= set("-: ") for c in cells):
                rows.append(cells)
            i += 1
        story.append(flush_table(rows)); story.append(Spacer(1, 8)); continue
    if line.startswith("# "):
        story.append(Paragraph(inline(line[2:]), H1))
    elif line.startswith("## "):
        story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#1a3a5c"), spaceBefore=2, spaceAfter=6))
        story.append(Paragraph(inline(line[3:]), H2))
    elif line.startswith("### "):
        story.append(Paragraph(inline(line[4:]), H3))
    elif line.startswith("---"):
        story.append(Spacer(1, 4)); story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#b8c4d0"))); story.append(Spacer(1, 6))
    elif line.startswith("- "):
        story.append(Paragraph(inline(line[2:]), BULLET, bulletText="•"))
    else:
        story.append(Paragraph(inline(line), BODY))
    i += 1

doc.build(story)
print("built", OUT)
