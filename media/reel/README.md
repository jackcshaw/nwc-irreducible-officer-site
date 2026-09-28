# Intro reel media

The site cut of the 15-second Judgment Lab reel, played by `scripts/reel-client.js`.

| File | What it is |
| --- | --- |
| `judgment-lab-reel.mp4` | H.264 High / AAC, 1920×1080, 60 fps. Served first. |
| `judgment-lab-reel.webm` | VP9 / Opus fallback for browsers without H.264. |
| `poster.jpg` | The reel's first frame, shown until playback starts. |

The site cut is rendered without the paper-grain overlay, so its background is exactly the page's paper (`#f6f1e8`). That lets the film dissolve into the page at the handoff.

## Source

The reel is a Remotion project in `judgment-lab-showreel` (a sibling folder, local git). Picture and sound share one clock, `src/timeline.json`.

If the reel's last frame changes, also update `PERIOD` in `scripts/reel-client.js`. It holds the closing red period's centre and diameter as fractions of the 1920×1080 frame; today that is (1421.5, 528.6) px with a 21.3 px diameter.

## Updating the reel

From the showreel project:

```bash
npx remotion render Reel out/judgment-lab-reel-site-master.mp4 --codec=h264 --crf=14 \
  --pixel-format=yuv420p --color-space=bt709 \
  --props='{"motionBlur":true,"samples":8,"grain":false,"sound":true}'

ff() { npx remotion ffmpeg -v error -y "$@"; }
ff -i out/judgment-lab-reel-site-master.mp4 -c:v libx264 -crf 23 -preset slower -pix_fmt yuv420p \
  -color_range tv -colorspace bt709 -color_primaries bt709 -color_trc bt709 \
  -c:a aac -b:a 128k -movflags +faststart judgment-lab-reel.mp4
ff -i out/judgment-lab-reel-site-master.mp4 -c:v libvpx-vp9 -crf 37 -b:v 0 -row-mt 1 -deadline good \
  -cpu-used 2 -pix_fmt yuv420p -pass 1 -passlogfile vp9 -an -f null /dev/null
ff -i out/judgment-lab-reel-site-master.mp4 -c:v libvpx-vp9 -crf 37 -b:v 0 -row-mt 1 -deadline good \
  -cpu-used 2 -pix_fmt yuv420p -pass 2 -passlogfile vp9 -c:a libopus -b:a 96k judgment-lab-reel.webm
ff -ss 0 -i out/judgment-lab-reel-site-master.mp4 -frames:v 1 -q:v 3 poster.jpg
```

Copy the three files here and rebuild. The content version changes on its own.
