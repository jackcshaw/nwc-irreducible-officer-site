import {test,expect} from '@playwright/test';
import {loadFigures} from '../../scripts/figure-pages.mjs';
import {figureCardData} from '../../scripts/figure-cards.mjs';
import {teachingVariants,adaptedModes,adaptationPrompt} from '../../scripts/figure-practice.mjs';
const root=new URL('../..',import.meta.url).pathname,manifest=loadFigures(root);
const modes=manifest.figures.filter(f=>f.kind==='failure-mode');
const labels={pme:'PME',he:'higher education',k12:'high school'};
for(const audience of Object.keys(labels))test(`${audience} Practice has seven exact entries and complete setting-specific clipboard prompts`,async({page,context})=>{
 await context.grantPermissions(['clipboard-read','clipboard-write']);
 const requests=[],errors=[];page.on('request',r=>requests.push(r.url()));page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/?audience='+audience+'#companion');
 const group=page.locator(`[data-practice-figures-audience="${audience}"]`);await expect(group).toBeVisible();
 await expect(page.locator('[data-practice-figures-audience]:visible')).toHaveCount(1);
 await expect(group.locator('.practice-figure')).toHaveCount(7);
 await expect(group.locator('.practice-adaptation')).toHaveCount(adaptedModes[audience].length);
 const variant=manifest.variants.find(v=>v.id===teachingVariants[audience]);
 await expect(group.locator('.practice-warmup a')).toHaveAttribute('href',figureCardData(root,manifest.figures.find(f=>f.slug==='appropriate-reliance'),variant).href);
 for(const mode of modes){
  const data=figureCardData(root,mode,variant),entry=group.locator(`[data-practice-mode="${mode.slug}"]`);
  await expect(entry.locator('h3')).toHaveText(data.title);await expect(entry).toContainText(data.definition);await expect(entry.locator('.practice-check')).toHaveText(data.check);await expect(entry).toContainText(data.follow);
  await expect(entry.locator('a')).toHaveAttribute('href',data.href);await entry.locator('button').click();
  const text=await page.evaluate(()=>navigator.clipboard.readText());
  const general=await page.locator('#failure-mode-prompt').textContent();expect(text.startsWith(general+'\n\nFocus on ')).toBe(true);
  expect(text.startsWith('My setting is '+labels[audience]+'.')).toBe(true);
  expect(text.match(/My setting is/g)).toHaveLength(1);
  for(const part of ['Read the selected edition:','Begin with that essay and help me choose a failure mode to test.','Collect my judgment before presenting the constructed contribution.','Ask one question at a time and WAIT.','Then use the audience guide to adapt the method','Do not certify competence or invent classroom evidence.','Focus on '+figureCardData(root,mode,manifest.variants.find(v=>v.id==='pme')).title+'.'])expect(text).toContain(part);
  expect(text.includes(adaptationPrompt)).toBe(adaptedModes[audience].includes(mode.slug));
  expect(text).not.toContain('one of its seven');
 }
 await expect(page.locator('[data-copy-target="failure-mode-prompt"]')).toBeVisible();await expect(page.locator('a[download][href="assets/judgment-lab-interactive-context.md"]')).toBeVisible();
 expect(requests.filter(u=>/assets\/figures\/.*\.js/.test(u))).toEqual([]);expect(errors).toEqual([]);
});
test('Practice requires a setting and switches without stale prompts or adaptation notes',async({page})=>{
 await page.goto('/#companion');await expect(page.locator('[data-practice-figures-audience]:visible')).toHaveCount(0);
 await page.locator('[data-choose-practice-setting]').click();await expect(page.locator('#lab-audience')).toBeFocused();
 for(const audience of ['he','k12','pme','he']){
  await page.locator('#lab-audience').selectOption(audience);await expect(page.locator(`[data-practice-figures-audience="${audience}"]`)).toBeVisible();await expect(page.locator('#panel-companion')).toBeVisible();
  const text=await page.locator('#practice-prompt-premature-synthesis').textContent();expect(text.match(/My setting is/g)).toHaveLength(1);expect(text).toContain('My setting is '+labels[audience]+'.');expect(text.includes(adaptationPrompt)).toBe(audience==='k12');
 }
 await page.goBack();await expect(page.locator('[data-practice-figures-audience="pme"]')).toBeVisible();
 await page.locator('#lab-audience').selectOption('');await expect(page.locator('[data-practice-figures-audience]:visible')).toHaveCount(0);
});
test('failed copy reveals the full focused prompt and a setting change hides the fallback',async({page})=>{
 await page.addInitScript(()=>{Object.defineProperty(navigator,'clipboard',{value:{writeText:()=>Promise.reject(new Error('denied'))}});document.execCommand=()=>false;});
 await page.goto('/?audience=k12#companion');await page.locator('[data-practice-figures-audience="k12"] [data-copy-target="practice-prompt-uncalibrated-reliance"]').click();
 const pre=page.locator('#practice-prompt-uncalibrated-reliance').locator('..');await expect(pre).toBeVisible();await expect(pre).toBeFocused();await expect(pre).toContainText(adaptationPrompt);
 await page.locator('#lab-audience').selectOption('he');await expect(pre).toBeHidden();
});
for(const width of [1440,390,375])test(`Practice fits ${width}px and prints only the selected setting`,async({page})=>{
 await page.setViewportSize({width,height:900});await page.goto('/?audience=he#companion');
 for(const entry of await page.locator('[data-practice-figures-audience="he"] .practice-figure').all()){await entry.scrollIntoViewIfNeeded();expect(await entry.evaluate(n=>n.scrollWidth<=n.clientWidth)).toBe(true);await expect(entry.locator('button')).toBeVisible();}
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.emulateMedia({media:'print'});await expect(page.locator('[data-practice-figures-audience]:visible')).toHaveCount(1);
});
