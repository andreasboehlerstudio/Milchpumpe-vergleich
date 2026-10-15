"""Generate original, measured editorial cards, not product photography.
Run npx tsx scripts/prepare-pinterest.ts first. Requires Pillow and local Windows fonts.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import json
root = Path(__file__).resolve().parents[1]
out = root / 'public/editorial'
out.mkdir(parents=True, exist_ok=True)
items = json.loads((root / 'docs/content-map.json').read_text(encoding='utf-8'))
assert len(items) >= 20 and len({i['slug'] for i in items}) == len(items)


def font(name, size):
    return ImageFont.truetype('C:/Windows/Fonts/' + name, size)


def block(draw, text, xy, width, height, name, start, color):
    for size in range(start, 19, -1):
        face = font(name, size)
        lines, line = [], ''
        for word in text.split():
            candidate = (line + ' ' + word).strip()
            if line and draw.textlength(candidate, font=face) > width:
                lines.append(line)
                line = word
            else:
                line = candidate
        lines.append(line)
        step = int(size * 1.22)
        if len(lines) * step <= height and all(draw.textlength(s, font=face) <= width for s in lines):
            break
    else:
        raise ValueError('Text does not fit: ' + text)
    x, y = xy
    for line in lines:
        draw.text((x, y), line, font=face, fill=color)
        y += step


manifest = []
colors = ['#c8efd9', '#ffd0b9', '#d5e8f0', '#ebe0f2', '#ffe5b9']
for index, item in enumerate(items):
    for kind, size in [('pin', (1000, 1500)), ('og', (1200, 630))]:
        img = Image.new('RGB', size, '#fff9ee')
        d = ImageDraw.Draw(img)
        ink, accent, color = '#183832', '#086d61', colors[index % len(colors)]
        label = font('arialbd.ttf', 21)
        d.rectangle((0, 0, size[0], 14), fill=accent)
        d.text((64, 48), 'MILCHPUMPE-VERGLEICH.DE', font=label, fill=accent)
        if kind == 'pin':
            d.rounded_rectangle((48, 120, 952, 1280), radius=22, fill=color)
            d.text((90, 164), 'EINE KONKRETE FRAGE. EINE KLARE EINORDNUNG.', font=label, fill=accent)
            block(d, item['title'], (86, 240), 820, 400, 'georgia.ttf', 81, ink)
            d.line((90, 675, 906, 675), fill=accent, width=2)
            for i, check in enumerate(item['checks'][:3]):
                y = 733 + i * 120
                d.text((90, y + 4), f'{i+1:02}', font=label, fill=accent)
                block(d, check, (152, y), 745, 94, 'arial.ttf', 31, ink)
            d.rounded_rectangle((90, 1120, 900, 1205), radius=8, fill=accent)
            d.text((122, 1150), 'MODELLFRAGE IM RATGEBER KLÄREN', font=font('arialbd.ttf', 28), fill='white')
            d.text((64, 1330), 'Ratgeber: milchpumpe-vergleich.de', font=font('arial.ttf', 27), fill=ink)
            d.text((64, 1410), 'Zielartikel enthält gekennzeichnete Affiliate-Links.', font=label, fill=accent)
        else:
            d.rounded_rectangle((760, 120, 1140, 550), radius=16, fill=color)
            block(d, item['title'], (64, 142), 650, 340, 'georgia.ttf', 57, ink)
            block(d, item['question'], (792, 174), 320, 285, 'arialbd.ttf', 31, ink)
            d.text((64, 545), 'MODELLFRAGE / RECHERCHIERTE KAUFHILFE', font=label, fill=accent)
        target = out / f"{item['slug']}-{kind}.png"
        img.save(target, optimize=True)
        with Image.open(target) as saved:
            assert saved.size == size and saved.format == 'PNG'
        manifest.append({'slug': item['slug'], 'kind': kind, 'path': str(target.relative_to(root)), 'size': list(size), 'rights': 'Original editorial layout; no third-party photos'})
(root / 'public/og-cover.png').write_bytes((out / 'hands-free-milchpumpe-kaufen-og.png').read_bytes())
(root / 'docs/image-manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
assert len(manifest) == len(items) * 2
print(json.dumps({'articles': len(items), 'cards': len(manifest), 'with_default_og': len(manifest)+1}))
