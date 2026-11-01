import {cpSync, existsSync, readFileSync, writeFileSync} from 'node:fs';
import {resolve, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {sha256} from '../../scripts/figure-assets.mjs';

const [source, output] = process.argv.slice(2);
if (!source || !output) throw new Error('Usage: figure-parity-fixture.mjs <frozen motion-figures directory> <new output directory>');
const sourceDir = resolve(source), outputDir = resolve(output);
if (existsSync(outputDir)) throw new Error('Use a new fixture directory; never overwrite a reference capture input');
const project = fileURLToPath(new URL('../../', import.meta.url));
const sourceCSS = readFileSync(join(sourceDir, 'runtime/figures.css'), 'utf8');
const componentCSS = readFileSync(join(project, 'figures/runtime/figure.css'), 'utf8');
const prefixAt = sourceCSS.indexOf('/* ---- v0 mock page chrome');
const pageAt = sourceCSS.indexOf('/* ---- standalone figure page');
const printAt = sourceCSS.indexOf('/* Print:');
if (prefixAt < 0 || pageAt < prefixAt || printAt < pageAt) throw new Error('Source CSS boundaries changed; review the fixture extraction');
// Retain the source page geometry; replace all player rules with the candidate.
const css = sourceCSS.slice(0, prefixAt) + sourceCSS.slice(pageAt, printAt) + '\n@media print { .fig-top nav { display: none; } }\n' + componentCSS;
const runtime = readFileSync(join(project, 'figures/runtime/motion.js'));
cpSync(sourceDir, outputDir, {recursive: true});
writeFileSync(join(outputDir, 'runtime/motion.js'), runtime);
writeFileSync(join(outputDir, 'runtime/figures.css'), css);
const receipt = {
  kind: 'motion-runtime-parity-fixture',
  sourceRuntime: sha256(readFileSync(join(sourceDir, 'runtime/motion.js'))),
  sourceCSS: sha256(Buffer.from(sourceCSS)),
  candidateRuntime: sha256(runtime), candidateComponentCSS: sha256(Buffer.from(componentCSS)),
  fixtureCSS: sha256(Buffer.from(css)),
  fontLock: sha256(readFileSync(join(project, 'figures/fonts/manifest.json'))),
  note: 'Legacy drawing APIs in source geometry. Registration/hydration/teardown are tested separately. No public build reads this fixture.',
};
writeFileSync(join(outputDir, 'fixture.json'), JSON.stringify(receipt, null, 2) + '\n');
console.log(JSON.stringify(receipt, null, 2));
