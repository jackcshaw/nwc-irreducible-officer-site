import { chromium } from "playwright";
const out = process.argv[2];
const URL = "https://iamtechartist.github.io/every-joule-lesson1/";
const b = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
async function run(name, opts, steps) {
  const ctx = await b.newContext(opts);
  const p = await ctx.newPage();
  p.on("console", m => { if (m.type() === "error") console.log(name, "console error:", m.text().slice(0, 200)); });
  await p.goto(URL, { waitUntil: "networkidle" });
  await p.waitForTimeout(6000);
  await steps(p, name);
  await ctx.close();
}
await run("desk", { viewport: { width: 1440, height: 900 } }, async (p, n) => {
  await p.screenshot({ path: `${out}/${n}-0.png` });
  const info = await p.evaluate(() => ({ bodyClass: document.body.className, ui: document.querySelector("#ui").innerText.slice(0, 1500), a11y: document.querySelector("#a11y").innerText.slice(0, 4000), live: document.querySelector("#a11yLive").innerText }));
  console.log(JSON.stringify(info, null, 1));
  // click canvas to focus, then turn pages
  await p.mouse.click(720, 450);
  await p.waitForTimeout(1500);
  await p.screenshot({ path: `${out}/${n}-1-click.png` });
  for (let i = 2; i < 6; i++) {
    await p.keyboard.press("ArrowRight");
    await p.waitForTimeout(350);
    if (i === 2) await p.screenshot({ path: `${out}/${n}-${i}-midturn.png` });
    await p.waitForTimeout(2500);
    await p.screenshot({ path: `${out}/${n}-${i}.png` });
    console.log("live", i, await p.evaluate(() => document.querySelector("#a11yLive").innerText));
  }
});
await run("phone", { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }, async (p, n) => {
  await p.screenshot({ path: `${out}/${n}-0.png` });
  await p.mouse.click(195, 420); await p.waitForTimeout(1500);
  await p.screenshot({ path: `${out}/${n}-1.png` });
  await p.keyboard.press("ArrowRight"); await p.waitForTimeout(3000);
  await p.screenshot({ path: `${out}/${n}-2.png` });
});
await run("reduced", { viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" }, async (p, n) => {
  await p.screenshot({ path: `${out}/${n}-0.png` });
  console.log("reduced bodyClass", await p.evaluate(() => document.body.className));
  await p.mouse.click(720, 450); await p.waitForTimeout(800);
  await p.keyboard.press("ArrowRight"); await p.waitForTimeout(300);
  await p.screenshot({ path: `${out}/${n}-1-300ms.png` });
});
await b.close();
