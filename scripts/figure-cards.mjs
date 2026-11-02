import {readFileSync} from 'node:fs';
import {join} from 'node:path';
import {escape,loadFigures,resolveFigure,figurePath} from './figure-pages.mjs';

// Edition data owns the scene's check and separating follow-up; the companion
// continues to own the unchanged essay table.
export function figureCardData(root,figure,variant) {
  const ed=resolveFigure(root,figure,variant);
  const receipt=JSON.parse(readFileSync(join(root,'media/figures',figure.slug,variant.id,'manifest.json'),'utf8'));
  const image=receipt.outputs['poster.png'];
  return {title:ed.page.title,definition:ed.nameplate.definition,check:ed.check.question,follow:ed.check.follow,
    href:figurePath(figure,variant),poster:{...image,url:`/media/figures/${figure.slug}/${variant.id}/poster.png?v=${image.sha256}`}};
}
export function renderFigureCard(root,figure,variant,id=`figure-${figure.slug}`) {
  const c=figureCardData(root,figure,variant),title=`${id}-title`,action=`${id}-action`;
  return `<aside class="motion-figure-card" id="${escape(id)}" aria-labelledby="${escape(title)}"><a class="motion-figure-entry" href="${escape(c.href)}" aria-labelledby="${escape(title)} ${escape(action)}"><img src="${escape(c.poster.url)}" width="${c.poster.width}" height="${c.poster.height}" alt="" loading="lazy" decoding="async"><div class="motion-figure-copy"><h3 id="${escape(title)}">${escape(c.title)}</h3><p class="motion-figure-check">${escape(c.check)}</p><p class="motion-figure-follow">${escape(c.follow)}</p><span class="motion-figure-action" id="${escape(action)}">Open the figure</span></div></a></aside>`;
}
export function placePMEEssayCards(html,root) {
  const manifest=loadFigures(root),variant=manifest.variants.find(v=>v.id==='pme');
  for(const figure of manifest.figures) {
    if(!figure.essayAnchorEnd) throw new Error(`Missing essay card anchor: ${figure.slug}`);
    const anchor=escape(figure.essayAnchorEnd)+'</p>';
    if(html.split(anchor).length!==2) throw new Error(`Missing or ambiguous essay card anchor: ${figure.slug}`);
    html=html.replace(anchor,anchor+'\n'+renderFigureCard(root,figure,variant));
  }
  return html;
}
