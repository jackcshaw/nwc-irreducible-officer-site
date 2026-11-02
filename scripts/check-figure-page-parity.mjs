// Explicit verification job. Never imported by the site build.
import {spawn, spawnSync, execFileSync} from 'node:child_process';
import {mkdirSync, readFileSync, writeFileSync, readdirSync, statSync, existsSync, cpSync} from 'node:fs';
import {resolve, join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';

const root = fileURLToPath(new URL('../', import.meta.url));
const kind = 'frames';
const [slug, edition, cast, destination] = process.argv.slice(2);
const slugs = new Set(["frame-capture", "fluency-substitution", "premature-synthesis", "uncalibrated-reliance", "invisible-delegation", "institutional-monoculture", "responsibility-laundering", "appropriate-reliance"]);
if (!["frames", "interactive"].includes(kind) || !slugs.has(slug) || (kind === "interactive" && slug !== "appropriate-reliance")) throw new Error("Invalid verification kind or figure");
const variants = new Set(['pme/seminar', 'business/workplace', 'business/classroom', 'business/high-school']);
if (!variants.has(`${edition}/${cast}`) || !destination) throw new Error('Usage: check-figure-page-parity.mjs <slug> <edition> <cast> <new output directory>');
const out = resolve(destination);
if (existsSync(out)) throw new Error('Use a new output directory; never overwrite verification evidence');
mkdirSync(out, {recursive: true});
const figure = JSON.parse(readFileSync(join(root, 'figures/manifest.json'), 'utf8')).figures.find(f => f.slug === slug);
const sourceSHA = figure?.sourceCommit || '8def5a10d90260db2b0ef4393f1421b14762731c';
if (!/^[a-f0-9]{40}$/.test(sourceSHA)) throw new Error('Invalid reviewed source commit');
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const source = join(out, 'source-files'), candidate = join(out, 'candidate-files');
mkdirSync(source);
writeFileSync(join(out, 'source.tar'), execFileSync('git', ['archive', sourceSHA, 'design/motion-figures'], {cwd: root, maxBuffer: 32 * 1024 * 1024}));
execFileSync('tar', ['-xf', join(out, 'source.tar'), '-C', source, '--strip-components=2']);
execFileSync('node', [join(root, 'tests/helpers/figure-page-parity-fixture.mjs'), source, candidate, slug, edition, cast], {cwd: root});
const harness = join(root, kind === 'frames' ? 'design/motion-figures/scripts/frame-diff.mjs' : 'design/motion-figures/figures/appropriate-reliance/regression/ar-regress.mjs');
// A test-only HTML wrapper aligns the component's outer pixel origin on every
// surface. Immutable source.tar and source drawing/runtime bytes stay retained.
const built = join(out, 'built-files'); cpSync(join(root, 'dist'), built, {recursive:true});
const suffix = cast === 'workplace' ? '' : cast === 'seminar' ? 'pme/' : `${cast}/`;
const builtPath = `${figure.kind==='competency'?'':'/failure-modes'}/${slug}/${suffix}`;
const normalizer = readFileSync(join(root, 'tests/helpers/figure-capture-origin.js'));
for (const [directory, htmlPath] of [[source, `figures/${slug}/index.html`], [candidate, `figures/${slug}/index.html`], [built, `${builtPath.slice(1)}index.html`]]) {
  writeFileSync(join(directory, 'parity-origin.js'), normalizer);
  const path = join(directory, htmlPath);
  writeFileSync(path, readFileSync(path, 'utf8').replace('</body>', '<script src="/parity-origin.js"></script></body>'));
}
const receipt = {
  schema: 1, kind: `motion-production-page-parity`, slug, source: sourceSHA,
  normalization: {kind: 'whole-page offset; component document top at y=0', script: sha(normalizer), scope: 'test-only outer-document offset; AR public resize remeasures first-view budget at that shared origin; no authored drawing, timing, sampling or tolerance change'},
  candidate: execFileSync('git', ['rev-parse', 'HEAD'], {cwd: root, encoding: 'utf8'}).trim(),
  edition, cast, started: new Date().toISOString(), status: 'running',
  fixture: JSON.parse(readFileSync(join(candidate, 'fixture.json'), 'utf8')),
  harness: sha(readFileSync(harness)),
  frameHarness: sha(readFileSync(join(root, 'design/motion-figures/scripts/frame-diff.mjs'))),
  attempts: [],
};
const save = () => writeFileSync(join(out, 'receipt.json'), JSON.stringify(receipt, null, 2) + '\n');
save();
const servers = [];
async function serve(directory, pathname = `/figures/${slug}/index.html`) {
  // Port zero lets the OS allocate a fresh port. Read this child's readiness line;
  // a successful fetch from a pre-existing server is never proof of ownership.
  const child = spawn('python3', ['-u', '-m', 'http.server', '0', '--bind', '127.0.0.1', '--directory', directory], {stdio: ['ignore', 'pipe', 'ignore']});
  servers.push(child);
  const port = await new Promise((ok, fail) => {
    let output = '';
    const timer = setTimeout(() => fail(new Error('Owned server did not announce its port')), 5000);
    const reject = error => { clearTimeout(timer); fail(error); };
    child.once('error', reject);
    child.once('exit', code => reject(new Error(`Owned server exited before readiness: ${code}`)));
    child.stdout.on('data', data => {
      output += data;
      const match = output.match(/Serving HTTP on .* port (\d+)/);
      if (match) { clearTimeout(timer); ok(Number(match[1])); }
    });
  });
  const url = `http://127.0.0.1:${port}${pathname}`;
  const response = await fetch(url);
  // Drain the readiness response before synchronous browser work blocks Node.
  // Leaving its body pending can trip Undici's parser when the socket closes.
  const ready = response.ok; await response.arrayBuffer();
  if (child.exitCode !== null || !ready) throw new Error('Owned server is not serving the selected figure');
  return url;
}

const flags = [`--edition=${edition}`, `--cast=${cast}`, '--freeze', `--font-lock=${join(root, 'figures/fonts/manifest.json')}`];
const nonempty = value => Array.isArray(value) ? value.length > 0 : !!value;
function run(stage, mode, directories, url) {
  console.log(`${slug}/${edition}/${cast}: ${stage}`);
  const r = spawnSync('node', [harness, ...(kind === 'frames' ? [slug] : []), mode, ...directories, ...flags, `--url=${url}`], {cwd: root, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024});
  writeFileSync(join(out, `${stage}.stdout.json`), r.stdout || '');
  writeFileSync(join(out, `${stage}.stderr.txt`), r.stderr || '');
  let data;
  try { data = JSON.parse(r.stdout); } catch { throw new Error(`${stage}: invalid output or interrupted browser; do not retry automatically`); }
  const passed = r.status === 0 && !nonempty(data.errors) && !nonempty(data.captured?.errors) &&
    !nonempty(data.differing) && !nonempty(data.missing) && !nonempty(data.textDiffs) && !nonempty(data.receiptDiffs);
  receipt.attempts.push({stage, passed, exit: r.status, result: data}); save();
  return passed;
}
function hashes(directory) {
  const walk = folder => readdirSync(folder).flatMap(name => {
    const path = join(folder, name); return statSync(path).isDirectory() ? walk(path) : [path];
  });
  return Object.fromEntries(walk(directory).sort().map(path => [relative(directory, path), sha(readFileSync(path))]));
}
try {
  const sourceURL = await serve(source), candidateURL = await serve(candidate);
  const baseline = join(out, 'baseline');
  if (!run('baseline', 'capture', [baseline], sourceURL)) throw new Error('Source capture failed');
  for (const [stage, url] of [['source-self-check', sourceURL], ['candidate', candidateURL]]) {
    if (!run(stage, 'diff', [baseline, join(out, stage)], url) &&
        !run(`${stage}-quiet-repeat`, 'diff', [baseline, join(out, `${stage}-quiet-repeat`)], url)) {
      throw new Error(`${stage} still differs after its one quiet repeat`);
    }
  }
  // Whole-page chrome intentionally differs. Preserve every capture, but compare
  // the actual built component against the source without the two page PNGs.
  const componentBase = join(out, 'baseline-component'); mkdirSync(componentBase);
  const copyComponent = (folder, rel = '') => { for (const name of readdirSync(folder)) {
    const path = join(folder, name), dest = join(componentBase, rel, name);
    if (statSync(path).isDirectory()) { mkdirSync(dest); copyComponent(path, join(rel, name)); }
    else if (!/^page-\d+\.png$/.test(name)) writeFileSync(dest, readFileSync(path));
  }};
  copyComponent(baseline);
  const builtURL = await serve(built, builtPath);
  receipt.builtScope = {excluded: ['page-1440.png', 'page-390.png'], reason: 'New surrounding page chrome; all stage, captions, controls, beat list, source and print pixels remain compared.'}; save();
  if (!run('built-page', 'diff', [componentBase, join(out, 'built-page')], builtURL) &&
      !run('built-page-quiet-repeat', 'diff', [componentBase, join(out, 'built-page-quiet-repeat')], builtURL)) throw new Error('Built page differs after one quiet repeat');
  receipt.captures = {};
  for (const stage of ['baseline', 'source-self-check', 'source-self-check-quiet-repeat', 'candidate', 'candidate-quiet-repeat', 'built-page', 'built-page-quiet-repeat']) {
    const directory = join(out, stage);
    if (existsSync(directory)) receipt.captures[stage] = hashes(directory);
  }
  receipt.status = 'passed'; receipt.completed = new Date().toISOString(); save();
  console.log(`${slug}/${edition}/${cast}: source self-check and candidate comparison passed exactly`);
} catch (error) {
  receipt.status = 'failed'; receipt.error = error.message; save();
  throw error;
} finally {
  for (const server of servers) server.kill('SIGTERM');
}
