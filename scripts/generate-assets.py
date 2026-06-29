#!/usr/bin/env python3
import html
import re
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    ListFlowable,
    ListItem,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
)


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
    doc = SimpleDocTemplate(
        str(output_path),
        pagesize=letter,
        rightMargin=0.74 * inch,
        leftMargin=0.74 * inch,
        topMargin=0.68 * inch,
        bottomMargin=0.72 * inch,
        title="The Irreducible Officer",
        author="Jack Shaw",
    )

    base = getSampleStyleSheet()
    styles = {
        "title": ParagraphStyle(
            "Title",
            parent=base["Title"],
            fontName="Times-Bold",
            fontSize=28,
            leading=30,
            alignment=TA_CENTER,
            spaceAfter=18,
            textColor=colors.HexColor("#171514"),
        ),
        "h2": ParagraphStyle(
            "Heading2",
            parent=base["Heading2"],
            fontName="Times-Bold",
            fontSize=16,
            leading=19,
            spaceBefore=18,
            spaceAfter=8,
            textColor=colors.HexColor("#171514"),
        ),
        "body": ParagraphStyle(
            "Body",
            parent=base["BodyText"],
            fontName="Times-Roman",
            fontSize=10.8,
            leading=14.2,
            firstLineIndent=0,
            alignment=TA_LEFT,
            spaceAfter=8,
            textColor=colors.HexColor("#171514"),
        ),
        "list": ParagraphStyle(
            "List",
            parent=base["BodyText"],
            fontName="Times-Roman",
            fontSize=10.6,
            leading=13.8,
            leftIndent=12,
            spaceAfter=4,
            textColor=colors.HexColor("#171514"),
        ),
    }

    story = []
    paragraph = []
    list_items = []
    list_kind = None

    def flush_paragraph():
        nonlocal paragraph
        if paragraph:
            story.append(Paragraph(inline(" ".join(paragraph)), styles["body"]))
            paragraph = []

    def flush_list():
        nonlocal list_items, list_kind
        if list_items:
            story.append(
                ListFlowable(
                    [ListItem(Paragraph(inline(item), styles["list"])) for item in list_items],
                    bulletType="1" if list_kind == "ol" else "bullet",
                    start="1",
                    leftIndent=18,
                )
            )
            story.append(Spacer(1, 4))
            list_items = []
            list_kind = None

    for raw in markdown.splitlines():
        line = raw.rstrip()
        stripped = line.strip()

        if not stripped:
            flush_paragraph()
            flush_list()
            continue

        if stripped.startswith("# "):
            flush_paragraph()
            flush_list()
            story.append(Paragraph(inline(stripped[2:]), styles["title"]))
            story.append(Spacer(1, 8))
            continue

        if stripped.startswith("## "):
            flush_paragraph()
            flush_list()
            story.append(Paragraph(inline(stripped[3:]), styles["h2"]))
            continue

        unordered = re.match(r"^-\s+(.+)$", stripped)
        ordered = re.match(r"^\d+\.\s+(.+)$", stripped)
        if unordered or ordered:
            flush_paragraph()
            kind = "ol" if ordered else "ul"
            if list_kind and list_kind != kind:
                flush_list()
            list_kind = kind
            list_items.append((ordered or unordered).group(1))
            continue

        paragraph.append(stripped)

    flush_paragraph()
    flush_list()

    doc.build(story, onFirstPage=page_footer, onLaterPages=page_footer)


def page_footer(canvas, doc):
    canvas.saveState()
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(colors.HexColor("#625a51"))
    canvas.drawCentredString(letter[0] / 2, 0.38 * inch, f"The Irreducible Officer | {doc.page}")
    canvas.restoreState()


def inline(value):
    escaped = html.escape(value)

    def link(match):
        label = html.escape(match.group(1))
        href = html.escape(match.group(2), quote=True)
        return f'<a href="{href}" color="#204f63">{label}</a>'

    escaped = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", link, escaped)
    escaped = re.sub(r"\*\*([^*]+)\*\*", r"<b>\1</b>", escaped)
    escaped = re.sub(r"`([^`]+)`", r"<font name=\"Courier\">\1</font>", escaped)
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
