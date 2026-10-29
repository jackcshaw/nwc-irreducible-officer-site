// Stills for a motion figure: one per beat (its settled moment) plus the final
// frame, a reduced-motion page, a 390px page, and mechanical checks.
// Adapted from concepts-v0/scripts/stills.mjs.
// usage: node figure-shots.mjs <slug> [port] [--edition=id] [--cast=id]   (serve motion-figures/ first)
// --edition=id loads ?edition=id and writes to shots/<id>/ (CONVENTIONS.md, Editions).
// --cast=id adds ?cast=id and writes to shots/<edition>-<cast>/, e.g. shots/business-classroom/.
import { chromium } from "/Users/jackcshaw-2/dev/comprendo-clients/nwc-irreducible-officer-site-motion/node_modules/playwright/index.mjs";
import { mkdirSync } from "node:fs";

const argv = process.argv.slice(2);
const edition = (argv.find((a) => a.startsWith("--edition=")) || "").split("=")[1] || "";
const cast = (argv.find((a) => a.startsWith("--cast=")) || "").split("=")[1] || "";
const [slug, portArg] = argv.filter((a) => !a.startsWith("--"));
// base ends in "?" (or "?edition=id&cast=id&") so call sites append their own query.
const base = `http://127.0.0.1:${portArg || 5291}/figures/${slug}/index.html?${edition ? `edition=${edition}&` : ""}${cast ? `cast=${cast}&` : ""}`;
const sub = [edition, cast].filter(Boolean).join("-");
const out = new URL(`../figures/${slug}/shots/${sub ? `${sub}/` : ""}`, import.meta.url).pathname;
mkdirSync(out, { recursive: true });
const b = await chromium.launch();
const errors = [];
const report = {};

async function open(url, opts = {}) {
  const c = await b.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2, ...opts });
  const p = await c.newPage();
  p.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  p.on("pageerror", (e) => errors.push(e.message));
  await p.goto(url);
  await p.evaluate(() => document.fonts.ready);
  await p.waitForFunction((id) => window.__motionFigures?.[id], slug);
  await p.waitForTimeout(200);
  return [c, p];
}

// Beat stills at each beat's settled moment, and the final frame, at 1440.
{
  const [c, p] = await open(`${base}t=0`);
  const fig = await p.evaluate((id) => ({ beats: window.__motionFigures[id].beats, duration: window.__motionFigures[id].duration }), slug);
  const shot = p.locator("[data-mf-shot]");
  for (let i = 0; i < fig.beats.length; i++) {
    const t = await p.evaluate(([id, i]) => { const f = window.__motionFigures[id]; const t = f.settle(i); f.seek(t); return t; }, [slug, i]);
    await p.waitForTimeout(60);
    await shot.screenshot({ path: `${out}beat-${String(i + 1).padStart(2, "0")}.png` });
    report[`beat ${i + 1}`] = `t=${t.toFixed(2)}`;
  }
  await p.evaluate((id) => window.__motionFigures[id].seek(window.__motionFigures[id].duration), slug);
  await p.waitForTimeout(60);
  await shot.screenshot({ path: `${out}final.png` });
  // Label sizes at 1440: every visible text's rendered font size.
  report.minVisibleTextPx1440 = await p.evaluate(() => {
    const svg = document.querySelector("svg");
    const scale = svg.getBoundingClientRect().width / 960;
    const sizes = [...svg.querySelectorAll("[data-fs]")].filter((n) => n.getAttribute("visibility") !== "hidden").map((n) => +n.dataset.fs * scale);
    return Math.min(...sizes).toFixed(1);
  });
  report.monoPx1440 = await p.evaluate(() => (12 * document.querySelector("svg").getBoundingClientRect().width / 960).toFixed(1));
  report.figureWidth1440 = await p.evaluate(() => Math.round(document.querySelector("svg").getBoundingClientRect().width));
  await c.close();
}
// Rendered text size, counting scaled groups: font-size × the element's screen scale
// (getScreenCTM), for every visible picture text at each beat's settled moment.
// data-fs alone misses text inside a scaled <g>. Checked at 1440 and two laptop windows.
for (const [w, h] of [[1440, 1000], [1366, 657], [1280, 720]]) {
  const [c, p] = await open(`${base}t=0`, { viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  const stacked = await p.evaluate(() => !!document.querySelector(".is-stacked"));
  let min = Infinity, where = "";
  if (!stacked) {
    const n = await p.evaluate((id) => window.__motionFigures[id].beats.length, slug);
    for (let i = 0; i <= n; i++) {
      const r = await p.evaluate(([id, i]) => {
        const f = window.__motionFigures[id];
        f.seek(i < f.beats.length ? f.settle(i) : f.duration);
        const op = (el) => { let o = 1; for (let e = el; e && e.tagName !== "svg"; e = e.parentElement) { const a = e.getAttribute("opacity"); if (a != null) o *= +a; const cs = getComputedStyle(e); if (cs.display === "none" || cs.visibility === "hidden") return 0; } return o; };
        let m = Infinity, txt = "";
        for (const t of document.querySelectorAll("svg text")) {
          if (t.getAttribute("visibility") === "hidden" || op(t) < 0.05 || !t.textContent.trim()) continue;
          const ctm = t.getScreenCTM(); if (!ctm) continue;
          const px = parseFloat(t.getAttribute("font-size")) * Math.hypot(ctm.a, ctm.b);
          if (px < m) { m = px; txt = t.textContent.trim().slice(0, 32); }
        }
        return { m, txt };
      }, [slug, i]);
      if (r.m < min) { min = r.m; where = `beat ${i + 1}: "${r.txt}"`; }
    }
  }
  report[`minRenderedTextPx${w}x${h}`] = stacked ? "stacked" : `${min.toFixed(1)} (${where})`;
  await c.close();
}
// Full page at 1440, final frame (reduced), for the record.
{
  const [c, p] = await open(`${base}reduced`);
  await p.screenshot({ path: `${out}page-1440-reduced.png`, fullPage: true });
  await c.close();
}
// Reduced motion via the media feature: must show the final frame with every detail.
{
  const [c, p] = await open(base, { reducedMotion: "reduce" });
  report.reduced = await p.evaluate((id) => {
    const root = document.getElementById(id);
    const details = [...root.querySelectorAll(".mf-detail")];
    return {
      isReduced: root.classList.contains("is-reduced"),
      atEnd: document.querySelector("[data-mf-scrub]").value === String(window.__motionFigures[id].duration.toFixed(2)) || +document.querySelector("[data-mf-scrub]").value >= window.__motionFigures[id].duration - 0.01,
      current: root.querySelector("[aria-current]")?.textContent,
      detailsVisible: details.every((d) => d.getBoundingClientRect().height > 10),
      detailCount: details.length,
      caption: root.querySelector("[data-mf-caption]").textContent.trim(),
    };
  }, slug);
  await p.locator("figure").screenshot({ path: `${out}reduced-figure.png` });
  await c.close();
}
// Phone width: no horizontal scroll; the final frame and the beat list.
for (const w of [390, 768]) {
  const [c, p] = await open(`${base}reduced`, { viewport: { width: w, height: 844 }, deviceScaleFactor: 3 });
  report[`overflow${w}`] = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  report[`hiddenText${w}`] = await p.evaluate(() => [...document.querySelectorAll("svg [data-fs]")].filter((n) => n.getAttribute("visibility") === "hidden").length);
  await p.screenshot({ path: `${out}page-${w}-reduced.png`, fullPage: true });
  await c.close();
}
// Keyboard: Tab reaches play, restart, scrubber; arrow keys scrub.
{
  const [c, p] = await open(`${base}t=0`);
  const seen = [];
  for (let i = 0; i < 8; i++) {
    await p.keyboard.press("Tab");
    seen.push(await p.evaluate(() => document.activeElement?.getAttribute("data-mf-toggle") != null ? "toggle" : document.activeElement?.getAttribute("data-mf-replay") != null ? "restart" : document.activeElement?.getAttribute("data-mf-scrub") != null ? "scrub" : document.activeElement?.tagName));
  }
  await p.focus("[data-mf-scrub]");
  await p.keyboard.press("ArrowRight");
  await p.keyboard.press("PageUp");
  report.keyboard = { tabOrder: seen.join(" > "), scrubAfterKeys: await p.evaluate(() => document.querySelector("[data-mf-scrub]").value) };
  await p.focus("[data-mf-toggle]");
  await p.keyboard.press("Enter");
  await p.waitForTimeout(600);
  report.keyboard.playing = await p.evaluate((id) => document.getElementById(id).dataset.state, slug);
  await p.keyboard.press("Enter");
  report.keyboard.paused = await p.evaluate((id) => document.getElementById(id).dataset.state, slug);
  await c.close();
}
console.log(JSON.stringify(report, null, 2));
console.log(errors.length ? "errors: " + errors.join(" | ") : "no console errors");
await b.close();
