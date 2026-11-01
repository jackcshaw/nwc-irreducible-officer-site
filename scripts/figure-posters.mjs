import {readFileSync, writeFileSync, mkdirSync, realpathSync} from 'node:fs';
import {relative, resolve, isAbsolute} from 'node:path';
import {sha256} from './figure-assets.mjs';
import {loadFontLock} from './figure-fonts.mjs';

function inside(root, path) {
  if (typeof path !== 'string' || isAbsolute(path) || path.split('/').some(part => !part || part === '.' || part === '..')) throw new Error(`Invalid poster input: ${path}`);
  const file = realpathSync(resolve(root, path));
  const rel = relative(realpathSync(root), file);
  if (isAbsolute(rel) || rel === '..' || rel.startsWith('../')) throw new Error(`Poster input escapes root: ${path}`);
  return file;
}
export function posterInputHashes(root, files) {
  if (new Set(files).size !== files.length) throw new Error('Duplicate poster input');
  return Object.fromEntries([...files].sort().map(file => [file, sha256(readFileSync(inside(root, file)))]));
}
export function pngInfo(bytes) {
  if (bytes.length < 24 || !bytes.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10])) || bytes.subarray(12,16).toString() !== 'IHDR') throw new Error('Poster is not a PNG');
  return {sha256: sha256(bytes), width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20)};
}
export function assertPosterReceipt(receipt, {root, inputs, outputDir, variant}) {
  if (receipt.schema !== 1 || receipt.variant !== variant) throw new Error('Wrong poster receipt version or variant');
  const current = posterInputHashes(root, inputs);
  if (JSON.stringify(current) !== JSON.stringify(receipt.inputs)) throw new Error('Stale poster inputs; regenerate figure posters');
  for (const file of ['poster.png', 'final.png', 'og.png']) {
    const expected = receipt.outputs?.[file];
    const actual = pngInfo(readFileSync(resolve(outputDir, file)));
    if (!expected || JSON.stringify(actual) !== JSON.stringify(expected)) throw new Error(`Stale poster output: ${file}`);
  }
  if (receipt.outputs['og.png'].width !== 1200 || receipt.outputs['og.png'].height !== 630) throw new Error('Share image must be 1200 by 630');
}

// Called explicitly after building the candidate pages, never by the normal build.
// The caller supplies the full dependency set (including this generator and fonts).
export async function generateFigurePosters({url, figureId, variant, questionFirst = false, root, inputs, outputDir, fontLock}) {
  const inputHashes = posterInputHashes(root, inputs);
  const fonts = loadFontLock(fontLock);
  const {chromium} = await import('@playwright/test');
  const browser = await chromium.launch();
  const errors = [];
  const outputs = {};
  try {
    const context = await browser.newContext({viewport: {width: 1440, height: 900}, deviceScaleFactor: 1});
    await fonts.install(context);
    await context.addInitScript(() => document.addEventListener('DOMContentLoaded', () => {
      const style = document.createElement('style'); style.textContent = '*,*::before,*::after{transition:none!important;animation:none!important}'; document.head.append(style);
    }));
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    await page.goto(url);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForFunction(id => window.__motionFigures?.[id], figureId);
    const timing = await page.evaluate(id => {
      const player = window.__motionFigures[id]; return {duration: player.duration, gates: player.gates};
    }, figureId);
    if (questionFirst && !timing.gates?.length) throw new Error('Question-first poster requires a question gate');
    const posterTime = questionFirst ? timing.gates[0] : timing.duration;
    const shot = page.locator(`[id="${figureId}"] [data-mf-shot]`);
    const capture = async time => {
      await page.evaluate(([id, at]) => window.__motionFigures[id].seek(at), [figureId, time]);
      await page.waitForTimeout(30);
      return shot.screenshot();
    };
    const poster = await capture(posterTime);
    const final = questionFirst ? await capture(timing.duration) : poster;
    const share = await page.evaluate(async src => {
      const image = new Image(); image.src = src; await image.decode();
      const canvas = document.createElement('canvas'); canvas.width = 1200; canvas.height = 630;
      const ctx = canvas.getContext('2d'); ctx.fillStyle = '#f6f1e8'; ctx.fillRect(0, 0, 1200, 630);
      const scale = Math.min(1168 / image.width, 598 / image.height), width = image.width * scale, height = image.height * scale;
      ctx.drawImage(image, (1200 - width) / 2, (630 - height) / 2, width, height);
      return canvas.toDataURL('image/png').split(',')[1];
    }, `data:image/png;base64,${poster.toString('base64')}`);
    if (errors.length) throw new Error(`Poster browser errors: ${errors.join('; ')}`);
    if (JSON.stringify(posterInputHashes(root, inputs)) !== JSON.stringify(inputHashes)) throw new Error('Poster inputs changed during capture');
    mkdirSync(outputDir, {recursive: true});
    for (const [file, bytes] of Object.entries({'poster.png': poster, 'final.png': final, 'og.png': Buffer.from(share, 'base64')})) {
      outputs[file] = pngInfo(bytes); writeFileSync(resolve(outputDir, file), bytes);
    }
    const receipt = {schema: 1, variant, questionFirst, posterTime, finalTime: timing.duration, viewport: [1440,900], browser: browser.version(), fontLock: fonts.sha256, inputs: inputHashes, outputs};
    writeFileSync(resolve(outputDir, 'manifest.json'), JSON.stringify(receipt, null, 2) + '\n');
    return receipt;
  } finally { await browser.close(); }
}
