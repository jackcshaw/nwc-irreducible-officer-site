import {test, expect} from '@playwright/test';
import {readFileSync} from 'node:fs';

let errors = [];
test.beforeEach(({page}) => { errors = []; page.on('pageerror', error => errors.push(error.message)); });
test.afterEach(() => expect(errors).toEqual([]));

const runtime = readFileSync('figures/runtime/motion.js', 'utf8');
const player = id => `<figure id="${id}" data-mf-figure="probe" data-mf-autoplay="off">
  <div data-mf-shot><svg width="200" height="50"><defs><clipPath id="clip"><rect width="200" height="50"/></clipPath></defs><rect data-probe width="10" height="10" clip-path="url(#clip)"/></svg><div data-mf-caption></div></div>
  <button data-mf-toggle><span data-mf-label>Play</span></button><button data-mf-replay>Restart</button>
  <input data-mf-scrub type="range" aria-label="Time"><span data-mf-time></span>
  <ol data-mf-beats class="is-list"><li data-mf-beat-index="0"><span class="mf-n">1</span><span class="mf-text">Pre-rendered beat</span><p class="mf-detail">On screen: A square.</p></li></ol>
</figure>`;
async function prepare(page, query = '') {
  await page.route('**/runtime-probe*', route => route.fulfill({contentType: 'text/html', body: '<!doctype html><title>Runtime probe</title>'}));
  await page.goto('/runtime-probe' + query);
  await page.setContent(player('first') + player('second'));
  await page.addScriptTag({content: runtime});
  await page.evaluate(() => {
    window.staticText = document.querySelector('#first .mf-text');
    MotionFigures.define('probe', (root, {edition}) => MotionFigures.mount(root, {
      duration: 10, beats: [{at: 0, text: 'Pre-rendered beat', detail: 'A square.'}],
      render: time => root.querySelector('[data-probe]').setAttribute('x', time),
    }));
  });
}

test('two instances hydrate existing text and isolate controls and SVG IDs', async ({page}) => {
  await prepare(page);
  await page.evaluate(async () => {
    for (const id of ['first', 'second']) await MotionFigures.mountFigure(document.getElementById(id), {edition: {id: 'business'}});
    await MotionFigures.mountFigure(document.getElementById('first'), {edition: {id: 'business'}});
  });
  await expect(page.locator('#first [data-mf-beats] li')).toHaveCount(1);
  expect(await page.evaluate(() => document.querySelector('#first .mf-text') === window.staticText)).toBe(true);
  expect(await page.locator('[id]').evaluateAll(nodes => new Set(nodes.map(n => n.id)).size === nodes.length)).toBe(true);
  await expect(page.locator('#first [data-probe]')).toHaveAttribute('clip-path', 'url(#first-clip)');
  await page.evaluate(() => window.__motionFigures.first.seek(5));
  await expect(page.locator('#first [data-mf-scrub]')).toHaveValue('5');
  await expect(page.locator('#second [data-mf-scrub]')).toHaveValue('0');
});

test('unmount stops playback, removes hooks and restores static markup for remount', async ({page}) => {
  await prepare(page);
  await page.evaluate(async () => {
    const root = document.getElementById('first');
    window.instance = await MotionFigures.mountFigure(root, {edition: {id: 'business'}});
    window.instance.play();
  });
  await expect(page.locator('#first')).toHaveAttribute('data-state', 'playing');
  await page.evaluate(() => { MotionFigures.unmountFigure(document.getElementById('first')); MotionFigures.unmountFigure(document.getElementById('first')); });
  expect(await page.evaluate(() => window.__motionFigures.first)).toBeUndefined();
  await expect(page.locator('#first [data-mf-beats] button')).toHaveCount(0);
  await expect(page.locator('#first [data-probe]')).not.toHaveAttribute('x');
  await page.evaluate(() => { window.instance.play(); window.dispatchEvent(new Event('beforeprint')); });
  await expect(page.locator('#first [data-probe]')).not.toHaveAttribute('x');
  await page.evaluate(() => MotionFigures.mountFigure(document.getElementById('first'), {edition: {id: 'business'}}));
  await expect(page.locator('#first [data-mf-beats] li')).toHaveCount(1);
  await page.locator('#first [data-mf-toggle]').click();
  await expect(page.locator('#first')).toHaveAttribute('data-state', 'playing');
});

test('standalone query hooks do not freeze an embedded player', async ({page}) => {
  await prepare(page, '?t=5&reduced');
  await page.evaluate(async () => {
    await MotionFigures.mountFigure(document.getElementById('first'), {edition: {id: 'business'}});
    await MotionFigures.mountFigure(document.getElementById('second'), {edition: {id: 'business'}, standalone: true});
  });
  await expect(page.locator('#first [data-mf-scrub]')).toHaveValue('0');
  await expect(page.locator('#first')).not.toHaveClass(/is-reduced/);
  await expect(page.locator('#second [data-mf-scrub]')).toHaveValue('5');
  await expect(page.locator('#second')).toHaveClass(/is-reduced/);
});

test('cancelled pending mount leaves the readable fallback intact', async ({page}) => {
  await prepare(page);
  const result = await page.evaluate(async () => {
    const root = document.getElementById('first');
    const pending = MotionFigures.mountFigure(root, {edition: {id: 'business'}});
    MotionFigures.unmountFigure(root);
    return await pending;
  });
  expect(result).toBeNull();
  await expect(page.locator('#first [data-mf-beats] button')).toHaveCount(0);
  await expect(page.locator('#first .mf-text')).toHaveText('Pre-rendered beat');
});

test('failed initialization restores the selected static text and permits retry', async ({page}) => {
  await prepare(page);
  const result = await page.evaluate(async () => {
    let fail = true;
    MotionFigures.define('retry', root => {
      if (fail) { root.querySelector('.mf-text').textContent = 'Incomplete mount'; fail = false; throw new Error('Asset failed'); }
      return MotionFigures.mount(root, {duration: 10, beats: [{at: 0, text: 'Pre-rendered beat'}], render() {}});
    });
    const root = document.getElementById('first');
    root.dataset.mfFigure = 'retry';
    let error;
    try { await MotionFigures.mountFigure(root, {edition: {id: 'business'}}); } catch (e) { error = e.message; }
    const fallback = root.querySelector('.mf-text').textContent;
    await MotionFigures.mountFigure(root, {edition: {id: 'business'}});
    return {error, fallback};
  });
  expect(result).toEqual({error: 'Asset failed', fallback: 'Pre-rendered beat'});
  await expect(page.locator('#first [data-mf-beats] li')).toHaveCount(1);
  await page.locator('#first [data-mf-toggle]').click();
  await expect(page.locator('#first')).toHaveAttribute('data-state', 'playing');
});

test('a cancelled mount cannot tear down its replacement', async ({page}) => {
  await prepare(page);
  const result = await page.evaluate(async () => {
    const root = document.getElementById('first');
    const abandoned = MotionFigures.mountFigure(root, {edition: {id: 'business'}});
    MotionFigures.unmountFigure(root);
    const replacement = MotionFigures.mountFigure(root, {edition: {id: 'business'}});
    return {abandoned: await abandoned, replacement: !!(await replacement)};
  });
  expect(result).toEqual({abandoned: null, replacement: true});
  await page.locator('#first [data-mf-toggle]').click();
  await expect(page.locator('#first')).toHaveAttribute('data-state', 'playing');
});


test('embedded players wait for explicit Play even when fully visible', async ({page}) => {
  await prepare(page);
  await page.evaluate(async () => {
    const root = document.getElementById('first');
    root.removeAttribute('data-mf-autoplay');
    await MotionFigures.mountFigure(root, {edition: {id: 'business'}});
  });
  await page.waitForTimeout(1000);
  await expect(page.locator('#first')).not.toHaveAttribute('data-state', 'playing');
  await page.locator('#first [data-mf-toggle]').click();
  await expect(page.locator('#first')).toHaveAttribute('data-state', 'playing');
});

test('printing a paused explanatory figure restores its screen moment', async ({page}) => {
  await prepare(page);
  await page.evaluate(async () => {
    await MotionFigures.mountFigure(document.getElementById('first'), {edition: {id: 'business'}});
    window.__motionFigures.first.seek(4);
    window.dispatchEvent(new Event('beforeprint'));
  });
  await expect(page.locator('#first [data-mf-scrub]')).toHaveValue('10');
  await page.evaluate(() => window.dispatchEvent(new Event('afterprint')));
  await expect(page.locator('#first [data-mf-scrub]')).toHaveValue('4');
  await expect(page.locator('#first')).toHaveAttribute('data-state', 'paused');
});

test('reader controls respect an unanswered gate while export seek can inspect later frames', async ({page}) => {
  await prepare(page);
  await page.evaluate(async () => {
    MotionFigures.define('gated-probe', root => {
      let answered = false;
      return MotionFigures.mount(root, {
        duration: 10, beats: [{at: 0, text: 'Pre-rendered beat'}], gates: [{at: 3, resumeAt: 4}],
        lockedAt: () => answered ? null : 3,
        onResume: () => { answered = true; }, render() {},
      });
    });
    const root = document.getElementById('first'); root.dataset.mfFigure = 'gated-probe';
    window.instance = await MotionFigures.mountFigure(root, {edition: {id: 'business'}});
    window.instance.seek(9); window.instance.play();
  });
  await expect(page.locator('#first [data-mf-scrub]')).toHaveValue('3');
  await expect(page.locator('#first')).toHaveAttribute('data-state', 'gate');
  await page.evaluate(() => window.__motionFigures.first.seek(9));
  await expect(page.locator('#first [data-mf-scrub]')).toHaveValue('9');
  await page.evaluate(() => window.instance.seek(0));
  await page.locator('#first [data-mf-scrub]').focus();
  await page.keyboard.press('End');
  await expect(page.locator('#first [data-mf-scrub]')).toHaveValue('3');
  await page.evaluate(() => window.instance.resume(0));
  await expect(page.locator('#first')).toHaveAttribute('data-state', 'playing');
});

test('standalone playback pauses offscreen and stays paused on return', async ({page}) => {
  await prepare(page);
  await page.evaluate(async () => {
    document.body.style.minHeight = '3000px';
    const instance = await MotionFigures.mountFigure(document.getElementById('first'), {edition: {id: 'business'}, standalone: true});
    instance.play();
  });
  await expect(page.locator('#first')).toHaveAttribute('data-state', 'playing');
  await page.evaluate(() => scrollTo(0, 1500));
  await expect(page.locator('#first')).toHaveAttribute('data-state', 'paused');
  await page.evaluate(() => scrollTo(0, 0));
  await page.waitForTimeout(850);
  await expect(page.locator('#first')).toHaveAttribute('data-state', 'paused');
});
