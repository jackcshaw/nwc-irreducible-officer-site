# Institutional monoculture: final verification

October 28, 2026 · report only, no figure files changed · served `design/motion-figures/` on 127.0.0.1:5311, Playwright 1.63 (Chromium) from the repo's `node_modules`, held moments with `?t=` and `__motionFigures[id].seek()`. Viewports 1440×900, 1366×657, 1280×720 and 390×844. No console errors on any page.

| # | Item | Result |
| --- | --- | --- |
| 1 | Closing question not answered beside it | **Pass** |
| 2 | A shared frame, not a shared word | **Pass** |
| 3 | AI's challenge differs visibly from its outline | **Pass** |
| 4 | Runtime | **Fail** (one label under 11 px; the rest pass) |
| 5 | At 390 px | **Pass** |
| 6 | Page copy | **Pass** |
| 7 | Reading pace | **Fail** (6 beats short) |
| 8 | Final frame | **Pass** |

## 1. The closing question isn't answered beside it: pass

- Beat 7 (54.5–60.5 s) is its own beat, with the caption "Faculty ask what other frames the task could take." It comes before beat 8, where the imagined seminar starts at 60.5 s. The "FACULTY ASK" box appears at 57.5 s.
- The dashed "?" stays empty to the end. At 97.7 s, no visible picture element overlaps the box's bounds at 1440, 1366 or 1280. The only thing in it is "FACULTY ASK?". In the stacked view the "?" chip holds only "?" at every moment it is shown.
- The imagined board is headed "IMAGINED: ONE POSSIBLE SPREAD" from 62.8 s to the end. Its problems are serif words under three goal labels: Serif 13 units, which is 11.1 px or more at 1366×657.

## 2. A shared frame, not a shared word: pass

- The ten lines are all worded differently. "rival" appears in 3 of them, and no word appears in all ten.
- The DOM has no underline: no thin rect or line under any line's text, and no `text-decoration` set.
- After the reading marks, a bracket closes around all ten with "ONE FRAME: COUNTER THE RIVAL". In the compact layout this becomes "ONE FRAME" over "COUNTER THE RIVAL".

## 3. The AI's challenge differs from its outline: pass

- Beat 2: full-sheet beige outlines with grey bars, the same in all ten papers.
- Beat 8: red first lines on blank papers (64.8–66.3 s), with no AI mark yet.
- Beat 9: red copies go up to the AI (69.3 s). Then "THE AI ASKS / What did you assume? / What else could it be?" appears in a tailed speech bubble (71.8 s), and small grey speech bubbles (`bubblePath`) land under each red line (72.1–73.5 s). Writing follows at 73.7 s.

The two looks are clearly distinct in the stills at 18.98 s and 76.98 s.

## 4. Runtime: fail

**Fail: a label renders under 11 px.** The callout heading "EVERY AI OUTLINE OPENED WITH" renders at:

- 8.3 px at 1366×657
- 9.5 px at 1280×720
- 10.5 px at 1440×900

This lasts from the compact move (61.5–62.7 s) to the final frame at 97.7 s. It is at 35% opacity in beats 8–9 and at full opacity from 79.2 s.

- **Location:** `institutional-monoculture.js` line 68, `CALL_C = {x: 340, y: 80, s: 0.75}`. This scales the callout group, which includes the mono label on line 202 (13 units × 0.75 = 9.75 units).
- **Why the legibility rule misses it:** the label's `data-fs` is 13, so `legibility()` (line 560) never sees the 0.75 scale and doesn't hide it.

Every other settled picture text is 11.1 px or more at 1366×657 and 12.6 px or more at 1280×720. The only other text under 11 px is text in flight during the line lifts, which is momentary.

**Pass: pauses off screen and doesn't resume by itself.** Tested at 1440×900 after autoplay:

- With about 40% of the shot in view, it keeps playing.
- With about 15% in view, it pauses, shows "Play" and holds t = 2.65.
- Scrolled to the page bottom for 2 s, then back into view for 2.5 s, it is still paused at t = 2.65.

**Pass: autoplay at 1366×657 and 1280×720.** Scrolling in 80 px wheel steps, both start playing. At the moment playback starts, the caption band and the controls are fully inside the window:

- 1366×657: caption at 424–536 px, controls at 536–601 px
- 1280×720: caption at 487–599 px, controls at 599–664 px

**Pass: other figures.**

- `frame-capture` autoplays at 1440×900 and 1366×657, advancing 0.25 → 3.75 s.
- `appropriate-reliance` opens live on gate 1 (t = 25.5, `state="gate"`), as its storyboard specifies. "Start over" plays from 0 (3.45 s after 1.5 s), stops at gate 1 (t = 25.5, `state="gate"`, label "Play") and is still there 3 s later.

## 5. At 390 px: pass

- The stacked stage is active.
- The movements can be followed. The glyph that is changing gets a navy pulse for each wave: outlines (15.3 s), writing (20.6 s), ticks (24.4 s), each lift (31–37 s), red lines (65 s), bubbles (72.8 s), writing (74 s) and each goal group (81–84 s). The AI chip pulses on requests and replies. The first seminar dims while the imagined one runs.
- The "?" chip is 48 px below the first seminar's papers and overlaps no paper glyph or board text at any moment.
- The player is 834 px tall (stage 571 + caption 144 + controls 119) in an 844 px window. The controls' offset stays at 715 px at every half second of the run.
- The smallest stacked-view text is the 11 px tick.

## 6. Page copy: pass

"the essay offers the pilot as a way to find out" appears nowhere in `index.html` or the JS. Line 124 reads: "The essay proposes framing first; whether it spreads frames across a seminar is untested, and the imagined board is one possible spread."

## 7. Reading pace: fail

**Rule:** a beat must last at least (caption words + picture words) ÷ 3 + 1.5 s.

**How words are counted:** picture words are words new in that beat; labels repeated from an earlier beat aren't counted again. This matches the storyboard's §7 picture-word counts exactly. Beat lengths come from `AT` (line 40) and `T.end`.

| Beat | Time (s) | Length (s) | Caption | Picture | Required (s) | Result |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 0.0–11.0 | 11.0 | 9 | 24 (task card 11, "The seminar" 2, context 11) | 12.5 | **Fail, −1.5** |
| 2 | 11.0–19.0 | 8.0 | 12 | 1 | 5.8 | Pass |
| 3 | 19.0–27.7 | 8.7 | 13 | 4 | 7.2 | Pass |
| 4 | 27.7–41.0 | 13.3 | 9 | 30 (ten lines) | 14.5 | **Fail, −1.2** |
| 5 | 41.0–48.0 | 7.0 | 9 | 5 | 6.2 | Pass |
| 6 | 48.0–54.5 | 6.5 | 7 | 11 (card 9, pill 2) | 7.5 | **Fail, −1.0** |
| 7 | 54.5–60.5 | 6.0 | 9 | 2 | 5.2 | Pass |
| 8 | 60.5–68.3 | 7.8 | 10 | 13 | 9.2 | **Fail, −1.4** |
| 9 | 68.3–77.0 | 8.7 | 10 | 14 (the AI's questions 12, "AI challenges" 2) | 9.5 | **Fail, −0.8** |
| 10 | 77.0–90.7 | 13.7 | 12 | 29 (7 new lines, 2 new goal labels) | 15.2 | **Fail, −1.5** |
| 11 | 90.7–97.7, then rests | 7.0 timed | 21 (check 7, follow-up 14) | 0 | 8.5 | Short by 1.5 s on the clock; passes only because the figure rests on this frame |

Beats 1, 4, 8 and 10 still fail if pure labels are left out of the count. Beat 6 passes without its card heading and pill, and beat 9 fails by 0.1 s without "AI challenges". On captions alone, every beat passes; the largest need is 5.8 s.

**Total running time: 97.7 s.** The player shows "1:37".

## 8. Final frame: pass

At 97.7 s the caption band reads "FACULTY CHECK / What frames are missing across the seminar? / Line up each paper's problem, then ask what other frames the task could take." The question is verbatim from the site's Core Failure Modes table (`scripts/build-site.mjs` line 974). The follow-up is at full opacity and the same size and style as the question, italic Source Serif 4 in both:

- 30 px at 1440×900
- 22 px at 1366×657 and 1280×720
- 18 px at 390×844

## Minor, outside the items

- In the compact layout, "ONE FRAME" (x 340) and "COUNTER THE RIVAL" (x 348) are offset by 8 units (lines 193–194). The offset is visible in the final frame.
- At 390 px, the two-column problem list wraps "Undersell foreign arms" with "arms" outdented under the bullet (about 34–60 s).
