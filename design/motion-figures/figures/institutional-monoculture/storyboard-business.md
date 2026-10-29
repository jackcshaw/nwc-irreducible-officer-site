# Institutional monoculture: business edition storyboard

Edition `business`, workplace cast, round 2. It is built from `editions/business.json` on top of the core in `storyboard.md`: the layout, motion, colour grammar and nameplate. This file lists only what differs from the PME edition. The words live in the data files: `editions/business.json` holds the scenario and `../../casts.json` (workplace) holds the role words. If this file and the data disagree, the data is what ships.

Open it with `index.html?edition=business`, or with the "See this with: Workplace" link on the page.

## Round 2: changes after figure cold read 1

Source: `tests/business-figure-read-1.md` and the coordinator's notes.

1. **The manager sees only the finished plans.** The manager lines up the problem statements from the finished plans and finds one frame (beats 4–5). Beat 6 now says the AI's opening line is for the viewer: "The manager doesn't see this: almost every AI outline opened with that frame." The grey card, trace line and "AI'S FRAME" pill stay as the viewer's view of where the frame came from.
2. **The question box goes somewhere.**
   - The box holds the manager's question in words: "THE MANAGER ASKS / What frames are missing?". The beat 7 caption matches it.
   - In beat 10 a navy line runs from the box down to a new heading over the imagined board, "ONE IMAGINED ANSWER". The heading now arrives with the goals, so it no longer sits over empty space for 17 s.
   - On phones the question is a labelled line: "The manager asks: What frames are missing?".
3. **The research is reported fully.** The page now says the authors' summary names no strategies, and that coverage of the paywalled *HBR* article reports the models' defaults included differentiation over commoditization. It adds that the figure's AI frame follows that reported default.
4. **Accurate wording.**
   - "Every outline" became "almost every outline", in the card, the caption, the phone view and the page.
   - "The plans look nothing alike" is gone. The page says the plans differ in details (names, numbers, products) but share one frame. It also notes that Bottesch found style converged as well, and that the layouts are the figure's device.
5. **Pace.** Six cuts to static stretches take the run from 99.3 s to 91.1 s in the player. Every caption keeps its reading time plus 1.5 s.
6. **The business page.**
   - The PME note under the setup is gone; the switch carries it.
   - Military education appears once, in the original-essay link.
   - The meta description is business wording.
   - The setup has a nonprofit bridge: "a nonprofit's program team asking how to respond to a funder's new priority".
7. **The source line** keeps Jack's approved wording, "Illustration based on…".

The cast keys `reviewer_lines` and `reviewer_doesnt_see` now come from `casts.json`.

## 1. Source and evidence treatment

*Illustration based on two sources:*
- *Romasanta, Thomas & Levina (2026), "Researchers Asked LLMs for Strategic Advice. They Got 'Trendslop' in Return," Harvard Business Review;*
- *Bottesch (2025), "Towards Generative Monoculture?", ACIS 2025 Proceedings.*

Scenario and sensitivity rules: BUSINESS-EXAMPLES.md, section 6. Evidence follows option A (EDITIONS-PLAN.md). There is no evidence beat, because the turn in this figure is the lineup, not a finding.

- **Setup:** "Illustration based on Romasanta, Thomas & Levina (2026) and Bottesch (2025). The team, the question and the plans are constructed."
- **Under the final frame:** "Illustration based on Romasanta et al., HBR (2026), and Bottesch, ACIS (2025)."
  - In the picture it is a Serif italic line under the imagined goals, fading in 1.0 s after the check.
  - In the stacked phone view it sits just under the controls, outside the fixed-height player.
- **On the page:** "The studies behind this example", after the check. In order:
  - the authors' trendslop summary, quoted word for word;
  - that the summary names no strategies, and that coverage of the paywalled article reports differentiation among the defaults;
  - Bottesch's abstract, quoted word for word, with its limits and the style finding;
  - that neither study lined up a team's plans or tested framing first;
  - Terwiesch et al. as counter-evidence;
  - full citations.

**Sensitivity:**
- The reported defaults are labelled as coverage of the article, since the *HBR* text is paywalled.
- The model count and the number of strategy tensions appear nowhere.
- No real company is named.

## 2. Core changes (for Jack to confirm)

The beats, motion and turn are the core's. Every change is gated on data or measurement, so PME draws exactly as before: frame-diff 297 of 297 identical against the PME baseline with the switch, transitions frozen.

- **An edition clock** (`timeline.edits`), as in frame capture. Business cuts six static stretches, in core seconds:
  - 8.9 (1.8 s), 17.4 (0.8 s) and 38.9 (1.5 s);
  - 52.2 (2.2 s), 65.5 (1.0 s) and 73.9 (0.9 s).

  PME has no edits, so its clock is unchanged.
- **The question in the box** (`labels.askQ`) replaces the "?".
- **The answer link** (`labels.answer`): the imagined heading reads "ONE IMAGINED ANSWER" and arrives with the goals, with a navy line from the question box. It is drawn at core 76.6–77.3.
- **Phone keys:** `narrow.askQ` puts the question as a labelled line under the first run's list, and `narrow.answer` heads the imagined groups from that same moment.
- **The source line** (`labels.source` / `narrow.source`).
- **A question-box label wider than the box** ends at the box's right edge.
- **Page sections gated on data:**
  - the study section;
  - the essay quote;
  - the PME evidence list;
  - the note under the links;
  - the note under the switch (`page.editionNote`: PME has it, business doesn't).

**The contrast still fits the studies (lesson 1).**
- Each imagined analyst frames the problem first and asks the AI to challenge it. That is the handling Bottesch's abstract offers "initial evidence" can mitigate homogenisation.
- Three imagined analysts still choose to differentiate, so the figure doesn't call the reported default wrong.
- The run stays labelled imagined, and the page says framing first is untested for teams. No payoff change.

**Same access (lesson 12).** Both runs use the same AI, the same question and the same context. The manager sees only finished plans in both.

**The cast differs from the approved example.** The example has ten managers and a head of strategy; this edition uses the workplace cast, ten analysts and "the manager".

## 3. Words that differ, beat by beat

The cast supplies the role words: "students" becomes "analysts", "seminar" becomes "team", "Faculty ask" becomes "The manager asks", and "Faculty check" becomes "Reviewer's check".

| Beat | Caption (business) | Picture words that differ from PME |
| --- | --- | --- |
| 1 · The team, one question | Ten analysts get the CEO's question. | Task card: "How should we respond to / a low-cost competitor?". Context: "Its prices, our patents, dealers, / price-led buyers, service revenue.". Label: "The team" |
| 2 · The outlines come back alike | (same caption) | none |
| 3 · Their own plans | Each writes their own plan. The manager sees that each holds up. | none |
| 4 · The manager lines up the problems | The manager lines up each plan's problem. | Ten lines: Outserve everyone, Own high-spec niches, Bundle maintenance in, Brand our engineering, Add smart monitoring, Customize every order, Lengthen warranties, Outpace on delivery, Sell uptime contracts, Upgrade dealer support |
| 5 · One frame | Different words, one frame: each plan differentiates. | "ONE FRAME: DIFFERENTIATE"; compact: "ONE FRAME" / "DIFFERENTIATE" |
| 6 · Where the frame came from | The manager doesn't see this: almost every AI outline opened with that frame. | Card: "ALMOST EVERY OUTLINE OPENED / Differentiate on value" |
| 7 · The manager asks | The manager asks what frames are missing. | "THE MANAGER ASKS" over the box, which holds "What frames / are missing?" |
| 8 · Imagine framing first | Now imagine each analyst defines the problem first. | "Same team, imagined"; no heading yet |
| 9 · The AI challenges each frame | (same caption) | The AI's questions: "What did you assume? / What other frames fit?" |
| 10 · Lined up again | These hold up too. The manager lines them up again. | A navy line from the box to "ONE IMAGINED ANSWER". Goals: DIFFERENTIATE (the first three lines); MATCH ON COST (Launch basic models, Cut unit costs, Price-match bids, Win price-led buyers); PARTNER OR LICENSE (License our designs, Supply the competitor, Service their machines) |
| 11 · Reviewer's check | Reviewer's check: What frames are missing across the team? / Line up the problems. What else could the problem be? | The source line under the picture |

## 4. The workplace check

**Reviewer's check: What frames are missing across the team? / Line up the problems. What else could the problem be?**

The second line is the separating follow-up, set at equal weight.
- It starts from the EDITIONS-PLAN draft: "What frames are missing across the team's analyses? What else could the problem be?"
- "Across the team" fits one line at 768 px and on laptops.
- "Line up the problems" keeps the method in the check.

The beat 7 box asks the check's first question, and the imagined board is one answer to it. The check then hands the question to the viewer for their own team.

## 5. Pace

**The rule (business, per the coordinator):**
- every caption gets its reading time (words ÷ 3) plus 1.5 s;
- every new label gets its reading time plus 1.5 s while it is on screen.

PME's stricter combined rule (caption and picture words together, and twice the caption's reading time) isn't applied here; the coordinator asked for the run to be trimmed under about 95 s.

Times are on the business clock (figure time; add 3.0 s for the player).

| Beat | Time (s) | Beat (s) | Caption words | Caption read + 1.5 (s) | New labels (words): on screen from → read + 1.5 by |
| --- | --- | --- | --- | --- | --- |
| 0 · Name card | player 0.0–3.0 | 3.0 | 0 | — | name and kicker (7), runtime standard |
| 1 | 0.0–9.1 | 9.1 | 6 | 3.5 | task card (10): 1.6 → 6.4; context (9): last item 6.9 → 9.1; "The team" (2): 2.3 → 4.5 |
| 2 | 9.1–15.7 | 6.6 | 11 | 5.2 | "AI" (1): 10.5 → 12.3 |
| 3 | 15.7–23.7 | 8.0 | 12 | 5.5 | "AI OUTLINE → WRITE", "ALL DRAFTED WITH AI" (7): 19.8 → 23.6 |
| 4 | 23.7–36.3 | 12.6 | 7 | 3.8 | ten lines (28): 25.7–32.7 → 36.5, and they stay to the end |
| 5 | 36.3–41.9 | 5.6 | 7 | 3.8 | "ONE FRAME: DIFFERENTIATE" (3): 39.5 → 42.0, and it stays |
| 6 | 41.9–48.1 | 6.2 | 13 | 5.8 | card (7): 43.7 → 47.5; "AI'S FRAME" (2): 45.2 → 47.4 |
| 7 | 48.1–52.6 | 4.5 | 7 | 3.8 | "THE MANAGER ASKS" and the question (7, echoing the caption): 50.2 → 54.0, and it stays |
| 8 | 52.6–59.2 | 6.6 | 8 | 4.2 | "Same team, imagined", "DEFINE PROBLEM" (5): 56.0 → 59.2 |
| 9 | 59.2–66.6 | 7.4 | 9 | 4.5 | the AI's questions (8): 62.4 → 66.6, on screen to 67.1; "AI CHALLENGES" (2): 62.5 → 64.7 |
| 10 | 66.6–79.6 | 13.0 | 10 | 4.8 | heading and line (3): 68.4–69.1; three goal groups (26 new words): 69.1–72.5. All 29 read by 79.6 |
| 11 | 79.6–88.1 | 8.5 | 7 + 10 | follow-up at +3.0, read by +7.8 | source line (12): 81.1 → 86.6 |
| **Total** | | **88.1 figure, 91.1 player** (PME 96.3, 99.3) | **107** | | **139 label words** |

Notes:
- Beat 6's caption is the longest (13 words). The card starts 1.0 s in, as the reader reaches "this", and settles at 1.8 s.
- The beat 7 box starts 1.5 s into the beat and settles at 2.1 s, earlier than round 1's 3.0 s. It echoes the caption's words.
- Settled labels render at 11.1 px or more at 1366 × 657 and 12.6 px at 1280 × 720 (`figure-shots.mjs`).

## 6. Final frame (business)

Player 91.1 s.
- **Top:** the AI panel; the grey card "ALMOST EVERY OUTLINE OPENED / Differentiate on value", traced to the first run's grey bracket and its "AI'S FRAME" pill; the task card with its context.
- **First run:** "The team", ten ticked plans, and "ONE FRAME / DIFFERENTIATE" over the ten lines. "THE MANAGER ASKS" sits over a dashed box holding "What frames are missing?". A navy line runs from that box down to "ONE IMAGINED ANSWER".
- **Below:** "Same team, imagined" with ten ticked plans, and three bracketed goals: DIFFERENTIATE, MATCH ON COST and PARTNER OR LICENSE. The source line runs under them.
- **Caption band:** the name and definition, then the reviewer's check and follow-up.

**Fit:**
- The phone player measures 841 px at 390 × 844.
- The controls hold their place at every moment, at 1440 × 900, 1366 × 657, 1280 × 720, 768 × 1024 and 390 × 844.
- There is no horizontal scroll and there are no console errors.

**Stills and preview:**
- `shots/business/`: beat-01 to beat-11, final, final-1440, final-1366, final-1280, final-390, reduced and page views;
- `shots/institutional-monoculture-business.mp4`, `.webm` and `.gif`.

## 7. Page

All page copy is in `editions/business.json` → `page`:
- setup with the nonprofit bridge;
- check heading, lines and follow-up;
- the example note;
- the study section;
- links: both studies, the authors' summary, and the original essay, labelled "written for military education" (the page's one mention);
- the note under the links.

The meta description reads: "Ten plans drafted with the same AI can each pass review and still share one definition of the problem. Lining up their problem statements shows it."

The business page has no PME note, no "student", "faculty" or "seminar", and no PME-only links. The switch reads "See this with: Workplace · PME".

Visitor copy passes the writing-as-jack mechanical check (`jack_eval.py`: no flags).

## 8. Verified figures, for the companion's source spine

Checked on October 28, 2026:
- **Romasanta, Thomas & Levina.** The NYU Stern research highlight, dated March 16, 2026, which links the *HBR* article. Quoted:
  - "Across thousands of simulations, we saw LLMs almost uniformly select the same trendy strategies, regardless of context."
  - "We call the propensity for AI to opt for buzzy ideas over reasoned solutions 'trendslop.'"

  The highlight names no strategies.
- **The reported defaults.** These come from coverage of the article, not its text. An indexed abstract of the *HBR* piece (EBSCO; seen as a search result, the page itself refused access) reads: "Across seven core business tensions, LLMs predominantly favored differentiation over commoditization, augmentation over automation, and long-term over short-term". The companion's `sources/source-spine.md` lists "differentiation, augmentation and collaboration". The page paraphrases this and labels it as coverage. Fortune's coverage (April 10, 2026) was checked too: it reports models casting "commoditization" as outdated and negative, but doesn't name differentiation.
- **Bottesch (2025).** The ACIS 2025 abstract on the AIS eLibrary (aisel.aisnet.org/acis2025/290). Quoted:
  - a field experiment with "99 knowledge workers from a multinational industrial corporation";
  - "significant homogenisation effects occur in terms of style and content when knowledge workers are supported by GenAI (versus when they are not)", "across three representative knowledge work tasks";
  - "initial evidence that these effects might be mitigated through advanced prompting and (more) critical handling of GenAI output by knowledge workers."

**Not verified, not used:**
- the *HBR* article's own text (paywalled);
- the number of models, simulations and tensions;
- percentages seen only in secondary summaries.

Terwiesch et al. is paraphrased as on the PME page and wasn't re-read today.

## 9. Questions for Jack

1. **The cast:** ten analysts and "the manager", in place of the example's ten managers and a head of strategy.
2. **The workplace check:** "Reviewer's check: What frames are missing across the team? / Line up the problems. What else could the problem be?"
3. **The answer link:** the imagined board is now labelled as one answer to the manager's question. In PME the question box stays empty, by design.
