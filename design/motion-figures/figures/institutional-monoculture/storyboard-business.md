# Institutional monoculture: business edition storyboard

Edition `business`, workplace cast, round 2 with final fixes. It is built from `editions/business.json` on top of the core in `storyboard.md`: the layout, motion, colour grammar and nameplate. This file lists only what differs from the PME edition. The words live in the data files: `editions/business.json` holds the scenario and `../../casts.json` (workplace) holds the role words. If this file and the data disagree, the data is what ships.

Open it with `index.html?edition=business`, or with the "See this with: Workplace" link on the page.

## Changes after the classroom light read

Source: `tests/classroom-light-read.md` and the coordinator's notes. The point landed in both classroom casts.

1. **High school gets its own case words** (`byCast["high-school"]`, 39 patches built from one vocabulary). The structure is the same: a business class and a bike company facing a cheaper rival.
   - Context: "Its prices, our designs, bike shops, budget buyers, repairs."
   - The frames keep their meaning: STAND OUT (differentiate), COMPETE ON PRICE (match on cost), TEAM UP (partner).
   - The AI's line is "Stand out on quality", and caption 5 says "each plan aims to stand out".
   - The lineup and spread are plain questions: "Can we stay the best?", "Is our service better?", "Can we sell for less?", "Who just wants cheap?", "Should we team up?", "Could we sell to them?".
2. **Beat 8's re-layout is staged, one move at a time** (core; every edition):
   - core 59.9–60.9: the papers;
   - 61.0–62.0: the lineup, its bracket and the pill;
   - 62.1–62.8: the AI's card, the panel and the question box;
   - 62.8–63.2: the dim;
   - 63.2–63.8: the imagined run arrives, and in business the sent-back line is drawn (63.2–63.9);
   - 63.9: the red lines start, 2.0 s later than before.

   Beat 8's length is unchanged, so PME stays 99.3 s and business 94.0 s. PME before and after (same runtime, transitions frozen): only the frames at player 64, 66 and 68 s differ, at every size; the other 285 of 297 are identical. On phones (business), the first run's paper rows go as it moves up (beat 8). The imagined run's rows give way when its first goal group takes their place (beat 10), with all ten ticks showing for 2.0 s before that.
3. **The spread isn't the answer.** A line under the goals, "MORE FRAMES TO WEIGH BEFORE THE {GROUP} CHOOSES", fades in at core 82.0 (`labels.choose`, `narrow.choose`). On phones it sits under the groups.
4. **"The imagined board"** became "the imagined rerun" on the page.
5. **Room for the reviewer's label.** A label wider than the question box now takes two lines over it ("THE INSTRUCTOR / ASKS", "THE TEACHER / ASKS", "THE MANAGER / ASKS"), clear of the lineup's bracket at every size. Classroom's "INSTRUCTOR ASKS" patch is gone. PME's "FACULTY ASK" fits on one line and is unchanged.
6. **The switch round trip** (Classroom from Workplace or PME opens higher ed) is by design and unchanged.

To fit the line under the groups, the phone's compact first-run list is now "How do we stand out? · and nine more like it". The phone player is 833 px in all three casts.

## Final fixes after figure cold read 2

Source: `tests/business-figure-read-2.md` and the coordinator's notes. Round 2 passed on the point; these are final fixes.

1. **The lines are problem definitions.**
   - The first run's ten lines are now questions that define the problem, all in the one frame: How do we stand out? · Why pay more for ours? · Why are we worth more? · What can't they copy? · Where do we add value? · Can we stay premium? · Can we out-serve them? · Which features win? · Can we keep our edge? · What earns a premium?
   - The imagined run keeps the first three. It adds four in the cost frame (Can we win on cost? · Who buys on price? · Can we cut unit costs? · Who is switching?) and three in the partner frame (Should we partner? · Who wants our designs? · Is the rival a buyer?).
   - Every line is 22 characters or fewer, so it fits its bracket at 13 units.
2. **The manager's move on today's plans is visible.**
   - Beat 8 is now "Imagine the manager sends them back: what else could the problem be?". A navy line runs from the question box to the heading "SENT BACK: WHAT ELSE COULD THE PROBLEM BE?", drawn at core 61.2–61.9, before the imagined run writes. The spread forms under that question in beat 10.
   - Beat 9 is now "Each defines the problem first, then asks the AI to challenge it."
3. **The viewer-only layer is marked on the picture.**
   - A grey label "NOT SEEN BY THE MANAGER" sits above the AI's card (`labels.unseen`), and the trace line settles dashed.
   - On phones the AI line stays to the end, inline: "AI Almost every outline opened: Differentiate on value · NOT SEEN BY THE MANAGER" (`narrow.unseen`, `narrow.keep`). A compact first-run list also stays: the first three questions "and seven more" (`narrow.more`).
   - To keep the phone player at 832 px, the paper rows give way once the goals form.
4. **Beats 5, 6 and 9 get more time.** Holds of 1.0 s after the bracket (core 43.7) and after the grey trace (core 49.4), and the cut before beat 10 is gone. Every new text holds at least (words ÷ 3) + 1.5 s (§5).
5. **Beat 2** says "the company's AI", so the shared system is in the caption.
6. **Tidy-up after verification** (`tests/business-verify.md`).
   - Two partner lines become framings: "Who wants our designs?" and "Is the rival a buyer?".
   - The phone list in beat 4 is one question per line (`narrow.oneColumn`), so none wraps mid-phrase.
   - On phones the imagined paper rows stay until the second goal group forms, so their ticks show for about 2 s. The first run's rows give way when the first group forms.
   - All ten first-run lines are in the one frame. The page and captions say "each plan", and only the AI card says "almost every outline".

The run is 95.2 s in the player.

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

- **An edition clock** (`timeline.edits`), as in frame capture. A cut skips a static stretch and a hold freezes the core. In core seconds, business has:
  - cuts at 8.9 (1.8 s), 17.4 (0.8 s), 38.9 (1.5 s), 52.2 (2.2 s) and 65.5 (1.0 s);
  - holds at 43.7 (1.0 s) and 49.4 (1.0 s).

  PME has no edits, so its clock is unchanged.
- **The question in the box** (`labels.askQ`) replaces the "?".
- **The sent-back link** (`labels.answer`): the imagined heading reads "SENT BACK: WHAT ELSE COULD THE PROBLEM BE?" and arrives in beat 8, with a navy line from the question box. It is drawn at core 61.2–61.9.
- **The viewer-only label** (`labels.unseen`) above the AI's card, with the trace line settling dashed.
- **Phone keys:**
  - `narrow.askQ` puts the question as a labelled line under the first run's list;
  - `narrow.answer` heads the imagined run from beat 8;
  - `narrow.keep`, `narrow.unseen` and `narrow.more` keep the AI line and a compact first-run list to the end.
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
| 2 · The outlines come back alike | Each asks the company's AI for an outline. They come back alike. | none |
| 3 · Their own plans | Each writes their own plan. The manager sees that each holds up. | none |
| 4 · The manager lines up the problems | The manager lines up each plan's problem. | Ten lines: How do we stand out? · Why pay more for ours? · Why are we worth more? · What can't they copy? · Where do we add value? · Can we stay premium? · Can we out-serve them? · Which features win? · Can we keep our edge? · What earns a premium? |
| 5 · One frame | Different words, one frame: each plan differentiates. | "ONE FRAME: DIFFERENTIATE"; compact: "ONE FRAME" / "DIFFERENTIATE" |
| 6 · Where the frame came from | The manager doesn't see this: almost every AI outline opened with that frame. | "NOT SEEN BY THE MANAGER" over the card "ALMOST EVERY OUTLINE OPENED / Differentiate on value"; the trace settles dashed |
| 7 · The manager asks | The manager asks what frames are missing. | "THE MANAGER ASKS" over the box, which holds "What frames / are missing?" |
| 8 · Sent back | Imagine the manager sends them back: what else could the problem be? | A navy line from the box to "SENT BACK: WHAT ELSE COULD THE PROBLEM BE?"; "Same team, imagined" |
| 9 · Define first, then the AI challenges | Each defines the problem first, then asks the AI to challenge it. | The AI's questions: "What did you assume? / What other frames fit?" |
| 10 · Lined up again | These hold up too. The manager lines them up again. | Under the sent-back question: DIFFERENTIATE (the first three lines); MATCH ON COST (Can we win on cost? · Who buys on price? · Can we cut unit costs? · Who is switching?); PARTNER OR LICENSE (Should we partner? · Who wants our designs? · Is the rival a buyer?) |
| 11 · Reviewer's check | Reviewer's check: What frames are missing across the team? / Line up the problems. What else could the problem be? | The source line under the picture |

## 4. The workplace check

**Reviewer's check: What frames are missing across the team? / Line up the problems. What else could the problem be?**

The second line is the separating follow-up, set at equal weight.
- It starts from the EDITIONS-PLAN draft: "What frames are missing across the team's analyses? What else could the problem be?"
- "Across the team" fits one line at 768 px and on laptops.
- "Line up the problems" keeps the method in the check.

The beat 7 box asks the check's first question. The manager sends the plans back with the second, and the imagined rerun is one answer. The check then hands the question to the viewer for their own team.

## 5. Pace

**The rule (business, per the coordinator):**
- every caption gets its reading time (words ÷ 3) plus 1.5 s;
- every new label gets its reading time plus 1.5 s while it is on screen.

PME's stricter combined rule (caption and picture words together, and twice the caption's reading time) isn't applied here; the coordinator asked for the run to be trimmed under about 95 s.

Times are on the business clock (figure time; add 4.2 s for the player).

| Beat | Time (s) | Beat (s) | Caption words | Caption read + 1.5 (s) | New texts (words): on screen from → read + 1.5 by |
| --- | --- | --- | --- | --- | --- |
| 0 · Name card | player 0.0–4.2 | 4.2 | 0 | — | name and kicker (7), runtime standard |
| 1 | 0.0–9.1 | 9.1 | 6 | 3.5 | task card (10): 1.6 → 6.4; context (9): last item 6.9 → 9.1; "The team" (2): 2.3 → 4.5 |
| 2 | 9.1–15.7 | 6.6 | 12 | 5.5 | "AI" (1): 10.5 → 12.3 |
| 3 | 15.7–23.7 | 8.0 | 12 | 5.5 | "AI OUTLINE → WRITE", "ALL DRAFTED WITH AI" (7): 19.8 → 23.6 |
| 4 | 23.7–36.3 | 12.6 | 7 | 3.8 | ten lines of 3–5 words: each 2.5–3.2 s; the last at 32.7 → 35.9. All stay to the end |
| 5 | 36.3–42.9 | 6.6 | 7 | 3.8 | "ONE FRAME: DIFFERENTIATE" (3): 39.5 → 42.0 |
| 6 | 42.9–50.1 | 7.2 | 13 | 5.8 | card and "NOT SEEN BY THE MANAGER" (12): 44.7 → 50.2, and they stay; "AI'S FRAME" (2): 46.2 → 48.4 |
| 7 | 50.1–54.6 | 4.5 | 7 | 3.8 | "THE MANAGER ASKS" and the question (7, echoing the caption): 52.2 → 56.0, and it stays |
| 8 | 54.6–61.2 | 6.6 | 12 | 5.5 | moves at 55.6, 56.7, 57.8 and 58.5; "SENT BACK: WHAT ELSE COULD THE PROBLEM BE?" (8): 59.6 → 63.8, and it stays; "Same team, imagined", "DEFINE PROBLEM" (5): 60.0 → 63.2, and they stay |
| 9 | 61.2–69.0 | 7.8 | 12 | 5.5 | the AI's questions (8): 64.4 → 68.6, on screen to 70.0; "AI CHALLENGES" (2): 64.5 → 66.7 |
| 10 | 69.0–82.5 | 13.5 | 10 | 4.8 | three goal groups: 72.0, 73.2 and 74.4; the last group (12 words) settles at 75.4 → 80.9; "MORE FRAMES TO WEIGH…" (8): 77.2 → 81.4 |
| 11 | 82.5–91.0 | 8.5 | 7 + 10 | follow-up at +3.0, read by +7.8 | source line (12): 84.0 → 89.5 |
| **Total** | | **91.0 figure, 95.2 player** (PME 96.3, 100.5) | **115** | | |

Notes:
- The holds give beats 5 and 6 a second each after their main change. The ask card in beat 9 stays 5.6 s, against 4.2 s needed.
- The beat 7 box starts 1.5 s into the beat and settles at 2.1 s. It echoes the caption's words.
- Settled labels render at 11.1 px or more at 1366 × 657 and 12.6 px at 1280 × 720 (`figure-shots.mjs`).

## 6. Final frame (business)

Player 95.2 s.
- **Top:** the AI panel; "NOT SEEN BY THE MANAGER" over the grey card "ALMOST EVERY OUTLINE OPENED / Differentiate on value", traced by a dashed line to the first run's grey bracket and its "AI'S FRAME" pill; the task card with its context.
- **First run:** "The team", ten ticked plans, and "ONE FRAME / DIFFERENTIATE" over the ten lines. "THE MANAGER ASKS" sits over a dashed box holding "What frames are missing?". A navy line runs from that box down to "SENT BACK: WHAT ELSE COULD THE PROBLEM BE?".
- **Below:** "Same team, imagined" with ten ticked plans, and, under the sent-back question, three bracketed goals: DIFFERENTIATE, MATCH ON COST and PARTNER OR LICENSE. The source line runs under them.
- **Phone:** the task card; the AI line marked unseen; the first run's frame, its first three questions "and seven more", and the manager's question; then the sent-back question over the three goal groups.
- **Caption band:** the name and definition, then the reviewer's check and follow-up.

**Fit:**
- The phone player measures 832 px at 390 × 844.
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
3. **The send-back:** the imagined run is now the manager sending the plans back with "What else could the problem be?". In PME the question box stays empty, by design.
4. **Cast key:** `reviewer_sends` is now in `casts.json`, and beat 8 uses it (§10).

## 10. Classroom cast (CLASSROOM-PLAN.md, section 6)

The business edition in two more casts, through data in `editions/business.json`: `casts: ["workplace", "classroom", "high-school"]` and `byCast`. The scenario, timeline, picture and evidence stay as built.
- Open it with `?edition=business&cast=classroom` (higher ed: "the instructor", "class", "Instructor's check").
- Or with `&cast=high-school` ("the teacher", "class", "Teacher's check").
- Both casts are singular, so the business grammar holds.

**Keys.**
- The twelve literals `edition-check` flagged are now keys: `{reviewer}`, `{Reviewer}`, `{reviewer_sees}`, `{reviewer_sends}`, `{reviewer_lines}` and `{Each_person}`. Ten of them were "manager".
- The workplace text resolves as before, with two exceptions:
  - the hidden summary says "The manager lines up…" where it said "Then the manager lines up…";
  - the beat-9 detail and the summary say speech bubbles "appear" where they "land" (voice check).

**Framing through `byCast`.** The classroom patch serves both casts, except one label (below):
- Ten students in a strategy class answer the same case question with the school's AI.
- Caption 1 is "Ten students get the same case question."; caption 2 is "Each asks the school's AI for an outline. They come back alike."
- The setup says the class allows AI and each student says they used it.
- The setup and the study section say neither study looked at students, and Bottesch's participants were knowledge workers at one industrial company.
- The links note names the cast's check and "a strategy class working a company's case".
- The hidden summary has the class and the school's AI.

**The reviewer's label** takes two lines over the question box when it is wider than the box: "THE INSTRUCTOR / ASKS", "THE TEACHER / ASKS" (after the light read; before, classroom had a shortened "INSTRUCTOR ASKS").

**High school's own case words** (after the light read). `byCast["high-school"]` starts from classroom's patches. The generator then applies one vocabulary across every string: a business class, a bike company and a cheaper rival; STAND OUT, COMPETE ON PRICE and TEAM UP; and plainer questions in the lineup and spread. The result is 39 patches.

**Words that differ from workplace** (classroom / high school):

| Where | Classroom | High school |
| --- | --- | --- |
| Caption 1 | Ten students get the same case question. | same |
| Caption 2 | Each asks the school's AI for an outline. They come back alike. | same |
| Captions 3, 4, 6, 7, 8, 10 | The instructor sees… / lines up… / doesn't see this… / asks… / Imagine the instructor sends them back… / lines them up again. | The teacher… |
| Check | Instructor's check: What frames are missing across the class? / Line up the problems. What else could the problem be? | Teacher's check: … |
| Picture | "The class", "Same class, imagined", "NOT SEEN BY THE INSTRUCTOR", "THE INSTRUCTOR / ASKS", "MORE FRAMES TO WEIGH BEFORE THE CLASS CHOOSES" | the same roles with "the teacher", plus: task "How should we respond to / a cheaper rival?"; context "Its prices, our designs, bike shops, / budget buyers, repairs."; AI line "Stand out on quality"; "ONE FRAME: STAND OUT"; lineup "How do we stand out? · Why pay more for ours? · Why are we worth more? · What can't they copy? · Where do we add value? · Can we stay the best? · Is our service better? · Which features win? · How do we stay ahead? · Why is ours special?"; goals STAND OUT, COMPETE ON PRICE (Can we sell for less? · Who just wants cheap? · Can we cut our costs? · Who is leaving us?) and TEAM UP (Should we team up? · Who wants our designs? · Could we sell to them?) |
| Caption 5 | (workplace) | Different words, one frame: each plan aims to stand out. |
| Phone | "The instructor asks: What frames are missing?", "Not seen by the instructor" | "The teacher asks…", "Not seen by the teacher" |
| Setup (classroom; high school says "a business class" and "how should a bike company respond to a cheaper rival?") | "Ten students in a strategy class each use the school's AI to help answer the same case question: how should an industrial-equipment maker respond to a low-cost competitor? The class allows AI, and each student says they used it. … The case is an illustration based on Romasanta, Thomas & Levina (2026), a study of AI models' strategy advice, and Bottesch (2025), a field experiment with knowledge workers at an industrial company. Neither study looked at students. The class, the case and the plans are constructed." | same |

The task card, context, problem lines, goals and source line are the same in every cast.

**Switch:** "See this with: Workplace · Classroom · PME". Classroom is `data-edition-link="business" data-cast-link="classroom"`. `aria-current` was checked in six states:
- no query, and `?edition=pme`: PME;
- `business` and `cast=workplace`: Workplace;
- `cast=classroom`: Classroom;
- `cast=high-school`: Classroom, with its link keeping `cast=high-school`.

**Pace** (caption words ÷ 3 + 1.5 s, on the business clock):

| # | Length (s) | Workplace | Classroom | High school |
| --- | --- | --- | --- | --- |
| 1 | 9.1 | 6 words, 3.5 | 7, 3.8 | 7, 3.8 |
| 2 | 6.6 | 12, 5.5 | 12, 5.5 | 12, 5.5 |
| 3 | 8.0 | 12, 5.5 | 12, 5.5 | 12, 5.5 |
| 4 | 12.6 | 7, 3.8 | 7, 3.8 | 7, 3.8 |
| 5 | 6.6 | 7, 3.8 | same | same |
| 6 | 7.2 | 13, 5.8 | 13, 5.8 | 13, 5.8 |
| 7 | 4.5 | 7, 3.8 | 7, 3.8 | 7, 3.8 |
| 8 | 6.6 | 12, 5.5 | 12, 5.5 | 12, 5.5 |
| 9 | 7.8 | 12, 5.5 | same | same |
| 10 | 13.5 | 10, 4.8 | 10, 4.8 | 10, 4.8 |
| 11 | 8.5 | 7 + 10 | 7 + 10 | 7 + 10 |

**Checks** (October 30):
- `scripts/edition-check.mjs`: no failures, in all three casts.
- At 1440 × 900, 1366 × 657, 1280 × 720, 768 × 1024 and 390 × 844, in both classroom casts:
  - the picture shows at 1280 × 720 and 1366 × 657, not the stacked view;
  - settled labels are 11.1 px or more at 1366 × 657 and 12.6 px at 1280 × 720;
  - the controls hold their place and the caption band keeps its height at every moment;
  - the phone player is 832 px;
  - there is no horizontal scroll and there are no console errors.
- The voice check (`jack_eval.py`) passes on the classroom copy, the captions, the beat details and the summaries.
- **Workplace:** frame-identical apart from the switch line on the page captures. One run's reduced and page captures at 1440 differed with no change; a third capture matched the baseline. **PME:** only the page captures changed (the switch).

New baselines (with the switch): `regression/baseline`, `baseline-still`, `baseline-business`, `baseline-business-classroom` and `baseline-business-high-school` (the last two with `--freeze`).

**Stills:** `shots/business-classroom/` and `shots/business-high-school/`: beat-01 to beat-11, final, final-1440, final-1366, final-1280, final-390, reduced and page views.

**PME polish (step 1):** PME already shows the drawn picture at 1280 × 720 and 1366 × 657, with labels at 12.6 px and 11.1 px, so nothing changed beyond the switch.
