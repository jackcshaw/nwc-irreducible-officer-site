// Render a motion figure's shot area (stage + caption band) frame by frame
// through its seek hook, then encode MP4, WebM and GIF previews.
// Adapted from concepts-v0/scripts/export-figure.mjs.
// usage: node figure-export.mjs <slug> [port] [fps] [--edition=id] [--cast=id]   (serve motion-figures/ first)
// --edition=id loads ?edition=id and writes shots/<slug>-<id>.mp4/.webm/.gif.
// --cast=id adds ?cast=id and writes shots/<slug>-<edition>-<cast>.mp4/.webm/.gif.
import { chromium } from "/Users/jackcshaw-2/dev/comprendo-clients/nwc-irreducible-officer-site-motion/node_modules/playwright/index.mjs";
import { mkdirSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";

const argv = process.argv.slice(2);
const edition = (argv.find((a) => a.startsWith("--edition=")) || "").split("=")[1] || "";
const cast = (argv.find((a) => a.startsWith("--cast=")) || "").split("=")[1] || "";
const [slug, portArg, fpsArg] = argv.filter((a) => !a.startsWith("--"));
const name = [slug, edition, cast].filter(Boolean).join("-");
const fps = Number(fpsArg || 30);
const shots = new URL(`../figures/${slug}/shots/`, import.meta.url).pathname;
const tmp = `${shots}.frames/`;
rmSync(tmp, { recursive: true, force: true });
mkdirSync(tmp, { recursive: true });

const b = await chromium.launch();
const p = await (await b.newContext({ viewport: { width: 1280, height: 1000 }, deviceScaleFactor: 1 })).newPage();
await p.goto(`http://127.0.0.1:${portArg || 5291}/figures/${slug}/index.html?${edition ? `edition=${edition}&` : ""}${cast ? `cast=${cast}&` : ""}t=0`);
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
ff(["-framerate", String(fps), "-i", `${tmp}%05d.png`, "-vf", even, "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "20", "-movflags", "+faststart", `${shots}${name}.mp4`]);
ff(["-framerate", String(fps), "-i", `${tmp}%05d.png`, "-vf", even, "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", "36", "-row-mt", "1", `${shots}${name}.webm`]);
ff(["-framerate", String(fps), "-i", `${tmp}%05d.png`, "-vf", "scale=640:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=64[p];[b][p]paletteuse=dither=bayer:bayer_scale=4", "-r", "12", `${shots}${name}.gif`]);
rmSync(tmp, { recursive: true, force: true });
console.log(`frames ${n + 1 + 3 * fps} at ${fps}fps -> ${name}.mp4, ${name}.webm, ${name}.gif`);
