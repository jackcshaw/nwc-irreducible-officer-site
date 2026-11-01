import assert from 'node:assert/strict';
import {readFileSync, mkdtempSync, writeFileSync, rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {loadFontLock} from '../scripts/figure-fonts.mjs';
import {sha256} from '../scripts/figure-assets.mjs';

const path = 'figures/fonts/manifest.json';
const lock = loadFontLock(path);
const manifest = JSON.parse(readFileSync(path, 'utf8'));
assert.equal(lock.sha256, sha256(readFileSync(path)));
const productionCSS = readFileSync('figures/fonts/fonts.css', 'utf8');
assert.doesNotMatch(productionCSS, /https?:\/\//, 'production font CSS has no remote dependency');
for (const entry of Object.values(manifest.resources)) {
  assert.ok(productionCSS.includes(`/assets/figures/fonts/${entry.file}?v=${entry.sha256}`));
}
let handler;
await lock.install({route: async (matcher, fn) => { handler = fn; assert.ok(matcher.test(manifest.origin)); }});
let response;
await handler({request: () => ({url: () => manifest.origin}), fulfill: async value => response = value});
assert.equal(sha256(response.body), manifest.stylesheet.sha256);
let aborted = false;
await handler({request: () => ({url: () => 'https://fonts.gstatic.com/unlocked.woff2'}), abort: async () => aborted = true});
assert.ok(aborted, 'an unrecorded font cannot silently enter a parity capture');

const dir = mkdtempSync(join(tmpdir(), 'motion-font-lock-'));
try {
  const css = Buffer.from('@font-face {}');
  const data = {schema: 1, origin: manifest.origin, stylesheet: {file: 'font.css', sha256: sha256(css)}, resources: {}};
  writeFileSync(join(dir, 'font.css'), css);
  writeFileSync(join(dir, 'manifest.json'), JSON.stringify(data));
  loadFontLock(join(dir, 'manifest.json'));
  writeFileSync(join(dir, 'font.css'), 'changed');
  assert.throws(() => loadFontLock(join(dir, 'manifest.json')), /hash mismatch/);
} finally { rmSync(dir, {recursive: true, force: true}); }
console.log(`figure font lock passed: ${Object.keys(manifest.resources).length} pinned resources and fail-closed replay`);
