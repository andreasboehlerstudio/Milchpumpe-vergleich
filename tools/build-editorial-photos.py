# /// script
# requires-python = ">=3.11"
# dependencies = ["pillow==12.3.0"]
# ///
"""Derive small public variants from two already licensed tracked originals."""
from pathlib import Path
from PIL import Image
from hashlib import sha256
import json
ROOT=Path(__file__).resolve().parents[1]
assets=[]
for name,evidence,key in [('nursery','docs/editorial-v4-photo-rights.json','selected'),('pump-parts','docs/editorial-pump-parts-photo-rights.json',None)]:
 source=ROOT/f'public/editorial-photos/{name}.jpg'
 rights=json.loads((ROOT/evidence).read_text(encoding='utf-8'))
 expected=rights[key]['sha256'] if key else rights['publicDerivativeSha256']
 assert sha256(source.read_bytes()).hexdigest()==expected,'Original photo no longer matches rights evidence'
 with Image.open(source) as original:
  original.load();rgb=original.convert('RGB');w,h=rgb.size
  row={'source':f'/editorial-photos/{name}.jpg','sourceSha256':expected,'rightsEvidence':evidence,'width':w,'height':h,'modification':'Resized where applicable, converted to WebP quality 80, metadata removed. No change of scene, crop, model or credit.','derivatives':[]}
  for width in [480,960,w]:
   image=rgb.resize((width,round(h*width/w)),Image.Resampling.LANCZOS) if width!=w else rgb.copy()
   out=ROOT/f'public/editorial-photos/{name}-{width}.webp'
   image.save(out,format='WEBP',quality=80,method=6,exact=True)
   with Image.open(out) as check:
    check.load();assert check.size==image.size;assert not check.getexif();assert not check.info.get('exif')
   row['derivatives'].append({'src':f'/editorial-photos/{out.name}','width':image.width,'height':image.height,'bytes':out.stat().st_size,'sha256':sha256(out.read_bytes()).hexdigest()})
  assets.append(row)
manifest={'version':1,'assets':assets}
(ROOT/'docs/responsive-editorial-photos.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps({'photos':len(assets),'variants':sum(len(a['derivatives']) for a in assets),'bytes':[{'source':a['source'],'variants':[v['bytes'] for v in a['derivatives']]} for a in assets]},ensure_ascii=False))
