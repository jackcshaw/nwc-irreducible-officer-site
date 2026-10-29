# Institutional monoculture: business edition storyboard

Edition `business`, workplace cast. It is built from `editions/business.json` on top of the unchanged core in `storyboard.md`: the timeline, layout, motion, colour grammar and nameplate. This file lists only what differs from the PME edition. The words live in the data files: `editions/business.json` holds the scenario and `../../casts.json` (workplace) holds the role words. If this file and the data disagree, the data is what ships.

Open it with `index.html?edition=business`, or with the "See this with: Workplace" link on the page.

## 1. Source and evidence treatment

*Illustration based on Romasanta, Thomas & Levina (2026), "Researchers Asked LLMs for Strategic Advice. They Got 'Trendslop' in Return," Harvard Business Review, and Bottesch (2025), "Towards Generative Monoculture?", ACIS 2025 Proceedings.* Scenario and sensitivity rules: BUSINESS-EXAMPLES.md, section 6. Evidence follows option A (EDITIONS-PLAN.md). There is no evidence beat, because the turn in this figure is the lineup, not a finding.

- **Setup:** "Illustration based on Romasanta, Thomas & Levina (2026) and Bottesch (2025). The team, the question and the plans are constructed."
- **Under the final frame:** "Illustration based on Romasanta et al., HBR (2026), and Bottesch, ACIS (2025)." In the picture it is a Serif italic line under the imagined goals. It fades in at 88.8–89.3 s, 1.0 s after the check. In the stacked phone view it sits just under the controls, outside the fixed-height player, as in frame capture.
- **On the page:** a section headed "The studies behind this example", placed after the check. It holds:
  - the authors' trendslop summary, quoted word for word;
  - what that source is (a practitioner article, known here only through the authors' summary);
  - that the figure's shared frame, "differentiate", is constructed;
  - Bottesch's abstract, quoted word for word, with its limits;
  - that neither study lined up a team's plans or tested framing first;
  - Terwiesch et al. as counter-evidence;
  - full citations.

**Sensitivity, per the coordinator and BUSINESS-EXAMPLES.md.**
- Only the core trendslop finding is used: "the same trendy strategies, regardless of context".
- The model count, the seven tensions and the named defaults ("differentiation", "augmentation") appear nowhere.
- The ten plans still all say "differentiate", as the approved scenario has it. The page says that frame is constructed and that it doesn't report which strategies the models favoured.
- No real company is named.

## 2. Core changes (for Jack to confirm)

Nothing in the timeline, the beats, the motion or the turn changes. Every beat keeps its PME start and length. The changes are small, and every one is gated on data or on measurement, so PME draws exactly as before (frame-diff: 297 of 297 identical against the new baseline with the switch).

- **The source line** (`labels.source`) is drawn only when the edition has one. On the stacked view, `narrow.source` goes under the controls.
- **A question-box label wider than the box** ("THE MANAGER ASKS", 16 characters) ends at the box's right edge, so it stays clear of the stage edge. PME's "FACULTY ASK" fits inside the box and doesn't move.
- **Page sections gated on data:** the study section (`page.study`), the essay quote (`page.quote`, PME only), the PME evidence list (`page.evidence`) and the note under the links (`page.linksNote`).
- **The edition switch** under the setup, as in frame capture.

**The contrast still fits the studies (pilot lesson 1).**
- In the imagined run, each analyst frames the problem first and then asks the AI to challenge it. That is the kind of handling Bottesch's abstract offers "initial evidence" can mitigate homogenisation ("advanced prompting and (more) critical handling of GenAI output").
- Three imagined analysts still choose to differentiate, so the figure doesn't call the studies' default wrong. It shows that the other frames were missing from the first run.
- The run stays labelled imagined, and the page says framing first is untested for teams.

No payoff change was needed.

**The cast differs from the approved example.** The example has ten managers and a head of strategy. The edition uses the workplace cast: ten analysts and "the manager". Ten managers reviewed by "the manager" would be confusing, and the cast keys keep the classroom swap working later. The setup places the analysts at an industrial-equipment maker, which still matches Bottesch's "multinational industrial corporation".

## 3. Words that differ, beat by beat

The cast supplies the role words:
- "students" becomes "analysts", "seminar" becomes "team";
- "Faculty ask" becomes "The manager asks";
- "Faculty check" becomes "Reviewer's check".

Beats 2, 6 and 9 keep the PME caption.

| Beat | Caption (business) | Picture words that differ from PME |
| --- | --- | --- |
| 1 · The team, one question | Ten analysts get the CEO's question. | Task card: "How should we respond to / a low-cost competitor?"; context: "Its prices, our patents, dealers, / price-led buyers, service revenue."; "The team" |
| 2 · The outlines come back alike | (same caption) | none |
| 3 · Their own plans | Each writes their own plan. The manager sees that each holds up. | none |
| 4 · The manager lines up the problems | The manager lines up each plan's problem. | Ten lines: Outserve everyone, Own high-spec niches, Bundle maintenance in, Brand our engineering, Add smart monitoring, Customize every order, Lengthen warranties, Outpace on delivery, Sell uptime contracts, Upgrade dealer support |
| 5 · One frame, judged | Different words, one frame: each plan differentiates. | "ONE FRAME: DIFFERENTIATE"; compact: "ONE FRAME" / "DIFFERENTIATE" |
| 6 · The AI's frame | (same caption) | Card line: "Differentiate on value" |
| 7 · The manager asks | The manager asks what else the problem could be. | "THE MANAGER ASKS" (ends at the box's right edge) |
| 8 · Imagine framing first | Now imagine each analyst defines the problem first. | "Same team, imagined" |
| 9 · The AI challenges each frame | (same caption) | The AI's questions: "What did you assume? / What other frames fit?" |
| 10 · Lined up again | These hold up too. The manager lines them up again. | Goals: DIFFERENTIATE (the first three lines, unchanged); MATCH ON COST (Launch basic models, Cut unit costs, Price-match bids, Win price-led buyers); PARTNER OR LICENSE (License our designs, Supply the competitor, Service their machines) |
| 11 · Reviewer's check | Reviewer's check: What frames are missing across the team? / Line up the problems. What else could the problem be? | **New:** the source line under the picture (88.8–89.3 s) |

**Why the wording changed:**
- *Beat 8* drops "the essay's proposal": a business reader hasn't met the essay. The page credits the proposal to *The Irreducible Officer*.
- *Beat 9:* the AI's second question is "What other frames fit?" in place of PME's "What else could it be?". Otherwise it would repeat the manager's question in beat 7 and the check, and blur who asks it.
- *Beat 1:* the task is shorter than the example's "…entering our core market", to meet the reading rule.

**Stacked phone view:** the same words in sentence case. "One frame: differentiate"; goal groups "Differentiate", "Match on cost", "Partner or license". The source sits under the controls. The task card stays to the final frame.

## 4. The workplace check

**Reviewer's check: What frames are missing across the team? / Line up the problems. What else could the problem be?**

The second line is the separating follow-up and is set at equal weight.
- It starts from the EDITIONS-PLAN draft: "What frames are missing across the team's analyses? What else could the problem be?"
- "the team's analyses" became "the team" so the question fits one line at 768 px and on laptops, matching PME's "across the seminar".
- "Line up the problems" keeps PME's method in the check: lining up shows which frames are there, and asking what else the problem could be looks for the rest.

## 5. Pace

Reading time is words ÷ 3. Picture words are words new in that beat; labels shown earlier aren't counted again. **Required** is (caption words + picture words) ÷ 3 + 1.5 s. Every beat lasts at least that long and at least twice its caption's reading time. Times are figure time; add 3.0 s for the player.

| Beat | Time (s) | Caption words (PME) | Picture words, new (PME) | Required (s) | 2× caption (s) | Beat (s) |
| --- | --- | --- | --- | --- | --- | --- |
| 0 · Name card | player 0.0–3.0 | 0 (0) | 7 (7) | 3.8 | 0 | 3.0 (runtime standard) |
| 1 | 0.0–10.9 | 6 (8) | 21 (20): EXAMPLE TASK 2, task 8, context 9, "The team" 2 | 10.5 | 4.0 | 10.9 |
| 2 | 10.9–18.3 | 11 (11) | 1 (1) | 5.5 | 7.3 | 7.4 |
| 3 | 18.3–26.3 | 12 (12) | 7 (7) | 7.8 | 8.0 | 8.0 |
| 4 | 26.3–39.8 | 7 (6) | 28 (30): ten lines, two of two words | 13.2 | 4.7 | 13.5 |
| 5 | 39.8–46.0 | 7 (9) | 3 (5) | 4.8 | 4.7 | 6.2 |
| 6 | 46.0–52.9 | 7 (7) | 8 (9) | 6.5 | 4.7 | 6.9 |
| 7 | 52.9–58.9 | 9 (9) | 3 (2) | 5.5 | 6.0 | 6.0 |
| 8 | 58.9–66.1 | 8 (9) | 8 (8) | 6.8 | 5.3 | 7.2 |
| 9 | 66.1–74.3 | 9 (9) | 10 (11) | 7.8 | 6.0 | 8.2 |
| 10 | 74.3–87.8 | 10 (9) | 26 (27): seven new lines 20, two new goal labels 6 | 13.5 | 6.7 | 13.5 |
| 11 | 87.8–96.3 | 7 + 10 (7 + 14) | 12 (0): the source line | 7.2 (check); source 5.5 on its own | 4.7 (check) | 8.5, then rests |
| **Total** | | **103** (110) | **134** (127) | | | **96.3 figure, 99.3 player** |

Notes:
- Beats 4 and 10 carry the most words, as in PME. Beat 10 meets its required time exactly, as PME's did. Beat 4 has 0.3 s to spare.
- Beat 3 meets twice its caption's reading time exactly (12 words, 8.0 s), as PME's did.
- The source line has its own reading time plus the hold: 12 words, 4.0 s + 1.5 s = 5.5 s, and it is on screen for 7.0 s before the figure ends, then stays on the final frame. It fades in 1.0 s after the check and is small italic ink under the goals, so the check stays the last word in the caption band.
- Settled labels render at 11.1 px or more at 1366 × 657 and 12.6 px at 1280 × 720 (`figure-shots.mjs`).

## 6. Final frame (business)

Player 99.3 s.
- **Top:** the AI panel; the grey card "EVERY OUTLINE OPENED / Differentiate on value", traced to the first run's grey bracket and its "AI'S FRAME" pill; the task card "How should we respond to a low-cost competitor?" with its context.
- **First run (dimmed, then restored):** "The team", ten ticked plans, and "ONE FRAME / DIFFERENTIATE" over the ten lines. "THE MANAGER ASKS" sits over the empty dashed box.
- **Below:** "Same team, imagined" with ten ticked plans, and "ONE IMAGINED SPREAD" over three bracketed goals: DIFFERENTIATE, MATCH ON COST and PARTNER OR LICENSE. The source line runs under them.
- **Caption band:** "INSTITUTIONAL MONOCULTURE · Shared systems and defaults narrow the range of frames a group considers." and "REVIEWER'S CHECK · What frames are missing across the team? / Line up the problems. What else could the problem be?"

**Fit:**
- At 390 × 844 the phone player measures 815 px (PME: 838). The controls hold their place at every beat in both editions, at all sizes checked.
- The laptop bands keep each line on one line: 92 px at 1366 × 657 and 1280 × 720.
- There is no horizontal scroll and there are no console errors.

**Stills and preview:**
- `shots/business/`: beat-01 to beat-11, final, final-1440, final-1366, final-1280, final-390, reduced and page views;
- `shots/institutional-monoculture-business.mp4`, `.webm` and `.gif`.

## 7. Page

All page copy is in `editions/business.json` → `page`:
- setup, check heading, lines and follow-up;
- the example note;
- the study section;
- links: both studies, the authors' summary, and the original essay, labelled "written for military education";
- a note that the failure mode comes from an essay about judgment in military education.

The business page has no "student", "faculty" or "seminar", and no PME-only links. It drops the essay quote (it speaks of a war-college seminar) and the PME evidence list.

The edition switch reads "See this with: Workplace · PME", with the current one bold. Under it: "PME (professional military education): the example from *The Irreducible Officer*, the National War College essay." Both lines are the same in every edition.

Visitor copy passes the writing-as-jack mechanical check (`jack_eval.py`: no flags).

## 8. Verified figures, for the companion's source spine

Checked on October 28, 2026:
- **Romasanta, Thomas & Levina.** The NYU Stern research highlight, dated March 16, 2026, which links the *HBR* article. Quoted: "Across thousands of simulations, we saw LLMs almost uniformly select the same trendy strategies, regardless of context." Also quoted: "We call the propensity for AI to opt for buzzy ideas over reasoned solutions 'trendslop.'"
- **Bottesch (2025).** The ACIS 2025 abstract on the AIS eLibrary (aisel.aisnet.org/acis2025/290). Quoted:
  - a field experiment with "99 knowledge workers from a multinational industrial corporation";
  - "significant homogenisation effects occur in terms of style and content when knowledge workers are supported by GenAI (versus when they are not)", "across three representative knowledge work tasks, namely knowledge acquisition, knowledge packaging, and knowledge creation";
  - "initial evidence that these effects might be mitigated through advanced prompting and (more) critical handling of GenAI output by knowledge workers."

**Not verified, not used:**
- the *HBR* article itself (paywalled);
- the number of models and strategy tensions;
- the named defaults ("differentiation", "augmentation" and others);
- a "63% of the time" figure, seen only in secondary web summaries.

Terwiesch et al. is paraphrased as on the PME page and wasn't re-read today.

## 9. Questions for Jack

1. **The cast:** ten analysts and "the manager", in place of the example's ten managers and a head of strategy.
2. **The workplace check:** "Reviewer's check: What frames are missing across the team? / Line up the problems. What else could the problem be?"
3. **Beat 8** reads "Now imagine each analyst defines the problem first." It credits the proposal to the essay on the page, not in the caption.
4. **A cast key to add:** `reviewer_lines`, "Faculty line" (classroom) and "The manager lines" (workplace). Beats 4 and 10 write "The manager lines up…" literally until it exists.
