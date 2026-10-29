# Invisible delegation, business edition: verification of the round-3 fixes

October 28, 2026 · report only (no figure files edited) · build: commit 483324f (the figure's files are unchanged in the working tree)

**Verdict: one defect remains.** Items 1, 3 and 4 pass, and so do the extra checks. Item 2 passes on the drawn stage (1280×900) but **fails in the stacked layouts (1280×720 and 390×844)**. There the second analyst's read of the standard adds an underline that the first analyst's read never gets, and that underline stays on to the final frame.

## Method

- I served `design/motion-figures/` on 127.0.0.1:8747 and stopped the server afterwards. All runs used Playwright 1.63 (Chromium).
- **Live autoplay** at 1280×900, 1280×720 and 390×844: the whole player (strip, stage, caption band, controls) scrolled into view, autoplay started, and the figure ran to its end at 1:35.
  - A logger read the clock, caption text and opacity, the follow-line opacity, the stacked chips' `is-pulse` class, the standard's classes and the speech lines on every animation frame (about 5,800 samples per run). It sampled `scrollWidth` once a second.
  - A screenshot was taken every 0.5 s of wall time (197, 192 and 193 frames).
  - Screenshots sometimes stalled the renderer (worst case 935 ms at 1280×900). The runtime caps each step at 0.1 s, so a stall only stretches the clock; it never skips. The 390 run was clean (worst gap 292 ms, at the start).
- **Exact frames** every 0.5 s of player time through the export hook (`seek`) at 1280×720 and 390×844, 191 each, because the live screenshot cadence was uneven under load.
- **Holds** with `?t=` at 11, 13, 51, 54, 60, 67.4, 68.2, 69, 70, 77.5, 79.5, 82, 85.5 and 95.3 s (player time) in all three viewports, with SVG attribute and DOM class dumps.
- **Reduced motion** through both `prefers-reduced-motion: reduce` and `?reduced`, in all three viewports.
- **PME edition:** a live autoplay run at 1280×900, then `scripts/frame-diff.mjs invisible-delegation diff regression/baseline`.

Times below are player time, as the scrubber shows it (figure time + 3 s for the name card).

## Results

| # | Item | 1280×900 | 1280×720 | 390×844 |
| --- | --- | --- | --- | --- |
| 1 | No straw man; check wording | PASS | PASS | PASS (check wraps to two lines; see note) |
| 2 | Caption 5 and equal highlights | PASS | **FAIL** | **FAIL** |
| 3 | Stacked: outline card pulses; no false "across" | n/a (drawn stage; outline card pulses) | PASS | PASS |
| 4 | Pacing ≥ words ÷ 3 + 1.5 s | PASS | PASS | PASS |
| — | No horizontal scroll at 390 | — | — | PASS |
| — | No console errors | PASS | PASS | PASS |
| — | Reduced motion: final frame, full text | PASS | PASS | PASS |
| — | PME edition still plays | PASS (plays to 1:33; 203 of 203 frames identical to `regression/baseline`) | | |
| — | No military or classroom wording in the figure | PASS | PASS | PASS |

## Evidence

### 1. No straw man: PASS

- Beat 8's caption is "The manager has only the emails, and asks each analyst two questions."
- "THE MANAGER ASKS · Better by whose standard?" appears at 75.6 s.
- Both analysts answer "“The firm’s standard.”" at the same moment:
  - on the drawn stage, both type out together from 76.7 to 77.7 s;
  - in the stacked layouts, both appear at 76.3 s.
- "What did you turn down, and why?" appears at 78.6 s.
- The first analyst answers "“None. They all made it clearer.”" at 81.0 s. That is a reasonable answer, not an admission of fault.
- The second analyst answers "“‘Add a recap.’ It wasn’t in my outline.”" at 83.2 s.
- The check reads "REVIEWER’S CHECK · What did the AI decide for them? / Ask: whose standard? What did you turn down, and why?". It matches both of the manager's questions.
- Line counts, measured with a DOM range:
  - one line at 1280×900 and 1280×720 (30 px);
  - **two lines at 390×844** (20 px).
  - At 390 the caption band stays at 184 px and the controls at 774 px in every hold, so the wrap moves nothing.

### 2. Caption 5 and the highlights: FAIL in the stacked layouts

- Caption 5 is right in every viewport: "A second analyst reads the same standard, then decides before asking."
- **Drawn stage (1280×900): equal.**
  - At 11.0 s (first analyst) and 51.0 s (second analyst) the standard is identical: scale 1.190, wash 0.09 at width 390, and an underline from x 124 to 356 at opacity 1.
  - Afterwards, at 13.0 s and 54.0 s, both clear back to scale 1, wash 0 and underline opacity 0.
- **Stacked (1280×720 and 390×844): not equal.**

| Moment | Class on `.id-n-rubric` | What shows |
| --- | --- | --- |
| First analyst reads, 9.9–12.4 s | `is-lit` | Wash and left bar, **no underline** |
| Second analyst reads, 48.9–53.3 s | `is-lit is-consulted` | Wash, left bar **and underline** |
| From 53.3 s to the end, including the final frame and reduced motion | `is-consulted` | **Underline stays** under "Bad news first, with the new date." |

- The live logs show the same sequence at both stacked sizes: `L` from 9.9 to 12.4 s, `LU` from 48.9 s, then `U` from 53.3 s to the end. So does the stills comparison (`rubric-compare.png` in the scratch folder).
- A reader sees the standard marked more strongly for the second analyst, and the final frame keeps it marked. That is the implied second difference the fix was meant to remove.
- The beat list's "On screen" text for beat 5 ("highlighted exactly as it was for the first analyst") is therefore wrong at these sizes. So is the storyboard's "the underline clears afterwards on both sides".
- **Cause:** `invisible-delegation.js:578`, `NR.rubric.classList.toggle('is-consulted', t >= T.rubricHi[0]);`. The underline class switches on at the second read and never switches off, and the first read (line 579) only toggles `is-lit`. One possible fix: give `is-consulted` the same windows as `is-lit`, for both reads.
- **Note (all layouts):** the treatment is the same, but the second read is held longer.
  - Drawn stage: the full highlight lasts about 1.9 s for the first analyst (10.1–12.0 s) and 3.5 s for the second (49.4–52.9 s).
  - Stacked: `is-lit` lasts 2.5 s against 4.4 s.
  - The second analyst's dot also stays at the standard longer: 5.6 s against 2.1 s.
  - This isn't a failure on its own, but it adds to the emphasis.

### 3. Stacked layouts: PASS

- At 1280×720 and 390×844, the pulse is on the outline chip "Date, reason, plan" (`is-own is-pulse`, border 3 px against 1 px) from 67.6 to 69.6 s, 2.0 s of wall time in both live runs.
- "Add a recap" is struck at 68.0 s, and "not in my outline" shows from 68.55 s. The criteria chip never pulses.
- On the drawn stage, the outline card's stroke rises to 2.89 at 68.2 and 69.0 s, while the others stay at 1.6.
- Caption 2 now reads "The analyst asks an AI for feedback. The request hands the criteria to the AI." No caption contains "across".
  - At 390 the chip nudges right and back, then greys in place, and the caption doesn't claim it crosses.
  - At 1280×720 the chip visibly slides from "Analyst decides" to "AI decides".
- *Residual, not a caption:* "across" survives in the beat list's "On screen" text for beats 2 and 3 ("travel slowly across into the AI's lane", "carries … across") and in the screen-reader summary. Both describe the drawn layout. On a phone the beat list sits directly under the player.

### 4. Pacing: PASS

Wall-clock time each caption was shown (opacity ≥ 0.5), from the live logs:

| Caption | Words | Needs (s) | 1280×900 (s) | 1280×720 (s) | 390×844 (s) |
| --- | --- | --- | --- | --- | --- |
| 1 | 14 | 6.17 | 9.33 | 9.33 | 9.33 |
| 2 | 15 | 6.50 | 11.13 | 11.38 | 11.13 |
| 3 | 10 | 4.83 | 11.93 | 11.93 | 11.93 |
| 4 | 13 | 5.83 | 8.53 | 8.53 | 8.53 |
| 5 | 11 | 5.17 | 7.13 | 8.18 | 7.13 |
| 6 | 10 | 4.83 | 12.77 | 11.68 | 11.23 |
| 7 | 14 | 6.17 | 10.20 | 10.03 | 10.03 |
| 8 | 12 | 5.50 | 15.55 | 14.73 | 14.73 |
| Check | 7 + name card | — | rests | rests | rests |

New on-screen text in beat 8, all of which stays up to the end:
- the question at 75.6 s;
- the shared answer at 76.3–77.7 s;
- the follow-up question at 78.6 s (7 words);
- the first answer at 81.0 s;
- the second answer at 83.2–85.0 s (8 words).

Before the check at 88.4 s, the second answer has had 5.2 s from its start. The check's second line (10 words, needs 4.83 s) appears at 91.9 s, 3.4 s before 1:35. The figure then rests on its final frame, so it stays up indefinitely. A capped export that ended at 1:35 would show it for less than the minimum.

### Also checked

- **Overflow at 390:** none. `scrollWidth` was 390 in all 97 live samples and in all 191 exact frames.
- **Console:** no errors or warnings in any live run, hold, reduced-motion load or PME run.
- **Reduced motion:** both `prefers-reduced-motion` and `?reduced` open at 1:35 / 1:35 with the full check and the follow line at opacity 1.
  - Drawn stage: all 20 answer words are shown, and the source line is at opacity 1.
  - Stacked: both follow-up answers, the follow-up question, "not in my outline" and "Based on a 2025 study of knowledge workers (Lee et al.)." are visible.
  - The standard's lingering underline (item 2) shows here too.
- **PME:** autoplay ran to 1:33 with no errors. Its captions are the PME ones ("A second student, with the same task, starts from the rubric." and so on). Frame-diff found 203 of 203 frames identical to `regression/baseline`.
- **Wording:** I scanned the SVG text, the stacked stage, all nine captions, the check, the nameplate, the beat list, the screen-reader text and the controls at 1280 and 390 for student, faculty, rubric, officer, military, war, base, ally, PME, classroom, class, teacher, school, grade, course, exam, essay, paper, strategic, commander, mission, college, lesson and similar words. None appear.

## Documentation notes (not figure defects)

- `storyboard-business.md` §4 ("Words that differ") is stale. It still lists "Reassure first", "Ours, set first from our standard: bad news first.", and the old captions 2, 5 and 8 ("carries the criteria across", "starts from the firm's standard", "asks each analyst about the standard").
- The Round 3 note "the underline clears afterwards on both sides" holds only on the drawn stage.
