# Premature synthesis: business edition storyboard

Motion figure 3 of 8 · slug `premature-synthesis` · edition `business` (cast `workplace`) · round 3, October 28, 2026

The core is the same layout, colours and nameplate as `storyboard.md` (round 7), with one data-gated change of staging in beats 4–5 (below). This file gives the words that differ, the pace check, the evidence and the notes for Jack. Words live in `editions/business.json`; PME's in `editions/pme.json`.

## Example and scenario

**Example:** Shen & Tamkin (2026), "How AI Impacts Skill Formation", arXiv 2601.20245 (Anthropic), as approved in BUSINESS-EXAMPLES.md §3. Setting: a product engineering team, with a tech lead reviewing the code.

**Scenario** (*Illustration based on Shen & Tamkin, 2026*). Two engineers get the same docs, the same AI and the same time to fetch three records at once with a library new to both. Both read the docs closely, shown with the same motion at the same pace. The first has an AI write the code, which runs, and ships it. The second asks the AI only how cancellation works, writes the code, breaks one part ("Bug: when one fetch failed, the group canceled the rest") and fixes it alone. Both ship the same code and can sketch how the pieces connect. In review the tech lead points to the task group and the fetches (2–5) and asks what would make that fail. The first recalls the docs' rule but isn't sure it applies. The second applies it, from the bug they fixed.

**Core change, round 2 (business cold read 1).** Round 1 had the second engineer write first, then have the AI review the code. That matches the study's low-scoring Iterative AI Debugging group ("relied on AI to debug or verify their code"). It now follows **Conceptual Inquiry**, the high-scoring group: they "only asked conceptual questions and relied on their improved understanding to complete the task. Although this group encountered many errors, they also independently resolved these errors." The first engineer follows **AI Delegation**: they "wholly relied on AI to write code and complete the task." The page quotes all three descriptions. Order on screen, beat 4: read, go home, ask "How does cancellation work?" (red, theirs), see the AI's general answer (grey band, no code), draw three lines. Beat 5: try 1–2, the bug (✕, "Bug: …"), then the fix by their own hand (1–4, then 3–4). The question comes before the attempt, so the AI's answer can't be read as debugging help. The question and answer sit beside the second engineer's dot, away from the ✕, so the cross can't read as striking the AI's answer.

**Round 3 (business cold read 2, final fixes).** The first engineer's problem is taking the code as written, with no questions about how it works, not having the AI write it. The paper's top group, Generation-Then-Comprehension (n = 2, 86%), also had the AI write the code and then asked follow-up questions; the page now quotes it. Beat 3 no longer traces the AI's lines (that read as reviewing): the dot pulses once, every line turns solid together, and the dot goes straight to write up. The definition stays universal. Instead, the picture separates redrawing from building: under the sketches, "Redrawn from the AI's code" (grey) and "Built, broken once, fixed" (red). "In the same time" becomes "within the same time limit" (AI Delegation was fastest, 19.5 min to Conceptual Inquiry's 22). Also: "MAIN LINK" labels the heavy 2–5 line when the paper's "Main" tag first appears; the reason for each fix line shows beside it on desktop; beat 9's payoff starts with its caption (ring 73.0, note 73.4, answer 74.2–79.2); and the second answer is a full sentence.

**The study's caveat, respected.** The two people who had the AI generate code and then asked it follow-up questions scored well. So the first engineer never asks the AI to explain its code. They read the docs as closely as the second (beat 2), take the AI's code as written and ship it. The difference is order and attempt, not attention or effort: same docs, same AI, same time.

**Data-gated additions in the core** (PME draws exactly as before; frame-diff 206/206 identical):
- `flow: "conceptual"`: the business timeline (`TB`) for the second engineer, as above. No AI sweep, no grey "AI's version" tag and no AI-kept 3–4; 1–4 and 3–4 are the fix. On the stacked stage the question and answer come before the chips, and 1–4 sits with 3–4 under "The fix, on their own:".
- `labels.aiAsk`, `labels.aiExplain`: the question and the AI's answer beside the dot. `labels.noteStage`: the note as first written ("Bug: …"). The recalled note at the end stays without "Bug:".
- `labels.monoSize: 13`: mono labels at 13 units, so at 1280 × 720 the picture stays drawn (12 × scale would fall under 11 px) and every label renders at 11.1 px or more.
- `narrow.learnedInBox`: on the stacked stage, "What they learned" sits inside the second engineer's box.
- `page.editionNote`: the edition note is now edition text (PME's unchanged).
- Round 3: `TAKE` (beat 3, lines taken together; no tracing), `labels.mainOnMap`, `labels.fixNotes` (`{lines, x, y, at}`), `labels.sketchNotes` (`{t, role}`), `narrow.sketchA` / `narrow.sketchB`, and the beat 9 timings in `TB` (`ringPulseB`, `learned`, `ansB`). Verify round: the dot label's hold (now core), `MAIN_N` (core since the PME polish pass), `narrow.sketchEndA` / `narrow.sketchEndB`, and the beat 5 fix moved 0.7 s earlier.
- From round 1: `labels.source` / `narrow.source` (the source line), `narrow.taskLine`, `narrow.hideSketchAtEnd`.

## Workplace check (for Jack)

> REVIEWER'S CHECK
> *Can they say why these connections matter?*
> *Point to one: what would make it fail?* (same size)

The headline is the draft in EDITIONS-PLAN.md. The follow-up keeps the draft's form ("Point to one:") with the move the figure makes in a code review: what would make it fail? It adapts the oral-defense question in *The Irreducible Officer* (what evidence would change the recommendation?). The page text doesn't mention that origin.

## Roles

The workplace cast's generic roles ("analyst", "the manager") don't fit a code review, so this edition writes its roles literally: "engineer", "First engineer", "Second engineer", "the tech lead". It uses the cast for the check heading ("Reviewer's check") and `{check_l}`. Proposed for `casts.json`: let an edition override cast keys (for example `castOverride: {"person": "engineer", "reviewer": "the tech lead", …}`), or add an `engineering` cast with person "engineer" and reviewer "the tech lead".

## Words that differ from PME

**Picture** (`labels`):

| Element | PME | Business |
| --- | --- | --- |
| Task card | "Using the six readings, explain / when a blockade works." | "Using a library new to you, fetch / three records at the same time." |
| Cards 1–6 | Northern blockade, Island blockade, Trade routes, Allies split, Long blockade, Coercion theory | Retry on error, Task groups, Timeouts, Error handling, Fetching records, Channels |
| AI tag | AI'S MAP | AI CODE (first engineer only); "MAIN LINK" beside the heavy 2–5 line from beat 3 |
| Question and answer (beats 4–5) | none | "“How does cancellation work?”" (red) / "AI: in a task group, one error / cancels all the other tasks." (grey band) |
| Paper title | "Blockades work when / the navy holds the sea." | "Fetch all three records / in one task group." |
| Paper note | AI HELPED CONNECT THE READINGS | AI HELPED WITH THE CODE |
| Paper labels | FIRST/SECOND STUDENT'S PAPER | FIRST/SECOND ENGINEER'S CODE |
| Header | WHAT FACULTY RECEIVE · SAME ARGUMENT, OWN WORDS | WHAT THE TECH LEAD REVIEWS · THE SAME CODE |
| Sketch header | FACULTY ASK, PAPERS ASIDE / Sketch how the readings connect. | IN REVIEW, CODE CLOSED / Sketch how the pieces connect. |
| Question header | THEN THEY ASK / What evidence would change this connection? | THEN THE TECH LEAD ASKS / The task group and the fetches, 2–5: / what would make that fail? |
| Rows | First student · READ → AI CONNECTS → WRITES; Second student · READ → TRIES → AI CHECKS → WRITES | First engineer · READ → AI WRITES → SHIPS, "Redrawn from the AI's code"; Second engineer · READ → ASKS AI → TRIES → FIXES, "Built, broken once, fixed" |
| Fix notes (beat 5) | none | "each fetch catches / its own error" (1–4); "a timeout counts / as an error" (3–4) |
| Note | In Reading 1, trade went / overland through a neighbour. | Beats 4–5: "Bug: when one fetch failed, / the group canceled the rest." Beats 9–10: the same without "Bug:". |
| First answer | "In Reading 1, trade went overland. I don't see how that bears on this." | "The docs say one failure cancels the group. I'm not sure that applies here." |
| Second answer | "An overland route, like Reading 1's. Then my main claim no longer holds." | "If one fetch hits an error it doesn't catch, the group cancels the other two." |
| Source (final) | none | Illustration based on Shen & Tamkin, Anthropic (2026). |

The final frame names the ringed connection in words ("The task group and the fetches, 2–5"), so the bare numbers on the sketches have a meaning.

**Captions:**

| Beat | Business caption | Words |
| --- | --- | --- |
| 1 | An engineer must build a feature with a new library. | 10 |
| 2 | The engineer reads the docs closely, then takes an AI's code without asking how it works. | 16 |
| 3 | The code runs, and the engineer ships it as written. | 10 |
| 4 | A second engineer, with the same docs and time limit, asks the AI only how it works, then writes the code. | 21 |
| 5 | One part breaks. That engineer finds the bug and fixes it alone. | 12 |
| 6 | That engineer ships the same code, within the same time limit. | 11 |
| 7 | With the code closed, both engineers sketch the same connections. | 10 |
| 8 | The tech lead asks what would make the main connection fail. | 11 |
| 9 | The second engineer applies the rule, from the bug they fixed. | 11 |
| 10 | Reviewer's check: Can they say why these connections matter? / Point to one: what would make it fail? | 8 + 8 |

The beat list's "On screen" lines, the stacked-stage words and the page copy are in `business.json`. Page copy has no military or classroom wording apart from the original-essay link; the edition note reads "Workplace edition. The other edition is the example from the original essay, linked below."

## Pace table

Beat lengths are the core's (figure time; the player adds the 3 s name card). Each caption is read at 3 words a second plus a 1.5 s hold, and must fit its beat. New on-screen words get the same budget from when they appear; text that stays on screen to the end can be read in later beats.

| Beat | Length (s) | Caption words | Read + 1.5 (s) | Fits | New on-screen words | Read + 1.5 (s) | Time on screen |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | 3.0 | (name card, universal) | | | 7 | | as PME |
| 1 | 6.8 | 10 | 4.8 | yes | task 15, dot 1, card titles 11 | task 6.5 | task stays to the end; titles to beat 6 |
| 2 | 8.7 | 16 | 6.8 | yes | AI CODE 2 | 2.2 | 12.7 s |
| 3 | 9.2 | 10 | 4.8 | yes | label 3, title 8, MAIN 1, MAIN LINK 2, note 5 | 7.8 | to beat 7 (28 s); MAIN LINK 4.9 s |
| 4 | 11.7 | 21 | 8.5 | yes | dot label 2, question 4, answer 10 | 6.8 | about 20 s (to the end of beat 6) |
| 5 | 9.3 | 12 | 5.5 | yes | note 9, fix notes 10 | 4.5 / 4.8 | note 11 s, then again from beat 9; fix notes 8 s |
| 6 | 7.3 | 11 | 5.2 | yes | label 3, header 6 | 4.5 | header to the end |
| 7 | 7.9 | 10 | 4.8 | yes | sketch header 9, strip 4, rows 4, sequences 10, sketch notes 10 | header 4.5 (the rest stays to the end) | to the end |
| 8 | 11.8 | 11 | 5.2 | yes | question 12, answer 14 | answer appears over 5.0 s, then 1.5 s hold | to the end |
| 9 | 10.6 | 11 | 5.2 | yes | label 3, answer 15 | answer appears over 5.0 s from 74.2, then 4.1 s before the check | to the end |
| 10 | 6.7, then rests | 16 (+ name and definition, universal) | 6.8 | yes, rests | source 8 | 4.2 | to the end |

Beat 4 timing: the dot's name "Second engineer" shows 26.3–28.9 (2.25 s readable; core timing since the PME polish pass, so PME matches), read 26.8–29.3, home 29.5–29.9, question 30.0, answer 30.8–31.3, three lines 32.6–34.0, home 34.3. Beat 5: try 1–2 at 36.85, check 37.6–38.6, ✕ 38.7, note 39.2–39.7, line pulls back 39.8–40.1, ✕ brightens 40.2, fix 1–4 40.9–41.4 (note 41.3), 3–4 41.7–42.2 (note 42.1), home 43.6. Beats 4 and 5 each get about half the work, and the bug has 2.2 s from the ✕ before the fix starts.

Stacked-stage pacing (verify round): "Main link: 2–5, the task group and fetches." (8 words) shows with the code sheet, 19.4 s, for 5.05 s; "Each fetch catches its own errors, timeouts included." (8 words) shows with the fix, 40.9 s, for 4.6 s. In the final beat the sketch lines become "Sketch redrawn from the AI's code" and "Sketch built, broken once, fixed", so the phone's final frame keeps the contrast. To fit, the phone question is "What would make fetching in one group fail?" and the learned note "✕ One failed fetch canceled the rest." 

Layout: at 1440 × 900 and 1280 × 720 the picture is drawn, every label at 11.1 px or more, with no lost labels. At 390 × 844 the stacked stage is used (466 px, peak content 462.1 px, in the final beat), with the player at 830 px. PME is unchanged at all three sizes; it uses the stacked stage at 1280 × 720, as before (12-unit labels would fall under 11 px).

## Evidence (option A)

- **Setup:** "Illustration based on Shen & Tamkin (2026). The engineers, their AI and the task are constructed."
- **Final frame:** the one-line source, "Illustration based on Shen & Tamkin, Anthropic (2026)."
- **Page:** "The study behind this example", five paragraphs with the finding and its limits (in `business.json`, `page.evidence`). No evidence beat: the finding isn't the turn here.

**Verified figures** (for the companion's source spine). Checked against the paper's HTML (arXiv 2601.20245v2, revised February 1, 2026) and Anthropic's post "How AI assistance impacts the formation of coding skills" (January 29, 2026):

| Figure | Source |
| --- | --- |
| 52 participants, "recruited through a third party crowd-worker platform", "professional or freelance" developers. Table 1, years of coding: 1–3 years, 4 (2 + 2); 4–6 years, 19 (10 + 9); 7+ years, 29 (14 + 15) | paper |
| Library: Trio, "a new asynchronous programming library" | paper; post |
| Up to 35 minutes for two coding tasks; task 2: "a record retrieval function that can handle missing record errors". The paper also calls the session "a single task", so the page says "one session of two short tasks" | paper |
| "For a 27-point quiz, this translates into a 17% score difference or 2 grade points"; Cohen d = 0.738, p = 0.01 | paper |
| AI "did not significantly improve task completion time" | paper |
| Averages: 50% with AI, about 67% by hand | Anthropic post |
| Largest gap on debugging questions, from "exploratory data analysis (not pre-registered)" (§5.2.2). "Encountered more errors during the task and became more capable at debugging" is the authors' explanation; the page says both | paper |
| Conceptual Inquiry, n = 7: "only asked conceptual questions and relied on their improved understanding to complete the task. Although this group encountered many errors, they also independently resolved these errors"; average 65%, 22 min ("65% or higher" is the threshold for all high-scoring groups) | paper, §6 and Figure 11 |
| AI Delegation, n = 4: "wholly relied on AI to write code and complete the task"; average 39%, 19.5 min, "completed the task the fastest" | paper, §6 and Figure 11 |
| Iterative AI Debugging, n = 4: "relied on AI to debug or verify their code"; average 24% | paper, §6 and Figure 11 |
| Generation-Then-Comprehension, n = 2: "first generated code and then manually copied or pasted the code into their work. After their code was generated, they then asked the AI assistant follow-up questions to improve understanding"; "looks nearly the same as the AI delegation group, but additionally uses AI to check their own understanding"; average 86%, 24 min | paper, §6 and Figure 11 |
| The assistant was GPT-4o (not on the page) | paper, §4.1 |
| "there was not the same incentive to learn the library as if it were required for their actual job" | paper |
| Counter-evidence: 5,172 customer support agents; "evidence that AI assistance facilitates worker learning" | Brynjolfsson, Li & Raymond, "Generative AI at Work", arXiv 2304.11771, abstract |

**Removed in round 2:** "mostly junior" (from Anthropic's post). Table 1 shows most participants had seven or more years of coding.

**Verified in round 3 from Figure 11 of the PDF:** 86%, 68% (Hybrid Code-Explanation, n = 3, not on the page), 65%, 39%, 35% (Progressive AI Reliance, not on the page) and 24%.

**Not verified, so not used:** the outage finding in Brynjolfsson, Li & Raymond (not in the abstract I could check). The QJE publication details for that paper.

**For an engineer to confirm:** the cancellation behaviour. In Trio, an exception in one child task cancels its siblings in the same nursery (the quiz's concept 3 asks what happens to a parent task when a child raises an unhandled exception). The figure's note and both answers depend on it. The 1–2 attempt (retries wired to the task group) is constructed to produce that bug, and the fix (each fetch handles its own errors; a timeout counts as an error) is constructed too.

## Cautions kept

- No code on screen: cards with plain labels, and the change drawn as bars.
- The first engineer asks the AI no follow-up questions (AI Delegation), and the dot doesn't trace the AI's lines, so nothing reads as reviewing the code. The second asks only how it works, and the AI writes none of their code (Conceptual Inquiry).
- The business page is fully business: no PME-only links; the essay is linked as "The original essay, written for military education".
- The two code thumbnails in the strip (beat 7 on) are decoration. At 1280 × 720 their titles fall under 11 px and the runtime hides them; nothing depends on reading them, because the header "What the tech lead reviews · The same code" carries the point.

## Classroom cast (CLASSROOM-PLAN.md §3)

The business edition in two more casts, through data in `editions/business.json`: `casts: ["workplace", "classroom", "high-school"]`, `castOverrides` and `byCast`. The scenario, timeline, picture, answers and evidence numbers stay as built and cold-read. Open it with `?edition=business&cast=classroom` (higher ed: "faculty", "Faculty check") or `&cast=high-school` ("the teacher", "Teacher's check").

**Role conversion.** The 55 literal role words are now keys. `castOverrides.workplace` carries the engineer and tech-lead words for 18 existing keys: `person`, `Person`, `people`, `first`, `second`, `A_person`, `a_person`, `A_second`, `That_person`, `The_person`, `the_person`, `the_first`, `reviewer`, `Reviewer`, `receive` ("What the tech lead reviews"), `reviewer_ask`, `then_ask` and `reviewer_points`. The workplace edition resolves to the same strings as before, checked string for string with the runtime's `resolveEdition`, and frame-diffs 206/206 identical. The only visible change is the switch's new Classroom link.

**`byCast` patches** (18 for classroom; high school is the same set with "class" for "course"):
- Five strings need a capitalised "Each …", "The first …" or "The second …" that no key gives. They are patched with `{person}` inside: the details of beats 7, 8 and 9, caption 9 and the screen-reader summary. The summary's patch also gives the question a form both reviewer numbers fit ("Faculty point… : what would make that fail?").
- **Class words:** "In class, code closed" for "In review, code closed" (label, phone rows, beat 7 detail, summary). "Hands in" replaces "ships" (captions 3 and 6, the first row's sequence "READ → AI WRITES → HANDS IN", phone order, summary).
- **Caption 1:** "A student in a programming course (class) must build a feature with a new library." It has 14 words, read in 6.2 s within the 6.8 s beat.
- **Setup:** "Two students in a programming course (class) get the same docs and the same time limit to build a feature with a library new to them. The course (class) allows AI, and both say they used it. … Illustration based on Shen & Tamkin (2026), a study of developers learning a new library; the students, the course and the task are constructed."
- **Description** and **edition note:** "A classroom example: two students hand in the same code…"; "Classroom edition. PME is the example from the original essay, linked below."
- **Study framing.** The page never calls the study's participants students.
  - Paragraph 1 adds: "The study's participants were working developers; the students in the figure are constructed." Table 1 shows 29 of 52 with seven or more years.
  - Paragraph 2 brings forward the two limits that keep the page from reading as "AI harms learning". The top group also had the AI write code, then asked how it worked (Generation-Then-Comprehension, quoted below it). And the authors' incentive limit, quoted: "there was not the same incentive to learn the library as if it were required for their actual job."
  - The limits paragraph then points back to it, and calls the figure's question "in class" constructed.
- **Phone paper tags:** "Main: 2–5. Also 3–4–5 and 1–4–6." (as PME). The workplace string, "Main: 2 · 5. Also 3 · 4 · 5, 1 · 4 · 6", counts as 10 words and shows for 4.7 s against 4.8 s needed. It is left unchanged because workplace must stay identical; flagged.

**Words that differ from workplace** (classroom / high school):

| Where | Classroom | High school |
| --- | --- | --- |
| Caption 1 | A student in a programming course must build a feature with a new library. | …programming class… |
| Captions 2, 4, 5 | The student… / A second student… / That student… | same |
| Captions 3, 6 | …the student hands it in as written. / That student hands in the same code, within the same time limit. | same |
| Caption 8 | Faculty ask what would make the main connection fail. | The teacher asks… |
| Caption 9 | The second student applies the rule, from the bug they fixed. | same |
| Caption 10 | Faculty check: … | Teacher's check: … |
| Picture | Student / Second student, FIRST (SECOND) STUDENT'S CODE, WHAT FACULTY RECEIVE, IN CLASS, CODE CLOSED, THEN THEY ASK, READ → AI WRITES → HANDS IN | WHAT THE TEACHER RECEIVES, THEN THE TEACHER ASKS |
| Phone | Faculty point to 2–5; What faculty receive · the same code; In class, code closed: sketch it | The teacher points to 2–5; What the teacher receives… |

**The switch:** "Workplace · Classroom · PME". `data-cast-link="classroom"`, and high school counts as a Classroom variant (the runtime's cast families).

**Checks** (October 30):
- `edition-check` passes for all three casts.
- PME and workplace frame-diff 206/206 identical with the old switch line. With the new switch, only the switch differs.
- The classroom and high-school stills are in `shots/business-classroom/` and `shots/business-high-school/`.
- **Pacing** (words ÷ 3 + 1.5 s): every caption and every text that leaves early passes at 1440 × 900, 1366 × 657, 1280 × 720 and 390 × 844, in both casts.
- **Layout:**
  - The picture is drawn at 1440 × 900 and 1280 × 720, with labels at 11 px or more.
  - The phone stage peaks at 462 of 466 px, with no horizontal scroll.
  - At 1366 × 657 the stage is stacked and the 698 px player doesn't fit, so autoplay waits. Workplace does the same (pre-existing). The PME laptop band (`laptop: true`) would fix it, but would change workplace frames at short laptop sizes; flagged for a decision.
- **Proposed keys for `casts.json`:** `Each_person`, `The_first`, `the_second` and `The_second` ("Each student", "The first student", "the second student", "The second student"; workplace "Each analyst" …). With them, the five role patches above become keys.
