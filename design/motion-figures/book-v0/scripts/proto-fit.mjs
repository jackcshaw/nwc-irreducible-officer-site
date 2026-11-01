import { chromium } from "playwright";
const b = await chromium.launch();
for (const w of [1440, 1280, 1101, 1100, 1024]) {
  const c = await b.newContext({ viewport: { width: w, height: 900 } }); const p = await c.newPage();
  await p.goto("http://127.0.0.1:5241/four-moves-book.html"); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
  const r = await p.evaluate(() => ({ pageW: Math.round(document.querySelector(".face[data-page='4']").getBoundingClientRect().width), over: [...document.querySelectorAll(".face[data-page]")].map(f => [f.dataset.page, f.scrollHeight - f.clientHeight]).filter(x => x[1] > 1) }));
  console.log(w, JSON.stringify(r)); await c.close();
}
await b.close();
