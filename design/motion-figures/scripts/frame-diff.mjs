// Frame-for-frame regression check for a motion figure (editions pilot, FC).
//
// Captures the shot area (stage + caption band) at every beat start, every beat's
// settled moment and every 2 seconds, plus the waiting view, at 1440×900, 1280×720
// and 390×844, and the reduced-motion and print views, and the full page (reduced). Then compares a capture
// against a baseline pixel by pixel.
//
//   node scripts/frame-diff.mjs <slug> capture <dir> [--edition=id] [--cast=id] [--hide=css] [--freeze] [--port=5291]
//   node scripts/frame-diff.mjs <slug> diff <baselineDir> <currentDir> [--edition=id] [--cast=id] [--hide=css] [--freeze] [--port=5291]
//
// --cast=id loads ?cast=id (a classroom cast of a business edition, CONVENTIONS.md, Editions).
// --freeze turns off CSS transitions and animations, so a seek always shows the end state:
// the beat list's colour change and stacked-view pulses otherwise differ between two
// captures of the same build. Diff with the flags the baseline was captured with; each
// capture writes them to <dir>/capture.json, and diff warns when they differ.
//
// --hide=".fig-editions,.fig-edition-note" sets display:none on page additions above
// the figure, so a capture stays comparable with a baseline taken before them. Any
// layout change above the figure moves it, and even a whole-pixel move changes
// Chrome's raster tile seams (single-row differences), so hide intended additions to
// prove the figure itself is unchanged, then re-baseline.
//
// `diff` captures into <currentDir> first, then compares every baseline file. Files
// are byte-compared; when bytes differ, the pixels are compared in the browser and
// the count of differing pixels (any channel off by more than 0) is reported.
// Serve motion-figures/ first (python3 -m http.server 5291 --bind 127.0.0.1).
import { chromium } from "/Users/jackcshaw-2/dev/comprendo-clients/nwc-irreducible-officer-site-motion/node_modules/playwright/index.mjs";
import { mkdirSync, readdirSync, readFileSync, writeFileSync, existsSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const args = process.argv.slice(2);
const flag = (name, def) => (args.find((a) => a.startsWith(`--${name}=`)) || `--${name}=${def}`).split("=")[1];
const [slug, mode, dirA, dirB] = args.filter((a) => !a.startsWith("--"));
const port = flag("port", "5291");
const edition = flag("edition", "");
const cast = flag("cast", "");
const hide = flag("hide", "");
const freeze = args.includes("--freeze");
const root = new URL("../", import.meta.url).pathname;
const resolve = (d) => (d.startsWith("/") ? d : join(root, d));
const query = new URLSearchParams([["edition", edition], ["cast", cast]].filter(([, v]) => v)).toString();
const url = `http://127.0.0.1:${port}/figures/${slug}/index.html${query ? `?${query}` : ""}`;
const SIZES = [[1440, 900], [1280, 720], [390, 844]];

async function open(b, w, h, opts = {}) {
  const c = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, ...opts });
  if (hide) await c.addInitScript((css) => document.addEventListener("DOMContentLoaded", () => { const s = document.createElement("style"); s.textContent = `${css}{display:none!important}`; document.head.append(s); }), hide);
  if (freeze) await c.addInitScript(() => document.addEventListener("DOMContentLoaded", () => { const s = document.createElement("style"); s.textContent = "*,*::before,*::after{transition:none!important;animation:none!important}"; document.head.append(s); }));
  const p = await c.newPage();
  const errors = [];
  p.on("pageerror", (e) => errors.push(e.message));
  p.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await p.goto(url);
  await p.evaluate(() => document.fonts.ready);
  await p.waitForFunction((id) => window.__motionFigures?.[id], slug, { timeout: 20000 });
  await p.waitForTimeout(400);
  return { c, p, errors };
}

async function capture(dir) {
  dir = resolve(dir);
  const b = await chromium.launch();
  let count = 0;
  const errors = [];
  for (const [w, h] of SIZES) {
    const sub = join(dir, `${w}x${h}`);
    mkdirSync(sub, { recursive: true });
    const { c, p, errors: e } = await open(b, w, h);
    const shot = p.locator("[data-mf-shot]");
    await shot.screenshot({ path: join(sub, "waiting.png") });
    count++;
    const f = await p.evaluate((id) => { const f = window.__motionFigures[id]; return { duration: f.duration, beats: f.beats, settles: f.beats.map((_, i) => f.settle(i)) }; }, slug);
    const times = new Set();
    f.beats.forEach((t) => times.add(+t.toFixed(2)));
    f.settles.forEach((t) => times.add(+t.toFixed(2)));
    for (let t = 0; t <= f.duration + 1e-6; t += 2) times.add(+t.toFixed(2));
    times.add(+f.duration.toFixed(2));
    for (const t of [...times].sort((a, b) => a - b)) {
      await p.evaluate(([id, t]) => window.__motionFigures[id].seek(t), [slug, t]);
      await p.waitForTimeout(30);
      await shot.screenshot({ path: join(sub, `t${t.toFixed(2).padStart(6, "0")}.png`) });
      count++;
    }
    errors.push(...e);
    await c.close();
  }
  // Reduced motion (the final frame with the full beat list) at desktop and phone widths.
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    const { c, p, errors: e } = await open(b, w, h, { reducedMotion: "reduce" });
    await p.locator("figure").first().screenshot({ path: join(dir, `reduced-${w}.png`) });
    // The whole page too: page copy outside the figure (setup, check section, quote, links).
    await p.screenshot({ path: join(dir, `page-${w}.png`), fullPage: true });
    count += 2;
    errors.push(...e);
    await c.close();
  }
  // Print: print media and the beforeprint redraw (the final frame).
  {
    const { c, p, errors: e } = await open(b, 1440, 900);
    await p.emulateMedia({ media: "print" });
    await p.evaluate(() => window.dispatchEvent(new Event("beforeprint")));
    // Wait out the beat list's 200 ms colour transition; at 100 ms, print shots
    // differed by one colour level from run to run.
    await p.waitForTimeout(600);
    await p.locator("figure").first().screenshot({ path: join(dir, "print.png") });
    count++;
    errors.push(...e);
    await c.close();
  }
  await b.close();
  writeFileSync(join(dir, "capture.json"), JSON.stringify({ slug, edition, cast, hide, freeze, sizes: SIZES, captured: count }, null, 1) + "\n");
  return { count, errors };
}

const walk = (d) => readdirSync(d).flatMap((n) => { const p = join(d, n); return statSync(p).isDirectory() ? walk(p) : n.endsWith(".png") ? [p] : []; });

async function compare(base, cur) {
  base = resolve(base); cur = resolve(cur);
  const files = walk(base).map((p) => relative(base, p)).sort();
  const b = await chromium.launch();
  const p = await (await b.newContext()).newPage();
  await p.setContent("<canvas id=a></canvas><canvas id=b></canvas>");
  let same = 0;
  const diffs = [], missing = [];
  for (const f of files) {
    const pb = join(cur, f);
    if (!existsSync(pb)) { missing.push(f); continue; }
    const A = readFileSync(join(base, f)), B = readFileSync(pb);
    if (A.equals(B)) { same++; continue; }
    const r = await p.evaluate(async ([a, bb]) => {
      const load = (src) => new Promise((ok) => { const i = new Image(); i.onload = () => ok(i); i.src = src; });
      const [ia, ib] = await Promise.all([load(a), load(bb)]);
      if (ia.width !== ib.width || ia.height !== ib.height) return { size: `${ia.width}x${ia.height} vs ${ib.width}x${ib.height}` };
      const px = (img, id) => { const c = document.getElementById(id); c.width = img.width; c.height = img.height; const x = c.getContext("2d"); x.drawImage(img, 0, 0); return x.getImageData(0, 0, img.width, img.height).data; };
      const da = px(ia, "a"), db = px(ib, "b");
      let n = 0;
      for (let i = 0; i < da.length; i += 4) if (da[i] !== db[i] || da[i + 1] !== db[i + 1] || da[i + 2] !== db[i + 2] || da[i + 3] !== db[i + 3]) n++;
      return { pixels: n, of: da.length / 4 };
    }, [`data:image/png;base64,${A.toString("base64")}`, `data:image/png;base64,${B.toString("base64")}`]);
    if (r.pixels === 0) same++; else diffs.push({ file: f, ...r });
  }
  await b.close();
  return { files: files.length, same, diffs, missing };
}

if (mode === "capture") {
  const r = await capture(dirA);
  console.log(JSON.stringify({ captured: r.count, dir: dirA, errors: r.errors }, null, 1));
} else if (mode === "diff") {
  const r1 = await capture(dirB);
  const r = await compare(dirA, dirB);
  // A baseline captured with other flags differs for that reason alone: say so.
  const manifest = (d) => { const f = join(resolve(d), "capture.json"); return existsSync(f) ? JSON.parse(readFileSync(f, "utf8")) : null; };
  const ma = manifest(dirA), mb = manifest(dirB);
  const flagsDiffer = ma && ["edition", "cast", "hide", "freeze"].filter((k) => (ma[k] || "") !== (mb[k] || ""));
  console.log(JSON.stringify({ captured: r1.count, errors: r1.errors, compared: r.files, identical: r.same, differing: r.diffs.length, missing: r.missing, ...(flagsDiffer?.length ? { warning: `baseline captured with other flags: ${flagsDiffer.join(", ")}` } : {}), diffs: r.diffs.slice(0, 40) }, null, 1));
  process.exitCode = r.diffs.length || r.missing.length ? 1 : 0;
} else {
  console.log("usage: frame-diff.mjs <slug> capture <dir> | diff <baselineDir> <currentDir> [--edition=id] [--cast=id] [--hide=css] [--freeze] [--port=5291]");
  process.exitCode = 2;
}
