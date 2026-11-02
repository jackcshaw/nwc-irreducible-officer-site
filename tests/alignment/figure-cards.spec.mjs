import {test,expect} from '@playwright/test';
const slugs=['frame-capture','fluency-substitution','premature-synthesis','uncalibrated-reliance','invisible-delegation','institutional-monoculture','responsibility-laundering','appropriate-reliance'];
const card=slug=>`#figure-${slug}`;
test('all essay entries preserve order, checks and static destinations without loading players',async({page})=>{
 const requests=[],errors=[];page.on('request',r=>requests.push(r.url()));page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/#essay');
 const entries=page.locator('#panel-essay .motion-figure-card');await expect(entries).toHaveCount(8);
 expect(await entries.evaluateAll(nodes=>nodes.map(n=>n.id))).toEqual(slugs.map(s=>'figure-'+s));
 for(const slug of slugs){const entry=page.locator(card(slug));await entry.scrollIntoViewIfNeeded();await expect(entry.locator('img')).toBeVisible();await expect(entry.locator('a')).toHaveCount(1);await expect(entry.locator('.motion-figure-check')).not.toBeEmpty();}
 expect(requests.filter(u=>/assets\/figures\/.*\.js/.test(u))).toEqual([]);expect(errors).toEqual([]);
});
test('direct essay-card links preserve selected audience and keyboard navigation',async({page})=>{
 await page.goto('/?audience=he#figure-appropriate-reliance');await expect(page.locator('#panel-essay')).toBeVisible();
 await expect(page).toHaveURL(/audience=he#figure-appropriate-reliance$/);
 const link=page.locator(card('appropriate-reliance')+' a');await link.focus();await page.keyboard.press('Enter');
 await expect(page).toHaveURL(/\/appropriate-reliance\/pme\/$/);await expect(page.locator('.figure-switch [aria-current]')).toHaveText('PME');
 await page.goBack();await expect(page.locator('#panel-essay')).toBeVisible();await expect(page).toHaveURL(/audience=he#figure-appropriate-reliance$/);
});
for(const width of [1440,390,375])test(`essay entries fit ${width}px and keep visible checks`,async({page})=>{
 await page.setViewportSize({width,height:900});await page.goto('/#essay');
 for(const slug of slugs){const entry=page.locator(card(slug));await entry.scrollIntoViewIfNeeded();expect(await entry.evaluate(n=>n.scrollWidth<=n.clientWidth)).toBe(true);await expect(entry.locator('.motion-figure-action')).toBeVisible();}
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
test('PME entry and standalone return link work without JavaScript',async({browser,baseURL})=>{
 const context=await browser.newContext({javaScriptEnabled:false});const page=await context.newPage();await page.goto(baseURL+'/#figure-frame-capture');
 await expect(page.locator('#figure-frame-capture')).toBeVisible();await page.locator('#figure-frame-capture a').click();await expect(page).toHaveURL(/\/failure-modes\/frame-capture\/pme\/$/);
 await page.locator('a[href="/#figure-frame-capture"]').click();await expect(page.locator('#figure-frame-capture')).toBeVisible();await context.close();
});
test('standalone figure returns to its essay card and print retains all entries',async({page})=>{
 await page.goto('/failure-modes/invisible-delegation/pme/');await page.locator('a[href="/#figure-invisible-delegation"]').click();await expect(page.locator('#panel-essay')).toBeVisible();await expect(page).toHaveURL(/#figure-invisible-delegation$/);
 await page.emulateMedia({media:'print'});for(const slug of slugs)await expect(page.locator(card(slug))).toBeVisible();
});
