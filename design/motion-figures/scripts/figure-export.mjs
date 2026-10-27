// Render a motion figure's shot area (stage + caption band) frame by frame
// through its seek hook, then encode MP4, WebM and GIF previews.
// Adapted from concepts-v0/scripts/export-figure.mjs.
// usage: node figure-export.mjs <slug> [port] [fps]   (serve motion-figures/ first)
import { chromium } from "/Users/jackcshaw-2/dev/comprendo-clients/nwc-irreducible-officer-site-motion/node_modules/playwright/index.mjs";
import { mkdirSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";

const [slug, portArg, fpsArg] = process.argv.slice(2);
const fps = Number(fpsArg || 30);
const shots = new URL(`../figures/${slug}/shots/`, import.meta.url).pathname;
const tmp = `${shots}.frames/`;
rmSync(tmp, { recursive: true, force: true });
mkdirSync(tmp, { recursive: true });

const b = await chromium.launch();
const p = await (await b.newContext({ viewport: { width: 1280, height: 1000 }, deviceScaleFactor: 1 })).newPage();
await p.goto(`http://127.0.0.1:${portArg || 5291}/figures/${slug}/index.html?t=0`);
await p.evaluate(() => document.fonts.ready);
await p.waitForFunction((id) => window.__motionFigures?.[id], slug);
const duration = await p.evaluate((id) => window.__motionFigures[id].duration, slug);
const shot = p.locator("[data-mf-shot]");
await shot.scrollIntoViewIfNeeded();
const n = Math.round(duration * fps);
for (let i = 0; i <= n; i++) {
  await p.evaluate(([id, t]) => window.__motionFigures[id].seek(t), [slug, i / fps]);
  await shot.screenshot({ path: `${tmp}${String(i).padStart(5, "0")}.png` });
}
// Hold the final frame for three seconds.
for (let k = 1; k <= 3 * fps; k++) await shot.screenshot({ path: `${tmp}${String(n + k).padStart(5, "0")}.png` });
await b.close();

const D = "/Users/jackcshaw-2/dev/comprendo-clients/judgment-lab-showreel/node_modules/@remotion/compositor-darwin-arm64";
const ff = (args) => execFileSync(`${D}/ffmpeg`, ["-hide_banner", "-loglevel", "error", "-y", ...args], { env: { ...process.env, DYLD_LIBRARY_PATH: D } });
const even = "scale=trunc(iw/2)*2:trunc(ih/2)*2";
ff(["-framerate", String(fps), "-i", `${tmp}%05d.png`, "-vf", even, "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "20", "-movflags", "+faststart", `${shots}${slug}.mp4`]);
ff(["-framerate", String(fps), "-i", `${tmp}%05d.png`, "-vf", even, "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", "36", "-row-mt", "1", `${shots}${slug}.webm`]);
ff(["-framerate", String(fps), "-i", `${tmp}%05d.png`, "-vf", "scale=640:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=64[p];[b][p]paletteuse=dither=bayer:bayer_scale=4", "-r", "12", `${shots}${slug}.gif`]);
rmSync(tmp, { recursive: true, force: true });
console.log(`frames ${n + 1 + 3 * fps} at ${fps}fps -> ${slug}.mp4, ${slug}.webm, ${slug}.gif`);
