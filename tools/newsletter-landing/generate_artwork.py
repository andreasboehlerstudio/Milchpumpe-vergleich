"""Render ONLY cover + page 7 of the private approved PDF as promotional WebP.
Run: uv run --with pymupdf --with pillow python tools/newsletter-landing/generate_artwork.py
No PDF is copied to public; page content is never redrawn or fabricated.
"""
from pathlib import Path
import hashlib
import json
import pymupdf
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / 'private/newsletter-guide/dein-milchpumpen-kaufcheck.pdf'
TARGET = ROOT / 'public/newsletter-assets/kaufcheck-preview.webp'
EVIDENCE = ROOT / 'private/newsletter-landing/artwork-provenance.json'


def page_layer(document, page_number, width, angle):
    page = document[page_number - 1]
    pix = page.get_pixmap(matrix=pymupdf.Matrix(3, 3), alpha=False)
    image = Image.frombytes('RGB', (pix.width, pix.height), pix.samples).convert('RGBA')
    image = image.resize((width, round(width * page.rect.height / page.rect.width)), Image.Resampling.LANCZOS)
    return image.rotate(angle, resample=Image.Resampling.BICUBIC, expand=True)


def generate():
    document = pymupdf.open(SOURCE)
    assert len(document) == 8, 'Recheck the source before publishing a changed document preview'
    canvas = Image.new('RGBA', (1800, 2040))
    # Actual rasterized pages, each complete; restrained rotation and soft paper shadows.
    for page_number, width, angle, position in [(1, 1110, 4, (38, 30)), (7, 950, -5, (735, 570))]:
        layer = page_layer(document, page_number, width, angle)
        assert position[0] + layer.width <= canvas.width
        assert position[1] + layer.height <= canvas.height
        shadow = Image.new('RGBA', canvas.size)
        mask = Image.new('L', canvas.size)
        mask.paste(layer.getchannel('A'), (position[0] + 8, position[1] + 22))
        shadow.paste((7, 84, 73, 48), (0, 0, *canvas.size), mask.filter(ImageFilter.GaussianBlur(22)))
        canvas = Image.alpha_composite(canvas, shadow)
        canvas.alpha_composite(layer, position)
    TARGET.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(TARGET, 'WEBP', quality=94, method=6)
    with Image.open(TARGET) as check:
        assert check.size == (1800, 2040)
        assert check.format == 'WEBP'
    EVIDENCE.parent.mkdir(parents=True, exist_ok=True)
    evidence = dict(source=str(SOURCE.relative_to(ROOT)), source_sha256=hashlib.sha256(SOURCE.read_bytes()).hexdigest(), source_page_count=len(document), rendered_pages=[1, 7], width=1800, height=2040, output=str(TARGET.relative_to(ROOT)), output_sha256=hashlib.sha256(TARGET.read_bytes()).hexdigest(), bytes=TARGET.stat().st_size)
    EVIDENCE.write_text(json.dumps(evidence, indent=2), encoding='utf-8')
    print(json.dumps(evidence, indent=2))


if __name__ == '__main__':
    generate()
