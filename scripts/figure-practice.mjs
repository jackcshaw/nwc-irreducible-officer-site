import {escape,loadFigures} from './figure-pages.mjs';
import {figureCardData} from './figure-cards.mjs';

export const teachingVariants={pme:'pme',he:'classroom',k12:'high-school'};
export const adaptedModes={pme:[],he:['uncalibrated-reliance','responsibility-laundering'],k12:['premature-synthesis','uncalibrated-reliance','responsibility-laundering']};
export const adaptationPrompt="This mode is named in the original PME essay, not in my selected edition. Use its original passage to examine the claim, then use my audience guide for teaching transfer. Treat the classroom example as a proposal, not evidence that the method has been validated in this setting.";
export function renderPracticeFigures(root,protocol) {
  const manifest=loadFigures(root),modes=manifest.figures.filter(f=>f.kind==='failure-mode').sort((a,b)=>a.order-b.order);
  const warmup=manifest.figures.find(f=>f.slug==='appropriate-reliance');
  const groups=Object.entries(teachingVariants).map(([audience,variantId])=>{
    const variant=manifest.variants.find(v=>v.id===variantId);
    const ar=figureCardData(root,warmup,variant);
    const entries=modes.map(figure=>{
      const c=figureCardData(root,figure,variant),id=`practice-${audience}-${figure.slug}`;
      const note=adaptedModes[audience].includes(figure.slug)?`<p class="practice-adaptation">This mode is named in the original PME essay. This example is a proposed adaptation for ${audience==='he'?'higher education':'high school'}.</p>`:'';
      return `<li class="practice-figure" data-practice-mode="${figure.slug}" aria-labelledby="${id}"><h3 id="${id}">${escape(c.title)}</h3><p>${escape(c.definition)}</p><p class="practice-check">${escape(c.check)}</p><p>${escape(c.follow)}</p>${note}<div class="action-row"><a class="quiet-action" href="${escape(c.href)}">Open the figure</a><button class="copy-button" type="button" data-copy-target="practice-prompt-${figure.slug}" aria-label="Copy lab prompt: ${escape(c.title)}">Copy lab prompt</button></div></li>`;
    }).join('');
    return `<div data-practice-figures-audience="${audience}" hidden><section class="practice-warmup" aria-labelledby="practice-${audience}-warmup"><h3 id="practice-${audience}-warmup">Appropriate reliance</h3><p>Make a call about where to rely on AI, then inspect the reasons.</p><a class="quiet-action" href="${escape(ar.href)}">Try the warm-up</a></section><ol class="practice-figures" aria-label="Failure modes">${entries}</ol></div>`;
  }).join('');
  const variant=manifest.variants.find(v=>v.id==='pme');
  const prompts=modes.map(figure=>{
    const title=figureCardData(root,figure,variant).title;
    return `<pre class="copy-block practice-prompt" hidden tabindex="0" role="region" aria-label="${escape(title)} lab prompt"><code id="practice-prompt-${figure.slug}" data-session-prompt data-mode-prompt="${figure.slug}">${escape(protocol+'\n\nFocus on '+title+'.')}</code></pre>`;
  }).join('');
  return `<p>Choose a failure mode to examine. Open its figure, or copy a prompt to test it with your AI assistant. Begin with your setting’s essay as an educator, then adapt the method to your teaching.</p><p data-practice-unselected><button class="quiet-action" type="button" data-choose-practice-setting>Choose your setting</button> to open its figures and lab prompts.</p>${groups}${prompts}`;
}
