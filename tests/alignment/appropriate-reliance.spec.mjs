import {test,expect} from '@playwright/test';
const variants=[['','workplace'],['classroom/','classroom'],['high-school/','high-school'],['pme/','seminar']];
const route=suffix=>'/appropriate-reliance/'+suffix;
async function ready(page,suffix='') { await page.goto(route(suffix));await expect(page.locator('[data-mf-ready]')).toHaveCount(1); }
async function noAnswers(page) {
 const state=await page.evaluate(()=>{
  const body=document.body.cloneNode(true);body.querySelectorAll('script,noscript,template').forEach(n=>n.remove());
  const found=window.find('84.5%');getSelection()?.removeAllRanges();
  return {text:body.textContent,found};
 });
 expect(state.text).not.toContain('84.5%');expect(state.text).not.toContain('A good answer says');expect(state.found).toBe(false);
 const accessible=await page.locator('body').ariaSnapshot();expect(accessible).not.toContain('84.5%');expect(accessible).not.toContain('A good answer says');
}
for(const [suffix,cast] of variants) {
 test(`appropriate reliance ${cast}: reduced questions reveal in order and restart relocks`,async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});await ready(page,suffix);await noAnswers(page);
  await expect(page.locator('[data-ar-gate="0"]')).toBeVisible();await expect(page.locator('[data-ar-continue]')).toBeDisabled();
  await page.locator('[data-ar-gate="0"] [data-ar-opt="b"]').click();await page.locator('[data-ar-continue]').click();
  await expect(page.locator('[data-ar-gate="1"]')).toBeVisible();await expect(page.locator('[data-ar-after]')).toBeHidden();
  expect(await page.locator('[data-ar-sum2]').textContent()).toContain('84.5%');expect(await page.locator('[data-ar-sum3]').textContent()).toBe('');
  await page.locator('[data-ar-gate="1"] [data-ar-opt="move"]').click();await page.locator('[data-ar-continue]').click();
  await expect(page.locator('[data-ar-after]')).toBeVisible();expect(await page.locator('[data-ar-after]').textContent()).toContain('A good answer');
  const checks=await page.evaluate(()=>JSON.parse(document.getElementById('figure-data').textContent).edition.page.checkLinesAfter||[]);
  await expect(page.locator('[data-ar-check-after]')).toHaveText(checks);
  await expect(page.locator('.mf-beats .is-locked')).toHaveCount(0);
  await page.locator('[data-mf-replay]').click();await noAnswers(page);await expect(page.locator('.mf-beats .is-locked')).toHaveCount(7);
  await expect(page.locator('[data-ar-live]')).toHaveText('');
 });
 test(`appropriate reliance ${cast}: real keyboard and scrub respect both gates`,async({page})=>{
  await ready(page,suffix);await page.locator('[data-mf-toggle]').click();await expect(page.locator('[data-ar-prompt]')).toBeVisible();await noAnswers(page);
  const scrub=page.locator('[data-mf-scrub]');await scrub.focus();await scrub.press('End');await expect(page.locator('[data-ar-gate="0"]')).toBeVisible();await noAnswers(page);
  const first=page.locator('[data-ar-gate="0"] input[value="a"]');await first.focus();await first.press('Space');await first.press('Enter');
  await scrub.focus();await scrub.press('End');await expect(page.locator('[data-ar-gate="1"]')).toBeVisible();await expect(page.locator('[data-ar-after]')).toBeHidden();
  await page.locator('[data-ar-skip]').click();await scrub.focus();await scrub.press('End');await expect(page.locator('[data-ar-after]')).toBeVisible();
  expect(await page.locator('[data-mf-figure]').textContent()).toContain('No call');
 });
 test(`appropriate reliance ${cast}: no-JS and blocked scripts offer deliberate reading`,async({browser,baseURL})=>{
  const context=await browser.newContext({javaScriptEnabled:false});const p=await context.newPage();await p.goto(baseURL+route(suffix));
  await expect(p.locator('.figure-fallback .figure-poster')).toBeVisible();await expect(p.locator('.ar-reading-version')).toBeVisible();
  expect(await p.locator('body').innerText()).not.toContain('84.5%');await p.locator('.ar-reading-version details').first().locator('summary').click();expect(await p.locator('body').innerText()).toContain('84.5%');await p.emulateMedia({media:'print'});await expect(p.locator('[data-ar-printq]')).toBeHidden();await expect(p.locator('.ar-reading-version')).toBeVisible();await context.close();
  const blocked=await browser.newContext();const b=await blocked.newPage();await b.route('**/*.js?*',r=>r.abort());await b.goto(baseURL+route(suffix));await noAnswers(b);
  await b.locator(`.figure-duration a[href="${route(suffix)}reading/"]`).click();await expect(b).toHaveURL(new RegExp(route(suffix)+'reading/'));await expect(b.locator('.ar-reading-version')).toBeVisible();
  await b.locator('.ar-reading-version details').first().locator('summary').click();expect(await b.locator('body').innerText()).toContain('84.5%');await blocked.close();
 });
 test(`appropriate reliance ${cast}: printing restores waiting question and locks`,async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});await ready(page,suffix);await noAnswers(page);
  await page.evaluate(()=>dispatchEvent(new Event('beforeprint')));await expect(page.locator('[data-ar-printq-svg] svg')).toHaveCount(1);
  expect(await page.evaluate(()=>!!(document.querySelector('[data-ar-printq]').compareDocumentPosition(document.querySelector('figure'))&Node.DOCUMENT_POSITION_FOLLOWING))).toBe(true);
  expect(await page.locator('[data-ar-after]').textContent()).toContain('A good answer');
  await page.evaluate(()=>dispatchEvent(new Event('afterprint')));await noAnswers(page);await expect(page.locator('[data-ar-gate="0"]')).toBeVisible();
 });
}
test('appropriate reliance: slow hydration exposes no answer text',async({page})=>{
 let release;const held=new Promise(resolve=>release=resolve);await page.route('**/assets/figures/appropriate-reliance/appropriate-reliance.js?*',async r=>{await held;await r.continue()});
 await page.goto(route('high-school/'),{waitUntil:'commit'});await expect(page.locator('.figure-fallback .figure-poster')).toBeVisible();await noAnswers(page);release();await expect(page.locator('[data-mf-ready]')).toHaveCount(1);await noAnswers(page);
});
test('appropriate reliance: two instances isolate choices and teardown restores inert text',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await ready(page);
 const result=await page.evaluate(async()=>{
  const html=await fetch('/appropriate-reliance/high-school/').then(r=>r.text()),doc=new DOMParser().parseFromString(html,'text/html');
  const scope=doc.querySelector('[data-figure-instance]');scope.querySelector('#figure-reading').removeAttribute('id');const root=scope.querySelector('[data-mf-figure]');root.id='second-appropriate';document.querySelector('main').append(scope);
  const edition=JSON.parse(doc.getElementById('figure-data').textContent).edition;const first=await MotionFigures.mountFigure(root,{edition,scope,standalone:false});root.dataset.mfReady='';
  root.querySelector('[data-ar-gate="0"] input[value="b"]').click();root.querySelector('[data-ar-continue]').click();root.querySelector('[data-ar-gate="1"] input[value="move"]').click();root.querySelector('[data-ar-continue]').click();
  const primary=document.querySelector('[data-figure-instance]');const isolated=primary.querySelector('[data-ar-after]').hidden&&!scope.querySelector('[data-ar-after]').hidden;
  const names=[...document.querySelectorAll('[data-ar-gate="0"] input')].map(n=>n.name);const scoped=names[0]!==names[2];
  MotionFigures.unmountFigure(root);const restored=scope.querySelector('[data-ar-after]').hidden&&!scope.querySelector('[data-ar-after]').textContent.trim();
  const second=await MotionFigures.mountFigure(root,{edition,scope,standalone:false});first.destroy();const survives=!!window.__motionFigures[root.id];
  const ids=[...document.querySelectorAll('[id]')].map(n=>n.id);second.destroy();scope.remove();return{isolated,scoped,restored,survives,unique:ids.length===new Set(ids).size};
 });expect(result).toEqual({isolated:true,scoped:true,restored:true,survives:true,unique:true});
});
for(const [suffix,cast] of variants) {
 test(`appropriate reliance ${cast}: live first question remains usable at review sizes`,async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});
  for(const [width,height] of [[1440,900],[1366,657],[768,1024],[390,844],[375,812]]) {
   await page.setViewportSize({width,height});await ready(page,suffix);await page.evaluate(()=>document.fonts.ready);
   const fit=await page.evaluate(()=>{
    const r=document.querySelector('figure'),button=r.querySelector('[data-ar-continue]').getBoundingClientRect(),cap=r.querySelector('.ar-capwrap').getBoundingClientRect(),band=r.querySelector('.ar-n-band').getBoundingClientRect();
    return {width:innerWidth,height:innerHeight,overflow:document.documentElement.scrollWidth-innerWidth,scrollY,stacked:r.classList.contains('is-stacked'),buttonTop:button.top,buttonBottom:button.bottom,uncovered:r.querySelector('[data-ar-continue]').contains(document.elementFromPoint(button.x+button.width/2,button.y+button.height/2)),bandBottom:band.bottom,captionTop:cap.top};
   });
   expect(fit.overflow,JSON.stringify({cast,...fit})).toBeLessThanOrEqual(0);
   expect(fit.buttonBottom,JSON.stringify({cast,...fit})).toBeLessThanOrEqual(height);
   expect(fit.buttonTop,JSON.stringify({cast,...fit})).toBeGreaterThanOrEqual(0);
   expect(fit.uncovered,JSON.stringify({cast,...fit})).toBe(true);
   if(fit.stacked&&width<=390&&['classroom','high-school'].includes(cast))expect(fit.bandBottom,JSON.stringify({cast,...fit})).toBeLessThanOrEqual(fit.captionTop+1);
   await page.locator('[data-ar-skip]').click();await expect(page.locator('[data-ar-gate="1"]')).toBeVisible();
   expect(await page.locator('[data-ar-continue]').evaluate(button=>{const r=button.getBoundingClientRect();return button.contains(document.elementFromPoint(r.x+r.width/2,r.y+r.height/2));})).toBe(true);
  }
 });
 test(`appropriate reliance ${cast}: reading print exposes closed disclosures`,async({page})=>{
  await page.goto(route(suffix)+'reading/');const result=page.locator('.ar-reading-version details').first();await expect(result).not.toHaveAttribute('open','');
  await page.emulateMedia({media:'print'});await expect(result.locator('p').first()).toBeVisible();
 });
}

for(const [suffix,cast] of variants) test(`appropriate reliance ${cast}: print keeps full diagram scale and restores screen`,async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await ready(page,suffix);
 await page.locator('[data-ar-gate="0"] [data-ar-opt="b"]').click();await page.locator('[data-ar-continue]').click();
 await page.locator('[data-ar-gate="1"] [data-ar-opt="move"]').click();await page.locator('[data-ar-continue]').click();
 const screen=await page.locator('.mf-stage svg').boundingBox();
 await page.emulateMedia({media:'print'});await page.evaluate(()=>dispatchEvent(new Event('beforeprint')));
 const printed=await page.locator('.mf-stage svg').evaluate(svg=>({height:svg.getBoundingClientRect().height,width:svg.getBoundingClientRect().width,viewBoxHeight:svg.viewBox.baseVal.height,viewBoxWidth:svg.viewBox.baseVal.width}));
 expect(printed.height/printed.width).toBeCloseTo(printed.viewBoxHeight/printed.viewBoxWidth,2);
 await page.emulateMedia({media:'screen'});await page.evaluate(()=>dispatchEvent(new Event('afterprint')));
 const restored=await page.locator('.mf-stage svg').boundingBox();expect(restored.height).toBeCloseTo(screen.height,0);expect(restored.width).toBeCloseTo(screen.width,0);
});
