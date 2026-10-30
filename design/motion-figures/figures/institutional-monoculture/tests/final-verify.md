# Institutional monoculture: final verification

October 30, 2026. I'm a verifier, not a cold reader. I checked the polish, wording and classroom round against the intent in `storyboard.md` (the change after the classroom light read, and beat 8), `storyboard-business.md` (its classroom section and the changes after the light read) and `tests/classroom-light-read.md`. This is a report only: no figure files changed. It replaces the earlier `final-verify.md` (October 28) in full.

**Build:** branch `motion-figures` at `7e607cb`. The figure's files were clean.

**Method:**
- **Server:** `python3 -m http.server 5361 --bind 127.0.0.1`, stopped afterwards.
- **Browser:** Playwright Chromium from the site repo, one browser at a time, closed between viewports.
- **Versions:**
  - PME: no query, cast `seminar`;
  - workplace: `?edition=business`;
  - classroom: `&cast=classroom`;
  - high school: `&cast=high-school`.
- **Sampling:** I seeked with `window.__motionFigures[id].seek(t)` every 0.1 s at 1440×900 and 390×844 (941 samples per business version, 994 for PME). Each sample recorded the caption and every visible text, using effective opacity and rendered size (`getScreenCTM`, so scaled groups count at their drawn size). On the stacked stage I recorded text by block, plus text rectangles, page width and the reviewer label's boxes. I saved a still of the shot every 0.5 s. At 1280×720 and 1366×657 I sampled every 0.5 s.
- **Beat 8:** every SVG element's box and effective opacity, every 0.05 s across the beat, at 1440×900 and 1280×720.
- **Pacing rule:** a caption needs (words ÷ 3) + 1.5 s inside its beat. A new text needs the same time on screen at 50% opacity or more, and text that stays to the end passes.
- **Other checks:**
  - reduced motion, both the emulated media query and `?reduced`;
  - every switch link, followed from all four versions;
  - a live load, for autoplay and the console;
  - stills at 1280×720 and 1366×657.

Times are on the player clock (figure time + 3.0 s). PME runs 99.3 s; workplace, classroom and high school run 94.0 s.

## Verdict

| # | Item | PME | Workplace | Classroom | High school |
|---|---|---|---|---|---|
| 1 | PME polish: beat 8's re-layout one step at a time | **Pass** | **Pass** (core) | **Pass** (core) | **Pass** (core) |
| 2 | Drawn picture, labels ≥ 11 px at 1280×720 and 1366×657 | **Pass** | **Pass** | **Pass** | **Pass** |
| 3 | Pacing at 1440×900 and 390×844 | **Pass** | **Pass** | **Pass** | **Pass** |
| 4 | Workplace wording: beat 8, "imagined rerun", the spread line, the reviewer label | — | **Pass** | — | — |
| 5 | Classroom and high school (bike case) | — | — | **Pass** | **Pass** |
| 6 | Switch and `aria-current` | **Pass** | **Pass** | **Pass** | **Pass** |
| 7 | 390 width, console, reduced motion | **Pass** | **Pass** | **Pass** | **Pass** |

## Defects

None found against the brief. Observations follow in their sections. None of them is a defect.

## 1. Beat 8 moves one step at a time: pass

I took every element that moved or faded during beat 8 and grouped them by when they changed. In player time:

| Step | Intended (core) | PME, 1440 and 1280 | Workplace, classroom, high school, 1440 and 1280 |
|---|---|---|---|
| The papers move and shrink (168–169 elements, with their labels) | 59.9–60.9 | 62.95–63.90 | 58.65–59.60 |
| The lineup, its bracket and the pill; the reading marks and the large label fade | 61.0–62.0 | 64.05–65.00 | 59.75–60.70 |
| The AI's card, the panel and the question box | 62.1–62.8 | 65.15–65.80 | 60.85–61.50 |
| The dim (192–195 elements) | 62.8–63.2 | 65.85–66.20 | 61.55–61.90 |
| The imagined run arrives (business: with "SENT BACK: WHAT ELSE COULD THE PROBLEM BE?" and its line) | 63.2–63.8 | 66.25–66.80 | 61.95–62.60 |
| The red lines start | 63.9 | 66.90 | 62.65 |

- No two steps overlap. The one element that spans two steps is the grey line from the AI's card to the "AI'S FRAME" pill (PME 64.15–65.75), because its ends are attached to things that move in steps 2 and 3.
- The beat's length is unchanged: PME 61.9–69.1 and business 57.6–64.2.
- The stills at 60.0 s (business) and 65.5 s (PME) show the steps one after another.

## 2. Laptops: pass

| Size | PME | Workplace | Classroom | High school |
|---|---|---|---|---|
| 1280×720 | drawn, 12.59 px | drawn, 12.59 px | drawn, 12.59 px | drawn, 12.59 px |
| 1366×657 | drawn, 11.07 px | drawn, 11.07 px | drawn, 11.07 px | drawn, 11.07 px |

- `.is-stacked` and `.is-narrow` were off in every sample.
- The figures are the smallest settled label, meaning the same size half a second before and after, which includes the compact lists at 13 units. At 1440×900 it's 14.05 px.
- The lifting copies of the problem lines pass through 6.9–7.8 px while they grow into the list (75.5 s business, 82 s PME). They're in motion, not settled labels.

## 3. Pacing: pass in all four versions

**Captions.** All 11 captions meet (words ÷ 3) + 1.5 s in every version.
- The tightest is caption 7 in the business casts, "The manager (instructor, teacher) asks what frames are missing.": 7 words need 3.83 s, and the beat is 4.5 s.
- PME's caption 7 has 9 words in 6.0 s.
- The check's second line arrives 5.4 s before the end (88.6 s business, 93.9 s PME), then rests.

**New text.** At 1440×900 I checked 45 texts in PME and 51 in each business version. Every new text meets the rule, including:
- "NOT SEEN BY THE MANAGER (INSTRUCTOR, TEACHER)" and the card;
- the question box;
- "SENT BACK…" from 62.4 s;
- the AI's questions;
- the goal groups;
- "MORE FRAMES TO WEIGH…" from 80.0 s.

**Observations, not counted:**
- **Dimmed by design.** In beat 8 the bracket label is reset in the compact layout ("ONE FRAME" over the goal) at 64.8 s in PME and 60.5 s in the business versions. It's at full strength for 1.4 s, then the first run dims to 35% (66.1 s PME, 61.8 s business), and it returns at full strength from the undim to the end. The same words had been up for about 20 s in the large label. On phones, the compact list "How do we stand out? · and nine more like it" works the same way: full strength 59.7–61.8 s, 35% to 73.2 s, then full again from 74.2 s to the end. Counting text at 30% or more as on screen, no version has a shortfall.
- **The phone stage at 390×844** had no shortfalls beyond the dim above.

## 4. Workplace wording: pass

- **Beat 8:** "Imagine the manager sends them back: what else could the problem be?" (12 words; needs 5.5 s; beat 6.6 s).
  - A navy line runs from the question box to "SENT BACK: WHAT ELSE COULD THE PROBLEM BE?" (62.4 s), and the spread forms under it.
  - On phones: "Sent back: what else could the problem be?" (62.2 s).
- **"Imagined rerun":** the page uses it twice: "In the imagined rerun the manager sends the plans back with that question" and "the imagined rerun is one possible answer". "Imagined board" is gone from the workplace page; the PME page keeps its own wording.
- **The line under the spread:** "MORE FRAMES TO WEIGH BEFORE THE TEAM CHOOSES".
  - It's up from 80.0 s to the end (390: "More frames to weigh before the team chooses.", from 79.7 s).
  - That leaves 5.5 s before the check's caption, against the 4.17 s its 8 words need.
- **The reviewer labels:**

  | Version | 1440×900 | 1366×657 | 1280×720 |
  |---|---|---|---|
  | Workplace, "THE MANAGER" / "ASKS" | y 201 and 218 | y 165 and 179 | y 183 and 198 |
  | Classroom, "THE INSTRUCTOR" / "ASKS" | "THE INSTRUCTOR" 127 px wide, inside the 130 px box | — | — |

  - All three business casts wrap onto two lines over the question box at every laptop size.
  - In the stills at 1366×657 (beat 7) and 1280×720 (final frame) the labels sit clear of the lineup's bracket and the box's top edge.
  - PME's "FACULTY ASK" stays on one line.
  - Phones show a dashed box: "The manager asks: What frames are missing?".

## 5. Classroom and high school: pass

- **`node scripts/edition-check.mjs`:** no failures, exit 0.
- **Singular reviewer, no "Faculty":** I scanned every word each page shows: the page, beat list, summary, captions, and picture and stacked text across the run.
  - There's no "Faculty" or "seminar".
  - Every verb agrees with a singular subject: "The instructor sees that each holds up", "lines up", "doesn't see this", "asks what frames are missing", "Imagine the instructor sends them back…", "Instructor's check: What frames are missing across the class?", with "teacher" throughout the high-school version.
- **AI use disclosed:**
  - The setup says "The class allows AI, and each student says they used it."
  - Both runs carry "ALL DRAFTED WITH AI" to the end. On phones: "All drafted with AI".
- **The studies,** checked against the source spine:
  - Romasanta, Thomas & Levina (2026), "a study of AI models' strategy advice", with the authors' own quote and the paywall and coverage caveat;
  - Bottesch (2025), "99 knowledge workers from a multinational industrial corporation", with no effect sizes and a single author;
  - "Neither study looked at students."
- **High school's bike-company case,** at 1440 and 390:
  - the task "How should we respond to / a cheaper rival?";
  - the context "Its prices, our designs, bike shops, budget buyers, repairs.";
  - the AI line "Stand out on quality";
  - "ONE FRAME" over "STAND OUT";
  - lineup lines including "Can we stay the best?", "Is our service better?", "How do we stay ahead?" and "Why is ours special?";
  - goals "STAND OUT", "COMPETE ON PRICE" ("Can we sell for less?", "Who just wants cheap?", "Can we cut our costs?", "Who is leaving us?") and "TEAM UP" ("Should we team up?", "Who wants our designs?", "Could we sell to them?");
  - setup "a business class … how should a bike company respond to a cheaper rival?".
- **Observation, not counted:** the links note says "The failure mode and the instructor's (teacher's) check come from the original essay." The essay's check is a faculty check; the class wording is adapted from it.

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

- **Width:** `scrollWidth` was 390 at 390×844 throughout, including on the reduced page.
- **Console:** no errors, warnings or failed requests in any load. On the live load, autoplay started once the shot was in view.
- **Reduced motion:** under both the media query and `?reduced`, at 1440×900 and 390×844, every version opens at its end (1:39 / 1:39 PME, 1:34 / 1:34 business) with `.is-reduced`.
  - The check and its second line are at full opacity.
  - All 12 "On screen" lines are visible.
  - The visible picture text equals the `seek(duration)` frame.
