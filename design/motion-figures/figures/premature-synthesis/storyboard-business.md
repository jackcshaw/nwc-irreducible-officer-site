# Premature synthesis: business edition storyboard

Motion figure 3 of 8 · slug `premature-synthesis` · edition `business` (cast `workplace`) · October 28, 2026

The core is unchanged: the same timeline, layout, colours and nameplate as `storyboard.md` (round 7). This file gives only the words that differ, the pace check, the evidence and the notes for Jack. Words live in `editions/business.json`; PME's in `editions/pme.json`.

## Example and scenario

**Example:** Shen & Tamkin (2026), "How AI Impacts Skill Formation", arXiv 2601.20245 (Anthropic), as approved in BUSINESS-EXAMPLES.md §3. Setting: a product engineering team, with a tech lead reviewing the code.

**Scenario** (*Illustration based on Shen & Tamkin, 2026*). Two junior engineers must fetch three records at the same time with a library new to both. Both read the docs closely, which the figure shows with the same motion at the same pace. The first has an AI write the code. It makes sense, and they ship it. The second writes the code first. One part breaks: when one task failed, the group canceled the rest. They fix it, then have an AI review the code and keep one change it suggests (treat a timeout as an error). Both ship the same change and can sketch how the pieces connect. In review, the tech lead points to the main connection and asks what would make it fail. The first recalls the docs' rule on cancellation but can't apply it. The second applies it, from the bug they fixed.

**The study's caveat, respected.** The two people who had the AI generate code and then asked it follow-up questions scored well. So the first engineer never asks the AI to explain its code: they read the docs closely (beat 2, the same reading as the second engineer), take the AI's code as written and ship it. The difference between the two is order and attempt, not attention.

**No core change.** The second engineer's choice (write first, then have the AI review) agrees with the study: the control group, who hit errors and fixed them, did better, as did the AI users who asked only about concepts. Nothing in the contrast endorses what the study found wrong.

**Data-gated additions in the core** (PME draws exactly as before; frame-diff 0):
- `labels.source`: a one-line source at the bottom left of the final frame (Serif italic 13), from the check onwards. `narrow.source`: the same line under the controls on the stacked stage, outside the fitted player.
- `narrow.taskLine`: the task as one line at the top of the stacked stage, kept to the final frame (pilot lesson 4).
- `narrow.hideSketchAtEnd`: the two "Sketch:" lines step back in the final stacked beat (they show in beat 7), so the phone player still fits 844 px.

## Workplace check (for Jack)

> REVIEWER'S CHECK
> *Can they say why these connections matter?*
> *Point to one: what would make it fail?* (same size)

The headline is the draft in EDITIONS-PLAN.md. The follow-up keeps the draft's form ("Point to one:") with the move the figure makes in a code review: what would make it fail? It is the study's debugging gap, and it adapts the oral-defense question in *The Irreducible Officer* (what evidence would change the recommendation?).

## Roles

The workplace cast's generic roles ("analyst", "the manager") don't fit a code review, so this edition writes its roles literally: "engineer", "First engineer", "Second engineer", "the tech lead". It uses the cast for the check heading ("Reviewer's check") and `{check_l}`. Proposed for `casts.json`: let an edition override cast keys (for example `castOverride: {"person": "engineer", "reviewer": "the tech lead", …}`), or add an `engineering` cast with person "engineer" and reviewer "the tech lead".

## Words that differ from PME

**Picture** (`labels`):

| Element | PME | Business |
| --- | --- | --- |
| Task card | "Using the six readings, explain / when a blockade works." | "Using a library new to you, fetch / three records at the same time." |
| Cards 1–6 | Northern blockade, Island blockade, Trade routes, Allies split, Long blockade, Coercion theory | Retry on error, Task groups, Timeouts, Error handling, Fetching records, Channels |
| AI tag | AI'S MAP | AI'S VERSION |
| Paper title | "Blockades work when / the navy holds the sea." | "Fetch all three records / in one task group." |
| Paper note | AI HELPED CONNECT THE READINGS | AI HELPED WITH THE CODE |
| Paper labels | FIRST/SECOND STUDENT'S PAPER | FIRST/SECOND ENGINEER'S CHANGE |
| Header | WHAT FACULTY RECEIVE · SAME ARGUMENT, OWN WORDS | WHAT THE TECH LEAD REVIEWS · SAME CODE, OWN DESCRIPTIONS |
| Sketch header | FACULTY ASK, PAPERS ASIDE / Sketch how the readings connect. | IN REVIEW, CODE CLOSED / Sketch how the pieces connect. |
| Question header | THEN THEY ASK / What evidence would change this connection? | THEN THE TECH LEAD ASKS / What would make this connection fail? |
| Rows | First student · READ → AI CONNECTS → WRITES; Second student · READ → TRIES → AI CHECKS → WRITES | First engineer · READ → AI WRITES → SHIPS; Second engineer · READ → TRIES → AI REVIEWS → SHIPS |
| Note (beats 4–5, 9–10) | In Reading 1, trade went / overland through a neighbour. | When one task failed, the / group canceled the rest. |
| First answer | "In Reading 1, trade went overland. I don't see how that bears on this." | "The docs say one failure cancels the group. I don't see why that matters." |
| Second answer | "An overland route, like Reading 1's. Then my main claim no longer holds." | "An error one task doesn't catch. The group then cancels the other two." |
| Source (final) | none | Illustration based on Shen & Tamkin, Anthropic (2026). |

**Captions:**

| Beat | Business caption | Words |
| --- | --- | --- |
| 1 | An engineer must build a feature with a new library. | 10 |
| 2 | The engineer reads the docs closely, then has an AI write the code. | 13 |
| 3 | The code makes sense to the engineer, who ships it. | 10 |
| 4 | A second engineer reads them just as closely, then writes it first. One part breaks. | 15 |
| 5 | That engineer then has an AI review it and checks its version against theirs. | 14 |
| 6 | That engineer ships the same change, described in their own words. | 11 |
| 7 | With the code closed, both engineers sketch the same connections. | 10 |
| 8 | The tech lead points to the main connection. The first engineer can't apply what they know. | 16 |
| 9 | The second engineer applies it, from the part that broke. | 10 |
| 10 | Reviewer's check: Can they say why these connections matter? / Point to one: what would make it fail? | 8 + 8 |

The beat list's "On screen" lines, the stacked-stage words and the page copy are in `business.json`.

## Pace table

Beat lengths are the core's (figure time; the player adds the 3 s name card). Each caption is read at 3 words a second plus a 1.5 s hold, and must fit its beat. New on-screen words get the same budget from when they appear; text that stays on screen to the end can be read in later beats.

| Beat | Length (s) | Caption words | Read + 1.5 (s) | Fits | New on-screen words | Read + 1.5 (s) | Time on screen |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | 3.0 | (name card, universal) | | | 7 | | as PME |
| 1 | 6.8 | 10 | 4.8 | yes | task 15, dot 1, card titles 11 | task 6.5 | task stays to the end; titles to beat 6 |
| 2 | 8.7 | 13 | 5.8 | yes | AI'S VERSION 2 | 2.2 | 12.7 s |
| 3 | 9.2 | 10 | 4.8 | yes | label 3, title 8, MAIN 1, note 5 | 7.2 | to beat 7 (28 s) |
| 4 | 11.7 | 15 | 6.5 | yes | dot label 2, note 9 | 4.5 | note 17 s, then again from beat 9 |
| 5 | 9.3 | 14 | 6.2 | yes | 0 | | |
| 6 | 7.3 | 11 | 5.2 | yes | label 3, header 9 | 5.5 | header to the end |
| 7 | 7.9 | 10 | 4.8 | yes | sketch header 9, strip 4, rows 4, sequences 9 | header 4.5 (the rest stays to the end) | to the end |
| 8 | 11.8 | 16 | 6.8 | yes | question 11, answer 14 | answer appears over 5.0 s, then 1.5 s hold | to the end |
| 9 | 10.6 | 10 | 4.8 | yes | label 3, answer 13 | answer appears over 4.7 s, then 1.5 s hold | to the end |
| 10 | 6.7, then rests | 16 (+ name and definition, universal) | 6.8 | yes, rests | source 8 | 4.2 | to the end |

Beat 8 can't change length (core), so its caption stays at 16 words, the answer starts 5.3 s in, after the caption can be read once, and appears at about 3 words a second. On phones the task line stays to the final frame, the stacked stage is 466 px and the player 830 px at 390 × 844, with the controls still.

## Evidence (option A)

- **Setup:** "Illustration based on Shen & Tamkin (2026). The engineers, their AI and the task are constructed."
- **Final frame:** the one-line source, "Illustration based on Shen & Tamkin, Anthropic (2026)."
- **Page:** "The study behind this example", five paragraphs with the finding and its limits (in `business.json`, `page.evidence`). No evidence beat: the finding isn't the turn here.

**Verified figures** (for the companion's source spine). Checked against the paper's HTML (arXiv 2601.20245v2, revised February 1, 2026) and Anthropic's post "How AI assistance impacts the formation of coding skills" (January 29, 2026):

| Figure | Wording | Source |
| --- | --- | --- |
| 52 participants, "(mostly junior) software engineers, each of whom had been using Python at least once a week for over a year" | | Anthropic post |
| Library: Trio, asynchronous programming | | paper; post |
| "a maximum of 35 minutes to complete two coding tasks using Trio"; tasks: a timer, and "a record retrieval function that can handle missing record errors" | | paper |
| "For a 27-point quiz, this translates into a 17% score difference or 2 grade points" | Cohen d = 0.738, p = 0.01 | paper |
| AI "did not significantly improve task completion time" | | paper |
| Averages: 50% with AI, about 67% by hand | | Anthropic post |
| "Among the different types of questions, the largest score gap occurs in the debugging questions"; "The control group with no access to AI assistance encountered more errors during the task and became more capable at debugging" | | paper |
| Conceptual Inquiry, n = 7: "average quiz score is 65% or higher" | | paper (and post) |
| AI Delegation, n = 4: "average quiz scores in these groups are less than 40%" | | paper |
| Generation-Then-Comprehension, n = 2: "demonstrated a high level of understanding on the quiz" | | paper |
| "there was not the same incentive to learn the library as if it were required for their actual job" | | paper |
| Counter-evidence: 5,172 customer support agents; "evidence that AI assistance facilitates worker learning" | | Brynjolfsson, Li & Raymond, "Generative AI at Work", arXiv 2304.11771, abstract |

**Not verified, so not used:** the 86% for Generation-Then-Comprehension and the 39% for AI Delegation (BUSINESS-EXAMPLES.md); the text gives only "a high level of understanding" and "less than 40%". The outage finding in Brynjolfsson, Li & Raymond (not in the abstract I could check); the page cites only the abstract's learning claim. The QJE publication details for that paper.

**For an engineer to confirm:** the cancellation behaviour. In Trio, an exception in one child task cancels its siblings in the same nursery; the figure's note ("When one task failed, the group canceled the rest") and both answers depend on it. The 1–2 attempt (retries wired to the task group) is constructed to produce that bug.

## Cautions kept

- No code on screen: cards with plain labels, and the change drawn as bars.
- The first engineer asks the AI no follow-up questions.
- The business page is fully business: no PME-only links; the essay is linked as "The original essay, written for military education".
