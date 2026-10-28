// Stills for an interactive figure's branches: for each preset of the reader's calls
// (passed as ?calls=…), a still at chosen beats' settled moments and the final frame;
// plus each question with its controls open, and a 390px final still.
// usage: node figure-branches.mjs <slug> [port]   (serve motion-figures/ first)
// The presets live in figures/<slug>/branches.json:
//   {"branches": {"name": "g1:a,g2:rely", …}, "beats": [7, 9], "gates": [0, 1],
//    "gateSteps": {"1": ["selector to click", …]}}
import { chromium } from "/Users/jackcshaw-2/dev/comprendo-clients/nwc-irreducible-officer-site-motion/node_modules/playwright/index.mjs";
import { mkdirSync, readFileSync } from "node:fs";

const [slug, portArg] = process.argv.slice(2);
const base = `http://127.0.0.1:${portArg || 5291}/figures/${slug}/index.html`;
const dir = new URL(`../figures/${slug}/`, import.meta.url).pathname;
const out = `${dir}shots/`;
mkdirSync(out, { recursive: true });
const cfg = JSON.parse(readFileSync(`${dir}branches.json`, "utf8"));
const b = await chromium.launch();
const errors = [];
const made = [];

async function open(query, opts = {}) {
  const c = await b.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2, ...opts });
  const p = await c.newPage();
  p.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  p.on("pageerror", (e) => errors.push(e.message));
  await p.goto(`${base}?${query}`);
  await p.evaluate(() => document.fonts.ready);
  await p.waitForFunction((id) => window.__motionFigures?.[id], slug);
  await p.waitForTimeout(200);
  return [c, p];
}
const pad = (i) => String(i).padStart(2, "0");

// Each branch: chosen beats settled, then the final frame.
for (const [name, calls] of Object.entries(cfg.branches)) {
  const [c, p] = await open(`t=0&calls=${calls}`);
  const shot = p.locator("[data-mf-shot]");
  for (const beat of cfg.beats) {
    await p.evaluate(([id, i]) => { const f = window.__motionFigures[id]; f.seek(f.settle(i)); }, [slug, beat - 1]);
    await p.waitForTimeout(60);
    const file = `branch-${name}-beat-${pad(beat)}.png`;
    await shot.screenshot({ path: out + file });
    made.push(file);
  }
  await p.evaluate((id) => { const f = window.__motionFigures[id]; f.seek(f.duration); }, slug);
  await p.waitForTimeout(60);
  await shot.screenshot({ path: `${out}branch-${name}-final.png` });
  made.push(`branch-${name}-final.png`);
  await c.close();
}
// Each question with its controls open (as a reader sees it when the figure waits),
// at 1440 and at 390 (the stacked stage, shot area and the whole player).
for (const g of cfg.gates) {
  for (const [w, h, dsf, suffix] of [[1440, 1000, 2, ""], [390, 844, 3, "-390"]]) {
    // Reach the question the way a reader does (no ?t= test hook, so locks apply): the
    // optional steps in branches.json answer the earlier questions first.
    const [c, p] = await open("", { viewport: { width: w, height: h }, deviceScaleFactor: dsf });
    for (const sel of (cfg.gateSteps || {})[g] || []) { await p.locator(sel).click(); await p.waitForTimeout(150); }
    await p.evaluate(([id, g]) => window.__motionFigures[id].openGate(g), [slug, g]);
    await p.waitForTimeout(150);
    const file = `gate-${g + 1}-open${suffix}.png`;
    await p.locator("[data-mf-shot]").screenshot({ path: out + file });
    made.push(file);
    if (suffix) {
      const pf = `player-390-gate-${g + 1}.png`;
      await p.locator("figure").screenshot({ path: out + pf });
      made.push(pf);
    }
    await c.close();
  }
}
// The final frame at 390px (the stacked stage), and the player as a phone sees it.
{
  const [c, p] = await open("t=0", { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3 });
  await p.evaluate((id) => { const f = window.__motionFigures[id]; f.seek(f.duration); }, slug);
  await p.waitForTimeout(120);
  await p.locator("[data-mf-shot]").screenshot({ path: `${out}final-390.png` });
  await p.locator("figure").screenshot({ path: `${out}player-390-final.png` });
  made.push("final-390.png", "player-390-final.png");
  await c.close();
}
console.log(made.join("\n"));
console.log(errors.length ? "errors: " + errors.join(" | ") : "no console errors");
await b.close();
