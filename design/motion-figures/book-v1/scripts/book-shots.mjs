// Screenshots and mechanical checks for book v1.
// usage: node book-v1/scripts/book-shots.mjs [port]   (serve motion-figures/ first:
//        python3 -m http.server 5311 --bind 127.0.0.1)
// Writes book-v1/shots/*.png and prints a JSON report.
import { chromium } from "/Users/jackcshaw-2/dev/comprendo-clients/nwc-irreducible-officer-site-motion/node_modules/playwright/index.mjs";
import { readFileSync } from "node:fs";

const port = process.argv[2] || 5311;
const ROOT = `http://127.0.0.1:${port}`;
const U = `${ROOT}/book-v1/four-moves-book.html`;
const out = new URL("../shots/", import.meta.url).pathname;
const essay = readFileSync(new URL("../../../../content/the-irreducible-officer.md", import.meta.url), "utf8");
const b = await chromium.launch();
const report = { errors: [] };
const norm = (s) => s.replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, " ").trim();

async function open(url, opts = {}) {
  const c = await b.newContext({ viewport: { width: 1440, height: 900 }, ...opts });
  const p = await c.newPage();
  p.on("console", (m) => m.type() === "error" && report.errors.push(`${url}: ${m.text()}`));
  p.on("pageerror", (e) => report.errors.push(`${url}: ${e.message}`));
  await p.goto(url);
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(300);
  return [c, p];
}
const toBook = (p) => p.evaluate(() => {
  const r = document.querySelector(".book").getBoundingClientRect();
  scrollTo(0, scrollY + r.top - 24);
});
const overflow = (p) => p.evaluate(() => [...document.querySelectorAll(".face[data-page]")]
  .map((f) => ({ page: f.dataset.page, over: f.scrollHeight - f.clientHeight })).filter((x) => x.over > 1));
const state = (p) => p.evaluate(() => ({
  spread: +document.querySelector("[data-book]").dataset.spread,
  where: document.querySelector("[data-where]").textContent,
  live: document.querySelector("[data-live]").textContent,
  focus: document.activeElement && (document.activeElement.dataset.heading ?? document.activeElement.textContent.trim().slice(0, 40)),
}));
const spreadOf = (p, slug) => p.evaluate((s) => [...document.querySelectorAll(".contents [data-go]")]
  .find((b) => b.textContent.startsWith(s))?.dataset.go, slug);

// ---- desktop 1440 ---------------------------------------------------------------
{
  const [c, p] = await open(U);
  await toBook(p);
  await p.screenshot({ path: `${out}desktop-1440-cover.png` });
  report.spreads = await p.evaluate(() => document.querySelectorAll(".leaf").length);
  report.overflow1440 = await overflow(p);

  // keyboard: Tab to Next, Enter, then arrow keys
  await p.focus("[data-next]");
  await p.keyboard.press("Enter");
  await p.waitForTimeout(1100);
  await p.screenshot({ path: `${out}desktop-1440-contents.png` });
  await p.keyboard.press("ArrowRight");
  await p.waitForTimeout(450);
  await p.screenshot({ path: `${out}desktop-1440-midturn.png` });
  await p.waitForTimeout(800);
  report.afterArrow = await state(p);
  await p.screenshot({ path: `${out}desktop-1440-move1.png` });

  // contents jump to a figure spread focuses its heading
  await p.keyboard.press("ArrowLeft");
  await p.waitForTimeout(1100);
  const fs = await spreadOf(p, "Fluency substitution");
  await p.click(`.contents [data-go="${fs}"]`);
  await p.waitForTimeout(1900);
  report.contentsJump = await state(p);
  report.inertOutsideSpread = await p.evaluate(() => [...document.querySelectorAll(".face[data-page]")].filter((f) => !f.classList.contains("is-current") && !f.inert).length);
  report.hashAfterTurns = await p.evaluate(() => location.hash);
  report.urlAfterTurns = await p.evaluate(() => location.search);

  // a done figure spread, closed, then playing over the book
  await p.click('.jump [data-go]:nth-child(1)');
  await p.waitForTimeout(1300);
  await p.click("[data-next]");
  await p.waitForTimeout(1200);
  await p.screenshot({ path: `${out}desktop-1440-figure-spread.png` });
  report.figureSpread = await state(p);
  await p.click('.face.is-current button.play');
  await p.waitForFunction(() => document.querySelector("[data-dialog]").classList.contains("is-ready"));
  const frame = p.frameLocator("[data-dialog-frame]");
  const fr = p.frames().find((f) => f.url().includes("/figures/frame-capture/"));
  await fr.waitForFunction(() => window.__motionFigures && window.__motionFigures["frame-capture"]);
  await p.waitForTimeout(1500);
  report.player = await fr.evaluate(() => {
    const root = document.getElementById("frame-capture");
    const svg = root.querySelector("svg").getBoundingClientRect();
    const ctrl = root.querySelector(".mf-controls").getBoundingClientRect();
    return { state: root.dataset.state, focused: document.activeElement?.dataset?.mfToggle !== undefined, svgW: Math.round(svg.width), svgH: Math.round(svg.height), controlsBottom: Math.round(ctrl.bottom), viewport: innerHeight, narrow: root.classList.contains("is-narrow") };
  });
  // jump to a mid-figure moment and let it play on, so the shot shows the figure moving
  await fr.evaluate(() => window.__motionFigures["frame-capture"].seek(43));
  await frame.locator("[data-mf-toggle]").click();
  await p.waitForTimeout(1600);
  report.playingState = await fr.evaluate(() => document.getElementById("frame-capture").dataset.state);
  await p.screenshot({ path: `${out}desktop-1440-figure-playing.png` });
  // keyboard inside the figure: arrow on the scrubber must not turn the book
  await frame.locator("[data-mf-scrub]").focus();
  await p.keyboard.press("ArrowRight");
  report.spreadAfterArrowInFigure = (await state(p)).spread;
  await p.keyboard.press("Escape");
  await p.waitForTimeout(300);
  report.afterEscape = { open: await p.evaluate(() => document.querySelector("[data-dialog]").open), focus: await p.evaluate(() => document.activeElement.textContent.trim()) };

  // an in-progress spread
  const id = await spreadOf(p, "Invisible delegation");
  await p.click('.jump [data-go]:nth-child(1)');
  await p.waitForTimeout(1200);
  await p.evaluate((k) => document.querySelector(`.contents [data-go="${k}"]`).click(), id);
  await p.waitForTimeout(1300);
  await p.screenshot({ path: `${out}desktop-1440-in-progress.png` });
  const rl = await spreadOf(p, "Responsibility laundering");
  await p.evaluate((k) => document.querySelector(`.contents [data-go="${k}"]`).click(), rl);
  await p.waitForTimeout(1600);
  await p.screenshot({ path: `${out}desktop-1440-in-progress-no-poster.png` });
  await p.click("[data-next]"); await p.waitForTimeout(1100);
  await p.click("[data-next]"); await p.waitForTimeout(1100);
  await p.screenshot({ path: `${out}desktop-1440-close.png` });

  // the flat view: every page, text and links
  await p.click("[data-flat]");
  await p.waitForTimeout(300);
  report.flat = await p.evaluate(() => {
    const faces = [...document.querySelectorAll(".face[data-page]")];
    return {
      faces: faces.length,
      hidden: faces.filter((f) => getComputedStyle(f).display === "none").length,
      inert: faces.filter((f) => f.inert).length,
      figureLinks: document.querySelectorAll('.face a[href*="/figures/"]').length,
      checks: document.querySelectorAll(".fm-page .check").length,
      quotes: document.querySelectorAll(".fm-page blockquote").length,
      overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  });
  await p.evaluate(() => document.querySelector('[data-key="fig-frame-capture"]').scrollIntoView());
  await p.evaluate(() => scrollBy(0, -20));
  await p.screenshot({ path: `${out}desktop-1440-flat.png` });
  await p.screenshot({ path: `${out}desktop-1440-flat-full.png`, fullPage: true });

  // drift: the book's checks against each figure page, and its quotes against the essay
  report.drift = [];
  const copy = await p.evaluate(() => window.BOOK_FIGURE_COPY);
  for (const [slug, cp] of Object.entries(copy)) {
    if (!norm(essay).includes(norm(cp.quote))) report.drift.push(`${slug}: quote not found in the essay`);
    const res = await p.request.get(`${ROOT}/figures/${slug}/index.html`);
    if (!res.ok()) { report.drift.push(`${slug}: no page yet`); continue; }
    const html = await res.text();
    const checks = [...html.matchAll(/<p class="fig-check">([^<]*)<\/p>/g)].map((m) => norm(m[1].replace(/&rsquo;/g, "'")));
    if (!checks.length) { report.drift.push(`${slug}: page has no checks yet`); continue; }
    if (checks[0] !== norm(cp.check)) report.drift.push(`${slug}: check differs: page "${checks[0]}"`);
    if (checks[1] !== norm(cp.follow)) report.drift.push(`${slug}: follow-up differs: page "${checks[1]}"`);
  }
  await c.close();
}

// ---- fit at other desktop widths -------------------------------------------------
for (const width of [1280, 1101]) {
  const [c, p] = await open(U, { viewport: { width, height: 800 } });
  report[`overflow${width}`] = await overflow(p);
  await c.close();
}

// ---- reduced motion: instant turns ----------------------------------------------
{
  const [c, p] = await open(`${U}?spread=3`, { reducedMotion: "reduce" });
  await toBook(p);
  await p.click("[data-next]");
  await p.waitForTimeout(30);
  report.reduced = await p.evaluate(() => {
    const leaf = document.querySelector('.leaf[data-leaf="3"]');
    return { duration: getComputedStyle(leaf).transitionDuration, turned: leaf.classList.contains("turned"), spread: +document.querySelector("[data-book]").dataset.spread };
  });
  await p.screenshot({ path: `${out}reduced-1440-instant.png` });
  // the figure inherits reduced motion: it opens on its final frame and doesn't play
  await p.click("[data-prev]");
  await p.click(".face.is-current button.play");
  await p.waitForFunction(() => document.querySelector("[data-dialog]").classList.contains("is-ready"));
  const fr = p.frames().find((f) => f.url().includes("/figures/"));
  await fr.waitForFunction(() => window.__motionFigures && Object.keys(window.__motionFigures).length);
  await p.waitForTimeout(800);
  report.reducedFigure = await fr.evaluate(() => { const r = document.querySelector(".mf"); return { reduced: r.classList.contains("is-reduced"), state: r.dataset.state || "idle", time: r.querySelector("[data-mf-time]").textContent }; });
  await c.close();
}

// ---- phone 390 -------------------------------------------------------------------
{
  const [c, p] = await open(U, { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  await toBook(p);
  await p.screenshot({ path: `${out}phone-390-cover.png` });
  const n = await p.evaluate(() => document.querySelectorAll(".leaf").length);
  report.phoneOverflowX = [];
  for (let k = 0; k < n; k++) {
    const ox = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    const shown = await p.evaluate(() => [...document.querySelectorAll(".face")].filter((f) => getComputedStyle(f).display !== "none").map((f) => f.dataset.page).join(","));
    if (ox > 0) report.phoneOverflowX.push({ spread: k, ox });
    if (k === 3) {
      report.phoneFigureShown = shown;
      await toBook(p);
      await p.screenshot({ path: `${out}phone-390-figure-spread.png` });
      await p.screenshot({ path: `${out}phone-390-figure-spread-full.png`, fullPage: true });
      await p.click(".face.is-current button.play");
      await p.waitForFunction(() => document.querySelector("[data-dialog]").classList.contains("is-ready"));
      await p.waitForTimeout(2500);
      await p.screenshot({ path: `${out}phone-390-figure-playing.png` });
      report.phoneDialogOverflowX = await p.frames().find((f) => f.url().includes("/figures/")).evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      await p.click("[data-dialog-close]");
      await p.waitForTimeout(200);
    }
    if (k === 2) { await toBook(p); await p.screenshot({ path: `${out}phone-390-move1.png` }); }
    await p.click("[data-next]");
    await p.waitForTimeout(150);
  }
  await p.click("[data-flat]");
  await p.waitForTimeout(200);
  report.phoneFlatOverflowX = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  await c.close();
}

await b.close();
console.log(JSON.stringify(report, null, 1));
