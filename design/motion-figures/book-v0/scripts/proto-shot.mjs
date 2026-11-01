import { chromium } from "playwright";
const out = process.argv[2]; const U = "http://127.0.0.1:5241/four-moves-book.html";
const b = await chromium.launch();
async function ctx(opts) { const c = await b.newContext(opts); const p = await c.newPage(); p.on("console", m => { if (m.type() === "error") console.log("console error:", m.text()); }); p.on("pageerror", e => console.log("pageerror", e.message)); return [c, p]; }
const overflow = (p) => p.evaluate(() => [...document.querySelectorAll(".face[data-page]")].map(f => ({ p: f.dataset.page, over: f.scrollHeight - f.clientHeight })).filter(x => x.over > 1));
const book = (p) => p.locator(".moves");
// desktop
{
  const [c, p] = await ctx({ viewport: { width: 1440, height: 900 } });
  await p.goto(U); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(400);
  await p.evaluate(() => document.querySelector(".moves").scrollIntoView()); await p.waitForTimeout(200);
  await p.screenshot({ path: `${out}/desktop-1440-cover.png` });
  console.log("overflow desk", JSON.stringify(await overflow(p)));
  await p.click("[data-next]"); await p.waitForTimeout(1100);
  await p.screenshot({ path: `${out}/desktop-1440-contents.png` });
  await p.click("[data-next]"); await p.waitForTimeout(430);
  await p.screenshot({ path: `${out}/desktop-1440-midturn.png` });
  await p.waitForTimeout(800);
  await p.screenshot({ path: `${out}/desktop-1440-move1.png` });
  const st = await p.evaluate(() => ({ live: document.querySelector("[data-live]").textContent, spread: document.querySelector("[data-book]").dataset.spread, inertCount: document.querySelectorAll(".face[inert]").length, hash: location.hash }));
  console.log("state after 2 next", JSON.stringify(st));
  await p.keyboard.press("Tab"); // focus into section
  await p.focus("[data-next]"); await p.keyboard.press("ArrowRight"); await p.waitForTimeout(1100);
  await p.screenshot({ path: `${out}/desktop-1440-move2.png` });
  await p.click('.jump [data-go="4"]'); await p.waitForTimeout(1200);
  await p.screenshot({ path: `${out}/desktop-1440-move3.png` });
  await p.click('.jump [data-go="5"]'); await p.waitForTimeout(1200);
  await p.screenshot({ path: `${out}/desktop-1440-move4.png` });
  await p.click("[data-next]"); await p.waitForTimeout(1200);
  await p.screenshot({ path: `${out}/desktop-1440-close.png` });
  // contents jump back with focus
  await p.click('.jump [data-go="2"]'); await p.waitForTimeout(1300);
  console.log("live after jump", await p.evaluate(() => document.querySelector("[data-live]").textContent));
  await p.click("[data-flat]"); await p.waitForTimeout(300);
  await p.screenshot({ path: `${out}/desktop-1440-flat.png` });
  await c.close();
}
// phone
{
  const [c, p] = await ctx({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  await p.goto(U); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(400);
  await p.evaluate(() => document.querySelector(".moves").scrollIntoView()); await p.waitForTimeout(200);
  await p.screenshot({ path: `${out}/phone-390-cover.png` });
  const hs = await p.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
  console.log("phone horiz", JSON.stringify(hs));
  await p.click("[data-next]"); await p.waitForTimeout(300); await p.click("[data-next]"); await p.waitForTimeout(500);
  await p.screenshot({ path: `${out}/phone-390-move1.png` });
  await p.screenshot({ path: `${out}/phone-390-move1-full.png`, fullPage: true });
  console.log("phone visible faces", await p.evaluate(() => [...document.querySelectorAll(".face")].filter(f => getComputedStyle(f).display !== "none").map(f => f.dataset.page).join(",")));
  await c.close();
}
// reduced motion
{
  const [c, p] = await ctx({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  await p.goto(U + "?spread=2"); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(400);
  await p.evaluate(() => document.querySelector(".moves").scrollIntoView()); await p.waitForTimeout(200);
  await p.click("[data-next]"); await p.waitForTimeout(40);
  const r = await p.evaluate(() => { const l = document.querySelector('.leaf[data-leaf="2"]'); return { dur: getComputedStyle(l).transitionDuration, turned: l.classList.contains("turned"), transform: getComputedStyle(l).transform.slice(0, 40) }; });
  console.log("reduced", JSON.stringify(r));
  await p.waitForTimeout(250);
  await p.screenshot({ path: `${out}/reduced-1440-move2-instant.png` });
  await c.close();
}
// no JS
{
  const [c, p] = await ctx({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false });
  await p.goto(U); await p.waitForTimeout(500);
  await p.evaluate?.(() => 0).catch(() => {});
  await p.screenshot({ path: `${out}/nojs-1440.png` });
  await c.close();
}
await b.close();
