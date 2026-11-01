# Invisible delegation: final verification

October 30, 2026. I'm a verifier, not a cold reader. I checked the polish, wording and classroom round against the intent in `storyboard.md` (the classroom light-read fixes and the PME polish pass), `storyboard-business.md` (its classroom section) and `tests/classroom-light-read.md`. This is a report only: no figure files changed. It replaces the earlier `final-verify.md` (October 28) in full.

**Build:** branch `motion-figures` at `7e607cb`. The figure's files were clean.

**Method:**
- **Server:** `python3 -m http.server 5361 --bind 127.0.0.1`, stopped afterwards.
- **Browser:** Playwright Chromium from the site repo, one browser at a time, closed between viewports.
- **Versions:**
  - PME: no query, cast `seminar`;
  - workplace: `?edition=business`;
  - classroom: `&cast=classroom`;
  - high school: `&cast=high-school`.
- **Sampling:** I seeked with `window.__motionFigures[id].seek(t)` every 0.1 s at 1440×900 and 390×844 (980 samples per version). Each sample recorded the caption and every visible text, using effective opacity, clip-path reveals (the notes card) and rendered size (`getScreenCTM`). On the stacked stage I recorded text by block, the rubric underline (the SVG line's opacity and the stacked `.is-consulted` class), text rectangles and page width. I saved a still of the shot every 0.5 s. At 1280×720, 1366×657 and 768×1024 (the wide stacked stage) I sampled every 0.5 s.
- **Pacing rule:**
  - a caption needs (words ÷ 3) + 1.5 s inside its beat;
  - a new text needs the same time on screen at 50% opacity or more;
  - a request bubble that settles into the same words in the lane counts as one stretch;
  - text that stays to the end passes.
- **Other checks:**
  - reduced motion, both the emulated media query and `?reduced`;
  - every switch link, followed from all four versions;
  - a live load, for autoplay and the console;
  - PME frame-diffed against `regression/baseline` with `scripts/frame-diff.mjs`. Captures went to the scratchpad.

Times are on the player clock (figure time + 3.0 s). The run is 97.9 s in all four versions (94.9 s of figure time), with the check at 91.0 s.

## Verdict

| # | Item | PME | Workplace | Classroom | High school |
|---|---|---|---|---|---|
| 1 | PME polish: underline only while read; "Which notes did you keep, and why?" and its ending; about 98 s | **Pass** | — | — | — |
| 2 | Drawn picture, labels ≥ 11 px at 1280×720 and 1366×657 | **Pass** | **Pass** | **Pass** | **Pass** |
| 3 | Pacing at 1440×900 and 390×844 | **Pass** | **Pass** | **Pass** | **Pass** |
| 4 | Workplace wording: captions 4, 5 and 8, and the follow-up | — | **Pass** | — | — |
| 5 | Classroom and high school | — | — | **Pass** | **Pass** |
| 6 | Switch and `aria-current` | **Pass** | **Pass** | **Pass** | **Pass** |
| 7 | 390 width, console, reduced motion | **Pass** | **Pass** | **Pass** | **Pass** |

## Defects

None found against the brief. Observations follow in their sections. None of them is a defect.

## 1. PME polish: pass

**The underline shows only while someone reads the rubric.** In PME only the second student reads it: core 45.9–50.3, which is 48.9–53.3 player.

| Stage | PME underline visible | Workplace, classroom, high school |
|---|---|---|
| Drawn, 1440×900 | 49.0–53.2 s only | 9.7–12.3 s and 49.0–53.2 s (both people's reads) |
| Drawn, 1280×720 and 1366×657 (0.5 s steps) | 49–53 s only | 10–12 s and 49–53 s |
| Stacked, 390×844 | 48.9–53.2 s only | 9.9–12.3 s and 48.9–53.2 s |
| Wide stacked, 768×1024 | 49–53 s only | 10–12 s and 49–53 s |

There's no underline in the final frame at any size. The stills at 51 s (390) and 97.5 s (1440, 390) agree.

**The follow-up and its ending (PME):**
- The check reads "Faculty check: What did the AI decide for the student?", with the second line at equal size: "Ask: whose standard? Which notes did you keep, and why?". The second line arrives at 94.5 s and fits one line at 1440 and 1280 (stills).
- The picture matches:
  - "FACULTY ASK" "Better by whose standard?" appears at 75.7 s;
  - "Which notes did you keep, and why?" at 78.9 s;
  - both answer "The rubric's." (77.3 s);
  - the first says "I kept them all. They made it stronger." (82.1 s);
  - the second says "Kept two that fit what I decided. Struck 'decisive': too thin." (84.9 s), which matches their struck note, "evidence too thin".
- The run is 97.9 s.

**Frame-diff:** `scripts/frame-diff.mjs invisible-delegation diff figures/invisible-delegation/regression/baseline <scratch> --freeze` (the post-polish baseline) reported **205 of 205 figure frames identical**.
- The 4 full-page and reduced-page stills differed in scattered text rows down the whole page, with no change to the figure.
- CONVENTIONS.md notes that tall page stills vary from run to run.

## 2. Laptops: pass

| Size | PME | Workplace | Classroom | High school |
|---|---|---|---|---|
| 1280×720 | drawn, 12.59 px | drawn, 12.59 px | drawn, 12.59 px | drawn, 12.59 px |
| 1366×657 | drawn, 11.07 px | drawn, 11.07 px | drawn, 11.07 px | drawn, 11.07 px |

- `.is-stacked` and `.is-narrow` were off in all 197 samples of every version.
- The figures are the smallest visible picture text at any settled sample ("EXAMPLE TASK").
- At 1440×900 the smallest is 14.06 px.

## 3. Pacing: pass in all four versions

**Captions.** All 9 captions meet (words ÷ 3) + 1.5 s in every version. The tightest is caption 5: 10 words need 4.83 s, and the beat is 7.3 s.

**New text.** At 1440×900 I checked 75–78 texts per version, 47–53 of which leave the screen before the end. There were no shortfalls:
- the request bubbles, which settle into the lane in the same words;
- the notes;
- the "UNSAID" lines;
- the written decisions;
- the follow-up question;
- the typed answers. The second answer has 14 words and is up from 84.8 s, 6.2 s before the check.

The phone stage at 390×844 had no shortfalls either.

**Observation, not counted:** the second student's draft counter ticks "DRAFT 2" for 1.2 s and "DRAFT 3" for 1.1 s (69.5–71.7 s; 69.3–71.7 s on phones), then holds "DRAFT 4".
- Those exact words were up for several seconds earlier, in the first student's counter.
- Earlier cold reads saw the 2→3→4 tick as motion.
- The same holds in all four versions.

## 4. Workplace wording: pass

- **Caption 4:** "Each request left out whose criteria to use. The AI used its own." (13 words; needs 5.83 s; beat 8.7 s).
  - It matches the "UNSAID" lines on screen: "whose criteria?", "whose outline?" and "whose meaning?".
  - "Standard" is now kept for the firm's standard only.
- **Caption 5:** "A second analyst reads the standard, then decides before asking." (10 words; needs 4.83 s; beat 7.3 s). The beat shows the reading, and the decisions arrive in beat 6, as the caption's "then" says.
- **Caption 8:** "The manager asks each analyst two questions, with only the emails to go on." (14 words; needs 6.17 s; beat 17.5 s).
- **Check:** "Reviewer's check: What did the AI decide for them?", then "Ask: whose standard? Which notes did you keep, and why?".
  - On screen, "THE MANAGER ASKS" "Better by whose standard?" is followed by "Which notes did you keep, and why?".
  - Both analysts answer "The firm's standard.".
  - The first says "I kept them all. They made it clearer."
  - The second says "Kept two that fit what I decided. Struck the recap: not in my outline."
  - Each check line fits one line at 1440.

## 5. Classroom and high school: pass

- **`node scripts/edition-check.mjs`:** no failures, exit 0.
- **Singular reviewer, no "Faculty":** I scanned every word each page shows: the page, beat list, summary, captions, and picture and stacked text across the run.
  - There's no "Faculty" or "seminar".
  - Every verb agrees with a singular subject: "The instructor asks each student two questions, with only the emails to go on.", "THE INSTRUCTOR ASKS", "Then the instructor asks", "can't tell the instructor who decided", "Instructor's check", with "teacher" throughout the high-school version.
  - "Then they ask in the same words" refers to the second student.
- **AI use disclosed:**
  - The setup says "The class allows AI, and both say they used it."
  - On screen, both papers carry "REVISED WITH AI" from 21.8 s to the end. On the phone: "EMAIL REVISED WITH AI".
- **The study,** checked against the source spine and the storyboard's verified quotes:
  - "a 2025 study of knowledge workers' AI use (Lee et al.)", plus "The study surveyed people at work; it included no students.";
  - 319 knowledge workers and 936 examples;
  - the p. 1 quote and P275 on p. 11. P144 on p. 8 is in the verified list;
  - stewardship on p. 13;
  - limits: self-reported, and correlations;
  - affiliations: Microsoft Research and Carnegie Mellon.
- **Phone: each request sits with its own card.** In every column, each request is followed by its "UNSAID" line (first student) and then its card, indented with a turn arrow (↳). The next request starts flush left, so "Suggest a better structure" no longer reads as belonging to "The criteria". Stills at 26 s and 97.5 s, in all four versions, since this is core.

## 6. Switch: pass

- Every page reads "See this with: Workplace · Classroom · PME". The note on PME pages reads "PME (professional military education)…"; the other pages hide it.
- **`aria-current`:**
  - PME page: PME;
  - workplace: Workplace;
  - classroom: Classroom;
  - high school: Classroom, whose link keeps `cast=high-school`.
- **Where the links land.** From all four pages:
  - Workplace goes to edition `business`, cast `workplace`.
  - Classroom goes to cast `classroom`, or `high-school` from the high-school page.
  - PME goes to edition `pme`, cast `seminar`.
  - Each landing marks the right link.

## 7. 390 width, console, reduced motion: pass

- **Width:** `scrollWidth` was 390 at 390×844 throughout, and 768 at 768×1024.
- **Console:** no errors, warnings or failed requests in any load. On the live load, autoplay started once the shot was in view.
- **Reduced motion:** under both the media query and `?reduced`, at 1440×900 and 390×844, every version opens at 1:37 / 1:37 with `.is-reduced`.
  - The check and its second line are at full opacity.
  - All 10 "On screen" lines are visible.
  - The visible picture text equals the `seek(duration)` frame.
