// Stills of a motion figure at fixed times (?t=), plus reduced-motion and phone views.
// usage: node stills.mjs <page.html> <figure-selector> <prefix> <t1,t2,...>
import { chromium } from "/Users/jackcshaw-2/dev/comprendo-clients/nwc-irreducible-officer-site/node_modules/playwright/index.mjs";
const [page, sel, prefix, times] = process.argv.slice(2);
const base = "http://127.0.0.1:5263/";
const out = new URL("../shots/", import.meta.url).pathname;
const b = await chromium.launch();
const errors = [];
async function open(url, opts = {}) {
  const c = await b.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 2, ...opts });
  const p = await c.newPage();
  p.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  p.on("pageerror", (e) => errors.push(e.message));
  await p.goto(url); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
  return [c, p];
}
for (const t of times.split(",")) {
  const [c, p] = await open(`${base}${page}?t=${t}`);
  await p.locator(sel).screenshot({ path: `${out}${prefix}-t${t}.png` });
  await c.close();
}
// Reduced motion via the media feature (no URL flag): must show the final frame at once.
{
  const [c, p] = await open(`${base}${page}`, { reducedMotion: "reduce" });
  const state = await p.evaluate((s) => ({ reduced: document.querySelector(s).classList.contains("is-reduced"), current: document.querySelector(`${s} [aria-current]`)?.textContent }), sel);
  console.log("reduced-motion state", JSON.stringify(state));
  await p.locator(sel).screenshot({ path: `${out}${prefix}-reduced.png` });
  await c.close();
}
// Phone width, final frame.
{
  const [c, p] = await open(`${base}${page}?reduced`, { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3 });
  const scroll = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  console.log("phone horizontal overflow px", scroll);
  await p.locator(sel).screenshot({ path: `${out}${prefix}-phone-390.png` });
  await c.close();
}
console.log(errors.length ? "errors: " + errors.join(" | ") : "no console errors");
await b.close();
