"""Isolated Edge responsive QA. Does not touch the user's Edge session.
Run: uv run --with playwright python tools/newsletter-landing/verify_preview.py
Requires: node tools/newsletter-landing/serve-preview.mjs
"""
from pathlib import Path
from urllib.request import urlopen
import json
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[2]
EVIDENCE = ROOT / 'private/newsletter-landing'
BASE = 'http://127.0.0.1:4318'


def verify():
    assert urlopen(BASE).status == 200, 'Start the isolated server first'
    results = []
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(channel='msedge', headless=True)
        for width in [320, 390, 768, 1440]:
            context = browser.new_context(viewport={'width': width, 'height': 1000}, device_scale_factor=1)
            page = context.new_page()
            errors, requests = [], []
            page.on('pageerror', lambda error: errors.append(str(error)))
            page.on('request', lambda request: requests.append({'url': request.url, 'method': request.method}))
            page.goto(BASE, wait_until='networkidle')
            page.evaluate('document.fonts.ready')
            metrics = page.evaluate('''() => {
              const box = e => { const r=e.getBoundingClientRect(); return {x:r.x,y:r.y,width:r.width,height:r.height,right:r.right,bottom:r.bottom}; };
              const clipped=[];
              for (const selector of ['h1','.nl-lead','.nl-terms','.nl-email','.nl-consent span','.nl-cta span:first-child','.nl-privacy','figcaption']) {
                const e=document.querySelector(selector), r=e.getBoundingClientRect();
                if (e.scrollWidth>e.clientWidth+1 || r.left < -1 || r.right>innerWidth+1) clipped.push(selector);
                if (selector!=='.nl-email') {
                  const range=document.createRange();range.selectNodeContents(e);
                  // Font line boxes may exceed a light headline's line-height without clipping (overflow: visible).
                  const bounded = selector.includes('nl-cta') || selector.includes('nl-consent');
                  for(const text of range.getClientRects()) if(text.left<r.left-1 || text.right>r.right+1 || (bounded && (text.top<r.top-1 || text.bottom>r.bottom+1))) clipped.push(selector+':text');
                }
              }
              return {viewport:innerWidth,documentWidth:document.documentElement.scrollWidth,clipped,
                image:{...box(document.querySelector('.nl-document img')),loaded:document.querySelector('.nl-document img').naturalWidth===1800},
                email:box(document.querySelector('.nl-email')),button:box(document.querySelector('.nl-cta')),
                consent:box(document.querySelector('.nl-consent')),fontLoaded:document.fonts.check('300 40px Manrope'),
                disabled:[...document.querySelectorAll('input,button')].every(e=>e.matches(':disabled')),
                unchecked:!document.querySelector('[type=checkbox]').checked,
                noForm:document.querySelectorAll('form,script,iframe').length===0};
            }''')
            assert metrics['documentWidth'] == width, metrics
            assert not metrics['clipped'], metrics
            assert metrics['image']['loaded'] and metrics['fontLoaded'], metrics
            assert metrics['email']['height'] >= 60 and metrics['button']['height'] >= 60
            assert metrics['disabled'] and metrics['unchecked'] and metrics['noForm']
            assert not errors, errors
            assert all(r['url'].startswith(BASE + '/') and r['method'] == 'GET' for r in requests), requests
            screenshot = EVIDENCE / f'preview-{width}.png'
            page.screenshot(path=str(screenshot), full_page=True)
            page.locator('.nl-form-area').screenshot(path=str(EVIDENCE / f'controls-{width}.png'))
            results.append(dict(width=width, browser=browser.version, **metrics, requests=requests, page_errors=errors, screenshot=str(screenshot.relative_to(ROOT))))
            context.close()
        context = browser.new_context(viewport={'width':390,'height':1000})
        page = context.new_page()
        page.goto(BASE + '/inactive.html', wait_until='networkidle')
        assert page.locator('[role=status]').is_visible()
        assert page.locator('input,button,form').count() == 0
        page.screenshot(path=str(EVIDENCE / 'inactive-390.png'), full_page=True)
        browser.close()
    (EVIDENCE / 'responsive-evidence.json').write_text(json.dumps(results, indent=2), encoding='utf-8')
    print(json.dumps({'passed_widths': [r['width'] for r in results], 'inactive_default': 'passed', 'evidence': str(EVIDENCE / 'responsive-evidence.json')}, indent=2))


if __name__ == '__main__':
    verify()
