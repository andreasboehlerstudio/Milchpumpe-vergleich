import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { Window } from 'happy-dom';
import { renderToStaticMarkup } from 'react-dom/server';
import { createElement } from 'react';
import App from '../src/App';

test('home and magazine photos use real smaller responsive derivatives while preserving originals, geometry and credit', () => {
  const file = new URL('../docs/responsive-editorial-photos.json', import.meta.url);
  assert.ok(existsSync(file), 'Responsive licensed-photo provenance manifest must exist');
  const manifest = JSON.parse(readFileSync(file, 'utf8'));
  assert.equal(manifest.assets.length, 2);
  for (const asset of manifest.assets) {
    const original = new URL(`../public${asset.source}`, import.meta.url);
    assert.equal(createHash('sha256').update(readFileSync(original)).digest('hex'), asset.sourceSha256);
    assert.equal(asset.derivatives.length, 3);
    for (const image of asset.derivatives) {
      const imageFile = new URL(`../public${image.src}`, import.meta.url);
      assert.equal(statSync(imageFile).size, image.bytes);
      assert.equal(createHash('sha256').update(readFileSync(imageFile)).digest('hex'), image.sha256);
      assert.ok(image.bytes < statSync(original).size);
      assert.ok(image.width <= asset.width);
    }
  }
  for (const path of ['/', '/ratgeber/']) {
    const window = new Window();
    window.document.body.innerHTML = renderToStaticMarkup(createElement(App, { initialPath: path }));
    const images = [...window.document.querySelectorAll('img[src^="/editorial-photos/"]')];
    assert.ok(images.length > 0);
    for (const image of images) {
      const asset = manifest.assets.find((entry: any) => entry.source === image.getAttribute('src'));
      assert.ok(asset);
      assert.equal(image.getAttribute('srcset'), asset.derivatives.map((variant: any) => `${variant.src} ${variant.width}w`).join(', '));
      assert.ok(image.getAttribute('sizes'));
      assert.ok(image.getAttribute('width'));
      assert.ok(image.getAttribute('height'));
      assert.ok(image.getAttribute('alt'));
    }
    assert.match(window.document.body.textContent, /LeslieKnope345/);
    window.close();
  }
});
