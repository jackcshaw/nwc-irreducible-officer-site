# Verify: premature synthesis figure, business edition, round 3 fixes

**Verifier:** not a cold reader. I checked the fixes requested in `business-figure-read-2.md` against the intent in `storyboard-business.md` (round 3) and the Shen & Tamkin (2026) mapping: the first engineer follows AI Delegation, the second follows Conceptual Inquiry.

**Build:** figure files as committed in `33d24a3` (`premature-synthesis.js`, `editions/business.json`), served locally on port 5271 (now stopped). Partway through the session another session changed the working tree: `runtime/motion.js` and `runtime/figures.css` (unstaged), and `index.html` (staged: a `<head>` gate for edition text and a `<noscript>` block). Those changes cover how page copy is revealed and what happens when loading fails. They don't touch playback. The first real-time runs and the seek sweeps ran before the change. The reduced-motion checks and a second, sequential set of real-time runs ran after it. Both sets gave the same results.

**Method (Playwright):**
- **Real-time runs.** Business at 1280×900, 1280×720 and 390×844, run twice: once in parallel and once sequentially. PME ran at 1280×900 and 390×844. Each time the shot was scrolled fully into view and allowed to autoplay. I took a viewport frame every 0.5 s of wall time, 191–193 frames per run, and logged the caption, player time, `is-stacked` and `scrollWidth` with each frame. Autoplay fired in every run. The headless clock lagged wall time by up to 3.7 s over the whole run and never ran ahead, so readers get at least the nominal reading time.
- **Seek sweeps.** At each business viewport, 931 steps from 0 to 93.0 s in 0.1 s steps. At each step I logged the caption and every visible text item, in the SVG and on the stacked stage, with its effective opacity, its reveal fraction (for typed text) and its rendered px size. A screenshot was taken every 0.5 s (187 per viewport). The pacing figures below come from these sweeps.
- **Reduced motion.** Emulated `prefers-reduced-motion: reduce` and `?reduced`, at all three sizes, in both editions.
- **Sources.** The arXiv HTML of 2601.20245v2, its Figure 11 (an SVG, rendered to check the group averages and times), Anthropic's summary page, and the arXiv abstract of Brynjolfsson, Li & Raymond (2304.11771). Every request succeeded; nothing was blocked.

All times are on the player clock (figure clock + 3.0 s), as the time display shows them. Scripts and frames are in the session scratchpad under `ps-biz-verify/`.

## Verdict

| # | Item | Result |
|---|---|---|
| 1 | The cause, and the top group quoted accurately | **Pass** |
| 2 | Beat 3 no longer shows reviewing or tracing | **Pass** |
| 3 | Picture distinguishes redrawn from built; no clash with the definition | **Pass** (note at 390) |
| 4 | "Within the same time limit" | **Pass** |
| 5 | "Averaged 65%" | **Pass** |
| 6a | Caption 9 in sync | **Pass** |
| 6b | "MAIN" explained when it first appears | **Pass** |
| 6c | Second answer is a full sentence | **Pass** |
| 6d | Desktop shows why the fix lines fix the bug | **Pass** |
| 7 | Pacing: words ÷ 3 + 1.5 s | **Fail**: one short label on desktop, two short lines at 390 |
| 8 | Picture at 1280×720 with labels of 11 px or more | **Pass** |
| — | No horizontal scroll at 390 | **Pass** |
| — | No console errors | **Pass** |
| — | Reduced motion shows the final frame with full text | **Pass** |
| — | PME still plays | **Pass** |
| — | Quotes against the paper | **Pass** |

## 1. The cause: pass

- **Setup (rendered):** "One takes an AI's code as written, without asking how it works. … Who wrote the code isn't the difference; asking how it works is."
- **Caption 2 (9.8–18.5 s):** "The engineer reads the docs closely, then takes an AI's code without asking how it works."
- **Caption 3:** "The code runs, and the engineer ships it as written."
- **Study section, paragraph 5:** quotes Generation-Then-Comprehension (two people, 86%) and the authors' line that it "looks nearly the same as the AI delegation group, but additionally uses AI to check their own understanding." Both quotes match the arXiv HTML word for word, and 86% and n = 2 match the paper's text and Figure 11.
- **Wording tension (not a fail):** the setup says "Who wrote the code isn't the difference". The check follow-up ("The engineer who wrote the code, broke it and fixed it can say…") and the meta description ("only the one who wrote it, broke it and fixed it") credit writing as part of the bundle. A careful reader may notice the two lines pulling against each other.

## 2. Beat 3: pass

In the sweep frames at all three sizes, the first engineer's dot returns home at about 13.8 s and stays there. It pulses at 19.5–20.0 s, and all five grey lines turn solid together in 0.5 s, growing from one end with no dot on them. The dot goes straight to the write-up at 22.2–23.2 s. At no point does it travel along a line. At 390, all five chips turn from dashed to solid together at 20.0 s. At native resolution the solid lines read as solid; a faint dash texture shows only in downscaled thumbnails.

## 3. Redrawn versus built: pass (note at 390)

"Redrawn from the AI's code" (grey) appears under the first row at 61.1 s, and "Built, broken once, fixed" (red) under the second at 62.6 s. Both stay to the end, at 15.1 px at 1280×900 and 12.0 px at 1280×720. With the redrawn sketch labelled as the AI's map and only the second one called built, the final definition ("…before anyone has built the map") now reads as consistent with the picture rather than against it.

**Note:** at 390 the same distinction shows as sketch lines from 59.6/61.1 s, but `hideSketchAtEnd` removes them in the final beat (86.3 s on). The phone's final frame and its reduced-motion view therefore don't carry "redrawn" versus "built". Nothing on screen clashes with the definition; the distinction is just absent.

## 4. "Within the same time limit": pass

- Caption 6 (48.7–56.0 s): "That engineer ships the same code, within the same time limit."
- The setup and caption 4 say "the same time limit".
- `business.json` no longer contains "in the same time". "At the same time" survives only in the task ("fetch three records at the same time"), where it means concurrency.

## 5. "Averaged 65%": pass

The page says, of Conceptual Inquiry, "They averaged 65%". Figure 11 of the paper gives Conceptual Inquiry 65% and 22 min. It also gives AI Delegation 39% and 19.5 min, Iterative AI Debugging 24%, and Generation-Then-Comprehension 86% and 24 min, all as on the page.

## 6. Smaller fixes

- **6a, caption 9 in sync: pass.** The caption starts at 75.7 s. The second sketch's ring pulses at 76.0–76.4 s, "What they learned" and the note rise at 76.4–76.9 s, and the answer types out at 77.2–82.1 s. Caption 10 arrives at 86.3 s. The first change in the picture comes 0.3 s after the caption, down from 3.5 s.
- **6b, MAIN explained: pass.** "MAIN LINK" appears beside the heavy 2–5 line at 23.9 s (11.1 px at 720), 0.8 s before the paper's "MAIN · 2 · 5" tag at 24.7 s. At 390, "Main: 2 · 5" appears in the code box at 22.9 s, and "Its main connection: 2–5, the task group and the fetches." follows at 23.9 s.
- **6c, full sentence: pass.** The second answer reads: "If one fetch hits an error it doesn't catch, the group cancels the other two."
- **6d, why the fix works (desktop): pass.** "each fetch catches its own error" appears beside 1–4 at 45.1 s, and "a timeout counts as an error" beside 3–4 at 45.9 s. Both stay to 53.9 s, in red italic at 15.1 px at 1280×900 and 12.0 px at 1280×720. Together with "Bug: when one fetch failed, the group canceled the rest." above, a non-engineer can follow the cause and the fix. The 3–4 note sits just right of card 4, so it could read as a note on card 4 itself, but it is close to its line.

## 7. Pacing: fail

**Captions: all pass.** The sweep gives the same times at every size.

| Caption | Player s | On screen | Needs |
|---|---|---|---|
| 1 | 0.0–9.8 | 9.8 s | 4.8 s |
| 2 | 9.8–18.5 | 8.7 s | 6.8 s |
| 3 | 18.5–27.7 | 9.2 s | 4.8 s |
| 4 | 27.7–39.4 | 11.7 s | 8.5 s |
| 5 | 39.4–48.7 | 9.3 s | 5.5 s |
| 6 | 48.7–56.0 | 7.3 s | 5.2 s |
| 7 | 56.0–63.9 | 7.9 s | 4.8 s |
| 8 | 63.9–75.7 | 11.8 s | 5.2 s |
| 9 | 75.7–86.3 | 10.6 s | 5.2 s |
| 10 | 86.3 to end | rests | — |

**New on-screen text: three items are short.** Text that stays to the end of the run counts as passing.

1. **"Second engineer" (the dot's label), 29.4–30.0 s, at 1280×900 and 1280×720.** It is on screen for 0.7 s and needs 2.2 s. It fades with the core's `labelBOut` timing, which PME shares ("Second student"), so the problem predates round 3. Caption 4 names the second engineer at the same moment, so nothing is lost, but the label only flashes.
2. **390 only: "Its main connection: 2–5, the task group and the fetches.", 23.9–27.6 s.** It is on screen for 3.8 s and needs 4.8 s. Beat 4 replaces the section.
3. **390 only: "Each fetch handles its own errors (1–4), and a timeout counts as an error (3–4).", 46.6–48.6 s.** It is on screen for 2.1 s and needs 6.5 s, the largest shortfall. This is the phone's version of fix 6d. It fades in at figure 43.5–44.0 s, and beat 6 clears the section at 48.7 s.

Everything else passes. The tightest passing items:

- The beat 6 header "WHAT THE TECH LEAD REVIEWS · THE SAME CODE" shows for 3.2 s (54.2–57.3 s), then returns beside the papers from 57.9 s to the end.
- "MAIN LINK" shows for 5.3 s.
- The fix notes show for 8.1–8.9 s.
- The question and the AI's answer show for 20 s.
- The second answer is fully typed by 82.1 s, 4.2 s before the check.

## 8. Display at 1280×720: pass

- The picture is drawn for the whole run: `is-stacked` was false in all 931 sweep steps and in both real-time runs. The stage is 1038×461.
- The smallest visible label is 11.1 px (mono labels, "MAIN LINK", "WHAT THEY LEARNED" and the source line). The fix and sketch notes are 12.0 px and the answers 13.7 px.
- The only hidden text is the two shrunken code-thumbnail titles, from 57.7 s on. `legibility()` hides them, which the brief allows as decorative.

## Other checks

- **No horizontal scroll at 390: pass.** `scrollWidth` was 390 in every real-time frame (both runs) and in all 931 sweep steps.
- **No console errors: pass.** There were no errors, page errors, warnings or failed requests in any run, in either edition.
- **Reduced motion: pass,** for emulated media and for `?reduced`, at 1280×900, 1280×720 and 390×844:
  - no autoplay;
  - the time reads 1:33 / 1:33;
  - the caption carries the name, the definition, "Can they say why these connections matter?" and "Point to one: what would make it fail?";
  - both answers are complete, the learned note is shown and the source line is present.
- **PME: pass.** It autoplayed at 1280×900 and 390×844, ran all 10 captions to the end at 93 s, and showed no errors. None of the business additions appear: no fix notes, no sketch notes and no "MAIN LINK".
- **Quotes: pass.** All 15 quoted strings on the page appear word for word in the arXiv HTML (v2):
  - the library phrase;
  - the 27-point sentence;
  - "exploratory data analysis (not pre-registered)" and the debugging explanation;
  - the descriptions of all four groups;
  - the Generation-Then-Comprehension comparison;
  - the incentive limit;
  - recruiting, the missing-record task and the completion time.

  Also confirmed:
  - Table 1 gives 29/19/4 years of experience.
  - The time limit is 35 minutes, and d = 0.738, p = 0.01.
  - Anthropic's summary gives 50% versus 67%; the page's "about 67%" is a hedge.
  - The Brynjolfsson, Li & Raymond abstract gives 5,172 agents and "evidence that AI assistance facilitates worker learning".

## Outside the brief

The `<noscript>` block now staged in `index.html` carries the PME wording: "Faculty check: Can the student explain…". A visitor without JavaScript sees it on the business link too, because `?edition` needs JavaScript to apply.
