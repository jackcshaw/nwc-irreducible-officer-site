// Explicit verification job. Never imported by the site build.
import {spawn, spawnSync, execFileSync} from 'node:child_process';
import {mkdirSync, readFileSync, writeFileSync, readdirSync, statSync, existsSync} from 'node:fs';
import {resolve, join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';

const productionFactory = process.argv.includes('--production-factory');
const root = fileURLToPath(new URL('../', import.meta.url));
const [kind, slug, edition, cast, destination] = process.argv.slice(2);
const slugs = new Set(["frame-capture", "fluency-substitution", "premature-synthesis", "uncalibrated-reliance", "invisible-delegation", "institutional-monoculture", "responsibility-laundering", "appropriate-reliance"]);
if (!["frames", "interactive"].includes(kind) || !slugs.has(slug) || (kind === "interactive" && slug !== "appropriate-reliance")) throw new Error("Invalid verification kind or figure");
const variants = new Set(['pme/seminar', 'business/workplace', 'business/classroom', 'business/high-school']);
if (!variants.has(`${edition}/${cast}`) || !destination) throw new Error('Usage: check-motion-parity.mjs <frames|interactive> <slug> <edition> <cast> <new output directory>');
const out = resolve(destination);
if (existsSync(out)) throw new Error('Use a new output directory; never overwrite verification evidence');
mkdirSync(out, {recursive: true});
const sourceSHA = '8def5a10d90260db2b0ef4393f1421b14762731c';
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const source = join(out, 'source-files'), candidate = join(out, 'candidate-files');
mkdirSync(source);
writeFileSync(join(out, 'source.tar'), execFileSync('git', ['archive', sourceSHA, 'design/motion-figures'], {cwd: root, maxBuffer: 32 * 1024 * 1024}));
execFileSync('tar', ['-xf', join(out, 'source.tar'), '-C', source, '--strip-components=2']);
execFileSync('node', [join(root, productionFactory?'tests/helpers/figure-page-parity-fixture.mjs':'tests/helpers/figure-parity-fixture.mjs'), source, candidate, ...(productionFactory?[slug,edition,cast]:[])], {cwd: root});
const harness = join(root, kind === 'frames' ? 'design/motion-figures/scripts/frame-diff.mjs' : 'design/motion-figures/figures/appropriate-reliance/regression/ar-regress.mjs');
const receipt = {
  schema: 1, kind: `motion-${kind}-${productionFactory?'production-factory':'runtime'}-parity`, slug, source: sourceSHA,
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
async function serve(directory) {
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
  const url = `http://127.0.0.1:${port}/figures/${slug}/index.html`;
  if (child.exitCode !== null || !(await fetch(url)).ok) throw new Error('Owned server is not serving the selected figure');
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
  receipt.captures = {};
  for (const stage of ['baseline', 'source-self-check', 'source-self-check-quiet-repeat', 'candidate', 'candidate-quiet-repeat']) {
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
