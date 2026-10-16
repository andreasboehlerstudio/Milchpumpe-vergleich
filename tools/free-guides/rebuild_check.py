"""Run the pinned build a second time and require byte-exact PDFs/WebPs."""
from pathlib import Path
import hashlib,json,subprocess
ROOT=Path(__file__).resolve().parents[2];OUT=ROOT/'private/free-guides-production'
report=json.loads((OUT/'production-report.json').read_text(encoding='utf-8'))
expected={}
for a in report['artifacts']:
    expected[a['pdfPath']]=a['pdfSha256'];expected[a['previewPath']]=a['previewSha256']
run=subprocess.run(['uv','run','tools/free-guides/build.py'],cwd=ROOT,capture_output=True,text=True,encoding='utf-8')
(OUT/'rebuild.log').write_text(run.stdout+'\n'+run.stderr,encoding='utf-8');assert run.returncode==0,run.stderr
results=[{'path':p,'expectedSha256':sha,'observedSha256':hashlib.sha256((ROOT/p).read_bytes()).hexdigest()} for p,sha in expected.items()]
assert all(r['expectedSha256']==r['observedSha256'] for r in results)
evidence={'status':'pass','byteExactArtifacts':len(results),'command':'uv run tools/free-guides/build.py','files':results}
(OUT/'reproducibility-check.json').write_text(json.dumps(evidence,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'status':'pass','byteExactArtifacts':len(results)}))
