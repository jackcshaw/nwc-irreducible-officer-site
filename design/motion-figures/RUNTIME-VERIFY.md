# Runtime verification

October 30, 2026, against `motion-figures` at `7e607cb` (`runtime/motion.js`, `casts.json`, `scripts/edition-check.mjs`). This report is fresh, and no partial earlier copy existed. I only reported: no runtime or figure file was edited.

**Method.** I served `design/motion-figures/` on 127.0.0.1:5373 and drove Playwright 1.63 (site-motion `node_modules`), running one browser at a time and closing it between viewports. Figures: frame capture, invisible delegation, responsibility laundering and appropriate reliance. Scripts are in the scratchpad (`fv3-rl-ar/rt.mjs`, `rt-replay.mjs`), with output in `out/rt/`.

| # | Item | Result |
| --- | --- | --- |
| 1 | Autoplay on a natural scroll at 390×844, 1280×720, 1366×657 and 1440×900 | **PASS** (one note on where it starts) |
| 2 | No autoplay when focus enters the player first | **PASS** |
| 3 | No autoplay under reduced motion | **PASS** |
| 4 | No autoplay on appropriate reliance | **PASS** |
| 5 | Slow edition (4 s) waits, never swaps to PME | **PASS** |
| 6 | 404 and invalid edition JSON fall back to PME with the notice | **PASS** |
| 7 | Blocked `casts.json` still fills the page | **PASS** |
| 8 | No-JS shows the noscript notice | **PASS** |
| 9 | `node scripts/edition-check.mjs` | **PASS** |
| — | Switch and `aria-current`, 390 scroll, console, reduced-motion text | **PASS** |

## 1. Autoplay on a natural scroll: PASS

From the top of the page, the mouse wheel moved down in 90 px steps, 90 ms apart, the way a reader scrolls. The figure state was read after each step.

- **Rule A, "picture in view".** Stop as soon as the drawn stage is fully on screen.
- **Rule B, "picture and caption in view".** Stop when the stage and the caption band are both on screen.

After stopping, I waited 1.6 s.

- **On load, at every size:** no figure started (frame capture at 0:16, invisible delegation at 0:12, RL at 0:10, each on its poster). None started during the scroll either (0 early starts).
- **Rule B, at every size and in every figure: playing within 1.6 s of the stop.**

| Viewport | Frame capture | Invisible delegation | Responsibility laundering |
| --- | --- | --- | --- |
| 390×844 | 4 steps; shot 1.0, caption 1.0, controls 0.26 | 5 steps; 1.0 / 1.0 / 0.18 | 5 steps; 1.0 / 1.0 / 0.01 |
| 1280×720 | 4; 1.0 / 1.0 / 0.46 | 4; 1.0 / 1.0 / 0.31 | 4; 1.0 / 0.98 / 0 |
| 1366×657 | 4; 1.0 / 1.0 / 0.21 | 4; 1.0 / 1.0 / 0.31 | 4; 0.98 / 0.86 / 0 |
| 1440×900 | 3; 1.0 / 0.98 / 0 | 3; 1.0 / 0.98 / 0 | 4; 1.0 / 1.0 / 0.84 |

(Fractions are the visible share of the shot, the caption band and the controls.)

- **Rule A, laptop sizes: the note.** With only the drawn stage in view (shot 0.76–0.89, caption band 0–36% visible), nothing starts. It starts after 1–2 more wheel steps (90–180 px), once the caption band is about 85% visible. That matches the runtime's gate: 85% of the shot and 85% of the caption band. A reader who stops with the picture in view but its caption band below the fold sees a still poster until they scroll a little further.
- **Rule A, 390.** It wasn't measurable, because the stacked stage has no separate box. At 390, Rule B is the natural stop: the shot fills the window.

## 2. Focus first: PASS

At 390×844 and 1280×720, in all three figures, I pressed Tab from the top (7 presses) until focus reached the Play button. The browser scrolled the player half into view (shot 0.51–0.59, caption band 1.0).

- **No autoplay.** 2.5 s later, none had started: still the poster time.
- **Enter plays.** Pressing Enter then started each one (`playing`).

## 3. Reduced motion: PASS

At 390×844 and 1280×720, I scrolled each figure fully into view and waited 2.5 s.

- **No autoplay.** No figure played. Each showed its final frame (1:29, 1:37, 1:36).
- **Full text.** Each final frame had its name, definition, check question and follow-up.
- RL and appropriate reliance's own reduced-motion results are in their `final-verify.md`.

**Observation, outside the list.** Under reduced motion, Restart (or Start over) animates the whole figure. Frame capture and RL were `playing` at 0:02, 2.5 s after the click. The runtime's restart handler calls `draw(0); play()` without checking `isReduced()`. The reader asked for it, but a reduced-motion reader might expect the still beat-by-beat view instead. Worth a decision.

## 4. Appropriate reliance never autoplays: PASS

PME and `?edition=business&cast=classroom`, at 390×844 and 1280×720: after a natural scroll fully into view and 3 s of waiting, the figure stayed at `gate`, 0:28, on question 1.

## 5. Slow edition: PASS

Frame capture and invisible delegation with `?edition=business`. `editions/business.json` was held back 4 s.

| Time | What showed |
| --- | --- |
| 1.0 s and 2.5 s | `html.ed-pending`; the page words hidden; no edition |
| 3.4 s | `html.ed-loading`: the neutral "Frame Capture: loading…" / "Invisible Delegation: loading…"; still no edition |
| 4.5 s and 6.0 s | the business edition (`data-edition-id="business"`); setup "An analyst at a health system…" / "An analyst asks an AI for feedback…"; loading class cleared |

At no point did a PME word or the fallback notice show, and the console had no errors.

## 6. 404 and invalid JSON: PASS

I tested frame capture and invisible delegation with `?edition=business` in two ways: a 404, and a 200 serving `{ "id": "business", oops`.

In all four cases:
- the page fell back to PME (`data-edition-id="pme"`, setup "A student asks an AI…");
- "Showing the original example." showed directly under the switch;
- the switch marked PME as current;
- the figure mounted and played.

The only console entry is the browser's own "Failed to load resource: 404" in the 404 case.

## 7. Blocked `casts.json`: PASS

Frame capture and invisible delegation, in all four versions, with `casts.json` aborted:
- every page filled, with no loading state;
- no `{key}` was left unfilled;
- the cast resolved from the built-in copy (`seminar`, `workplace`, `classroom`, `high-school`), with the right words: FACULTY, THE MANAGER, The instructor, The teacher.

The only console entry is the expected `net::ERR_FAILED` for the blocked request.

## 8. No-JS: PASS

With JavaScript off, each page showed its noscript notice:
- frame capture: "FAILURE MODE 1 OF 7 / Frame capture / The first plausible frame becomes the working frame, unexamined. / This figure needs JavaScript to play.";
- invisible delegation: the same, with its own definition;
- appropriate reliance: "THE SKILL / Appropriate reliance / Accept AI support where it’s warranted, check or refuse it where it isn’t, and be able to say why.";
- responsibility laundering: the same, with "The model’s recommendation makes responsibility feel shared, or easier to defend."

## 9. `edition-check`: PASS

`node scripts/edition-check.mjs` printed "edition-check: 8 figures, 16 editions, casts seminar, classroom, high-school, workplace / Listed casts: no failures." and exited 0.

## Also checked

- **Switch: PASS.** Frame capture and invisible delegation, all four versions, at 390×844 and 1280×720: "See this with: Workplace · Classroom · PME".
  - **`aria-current="page"`:** PME on PME; Workplace on workplace; Classroom on classroom and high school.
  - **Fit:** the nav ends at 374 of 390 (a 16 px gutter).
  - **Check labels:** Faculty check / Reviewer’s check / Instructor’s check / Teacher’s check.
  - RL and appropriate reliance pass too (their reports).
- **No horizontal scroll at 390: PASS.** `scrollWidth` is 390 on every page tested.
- **Console: PASS.** No errors or warnings, apart from the deliberate failed requests in items 6 and 7.
- **Reduced motion shows the full text: PASS** (item 3).

## Defects

None in the listed runtime items.

**Notes:**
- Autoplay needs the caption band about 85% visible, not just the drawn stage (item 1).
- Restart under reduced motion animates (item 3).

## Recheck (October 30, after the 4.2 s name card)

**Build:** `d54d0cb` (`runtime/motion.js`: card 4.2 s, a 3.2 s hold then a 1 s move; player and figure conversions rounded to the microsecond). Served on 127.0.0.1:5463 (stopped afterwards), with one headless Chromium at a time, closed between viewports. Scripts are in the scratchpad `recheck-final/` (`card.mjs`, output `out/card/`).

**Scope.** All eight figures, in PME and workplace (`?edition=business`), at 1440×900 and 390×844: 32 runs. Each run did six things:
- **Seek pass:** 0–5.2 s of player time in 0.05 s steps. At each step it read the kicker's opacity (its own × the card's, plus visibility), its box (inside the shot and the window, unmoved) and whether anything was painted over it (`elementsFromPoint`).
- **Real clock:** from the waiting view it clicked Play, then sampled every animation frame for 6.5 s.
- **Beats:** it compared the player's beats with the figure's own (captured from `mount()`) + 4.2. It seeked to each beat and 0.05 s before it, and clicked each beat in the beat list.
- **End:** focus on the scrubber, then the End key.
- **`?t=`:** a beat constant in seconds, the same in m:ss, `?t=30`, and the duration.
- **Appropriate reliance:** a logger from document start timed the intro over question 1, with no input.

| # | Item | Result |
|---|---|---|
| 1 | Kicker "Failure mode N of 7" fully shown 3.17 s or more | **PASS**: all 28 failure-mode runs |
| 2 | Appropriate reliance: "The skill" holds 2.17 s or more | **PASS**: 2.25–2.26 s |
| 3 | Beats start on time | **PASS** |
| 4 | End on the scrubber | **PASS** |
| 5 | `?t=` | **PASS** |
| 6 | `node scripts/edition-check.mjs` | **PASS** |
| 7 | Console | **PASS**: 0 errors, 0 warnings, no failed requests |

**1. The kicker.**
- **Seek pass:** in every figure, version and size, it is fully opaque, still, inside the shot and uncovered from 0 to 3.2 s of player time. Its box doesn't move during the hold.
- **Real clock:** after Play it stays fully shown for 3.20–3.23 s of wall clock in every run. It is already fully shown in the waiting view before Play, so a reader who waits sees it longer.
- **The card:** it moves into the corner from 3.2 to 4.2 s, and the first caption starts at player 4.2 (wall clock 4.20–4.22 s).
- **Reading time:** the hold covers "Failure mode N of 7" at 3.17 s.

**2. Appropriate reliance's intro.**
- **Hold:** "The skill" is fully opaque, measured from when the shot is in view until the card starts to move. PME holds 2.26 s at both sizes; workplace holds 2.25 s at both.
- **Settle:** the card reaches its corner about 3.0 s after the shot comes into view.
- **The question:** it stays live underneath (state `gate`, 0:29).
- **Seek:** the window seek draws the card the same way as the other figures: fully shown 0–3.2 s.

**3. Beats.**
- **Constants:** in all 16 figure × version pairs, every player beat equals the figure's beat + 4.2 exactly (microsecond rounding), and the duration equals the figure's + 4.2.
- **Seek:** a seek to each beat's player time shows that beat (`aria-current`, caption), and 0.05 s earlier shows the one before. No exceptions.
- **Beat-list clicks:** in the seven failure-mode figures, each click lands on its beat, with the scrubber within 0.005 s of the beat's time.
- **Appropriate reliance:** its beat list stays locked until the calls, as designed.

**4. End.**
- **Failure-mode figures:** in all 14 runs at each size, End goes to the duration, for example "1:30 / 1:30" for frame capture PME and "1:44 / 1:44" for frame capture workplace. The button then reads Replay, with the last beat current.
- **Appropriate reliance:** End holds at question 1 (0:29, state `gate`), as designed.

**5. `?t=`.**
- **Beat constants:** the value in seconds (for example frame capture PME `?t=27.2`) and in m:ss (`?t=0:27.20`) both land on beat 4, at 27.2.
- **`?t=30`:** it lands at 0:30.
- **The duration:** it lands at the end ("1:30 / 1:30"). The button reads Play there, because the runtime always labels a `?t=` load Play. That behaviour is unchanged, not a regression.
- **Appropriate reliance:** `?t=60` and `?t=1:55` hold at question 1 (0:29, `gate`). `?t=19.2`, its beat 2, lands on that beat.

**6. `edition-check`.** It printed "edition-check: 8 figures, 16 editions, casts seminar, classroom, high-school, workplace / Listed casts: no failures." and exited 0.

**7. Console.** No errors or warnings in any load of this recheck:
- the 32 card runs;
- the frame capture, fluency substitution, uncalibrated reliance, premature synthesis and responsibility laundering checks;
- every appropriate reliance pass.

The server log shows no failed requests.

**Defects:** none.
