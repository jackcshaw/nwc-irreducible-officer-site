# Uncalibrated reliance: final verification

October 30, 2026. I'm a verifier, not a cold reader. I checked the polish, wording and classroom round against the intent in `storyboard.md`, `storyboard-business.md` (sections 10 and 11) and `tests/classroom-read-2.md`. This is a report only: no figure files changed. It replaces the earlier `final-verify.md` (October 28) in full.

**Build:** branch `motion-figures` at `7e607cb`. The figure's files were clean; the only modified file in the tree was another verifier's report.

**Method:**
- **Server:** `python3 -m http.server 5361 --bind 127.0.0.1`, stopped afterwards.
- **Browser:** Playwright Chromium from the site repo, one browser at a time, closed between viewports.
- **Versions:**
  - PME: no query, cast `seminar`;
  - workplace: `?edition=business`;
  - classroom: `&cast=classroom`;
  - high school: `&cast=high-school`.
- **Sampling:** I seeked with `window.__motionFigures[id].seek(t)` every 0.1 s at 1440×900 and 390×844 (937 samples per version). Each sample recorded the caption and every visible text, using effective opacity, clip-path reveals and rendered size (`getScreenCTM`). On the stacked stage I recorded text by block, plus text rectangles and page width. I saved a still of the shot every 0.5 s (188 per version and size). At 1280×720 and 1366×657 I sampled every 0.5 s.
- **Pacing rule:**
  - a caption needs (words ÷ 3) + 1.5 s inside its beat;
  - a new text needs the same time on screen at 50% opacity or more, counted from when it first appears;
  - a hand-off to the same words in another element counts as one stretch;
  - text that stays to the end passes.
- **Other checks:**
  - reduced motion, both the emulated media query and `?reduced`, compared with `seek(duration)`;
  - every switch link, followed from all four versions;
  - a live load with no seek, for autoplay and the console;
  - PME frame-diffed against `regression/baseline` with `scripts/frame-diff.mjs`. Captures went to the scratchpad; the baseline was read only.

Times are on the player clock (figure time + 3.0 s), as the readout shows them. The run is 93.6 s in every version.

## Verdict

| # | Item | PME | Workplace | Classroom | High school |
|---|---|---|---|---|---|
| 1 | PME polish (no change expected) | **Pass** (209/209 frames identical) | — | — | — |
| 2 | Drawn picture, labels ≥ 11 px at 1280×720 and 1366×657 | **Pass** | **Pass** | **Pass** | **Pass** |
| 3 | Pacing at 1440×900 and 390×844 | **Fail** (minor, 1440 drawn stage) | **Pass** | **Pass** | **Pass** |
| 4 | Workplace wording | — (none listed for UR) | — | — | — |
| 5 | Classroom and high school | — | — | **Fail** (minor wording: the study) | **Fail** (same) |
| 6 | Switch and `aria-current` | **Pass** | **Pass** | **Pass** | **Pass** |
| 7 | 390 width, console, reduced motion | **Pass** | **Pass** | **Pass** | **Pass** |

## Defects

1. **PME, 1440×900 (and every drawn stage), 34.4–35.8 s.** The second dot's label, "Second student", is up 1.5 s; 2 words need 2.17 s.
   - It fades with the dot's `bLabel` timing, and the dot then travels unlabelled until the names return at 76.4 s.
   - "SECOND STUDENT'S BRIEF" appears at 34.9 s and stays, so the words remain readable nearby. The label naming the person doesn't.
   - The workplace and classroom versions avoid this with `labels.dot.keepB`. PME was left unchanged in the polish pass, so this predates the round.
   - On the phone stage, "Second student" stays from 34.9 s to the end.
2. **Classroom and high school, page and picture (all viewports; the panel runs 62.9–72.1 s).** The study is described as shop owners, but its sample was entrepreneurs.
   - Where it appears:
     - the panel heading, "A REAL STUDY OF SHOP OWNERS" (phone: "A real study of shop owners");
     - the setup, "a study of shop owners in Kenya";
     - evidence paragraph 2, "It's a study of shop owners advising their own businesses."
   - Why it's wrong:
     - The source spine and the panel's own source line say "Kenyan entrepreneurs".
     - The same page's fourth paragraph says the businesses ranged "from fast-food joints to poultry farms to cybershops".
     - The study's owners didn't advise anyone; the AI assistant advised them.
     - The storyboard's own Lesson 11 asks for the sample to be described accurately.
   - The workplace edition's paragraph 2 doesn't have this sentence.
   - Suggested wording: "a study of entrepreneurs in Kenya", "A REAL STUDY OF SMALL-BUSINESS OWNERS", and "It's a study of entrepreneurs acting on AI advice for their own businesses."

Neither defect blocks the point landing, but both fail the rule as briefed.

## 1. PME polish: pass

- No PME change was expected. `node scripts/frame-diff.mjs uncalibrated-reliance diff figures/uncalibrated-reliance/regression/baseline <scratch> --hide=".fig-editions,.fig-edition-note" --freeze` reported **209 compared, 209 identical**.
- That baseline was taken at 11:02, before the classroom read-1 and read-2 core changes (`labels.finalTags`). PME therefore draws exactly as before those changes.
- A capture with `--disable-partial-raster` differed from the baseline by 1–145 anti-aliasing pixels on the frontier line and card edges. Two captures with that flag were identical (209/209), so the flag accounts for the difference, not the code.

## 2. Laptops: pass

| Size | PME | Workplace | Classroom | High school |
|---|---|---|---|---|
| 1280×720 | drawn, 11.10 px | drawn, 11.10 px | drawn, 11.10 px | drawn, 11.10 px |
| 1366×657 | drawn, 11.03 px | drawn, 11.03 px | drawn, 11.03 px | drawn, 11.03 px |

- Each cell gives the stage mode and the smallest visible picture text at any settled sample ("EXAMPLE TASK").
- `.is-stacked` and `.is-narrow` were off in all 188 samples of every version at both sizes.
- At 1440×900 the smallest label is 14.06 px.

## 3. Pacing: PME fails (defect 1); the other three pass

**Captions.** Every caption meets (words ÷ 3) + 1.5 s in all four versions.
- The tightest is classroom and high-school caption 5, "Another student asks the same AI the same questions, then checks each answer at its source.": 16 words need 6.83 s, and the beat is 7.3 s.
- Workplace and PME's tightest is caption 3: 12 words need 5.5 s in 7.5 s.
- The check's second line arrives at 90.3 s and the player then rests on the final frame, so it stays up.

**New text, 1440×900.** I checked 67–76 texts per version, 51–61 of which leave the screen before the end.
- Workplace, classroom and high school: no shortfalls, including:
  - the working marks;
  - the panel lines;
  - "FLYER ONLY" (from 53.7 s);
  - "COVERED BY ITS INPUT" and "NEEDS FACTS IT WASN'T GIVEN" (from 55.6 s);
  - the per-part tags (76.9 s and 83.4 s);
  - the typed answers.
- PME: defect 1 only.
- Taken as one block, PME's study panel is 25 words in 9.3 s (62.9–72.1), against 9.8 s at 3 words a second. Every line meets the rule on its own, which is the convention ("each label or panel line"). I note it but don't count it.

**New text, 390×844.** No shortfalls in any version, PME included. The study overlay's lines (63.1–72.1 s) each meet the rule. The scene dims under the overlay and returns.

## 4. Workplace wording

Not on UR's list. The workplace captions and check render as in `storyboard-business.md` section 4, and the check's follow-up is "Ask part by part: was the evidence about that part?"

## 5. Classroom and high school: fail on one wording item (defect 2); the rest passes

- **`node scripts/edition-check.mjs`:** "8 figures, 16 editions … Listed casts: no failures", exit 0.
- **Singular reviewer, no "Faculty":** I scanned every word each page shows: the page, beat list, summary, every caption, and all picture and stacked text across the run.
  - There's no "Faculty" or "seminar" in either cast.
  - Every reviewer verb agrees with a singular subject: "The instructor, who sees only the plans, asks what each part rests on and why customers left.", "The teacher sees only the plans and asks about each part.", "Instructor's check" and "Teacher's check".
- **AI use disclosed:**
  - The setup says "The class allows AI, and the students say they used it."
  - On screen, the key "AI-DRAFTED (DISCLOSED)" with "A STUDENT'S CHECKS AND EDITS" shows from 73.4 s to the end. On the phone it reads "AI-drafted (disclosed) ● Checks and edits".
- **The study:** the figures match the source spine: "nearly 10% worse", "may have gained over 15%" (less certain), the null average, "over 0.20-standard-deviations", 640 entrepreneurs, and the exploratory label. The setup and paragraph 2 say no students took part. The sample's wording fails (defect 2).
- **The case packet:**
  - The setup gives every student "the same case packet": two battery quotes, the rival's flyer and the sales records "as a separate exhibit at the back".
  - On screen: BATTERY QUOTE ×2, RIVAL'S FLYER and SALES RECORDS, with "SHOP'S SALES / Lost: rush jobs / (not given to AI)" from 44.0 s.
- **Why the records stay out:**
  - The setup says "The second question seems to be about the rival's lower prices, so a student asks an AI and shares the quotes and the flyer."
  - Caption 1 says only that the records were left out. The reason is on the page, not in the animation, as section 10 of the storyboard intends.
- **Per-part tags,** written as each student answers and kept to the end:
  - "✓ CHECKED: QUOTES" on both Part 1s, from 76.9 s;
  - "USED AS IS" on the first student's Part 2;
  - "✓ CHECKED: RECORDS" on the second student's Part 2, from 83.4 s.
  - On the phone they read "✓ Quotes", "Used as is" and "✓ Records".
- **Phone:**
  - **No overlap.** A text-rectangle check every 0.5 s found none, apart from the study overlay's 0.4 s crossfade (72.0–72.4 s).
  - **Tags.** They sit as tabs on each card's top edge, clear of the names and the plan text (stills at 52 s, 83 s and 93.5 s).
  - **Key.** The compact key is one line.
  - **Player.** It fits 844 px.
- **Observations, not counted:**
  - The phone tabs are 11 px, under the 13 px stacked-stage size in CONVENTIONS.md but at the 11 px legibility floor.
  - The task card's "● Student" label stays to the end beside "Student 1" and "Student 2". Classroom read 2 (problem 5) raised it.

## 6. Switch: pass

- Every page reads "See this with: Workplace · Classroom · PME". The note on PME pages reads "PME (professional military education): the original example from *The Irreducible Officer*…"; the other pages hide it.
- **`aria-current`:**
  - PME page: PME;
  - workplace: Workplace;
  - classroom: Classroom;
  - high school: Classroom, whose link keeps `cast=high-school`.
- **Where the links land.** From all four pages:
  - Workplace goes to `?edition=business`: edition `business`, cast `workplace`, Workplace current.
  - Classroom goes to `cast=classroom`, or `cast=high-school` from the high-school page, with Classroom current.
  - PME goes to `?edition=pme`: cast `seminar`, PME current.

## 7. 390 width, console, reduced motion: pass

- **Width:** `scrollWidth` was 390 at 390×844 in all 188 rect samples and on the reduced page, in every version.
- **Console:** no errors, warnings or failed requests in any load: sampling, reduced, switch landings, or the live load. On the live load, autoplay started once the shot was in view ("0:01 / 1:33").
- **Reduced motion:** under both the emulated media query and `?reduced`, at 1440×900 and 390×844, every version opens at 1:33 / 1:33 with `.is-reduced`.
  - The check and its second line are at full opacity.
  - All 11 "On screen" lines are visible.
  - The visible picture text equals the `seek(duration)` frame: none missing, none extra.

## Fixes after this verification (October 30)

1. **PME dot label (defect 1).** `editions/pme.json` sets `labels.dot.keepB`, as the other three versions do, so "Second student" stays by the second dot's home until the names appear. Sampled every 0.1 s at 1440×900, 1280×720 and 1366×657 it is up 34.4–62.6 s (the study panel dims it) and again from 72.1 s, handing off to the final names: the same spans as classroom and workplace. The only touch is a 0.1 s crossfade at 76.4 s with the speech panel arriving, as in the other versions. Frame diff against HEAD: only 1440×900 and 1280×720, t = 36–76 s, changed; 390×844, reduced and print are identical.
2. **The study's sample (defect 2), classroom and high school.** The setup says "a study of entrepreneurs in Kenya"; evidence paragraph 2 says "The entrepreneurs used the assistant for their own small businesses.", which matches paragraphs 1 and 4; the panel heading is "A REAL STUDY OF ENTREPRENEURS" (picture, phone label, beat 8's "On screen" line and the summary to match). "Small-business owners" was the brief's example, but `edition-check` flags "owners" in a classroom patch outside its allowlist, so the heading uses the study's own word. It fits: the heading ends at x = 386 in the 760-wide panel, and the phone label is one line at 390. The workplace edition never described the sample as shop owners or as advising, so it is unchanged (frame diff: 209/209 identical). Classroom and high-school frame diffs: only t = 64–72 s at all three sizes, plus the page, reduced and print stills (page copy and the beat list).

`regression/baseline`, `baseline-business-classroom` and `baseline-business-high-school` were recaptured.

---

## Recheck (October 30, after the 4.2 s name card)

**Build:** `d54d0cb`, served on port 5463 (stopped afterwards), one headless Chromium at a time. **Method:** a seek pass in 0.05 s steps (as in `../frame-capture/tests/final-verify.md`, Recheck), with "shown" measured from 50% opacity until the text leaves, plus the rendered page text. The player clock is now figure time + 4.2 s, so times are 1.2 s later than above. Scripts: scratchpad `recheck-final/` (`hold.mjs`, `copy.mjs`).

| Check | Needs | Result |
|---|---|---|
| PME, 1440×900: "Second student" by the second dot | 2.17 s | **Pass.** Shown **35.6–63.9, 28.3 s** (fully opaque from 35.75). The study panel dims it until 73.3. It is back 73.3–77.65 and hands off to the final name label, shown from 77.6 to the end. |
| Classroom and high school: the study described as entrepreneurs | — | **Pass.** Details below. |
| Name card kicker, "Failure mode 4 of 7" | 3.17 s, fully shown | **Pass.** Fully opaque and still 0–3.2 s (`RUNTIME-VERIFY.md`, Recheck). |

**The study's sample, classroom and high school** (identical in both):
- **Panel heading, 1440×900:** "A REAL STUDY OF ENTREPRENEURS", 14.06 px, shown 64.1–73.4.
- **Phone label, 390×844:** "A real study of entrepreneurs", on one line (17 px tall), shown 64.3–73.4.
- **Setup:** it ends "…its working paper, a study of entrepreneurs in Kenya. No students took part in it…".
- **Evidence paragraph 2:** after the abstract's quotation, "The entrepreneurs used the assistant for their own small businesses."
- **Evidence paragraph 4:** "It describes 640 entrepreneurs… The median entrepreneur was 26…".
- **Beat 8's "On screen" line:** "…a panel rises, headed "A real study of entrepreneurs"…".
- **"Shop owner(s)":** 0 matches on either page.

**Note, not a failure.** "Owners" still appears twice in the classroom and high-school pages, both times meaning the study's entrepreneurs:
- caption 8, shown under the panel, with its beat-list title and the screen-reader summary: "A real study suggests what mattered was which AI advice owners acted on.";
- the last sentence of evidence paragraph 4, which ends: weaker owners "sought help on more challenging business tasks."

These are accurate, but they don't use the heading's word. Workplace is unchanged ("A REAL STUDY, NOT THESE OWNERS").

The console showed 0 errors and 0 warnings on every load.
