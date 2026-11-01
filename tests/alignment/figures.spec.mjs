import {test,expect} from '@playwright/test';
const variants=[['','workplace',15],['classroom/','classroom',15],['high-school/','high-school',15],['pme/','seminar',12]];
for(const [suffix,cast,count] of variants) {
 test(`frame capture ${cast}: static reading and hydration`,async({browser,baseURL})=>{
  const staticContext=await browser.newContext({javaScriptEnabled:false});
  const page=await staticContext.newPage();await page.goto(`${baseURL}/failure-modes/frame-capture/${suffix}`);
  await expect(page.locator('.figure-poster')).toBeVisible();
  await expect(page.locator('[data-mf-beat-index]')).toHaveCount(count);
  await expect(page.locator('[data-mf-beat-index="1"] .mf-detail')).toBeVisible();
  await expect(page.locator('[data-mf-figure]')).toHaveAttribute('data-cast',cast);
  if(cast==='high-school')await expect(page.getByLabel('For teachers')).toBeVisible();
  await staticContext.close();
  const context=await browser.newContext();const live=await context.newPage();const errors=[];live.on('pageerror',e=>errors.push(e.message));
  await live.goto(`${baseURL}/failure-modes/frame-capture/${suffix}?t=0`);
  await expect(live.locator('[data-mf-ready]')).toHaveCount(1);
  await expect(live.locator('[data-mf-beat-index]')).toHaveCount(count);
  await expect(live.locator('.figure-poster')).not.toBeVisible();
  await expect(live.locator('[data-mf-figure]')).toHaveAttribute('data-cast',cast);
  await expect(live.locator('[data-mf-toggle]')).toBeVisible();
  await live.locator('.figure-duration [data-read-figure]').click();
  expect(await live.evaluate(()=>!!document.querySelector(location.hash))).toBe(true);
  expect(errors).toEqual([]);await context.close();
 });
}
test('failed drawing preserves selected version and readable text',async({page})=>{
 await page.route('**/assets/figures/frame-capture/frame-capture.js?*',r=>r.abort());
 await page.goto('/failure-modes/frame-capture/high-school/');
 await expect(page.locator('[data-figure-status]')).toBeVisible();
 await expect(page.locator('.figure-poster')).toBeVisible();
 await expect(page.getByLabel('For teachers')).toBeVisible();
 await expect(page.locator('[data-mf-figure]')).toHaveAttribute('data-cast','high-school');
 await expect(page.locator('[data-mf-beat-index="13"] .mf-detail')).toBeVisible();
});
test('slow script keeps the static edition readable',async({page})=>{
 let release;const held=new Promise(resolve=>{release=resolve});
 await page.route('**/assets/figures/frame-capture/frame-capture.js?*',async r=>{await held;await r.continue()});
 await page.goto('/failure-modes/frame-capture/classroom/',{waitUntil:'commit'});
 await expect(page.locator('.figure-poster')).toBeVisible();await expect(page.locator('[data-mf-figure]')).toHaveAttribute('data-cast','classroom');
 release();await expect(page.locator('[data-mf-ready]')).toHaveCount(1);
});
test('legacy edition query becomes a matching static route',async({page})=>{
 await page.goto('/failure-modes/frame-capture/?edition=business&cast=high-school&t=0');
 await expect(page).toHaveURL(/\/high-school\/\?t=0$/);
 await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href','https://judgmentlab.net/failure-modes/frame-capture/high-school/');
 await expect(page.locator('.figure-switch [aria-current=page]')).toHaveText('Classroom');
 await expect(page.locator('.figure-switch [aria-current=page]')).toHaveAttribute('href','/failure-modes/frame-capture/high-school/');
});
test('real drawing supports two instances, teardown and remount',async({page})=>{
 await page.goto('/failure-modes/frame-capture/?t=0');await expect(page.locator('[data-mf-ready]')).toHaveCount(1);
 const result=await page.evaluate(async()=>{
  const text=await fetch(location.pathname).then(r=>r.text());const parsed=new DOMParser().parseFromString(text,'text/html');
  const root=parsed.querySelector('[data-mf-figure]');root.id='second-frame-capture';document.querySelector('main').append(root);
  const edition=JSON.parse(document.getElementById('figure-data').textContent).edition;
  const first=await MotionFigures.mountFigure(root,{edition,standalone:false});root.dataset.mfReady='';
  const primary=window.__motionFigures['frame-capture'];primary.seek(40);window.__motionFigures[root.id].seek(80);
  const isolated=primary.duration===104.8 && first.time()!==35.8;
  MotionFigures.unmountFigure(root);
  const restored=!root.hasAttribute('data-mf-ready') && !window.__motionFigures['second-frame-capture'];
  const second=await MotionFigures.mountFigure(root,{edition,standalone:false});root.dataset.mfReady='';first.destroy();
  const survives=!!window.__motionFigures[root.id];const ids=[...document.querySelectorAll('[id]')].map(n=>n.id);
  second.destroy();root.remove();return {isolated,restored,survives,unique:ids.length===new Set(ids).size};
 });
 expect(result).toEqual({isolated:true,restored:true,survives:true,unique:true});
});
test('phone layout and reduced motion retain the reading and controls',async({page})=>{
 await page.setViewportSize({width:375,height:812});await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/failure-modes/frame-capture/high-school/');await expect(page.locator('[data-mf-ready]')).toHaveCount(1);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await expect(page.locator('[data-mf-label]')).toHaveText('Play');
 await expect(page.locator('.mf')).toHaveClass(/is-stacked/);
 await page.emulateMedia({media:'print'});await expect(page.locator('[data-mf-beat-index="13"] .mf-detail')).toBeVisible();
 await page.emulateMedia({media:'screen'});await expect(page.locator('[data-mf-toggle]')).toBeVisible();
});
test('hub lists the one published figure without downloading its player',async({page})=>{
 const requested=[];page.on('request',r=>requested.push(r.url()));await page.goto('/failure-modes/');
 await expect(page.locator('.figure-index>li')).toHaveCount(1);await expect(page.locator('.figure-index h2')).toHaveText('Frame capture');
 expect(requested.some(u=>/runtime\/motion.js|frame-capture\.js/.test(u))).toBe(false);
});

for (const [asset,pattern] of [['font stylesheet','**/assets/figures/fonts/fonts.css?*'],['font files','**/assets/figures/fonts/*.woff2?*']]) {
test(`failed ${asset} keeps the readable static version`,async({page})=>{
 let blocked=0;
 await page.route(pattern,r=>{blocked++;return r.abort()});
 await page.goto('/failure-modes/frame-capture/classroom/');
 await expect(page.locator('[data-figure-status]')).toBeVisible();
 expect(blocked).toBeGreaterThan(0);
 await expect(page.locator('[data-mf-ready]')).toHaveCount(0);
 await expect(page.locator('.figure-poster')).toBeVisible();
 await expect(page.locator('[data-mf-beat-index="13"] .mf-detail')).toBeVisible();
 await expect(page.locator('[data-mf-figure]')).toHaveAttribute('data-cast','classroom');
});
}
