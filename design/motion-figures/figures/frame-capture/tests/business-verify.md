# Verify: frame-capture figure, business edition, round 3 fixes

**Verifier:** not a cold reader. I checked the fixes requested in `business-figure-read-2.md` against the intent in `storyboard-business.md`.
**Build:** commit `b0c0679`, served locally on port 5348 (now stopped).
**Method (Playwright):**
- **Real-time runs.** One run each at 1280×900, 1280×720 and 390×844, plus PME at 1280×900. The player was wheel-scrolled fully into view and allowed to autoplay. I captured a viewport frame every 0.5 s through the whole run, 199 frames for business and 180 for PME, and logged the caption, state and `scrollWidth` with each frame. The clock stayed within −0.2/+0.05 s of wall time.
- **Seek pass.** A pass through 70–98.8 s at 1280×900 in 0.1 s steps. At each step I logged the opacity of key picture texts and the per-region pixel change on a 3×3 grid over the stage, which shows what moves when and where.
- **Other checks:**
  - a keyboard pass and a scroll-only pass, at all three sizes and in PME;
  - a page-copy scan;
  - a load-time check of the edition note;
  - the repo's `frame-diff.mjs` for PME;
  - the page quotes compared with the PubMed abstract (PMID 31649194) and the Crossref editor's summary (doi:10.1126/science.aax2342).

All times below are on the player clock (figure clock + 3.0 s). Scripts and frames are in the session scratchpad (`fc-verify/`).

## Verdict

| # | Item | Result |
|---|---|---|
| 1 | Old beat 12 staged | **Fail**, on one sub-criterion and at 390 (see below) |
| 2 | Beat 11 reveal near the start | **Pass** |
| 3 | Final frame alone shows the point | **Pass** |
| 4 | Source line: faithful, legible at 390, in the player | **Pass** |
| 5 | Accuracy wording | **Pass**, with one risk flagged |
| 6 | Business page | **Fail** (minor): the rendered copy passes; the served HTML and the load don't |
| 7 | Runtime: focus stops autoplay | **Pass** |
| — | Run under about 100 s | **Pass**: 98.8 s (figure clock 95.8 s) |
| — | No horizontal scroll at 390 | **Pass**: `scrollWidth` 390 in all 199 frames |
| — | No console errors | **Pass**: 0 errors and 0 warnings across every run |
| — | PME still plays normally | **Pass** |

---

## 1. The old beat 12, now beats 12–13

### 1a. One thing at a time: pass (picture stage)

The pixel-change log shows only one stage region moving at any 0.1 s step. The caption changes are the only overlap.

| Player s | Region | What appears |
|---|---|---|
| 78.25 | caption | beat 12 caption (14 words) |
| 78.55–78.95 | right | "What would change it?" |
| 79.45–79.85 | right | "THE CHECK / Two patients, same predicted cost:" |
| 80.15–80.85 | right | Patient A and B, two equal cost bars, the legend |
| 81.15–82.25 | right | chronic-condition dots, one by one (2, then 5) |
| 82.55–82.95 | right | "Checked: at the same predicted cost, some patients are sicker." |
| 85.05 | caption | beat 13 caption (16 words) |
| 85.65–86.65 | middle | chip swap (chronic illness in, next year's costs out) |
| 87.05–88.45 | top | second ranking rewritten, "Which patients are sickest?" |
| 88.95–89.35 | left | "↓ Sicker patients ranked lower" on the first ranking |
| 89.65–90.05 | left | "NOTHING TO CHECK" |
| 92.1 | caption | ending text; source lines fade in at 93.1–93.6 |

### 1a. Reading pace (3 words/s + 1.5 s for every caption and new on-screen text): fail

- **Captions pass.** Beat 12 runs 6.8 s and needs 6.17 s; beat 13 runs 7.05 s and needs 6.83 s. Every other caption in the run also meets its time; the tightest is beat 8, at 4.85 s against 4.83 s.
- **New on-screen text doesn't get its time** before the next text or motion arrives. All at 1280×900 and 1280×720; the clock is the same at 390.

| Text (words) | Needs | Gets before the next change | At |
|---|---|---|---|
| "What would change it?" (4) | 2.8 s | 0.9 s, then the panel | 78.55 |
| "THE CHECK / Two patients, same predicted cost:" (6) | 3.5 s | 0.7 s, then the patient rows | 79.45 |
| Patient rows and legend (8) | 4.2 s | 1.0 s, then the dots; 2.4 s to the next text | 80.15 |
| "Checked: … some patients are sicker." (10) | 4.8 s | 2.5 s, then the caption changes | 82.55 |
| "Which patients are sickest?" (4) | 2.8 s | 1.9 s, then the callout | 87.05 |
| "Sicker patients ranked lower" (4) | 2.8 s | 0.7 s, then "Nothing to check" | 88.95 |
| "NOTHING TO CHECK" (3) | 2.5 s | 2.45 s, then the ending caption | 89.65 |

- **Sequential reading need:** beat 12 needs about 21.5 s and has 6.8 s; beat 13 needs about 15 s and has 7.05 s.
- **Mitigation:** the result line and the callout repeat the caption's words, so a reader who read the caption loses less than the table suggests. The staging is clean. Only the pace fails.
- **Options:**
  - longer holds between the right-column steps;
  - fewer words in the panel, since "Two patients, same predicted cost:" repeats the caption;
  - a pause before the callout and before "Nothing to check".

### 1b. No plain-language gaps: pass

- "The condition holds" is gone everywhere: the picture, the stacked view, the beat list, the screen-reader summary and the page.
- The result line says what the check found.

### 1c. The check draws two patients with equal predicted cost and different numbers of conditions: pass at 1280; fail at 390

- **At 1280×900 and 1280×720:** two equal grey cost bars, with 2 and 5 dots and a legend ("predicted cost", "chronic condition"). At 720 the panel text renders at 11.1 px.
- **At 390×844:** the stacked view has no drawing. The check appears only as words at the end of the red note, "Checked: at the same predicted cost, some are sicker." (from 82.55). So on phones the comparison still exists only in words, which is the cold read's problem 4.

### 390-only motion defects (minor)

- **88.95:** inserting the callout pushes everything below it down 23 px, including the ask line, both columns, set-aside and the note.
- **92.1:** "Why this frame? What would change it?" is removed, and both columns jump up one line while the caption changes.

## 2. Beat 11's reveal: pass

- 72.6: beat 11 begins.
- 73.6–74.0: the ask fades in (1.0 s in).
- 74.4–75.3: both foundations slide in (1.8–2.7 s in).
- 75.3–78.25: a still view of 2.95 s for comparing them before beat 12.

The old version had a 3 s dead stretch before the reveal and 1.5 s after it. The dead stretch is gone.

## 3. The final frame alone: pass

- **At 98.8 s, on desktop at both sizes:** the first ranking, "Which patients cost the most?", carries a red boxed "↓ Sicker patients ranked lower". "Nothing to check" sits under its grey frame. It stands beside "Which patients are sickest?", which has change bars, the chosen frame and the check.
- **At 390:** the stacked final view shows "↑ Sicker patients ranked lower" under the first analyst's box.
- **Nit:** the phone uses ↑ (pointing at the box) and the desktop uses ↓ (pushed down). "↑ … ranked lower" can read as contradictory for a moment.

## 4. Source line: pass

- **Wording:** "In the study, at a given risk score, Black patients were considerably sicker than White patients." The abstract reads "At a given risk score, Black patients are considerably sicker than White patients, as evidenced by signs of uncontrolled illnesses." The only changes are the tense and the dropped clause.
- **At 390:** it's inside the player, in the stacked view's last section. It sits at y 427–482 in an 844 px viewport with the player in view, at 13 px italic in ink colour. The stacked view is never clipped at any 0.5 s step, and the old under-controls copy stays hidden.
- **Desktop:** at the stage's bottom left, 14.1 px at 1280×900 and 11.1 px at 1280×720 (small, but readable).
- **Small gap:** the picture says "predicted cost" and the source line says "risk score". Only the page's evidence section says the two are the same.

## 5. Accuracy wording: pass, with one risk

- **Accuracy:** the page uses "by some measures of predictive accuracy" (quoted) and the paraphrase "by some accuracy measures". "Passed the usual accuracy tests" is gone.
- **Quotes:** all six quotes on the page match their sources word for word.
  - Five match the PubMed abstract.
  - The reformulating quote ("Reformulating the algorithm so that it no longer uses costs as a proxy for needs eliminates the racial bias…") matches the *Science* editor's summary in the Crossref record. The page attributes it to "*Science*'s editor's summary" and "the journal's editor's summary", which is correct.
- **Chronic illness:** the page says "Chronic illness is this illustration's measure of need, not the study's." That meets the brief.
- **Risk:** "not the study's" can be read as a claim about the study, and it may be wrong. A secondary summary of the paper (University of Heidelberg lecture slides; I couldn't open the full text) shows the study plotting the number of active chronic illnesses against risk score (its Fig. 1). The same slides list "health = number of chronic conditions" as one of its alternative labels. Safer wording: "The abstract measures sickness by signs of uncontrolled illness; the figure's count of chronic conditions is this illustration's choice." Check this against the full text before publishing.

## 6. Business page: fail (minor), on load and in the served HTML

**The rendered page passes:**
- **Note:** the PME note is hidden (`page.editionNote: null`).
- **Wording scan:** a scan of the visible text, screen-reader text, title and meta finds one original-essay link, "The original essay: The Irreducible Officer, Section II", and the "PME" switch label. It finds no other military or classroom words.
- **Meta description (after JS):** "An analyst builds on an AI's reasonable first frame, and the finished ranking can't show who chose it. One question can."
- **Bridge sentence:** in the setup: "It can happen whenever a measure stands in for what you actually care about, like sales for customer value or tickets closed for problems solved."

**Remaining defects:**
1. **The PME note is still hard-coded and shows on load.**
   - The static HTML keeps the note as the no-JS fallback.
   - Before the edition loads, it's the only text above the figure: "PME (professional military education): … National War College essay."
   - Locally it paints for about 200 ms after first paint (204–402 ms); with a 300 ms delay on the JSON, it shows for about 400 ms. On a real network the delay is the JSON, casts and Google Fonts load, so longer.
   - When it hides, the figure jumps up 24 px.
   - Evidence: `flash-before-fill.png` in the scratchpad.
2. **The static meta description is still PME/classroom wording:** "A teaching figure: a student builds on an AI's reasonable first frame, and the finished paper can't show who chose it." Link unfurlers that don't run JS show this for the `?edition=business` URL. The cold read named link previews.
3. **"PME" in the edition switch** is military shorthand, and with the note gone nothing on the business page explains it. It's kept by design (storyboard §6), so it's Jack's call.

## 7. Runtime: pass

- **Keyboard:** from the top of the page, Tab goes brand → Essay → Practice → Workplace → PME → Play.
  - Focusing Play scrolls the player into view. After a 1.5 s wait it is still on the poster (12.6 s, label "Play", no autoplay).
  - The first Enter plays (1.2 s later: playing, "Pause"); the second Enter pauses.
  - Same at 1280×900, 1280×720, 390×844 and in PME.
- **A reader who just scrolls:** autoplay still fires, at scrollY 420 (1280×900), 480 (720), 600 (390) and 360 (PME). Clicking Play also plays on the first click.
- **Remaining, outside this fix:** after tabbing to Play, the top of the stage is above the viewport (stage top at −334 px at 1280×900, −301 px at 720 and −323 px at 390). A keyboard reader starts the figure with part of the picture cut off.

## Also checked

- **Run length:** 98.8 s at all three sizes; it ends with "Replay" and the final frame stays up.
- **No horizontal scroll at 390.** `scrollWidth` stays at 390 throughout.
- **No console errors or warnings** in any run: 4 real-time runs, the keyboard passes and the copy scan.
- **PME:**
  - plays to 89.2 s and ends;
  - autoplays, and the keyboard pass passes;
  - shows its note, and no business elements leak in;
  - `frame-diff.mjs` against `regression/baseline`: 202 of 203 frames identical, and one (390×844, t 25.98) differs by 2 px, which is raster noise. An earlier run, made while other sessions were running frame-diffs, showed scattered 10-px differences at 390 that didn't reproduce.

## Remaining defects, by priority

1. **Pace:** new on-screen text in beats 12–13 gets 0.7–2.5 s against 2.5–4.8 s needed (78.55–90.05 s, all sizes).
2. **The check isn't drawn on phones:** at 390×844 it's words only (from 82.55 s).
3. **Load:** the PME note flashes, then a 24 px jump. The static meta is PME/classroom wording (all sizes).
4. **Phone layout jumps** at 88.95 s (+23 px) and 92.1 s (−1 line), 390×844.
5. **Wording risk:** "not the study's" for chronic illness may misstate the study. Verify against the full text.
6. **Nits:** phone ↑ against desktop ↓ on the callout. "Risk score" against "predicted cost" in the picture. The keyboard focus scroll cuts off the top of the stage.
