// Static URLs preserve the selected setting even without JavaScript.
export const teachingVariants={pme:'pme',he:'classroom',k12:'high-school'};
export const variantAudience=variant=>({pme:'pme',classroom:'he','high-school':'k12'}[variant.id]||'');
export const hubPath=variant=>`/failure-modes/${variant.suffix}`;
export const settingHref=(href,variant)=>href.startsWith('/#')&&variantAudience(variant)?`/?audience=${variantAudience(variant)}${href.slice(1)}`:href;
export const discussionFigures={learning:'fluency-substitution',approval:'frame-capture',friction:'premature-synthesis',better:'invisible-delegation',frames:'institutional-monoculture'};
export const workbenchFigures={'frame-check':['frame-capture'],'supervised-delegation':['invisible-delegation'],assessment:['fluency-substitution','responsibility-laundering']};
