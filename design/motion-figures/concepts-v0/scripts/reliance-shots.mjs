// Walk the reliance interactive at desktop, reduced motion and phone; save stills.
import { chromium } from "/Users/jackcshaw-2/dev/comprendo-clients/nwc-irreducible-officer-site/node_modules/playwright/index.mjs";
const U = "http://127.0.0.1:5263/reliance.html";
const out = new URL("../shots/", import.meta.url).pathname;
const b = await chromium.launch();
const errors = [];
async function open(opts = {}, url = U) {
  const c = await b.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 2, ...opts });
  const p = await c.newPage();
  p.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  p.on("pageerror", (e) => errors.push(e.message));
  await p.goto(url); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(200);
  return [c, p];
}
const sec = (p) => p.locator("#reliance");
async function walk(p, prefix, { a = "rely", b: bb = "rely", q = "without", wait = true } = {}) {
  await sec(p).scrollIntoViewIfNeeded();
  await sec(p).screenshot({ path: `${out}${prefix}-1-start.png` });
  await p.check(`input[name=call-a][value=${a}]`); await p.check(`input[name=call-b][value=${bb}]`);
  await p.waitForTimeout(350);
  await sec(p).screenshot({ path: `${out}${prefix}-2-calls.png` });
  await p.click("[data-reveal]");
  if (wait) { await p.waitForTimeout(650); await p.locator("[data-field]").screenshot({ path: `${out}${prefix}-3-line-drawing.png` }); await p.waitForTimeout(2600); }
  else await p.waitForTimeout(60);
  const st = await p.evaluate(() => {
    const path = document.querySelector(".frontier path");
    const cs = getComputedStyle(path);
    return { dashoffset: cs.strokeDashoffset, transition: cs.transitionDuration, qualityVisible: !document.querySelector('[data-stage=quality]').hidden, resultRows: getComputedStyle(document.querySelector('.result')).gridTemplateRows };
  });
  console.log(prefix, "after reveal", JSON.stringify(st));
  await p.locator("[data-field]").screenshot({ path: `${out}${prefix}-4-revealed.png` });
  await p.check(`input[name=call-q][value=${q}]`);
  if (wait) { await p.waitForTimeout(500); await p.locator("[data-q-answer]").screenshot({ path: `${out}${prefix}-4b-quality-mid.png` }); await p.waitForTimeout(1500); } else await p.waitForTimeout(60);
  await sec(p).screenshot({ path: `${out}${prefix}-5-account.png` });
  const live = await p.locator("[data-live]").textContent();
  console.log(prefix, "live:", live);
}
{ const [c, p] = await open(); await walk(p, "rel-desktop"); await c.close(); }
{ const [c, p] = await open({ reducedMotion: "reduce" }); await walk(p, "rel-reduced", { a: "check", b: "check", q: "with", wait: false }); await c.close(); }
{ const [c, p] = await open({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3 }, U + "?reduced");
  await walk(p, "rel-phone", { wait: false });
  console.log("phone overflow px", await p.evaluate(() => document.documentElement.scrollWidth - innerWidth));
  await c.close(); }
console.log(errors.length ? "errors: " + errors.join(" | ") : "no console errors");
await b.close();
