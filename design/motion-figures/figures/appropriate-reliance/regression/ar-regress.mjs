// Regression set for appropriate reliance, the interactive figure (editions step one).
//
// scripts/frame-diff.mjs covers the no-call timeline (beat starts, settled moments, every
// 2 s, the waiting view, reduced, print) through the forced window seek, which skips the
// gates. This adds what exercises the gate logic, at 1440×900, 1280×720 and 390×844:
//   branches/  every preset in branches.json (?calls=) at each beat start and settled moment
//              from question 1 on, and every 2 s from 24 s to the end;
//   flows/     the reader's paths through both questions with real clicks and the locks:
//              question 1 on arrival (settled), Play with no call (the prompt), a call made,
//              End clamping at question 2, a second call, the final frame with everything
//              unlocked, Start over re-locking, both questions skipped; and a reduced-motion
//              path. Each state saves the shot, and the figure or whole page where the beat
//              list, summaries and disclosure matter, plus a text snapshot (every word in
//              the DOM, the visible text, the live region and which parts are locked).
//   Text snapshots: domText (every text node) compares without whitespace, since page
//   indentation between elements isn't a word; visibleText and the rest compare exactly.
//
//   node figures/appropriate-reliance/regression/ar-regress.mjs capture <dir> [--port=5291] [--edition=id] [--cast=id] [--hide=css] [--freeze]
//   node figures/appropriate-reliance/regression/ar-regress.mjs diff <baselineDir> <currentDir> [--port=5291] [--edition=id] [--cast=id] [--hide=css] [--freeze]
//   node figures/appropriate-reliance/regression/ar-regress.mjs compare <baselineDir> <currentDir>
//
// capture runs frame-diff.mjs capture into <dir> first, then adds branches/ and flows/.
// --edition=id loads ?edition=id and --cast=id adds ?cast=id; --hide=css hides intended page
// additions (as frame-diff's --hide does) in the stills and removes them from the text
// snapshots; --freeze turns off CSS transitions and animations, as frame-diff's does.
// diff captures into <currentDir>, then compares every baseline file: PNGs byte for byte,
// then pixel by pixel; text snapshots key by key. Serve motion-figures/ first.
import { chromium } from "/Users/jackcshaw-2/dev/comprendo-clients/nwc-irreducible-officer-site-motion/node_modules/playwright/index.mjs";
import { mkdirSync, readdirSync, readFileSync, writeFileSync, existsSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { execFileSync } from "node:child_process";

const SLUG = "appropriate-reliance";
const args = process.argv.slice(2);
const flag = (name, def) => (args.find((a) => a.startsWith(`--${name}=`)) || `--${name}=${def}`).split("=")[1];
const [mode, dirA, dirB] = args.filter((a) => !a.startsWith("--"));
const port = flag("port", "5291");
const edition = flag("edition", "");
const cast = flag("cast", "");
const hide = flag("hide", "");
const freeze = args.includes("--freeze");
const ROOT = new URL("../../../", import.meta.url).pathname; // motion-figures/
const resolve = (d) => (d.startsWith("/") ? d : join(ROOT, d));
const URL0 = `http://127.0.0.1:${port}/figures/${SLUG}/index.html`;
const SIZES = [[1440, 900], [1280, 720], [390, 844]];
const cfg = JSON.parse(readFileSync(join(ROOT, `figures/${SLUG}/branches.json`), "utf8"));
// Wall-clock wait after load for the name card's intro over question 1 to settle (2.2 s hold,
// 0.8 s move; appropriate-reliance.js), with a second to spare.
const INTRO = 3600;

async function open(b, w, h, query = "", opts = {}) {
  const c = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, ...opts });
  if (hide) await c.addInitScript((css) => document.addEventListener("DOMContentLoaded", () => { const s = document.createElement("style"); s.textContent = `${css}{display:none!important}`; document.head.append(s); }), hide);
  if (freeze) await c.addInitScript(() => document.addEventListener("DOMContentLoaded", () => { const s = document.createElement("style"); s.textContent = "*,*::before,*::after{transition:none!important;animation:none!important}"; document.head.append(s); }));
  const qs = new URLSearchParams(query.replace(/^\?/, ""));
  if (edition) qs.set("edition", edition);
  if (cast) qs.set("cast", cast);
  query = qs.toString() ? `?${qs}` : "";
  const p = await c.newPage();
  const errors = [];
  p.on("pageerror", (e) => errors.push(e.message));
  p.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await p.goto(URL0 + query);
  await p.evaluate(() => document.fonts.ready);
  await p.waitForFunction((id) => window.__motionFigures?.[id], SLUG, { timeout: 20000 });
  await p.waitForTimeout(400);
  return { c, p, errors };
}
// Element stills of a shot taller than the window are stitched, so sticky bands would land
// wherever the scroll left them: set them static for the still, then restore.
// The page is also scrolled so the element's top sits at the same place in the window every
// time: an element still's edge rows otherwise depend on where the figure's own scrolling
// left the page (a sub-pixel offset showed as one changed row).
const still = async (p, sel, path) => {
  await p.evaluate(() => { for (const el of document.querySelectorAll("figure *")) if (getComputedStyle(el).position === "sticky") { el.dataset.unstuck = "1"; el.style.position = "static"; } });
  await p.evaluate((sel) => { const el = document.querySelector(sel); window.scrollTo(0, Math.floor(window.scrollY + el.getBoundingClientRect().top)); }, sel);
  await p.waitForTimeout(60);
  // Two matching shots in a row, so a still never catches raster still settling (seen in
  // the stacked view at 1280 × 720 while other browsers loaded the machine).
  let prev = await p.locator(sel).first().screenshot();
  for (let i = 0; i < 4; i++) {
    await p.waitForTimeout(150);
    const cur = await p.locator(sel).first().screenshot();
    if (cur.equals(prev)) break;
    prev = cur;
  }
  writeFileSync(path, prev);
  await p.evaluate(() => { for (const el of document.querySelectorAll("[data-unstuck]")) { el.style.position = ""; delete el.dataset.unstuck; } });
};
const snapshot = (p) => p.evaluate(([id, hide]) => {
  const root = document.getElementById(id);
  const sq = (s) => (s || "").replace(/\s+/g, " ").trim();
  const q = (sel) => document.querySelector(sel);
  // --hide removes intended page additions from the word list too, as it does from the stills.
  const body = document.body.cloneNode(true);
  if (hide) body.querySelectorAll(hide).forEach((n) => n.remove());
  // <noscript> content is raw text while scripts run, never shown: not a page word.
  body.querySelectorAll("noscript").forEach((n) => n.remove());
  return {
    domText: sq(body.textContent),
    visibleText: sq(document.body.innerText),
    description: q('meta[name="description"]')?.getAttribute("content"),
    title: document.title,
    live: root.querySelector("[data-ar-live]").textContent,
    time: root.querySelector("[data-mf-time]").textContent,
    state: root.dataset.state,
    lockedBeats: [...root.querySelectorAll("[data-mf-beats] > li")].map((li) => (li.classList.contains("is-locked") ? 1 : 0) + (li.querySelector("button").disabled ? 2 : 0)),
    hidden: Object.fromEntries([["sum1", "[data-ar-sum1]"], ["sum2", "[data-ar-sum2]"], ["sum3", "[data-ar-sum3]"], ["after", "#ar-after"], ["afterLocked", "[data-ar-after-locked]"], ["gate1", '[data-ar-gate="0"]'], ["gate2", '[data-ar-gate="1"]'], ["gatebar", "[data-ar-gatebar]"], ["prompt", "[data-ar-prompt]"]].map(([k, s]) => [k, q(s)?.hidden ?? null])),
    afterOpen: q("#ar-after")?.open ?? null,
    labels: [...root.querySelectorAll("label, legend, button")].map((n) => sq(n.textContent)),
  };
}, [SLUG, hide]);

// --disable-partial-raster: with partial raster, a few frames (the evidence panel's scale
// transform, beat 9's tags) came out in one of two antialiasing variants from run to run
// with no code change; full-tile raster makes every capture byte-stable.
const LAUNCH = { args: ["--disable-partial-raster"] };
async function captureExtra(dir) {
  const b = await chromium.launch(LAUNCH);
  const errors = [];
  let count = 0;
  const pad = (i) => String(i).padStart(2, "0");
  // Branches: each preset of calls, through the forced seek.
  for (const [w, h] of SIZES) {
    for (const [name, calls] of Object.entries(cfg.branches)) {
      const sub = join(dir, "branches", `${w}x${h}`, name);
      mkdirSync(sub, { recursive: true });
      const { c, p, errors: e } = await open(b, w, h, `?calls=${calls}`);
      const f = await p.evaluate((id) => { const f = window.__motionFigures[id]; return { duration: f.duration, card: f.card, beats: f.beats, settles: f.beats.map((_, i) => f.settle(i)) }; }, SLUG);
      const times = new Set();
      f.beats.forEach((t, i) => { if (i >= 2) { times.add(+t.toFixed(2)); times.add(+f.settles[i].toFixed(2)); } });
      for (let t = 24 + f.card; t <= f.duration + 1e-6; t += 2) times.add(+t.toFixed(2));
      times.add(+f.duration.toFixed(2));
      for (const t of [...times].sort((a, b) => a - b)) {
        await p.evaluate(([id, t]) => window.__motionFigures[id].seek(t), [SLUG, t]);
        await p.waitForTimeout(30);
        await still(p, "[data-mf-shot]", join(sub, `t${t.toFixed(2).padStart(6, "0")}.png`));
        count++;
      }
      errors.push(...e);
      await c.close();
    }
  }
  // Flows: the reader's paths with real clicks; locks apply (no ?t=).
  const texts = {};
  for (const [w, h] of SIZES) {
    const sz = `${w}x${h}`;
    const sub = join(dir, "flows", sz);
    mkdirSync(sub, { recursive: true });
    const save = async (name, { figure = false, page = false } = {}) => {
      await p.waitForTimeout(250);
      await still(p, "[data-mf-shot]", join(sub, `${name}.png`)); count++;
      if (figure) { await still(p, "figure", join(sub, `${name}-figure.png`)); count++; }
      if (page) { await p.screenshot({ path: join(sub, `${name}-page.png`), fullPage: true }); count++; }
      texts[`${sz}/${name}`] = await snapshot(p);
    };
    const end = async () => { await p.focus("[data-mf-scrub]"); await p.keyboard.press("End"); await p.waitForTimeout(1500); };
    let { c, p, errors: e } = await open(b, w, h);
    await p.waitForTimeout(INTRO); // the name card settles
    await save("q1", { figure: true, page: true });
    await p.click("[data-mf-toggle]");
    await save("q1-play-no-call");
    await p.locator('[data-ar-gate="0"] [data-ar-opt="b"]').click();
    await save("q1-call-b");
    await p.click("[data-ar-continue]");
    await p.waitForTimeout(300);
    await end();
    await save("q2", { figure: true });
    await p.locator('[data-ar-gate="1"] [data-ar-opt="move"]').click();
    await save("q2-call-move");
    await p.click("[data-ar-continue]");
    await p.waitForTimeout(300);
    await end();
    await save("final-b-move", { figure: true, page: true });
    await p.click("[data-mf-replay]");
    await p.waitForTimeout(200);
    await end();
    await save("restart-q1", { figure: true });
    errors.push(...e);
    await c.close();
    // Both questions skipped.
    ({ c, p, errors: e } = await open(b, w, h));
    await p.waitForTimeout(INTRO);
    await p.click("[data-ar-skip]");
    await p.waitForTimeout(300);
    await end();
    await save("q2-after-skip");
    await p.click("[data-ar-skip]");
    await p.waitForTimeout(300);
    await end();
    await save("final-skipped", { figure: true });
    errors.push(...e);
    await c.close();
  }
  // Reduced motion: question by question to the final frame; then the printed page.
  {
    const sub = join(dir, "flows", "reduced-1440");
    mkdirSync(sub, { recursive: true });
    const { c, p, errors: e } = await open(b, 1440, 900, "", { reducedMotion: "reduce" });
    const save = async (name) => { await p.waitForTimeout(250); await still(p, "figure", join(sub, `${name}.png`)); count++; texts[`reduced-1440/${name}`] = await snapshot(p); };
    await save("q1");
    await p.locator('[data-ar-gate="0"] [data-ar-opt="a"]').click();
    await p.click("[data-ar-continue]");
    await save("q2");
    await p.locator('[data-ar-gate="1"] [data-ar-opt="time"]').click();
    await p.click("[data-ar-continue]");
    await save("final-a-time");
    errors.push(...e);
    await c.close();
  }
  {
    const sub = join(dir, "flows", "print-1440");
    mkdirSync(sub, { recursive: true });
    const { c, p, errors: e } = await open(b, 1440, 900);
    await p.waitForTimeout(INTRO);
    await p.emulateMedia({ media: "print" });
    await p.evaluate(() => window.dispatchEvent(new Event("beforeprint")));
    await p.waitForTimeout(600);
    await p.screenshot({ path: join(sub, "print-page.png"), fullPage: true }); count++;
    texts["print-1440/print"] = await snapshot(p);
    await p.emulateMedia({ media: "screen" });
    await p.evaluate(() => window.dispatchEvent(new Event("afterprint")));
    await p.waitForTimeout(400);
    await still(p, "[data-mf-shot]", join(sub, "after-print.png")); count++;
    texts["print-1440/after-print"] = await snapshot(p);
    errors.push(...e);
    await c.close();
  }
  writeFileSync(join(dir, "texts.json"), JSON.stringify(texts, null, 1));
  await b.close();
  return { count, errors };
}

async function capture(dir) {
  dir = resolve(dir);
  mkdirSync(dir, { recursive: true });
  const out = execFileSync("node", [join(ROOT, "scripts/frame-diff.mjs"), SLUG, "capture", dir, `--port=${port}`, ...(edition ? [`--edition=${edition}`] : []), ...(cast ? [`--cast=${cast}`] : []), ...(hide ? [`--hide=${hide}`] : []), ...(freeze ? ["--freeze"] : [])], { encoding: "utf8" });
  const fd = JSON.parse(out);
  const r = await captureExtra(dir);
  return { frames: fd.captured, extra: r.count, errors: [...fd.errors, ...r.errors] };
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
      return { pixels: n };
    }, [`data:image/png;base64,${A.toString("base64")}`, `data:image/png;base64,${B.toString("base64")}`]);
    if (r.pixels === 0) same++; else diffs.push({ file: f, ...r });
  }
  await b.close();
  // Text snapshots, key by key.
  const textDiffs = [];
  let wsOnly = 0;
  const ta = JSON.parse(readFileSync(join(base, "texts.json"), "utf8")), tb = existsSync(join(cur, "texts.json")) ? JSON.parse(readFileSync(join(cur, "texts.json"), "utf8")) : {};
  for (const [state, snap] of Object.entries(ta)) {
    for (const [k, v] of Object.entries(snap)) {
      const w = tb[state]?.[k];
      // domText is every text node in the page; whitespace between elements (the page's own
      // indentation, which filled-in copy doesn't have) isn't a word, so it compares without
      // whitespace. Every word and its order still count, and visibleText compares exactly.
      if (k === "domText" && typeof w === "string" && v.replace(/\s/g, "") === w.replace(/\s/g, "")) { if (v !== w) wsOnly++; continue; }
      if (JSON.stringify(v) !== JSON.stringify(w)) {
        let where = "";
        if (typeof v === "string" && typeof w === "string") { let i = 0; while (i < v.length && v[i] === w[i]) i++; where = ` at ${i}: «${v.slice(Math.max(0, i - 40), i + 60)}» vs «${w.slice(Math.max(0, i - 40), i + 60)}»`; }
        textDiffs.push(`${state}.${k}${where}`);
      }
    }
  }
  return { files: files.length, same, diffs, missing, textStates: Object.keys(ta).length, textDiffs, wsOnly };
}

if (mode === "capture") {
  console.log(JSON.stringify(await capture(dirA), null, 1));
} else if (mode === "diff") {
  const r1 = await capture(dirB);
  const r = await compare(dirA, dirB);
  console.log(JSON.stringify({ captured: r1, compared: r.files, identical: r.same, differing: r.diffs.length, missing: r.missing.length, textStates: r.textStates, textDiffs: r.textDiffs.slice(0, 30), domTextWhitespaceOnly: r.wsOnly, diffs: r.diffs.slice(0, 40), missingFiles: r.missing.slice(0, 20) }, null, 1));
  process.exitCode = r.diffs.length || r.missing.length || r.textDiffs.length ? 1 : 0;
} else if (mode === "compare") {
  // Compare two existing captures without capturing again.
  const r = await compare(dirA, dirB);
  console.log(JSON.stringify({ compared: r.files, identical: r.same, differing: r.diffs.length, missing: r.missing.length, textStates: r.textStates, textDiffs: r.textDiffs.slice(0, 30), domTextWhitespaceOnly: r.wsOnly, diffs: r.diffs.slice(0, 40) }, null, 1));
  process.exitCode = r.diffs.length || r.missing.length || r.textDiffs.length ? 1 : 0;
} else {
  console.log("usage: ar-regress.mjs capture <dir> | diff <baselineDir> <currentDir> | compare <baselineDir> <currentDir> [--port=5291] [--edition=id] [--cast=id] [--hide=css] [--freeze]");
  process.exitCode = 2;
}
