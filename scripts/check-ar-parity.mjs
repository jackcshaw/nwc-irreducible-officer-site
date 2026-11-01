// Explicit verification job. Never imported by the site build.
import {spawn, spawnSync, execFileSync} from 'node:child_process';
import {mkdirSync, readFileSync, writeFileSync, readdirSync, statSync, existsSync} from 'node:fs';
import {resolve, join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';

const root = fileURLToPath(new URL('../', import.meta.url));
const [edition, cast, destination] = process.argv.slice(2);
const variants = new Set(['pme/seminar', 'business/workplace', 'business/classroom', 'business/high-school']);
if (!variants.has(`${edition}/${cast}`) || !destination) throw new Error('Usage: check-ar-parity.mjs <edition> <cast> <new output directory>');
const out = resolve(destination);
if (existsSync(out)) throw new Error('Use a new output directory; never overwrite verification evidence');
mkdirSync(out, {recursive: true});
const sourceSHA = '8def5a10d90260db2b0ef4393f1421b14762731c';
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const source = join(out, 'source-files'), candidate = join(out, 'candidate-files');
mkdirSync(source);
writeFileSync(join(out, 'source.tar'), execFileSync('git', ['archive', sourceSHA, 'design/motion-figures'], {cwd: root, maxBuffer: 32 * 1024 * 1024}));
execFileSync('tar', ['-xf', join(out, 'source.tar'), '-C', source, '--strip-components=2']);
execFileSync('node', [join(root, 'tests/helpers/figure-parity-fixture.mjs'), source, candidate], {cwd: root});
const harness = join(root, 'design/motion-figures/figures/appropriate-reliance/regression/ar-regress.mjs');
const receipt = {
  schema: 1, kind: 'appropriate-reliance-runtime-parity', source: sourceSHA,
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
async function serve(directory, port) {
  const child = spawn('python3', ['-m', 'http.server', String(port), '--bind', '127.0.0.1', '--directory', directory], {stdio: 'ignore'});
  servers.push(child);
  const url = `http://127.0.0.1:${port}/figures/appropriate-reliance/index.html`;
  for (let i = 0; i < 50; i++) {
    if (child.exitCode !== null) throw new Error(`Owned server failed on port ${port}`);
    try { if ((await fetch(url)).ok) return url; } catch {}
    await new Promise(ok => setTimeout(ok, 100));
  }
  throw new Error(`Owned server did not start on port ${port}`);
}
const flags = [`--edition=${edition}`, `--cast=${cast}`, '--freeze', `--font-lock=${join(root, 'figures/fonts/manifest.json')}`];
const nonempty = value => Array.isArray(value) ? value.length > 0 : !!value;
function run(stage, mode, directories, url) {
  console.log(`${edition}/${cast}: ${stage}`);
  const r = spawnSync('node', [harness, mode, ...directories, ...flags, `--url=${url}`], {cwd: root, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024});
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
  const sourceURL = await serve(source, 5393), candidateURL = await serve(candidate, 5395);
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
  console.log(`${edition}/${cast}: source, branches, flows and candidate all passed exactly`);
} catch (error) {
  receipt.status = 'failed'; receipt.error = error.message; save();
  throw error;
} finally {
  for (const server of servers) server.kill('SIGTERM');
}
