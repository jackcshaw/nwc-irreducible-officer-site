import assert from 'node:assert/strict';
import {readFileSync, readdirSync} from 'node:fs';
import vm from 'node:vm';

function load(path) {
  const context = {URLSearchParams, console, location: {search: ''}, matchMedia: () => ({matches: false, addEventListener() {}}), document: {documentElement: {hasAttribute: () => true}, querySelector: () => null}};
  context.window = context;
  vm.runInNewContext(readFileSync(path, 'utf8'), context);
  return context.MotionFigures;
}
const source = load('design/motion-figures/runtime/motion.js');
const candidate = load('figures/runtime/motion.js');
const casts = JSON.parse(readFileSync('figures/casts.json', 'utf8'));
delete casts._doc;
const plain = value => JSON.parse(JSON.stringify(value));
let versions = 0;
for (const slug of readdirSync('design/motion-figures/figures')) {
  for (const name of ['pme', 'business']) {
    const raw = JSON.parse(readFileSync(`design/motion-figures/figures/${slug}/editions/${name}.json`, 'utf8'));
    for (const cast of raw.casts || [raw.cast]) {
      const warnings = [];
      const resolved = candidate.resolveEdition(raw, casts, cast, warning => warnings.push(warning));
      assert.deepEqual(plain(resolved), plain(source.resolveEdition(raw, casts, cast)), `${slug}/${name}/${cast}`);
      assert.deepEqual(warnings, [], `${slug}/${name}/${cast}: warnings`);
      versions++;
    }
  }
}
assert.equal(versions, 32, 'all reviewed versions are covered');
for (const name of ['define', 'mountFigure', 'unmountFigure', 'lifecycle']) assert.equal(typeof candidate[name], 'function', name);
assert.throws(() => candidate.define('invalid', null), /factory/);
candidate.define('test', () => {});
assert.throws(() => candidate.define('test', () => {}), /already defined/);
console.log(`figure runtime passed: ${versions} resolved versions match the approved source`);
