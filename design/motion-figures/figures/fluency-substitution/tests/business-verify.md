# Fluency substitution: business edition, verification of the final fixes

Verifier: not a cold reader. I knew the intent: two junior associates hand in identical AI-assisted claims and both explain them, then an older patent turns up. The first falls back on the draft's plan, and the second reasons from their own note to a claim the draft didn't lead with.

Material: commit 8aac7ba ("fluency substitution business edition, final fixes"), `figures/fluency-substitution/index.html?edition=business`, checked against `tests/business-figure-read-2.md` and `storyboard-business.md`. Date: October 28, 2026.

**Verdict: items 1–5 pass. Item 6 passes everywhere except one short-lived line on phones (a minor defect that predates these fixes).** All the extra checks pass.

## Method

- **Server.** I served `design/motion-figures/` with `python3 -m http.server` on port 5291 (not 5199) and stopped it when done. My scripts are in my session scratchpad (`fs-biz-verify/`), not in this folder.
- **Real-time runs** at 1280 × 900, 1280 × 720 and 390 × 844, in headless Chromium through Playwright:
  - I scrolled the player fully into view and let it autoplay;
  - a sampler inside the page logged the playhead, the caption and its opacity, the follow-up's opacity and `scrollWidth` every 0.5 s (largest gap 0.64 s; 201–202 samples per viewport);
  - I also took screenshots of the whole viewport. Software rendering sometimes delayed these by 1–4 s, so for an exact frame every 0.5 s I also stepped the clock with `seek()`, every 0.5 s for layout and every 0.1 s for text lifetimes. The runtime renders each frame from the clock alone, so a seeked frame is the same as a played one.
- **Concurrent edits.** At 22:45, during my run, another session left uncommitted changes in this working tree:
  - a gate snippet in the page's `<head>`, plus a `<noscript>` block in `fluency-substitution/index.html`;
  - changes to how `runtime/motion.js` and `figures.css` load and reveal the page.

  I exported committed HEAD (identical to 8aac7ba for these files) to my scratchpad, served it on port 5294 and reran every check. The results match the working tree exactly, so the verdicts below hold for the commit.

## Results by item

| # | Item | Verdict |
| --- | --- | --- |
| 1 | The changed fact decides it | **Pass** |
| 2 | Same deliverable | **Pass** |
| 3 | Colour reveal has a caption, and the colours fit the key | **Pass** |
| 4 | Phone: full claims, one text size, edit marks | **Pass** |
| 5 | Citations and meta description | **Pass** (one caveat on link previews) |
| 6 | Pacing and run length | **Fail, minor:** one phone line (below) |

### 1. The changed fact decides it: pass

- **The answers.** Beat 9 (0:73.4) types the two answers in plain ink: "Then lead with the battery design." and "Then lead with the sensor that adjusts to each fabric."
- **The added fact.** At 0:80.1 the caption becomes "But the older patent covers the battery too.". At 0:80.5–0:81.0 the picture adds "It covers the battery too." under the changed fact: 17.3 px at 1280 × 900 and 15.5 px at 1280 × 720. On phones it runs on after the question.
- **Why the first answer is weaker.** The fallback the first associate chose is now visibly covered. A reader sees this from the words alone, with no colour, because the colours don't arrive until 0:86.3.
- **Not a straw man.** The first associate:
  - reads closely and agrees;
  - explains clearly in beat 7;
  - then takes the draft's own fallback in good faith. "As the draft says" is gone.
- **One thing a viewer has to infer.** Nothing on screen says the sensor claim *survives*. A viewer gets there by elimination: the older patent covers clothing and the battery, and the second associate's note says the sensor is what's new. Only the beat list says it outright. I judge that enough, but it is the point I'm least sure of.

### 2. Same deliverable: pass

- **The two papers.** With both in their cells (0:47), the SVG text of the two papers matches segment for segment:
  - "Claim reading through clothing broadly: / no earlier device does it. Narrower / claim: the sensor's fabric adjustment. / Fallback: the battery design.";
  - both are four lines, and the sheets are the same height.
- **No cut.** No red strike line appears at any moment, checked every 0.5 s at both desktop sizes. There is no lifted card or cut label.
- **No cut on phones either.** No `.fs-n-struck` element appears at any time. Both stacked drafts carry the same paragraph.
- **Note and claims agree.** The sensor appears in both papers as the narrower claim. That matches the second associate's note ("by adjusting its sensor to each fabric").

### 3. Colour reveal: pass

- **Caption.** Beat 11, "The colours show whose words these are.", is up from 0:85.7 to 0:91.3, and the colours fade in at 0:86.3–0:87.1. The key ("Written by AI" grey on a beige band, "Associate's own work" red) has been on screen since 0:11 and 0:30.3.
- **Colours at the end** (SVG fills):
  - the first associate's first answer is entirely grey on the band;
  - in the first associate's second answer, "Then lead with" and the closing quote mark are red, and "the battery design" is grey on the band;
  - both of the second associate's answers are red;
  - all three answer bands are at opacity 1.
- **No uncoloured words.** No answer word stays in plain ink after the reveal.
- **Underlines.** In beat 11 the first draft is underlined under exactly "reading through clothing", "no earlier device does it." and "the battery design", from 0:86.5 to 0:89.0. Those are the words the first associate repeated, so cold read 2's problem 6 is fixed.
- **Labels, not words.** The red column headers ("First associate", "Second associate") are names next to the red dots, not own-work text. PME uses the same convention. I don't count them against the key.

### 4. Phone (390 × 844): pass

- **Full claims.** From beat 6 (0:46.4) to the end, "Both handed in these claims" shows the whole paragraph. From beat 7 the label runs into the text (`is-flow`).
- **Nothing clipped.** At every 0.5 s sample there is no overflow in the paper section, the stacked stage or the caption band.
- **One text size.** Every answer segment, the AI's and the associates' alike, computes to 13.5 px before and after the reveal.
- **Edit marks.** With no cut there are none to keep, and no strike or edit mark appears at any time.
- **Fit.** The player is 842 px tall and fits the 844 px screen (controls end at 844 with the player 2 px from the top).

### 5. Citations on the page: pass, with a caveat on link previews

I checked each against the NBER PDF (WP 35720, revised October 2026):

- **Not public.** "not intended for publication" (p. 9, note 8) is verbatim from note 8 on printed p. 9.
- **"Exploratory."** The word is gone from the page. The qualitative work is now described in the paper's own words, "post-experiment interviews with treated participants and an LLM-based qualitative analysis of redlining submissions" (p. 29), verbatim from printed p. 29.
- **The p. 2 quote** now opens "Measured by unassisted judgment, only senior lawyers emerged from three months of AI use with improved capability" (p. 2), verbatim from printed p. 2.
- **Meta description.** In the rendered page it reads "Two associates hand in the same AI-drafted patent claims. Changing one fact shows which of them owns the reasoning."
- **Caveat.** The static fallback in `index.html` still reads "A teaching figure: two students hand in the same AI-drafted paper…". A link preview that doesn't run JavaScript, such as one for `?edition=business`, would show that text. Every figure works this way, and CONVENTIONS.md leaves per-edition static meta to the site build (INTEGRATION-PLAN.md §3.5). So the edition fix is complete, but the classroom wording in link previews remains until the site build ships per-edition meta.

### 6. Pacing: fail, minor (phone only)

**Captions.** Times below are when each caption is on screen. The rule is (words ÷ 3) + 1.5 s. Real-time sampling matched these times to within 0.5 s at all three viewports.

| Beat | Words | Needs (s) | Up (s) |
| --- | --- | --- | --- |
| 1 | 8 | 4.2 | 6.0 (0:03.0–0:09.0) |
| 2 | 12 | 5.5 | 8.7 |
| 3 | 10 | 4.8 | 8.8 |
| 4 | 12 | 5.5 | 8.5 |
| 5 | 15 | 6.5 | 11.4 |
| 6 | 9 | 4.5 | 6.0 |
| 7 | 8 | 4.2 | 14.5 |
| 8 | 3 | 2.5 | 6.5 |
| 9 | 10 | 4.8 | 6.7 |
| 10 | 8 | 4.2 | 5.6 |
| 11 | 7 | 3.8 | 5.6 |
| 12 | 21 + 9 (follow-up) | 8.5 / 4.5 | From 0:91.3 (follow-up from 0:94.8). This is the final frame, so it stays up after the run ends. |

**Text in the picture.** I tracked every text element frame by frame, every 0.1 s, and counted it as up only while fully shown:

- **Desktop.** At 1280 × 900 and 1280 × 720, all 46 text elements stay up for their reading time before they leave or the run ends. The note's 15 words, for example, are written by 0:32.3 and stay on screen to the end.
- **Phone.** At 390 × 844, 74 of 75 elements pass.

**Defect, phone only.** At 390 × 844, "Suppose it matches the first associate's draft word for word." (10 words, needs 4.8 s) fades in at 0:43.5. It is fully shown only from 0:44.3 to 0:46.4, then removed when beat 6 swaps the stacked layout: 2.1 s fully shown, 2.9 s counting the fade.

- **Mitigation.** Caption 5 carries the same sentence from 0:35.0 to 0:46.4.
- **Not new.** The line has the same timing in PME (the core's `sweep` against the beat-6 start), so it predates these fixes.
- **Possible fix.** Fade it in with the second draft (`T.sheetB`) instead of `T.sweep`, or keep the second draft's section through beat 6.

**Run length.** The run is 98.5 s (the readout ends at "1:38 / 1:38") at all three viewports, against 1:31 for PME.

## Also checked

- **The picture at 1280 × 720:** pass.
  - The drawn picture shows, not the stacked view. The SVG is 523 px tall, the controls end at 711 px, and the controls never move during the run.
  - The smallest text is 12.6 px.
  - Every beat animates (contact sheets reviewed).
- **No horizontal scroll at 390:** pass. `scrollWidth` is 390 at every sample, played and seeked.
- **Console errors:** none, in any business or PME run.
  - One full-Chromium run logged a 404 for `/favicon.ico`. That is the test server: the page links no favicon. The default headless shell doesn't request it.
- **Reduced motion:** pass, both with `prefers-reduced-motion` emulated and with `?reduced`, at 1280 × 900 and 390 × 844. Each opens on the final frame at 1:38 with a Play button, showing:
  - the name, definition, check and follow-up, all at opacity 1;
  - all four answers in colour, and "It covers the battery too.";
  - the source line (on the stage at 1280, under the controls at 390).
- **PME** (no `?edition`): still plays.
  - Autoplay starts, the clock advances (0:06 to 0:10) and the PME captions run ("1 / 10 A student gets a task…"). The length is 1:31, with no errors.
  - `scripts/frame-diff.mjs` against `regression/baseline` gives 206/206 frames identical (1440 × 900, 1280 × 720, 390 × 844, reduced and print).

## Observations outside the fix list

- **Phone, beats 4–5 (0:26.5–0:46.4).** The first associate's draft isn't on the stacked stage, only the second's note and draft. This is cold read 2's problem 5b, still open. The "Suppose…" line above is the only link between the two drafts on phones.
- **Phone, final frame.**
  - The source line sits at 854–873 px, just below the screen when the player fills it. That follows the storyboard ("just under the controls").
  - The task line is shortened to "Draft the patent claims: what do…" from beat 3 on, including the reduced-motion frame. This is the intended compact line.
- **1280, beat 5 (about 0:37–0:46).** The full-size second draft butts against the first column's sheet. Cold read 2's minor problem 9 is unchanged, with no overlap.
- **Another session's uncommitted `<noscript>` block** in `index.html` says "Faculty check: Can the student independently explain…". The business URL would show it without JavaScript, and it isn't part of 8aac7ba. I'm flagging it for whoever owns that change.
