# Uncalibrated reliance: final verification

October 28, 2026. Report only; no figure files changed.

**Method.** I served `design/motion-figures/` on 127.0.0.1:5233 and used Playwright Chromium from the site repo's `node_modules`. I held moments with `window.__motionFigures['uncalibrated-reliance'].seek(t)` at 1280×800, 1280×900 and 390×844. At 1280 the SVG stage renders at scale 1.06. At 390 the stacked text stage is active (SVG scale 0.37). I sampled the picture state every 0.1 s from 0 to 90.6 s at each size to measure still stretches. Caption timings come from `BEAT_AT`, `T` and `BEATS` in `uncalibrated-reliance.js`. The stills in `shots/` (written 07:55:11–21) are newer than the code (07:55:10). They match my renders.

## Results

| # | Item | Result |
|---|---|---|
| 1 | Harbor log unambiguous | **Pass** |
| 2 | Crux beat slow enough | **Pass** at 1280 (see the note on 390) |
| 3 | 390: picture and caption agree | **Pass** |
| 4 | About 90 s; captions at least words ÷ 3 + 1.5 s | **Pass** (see the note on beat 10) |
| – | Final frame shows the faculty check verbatim, with a follow-up line at the same size | **Pass** |
| – | Study numbers match the source spine | **Pass** |

### 1. Harbor log

- **1280** (`uncalibrated-reliance.js:111`, `shots/beat-06.png`): the callout is headed "OPEN TODAY" over "Docks 1, 3, 4". Set apart below it, in muted italic, is "✕ Dock 2: closed". The survey callout matches it: "CAPACITY / 4 docks, 5 each / (survey, last year)". The reading note in the second brief says "Log: dock 2 closed for repairs." In beat 7 the underline sits under "Docks 1, 3, 4" (y 92), above the closed-dock line. No layout reads as "dock 2 reopens today".
- **390** (`uncalibrated-reliance.js:469–472`, `shots/player-390-final.png`): "Harbor log · open today: docks 1, 3, 4." sits over a separate line, "✕ Dock 2: closed for repairs." In beat 7 only "docks 1, 3, 4." is underlined.

### 2. Crux beat (beat 6, 37.6–48.6 s, 11.0 s)

- The survey note is fully shown at 40.1 s and the log note at 41.7 s. Part 2 doesn't move until 43.2 s, a still hold of 1.5 s. "15" starts to fade in at 44.2 s, so the log note has been readable for 2.5 s by then (2.9 s from the log line's first appearance).
- The note is set at 16 units, about 17 px at 1280. The port callouts above it are 13 units. The note sits in the empty middle of the second brief under "PORT REPORTS" (`:186–188`).
- Movements come one after another with no overlap: dot to survey, then survey opens, then note line 1, then dot to log, then log opens, then note line 2, then hold, then Part 2 slides in with the dot riding it, then strike 20, insert 15, strike 4, insert 3 open, mark, dot home. Nothing else in the scene moves from 37.6 to 48.6 s.
- *Note on 390:* the phone stage has no enlarged reading note. The survey and log lines stay 13 px in the callout box at the top. The hold is still there: the log appears at 40.7–41.3 s and both corrections swap in together at 44.2 s. The storyboard only specifies the large note for the SVG.

### 3. 390 × 844

- **Student marker:** a red "● Student" marker appears in the task card at 2.7–3.0 s, inside beat 1 (`:459`, `:548`). From 0 to 2.7 s only the task card fades in, which matches the desktop dot's timing.
- **Pointing:** from 72.6 to 76.1 s the Part 1 boxes in both briefs carry a 1.5 px navy outline. From 76.1 s to the end the outline is on the Part 2 boxes (`:581–583`). Both are visible in renders at t = 75 and 77.
- **Stillness:** within a single caption, the longest still stretches at 390 are:
  - 50.8–54.3 s (3.5 s): beat 7, between the CAPACITY tag and the frontier. Desktop has the same stretch (3.4 s).
  - 62.9–68.9 s (6.0 s): the study panel's reading hold. It is identical on desktop.
  - The final beat: there the caption and the follow-up line carry the change.

  Nothing like the 8 s phone freeze reported in figure read 2 remains. One minor gap: the phone stage has no counterpart to the desktop's 56.3–56.9 s pulse where the two answer cards pulse together.

### 4. Running time and caption budget

`T.end` = 90.6 s across 10 beats. The page setup says "about a minute and a half". The mp4 export runs 93.6 s, including its tail hold.

| Beat | On screen (s) | Words | Needed (s) |
|---|---|---|---|
| 1 | 0–8.6 (8.6) | 12 | 5.50 |
| 2 | 8.6–15.6 (7.0) | 6 | 3.50 |
| 3 | 15.6–23.1 (7.5) | 12 | 5.50 |
| 4 | 23.1–30.3 (7.2) | 10 | 4.83 |
| 5 | 30.3–37.6 (7.3) | 11 | 5.17 |
| 6 | 37.6–48.6 (11.0) | 12 | 5.50 |
| 7 | 48.6–58.4 (9.8) | 17 | 7.17 |
| 8 | 58.4–67.9 (9.5) | 16 | 6.83 |
| 9 | 67.9–83.9 (16.0) | 14 | 6.17 |
| 10 (check) | 84.1–90.6, then rests (6.5+) | 10 | 4.83 |
| 10 (follow-up) | 87.2–90.6, then rests (3.4+) | 10 | 4.83 |

Every caption meets the budget. *Note on beat 10:* the follow-up line meets it only because the runtime rests on the final frame after 90.6 s (`motion.js` tick stops at `duration`; it doesn't loop). Inside the clock the follow-up gets 3.4 s. The mp4 tail gives it about 6.4 s.

### Final frame

At 90.6 s the caption shows "FACULTY CHECK", then "What evidence justified relying on the system here?" verbatim, then "Point to each part. Was the evidence about that part?". The follow-up uses class `mf-follow is-equal`. Both lines are italic: 30 px at 1280 and 20 px at 390. Nothing is clipped: at 390 the caption's scrollHeight and clientHeight are both 165, and the follow-up ends 27 px above the band's bottom.

### Study numbers

`sources/source-spine.md:62` gives "about 84.5%", "60% and 70%", "19 percentage points less likely to produce correct solutions" and "regardless of the correctness of their answer". These match:

- the SVG panel (`:245`, `:251`): "about 84.5%", "60%", "70%", "Rated higher in quality / than without AI, / regardless of correctness";
- the phone overlay (`:533–534`);
- the beat 8 "On screen" line;
- the screen-reader summary;
- the page's Evidence section, which quotes both phrases verbatim. "19 percentage points" appears only in this section, not in the picture.

## Nits (not failures)

- **Timer:** `index.html` hard-codes `0:00 / 1:31`, and storyboard line 58 says the timer reads 1:31. The runtime rewrites it as `1:30`, because `fmt` floors 90.6. Visitors see 1:30.
- **Stale storyboard rows:** `storyboard.md` lines 148 and 155 still describe the round 4 harbor log: "Dock 2: closed" / "for repairs.", and "OPEN TODAY" as a third line under it. That contradicts the round 5 notes (line 54) and the built figure. A rebuild from that table would bring back the "reopens today" misreading.
