import {test,expect} from '@playwright/test';
const settings=[['pme','pme/'],['he','classroom/'],['k12','high-school/']];
for(const [audience,suffix] of settings)test(`${audience}: entrances and round trips keep the selected setting`,async({page})=>{
 const errors=[],requests=[];page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>requests.push(r.url()));
 await page.goto('/?audience='+audience+'#'+audience);
 const card=page.locator('#setting-'+audience+'-figure-frame-capture');await expect(card).toBeVisible();
 expect(await card.evaluate(el=>!!el.previousElementSibling && !!el.closest('section').previousElementSibling.matches('[data-try]'))).toBe(true);
 await expect(card.locator('a')).toHaveAttribute('href','/failure-modes/frame-capture/'+suffix);
 await page.locator('.lab-footer [data-motion-collection]').click();await expect(page).toHaveURL(new RegExp('/failure-modes/'+suffix+'$'));
 await expect(page.locator('[aria-label="Collection setting"] [aria-current]')).toHaveAttribute('href','/failure-modes/'+suffix);
 await expect(page.locator('.figure-index > li')).toHaveCount(7);
 expect(requests.filter(u=>/assets\/figures\/.*\.js/.test(u))).toEqual([]);
 await page.locator('.figure-index h2 a').first().click();await expect(page).toHaveURL(new RegExp('/frame-capture/'+suffix+'$'));
 await page.locator('.figure-nav a').filter({hasText:/^Practice$/}).first().click();await expect(page).toHaveURL(new RegExp('audience='+audience+'#companion$'));
 await expect(page.locator('[data-practice-figures-audience="'+audience+'"]')).toBeVisible();
 expect(errors).toEqual([]);
});
for(const [audience,suffix,count] of [['he','classroom/',5],['k12','high-school/',4]])test(`${audience}: adapted essay passages open the matching figure and return`,async({page})=>{
 await page.goto('/?audience='+audience+'#'+audience+'-essay');
 await expect(page.locator('#panel-'+audience+'-essay .motion-figure-card')).toHaveCount(count);
 const anchor=audience+'-essay-figure-frame-capture';await page.locator('#'+anchor+' a').focus();await page.keyboard.press('Enter');
 await expect(page).toHaveURL(new RegExp('/frame-capture/'+suffix+'$'));
 await page.locator('a[href="/?audience='+audience+'#'+anchor+'"]').click();await expect(page.locator('#panel-'+audience+'-essay')).toBeVisible();
 await expect(page).toHaveURL(new RegExp('audience='+audience+'#'+anchor+'$'));
});
test('Discuss and Design links switch in place without stale audience or irrelevant tools',async({page})=>{
 await page.goto('/?audience=he#discuss-learning');
 await expect(page.locator('#discuss-learning [data-motion-figure]')).toHaveAttribute('href','/failure-modes/fluency-substitution/classroom/');
 await page.locator('#lab-audience').selectOption('k12');await expect(page.locator('#discuss-learning [data-motion-figure]')).toHaveAttribute('href','/failure-modes/fluency-substitution/high-school/');
 await page.goto('/?audience=he#wb-doc-assessment-and-oral-defense-rubric');
 await expect(page.locator('#workbench-motion-links a')).toHaveCount(2);
 expect((await page.locator('#workbench-motion-links').boundingBox()).y).toBeLessThan((await page.locator('#workbench-doc-view').boundingBox()).y);
 await expect(page.locator('#workbench-motion-links a').last()).toHaveAttribute('href','/failure-modes/responsibility-laundering/classroom/');
 await page.locator('#lab-audience').selectOption('pme');await expect(page.locator('#workbench-motion-links a').last()).toHaveAttribute('href','/failure-modes/responsibility-laundering/pme/');
 await page.goto('/?audience=he#wb-doc-frame-check');await expect(page.locator('#workbench-motion-links a')).toHaveCount(1);
 await page.goto('/?audience=he#wb-doc-supervised-delegation-exercise');await expect(page.locator('#workbench-motion-links a')).toHaveAttribute('href','/failure-modes/invisible-delegation/classroom/');
 await page.goto('/?audience=he#wb-doc-source-kit-template');await expect(page.locator('#workbench-motion-links')).toBeHidden();
});
test('collections and adapted essay return links work without JavaScript',async({browser,baseURL})=>{
 const context=await browser.newContext({javaScriptEnabled:false}),page=await context.newPage();
 for(const suffix of ['',...settings.map(x=>x[1])]){
  await page.goto(baseURL+'/failure-modes/'+suffix);await expect(page.locator('.figure-index > li')).toHaveCount(7);await expect(page.locator('[aria-label="Collection setting"] a')).toHaveCount(4);
  await page.locator('.figure-index h2 a').first().click();await expect(page.locator('.figure-fallback')).toBeVisible();
 }
 await page.goto(baseURL+'/failure-modes/frame-capture/classroom/');await page.locator('a[href="/?audience=he#he-essay-figure-frame-capture"]').click();await expect(page.locator('#he-essay-figure-frame-capture')).toBeVisible();
 await context.close();
});
for(const width of [1440,390,375])test(`collection and new entrances fit ${width}px`,async({page})=>{
 await page.setViewportSize({width,height:900});
 for(const route of ['/#overview','/?audience=he#he','/?audience=k12#k12-essay','/failure-modes/classroom/']){
  await page.goto(route);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 }
 await page.goto('/#overview');await expect(page.locator('.motion-collection-entry a')).toBeVisible();
 await page.goto('/failure-modes/high-school/');await page.getByRole('link',{name:'Try the warm-up'}).click();await expect(page).toHaveURL(/\/appropriate-reliance\/high-school\/$/);
});
