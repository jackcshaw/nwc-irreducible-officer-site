# Verify: institutional-monoculture, business edition, final fixes

**What I checked:** the four fixes requested after `business-figure-read-2.md`, judged against `storyboard-business.md` and the intent. Ten analysts draft with the same AI. Each plan passes review, but nearly all share the AI's one problem definition. The manager lines up the problem statements, sees one frame, and asks what else the problem could be.
**Page:** `figures/institutional-monoculture/index.html?edition=business`, served on 127.0.0.1:5483. The server was stopped afterwards.
**How I watched:** Playwright (Chromium, headless).
- I scrolled the shot fully into view and let it autoplay at 1280×900, 1280×720 and 390×844. I grabbed a frame every 0.5 s of wall time, logged the player time and caption with each frame, and read the frames as contact sheets.
- For pacing I seeked every 0.1 s and logged the caption and the effective opacity of every visible text, in the SVG and in the stacked view. Real-time caption changes matched the seeked times to within 0.5 s.
- I took held stills (`?t=`) at the key moments.

The scripts, frames and logs are in the session scratchpad (`im-biz-verify/`). Times below are player time (the name card takes 0–3 s).

**Verdict: all four fixes pass. All the extra checks pass.** The defects left are minor and listed under each item.

---

## 1. The plans' opening lines are problem definitions: PASS

- **First run.** All ten lines are questions in the differentiation frame:
  - How do we stand out? · Why pay more for ours? · Why are we worth more? · What can't they copy? · Where do we add value?
  - Can we stay premium? · Can we out-serve them? · Which features win? · Can we keep our edge? · What earns a premium?
  - They lift into the list from 28.9 to 35.3 s.
  - The caption "The manager lines up each plan's problem." and the check "Line up the problems." now match what's on screen.
- **Imagined run.** It keeps the first three lines and adds four in the cost frame (Can we win on cost? · Who buys on price? · Can we cut unit costs? · Who is switching?) and three in the partner frame.
- **The page note matches.** It reads "Each plan's first line is its problem statement: the question the plan sets out to answer".

Notes (minor):
- **10 of 10, not "nearly all".** The bracket encloses all ten lines and caption 5 says "each plan differentiates", while the AI card says "almost every outline opened". That's consistent, but no line sits outside the frame.
- **Two imagined lines read as options.** "License our designs?" and "Supply the rival?" (also, less so, "Should we partner?") are options with a question mark more than problem definitions. They're on screen from 77.9 s to the end, at every viewport.
- **390, beat 4, about 29–40 s (not fixed from read 2, item 9).** The two-column list wraps mid-phrase before the bullets appear, so "ours?", "more?", "value?", "them?" and "premium?" look like separate items. The hanging indent and the transparent bullet both come to 10 px, so a wrapped line lines up with a new item. Once the bullets arrive (about 40 s) the list reads correctly.

## 2. A visible step shows what the manager does with today's plans: PASS

- **Desktop, beat 8 (57.6–64.2 s).**
  - A navy line draws from the manager's dashed box ("What frames are missing?") down to the heading "SENT BACK: WHAT ELSE COULD THE PROBLEM BE?", which ends in an arrowhead. It's drawn from 60.3 s and complete by 60.6 s.
  - The heading arrives before the imagined run writes: the red "Define problem" lines start at 60.8 s.
  - The caption reads "Imagine the manager sends them back: what else could the problem be?"
- **The spread is the answer.** The three goal groups form directly under that heading (75.3–78.4 s) and stay there in the final frame, so the board reads as the answer to the sent-back question.
- **Phone.** "SENT BACK: WHAT ELSE COULD THE PROBLEM BE?" heads the imagined board from 60.1 s, under "The manager asks: What frames are missing?". There's no connector between the two, but the words carry the step.

## 3. The AI card and its frame are marked as not seen by the manager: PASS

- **Desktop.**
  - "NOT SEEN BY THE MANAGER" sits above the card "ALMOST EVERY OUTLINE OPENED / Differentiate on value" from 47.0 s to the end. It renders at 14.1 px at 1280×900 and 12.6 px at 1280×720.
  - The trace to the "AI'S FRAME" pill settles dashed at about 49.2 s.
  - The label is in the final frame at both desktop sizes.
  - It dims to 35% with the first run from 59 to 75 s, then returns.
- **Phone.**
  - The AI line reads "AI Almost every outline opened: *Differentiate on value* NOT SEEN BY THE MANAGER". It shows from 46.9 to 64.8 s and from 73.0 s to the end.
  - Between those times, beat 9 replaces the line with "The AI asks: …", by design.
- **Phone final frame (94 s).** It keeps the compact AI line and the compact first-run list: "How do we stand out? · Why pay more for ours? · Why are we worth more? · and seven more". It also keeps "ONE FRAME: DIFFERENTIATE · AI'S FRAME" and the manager's question. The player stays at 832 px.

Note (minor): the "AI'S FRAME" pill on the manager's bracket isn't labelled itself; only the dashed line ties it to the unseen card. That's enough for me, but a skimmer of the still could still read the pill as part of the manager's finding.

## 4. Pacing: PASS

The rule is (words ÷ 3) + 1.5 s, timed from the moment the text is fully shown. The 1280×720 and 390×844 runs have the same times as 1280×900.

| Beat | Caption up | Words | Needs | Result |
|---|---|---|---|---|
| 1 | 3.3–12.2 (8.9 s) | 6 | 3.5 | ok |
| 2 | 12.4–18.8 (6.4) | 12 | 5.5 | ok |
| 3 | 19.0–26.7 (7.7) | 12 | 5.5 | ok |
| 4 | 27.0–39.3 (12.3) | 7 | 3.8 | ok |
| **5** | 39.6–45.9 (6.3; beat 6.6) | 7 | 3.8 | ok |
| **6** | 46.2–53.1 (6.9; beat 7.2) | 13 | 5.8 | ok |
| 7 | 53.4–57.6 (4.2) | 7 | 3.8 | ok |
| 8 | 57.9–64.2 (6.3) | 12 | 5.5 | ok |
| **9** | 64.5–72.0 (7.5; beat 7.8) | 12 | 5.5 | ok |
| 10 | 72.3–85.6 (13.3) | 10 | 4.8 | ok |
| Close | 86.0 to the end and held; follow-up from 88.6 | — | — | stays |

**New texts in the key beats:**
- Beat 5: "ONE FRAME: DIFFERENTIATE" is fully shown at 42.0 s, 3.9 s before the caption changes (it needs 2.5 s), and stays up to 59.0 s.
- Beat 6: the card and the unseen label (12 words, needing 5.5 s) are fully shown at 47.0 s, 6.1 s before the caption changes, and stay to the end.
- Beat 9: the AI's two questions are on screen from 67.1 to 73.4 s (6.3 s, against 4.2 s for both together).

**Texts that leave the screen.** Every one stays up long enough:
- on phones, the context items stay 19–22 s;
- the full first-run list stays 23–30 s;
- "The AI asks: …" stays 6.2 s;
- "All drafted with AI" stays 5.5 s.

Every other text stays to the end.

**Run length:** 94.0 s in the player. Real-time autoplay took 94.2–94.6 s of wall time.

Notes (minor):
- **390, about 73.1–75.0 s.** The ticks on the imagined plans are on screen only 1.0–1.9 s before the paper rows give way at 75.0 s. The last five are under 1.5 s. They're glyphs, not words, but they carry "These hold up too" on phones.
- **Beat 6 holds the most reading.** The caption (13 words), the card (12) and the tag (2) all arrive in 7.2 s. That passes the per-item rule, but it's still the densest beat.

---

## Other checks

- **The picture animates at 1280×720: PASS.** It isn't stacked (the SVG is 523 px tall), the frames show the full motion, and the shot and controls fit in 711 px.
- **No horizontal scroll at 390: PASS.** `scrollWidth` stayed at 390 in all 941 seeked samples and all 193 real-time frames.
- **No console errors: PASS.** There were none in any run: the business edition at all three sizes, PME, the six reduced-motion views and the timelines. There were no failed requests either.
- **Reduced motion: PASS.** I checked `?reduced` and `prefers-reduced-motion: reduce` at 1280×900, 1280×720 and 390×844. All six open at 1:34 with the full close at opacity 1: the name, the definition, "What frames are missing across the team?" and "Line up the problems. What else could the problem be?". The source line is visible (in the SVG on desktop, under the controls on phones). "NOT SEEN BY THE MANAGER" is at opacity 1, and all 12 beat details are visible. The phone view also shows the kept AI line and the compact list.
- **PME (no `?edition`) still plays: PASS.**
  - It autoplays and runs to 1:39 (99.3 s) with no errors. It shows the "?" box and "ONE IMAGINED SPREAD", with no unseen label and no sent-back line.
  - Frame-diff against `regression/baseline`: 208 identical and 16 different. All 16 differences are at 390×844 and are small (16–1774 px). I traced the largest three: they sit in the pulse rings (box-shadow on a paper glyph, the AI line or the "?" box), so they come from transition timing at capture, not content.
  - The 73 baseline files at 1366×657 have no capture to compare, because the current script captures 1440, 1280 and 390 only.
- **Nothing implies "differentiate" is wrong: PASS.**
  - The imagined board keeps DIFFERENTIATE (3 of 10).
  - The page says "a different frame isn't better by itself. A team can compare several frames and still agree on one".
  - The marking says "not seen", not "wrong".
  - One slight nudge, in page copy rather than the figure: the study section follows the trendslop quote ("buzzy ideas over reasoned solutions") with "The figure's AI frame, 'Differentiate on value', follows that reported default".

## Runtime and loading oddities (reported separately)

The shared runtime is mid-change (the loading gate and noscript).
- **Slow mounts.** Two of five watch loads took 5.7 s and 8.5 s to mount, both while two browsers ran in parallel. Six sequential loads afterwards revealed the page in 0.35–0.39 s and mounted in 0.39–0.44 s, with no failed or slow requests. I couldn't reproduce the slow mounts.
- **The gate.** After load `html` has `data-ed-gate` and no `ed-pending` class, and the edition's copy is in place. The page never stayed hidden.
- **Hitches.** A plain playback run (no screenshots) showed 0.2–0.42 s main-thread hitches at points that didn't repeat: 35.3 s and 81.4 s at 720, 28.3 s and 55.35 s at 900. The cold read's 0.6 s stalls at about 46 s and 52 s didn't recur at those times.
- **Poster.** Before autoplay the time readout still shows "0:26 / 1:34" (cold read 2, item 10). That's unchanged.

## Still open from cold read 2 (not in this fix list)

- **Caption orphans at 1280×900:** "alike." (beat 2, 12.4–18.8 s) and "up." (beat 3, 19.0–26.7 s) sit alone on the second line.
- **Beat 9 on desktop:** the AI's question bubble still has no "The AI asks:" label.
- **Phone source line:** it sits just below the 844 px viewport (848–888) when the player is in view, flush with the box edge.
- **Phone beat 4:** the list still wraps mid-phrase (see item 1).
