#!/usr/bin/env python3
import html
import re
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Flowable,
    Frame,
    KeepTogether,
    PageTemplate,
    Paragraph,
    Spacer,
)

PAGE_W, PAGE_H = letter

PDF_BG = colors.HexColor("#f6f1e8")
PDF_NAVY = colors.Color(0.039216, 0.133333, 0.258824)
PDF_BODY = colors.Color(0.141176, 0.164706, 0.192157)
PDF_RED = colors.Color(0.847059, 0.12549, 0.196078)
PDF_MUTED = colors.Color(0.478431, 0.447059, 0.392157)
PDF_RULE = colors.HexColor("#dbd4c8")


def main():
    if len(sys.argv) != 3:
        raise SystemExit("usage: generate-assets.py SOURCE_MARKDOWN ASSET_DIR")

    source_path = Path(sys.argv[1])
    asset_dir = Path(sys.argv[2])
    asset_dir.mkdir(parents=True, exist_ok=True)

    essay = source_path.read_text(encoding="utf-8").strip()

    write_pdf(essay, asset_dir / "the-irreducible-officer.pdf")
    write_loop_diagram(asset_dir / "human-ai-human-loop.png")
    write_ladder_diagram(asset_dir / "framing-ladder.png")


def write_pdf(markdown, output_path):
    body_font, body_bold, body_italic, mono_font = register_pdf_fonts()
    doc = BaseDocTemplate(
        str(output_path),
        pagesize=letter,
        leftMargin=78,
        rightMargin=78,
        topMargin=78,
        bottomMargin=66,
        title="The Irreducible Officer",
        author="Jack Shaw",
        subject="Purpose, Accountability, and AI-Enabled Strategic Judgment",
    )
    frame = Frame(
        doc.leftMargin,
        doc.bottomMargin,
        PAGE_W - doc.leftMargin - doc.rightMargin,
        PAGE_H - doc.topMargin - doc.bottomMargin,
        leftPadding=0,
        rightPadding=0,
        topPadding=0,
        bottomPadding=0,
    )
    doc.addPageTemplates([PageTemplate(id="main", frames=[frame], onPage=draw_pdf_page(mono_font))])
    doc.build(build_pdf_story(parse_pdf_blocks(markdown), body_font, body_bold, mono_font))


def register_pdf_fonts():
    font_dir = Path("/System/Library/Fonts/Supplemental")
    regular = font_dir / "Georgia.ttf"
    bold = font_dir / "Georgia Bold.ttf"
    italic = font_dir / "Georgia Italic.ttf"
    bold_italic = font_dir / "Georgia Bold Italic.ttf"
    mono = Path("/System/Library/Fonts/Monaco.ttf")

    body_font = "Times-Roman"
    body_bold = "Times-Bold"
    body_italic = "Times-Italic"
    body_bold_italic = "Times-BoldItalic"
    mono_font = "Courier"

    if regular.exists() and bold.exists() and italic.exists():
        body_font = "Georgia"
        body_bold = "Georgia-Bold"
        body_italic = "Georgia-Italic"
        if bold_italic.exists():
            body_bold_italic = "Georgia-BoldItalic"
        else:
            body_bold_italic = body_bold
        pdfmetrics.registerFont(TTFont(body_font, str(regular)))
        pdfmetrics.registerFont(TTFont(body_bold, str(bold)))
        pdfmetrics.registerFont(TTFont(body_italic, str(italic)))
        if bold_italic.exists():
            pdfmetrics.registerFont(TTFont(body_bold_italic, str(bold_italic)))
        pdfmetrics.registerFontFamily(
            "Georgia",
            normal=body_font,
            bold=body_bold,
            italic=body_italic,
            boldItalic=body_bold_italic,
        )

    if mono.exists():
        mono_font = "Monaco"
        pdfmetrics.registerFont(TTFont(mono_font, str(mono)))

    return body_font, body_bold, body_italic, mono_font


class PdfRule(Flowable):
    def __init__(self, width=42, thickness=1.6, tail=False):
        super().__init__()
        self.width = width
        self.thickness = thickness
        self.tail = tail
        self.height = 10
        self._available_width = width

    def wrap(self, avail_width, avail_height):
        self._available_width = avail_width
        return (avail_width if self.tail else min(self.width, avail_width)), self.height

    def draw(self):
        self.canv.setStrokeColor(PDF_RED)
        self.canv.setLineWidth(self.thickness)
        self.canv.line(0, 5, self.width, 5)
        if self.tail and self._available_width > self.width + 12:
            self.canv.setStrokeColor(PDF_RULE)
            self.canv.setLineWidth(0.55)
            self.canv.line(self.width + 10, 5, self._available_width, 5)


def draw_pdf_page(mono_font):
    def draw_page(canvas, doc):
        canvas.saveState()
        canvas.setFillColor(PDF_BG)
        canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)

        footer_y = 38
        canvas.setStrokeColor(PDF_RULE)
        canvas.setLineWidth(0.45)
        canvas.line(doc.leftMargin, footer_y + 18, PAGE_W - doc.rightMargin, footer_y + 18)
        canvas.setStrokeColor(PDF_RED)
        canvas.setLineWidth(1.3)
        canvas.line(doc.leftMargin, footer_y + 18, doc.leftMargin + 28, footer_y + 18)

        canvas.setFont(mono_font, 7.3)
        canvas.setFillColor(PDF_MUTED)
        canvas.drawString(doc.leftMargin, footer_y, "THE IRREDUCIBLE OFFICER")
        canvas.drawRightString(PAGE_W - doc.rightMargin, footer_y, str(canvas.getPageNumber()))
        canvas.restoreState()

    return draw_page


def parse_pdf_blocks(markdown):
    blocks = []
    paragraph = []

    def flush():
        if paragraph:
            blocks.append(("p", " ".join(paragraph).strip()))
            paragraph.clear()

    for raw in markdown.splitlines():
        line = raw.strip()
        if not line:
            flush()
            continue
        if line == "***":
            flush()
            blocks.append(("rule", ""))
            continue
        if line.startswith("# "):
            flush()
            blocks.append(("title", line[2:].strip()))
            continue
        if line.startswith("## "):
            flush()
            blocks.append(("h2", line[3:].strip()))
            continue
        paragraph.append(line)

    flush()
    return blocks


def build_pdf_story(blocks, body_font, body_bold, mono_font):
    styles = pdf_styles(body_font, body_bold, mono_font)
    story = [Paragraph("THE IRREDUCIBLE OFFICER", styles["kicker"])]

    in_references = False
    saw_title = False
    saw_subtitle = False
    title_rule_drawn = False

    for kind, value in blocks:
        if kind == "rule":
            if saw_title and saw_subtitle and not title_rule_drawn:
                story.append(PdfRule(width=28, thickness=1.5, tail=True))
                story.append(Spacer(1, 8))
                title_rule_drawn = True
            continue

        if kind == "title":
            story.append(Paragraph(pdf_inline(value), styles["title"]))
            saw_title = True
            continue

        if kind == "h2" and not saw_subtitle:
            story.append(Paragraph(pdf_inline(value), styles["subtitle"]))
            saw_subtitle = True
            continue

        if kind == "h2":
            roman, title = pdf_section_parts(value)
            if value == "References":
                in_references = True
                story.append(Spacer(1, 18))
                story.append(PdfRule(width=34, thickness=1.2))
                story.append(Spacer(1, 6))
                story.append(Paragraph("REFERENCES", styles["section_kicker"]))
                story.append(Paragraph("Sources", styles["section_title"]))
                continue

            kicker = f"SECTION {roman}" if roman else "SECTION"
            story.append(
                KeepTogether([
                    Paragraph(kicker, styles["section_kicker"]),
                    Paragraph(pdf_inline(title), styles["section_title"]),
                ])
            )
            continue

        if kind == "p":
            style = styles["references"] if in_references else styles["body"]
            if value == "Frame the problem. Calibrate the tool. Refuse the garden path. Own the decision.":
                style = styles["callout"]
            story.append(Paragraph(pdf_inline(value), style))

    return story


def pdf_styles(body_font, body_bold, mono_font):
    return {
        "kicker": ParagraphStyle(
            "kicker",
            fontName=mono_font,
            fontSize=9.5,
            leading=12,
            textColor=PDF_RED,
            alignment=TA_LEFT,
            spaceAfter=9,
        ),
        "title": ParagraphStyle(
            "title",
            fontName=body_bold,
            fontSize=29,
            leading=34,
            textColor=PDF_NAVY,
            alignment=TA_LEFT,
            spaceAfter=10,
        ),
        "subtitle": ParagraphStyle(
            "subtitle",
            fontName=body_font,
            fontSize=13.2,
            leading=18,
            textColor=PDF_BODY,
            alignment=TA_LEFT,
            spaceAfter=29,
        ),
        "section_kicker": ParagraphStyle(
            "section_kicker",
            fontName=mono_font,
            fontSize=8.8,
            leading=11,
            textColor=PDF_RED,
            alignment=TA_LEFT,
            spaceBefore=16,
            spaceAfter=4,
            keepWithNext=True,
        ),
        "section_title": ParagraphStyle(
            "section_title",
            fontName=body_bold,
            fontSize=17.2,
            leading=20,
            textColor=PDF_NAVY,
            alignment=TA_LEFT,
            spaceAfter=11,
            keepWithNext=True,
        ),
        "body": ParagraphStyle(
            "body",
            fontName=body_font,
            fontSize=10.9,
            leading=16.25,
            textColor=PDF_BODY,
            alignment=TA_LEFT,
            spaceAfter=9.2,
            splitLongWords=True,
        ),
        "references": ParagraphStyle(
            "references",
            fontName=body_font,
            fontSize=8.9,
            leading=12.4,
            textColor=PDF_BODY,
            alignment=TA_LEFT,
            spaceAfter=7.0,
            splitLongWords=True,
        ),
        "callout": ParagraphStyle(
            "callout",
            fontName=body_bold,
            fontSize=12.5,
            leading=17,
            textColor=PDF_NAVY,
            alignment=TA_CENTER,
            spaceBefore=6,
            spaceAfter=10,
        ),
    }


def pdf_section_parts(text):
    match = re.match(r"^([IVX]+)\.\s+(.+)$", text)
    if match:
        return match.group(1), match.group(2)
    return None, text


def pdf_inline(value):
    value = value.replace("\u2011", "-").replace("\u2010", "-")
    protected = []

    def stash(text):
        protected.append(text)
        return f"@@TOKEN{len(protected) - 1}@@"

    value = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", lambda match: stash(html.escape(match.group(1))), value)
    value = re.sub(r"<(https?://[^>]+)>", lambda match: stash(html.escape(match.group(1))), value)
    escaped = html.escape(value)
    escaped = re.sub(r"\*\*([^*]+)\*\*", r"<b>\1</b>", escaped)
    escaped = re.sub(r"\*([^*]+)\*", r"<i>\1</i>", escaped)
    escaped = re.sub(r"`([^`]+)`", r"<font name=\"Courier\">\1</font>", escaped)

    for index, text in enumerate(protected):
        escaped = escaped.replace(f"@@TOKEN{index}@@", text)
    return escaped


def font(size, bold=False):
    candidates = [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/System/Library/Fonts/Supplemental/Georgia Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Georgia.ttf",
        "/Library/Fonts/Arial.ttf",
    ]
    for candidate in candidates:
        if candidate and Path(candidate).exists():
            return ImageFont.truetype(candidate, size)
    return ImageFont.load_default()


def wrap(draw, text, font_obj, width):
    words = text.split()
    lines = []
    current = ""
    for word in words:
        candidate = f"{current} {word}".strip()
        if draw.textlength(candidate, font=font_obj) <= width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def text_block(draw, xy, text, font_obj, fill, width, line_gap=8):
    x, y = xy
    for line in wrap(draw, text, font_obj, width):
        draw.text((x, y), line, font=font_obj, fill=fill)
        y += font_obj.size + line_gap
    return y


def write_loop_diagram(output_path):
    w, h = 1400, 760
    img = Image.new("RGB", (w, h), "#fffaf1")
    draw = ImageDraw.Draw(img)
    title = font(52, bold=True)
    body = font(22)
    label = font(23, bold=True)
    small = font(19)

    draw.rectangle((0, 0, w, h), fill="#fffaf1")
    draw.text((70, 58), "The human-AI-human learning loop", font=title, fill="#171514")
    draw.text((74, 128), "AI can collapse work inside a frame. Learning is visible when the frame and the trace remain inspectable.", font=small, fill="#625a51")

    boxes = [
        (80, 230, 410, 530, "#f7f2e8", "Human frames", "Purpose, problem, assumptions, evidence standard, and interruption points."),
        (535, 230, 865, 530, "#eef5f5", "AI works inside frame", "Summarizes, critiques, generates alternatives, exposes blind spots, and accelerates drafting."),
        (990, 230, 1320, 530, "#f1f5ef", "Human judges", "Accepts, rejects, revises, defends, and remains accountable for the final reasoning."),
    ]

    for x1, y1, x2, y2, color, heading, copy in boxes:
        draw.rounded_rectangle((x1, y1, x2, y2), radius=26, fill=color, outline="#d9cfbf", width=3)
        draw.text((x1 + 30, y1 + 32), heading, font=label, fill="#171514")
        text_block(draw, (x1 + 30, y1 + 86), copy, body, "#625a51", x2 - x1 - 60, 7)

    draw.line((435, 380, 510, 380), fill="#204f63", width=8)
    draw.polygon([(510, 380), (482, 363), (482, 397)], fill="#204f63")
    draw.line((890, 380, 965, 380), fill="#204f63", width=8)
    draw.polygon([(965, 380), (937, 363), (937, 397)], fill="#204f63")

    draw.rounded_rectangle((220, 605, 1180, 685), radius=22, fill="#171514")
    draw.text((270, 630), "Output: a traceable learning artifact, not just a polished answer", font=label, fill="#fffaf1")
    img.save(output_path)


def write_ladder_diagram(output_path):
    w, h = 1400, 760
    img = Image.new("RGB", (w, h), "#fffaf1")
    draw = ImageDraw.Draw(img)
    title = font(52, bold=True)
    body = font(23)
    label = font(22, bold=True)
    small = font(18)

    draw.text((70, 58), "A ladder of framing responsibility", font=title, fill="#171514")
    draw.text((74, 128), "The question is not whether AI is allowed. The question is who owns the frame at each level of use.", font=small, fill="#625a51")

    steps = [
        ("Generic AI use", "Student inherits most of the model's frame."),
        ("Structured prompt and context", "Student names the task, role, material, and criteria."),
        ("Reusable workflow", "Steps, tools, stopping points, and review criteria become explicit."),
        ("Evaluator loop", "Disagreement, red-team critique, and reliance decisions become visible."),
        ("Institution-shaped workflow", "NWC standards and faculty judgment become reusable but must stay governable."),
    ]

    colors_list = ["#f7f2e8", "#f4eee1", "#eef5f5", "#eef3ea", "#f1e8e2"]
    for index, (heading, copy) in enumerate(steps):
        x = 110 + index * 42
        y = 188 + index * 88
        step_w = 1110 - index * 42
        step_h = 78
        draw.rounded_rectangle((x, y, x + step_w, y + step_h), radius=18, fill=colors_list[index], outline="#d9cfbf", width=3)
        draw.ellipse((x + 22, y + 20, x + 52, y + 50), fill="#204f63")
        draw.text((x + 33, y + 25), str(index + 1), font=small, fill="#fffaf1")
        draw.text((x + 72, y + 16), heading, font=label, fill="#171514")
        text_block(draw, (x + 410, y + 18), copy, small, "#625a51", step_w - 440, 3)
        if index < len(steps) - 1:
            arrow_x = x + 35
            draw.line((arrow_x, y + step_h + 6, arrow_x, y + step_h + 22), fill="#204f63", width=5)
            draw.polygon([(arrow_x, y + step_h + 30), (arrow_x - 11, y + step_h + 14), (arrow_x + 11, y + step_h + 14)], fill="#204f63")

    draw.rounded_rectangle((72, 650, 1328, 714), radius=18, fill="#171514")
    draw.text((120, 670), "At every rung, the learning evidence is frame ownership plus appropriate reliance.", font=body, fill="#fffaf1")
    img.save(output_path)


if __name__ == "__main__":
    main()
