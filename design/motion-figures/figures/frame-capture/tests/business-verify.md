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

---

## Recheck

**Scope:** items 1 and 6 above, after commit `efc3ccb`. The figure and the runtime have no uncommitted changes. Served locally on port 5363 (now stopped).
**Method (Playwright):**
- **Real-time runs** at 1280×900, 1280×720 and 390×844. The player was wheel-scrolled into view and left to autoplay. An in-page log recorded, every 100 ms, the clock, the caption, the visible picture text, the player's geometry, scrollY and scrollWidth.
  - Other sessions were running Playwright on the same machine. A first pass that also took a screenshot every 0.5 s slipped by up to 8 s in 84–102 s, so I discarded it.
- **Frames every 0.5 s** from 76 to 103.6 s at all three sizes. I took them by seeking the player clock, so the 0.5 s spacing is exact.
- **Seek pass** every 0.05 s, from 0 s at 390 and from 60 s on desktop. It logs each picture element's opacity, text and position, grouped into change episodes. The holds below come from it.
- **Load and failure paths:** every rendered frame from the start of the document is logged: `data-ed-pending`, page visibility, the PME note, and the figure and controls positions. Fifteen scenarios, plus a run with JavaScript disabled.

All times are on the player clock. Scripts, logs and frames are in the session scratchpad (`fc-recheck/`).

### Verdict

| # | Item | Result |
|---|---|---|
| 1 | Reading time for new picture text, 78–100 s | **Pass** at all three sizes; the margins are thin |
| 1 | 390: the check is drawn | **Pass** |
| 1 | 390: no layout jumps | **Pass** |
| 2 | No PME note flash on load, nothing jumps | **Fail**: clean on a fast local load, but the note still paints whenever motion.js arrives after first paint |
| 3a | `business.json` blocked | **Pass**: PME fallback shows at 0.45 s |
| 3b | `casts.json` blocked | **Fail**: un-hides at 0.17 s, but the page is blank |
| 3c | PME, no `?edition` | **Pass**: hidden for 0.28–0.37 s, then normal |
| 3d | JavaScript disabled | **Fail**: not hidden, but blank |
| 4 | Meta description | **Pass** |
| 5 | Chronic-illness wording | **Pass** |
| — | Run about 104 s | **Pass**: 103.6 s on the player clock; 104.4 s of wall time, including 0.8 s of lag from machine load |
| — | No horizontal scroll at 390 | **Pass**: `scrollWidth` 390 in all 1,055 samples |
| — | No console errors | **Pass**: 0 in every real-time run and every normal load |

### 1. Reading time: pass

The clock is the same at 1280×900, 1280×720 and 390×844, and the real-time logs match the seek pass within 0.2 s. As in the first verify, each hold runs from the start of a text's fade to the start of the next change. Caption changes count as changes.

| Text (words) | Needs | Appears | Next change | Gets |
|---|---|---|---|---|
| "What would change it?" (4) | 2.83 s | 78.25 | the panel, 81.10 | 2.85 s |
| "SAME PREDICTED COST", bars, dots and legend (7) | 3.83 s | 81.10 | the result, 84.95 | 3.85 s |
| "Checked: some patients are sicker." (5) | 3.17 s | 84.95 | the caption, 88.15 | 3.20 s |
| "Which patients are sickest?" (4; 6 with the "Chronic illness" heading on desktop) | 2.83 s (3.5 s) | 89.45 | the callout, 92.95 | 3.50 s |
| "Sicker patients ranked lower" and "NOTHING TO CHECK" (7; on phones "↓ Sicker ranked lower" and "Nothing to check.", 6) | 3.83 s (3.5 s) | 92.95 | the ending caption, 96.90 | 3.95 s |

- **The margins are only 0.02–0.12 s.** Each fade takes 0.4–0.6 s. Measured from full opacity, the first three texts get 2.45, 3.25 and 2.80 s, which is 0.35–0.6 s short. Any later retiming should keep the fade inside the hold.
- **The source lines** arrive at 97.9 s (24 words). They're the last change and the final frame stays up, so nothing cuts them off.
- **A residual outside the rule as written:** the frame swap.
  - It brings no new words. On phones, though, it changes text in place at 88.85 s: under Chosen, "Next year's costs" becomes "Chronic illness", and the set-aside line is rewritten. The title changes 0.6 s later, at 89.45 s.
  - On desktop, the chips travel from 88.45 to 89.25 s, and the rewrite starts 0.2 s after they settle.
  - The swap is the beat's key change, so it may deserve a hold of its own.
- **Context:** by design, the captions overlap the picture text. The beat 12 caption (14 words) and "What would change it?" both arrive at 78.25 s. Read in sequence, beat 12 needs about 16 s and has 9.9 s; beat 13 needs about 14 s and has 8.75 s. Each text meets the rule on its own.

### 1. 390: the check is drawn: pass

- From 81.10 to 81.70 s the check section draws itself:
  - "SAME PREDICTED COST";
  - two equal cost bars (56 px each), with 2 and 5 condition dots;
  - the legend, "predicted cost · chronic condition".
- "Checked: some patients are sicker." follows at 84.95 s.
- Frame: `shots/390x844/t086.0.png`.

### 1. 390: no layout jumps: pass

- **Real-time:** the geometry never changes across the run:
  - the shot: top 579 px, height 708 px;
  - the stacked view: 463 px;
  - the caption band: 222 px;
  - the controls: at 1287 px;
  - scrollY: 571.
- **Seek pass, 0–103.6 s:** at every 0.05 s step, the stacked view stays at 463 px and the controls don't move. No visible text moves mid-beat anywhere in the run, and the callout's space is kept from the start.
- **The content changes only at beat boundaries:**
  - 78.25 s: the check replaces the ask section.
  - 88.15 s: the ask section returns, with the result added to the note.

### 2. The PME note on load: fail

- **Fast local loads are clean.** In 12 plain loads, motion.js set `data-ed-pending` at 133–176 ms, before first contentful paint (156–828 ms). No frame showed the note.
- **Two more loads each rendered one frame with the note,** at 219 ms and 892 ms, before the attribute was set.
- **When motion.js arrives after first paint, the note paints.** Nothing hides the page until motion.js runs, because motion.js sets the attribute itself, from the end of the body.
  - **motion.js 400 ms late:** the note and an empty player show from 140 to 408 ms (18 frames). Then the page blanks, and refills with the figure 329 px lower (top 164 → 493 px). This happens at 1280×900 and at 390.
  - **motion.js 1 s late:** the note shows from 162 to 1001 ms. Evidence: `load/flash-motionjs-late-600ms.png`.
- **When the edition takes longer than the 4 s CSS fallback** (business.json 5 s late): the fallback reveals the PME note and an empty page from 4.16 s. The fill comes at 5.34 s, and the figure jumps from 166 to 493 px.
- **Fix:** set the attribute before first paint, either as `data-ed-pending` in the static `<html>` tag or with a one-line inline script in `<head>`. The CSS fallback still covers a failed load.

### 3. Failure paths: fail (2 of 4)

| Case | Result |
|---|---|
| (a) `business.json` aborted | **Pass.** It falls back to PME and shows at 453 ms (1280) and 434 ms (390), with the title, setup, PME note and a working figure (12 beats). The only console error is the aborted request. |
| (b) `casts.json` aborted | **Fail.** The un-hide works: the page is visible at 168 ms (1280) and 185 ms (390). But it's blank: no title, setup, figure, caption or beat list. The empty player reads "0:00 / 1:26", the business URL shows the PME note, and the console has an uncaught "Failed to fetch". The cause is `frame-capture.js` line 80, `Promise.all([loadEdition(root), document.fonts.ready]).then(...)`, which has no catch and no fallback. This predates the hide; `efc3ccb^` behaves the same. Evidence: `load/b-abort-casts.json-2.5s.png`. |
| (c) PME, no `?edition` | **Pass.** Hidden from 148 to 516 ms (1280) and from 144 to 424 ms (390), then normal. The note shows and nothing jumps. |
| (d) JavaScript disabled | **Fail.** The page isn't hidden, because nothing sets the attribute. But it's blank: the header, the "See this with" line, the PME note, an empty player with dead controls, and empty section rules. There's no `<noscript>`. This also predates the hide: the title and setup have been empty in the static HTML since the move to editions. Evidence: `load/d-nojs-390.png`. |

Two more paths, beyond the brief:
- **Both edition files blocked:** the PME fallback fetch throws outside the try, so `data-ed-pending` is never cleared. The page stays hidden until the 4 s CSS fallback, then shows blank.
- **`business.json` hangs:** the page stays hidden for 4.1 s, then shows blank with the PME note.

### 4. Meta description: pass

- **Served HTML (curl):** "Frame capture: an AI's reasonable first frame becomes the working frame, and the finished work can't show who chose it."
- **Business page, after JS:** "An analyst builds on an AI's reasonable first frame, and the finished ranking can't show who chose it. One question can."
- On the PME fallback (3a) it becomes PME's "A teaching figure: …", which is correct for PME.

### 5. Chronic-illness wording: pass

- **The evidence section renders:** "The figure uses chronic illness as its measure of need."
- "Not the study's" is gone from the page and from the screen-reader text.

### Remaining defects, by priority

1. **Blank pages.** Each of these leaves a blank page:
   - `casts.json` fails (3b);
   - JavaScript is off (3d);
   - both edition files fail;
   - an edition file hangs (blank after 4 s).

   Most of them show the PME note on the business URL. These predate the hide; it didn't cause them.
2. **Load flash.** The PME note paints, then the page jumps 329 px, whenever motion.js arrives after first paint or the edition takes longer than 4 s.
3. **Thin reading-time margins** in beats 12–13 (0.02–0.12 s). On phones the frame swap gets 0.6 s before the title changes (88.85 → 89.45 s).
4. **Outside this brief:** the same rule would flag several spots in earlier beats, such as "Why this frame?" (0.7 s, at 73.65 s) and drafts 2 and 3 (30.6 and 32.7 s). That matters only if the rule is meant to cover the whole run.
