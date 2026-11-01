import assert from 'node:assert/strict';
import {mkdtempSync, mkdirSync, readFileSync, writeFileSync, symlinkSync, rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {writeFigureAssets, sha256} from '../scripts/figure-assets.mjs';

const root = mkdtempSync(join(tmpdir(), 'motion-assets-'));
try {
  const sourceDir = join(root, 'source'), outputDir = join(root, 'out');
  mkdirSync(join(sourceDir, 'runtime'), {recursive: true});
  const files = ['runtime/motion.js', 'figure.js'];
  writeFileSync(join(sourceDir, files[0]), 'window.MotionFigures = {};\n');
  writeFileSync(join(sourceDir, files[1]), 'MotionFigures.define("example", () => {});\n');
  const first = writeFigureAssets({sourceDir, outputDir, files});
  for (const file of files) {
    const bytes = readFileSync(join(outputDir, file));
    assert.deepEqual(bytes, readFileSync(join(sourceDir, file)));
    assert.equal(first[file].sha256, sha256(bytes));
    assert.equal(first[file].url, `/assets/figures/${file}?v=${sha256(bytes)}`);
  }
  writeFileSync(join(sourceDir, files[0]), 'window.MotionFigures = {updated: true};\n');
  const next = writeFigureAssets({sourceDir, outputDir, files});
  assert.notEqual(next[files[0]].url, first[files[0]].url, 'runtime change gets its own new URL');
  assert.equal(next[files[1]].url, first[files[1]].url, 'unchanged drawing retains its URL');
  assert.throws(() => writeFigureAssets({sourceDir, outputDir, files: ['../outside.js']}), /Invalid/);
  assert.throws(() => writeFigureAssets({sourceDir, outputDir, files: ['/absolute.js']}), /Invalid/);
  assert.throws(() => writeFigureAssets({sourceDir, outputDir, files: [files[0], files[0]]}), /Duplicate/);
  writeFileSync(join(root, 'outside.js'), 'outside');
  symlinkSync(join(root, 'outside.js'), join(sourceDir, 'link.js'));
  assert.throws(() => writeFigureAssets({sourceDir, outputDir, files: ['link.js']}), /escapes source/);
  assert.throws(() => writeFigureAssets({sourceDir, outputDir, files: ['missing.js']}), /ENOENT/);
  console.log('figure assets passed: exact bytes and independent dependency hashes');
} finally { rmSync(root, {recursive: true, force: true}); }
